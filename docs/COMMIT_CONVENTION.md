# Git Commit Message 規範

本文件規範本專案所有 commit message 的寫法。**AI agent 在執行 `git commit` 之前，必須先讀完並遵守本文件**；人類開發者同樣適用。

格式以 [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) 為基礎，type 清單與 commitlint 的 `config-conventional` 一致，並加上用語規則與 agent 專用的規則。

本文件用語：

- **必須**：一定要做（MUST）
- **禁止**：一定不能做（MUST NOT）
- **建議**：沒有特別理由就應該這樣做（SHOULD）

## 快速摘要

1. 格式為 `<type>(<scope>): <subject>`。type 與 scope 使用英文小寫，type 後面必須是半形冒號加一個空格。
2. subject、body 與 footer 的說明一律使用繁體中文（台灣用語），用簡單、常見的詞，句子要短。
3. subject 以動詞開頭（「新增」「修正」「搬移」），結尾不加標點，header 的顯示寬度不超過 72。
4. body 說明「為什麼」要改，每行顯示寬度不超過 72（約 36 個中文字）。
5. 禁止寫內部的需求編號或階段代號（例如 `OPT-01`、`SYS-03`、`P2`），改寫成看得懂的功能描述。
6. 一個 commit 只包含一個邏輯變更。
7. 破壞性變更必須在 header 加 `!`，並在 footer 寫 `BREAKING CHANGE:`。
8. 撰寫前必須先看 `git diff --staged`，只描述實際 staged 的內容，不捏造任何資訊。

## 1. 專案設定

團隊可依需求修改下表；agent 必須以下表為準。

| 項目 | 設定值 |
|---|---|
| 允許的 type | `feat` `fix` `perf` `refactor` `style` `test` `docs` `build` `ci` `chore` `revert` |
| 允許的 scope | 未設定（規則見 4.3 節） |
| 語言 | 繁體中文，台灣用語（規則見第 3 節） |
| Header 長度 | 顯示寬度上限 72，建議 50 以內 |
| Body 每行長度 | 顯示寬度上限 72（約 36 個中文字） |
| Issue 參照格式 | `#123`（GitHub）；使用 Jira 時改為 `PROJ-123` |
| 內部需求編號 | 禁止出現在 commit message（規則見 3.5 節） |
| AI 共同作者標註 | 停用（規則見 6.3 節） |

**顯示寬度**的算法：中文字與全形標點算 2，英文字母、數字、半形符號與空格算 1。例如 `feat(auth): 新增登入頁面` 的寬度是 12 + 12 = 24。中文字在終端機與 GitHub 上大約佔兩個英文字的寬度，用顯示寬度計算，畫面上才不會過長。

## 2. 格式總覽

```text
<type>(<scope>): <subject>

<body>

<footer>
```

- header 必填；body 與 footer 依第 5、6 節的規則加入。
- header、body、footer 之間必須各空一行。
- `(<scope>)` 可以省略。破壞性變更要在冒號前加 `!`，例如 `feat(api)!: ...`。
- header 中的括號、`!` 與冒號都必須是半形字元。
- 例外：git 或工具自動產生的 message（merge、`git subtree` 的 squash、GitHub 建立 repo 時的 `Initial commit`）維持原樣，不需改寫。

## 3. 語言與用語

### 3.1 使用繁體中文

- subject、body 與 footer 的說明**必須**使用繁體中文，不隨對話語言改變。
- 禁止簡體字，也禁止整句使用英文或其他語言。
- 以下內容保留英文原樣，不要翻譯：
  - type 與 scope，例如 `feat`、`fix`、`cli`
  - footer 的 token，例如 `BREAKING CHANGE`、`Closes`、`Refs`、`Co-authored-by`（工具靠這些字解析）
  - 程式碼中的名稱：函式、變數、類別、檔案路徑、設定鍵、指令。建議用反引號標出，例如 `` `MoleRunner` ``。
  - 產品、工具與服務名稱，例如 GitHub、Docker、Homebrew、macOS
  - git 自動產生的固定文字，例如 `This reverts commit <hash>.`（見第 11 節）
- 沒有通用中文譯名、或翻成中文反而不好懂的技術名詞，可以保留英文，例如 token、commit、webhook。有通用譯名的就用中文，例如寫「資料庫」不寫「database」，寫「快取」不寫「cache」。
- 提到介面上的文字時，用「」標出，例如「停止」按鈕。

