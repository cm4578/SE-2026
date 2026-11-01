# AI 使用紀錄

每次使用 AI 都新增一列。時間未記錄時寫「未記錄」，不要事後估算。

| 日期 | 階段 | 工具／模型 | 問了什麼 | AI 產出 | 接受／拒絕及原因 | 核准者 | 時間 |
|---|---|---|---|---|---|---|---|
| 11/01 | 流程規劃 | Claude Code / Claude Opus 5.5 | 如何結合 Agile、AI 與 BMAD | `docs/agile-ai-workflow.md` 草稿 | AI 原本建議 PR 寫 `Closes #12`，會跳過 PO 驗收，已改為 `Refs #12`；依 11/8 繳交推算的範圍取捨，因日期理解有誤而撤回 | 待 `cm4578` 審查 | 未記錄 |
| 11/01 | 規格轉檔 | Claude Code / Claude Opus 5.5 | 把 Claude Docs 規格書轉成 Markdown，訂單流程圖轉成 Mermaid | `docs/notes/product-spec.md` | 待審查 | 待 `cm4578` 審查 | 未記錄 |
| 11/01 | 開發規範 | Claude Code / Claude Opus 5.5 | 制定 GitFlow 規範（分支名稱用中文）、建立 AGENTS.md、設定 GitFlow | `docs/GITFLOW.md`、`AGENTS.md`、`develop` 分支；`docs/COMMIT_CONVENTION.md` 改為只用 `Refs`；修正 `docs/agile-ai-workflow.md` 的分支與 commit 範例 | 待審查。agent 入口原本由 AI 建議用 `CLAUDE.md`，使用者改為 `AGENTS.md` | 待 `cm4578` 審查 | 未記錄 |
