# GitFlow 分支規範

本文件規範本專案的分支模型、分支命名、合併與發布流程。**AI agent 在建立分支、push、開 PR、合併或打 tag 之前，必須先讀完並遵守本文件**；人類開發者同樣適用。commit message 的寫法見 [`COMMIT_CONVENTION.md`](COMMIT_CONVENTION.md)。

本文件以 [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/) 為基礎，加上 `docs` 分支類型、中文分支名稱，以及 agent 專用的規則。

本文件用語：

- **必須**：一定要做（MUST）
- **禁止**：一定不能做（MUST NOT）
- **建議**：沒有特別理由就應該這樣做（SHOULD）

## 快速摘要

1. 長期分支只有 `main` 與 `develop`，名稱維持英文。禁止直接在這兩條分支上 commit 或 push。
2. 其他分支的格式為 `<type>/<issue 編號>-<描述>`，例如 `feature/8-ISBN帶入書籍資料`。type 使用英文小寫，描述使用繁體中文。
3. type 只有 `feature` `bugfix` `docs` `release` `hotfix` 五種。
4. 描述 2 到 15 個字，只能有中文、英文字母與數字，不加空格、標點或任何分隔符號。
5. `feature` `bugfix` `docs` 從 `develop` 開出，合併回 `develop`。`release` 從 `develop` 開出、`hotfix` 從 `main` 開出，兩者都是先合併到 `main`，再合併回 `develop`。
6. 所有合併都透過 PR，由作者以外的組員核准，並使用「Create a merge commit」。
7. PR 與 commit 只寫 `Refs #N`，禁止寫 `Closes`、`Fixes`、`Resolves`。issue 由 PO 驗收後手動關閉。
8. agent 可以自行建立本機分支；commit、push、開 PR 與打 tag 之前必須取得人的同意；禁止合併 PR、核准 PR 與 force push。

## 1. 專案設定

團隊可依需求修改下表；agent 必須以下表為準。

