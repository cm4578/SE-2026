# UML 詳細圖

收錄二手書交易平台的七張 UML 完整版，版本為 **v1.1（2026-11-10）**。圖中的名稱、狀態及規則已統一；目前為設計草案，待團隊審查。

本目錄依 UML 圖的類型分類：`structural/` 放結構圖，`behavioral/` 放行為圖；循序圖屬於行為圖中的互動圖，再依下單與爭議情境分開。每張圖的三種格式放在同一個資料夾。

## 圖表索引

| 圖表 | 分類 | 內容 | SVG | PNG | 原始檔 |
|---|---|---|---|---|---|
| 套件圖 | 結構圖 | 模組分工與依賴方向 | [開啟](structural/package/01-套件圖.svg) | [開啟](structural/package/01-套件圖.png) | [PlantUML](structural/package/01-套件圖.puml) |
| 使用案例圖 | 行為圖 | 角色、功能與權限範圍 | [開啟](behavioral/use-case/02-使用案例圖.svg) | [開啟](behavioral/use-case/02-使用案例圖.png) | [PlantUML](behavioral/use-case/02-使用案例圖.puml) |
| 核心類別圖 | 結構圖 | 核心資料、關聯與多重性 | [開啟](structural/class/03-核心類別圖.svg) | [開啟](structural/class/03-核心類別圖.png) | [PlantUML](structural/class/03-核心類別圖.puml) |
| 訂單狀態圖 | 行為圖 | 訂單轉換與刊登、物流連動 | [開啟](behavioral/state-machine/04-訂單狀態圖.svg) | [開啟](behavioral/state-machine/04-訂單狀態圖.png) | [PlantUML](behavioral/state-machine/04-訂單狀態圖.puml) |
| 下單循序圖 | 行為圖／互動圖 | 下單驗證與避免重複下單 | [開啟](behavioral/sequence/order/05-下單循序圖.svg) | [開啟](behavioral/sequence/order/05-下單循序圖.png) | [PlantUML](behavioral/sequence/order/05-下單循序圖.puml) |
| 爭議循序圖 | 行為圖／互動圖 | 買家開案、賣家回應與管理員裁決 | [開啟](behavioral/sequence/dispute/06-爭議循序圖.svg) | [開啟](behavioral/sequence/dispute/06-爭議循序圖.png) | [PlantUML](behavioral/sequence/dispute/06-爭議循序圖.puml) |
| 整體交易活動圖 | 行為圖 | 買家、賣家、系統與管理員四泳道流程 | [開啟](behavioral/activity/07-整體交易活動圖.svg) | [開啟](behavioral/activity/07-整體交易活動圖.png) | [PlantUML](behavioral/activity/07-整體交易活動圖.puml) |

## 目錄結構

```text
docs/uml/
├── README.md
├── structural/                   # 結構圖
│   ├── package/                  # 套件圖
│   └── class/                    # 核心類別圖
└── behavioral/                   # 行為圖
    ├── use-case/                 # 使用案例圖
    ├── state-machine/            # 訂單狀態圖
    ├── sequence/                 # 循序圖
    │   ├── order/                # 下單
    │   └── dispute/              # 爭議處理
    └── activity/                 # 整體交易活動圖
```

## 使用與維護

- **SVG**：向量圖，適合放大檢閱及插入書面文件。
- **PNG**：適合直接預覽或在不支援 SVG 的軟體中使用。
- **PlantUML（`.puml`）**：圖的原始檔；修改後須同步重新匯出同名 SVG、PNG，避免三種格式內容不一致。
- 完整版循序圖與活動圖較長，排入書面時可分段呈現，避免縮成一頁導致文字難以閱讀。
- 此處保留完整版；簡報精簡版未納入本目錄。

## 匯出環境

現有七張圖在 macOS 上以 PlantUML 1.2026.9 匯出，字型為 `PingFang TC`；版本記錄在各 SVG 開頭的 `<?plantuml 1.2026.9?>`。新增或重新匯出時使用同一版 PlantUML（[v1.2026.9 下載頁](https://github.com/plantuml/plantuml/releases/tag/v1.2026.9)）。

- 需要 Java。套件圖、使用案例圖、核心類別圖與訂單狀態圖另需 Graphviz，可用 `java -jar plantuml.jar -testdot` 檢查；循序圖與活動圖不需要。
- 在 repo 根目錄執行下列指令，SVG、PNG 會以相同檔名輸出到 `.puml` 所在的資料夾：

```bash
java -jar plantuml.jar -charset UTF-8 -tsvg docs/uml/behavioral/sequence/order/05-下單循序圖.puml
java -jar plantuml.jar -charset UTF-8 -tpng docs/uml/behavioral/sequence/order/05-下單循序圖.puml
```

### 字型

`skinparam defaultFontName` 要寫匯出那台電腦上已安裝的繁體中文字型。PlantUML 依這個字型計算文字寬度與方框大小；指定的字型不存在時會改用其他字型，排版可能和預期不同，文字也可能超出方框。

| 匯出系統 | `defaultFontName` |
|---|---|
| macOS | `PingFang TC`（現有七張） |
| Windows | `Microsoft JhengHei`（微軟正黑體） |
| Linux | `Noto Sans CJK TC` |

在 macOS 以外的系統新增或重新匯出圖時，將 `defaultFontName` 改成上表對應的字型，並在 PR 註明匯出系統。

## 設計依據與審查

- [Stories](https://github.com/cm4578/SE-2026/issues)：各圖中的圖例另列相關 Story 編號。
- [Wiki：PO 決定](https://github.com/cm4578/SE-2026/wiki/PO-決定)與[技術棧決策](https://github.com/cm4578/SE-2026/wiki/技術棧決策)：本版依據的 Wiki revision 為 `9771afe81ffb7576da0406a3da56219ffb2e12db`。後續規則若變更，需同步檢查受影響的圖。
- 本套圖定位為期中專案的架構雛形與 UML sketch；圖中的交易一致性機制為設計方案，不代表程式已完成或已通過併發測試。
- 審查、提交與 AI 使用紀錄依[Agile + AI 工作流程](../agile-ai-workflow.md)及[GitFlow 分支規範](../GITFLOW.md)辦理；正式 AI 使用紀錄仍放在 [Wiki](https://github.com/cm4578/SE-2026/wiki/AI-使用紀錄)。
