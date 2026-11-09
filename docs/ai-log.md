# AI 使用紀錄

每次使用 AI 都新增一列。時間未記錄時寫「未記錄」，不要事後估算。完整的 prompt 貼在對應 Issue 或 PR 的留言，「問了什麼」欄寫摘要並附上留言連結。

| 日期 | 階段 | 工具／模型 | 問了什麼 | AI 產出 | 接受／拒絕及原因 | 核准者 | 時間 |
|---|---|---|---|---|---|---|---|
| 11/01 | 流程規劃 | Claude Code / Claude Opus 5.5 | 如何結合 Agile、AI 與 BMAD | `docs/agile-ai-workflow.md` 草稿 | AI 原本建議 PR 寫 `Closes #12`，會跳過 PO 驗收，已改為 `Refs #12`；依 11/8 繳交推算的範圍取捨，因日期理解有誤而撤回 | 待 `cm4578` 審查 | 未記錄 |
| 11/01 | 規格轉檔 | Claude Code / Claude Opus 5.5 | 把 Claude Docs 規格書轉成 Markdown，訂單流程圖轉成 Mermaid | `docs/notes/product-spec.md` | 待審查 | 待 `cm4578` 審查 | 未記錄 |
| 11/01 | 開發規範 | Claude Code / Claude Opus 5.5 | 制定 GitFlow 規範（分支名稱用中文）、建立 AGENTS.md、設定 GitFlow | `docs/GITFLOW.md`、`AGENTS.md`、`develop` 分支；`docs/COMMIT_CONVENTION.md` 改為只用 `Refs`；修正 `docs/agile-ai-workflow.md` 的分支與 commit 範例 | 待審查。agent 入口原本由 AI 建議用 `CLAUDE.md`，使用者改為 `AGENTS.md` | 待 `cm4578` 審查 | 未記錄 |
| 11/01 | PR 審查 | Claude Code / Claude Opus 5.5 | 要求核准並合併 PR #1 | 審查重點，並指出 `story/` 分支範例與分支保護範圍不符合新規範 | 接受審查重點；AI 依 `docs/GITFLOW.md` 不代為核准與合併，改由 `GaoJie0648` 親自執行 | `GaoJie0648` | 未記錄 |
| 11/04 | PR 審查 | Claude Code / Claude Opus 5.5 | 審查 PR #4（安裝 BMAD） | 審查意見：裝了流程文件禁用的 skill、輸出資料夾沒有規定是否納入版控、PR 內文缺少 AI 使用段落 | 接受。AI 原本說 issue #3 沒有加進看板，實際上是 token 缺少 `project` 權限讀不到，之後已更正 | 待 `cm4578` 審查 | 未記錄 |
| 11/04 | 流程評估 | Claude Code / Claude Opus 5.5 | 確認不採用部分 BMAD skill 的原因、BMAD 是否符合 Agile、不用 BMAD 時哪種做法偏向 Agile | 比對結果：BMAD 主流程必須先寫 PRD；`bmad-create-epics-and-stories` 需要 PRD 與架構文件；建議改用一般 AI 對話 | 組員討論後決定不使用 BMAD，替代做法待定。AI 出錯：原本建議從 repo 移除 `bmad-prd`，誤以為兩種方法都由本組負責，確認是兩組分工後修正；原本建議 `_bmad-output/` 可以不納入版控，之後改為建議 commit | 待 `cm4578` 審查 | 未記錄 |
| 11/04 | 文件修改 | Claude Code / Claude Opus 5.5 | 依 #5 移除 BMAD 並更正流程文件 | PR #4 關閉留言、issue #5，以及 `AGENTS.md`、`docs/agile-ai-workflow.md`、`docs/ai-log.md`、`README.md`、`docs/COMMIT_CONVENTION.md` 的修改 | 修改後接受：AI 原本把替代工具寫成一般 AI 對話，使用者改為待定；使用者要求移除文件與 commit 中的資料出處標註。AI 出錯：`gh pr close` 不支援 `--comment-file`，指令失敗，issue #3 的留言因此比 PR 實際關閉早送出 | 待 `cm4578` 審查 | 未記錄 |
| 11/09 | 文件修改 | Claude Code / Claude Opus 5.5 | 依 PR #6 的審查意見照原文套用修改建議（[prompt](https://github.com/cm4578/SE-2026/pull/6#issuecomment-6735252210)） | `docs/agile-ai-workflow.md` 的 4 處修改，以及 PR #6 的回覆留言 | 接受：4 處修改和 PO 的建議原文逐字一致 | 待 `cm4578` 審查 | 未記錄 |
