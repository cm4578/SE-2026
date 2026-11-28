// 每日看板整理（Daily 草稿）
//
// 讀 GitHub Projects 看板「Agile+AI Final」和 SE-2026 的分支、PR，整理成 Daily，
// 貼到本期 Sprint 紀錄 Issue（貼了 sprint-record、標題含本期 Sprint 名稱的 open Issue）。
//
// - 本期是哪一輪，由看板 Sprint 欄位的日期決定；每輪開新的紀錄 Issue 也會自動找到。
// - Sprint Goal 從本期紀錄 Issue 內文「Sprint Goal：」那一行讀取。
// - 純腳本，不使用 AI，不需要安裝套件（Node 18 以上）。
// - 同一天重跑只會更新當天那則留言，不會重複貼。
// - 阻礙只列出「多久沒動」，原因要由人回覆補充。
//
// 環境變數：
//   PROJECT_TOKEN      classic PAT，勾 read:project（SE-2026 是 private 才需要再勾 repo）。只用來讀看板。
//   GITHUB_TOKEN       Actions 內建，用來讀 Issue、分支、PR，以及貼留言。
//   GITHUB_REPOSITORY  Actions 內建，例如 cm4578/SE-2026。
//   PROJECT_OWNER      看板擁有者，預設 cm4578。
//   PROJECT_NUMBER     看板編號，預設 2（網址 projects/2）。
//   DEV_BRANCH         開發主線，預設 develop。分支的新 commit 以「比 develop 多出來的」計算。
//   STALE_DAYS         卡片或 PR 停留幾天以上算「沒動」，預設 2。
//   DAILY_DAYS         Sprint 第幾天貼 Daily，例如 2,4,6。留空就是每天。只限制排程，手動執行和本機預覽不受影響。
//   DRY_RUN            true 時只預覽，不貼留言。
//
// 在自己電腦預覽（不會貼留言）：
//   PROJECT_TOKEN=<PAT> GITHUB_TOKEN=<PAT> GITHUB_REPOSITORY=cm4578/SE-2026 DRY_RUN=true node .github/scripts/daily.mjs

import { pathToFileURL } from 'node:url';
import { appendFileSync } from 'node:fs';

const DAY_MS = 86_400_000;
const TAIPEI_OFFSET_MS = 8 * 3_600_000; // 台北 UTC+8，沒有夏令時間
const USER_AGENT = 'se-2026-daily-bot'; // GitHub API 要求每個請求都帶 User-Agent

const READY = 'Ready';
const IN_PROGRESS = 'In progress';
const IN_REVIEW = 'In review';
const DONE = 'Done';
const AI_DRAFT = 'AI Draft';
const PRIORITY_RANK = { p0: 0, p1: 1, p2: 2 };

// 狀態名稱比對不分大小寫，避免「In Progress」「In progress」對不上
const norm = (s) => (s ?? '').trim().toLowerCase();
const is = (item, ...names) => names.some((n) => norm(item.status) === norm(n));

// 預期中的錯誤（設定或流程問題），只印訊息、不印程式堆疊
class BotError extends Error {}

// ---------- 日期 ----------