| 項目 | 設定值 |
|---|---|
| 長期分支 | `main`（繳交版本）、`develop`（開發整合） |
| GitHub 預設分支 | `main` |
| 允許的分支 type | `feature` `bugfix` `docs` `release` `hotfix` |
| 分支描述語言 | 繁體中文，台灣用語 |
| 描述長度 | 2 到 15 個字（中文字、英文字母、數字各算 1 個字） |
| issue 編號 | `feature` `bugfix` `hotfix` 必填；`docs` 有對應 issue 時必填 |
| 合併方式 | 只用「Create a merge commit」，不用 squash 與 rebase merge |
| PR 核准 | 至少 1 位作者以外的組員 |
| issue 參照 | 只用 `Refs #N`，issue 由 PO 手動關閉 |
| 版本號與 tag | `vMAJOR.MINOR.PATCH`，例如 `v1.0.0`（見第 7 節） |
| 看板 | [軟體工程Agile](https://github.com/users/cm4578/projects/1) |

本文件生效前已經存在的分支（例如 `docs/agile-workflow`）維持原名，禁止為了改名而重建或改寫。

## 2. 分支模型

### 2.1 長期分支

| 分支 | 用途 | 如何更新 |
|---|---|---|
| `main` | 繳交給助教與 Moodle 的版本。每個 commit 都要是可以交出去的狀態，每次發布都打上 tag | 只能由 `release` 或 `hotfix` 的 PR 合併 |
| `develop` | 下一個版本的整合分支，Sprint 中完成的 Story 都合併到這裡 | 只能由 PR 合併 |

- 禁止直接在 `main` 或 `develop` 上 commit、push、rebase 或 reset。
- 禁止刪除或重新命名 `main` 與 `develop`。

### 2.2 支援分支

| type | 用途 | 從哪裡開出 | 合併到 | 範例 |
|---|---|---|---|---|
| `feature` | 新功能或程式碼的改動 | `develop` | `develop` | `feature/8-ISBN帶入書籍資料` |
| `bugfix` | 修正 `develop` 上已經合併的錯誤 | `develop` | `develop` | `bugfix/31-同一本書重複售出` |
| `docs` | 只改文件：SRS／PRD、UML、報告、流程文件、AI 使用紀錄 | `develop` | `develop` | `docs/12-訂單流程循序圖` |
| `release` | 準備繳交或發布的版本 | `develop` | 先 `main`，再 `develop` | `release/v1.0.0-期中繳交` |
| `hotfix` | 修正 `main`（已繳交版本）上的錯誤 | `main` | 先 `main`，再 `develop` | `hotfix/40-循序圖錯字` |

- 一條分支只處理一個 issue。同時做兩個 issue 時，開兩條分支。
- **建議**分支在 3 天內（一個 Sprint）合併，避免和 `develop` 差太多。
- 分支 type 與 commit type 不必一一對應。例如 `feature` 分支上可以有 `test`、`refactor` 的 commit。

### 2.3 如何選擇 type

依序回答下列問題，**採用第一個答案為「是」的 type**：

1. 是否要準備繳交或發布的版本？→ `release`
2. 是否要修正 `main` 上（已經繳交）的錯誤？→ `hotfix`
3. 是否要修正 `develop` 上已經合併的程式錯誤？→ `bugfix`
4. 是否只改文件，不改程式碼？→ `docs`
5. 以上皆否 → `feature`

`release` 與 `hotfix` 只在人明確要求時才開，agent 禁止自行決定要發布或要緊急修正。

## 3. 分支命名

### 3.1 格式

```text
feature/<issue 編號>-<描述>
bugfix/<issue 編號>-<描述>
hotfix/<issue 編號>-<描述>
docs/<issue 編號>-<描述>      有對應 issue 時
docs/<描述>                   沒有對應 issue 時
release/v<版本號>-<描述>
```

- type、`/`、issue 編號與 `-` 都是半形字元。type 必須是英文小寫，禁止翻成中文（例如 `功能/`、`修正/`）。
- issue 編號是 GitHub issue 的數字，不加 `#`，也不補零：寫 `12`，不寫 `#12` 或 `012`。
- issue 編號只能來自使用者提供的內容或 `gh issue` 查到的結果。**禁止猜測或捏造 issue 編號**。
- `release` 的版本號規則見第 7 節。

### 3.2 描述的寫法

- 必須使用繁體中文（台灣用語），禁止簡體字，也禁止整段使用英文。用語參考 `COMMIT_CONVENTION.md` 3.2 節。
- 沒有通用中文譯名的專有名詞與縮寫可以保留英文，例如 ISBN、UML、SRS、API、Email。中文與英文直接相連，不加空格，例如 `ISBN帶入書籍資料`。
- 寫出這條分支要完成的東西，讓人只看分支名稱就知道在做什麼：
  - `feature`、`docs`：寫功能或文件的名稱，例如 `下單鎖定庫存`、`使用案例圖`。
  - `bugfix`、`hotfix`：寫出要修正的問題，例如 `同一本書重複售出`、`循序圖錯字`。
  - `release`：寫這個版本的用途，例如 `期中繳交`、`需求與架構定案`。
- 不重複 type 的意思：`feature` 不加「新增」「功能」，`bugfix` 與 `hotfix` 不加「修正」「錯誤」。
- 禁止空泛的描述，例如 `修改`、`測試`、`暫存`、`雜項`、`WIP`。
- **建議**描述與 issue 標題一致，再縮短到 15 個字以內。

### 3.3 字元限制

描述只能包含中文字、英文字母 `A-Z` `a-z` 與數字 `0-9`。禁止：

- 空格，包括半形與全形空格
- 任何標點，包括全形的 `，` `。` `、` `：` `（）` `「」`，以及半形的 `_` `.` `#` `@` `~` `^` `:` `?` `*` `[` `\`
- 在描述中再加 `-` 或 `/`。`-` 只用來分隔 issue 編號（或版本號）與描述
- emoji

這些限制除了統一格式，也避開 git 不接受的字元，以及在 Windows、終端機與網址中容易出問題的字元。

### 3.4 檢查指令

建立分支前，必須先用下列函式檢查名稱。輸出 `OK` 才能建立；其他輸出代表名稱不合法，要依訊息修正。macOS 與 Linux 直接在終端機執行；Windows 請在 Git Bash 執行。

```bash
check_branch() {
  git check-ref-format --branch "$1" >/dev/null 2>&1 || { echo "不合法：git 不接受這個分支名稱"; return 1; }
  printf '%s' "$1" | perl -CS -Mutf8 -e '
    my $n = do { local $/; <STDIN> };
    my $d;
    if    ($n =~ m{^(?:feature|bugfix|hotfix)/[1-9][0-9]*-([\p{Han}A-Za-z0-9]+)$}) { $d = $1 }
    elsif ($n =~ m{^docs/(?:[1-9][0-9]*-)?([\p{Han}A-Za-z0-9]+)$})               { $d = $1 }
    elsif ($n =~ m{^release/v[0-9]+\.[0-9]+\.[0-9]+-([\p{Han}A-Za-z0-9]+)$})      { $d = $1 }
    else  { print "不合法：格式不符，請對照第 3 節\n"; exit 1 }
    $d =~ /\p{Han}/                     or do { print "不合法：描述必須有中文\n"; exit 1 };
    (length $d >= 2 && length $d <= 15) or do { print "不合法：描述必須是 2 到 15 個字\n"; exit 1 };
    print "OK\n";
  '
}

check_branch "docs/12-訂單流程循序圖"   # OK
```

這個函式只檢查格式，無法判斷簡體字、空泛描述或重複 type 的意思，這些要由 agent 自行對照 3.2 節確認。

## 4. 日常流程（feature、bugfix、docs）

### 4.1 開分支

1. 確認工作區是乾淨的：

   ```bash
   git status --short
   ```

   有未 commit 的變更時，先問人怎麼處理。禁止自行 `stash`、`reset` 或丟棄變更。

2. 確認 issue 存在、沒有關閉，而且已經由 PO 接受（看板狀態為 Ready 或 In Progress）：

   ```bash
   gh issue view 12 --json number,title,state,labels,projectItems
   ```

   issue 還在 AI Draft、帶有 `ai-invented` 標籤，或查不到看板狀態時，先問人，不要開分支。

3. 從最新的 `develop` 開出分支：

   ```bash
   git switch develop
   git pull --ff-only origin develop
   check_branch "docs/12-訂單流程循序圖"
   git switch -c "docs/12-訂單流程循序圖"
   ```

4. 回報建立的分支名稱。

分支名稱有中文，在指令中一律用雙引號包住。在 GitHub issue 頁面用「Create a branch」開分支時，預設名稱不符合本規範，必須改成本規範的格式，並把來源分支改成 `develop`。

### 4.2 開發與 commit

- commit message 必須遵守 `COMMIT_CONVENTION.md`。
- commit 前，agent 必須先列出 staged 的檔案與完整的 commit message，取得人的同意後才執行 `git commit`。
- 每次使用 AI 產出內容，都要依團隊流程記錄到 `docs/ai-log.md`。

### 4.3 同步 develop

自己的分支需要 `develop` 上的新變更，或 PR 出現衝突時，先用 `git branch -vv` 確認分支是否已經 push 過（有顯示 `[origin/...]` 就是已經 push 過）：

- **還沒** push 過：可以 rebase。

  ```bash
  git fetch origin
  git rebase origin/develop
  ```

- **已經** push 過：一律用 merge，禁止 rebase 後 force push。

  ```bash
  git fetch origin
  git merge origin/develop
  ```

遇到衝突時，列出衝突的檔案與兩邊的差異，說明建議的解法，由人決定後才完成合併。禁止不加說明就直接採用某一邊（`--ours`、`--theirs`）。

### 4.4 push 與開 PR

取得人的同意後執行：

```bash
git push -u origin "docs/12-訂單流程循序圖"

gh pr create --base develop --head "docs/12-訂單流程循序圖" \
  --title "docs: 新增訂單流程循序圖" \
  --body-file - <<'EOF'
## 變更內容
- <這個 PR 做了什麼>

## 關聯 Issue
Refs #12

## AI 使用
- 工具／模型：<沒有使用 AI 就寫「無」>
- AI 產出的部分：<哪些內容由 AI 起草，人修改了什麼>
- 已記錄到 docs/ai-log.md：<是／否>

## 審查重點
- <希望審查者特別確認的地方>
EOF
```

- `--base` 必須明確指定。GitHub 預設分支是 `main`，省略 `--base` 會把 PR 開到 `main`。
- PR 標題遵守 `COMMIT_CONVENTION.md` 的 header 格式，不放 issue 編號。
- PR 內文必須包含 `Refs #<issue 編號>`，每個 issue 一行。
- **禁止**在 PR 標題、PR 內文與 commit message 中使用 `Closes`、`Fixes`、`Resolves` 等關閉關鍵字。這些字會讓 issue 自動關閉，跳過 PO 驗收；寫在 commit message 裡的，還會在 release 合併到 `main` 時一次關閉所有相關 issue。commit message 的規則見 `COMMIT_CONVENTION.md` 6.2 節。
- 開完 PR 後，回報 PR 連結，並提醒人把 Story 移到 In Review。

### 4.5 審查與合併（由人執行）

1. 作者以外的組員對照 issue 的驗收條件審查。禁止核准自己的 PR。
2. 核准後，在 GitHub 選「Create a merge commit」合併。
3. 合併後，在 PR 頁面按「Delete branch」刪除遠端分支。
4. PO 逐條核對驗收條件，全部符合就手動關閉 issue，並移到 Done。

agent 禁止合併 PR、核准 PR，也禁止關閉 issue。

### 4.6 合併後清理

人確認 PR 已經合併後，agent 可以清理本機分支：

```bash
git switch develop
git pull --ff-only origin develop
git branch -d "docs/12-訂單流程循序圖"
git fetch --prune
```

只能用 `-d`。`-d` 拒絕刪除，代表分支上還有沒合併的 commit，必須回報給人，禁止改用 `-D`。

## 5. 發布流程（release）

只有人明確要求發布時才執行。

1. 從最新的 `develop` 開出 release 分支：

   ```bash
   git switch develop
   git pull --ff-only origin develop
   check_branch "release/v1.0.0-期中繳交"
   git switch -c "release/v1.0.0-期中繳交"
   ```

2. release 分支上只能做發布前的收尾：修正錯字、更新版本與繳交資訊、修正最後檢查發現的小錯誤。**禁止加入新功能**，新功能留到下一個版本。這些收尾直接 commit 在 release 分支上，仍須依 4.2 節取得同意。
3. 取得同意後 push，並開 PR 到 `main`。PR 內文列出這個版本包含的 issue，每個 issue 一行 `Refs #N`：

   ```bash
   git push -u origin "release/v1.0.0-期中繳交"
   gh pr create --base main --head "release/v1.0.0-期中繳交" \
     --title "chore: 發布 v1.0.0 期中繳交版本" --body-file - <<'EOF'
   ## 版本內容
   - <這個版本包含的功能與文件>

   ## 關聯 Issue
   Refs #8
   Refs #12
   EOF
   ```

4. 由人審查，並以「Create a merge commit」合併到 `main`。
5. 在 `main` 上打 tag（見第 7 節）。
6. 開第二個 PR，把同一條 release 分支合併回 `develop`：

   ```bash
   gh pr create --base develop --head "release/v1.0.0-期中繳交" \
     --title "chore: 將 v1.0.0 的修正合併回 develop" --body "Refs #8"
   ```

   有衝突時，依 4.3 節在 release 分支上 merge `origin/develop`，解決後再 push。

7. 兩個 PR 都合併後，由人刪除遠端的 release 分支。

## 6. 緊急修正流程（hotfix）

只有人明確要求時才執行。用在已經繳交的版本（`main`）有錯誤，而且不能等下一次 release 的情況。

1. 從最新的 `main` 開出分支：

   ```bash
   git switch main
   git pull --ff-only origin main
   check_branch "hotfix/40-循序圖錯字"
   git switch -c "hotfix/40-循序圖錯字"
   ```

2. 只修正這個問題，不夾帶其他變更。
3. 開 PR 到 `main`（`--base main`），合併後打 PATCH 版本的 tag，例如 `v1.0.1`。
4. 再開 PR，把同一條 hotfix 分支合併回 `develop`。如果當時有還沒合併的 release 分支，改為合併到那條 release 分支。
5. 兩個 PR 都合併後，由人刪除遠端的 hotfix 分支。

## 7. 版本號與 tag

- 版本號格式為 `vMAJOR.MINOR.PATCH`。tag 名稱與版本號相同，只用英文與數字；中文說明寫在 tag message。
- 版本號由人決定，agent 可以依下表提出建議：

  | 情況 | 版本變化 | 範例 |
  |---|---|---|
  | 繳交前的里程碑，例如需求與架構定案 | MINOR 加 1 | `v0.1.0` → `v0.2.0` |
  | 期中繳交到 Moodle 的版本 | 定為 `v1.0.0` | `v1.0.0` |
  | 繳交後的 hotfix | PATCH 加 1 | `v1.0.0` → `v1.0.1` |

- tag 只能打在 `main` 上，而且要在 release 或 hotfix 的 PR 合併之後。打 tag 與 push tag 都必須先取得人的同意：

  ```bash
  git switch main
  git pull --ff-only origin main
  git tag -a v1.0.0 -m "期中繳交版本"
  git push origin v1.0.0
  ```

- 禁止移動或刪除已經 push 的 tag。

## 8. Agent 行為規則

### 8.1 權限

| 操作 | agent 權限 |
|---|---|
| `git status`、`log`、`diff`、`fetch`、`branch --list`、`gh issue view`、`gh pr view` 等只讀取的指令 | 可以直接執行 |
| 從最新的 `develop`（hotfix 為 `main`）建立本機分支 | 名稱通過 3.4 節檢查後，可以直接執行 |
| 工作區乾淨時切換分支、`git pull --ff-only` | 可以直接執行 |
| `git add <路徑>` | 可以直接執行 |
| `git commit` | 先列出 staged 檔案與 commit message，人同意後才執行 |
| 把 `develop` merge 或 rebase 進自己的分支 | 人同意後才執行 |
| `git push` 支援分支 | 人同意後才執行 |
| `gh pr create` | 人同意後才執行 |
| 建立與 push tag | 人同意後才執行，而且只在 release 或 hotfix 合併到 `main` 之後 |
| `git branch -d` 刪除本機分支 | 人確認 PR 已經合併後才執行 |
| 合併 PR、核准 PR、關閉 issue、把卡片移到 Done | 禁止，由人執行 |
| 在 `main`、`develop` 上 commit 或 push | 禁止 |
| `push --force`、`push --force-with-lease`、`reset --hard`、`branch -D`、改寫已經 push 的 commit | 禁止 |
| 刪除遠端分支、移動或刪除已經 push 的 tag | 禁止 |
| 修改 GitHub 分支保護、repo 設定或 `git config` | 禁止 |
| `--no-verify` | 禁止，除非使用者明確要求 |

使用者在指示中明確要求的動作（例如「commit 並開 PR」）就算已經同意；指示中沒有提到的動作，仍要另外詢問。

### 8.2 行為規則

1. **先看狀態再動作**：任何分支操作前，先執行 `git status` 與 `git fetch origin`，確認目前所在的分支與工作區狀態。
2. **禁止捏造**：issue 編號、版本號與 PR 編號，只能來自使用者提供的內容或指令實際回傳的結果。
3. **尊重人工關卡**：issue 沒有經過 PO 接受就不開分支；PR 由人合併；issue 由 PO 關閉。
4. **先檢查名稱**：建立分支前必須通過 3.4 節的檢查，並自行確認 3.2 節的用語規則。
5. **一次一個 issue**：發現工作範圍超出目前的 issue 時，停下來告訴人，建議另開 issue 與分支。禁止把無關的變更放進目前的分支。
6. **遇到意外就停**：遇到衝突、`--ff-only` 失敗、push 被拒絕或分支已經存在時，回報狀況與建議的處理方式，由人決定。禁止用 force、reset 或刪除分支來繞過。
7. **回報結果**：每完成一個分支操作，回報目前所在的分支，以及建立或推送的分支名稱、PR 連結。
8. **使用者指定優先**：使用者指定的分支名稱不符合本文件時，先提醒並提出符合規範的名稱；使用者堅持時，照使用者指定的名稱建立。

## 9. 初次設定（由人執行一次）

### 9.1 建立 develop

```bash
git switch main
git pull --ff-only origin main
git switch -c develop
git push -u origin develop
```

### 9.2 GitHub 設定

- **Settings → General → Pull Requests**：只勾選「Allow merge commits」，取消「Allow squash merging」與「Allow rebase merging」。不要勾選「Automatically delete head branches」，因為 release 與 hotfix 分支要合併兩次。
- **Settings → Rules → Rulesets**（或 **Settings → Branches**）：對 `main` 與 `develop` 啟用下列規則：
  - Require a pull request before merging，Required approvals 設為 1
  - Block force pushes
  - Restrict deletions
- 預設分支維持 `main`，讓助教打開 repo 時看到的是繳交版本。

私人 repo 要有 GitHub Pro 以上的方案，分支保護才會生效（學生可以透過 GitHub Education 免費取得 Pro）。沒有時，靠本文件與 PR 審查約束。

### 9.3 本機設定

- 讓 `git status` 正常顯示中文檔名：

  ```bash
  git config --global core.quotepath false
  ```

- Windows PowerShell 的中文分支名稱顯示成亂碼時，執行下列指令，或改用 Git Bash：

  ```powershell
  [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
  ```

- 中文分支名稱不好輸入時，可以用 issue 編號找分支，再複製名稱：

  ```bash
  git branch --list '*/12-*'
  ```

## 10. 常見錯誤

| 錯誤寫法 | 問題 | 改正後 |
|---|---|---|
| `feature/ISBN帶入書籍資料` | 缺少 issue 編號 | `feature/8-ISBN帶入書籍資料` |
| `feature/8-isbn-autofill` | 描述不是中文 | `feature/8-ISBN帶入書籍資料` |
| `功能/8-ISBN帶入書籍資料` | type 翻成中文 | `feature/8-ISBN帶入書籍資料` |
| `Feature/8-ISBN帶入書籍資料` | type 大寫 | `feature/8-ISBN帶入書籍資料` |
| `story/12-訂單流程循序圖` | 不是允許的 type | `docs/12-訂單流程循序圖` |
| `docs/#12-訂單流程循序圖` | issue 編號加了 `#` | `docs/12-訂單流程循序圖` |
| `docs/12-訂單流程 循序圖` | 描述有空格 | `docs/12-訂單流程循序圖` |
| `docs/12_訂單流程循序圖` | 用底線分隔 | `docs/12-訂單流程循序圖` |
| `docs/12-訂單流程-循序圖` | 描述中多了 `-` | `docs/12-訂單流程循序圖` |
| `docs/12-循序圖（草稿）` | 描述有全形標點 | `docs/12-訂單流程循序圖` |
| `docs/12-订单流程时序图` | 簡體字與中國大陸用語 | `docs/12-訂單流程循序圖` |
| `feature/15-新增下單鎖定庫存功能` | 重複 type 的意思 | `feature/15-下單鎖定庫存` |
| `feature/8-使用者可以輸入ISBN自動帶入書籍資料` | 描述超過 15 個字 | `feature/8-ISBN帶入書籍資料` |
| `bugfix/31-修改` | 描述空泛 | `bugfix/31-同一本書重複售出` |
| `release/期中繳交` | 缺少版本號 | `release/v1.0.0-期中繳交` |
| 從 `develop` 開出 `hotfix/40-循序圖錯字` | hotfix 必須從 `main` 開出 | 從 `main` 開出 |
| PR 內文寫 `Closes #12` | 合併後自動關閉 issue，跳過 PO 驗收 | `Refs #12` |
| `gh pr create` 沒有加 `--base` | PR 會開到預設分支 `main` | 加上 `--base develop` |
| 用 squash 把 release 合併到 `main` | `main` 與 `develop` 的歷史分岔，之後合併容易衝突 | 用「Create a merge commit」 |

## 11. 檢查清單

### 開分支前

- [ ] 已用 `git status` 確認工作區乾淨
- [ ] issue 存在、沒有關閉，而且已經由 PO 接受
- [ ] 已依 2.3 節選定 type，並從正確的分支開出（`hotfix` 從 `main`，其他從 `develop`）
- [ ] 來源分支已經用 `git pull --ff-only` 更新到最新
- [ ] 分支名稱通過 3.4 節的檢查
- [ ] 描述是繁體中文、內容具體，沒有重複 type 的意思

### 開 PR 前

- [ ] 每個 commit 都符合 `COMMIT_CONVENTION.md`
- [ ] 分支只包含這個 issue 的變更
- [ ] push 與開 PR 都已經取得人的同意
- [ ] `--base` 正確：`feature` `bugfix` `docs` 是 `develop`；`release` 與 `hotfix` 先 `main`，再 `develop`
- [ ] PR 標題符合 commit header 格式，內文有 `Refs #N`，沒有 `Closes`、`Fixes`、`Resolves`
- [ ] PR 內文寫明 AI 使用情形，AI 產出已經記錄到 `docs/ai-log.md`