### 3.2 使用台灣用語

使用台灣軟體業慣用的詞彙，避免中國大陸的用語：

| 使用 | 避免 |
|---|---|
| 程式 | 程序（指 program 時） |
| 檔案 | 文件（指 file 時） |
| 設定 | 配置 |
| 預設 | 默認 |
| 伺服器 | 服務器 |
| 資料庫 | 數據庫 |
| 網路 | 網絡 |
| 變數 | 變量 |
| 物件 | 對象 |
| 記憶體 | 內存 |
| 登入 | 登錄 |
| 回傳 | 返回（指函式回傳值時） |

「文件」在台灣指 document，所以 `docs` 類的變更可以寫「文件」，例如「補上 API 文件」；指 file 時一律寫「檔案」。

### 3.3 寫得好讀

讀者可能不熟這段程式碼，所以：

- 用口語、常見的詞，不寫公文或文言用語。例如寫「在」不寫「於」，寫「的」不寫「之」，避免「予以」「係」「俾利」。
- 不要用「進行」「做出」「實施」包住動詞，直接寫動詞：寫「修正」不寫「進行修正」，寫「檢查」不寫「做出檢查」。
- 一句只講一件事，句子要短；長句拆成兩句。
- 少用縮寫與行話；必須使用時，第一次出現時簡短說明。
- 描述行為，而不是只寫內部名詞。例如寫「管理員密碼只詢問一次」，不要只寫「lazy auth」。

### 3.4 標點與空格

- 中文句子使用全形標點，例如 `，` `。` `：` `；` `（）`，引號使用 `「」`。
- header 中 type 後面的冒號、scope 的括號，以及 footer token 後面的冒號，必須是半形字元。
- **建議**在中文與英文、數字、反引號標出的程式碼名稱之間加一個半形空格，例如「將 axios 升級到 1.7.4」「讓 `MoleRunner` 只啟動一次」。全形標點的前後不加空格。

### 3.5 不寫內部編號

- **禁止**在 commit message 中寫需求規格的編號或階段代號，例如 `CLN-01`、`OPT-01～07`、`SYS-03`、`P2`、`phase 2`、「第二階段」。這些編號只在內部文件使用，看 git log 的人不知道它們代表什麼。
- 改寫成功能描述，例如 `SYS-03: fork 的 sudo -A` 要寫成 `feat(cli): 改用 sudo -A 搭配 App 的密碼視窗`。
- issue 參照（`Closes #123`）不受此限，放在 footer。

## 4. Header

### 4.1 type

| type | 使用時機 | 範例 |
|---|---|---|
| `feat` | 新增功能，或改變對外行為 | `feat(auth): 新增用 email 重設密碼的功能` |
| `fix` | 修正錯誤行為 | `fix(api): 訂單不存在時回傳 404 而不是 500` |
| `perf` | 提升效能，對外行為不變 | `perf(db): 在 orders.user_id 加上索引` |
| `refactor` | 調整程式結構，對外行為不變 | `refactor(ui): 把對話框搬到共用的 view` |
| `style` | 只改程式碼格式（空白、縮排、分號、formatter 結果） | `style: 用 prettier 格式化 src/` |
| `test` | 只新增或修改測試 | `test(cart): 新增空購物車結帳的測試` |
| `docs` | 只改文件或註解 | `docs(readme): 補上本機環境的設定步驟` |
| `build` | 建置系統、打包設定、相依套件 | `build(deps): 將 axios 升級到 1.7.4` |
| `ci` | CI/CD 設定與腳本 | `ci: 在測試流程中快取 npm 套件` |
| `chore` | 其他不影響原始碼與測試的維護工作 | `chore: 忽略 .idea 資料夾` |
| `revert` | 還原先前的 commit | 見第 11 節 |

注意事項：

- `style` 指的是**程式碼格式**，不是 UI 樣式。修改 CSS 而改變畫面時，依情況使用 `feat` 或 `fix`。
- 單純升級或移除相依套件使用 `build(deps)`；為了實作某個功能而新增的套件，與該功能放在同一個 commit。
- 專案若使用自動版本工具，type 會直接影響版本號：`feat` 對應 MINOR、`fix` 對應 PATCH、破壞性變更對應 MAJOR。type 選錯，版本號也會跟著錯。