export const taipeiDate = (d) => new Date(d.getTime() + TAIPEI_OFFSET_MS).toISOString().slice(0, 10);
export const addDays = (ymd, n) => new Date(Date.parse(`${ymd}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
const diffDays = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / DAY_MS);
const mmdd = (ymd) => ymd.slice(5).replace('-', '/'); // 2026-12-03 → 12/03，跟流程文件的寫法一致
const taipeiMidnight = (ymd) => new Date(`${ymd}T00:00:00+08:00`);
const ageDays = (from, now) => Math.max(0, Math.floor((now - from) / DAY_MS));

// ---------- GitHub API ----------

async function graphql(token, query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { authorization: `bearer ${token}`, 'content-type': 'application/json', 'user-agent': USER_AGENT },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.errors) {
    throw new BotError(
      `讀取看板失敗（HTTP ${res.status}）：${JSON.stringify(body.errors ?? body)}\n` +
        '→ 檢查 secret PROJECT_TOKEN：有沒有勾 read:project、SE-2026 是 private 的話有沒有勾 repo、是否已過期。' +
        '也確認 PROJECT_OWNER、PROJECT_NUMBER 是否正確。',
    );
  }
  return body.data;
}

async function rest(token, method, path, data) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
      'user-agent': USER_AGENT,
      ...(data ? { 'content-type': 'application/json' } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!res.ok) throw new BotError(`GitHub API ${method} ${path} 失敗（HTTP ${res.status}）：${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

async function restAll(token, path) {
  const out = [];
  for (let page = 1; ; page++) {
    const sep = path.includes('?') ? '&' : '?';
    const batch = await rest(token, 'GET', `${path}${sep}per_page=100&page=${page}`);
    out.push(...batch);
    if (batch.length < 100) return out;
  }
}

const PROJECT_QUERY = `
query($owner: String!, $number: Int!, $after: String) {
  user(login: $owner) {
    projectV2(number: $number) {
      title
      sprintField: field(name: "Sprint") {
        ... on ProjectV2IterationField {
          configuration {
            iterations { id title startDate duration }
            completedIterations { id title startDate duration }
          }
        }
      }
      items(first: 100, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          isArchived
          content {
            __typename
            ... on Issue { number title issueState: state assignees(first: 5) { nodes { login } } }
            ... on PullRequest { number title prState: state assignees(first: 5) { nodes { login } } }
            ... on DraftIssue { title }
          }
          status: fieldValueByName(name: "Status") {
            ... on ProjectV2ItemFieldSingleSelectValue { name updatedAt }
          }
          sprint: fieldValueByName(name: "Sprint") {
            ... on ProjectV2ItemFieldIterationValue { iterationId title }
          }
          priority: fieldValueByName(name: "Priority") {
            ... on ProjectV2ItemFieldSingleSelectValue { name }
          }
        }
      }
    }
  }
}`;

export async function fetchProject(token, owner, number) {
  let after = null;
  let project = null;
  const nodes = [];
  do {
    const data = await graphql(token, PROJECT_QUERY, { owner, number, after });
    project = data?.user?.projectV2;
    if (!project) throw new BotError(`找不到看板 ${owner}/projects/${number}，或 PROJECT_TOKEN 沒有權限讀它。`);
    nodes.push(...project.items.nodes);
    after = project.items.pageInfo.hasNextPage ? project.items.pageInfo.endCursor : null;
  } while (after);

  const config = project.sprintField?.configuration;
  if (!config) throw new BotError('看板上找不到名為「Sprint」的 Iteration 欄位。');

  return {
    iterations: [...config.iterations, ...config.completedIterations],
    items: nodes
      // 封存的卡不顯示，但封存的 Done 仍算進本 Sprint 完成張數
      .filter((n) => n.content && (!n.isArchived || norm(n.status?.name) === norm(DONE)))
      .map((n) => ({
        number: n.content.number ?? null,
        title: n.content.title,
        state: n.content.issueState ?? n.content.prState ?? null, // OPEN、CLOSED、MERGED；草稿沒有
        assignees: n.content.assignees?.nodes.map((a) => a.login) ?? [],
        status: n.status?.name ?? null,
        statusAt: n.status?.updatedAt ? new Date(n.status.updatedAt) : null,
        iterationId: n.sprint?.iterationId ?? null,
        sprintTitle: n.sprint?.title ?? null,
        priority: n.priority?.name ?? null,
      })),
  };
}

// 分支名稱照 GITFLOW 寫成 feature/21-下單、docs/49-流程文件，取出 Issue 編號
export const branchIssue = (name) => Number(/^[^/]+\/(\d+)(?:\D|$)/.exec(name)?.[1]) || null;
// PR 內文照 COMMIT_CONVENTION 寫 Refs #12
export const refsFrom = (body) =>
  [...(body ?? '').matchAll(/\b(?:refs|closes|fixes|resolves)\s+#(\d+)/gi)].map((m) => Number(m[1]));

// 開發活動：各分支比 develop 多出來的新 commit、合併的 PR、開著的 PR
export async function fetchActivity(token, repo, { since, devBranch }) {
  const branches = await restAll(token, `/repos/${repo}/branches`);
  const hasDev = branches.some((b) => b.name === devBranch);
  const commits = [];
  if (hasDev) {
    for (const b of branches) {
      if ([devBranch, 'main', 'master'].includes(b.name)) continue;
      const head = b.name.split('/').map(encodeURIComponent).join('/');
      let cmp;
      try {
        cmp = await rest(token, 'GET', `/repos/${repo}/compare/${encodeURIComponent(devBranch)}...${head}`);
      } catch {
        continue; // 例如分支跟 develop 沒有共同歷史，略過這一條
      }
      const fresh = (cmp.commits ?? []).filter(
        (c) => new Date(c.commit?.committer?.date ?? c.commit?.author?.date ?? 0) >= since,
      );
      if (fresh.length) {
        const authors = [...new Set(fresh.map((c) => c.author?.login ?? c.commit?.author?.name ?? '未知'))];
        commits.push({ branch: b.name, count: fresh.length, authors, issue: branchIssue(b.name) });
      }
    }
  }
  const pr = (p) => ({
    number: p.number,
    title: p.title,
    author: p.user?.login ?? '未知',
    draft: Boolean(p.draft),
    createdAt: new Date(p.created_at),
    refs: refsFrom(p.body),
  });
  const open = (await restAll(token, `/repos/${repo}/pulls?state=open`)).map(pr).sort((a, b) => a.number - b.number);
  const closed = await rest(token, 'GET', `/repos/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=50`);
  const merged = closed
    .filter((p) => p.merged_at && new Date(p.merged_at) >= since)
    .map(pr)
    .sort((a, b) => a.number - b.number);
  return { hasDev, devBranch, commits, open, merged };
}

// ---------- 整理內容（純函式，方便測試） ----------

export function currentIteration(iterations, today) {
  return iterations.find((it) => it.startDate <= today && today < addDays(it.startDate, it.duration)) ?? null;
}

// 「Sprint 4」可以對到「Sprint 4 紀錄」「sprint4 紀錄」，但不會對到「Sprint 40」
export function recordTitleRegex(iterationTitle) {
  const num = iterationTitle.match(/(\d+)\s*$/)?.[1];
  if (num) return new RegExp(`(?:sprint|iteration)\\s*${num}(?!\\d)`, 'i');
  return new RegExp(iterationTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
}

// 從紀錄 Issue 內文找 Sprint Goal。支援：
//   - Sprint Goal：xxx   **Sprint Goal**: xxx   Sprint 目標：xxx
//   ## Sprint Goal（下一行寫內容）
export function extractSprintGoal(body) {
  const lines = (body ?? '').split(/\r?\n/).map((l) => l.replace(/\*\*|__/g, '').trim());
  const key = String.raw`(?:sprint\s*goal|sprint\s*目標)`;
  const inline = new RegExp(String.raw`^(?:[-*+]\s+|#{1,6}\s+)?${key}\s*[：:]\s*(.+)$`, 'i');
  const heading = new RegExp(String.raw`^#{1,6}\s+${key}\s*[：:]?\s*$`, 'i');
  for (let k = 0; k < lines.length; k++) {
    const m = inline.exec(lines[k]);
    if (m) return m[1].trim();
    if (heading.test(lines[k])) {
      const next = lines.slice(k + 1).find((l) => l);
      if (next && !next.startsWith('#')) return next.replace(/^[-*+>]\s+/, '').trim();
    }
  }
  return null;
}

const byPriority = (a, b) =>
  (PRIORITY_RANK[norm(a.priority)] ?? 9) - (PRIORITY_RANK[norm(b.priority)] ?? 9) ||
  (a.number ?? 1e9) - (b.number ?? 1e9);

const label = (i) => (i.number ? `#${i.number} ${i.title}` : `（草稿）${i.title}`);
// 刻意不加 @，避免每天通知
const who = (i) => (i.assignees.length ? i.assignees.join('、') : '未指派');
const daysIn = (i, now) => (i.statusAt ? ageDays(i.statusAt, now) : null);
const daysText = (d) => (d === null ? '' : d === 0 ? '不到 1 天' : `${d} 天`);
const waitText = (d) => (d === 0 ? '等審查不到 1 天' : `等審查 ${d} 天`);
const listWith = (arr, note) => arr.map((i) => `${label(i)}（${note(i)}）`).join('、');

export function buildReport({ items, iteration, today, now, since, sinceLabel, staleDays, goal, recordRef, activity }) {
  const sprintEnd = addDays(iteration.startDate, iteration.duration - 1);
  const sprintStart = taipeiMidnight(iteration.startDate);
  const dayNo = diffDays(iteration.startDate, today) + 1;
  const sorted = [...items].sort(byPriority);
  const mine = sorted.filter((i) => i.iterationId === iteration.id);
  const count = (s) => mine.filter((i) => is(i, s)).length;
  const byNumber = new Map(items.filter((i) => i.number).map((i) => [i.number, i]));

  const doneSince = mine.filter((i) => is(i, DONE) && i.statusAt && i.statusAt >= since);
  const active = mine.filter((i) => is(i, IN_PROGRESS, IN_REVIEW));
  const ready = mine.filter((i) => is(i, READY));
  const stale = active.filter((i) => (daysIn(i, now) ?? 0) >= staleDays);
  // 被退回的 AI Draft（Close as not planned）還留在看板上當證據，不算待審
  const aiDraft = items.filter((i) => is(i, AI_DRAFT) && i.state !== 'CLOSED').length;

  // 看板提醒：這些情況會讓 Daily 漏列或數字不準
  const notCommitted = mine.filter((i) => !is(i, READY, IN_PROGRESS, IN_REVIEW, DONE));
  const outside = sorted.filter((i) => i.iterationId !== iteration.id && is(i, READY, IN_PROGRESS, IN_REVIEW));
  const doneOutside = sorted.filter(
    (i) => i.iterationId !== iteration.id && is(i, DONE) && i.statusAt && i.statusAt >= sprintStart,
  );
  const closedNotDone = mine.filter((i) => i.state === 'CLOSED' && !is(i, DONE));
  const ok = activity && !activity.error;
  const branchNotStarted = (ok ? activity.commits : []).filter(
    (c) => c.issue && byNumber.has(c.issue) && !is(byNumber.get(c.issue), IN_PROGRESS, IN_REVIEW, DONE),
  );

  // PR 等太久：連結的卡已經列在阻礙的就不重複列
  const staleCards = new Set(stale.map((i) => i.number));
  const stalePRs = (ok ? activity.open : []).filter(
    (p) => !p.draft && ageDays(p.createdAt, now) >= staleDays && !p.refs.some((n) => staleCards.has(n)),
  );

  const L = [];
  L.push(`<!-- daily-bot:${today} generated:${now.toISOString()} -->`);
  L.push(`## ${mmdd(today)} Daily`, '');
  L.push('> 由 GitHub Actions 依看板自動整理，不使用 AI。重跑時會覆蓋這則留言，補充請用回覆。');
  L.push('> SM 請回覆「已確認」並補上阻礙；有阻礙或用了 AI 的人請各自回覆。', '');
  L.push(`**${iteration.title}**（${mmdd(iteration.startDate)}–${mmdd(sprintEnd)}）第 ${dayNo}/${iteration.duration} 天`);
  L.push(
    `**Sprint Goal**：` +
      (goal ??
        (recordRef ? `⚠️ ${recordRef} 的內文還沒有「Sprint Goal：」這一行（流程 B-3）` : '（找不到本期 Sprint 紀錄）')),
  );
  L.push(
    `**進度**：` +
      (mine.length
        ? `Done ${count(DONE)}/${mine.length} 張｜` + [READY, IN_PROGRESS, IN_REVIEW].map((s) => `${s} ${count(s)}`).join('・')
        : '本期還沒有排卡'),
  );
  if (aiDraft) L.push(`看板上有 ${aiDraft} 張 AI Draft 等 PO 審查。`);

  const notes = [];
  if (notCommitted.length) {
    notes.push(`設了本期 Sprint，但還沒移到 Ready：${listWith(notCommitted, (i) => i.status ?? '沒有狀態')}`);
  }
  if (outside.length) {
    notes.push(
      `在 Ready 或進行中，但 Sprint 不是本期，下面不會列出：` +
        listWith(outside, (i) => `${i.status}，${i.sprintTitle ?? '沒有設 Sprint'}`),
    );
  }
  if (doneOutside.length) {
    notes.push(
      `這輪移到 Done，但 Sprint 不是本期，不會算進本 Sprint 完成張數：` +
        listWith(doneOutside, (i) => i.sprintTitle ?? '沒有設 Sprint'),
    );
  }
  if (closedNotDone.length) {
    notes.push(`Issue 已關閉，但卡片沒移到 Done（見流程「常見狀況」）：${listWith(closedNotDone, (i) => i.status)}`);
  }
  if (branchNotStarted.length) {
    notes.push(
      `分支有新 commit，但卡片還沒移到 In progress（流程 C-1）：` +
        branchNotStarted
          .map((c) => `${c.branch} → ${label(byNumber.get(c.issue))}（${byNumber.get(c.issue).status ?? '沒有狀態'}）`)
          .join('、'),
    );
  }
  if (notes.length) L.push('', '**看板提醒（請 SM 確認）**', ...notes.map((n) => `- ⚠️ ${n}`));

  L.push('', '### 完成', `${sinceLabel}移到 Done：`);
  L.push(...(doneSince.length ? doneSince.map((i) => `- ${label(i)}｜${who(i)}`) : ['- 無']));
  L.push(`本 Sprint 累計 Done ${count(DONE)} 張。`);

  L.push('', '### 進行中');
  L.push(
    ...(active.length
      ? active.map((i) => {
          const note = is(i, IN_REVIEW) ? '（等審查或驗收）' : '';
          return `- ${label(i)}｜${who(i)}｜${i.status} ${daysText(daysIn(i, now))}${note}`;
        })
      : ['- 沒有進行中的卡']),
  );
  if (ready.length) L.push(`尚未開工（Ready）：${listWith(ready, who)}`);

  L.push('', '### 開發活動');
  if (!ok) {
    L.push(`- 讀不到分支和 PR：${activity?.error ?? '未知原因'}`);
  } else {
    L.push(`${sinceLabel}：`);
    const c = activity.commits;
    L.push(
      `- 新 commit：` +
        (c.length
          ? c.map((x) => `${x.branch} ${x.count} 個（${x.authors.join('、')}）`).join('、')
          : activity.hasDev
            ? '沒有'
            : `沒有（找不到 ${activity.devBranch} 分支，無法比對）`),
    );
    L.push(
      `- 合併的 PR：` +
        (activity.merged.length ? activity.merged.map((p) => `#${p.number} ${p.title}（${p.author}）`).join('、') : '沒有'),
    );
    L.push(
      `- 開著的 PR：` +
        (activity.open.length
          ? activity.open
              .map((p) => `#${p.number} ${p.title}（${p.author}，${p.draft ? '草稿' : waitText(ageDays(p.createdAt, now))}）`)
              .join('、')
          : '沒有'),
    );
  }

  L.push('', '### 阻礙');
  if (stale.length || stalePRs.length) {
    L.push(`以下停在原地 ${staleDays} 天以上。In progress 的卡請負責人說明原因；In review 的卡和 PR 請審查者或 PO 處理：`);
    L.push(...stale.map((i) => `- ⚠️ ${label(i)}｜${who(i)}｜${i.status} ${daysText(daysIn(i, now))}`));
    L.push(...stalePRs.map((p) => `- ⚠️ PR #${p.number} ${p.title}｜${p.author}｜${waitText(ageDays(p.createdAt, now))}`));
  } else {
    L.push(`看板和 PR 都沒有停在原地 ${staleDays} 天以上的。其他阻礙請回覆補充。`);
  }

  L.push('', '### AI');
  L.push('有用 AI 的人請回覆：用在哪張卡、做了什麼，並記到 Wiki「AI 使用紀錄」。');

  L.push('', '---', '**回覆範本**（複製後填寫；「已確認」只有 SM 要寫）', '```', '已確認', '今天要做：', '阻礙：無', 'AI：無', '```');
  return L.join('\n');
}

// ---------- 主流程 ----------

// Actions 的 annotation 不能有換行，要轉碼
const escapeCmd = (s) => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');

export async function main(env = process.env, now = new Date()) {
  const repo = env.GITHUB_REPOSITORY;
  const owner = env.PROJECT_OWNER || 'cm4578';
  const number = Number(env.PROJECT_NUMBER || 2);
  const devBranch = env.DEV_BRANCH || 'develop';
  const staleDays = Number(env.STALE_DAYS || 2);
  const dailyDays = (env.DAILY_DAYS ?? '')
    .split(/[,，、\s]+/)
    .map(Number)
    .filter((n) => Number.isInteger(n) && n > 0);
  const dryRun = String(env.DRY_RUN).toLowerCase() === 'true';
  const inActions = env.GITHUB_ACTIONS === 'true';
  const annotate = (level, msg) => console.log(inActions ? `::${level}::${escapeCmd(msg)}` : `[${level}] ${msg}`);
  const summary = (text) => env.GITHUB_STEP_SUMMARY && appendFileSync(env.GITHUB_STEP_SUMMARY, `${text}\n`);

  if (!env.PROJECT_TOKEN) throw new BotError('缺少 secret PROJECT_TOKEN。');
  if (!env.GITHUB_TOKEN || !repo) throw new BotError('缺少 GITHUB_TOKEN 或 GITHUB_REPOSITORY。');

  const today = taipeiDate(now);
  const { iterations, items } = await fetchProject(env.PROJECT_TOKEN, owner, number);
  const iteration = currentIteration(iterations, today);
  if (!iteration) {
    const msg = `今天（${today}）不在任何 Sprint 內，不產生 Daily。`;
    annotate('notice', msg);
    summary(msg);
    return { posted: false, reason: 'no-sprint' };
  }
  const dayNo = diffDays(iteration.startDate, today) + 1;

  // 排程只在指定的 Sprint 天數貼；手動執行（workflow_dispatch）和本機預覽不受限制
  if (env.GITHUB_EVENT_NAME === 'schedule' && dailyDays.length && !dailyDays.includes(dayNo)) {
    const msg = `今天是 ${iteration.title} 第 ${dayNo} 天，Daily 排在第 ${dailyDays.join('、')} 天，今天不產生。`;
    annotate('notice', msg);
    summary(msg);
    return { posted: false, reason: 'not-daily-day' };
  }

  // 找本期 Sprint 紀錄 Issue：每輪開新的也找得到，不寫死編號
  const titleRe = recordTitleRegex(iteration.title);
  const records = (await restAll(env.GITHUB_TOKEN, `/repos/${repo}/issues?labels=sprint-record&state=open`))
    .filter((i) => !i.pull_request && titleRe.test(i.title))
    .sort((a, b) => b.number - a.number);
  const record = records[0] ?? null;
  if (records.length > 1) {
    annotate('warning', `有 ${records.length} 張 open 的 ${iteration.title} 紀錄，使用最新的 #${record.number}。`);
  }

  // 上一則 Daily 產生的時間，決定「完成」和「開發活動」從什麼時候算起
  let since = taipeiMidnight(iteration.startDate);
  let sinceLabel = `自 ${iteration.title} 開始以來`;
  let todayComment = null;
  if (record) {
    const comments = await restAll(env.GITHUB_TOKEN, `/repos/${repo}/issues/${record.number}/comments`);
    for (const c of comments) {
      const m = /<!-- daily-bot:(\d{4}-\d{2}-\d{2})(?: generated:(\S+))? -->/.exec(c.body ?? '');
      if (!m) continue;
      const generated = new Date(m[2] ?? c.created_at);
      if (m[1] === today) todayComment = c;
      else if (m[1] < today && !Number.isNaN(generated.getTime()) && generated > since) {
        since = generated;
        sinceLabel = `自 ${mmdd(m[1])} Daily 以來`;
      }
    }
  }

  // 開發活動讀不到時（例如 API 暫時失敗）照樣產生 Daily，只在那一段註明
  let activity;
  try {
    activity = await fetchActivity(env.GITHUB_TOKEN, repo, { since, devBranch });
  } catch (err) {
    activity = { error: err.message.split('\n')[0] };
    annotate('warning', `讀不到分支和 PR：${err.message}`);
  }

  const body = buildReport({
    items,
    iteration,
    today,
    now,
    since,
    sinceLabel,
    staleDays,
    goal: record ? extractSprintGoal(record.body) : null,
    recordRef: record ? `#${record.number}` : null,
    activity,
  });
  console.log(body);
  summary(body);

  if (!record) {
    const msg =
      `找不到標題含「${iteration.title}」、貼了 sprint-record 的 open Issue。` +
      '請 SM 先開本期 Sprint 紀錄 Issue（流程 B-1）。';
    if (dryRun) {
      annotate('warning', msg);
    } else if (dayNo === 1) {
      // Sprint 第一天通常還在 Sprint Planning，紀錄 Issue 可能還沒開，不算失敗
      annotate('notice', `今天是 ${iteration.title} 第一天。${msg}今天先不貼，開好後可以手動執行。`);
      return { posted: false, reason: 'day1-no-record', body };
    } else {
      throw new BotError(msg);
    }
  }

  if (dryRun) {
    console.log('\n（DRY_RUN：只預覽，沒有貼留言）');
    return { posted: false, reason: 'dry-run', body };
  }
  if (todayComment) {
    await rest(env.GITHUB_TOKEN, 'PATCH', `/repos/${repo}/issues/comments/${todayComment.id}`, { body });
    console.log(`\n已更新 #${record.number} 的今日 Daily：${todayComment.html_url}`);
    return { posted: true, updated: true, issue: record.number, body };
  }
  const created = await rest(env.GITHUB_TOKEN, 'POST', `/repos/${repo}/issues/${record.number}/comments`, { body });
  console.log(`\n已貼到 #${record.number}：${created.html_url}`);
  return { posted: true, updated: false, issue: record.number, body };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    const msg = err?.message ?? String(err);
    console.error(process.env.GITHUB_ACTIONS === 'true' ? `::error::${escapeCmd(msg)}` : msg);
    if (!(err instanceof BotError)) console.error(err?.stack);
    process.exit(1);
  });
}
