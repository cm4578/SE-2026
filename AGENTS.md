# AGENTS.md

本檔案給在這個 repo 工作的 AI agent 閱讀。開始任何工作前，先讀完本檔案。

## 專案

- 台科大軟體工程期中專案，題目是「二手書交易平台」，規格見 `docs/notes/product-spec.md`。
- 作業要求用 Waterfall + AI 與 Agile + AI 兩種方法做到需求分析，並畫出系統設計的 UML。Agile 的流程見 `docs/agile-ai-workflow.md`。
- 成員兩人：`cm4578` 是 Product Owner（PO），`GaoJie0648` 是 Scrum Master 兼 Developer。
- 看板：[軟體工程Agile](https://github.com/users/cm4578/projects/1)（GitHub Projects）。

## 必讀規範

做下列事情之前，必須先讀完對應的文件並遵守：

| 要做的事 | 先讀 |
|---|---|
| `git commit`、撰寫 PR 標題 | `docs/COMMIT_CONVENTION.md` |
| 建立分支、push、開 PR、合併、打 tag | `docs/GITFLOW.md` |
| 起草或檢查 User Story、估點、畫 UML、寫 Daily 紀錄 | `docs/agile-ai-workflow.md` |

本檔案只是摘要。細節與本檔案不同時，以上表的文件為準。

## 核心原則

**AI 可以起草，只有人可以接受，每次使用都要記錄。**

1. **人工關卡不能跳過**：Story 由 PO 接受；估點與 Sprint 由團隊決定；PR 由作者以外的組員核准並合併；issue 由 PO 驗收後手動關閉。
2. **先問再動作**：commit、push、開 PR、打 tag 之前，必須先取得人的同意。禁止合併或核准 PR，禁止 force push。權限表見 `docs/GITFLOW.md` 8.1 節。
3. **不自行新增需求**：筆記或規格書沒提到的需求，列成待確認問題，禁止直接寫進 Story 或文件。規格書已經排除的功能（例如線上付款、真實物流串接、平台收費）禁止提出。
4. **保留證據**：被拒絕的 Story 與 issue 不要刪除，它們是報告需要的證據。
5. **不放機密**：禁止把機密資料或個資放進 prompt、程式碼或文件。
6. **BMAD 只用允許的範圍**：依 `docs/agile-ai-workflow.md` 的「BMAD 使用範圍」。禁止無人值守的流程（`bmad-build-auto`、BMad Loop）。Agile 的工作不使用 `bmad-prd`，因為 PRD 是 Waterfall 的產出。

## AI 使用紀錄

每次 AI 的產出被採用、修改或拒絕，都在 `docs/ai-log.md` 新增一列，欄位依該檔案的表格：

- 寫清楚接受、修改或拒絕了什麼，以及原因。AI 出錯的地方也要記錄，報告會用到。
- 時間沒有記錄就寫「未記錄」，禁止事後估算。
- 還沒有人審查時，核准者寫「待 `<帳號>` 審查」，禁止替人填寫核准。

## 語言

- 文件、commit message、PR 與 issue 一律使用繁體中文（台灣用語），對話使用其他語言時也一樣。用語表見 `docs/COMMIT_CONVENTION.md` 3.2 節。
- 分支名稱的描述使用中文，type 維持英文，例如 `docs/12-訂單流程循序圖`。
- UML 用 Mermaid 或 PlantUML 起草，由人修改後才 commit。

## 目錄

| 路徑 | 內容 |
|---|---|
| `AGENTS.md` | 本檔案 |
| `docs/COMMIT_CONVENTION.md` | commit message 規範 |
| `docs/GITFLOW.md` | 分支、PR、發布與 hotfix 流程 |
| `docs/agile-ai-workflow.md` | Agile + AI 工作流程 |
| `docs/notes/` | 需求筆記與題目規格書 |
| `docs/ai-log.md` | AI 使用紀錄 |