### 4.2 如何選擇 type

依序回答下列問題，**採用第一個答案為「是」的 type**：

1. 是否在還原先前的 commit？→ `revert`
2. 是否修正了錯誤行為？→ `fix`
3. 是否新增功能，或改變了對外行為（API、CLI、UI、設定項）？→ `feat`
4. 是否只為了提升效能？→ `perf`
5. 是否只調整程式結構？→ `refactor`
6. 是否只改程式碼格式？→ `style`
7. 是否只改測試？→ `test`
8. 是否只改文件或註解？→ `docs`
9. 是否只改 CI 設定？→ `ci`
10. 是否只改建置設定或相依套件？→ `build`
11. 以上皆否 → `chore`

補充：

- 隨功能或修正一起新增的測試與文件，不影響 type。例如新功能附帶測試，仍然是 `feat`。
- 第 2 到 5 題若有兩題以上為「是」（例如同時修 bug 又加功能），代表 commit 範圍太大，必須拆分（見第 8 節）。

### 4.3 scope

- 選填，**建議**填寫，用來標示受影響的模組或區域。
- 必須是英文小寫名詞；多個單字用 kebab-case，例如 `user-profile`。禁止使用中文 scope，例如 `feat(登入): ...`。
- 專案設定有列出 scope 清單時，只能使用清單中的值；清單中沒有合適的值就省略 scope，禁止自行新增。
- 專案設定沒有列出清單時，先執行 `git log --oneline -30` 參考既有的 scope 並沿用；沒有前例時，以模組或目錄名稱命名。本專案的慣例：`cli` 是 `Vendor/Mole`，App 的模組用 `Features` 底下資料夾名稱的小寫（例如 `purge`、`optimize`），README 用 `readme`。
- 同一個邏輯變更橫跨多個模組時，省略 scope。禁止使用多重 scope，例如 `feat(api,ui): ...`。

### 4.4 subject

- 必須以動詞開頭，直接描述這個 commit 做了什麼，例如「新增」「移除」「修正」。
- 不寫主詞，也不加「已」「了」：寫「修正大檔案上傳失敗」，不寫「已修正大檔案上傳失敗」「修正了大檔案上傳失敗」或「本次修正大檔案上傳失敗」。
- 必須具體，讓人不看 diff 也能理解這個 commit。
- 結尾禁止加標點，包括 `。`、`！`，以及半形的 `.`、`!`。
- 禁止空泛的描述，例如「更新程式碼」「修正 bug」「小修改」「優化」「WIP」。
- 禁止只重複 type 而沒有具體內容，例如 `fix(api): 修正錯誤`、`feat: 新增功能`。
- 禁止使用 emoji。
- 禁止在 subject 中放 issue 編號；issue 參照一律放在 footer。
- **建議** header 的顯示寬度在 50 以內；扣掉 type 與 scope 後，subject 大約是 15 到 20 個中文字。

常用動詞：

| 動詞 | 用途 |
|---|---|
| 新增 | 新增功能、檔案、選項 |
| 移除 | 移除功能、程式碼、檔案 |
| 修正 | 修正錯誤，必須寫出修正了什麼 |
| 重新命名、搬移 | 重新命名或搬移檔案、程式碼 |
| 改用 | 以新的做法取代舊的做法，例如「改用系統內建的側邊欄切換按鈕」 |
| 拆分、抽出 | 把程式碼拆開或抽成獨立的函式、模組 |
| 簡化 | 簡化邏輯 |
| 處理 | 處理特定情況，例如 null、逾時 |
| 防止、避免 | 防止某個錯誤發生 |
| 支援 | 支援新的格式、平台或選項 |
| 升級 | 升級相依套件版本 |
| 停止支援 | 停止支援某個版本，例如舊版 Node.js |

避免使用「更新」「修改」「調整」「優化」「改善」這類籠統的動詞；非用不可時，必須寫出改成什麼，例如「將預設逾時改為 30 秒」。

## 5. Body

以下情況**必須**寫 body：

- `fix`：說明問題現象、原因與解法。錯字這類一看就懂的修正除外。
- 破壞性變更：說明為什麼需要這個不相容的改動。
- `perf`：說明改善的方式。有實際量測數據才能寫出數字，**沒有量測就禁止寫出具體數字**。
- 其他只看 header 無法理解「為什麼要改」的變更。

可以省略 body 的情況：錯字修正、單純的套件升級、純格式調整等一看就懂的變更。

撰寫規則：

- 重點放在「為什麼」，以及高層次的「做了什麼」。程式碼已經呈現「怎麼做」，不必逐行描述。
- 每行顯示寬度不超過 72（純中文約 36 個字），必須手動換行。中文字之間可以換行，但不可拆開英文單字、程式碼名稱、數字與單位，也避免讓 `，`、`。` 這類全形標點出現在行首。網址、錯誤訊息等無法斷開的內容不在此限。
- 有多個重點時，可以用 `- ` 開頭條列；子項目縮排兩個空格。
- 使用中性的敘述語氣，禁止第一人稱（「我」「我們」「筆者」）與第二人稱（「你」「您」）。
- 禁止 Markdown 標題與粗體，也禁止任何以 `#` 開頭的行（git 可能將其視為註解並刪除）。
- 禁止貼上整段 diff 或完整 log，也禁止逐一列出所有修改過的檔案。

## 6. Footer

### 6.1 一般規則

- footer 放在 body 之後，中間空一行。
- 每個 footer 從新的一行開始，格式為 `Token: value` 或 `Token #value`。token 與後面的冒號保留英文半形原樣；說明文字使用繁體中文。
- 順序固定：
  1. `BREAKING CHANGE:`（見第 7 節）
  2. Issue 參照（`Closes`、`Refs`）
  3. AI 共同作者標註為「啟用」時，空一行後放 `Co-authored-by:`，這一段必須是整個 message 的最後一段

### 6.2 Issue 參照

- `Closes #123`：這個 commit 完成並關閉該 issue。
- `Refs #123`：與該 issue 相關，但不關閉。
- 有多個 issue 時，每個 issue 各寫一行。
- 只能引用使用者或任務描述中明確提供的 issue 編號。**禁止猜測或捏造 issue 編號**；不知道就不要寫。

### 6.3 AI 共同作者標註

- 專案設定為「啟用」時：在 message 的最後一段加上 `Co-authored-by: <名稱> <email>`，使用 agent 所屬平台預設的名稱與 email；平台沒有預設值時就不加。
- 專案設定為「停用」時：不加任何 AI 相關的 trailer 或署名，例如 `Co-authored-by: Claude ...`、`Claude-Session: ...`。agent 所屬平台預設會加上署名時，也一律以本設定為準。
- 無論啟用與否，都禁止在 subject 或 body 提到 AI、agent 或工具名稱（變更內容本身與該工具有關時除外），也禁止加入 `Generated with ...` 之類的簽名或宣傳文字。

## 7. 破壞性變更

破壞性變更是指使用者或下游程式必須跟著修改才能正常運作的變更，例如：

- 刪除或重新命名公開的 API、函式、CLI 選項或設定項
- 改變函式簽章、回應格式或預設行為
- 停止支援某個執行環境版本
- 需要手動執行的資料庫 migration

標記方式（兩者都必須使用）：

1. header 的冒號前加 `!`，例如 `feat(api)!: 每個請求都必須帶 API 版本 header`。
2. footer 加上 `BREAKING CHANGE: <說明>`。`BREAKING CHANGE` 必須保留英文且全部大寫；說明使用繁體中文，寫出哪裡不相容，以及使用者該如何遷移。

不確定是否屬於破壞性變更時，必須先詢問使用者，禁止自行省略標記。

## 8. Commit 範圍

- 一個 commit 只包含一個邏輯變更。subject 需要用「並」「和」「以及」連接兩件不相關的事時，就應該拆成兩個 commit。
- 格式調整（`style`）必須與邏輯變更分開 commit。
- **建議**讓每個 commit 都能通過建置與測試，不留下壞掉的中間狀態。
- 禁止把無關的檔案一起 commit，包括除錯輸出、暫存檔、本機設定、建置產物，以及 `.env` 等含有機密的檔案。
- 用 `git add <路徑>` 明確指定檔案，避免用 `git add -A` 或 `git add .` 把無關檔案一起加入。
- PR 標題同樣遵守 header 格式，因為 squash merge 時，PR 標題通常會成為 commit 的 header。

## 9. Agent 行為規則

1. **先看 diff 再寫 message**：必須先執行 `git diff --staged`，message 只能描述已經 staged 的變更。
2. **內容與 diff 一致**：沒有新增測試就不提測試，沒有修改文件就不提文件。
3. **禁止捏造**：issue 編號、效能數據、測試結果等資訊，只能來自使用者提供的內容或實際執行的結果。
4. **禁止描述對話或工作過程**：例如「依照要求」「分析程式碼後」「我修正了」「成功更新」。
5. **語言固定**：subject、body 與 footer 的說明一律使用繁體中文（台灣用語），即使使用者用英文或其他語言對話也一樣；type、scope、footer token 與程式碼名稱維持英文。
6. **不寫內部編號**：需求編號與階段代號只留在內部文件，commit message 寫成功能描述（見 3.5 節）。
7. **參考既有慣例，但以本文件為準**：可以用 `git log --oneline -30` 參考近期的 type 與 scope；既有 commit 與本文件衝突時（例如較早的 commit 使用英文），以本文件為準。既有的 commit 維持原樣，不要為了改語言而改寫歷史。
8. **使用者指定優先**：使用者明確指定 commit message 時，以使用者的內容為準，不得擅自修改；若明顯不符合本文件，可以在回覆中提醒。

## 10. 提交指令

一律用 heredoc 傳入 message，單行 message 也一樣：

```bash
git commit -F - <<'EOF'
fix(config): 讓 PORT 環境變數能覆蓋預設埠號

預設埠號在讀取環境變數之後才套用，
所以使用者設定的 PORT 一律被蓋掉。

Closes #87
EOF
```

- 結束標記必須加單引號（`<<'EOF'`），避免 shell 展開 message 中的反引號與 `$`。
- 禁止在 `-m` 選項中用 `\n` 換行，這些字元會原樣寫進 message。
- git 預設以 UTF-8 儲存 commit message，不需要另外設定編碼。若 `git log` 顯示亂碼，先確認終端機的編碼是 UTF-8。
- 禁止使用 `--no-verify` 略過 git hooks，除非使用者明確要求。
- commit 因 hook 檢查失敗時，修正問題、重新 `git add` 後建立新的 commit。禁止改用 `git commit --amend`：hook 失敗代表 commit 沒有建立，amend 會改到上一個 commit。
- 禁止修改已經 push 的 commit（amend、rebase、force push），除非使用者明確要求。
- 提交後執行 `git log -1` 確認 message 正確。

## 11. 範例

以下範例省略 `Co-authored-by`；啟用 AI 共同作者標註時，依 6.3 節加在最後一段。

**簡單變更（不需要 body）**

```text
docs(readme): 修正安裝指令中的錯字
```

```text
build(deps): 將 axios 升級到 1.7.4
```

**新功能**

```text
feat(auth): refresh token 改為每次使用都輪替

每次使用 refresh token 時，都會發出新的 token，並撤銷舊的。
外洩的 refresh token 因此最多只能被使用一次。

Closes #142
```

**修正錯誤**

```text
fix(cart): 防止快速點擊時數量變成負數

快速連按減號按鈕時，第一個回應還沒回來就已送出好幾個請求，
數量因此可能小於零。

- 請求尚未完成時停用按鈕
- 伺服器端將數量下限設為 0

Closes #318
```

**破壞性變更**

```text
feat(api)!: 每個請求都必須帶 API 版本 header

固定 API 版本後，回應格式可以繼續演進，
既有的 client 也不會突然壞掉。

BREAKING CHANGE: 沒有帶 `X-API-Version` header 的請求現在會收到
400 錯誤。加上 `X-API-Version: 1` 即可維持目前的格式。
Closes #205
```

**重構**

```text
refactor(db): 把查詢建構器移出 user repository

行為不變。查詢建構器現在可以單獨測試，
repository 和 model 也不再互相依賴。
```

**還原**

```text
revert: feat(auth): refresh token 改為每次使用都輪替

This reverts commit 3f2a9c1.

同時開著多個分頁的使用者會被登出。所有分頁共用同一個
refresh token，其中一個分頁換到新的 token 後，其他分頁的
請求就會失敗。
```

`revert` 的 header 是 `revert: ` 加上被還原 commit 的 header（超過長度上限時可以截短）。body 第一段固定寫 `This reverts commit <hash>.`：這行由 `git revert` 自動產生，部分工具靠它辨識還原，所以維持英文原樣；接著用中文說明還原的原因。

## 12. 常見錯誤

| 錯誤寫法 | 問題 | 改正後 |
|---|---|---|
| `fix(api): handle an empty order list` | 沒有使用中文 | `fix(api): 處理訂單列表為空的情況` |
| `fix(config): 修复默认配置文件读取失败` | 使用簡體字與中國大陸用語 | `fix(config): 修正無法讀取預設設定檔的問題` |
| `feat(auth)：新增登入頁面` | type 後面用了全形冒號 | `feat(auth): 新增登入頁面` |
| `Feat(Auth): 新增登入頁面。` | type 與 scope 大寫，結尾有句號 | `feat(auth): 新增登入頁面` |
| `feat(登入): 新增登入頁面` | scope 使用中文 | `feat(auth): 新增登入頁面` |
| `fix(upload): 已修正大檔案上傳失敗` | subject 多了「已」 | `fix(upload): 修正大檔案上傳失敗` |
| `OPT-01～07: 新增最佳化頁面` | 用內部編號代替 type，看的人不知道編號的意思 | `feat(optimize): 新增最佳化頁面` |
| `feat(cli): 實作 SYS-03` | 只寫編號，沒寫做了什麼 | `feat(cli): 改用 sudo -A 搭配 App 的密碼視窗` |
| `perf: 進行渲染流程之優化` | 公文腔、用詞空泛，沒寫出改善方式 | `perf(list): 快取列表的每一列以加快繪製` |
| `更新程式碼` | 沒有 type，內容空泛 | 依實際變更撰寫，例如 `refactor(auth): 把 token 檢查拆成輔助函式` |
| `fix: 修正 bug` | 只重複 type，沒說明是什麼問題 | `fix(auth): 拒絕 token 已過期的登入` |
| `feat: 新增搜尋並修正分頁` | 兩件事混在同一個 commit | 拆成 `feat(search): ...` 與 `fix(paging): ...` 兩個 commit |
| `feat(api,ui): 新增匯出` | 使用多重 scope | `feat: 新增報表的 CSV 匯出` |
| `fix(api): 處理 user 為 null 的情況 (#123)` | issue 編號放在 subject | subject 不放編號，在 footer 加上 `Closes #123` |
| `feat: 依照要求完成修改` | 描述對話，而不是變更內容 | 依實際變更撰寫 |

錯誤的 body 示範：

```text
feat(auth): 新增 OAuth 登入

依照你的要求，我新增了 OAuth 登入。分析程式碼之後，我修改了
auth.ts、login.tsx 和 config.ts，所有測試都通過了。

🤖 Generated with AI
```

問題：使用第一、第二人稱，提到對話（「依照你的要求」），描述工作過程（「分析程式碼之後」「所有測試都通過了」），逐一列出檔案，加入工具簽名。

## 13. 提交前檢查清單

- [ ] 已執行 `git diff --staged`，message 只描述 staged 的變更
- [ ] header 符合 `<type>(<scope>): <subject>`，type 後面是半形冒號加一個空格
- [ ] type 與 scope 符合專案設定，且都是英文小寫
- [ ] subject、body 與 footer 的說明都是繁體中文，沒有簡體字或中國大陸用語
- [ ] 用詞口語、句子短，沒有公文腔或不必要的行話
- [ ] 沒有內部的需求編號或階段代號
- [ ] subject 以動詞開頭、沒有「已」「了」、結尾沒有標點，header 顯示寬度不超過 72
- [ ] header、body、footer 之間各空一行
- [ ] 需要 body 的變更已說明原因，且每行顯示寬度不超過 72
- [ ] 破壞性變更已加上 `!` 與 `BREAKING CHANGE:`
- [ ] issue 編號與其他資訊都有根據，沒有捏造
- [ ] 沒有第一、第二人稱、對話內容、工作過程描述、工具簽名或 emoji
- [ ] AI 共同作者標註為「停用」時，沒有 `Co-authored-by: Claude ...`、`Claude-Session: ...` 等 AI 署名
- [ ] 一個 commit 只包含一個邏輯變更
- [ ] 提交後已用 `git log -1` 確認 message 正確
