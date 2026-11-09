# 二手書交易平台 User Story 草稿

待 PO 審閱。範圍涵蓋基礎規格書的六個必做模組、相關品質要求及本次 PO 確認的補充需求。Story 編號沿用舊稿供對照，並為新增的 Story 接續編號。編號用於文件對照，GitHub Issue 由 SM 建立時編號。

各條驗收條件末尾標示需求來源。規格連結指向[基礎規格書](notes/product-spec.md)的對應段落，題號可直接開啟 [Wiki「PO 決定」](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A)的對應決定。本次審閱確認的 22 題收錄於 [Story 草稿審閱](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#2026-11-09-story-%E8%8D%89%E7%A8%BF%E5%AF%A9%E9%96%B1)。

## 1. 帳號與個人檔案

### 1.1 註冊並驗證 Email

身為想使用平台的訪客，我想註冊並驗證 Email，以便建立可用於買賣的帳號。

**驗收條件**

- [ ] **Given** 訪客尚未註冊，**When** 提交有效且未註冊的 Email 與註冊資料，**Then** 平台建立一般使用者帳號，Email 標記為未驗證，並提供 Email 驗證。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「帳號」、[Q24](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q24-%E7%AE%A1%E7%90%86%E5%93%A1%E5%B8%B3%E8%99%9F%E8%88%87%E8%A7%92%E8%89%B2)）
- [ ] **Given** 帳號的 Email 尚未驗證，**When** 使用者完成有效的 Email 驗證，**Then** 帳號的 Email 標記為已驗證。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「帳號」）
- [ ] **Given** 註冊資料含密碼，**When** 平台保存帳號，**Then** 密碼以雜湊值保存。（依據 [品質要求](notes/product-spec.md#品質要求)「安全」）
- [ ] **Given** 某個 Email 已註冊，包含原帳號仍未驗證的情況，**When** 再次用同一個 Email 註冊，**Then** 平台拒絕建立第二個帳號。（依據 [Q2](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q2-email-%E8%A8%BB%E5%86%8A%E5%94%AF%E4%B8%80%E6%80%A7)）
- [ ] **Given** 帳號尚未驗證 Email，**When** 使用者瀏覽平台，**Then** 可以像訪客一樣搜尋、篩選、查看公開刊登頁及完成 Email 驗證。若嘗試編輯個人檔案、刊登或下單，平台拒絕該操作，完成驗證後才開放。（依據 [Q1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q1-email-%E9%A9%97%E8%AD%89%E5%89%8D%E7%9A%84%E6%AC%8A%E9%99%90)）

### 1.2 登入與登出

身為已註冊並驗證 Email 的使用者，我想登入帳號並在用完時登出，以便以自己的身分使用平台並結束登入狀態。

**驗收條件**

- [ ] **Given** 使用者已完成 Email 驗證，**When** 提交正確的登入憑證，**Then** 平台以該帳號的身分登入。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「帳號」）
- [ ] **Given** 使用者提交錯誤的登入憑證，**When** 嘗試登入，**Then** 平台拒絕登入。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「帳號」、[品質要求](notes/product-spec.md#品質要求)「安全」）
- [ ] **Given** 使用者已登入，**When** 選擇登出，**Then** 平台結束這次登入，後續操作依訪客權限處理。（依據 [Q3](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q3-%E7%99%BB%E5%87%BA%E8%88%87%E5%AF%86%E7%A2%BC%E7%AE%A1%E7%90%86)）

忘記密碼與修改密碼留到後續。（依據 [Q3](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q3-%E7%99%BB%E5%87%BA%E8%88%87%E5%AF%86%E7%A2%BC%E7%AE%A1%E7%90%86)）

### 1.3 管理個人檔案

身為平台使用者，我想查看註冊 Email 並管理自己的暱稱及選填的收件資訊，以便在下次下單時沿用常用資料。

**驗收條件**

- [ ] **Given** 使用者已登入且已驗證 Email，**When** 查看並更新自己的暱稱，**Then** 個人檔案顯示儲存後的暱稱。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「帳號」、[核心資料](notes/product-spec.md#核心資料) User、[Q1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q1-email-%E9%A9%97%E8%AD%89%E5%89%8D%E7%9A%84%E6%AC%8A%E9%99%90)、[Q4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q4-%E5%80%8B%E4%BA%BA%E6%AA%94%E6%A1%88%E6%AC%84%E4%BD%8D)）
- [ ] **Given** 使用者已登入並驗證 Email，**When** 在個人檔案儲存收件人姓名、手機號碼、取貨門市或收件地址，**Then** 已填寫的資料會保存，四項均可留空。（依據 [Q1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q1-email-%E9%A9%97%E8%AD%89%E5%89%8D%E7%9A%84%E6%AC%8A%E9%99%90)、[Q15](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q15-買家收件資訊)、[F1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f1-收件資訊欄位)、[Q4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q4-%E5%80%8B%E4%BA%BA%E6%AA%94%E6%A1%88%E6%AC%84%E4%BD%8D)）
- [ ] **Given** 使用者查看自己的個人檔案，**When** 檢視 Email，**Then** 平台顯示註冊 Email，欄位為唯讀。（依據 [Q4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q4-%E5%80%8B%E4%BA%BA%E6%AA%94%E6%A1%88%E6%AC%84%E4%BD%8D)）

變更 Email 留到後續。（依據 [Q4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q4-%E5%80%8B%E4%BA%BA%E6%AA%94%E6%A1%88%E6%AC%84%E4%BD%8D)）

### 1.4 申請刪除帳號

身為想停止使用平台的使用者，我想提出刪除帳號申請，以便行使對帳號及個人資料的控制權。

**驗收條件**

- [ ] **Given** 使用者已登入，**When** 提出刪除自己帳號的申請，**Then** 平台受理該帳號的申請並告知使用者已送出，即使該帳號仍有進行中的訂單或爭議也可提出申請。（依據 [品質要求](notes/product-spec.md#品質要求)「個資」、[Q5](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q5-%E5%88%AA%E9%99%A4%E5%B8%B3%E8%99%9F%E7%94%B3%E8%AB%8B)）
- [ ] **Given** 帳號已提出刪除申請，且仍有進行中的訂單或爭議，**When** 管理員處理申請，**Then** 等相關訂單與爭議全部結束後才可刪除帳號。（依據 [Q5](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q5-%E5%88%AA%E9%99%A4%E5%B8%B3%E8%99%9F%E7%94%B3%E8%AB%8B)）
- [ ] **Given** 已提出申請的帳號沒有進行中的訂單或爭議，**When** 管理員刪除帳號，**Then** 保留既有訂單與評價，這些紀錄上的該帳號名稱顯示為「已刪除的使用者」。（依據 [Q5](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q5-%E5%88%AA%E9%99%A4%E5%B8%B3%E8%99%9F%E7%94%B3%E8%AB%8B)）

## 2. 刊登二手書

### 2.1 手動填寫書籍資料並發布刊登

身為賣家，我想手動填寫書籍資料和價格、選擇書況分級與交易方式，並上傳實拍照片，以便刊登手上的二手書。

**驗收條件**

- [ ] **Given** 已驗證 Email 的賣家填妥書目及價格、從[書況分級](#書況分級)選定一級、附上合規實拍照，並勾選至少一種支援的物流方式及一種或兩種模擬付款方式，**When** 發布刊登，**Then** 平台建立一筆代表一本實體書的刊登，連結到獨立的書目，保存書況分級與交易方式，狀態為「上架中」。同一書目可對應不同賣家的多筆刊登。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「上架」、[核心資料](notes/product-spec.md#核心資料) Book／Listing、[業務規則](notes/product-spec.md#業務規則)「庫存」、[Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)、[Q16](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q16-物流方式)、[F2](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f2-模擬物流方式)、[Q1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q1-email-%E9%A9%97%E8%AD%89%E5%89%8D%E7%9A%84%E6%AC%8A%E9%99%90)、[Q6](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q6-%E6%89%8B%E5%8B%95%E6%9B%B8%E7%9B%AE%E6%AC%84%E4%BD%8D%E8%88%87%E9%87%8D%E8%A4%87%E6%9B%B8%E7%9B%AE)、[Q7](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q7-%E5%88%8A%E7%99%BB%E5%AF%A6%E6%8B%8D%E7%85%A7%E9%99%90%E5%88%B6)、[Q8](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q8-%E5%9B%BA%E5%AE%9A%E6%9B%B8%E6%B3%81%E5%88%86%E7%B4%9A)、[Q17](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q17-%E6%A8%A1%E6%93%AC%E4%BB%98%E6%AC%BE%E6%96%B9%E5%BC%8F)）
- [ ] **Given** 刊登缺少實拍照、固定書況分級、物流方式或付款方式，**When** 賣家嘗試發布，**Then** 平台拒絕發布。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「上架」、[F2](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f2-模擬物流方式)、[Q7](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q7-%E5%88%8A%E7%99%BB%E5%AF%A6%E6%8B%8D%E7%85%A7%E9%99%90%E5%88%B6)、[Q8](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q8-%E5%9B%BA%E5%AE%9A%E6%9B%B8%E6%B3%81%E5%88%86%E7%B4%9A)、[Q17](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q17-%E6%A8%A1%E6%93%AC%E4%BB%98%E6%AC%BE%E6%96%B9%E5%BC%8F)）
- [ ] **Given** 賣家準備刊登實拍照，**When** 新增照片，**Then** 每筆刊登須有 1–5 張實拍照，每張上限 5 MB，支援 JPEG、PNG 和 WebP。格式或大小不符時，平台拒絕該檔案並指出哪張照片需要更換。（依據 [品質要求](notes/product-spec.md#品質要求)「安全」、[Q7](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q7-%E5%88%8A%E7%99%BB%E5%AF%A6%E6%8B%8D%E7%85%A7%E9%99%90%E5%88%B6)）
- [ ] **Given** 賣家以手動方式建立書目，**When** 填寫書目欄位，**Then** 書名必填，分類須選一種。作者、出版社、版次、ISBN 和封面選填。（依據 [Q6](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q6-%E6%89%8B%E5%8B%95%E6%9B%B8%E7%9B%AE%E6%AC%84%E4%BD%8D%E8%88%87%E9%87%8D%E8%A4%87%E6%9B%B8%E7%9B%AE)、[Q14](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q14-%E6%9B%B8%E7%B1%8D%E5%88%86%E9%A1%9E%E8%88%87%E5%BE%8C%E5%8F%B0%E7%B7%A8%E8%BC%AF)）
- [ ] **Given** 賣家填寫的 ISBN 已有對應書目，**When** 發布刊登，**Then** 沿用該書目。（依據 [Q6](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q6-%E6%89%8B%E5%8B%95%E6%9B%B8%E7%9B%AE%E6%AC%84%E4%BD%8D%E8%88%87%E9%87%8D%E8%A4%87%E6%9B%B8%E7%9B%AE)、[Q9](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q9-isbn-%E6%9F%A5%E8%A9%A2%E4%BE%86%E6%BA%90)）
- [ ] **Given** 賣家已填好必要書目欄位且未填 ISBN，**When** 發布刊登，**Then** 可以建立書目。若已有同名書目，仍各自保留。（依據 [Q6](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q6-%E6%89%8B%E5%8B%95%E6%9B%B8%E7%9B%AE%E6%AC%84%E4%BD%8D%E8%88%87%E9%87%8D%E8%A4%87%E6%9B%B8%E7%9B%AE)）
- [ ] **Given** 賣家設定刊登的付款方式，**When** 勾選可接受的選項，**Then** 可從「銀行轉帳」與「電子支付轉帳」勾選一種或兩種。每一種都可搭配超商取貨或宅配。（依據 [Q17](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q17-%E6%A8%A1%E6%93%AC%E4%BB%98%E6%AC%BE%E6%96%B9%E5%BC%8F)）

#### 書況分級

賣家依最嚴重的瑕疵選一級。例如封面近新但有缺頁，選「書況有缺損」。（依據 [Q8](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q8-%E5%9B%BA%E5%AE%9A%E6%9B%B8%E6%B3%81%E5%88%86%E7%B4%9A)）

| 書況 | 判定方式 |
| --- | --- |
| 全新 | 未使用，封面、書背和內頁完整，無畫記、折痕或污漬。 |
| 幾乎全新 | 翻閱過但看不出明顯使用痕跡，內頁無畫記，書角可有極輕微磨痕。 |
| 狀況良好 | 可有輕微泛黃、少量折角或零星畫記。頁面完整，文字清楚，裝訂牢固。 |
| 使用痕跡明顯 | 有多處畫記、折痕、泛黃或封面磨損。頁面仍完整，內容可正常閱讀。 |
| 書況有缺損 | 有缺頁、脫頁、裝訂鬆脫，或有撕裂、水漬、污漬等影響閱讀的損傷。 |

### 2.2 輸入 ISBN 帶入書籍資料

身為賣家，我想輸入 ISBN 帶入書籍資料，以便減少刊登時的重複輸入。

**驗收條件**

- [ ] **Given** 賣家建立刊登，且輸入的 ISBN 在平台內有對應書目，**When** 平台查詢該 ISBN，**Then** 帶入既有書目已儲存的欄位，並沿用該書目。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「上架」、[核心資料](notes/product-spec.md#核心資料) Book、[Q6](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q6-%E6%89%8B%E5%8B%95%E6%9B%B8%E7%9B%AE%E6%AC%84%E4%BD%8D%E8%88%87%E9%87%8D%E8%A4%87%E6%9B%B8%E7%9B%AE)、[Q9](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q9-isbn-%E6%9F%A5%E8%A9%A2%E4%BE%86%E6%BA%90)）
- [ ] **Given** 平台內查不到輸入的 ISBN，**When** 賣家改用手動填寫，**Then** 表單保留 ISBN，賣家可依 2.1 補填書目並建立刊登。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「上架」、[Q9](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q9-isbn-%E6%9F%A5%E8%A9%A2%E4%BE%86%E6%BA%90)）

外部書目查詢留到後續。（依據 [Q9](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q9-isbn-%E6%9F%A5%E8%A9%A2%E4%BE%86%E6%BA%90)）

### 2.3 管理自己的刊登

身為賣家，我想查看、編輯、下架或重新上架自己的刊登，以便管理書況、售價和販售狀態。

**驗收條件**

- [ ] **Given** 賣家有自己的刊登，**When** 查看刊登清單，**Then** 平台顯示賣家自己的各筆刊登與狀態，包含「上架中」「交易中」「已售出」及「已下架」。（依據 [Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)、[Q13](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q13-%E9%9D%9E%E4%B8%8A%E6%9E%B6%E5%88%8A%E7%99%BB%E7%9A%84%E5%8F%AF%E8%A6%8B%E7%AF%84%E5%9C%8D)）
- [ ] **Given** 賣家管理自己的刊登，**When** 查看可執行的操作，**Then** 平台提供下架作為停止販售的方式，刊登與既有訂單的關聯仍會保留，且無法刪除刊登。（依據 [Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)）
- [ ] **Given** 自己的刊登為「上架中」或「已下架」，**When** 賣家儲存符合規格的書況分級、價格或照片變更，**Then** 平台更新所修改的內容，書況沿用 2.1 的[五級定義](#書況分級)，照片沿用 2.1 的張數、格式及大小限制。（依據 [Q11](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q11-鎖定後的刊登)、[MVP 範圍](notes/product-spec.md#mvp-範圍)「上架」、[品質要求](notes/product-spec.md#品質要求)「安全」、[Q7](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q7-%E5%88%8A%E7%99%BB%E5%AF%A6%E6%8B%8D%E7%85%A7%E9%99%90%E5%88%B6)、[Q8](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q8-%E5%9B%BA%E5%AE%9A%E6%9B%B8%E6%B3%81%E5%88%86%E7%B4%9A)）
- [ ] **Given** 自己的刊登為「上架中」或「已下架」，**When** 賣家執行對應的下架或重新上架操作，**Then** 刊登分別改為「已下架」或「上架中」，購買資格隨狀態更新。（依據 [Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)、[F3](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f3-爭議取消後的刊登)）
- [ ] **Given** 自己的刊登為「交易中」或「已售出」，**When** 賣家嘗試編輯刊登，**Then** 平台拒絕修改。處於「交易中」時，平台也拒絕下架。（依據 [Q11](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q11-鎖定後的刊登)）

## 3. 搜尋與瀏覽

### 3.1 查看單筆刊登詳細頁

身為買家，我想在同一頁查看書籍與單筆刊登資訊並下單，以便評估該筆刊登後直接購買。

**驗收條件**

- [ ] **Given** 刊登為「上架中」，**When** 買家開啟單筆刊登詳細頁，**Then** 可查看書名、作者等書目資料，以及該刊登的書況分級、價格和實拍照。符合下單資格的買家可從同一頁開始下單。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「瀏覽」、[核心資料](notes/product-spec.md#核心資料) Book／Listing、[Q1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q1-email-%E9%A9%97%E8%AD%89%E5%89%8D%E7%9A%84%E6%AC%8A%E9%99%90)、[Q8](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q8-%E5%9B%BA%E5%AE%9A%E6%9B%B8%E6%B3%81%E5%88%86%E7%B4%9A)、[Q12](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q12-%E5%96%AE%E7%AD%86%E5%88%8A%E7%99%BB%E8%A9%B3%E7%B4%B0%E9%A0%81)）
- [ ] **Given** 同一書目有多位賣家的上架刊登，**When** 買家查看其中一筆刊登的資訊，**Then** 顯示該筆刊登自己的書況分級、價格和實拍照。（依據 [核心資料](notes/product-spec.md#核心資料) Book／Listing、[Q12](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q12-%E5%96%AE%E7%AD%86%E5%88%8A%E7%99%BB%E8%A9%B3%E7%B4%B0%E9%A0%81)）
- [ ] **Given** 刊登已進入「交易中」「已售出」或「已下架」，**When** 使用者透過舊連結開啟公開刊登頁，**Then** 只顯示「目前無法購買」。（依據 [Q13](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q13-%E9%9D%9E%E4%B8%8A%E6%9E%B6%E5%88%8A%E7%99%BB%E7%9A%84%E5%8F%AF%E8%A6%8B%E7%AF%84%E5%9C%8D)）

彙整同一書目所有賣家的頁面留到後續。（依據 [Q12](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q12-%E5%96%AE%E7%AD%86%E5%88%8A%E7%99%BB%E8%A9%B3%E7%B4%B0%E9%A0%81)）

### 3.2 依書名、作者或 ISBN 搜尋

身為找書的買家，我想用書名、作者或 ISBN 搜尋，以便找到符合線索的二手書。

**驗收條件**

- [ ] **Given** 有可購買的刊登分別對應到含目標書名、作者或 ISBN 的書目，**When** 買家分別使用三種條件搜尋，**Then** 每次搜尋只顯示相符且為「上架中」的刊登。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「瀏覽」、[核心資料](notes/product-spec.md#核心資料) Book／Listing、[Q13](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q13-%E9%9D%9E%E4%B8%8A%E6%9E%B6%E5%88%8A%E7%99%BB%E7%9A%84%E5%8F%AF%E8%A6%8B%E7%AF%84%E5%9C%8D)）

### 3.3 依分類與價格篩選

身為瀏覽二手書的買家，我想按分類與價格篩選，以便找到符合興趣和預算的書。

**驗收條件**

- [ ] **Given** 瀏覽結果包含不同分類的書目，**When** 買家選擇分類，**Then** 篩選結果只保留符合該分類的項目。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「瀏覽」、[核心資料](notes/product-spec.md#核心資料) Book）
- [ ] **Given** 瀏覽結果包含不同價格的刊登，**When** 買家設定價格條件，**Then** 篩選結果只保留刊登價格符合條件的項目。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「瀏覽」、[核心資料](notes/product-spec.md#核心資料) Listing）
- [ ] **Given** 符合分類或價格的刊登同時包含上架與非上架狀態，**When** 使用者進行公開篩選，**Then** 結果只顯示「上架中」的刊登。（依據 [Q13](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q13-%E9%9D%9E%E4%B8%8A%E6%9E%B6%E5%88%8A%E7%99%BB%E7%9A%84%E5%8F%AF%E8%A6%8B%E7%AF%84%E5%9C%8D)）
- [ ] **Given** 平台已設定分類清單，**When** 使用者開啟分類篩選，**Then** 可以從後台維護的現行分類中選擇。（依據 [Q14](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q14-%E6%9B%B8%E7%B1%8D%E5%88%86%E9%A1%9E%E8%88%87%E5%BE%8C%E5%8F%B0%E7%B7%A8%E8%BC%AF)）

## 4. 下單到完成交易

### 4.1 下單

身為買家，我想選擇物流和付款方式並確認這次的收件資料，以便買到指定刊登的二手書。

**驗收條件**

- [ ] **Given** 刊登為「上架中」，**When** 買家下單，**Then** 買家從賣家為該刊登設定的物流方式中選一種，並填妥姓名、手機號碼及對應的取貨門市或收件地址。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「交易」、[Q15](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q15-買家收件資訊)、[Q16](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q16-物流方式)、[F1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f1-收件資訊欄位)、[F2](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f2-模擬物流方式)）
- [ ] **Given** 買家的個人檔案已有收件資訊，**When** 選擇物流方式，**Then** 平台帶入該方式所需且已儲存的欄位，買家可補填或修改這次使用的資料。（依據 [Q15](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q15-買家收件資訊)、[F1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f1-收件資訊欄位)）
- [ ] **Given** 已驗證 Email 的買家已填妥資料且刊登仍可購買，**When** 下單成功，**Then** 訂單為「待出貨」，保存本次成交價、下單時間、物流方式、付款方式及本次收件資訊，刊登立即變成「交易中」。之後修改個人檔案也不影響這筆訂單的收件資訊。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[核心資料](notes/product-spec.md#核心資料) Order／Shipment、[業務規則](notes/product-spec.md#業務規則)「庫存」、[F1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f1-收件資訊欄位)、[Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)、[Q1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q1-email-%E9%A9%97%E8%AD%89%E5%89%8D%E7%9A%84%E6%AC%8A%E9%99%90)、[Q17](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q17-%E6%A8%A1%E6%93%AC%E4%BB%98%E6%AC%BE%E6%96%B9%E5%BC%8F)）
- [ ] **Given** 同一筆上架刊登收到兩次同時下單，或刊登已進入非上架狀態，**When** 平台處理下單，**Then** 同時下單最多成立一筆訂單，非上架刊登無法成立新訂單。（依據 [業務規則](notes/product-spec.md#業務規則)「庫存」、[品質要求](notes/product-spec.md#品質要求)「一致性」、[Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)）
- [ ] **Given** 賣家已為刊登設定可接受的付款方式，**When** 買家確認下單資料，**Then** 只能從賣家勾選的「銀行轉帳」與「電子支付轉帳」中選擇一種。超商取貨和宅配均適用。（依據 [Q17](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q17-%E6%A8%A1%E6%93%AC%E4%BB%98%E6%AC%BE%E6%96%B9%E5%BC%8F)）
- [ ] **Given** 買家已選定付款方式且下單資料符合條件，**When** 送出訂單，**Then** 平台直接建立「待出貨」訂單，付款資訊只記錄選定的方式。付款流程以選擇與記錄模擬，全程無實際款項移轉或金流串接。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[MVP 範圍](notes/product-spec.md#mvp-範圍)、[Q17](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q17-%E6%A8%A1%E6%93%AC%E4%BB%98%E6%AC%BE%E6%96%B9%E5%BC%8F)）

### 4.2 查看我的訂單

身為買家或賣家，我想查看自己的訂單及目前進度，以便知道交易進行到哪裡。

**驗收條件**

- [ ] **Given** 使用者有自己作為買家或賣家的訂單，**When** 查看自己的訂單，**Then** 可以查看該訂單的刊登、成交價、下單時間、所選的模擬付款方式和目前狀態，即使刊登不再公開也可查閱自己的訂單紀錄。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[核心資料](notes/product-spec.md#核心資料) Order、[Q13](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q13-%E9%9D%9E%E4%B8%8A%E6%9E%B6%E5%88%8A%E7%99%BB%E7%9A%84%E5%8F%AF%E8%A6%8B%E7%AF%84%E5%9C%8D)、[Q17](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q17-%E6%A8%A1%E6%93%AC%E4%BB%98%E6%AC%BE%E6%96%B9%E5%BC%8F)）
- [ ] **Given** 使用者是該筆訂單的賣家，**When** 查看訂單，**Then** 在「待出貨」「運送中」「待確認收貨」「爭議處理中」可查看該筆訂單的收件資訊，在「訂單完成」或「已取消」時看不到收件資訊。（依據 [品質要求](notes/product-spec.md#品質要求)「個資」、[Q19](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q19-訂單進行中的範圍)）

### 4.3 標記出貨

身為賣家，我想把待出貨的訂單標記為已出貨，以便讓買家開始追蹤物流進度。

**驗收條件**

- [ ] **Given** 自己的訂單為「待出貨」，**When** 賣家標記出貨，**Then** 訂單變成「運送中」，物流以買家下單時選定的方式建立「已出貨」紀錄，保存出貨時間並自動產生託運單號。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[核心資料](notes/product-spec.md#核心資料) Shipment、[Q16](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q16-物流方式)、[Q18](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q18-託運單號)、[F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)）
- [ ] **Given** 訂單已離開「待出貨」，**When** 賣家嘗試標記出貨，**Then** 平台拒絕操作，訂單和物流狀態維持原狀。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[品質要求](notes/product-spec.md#品質要求)「一致性」）

### 4.4 逾出貨期限自動取消

身為買家，我想讓逾期未出貨的訂單自動取消，以便結束長時間等不到出貨的交易。

**驗收條件**

- [ ] **Given** 訂單仍為「待出貨」，**When** 自下單起達到預設 3 天的出貨期限，**Then** 訂單變成「已取消」，刊登回到「上架中」並重新開放購買。（依據 [業務規則](notes/product-spec.md#業務規則)「出貨期限」、[Q20](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q20-取消後的刊登)、[Q21](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q21-%E9%A0%90%E8%A8%AD%E6%9C%9F%E9%99%90%E8%88%87%E5%B1%95%E7%A4%BA%E8%A8%AD%E5%AE%9A)）
- [ ] **Given** 訂單已在期限前標記出貨，**When** 到達出貨期限，**Then** 未出貨自動取消規則不會改變訂單狀態。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[業務規則](notes/product-spec.md#業務規則)「出貨期限」）

### 4.5 查看物流與模擬取貨

身為買家，我想查看模擬物流的狀態，以便知道何時可以確認收貨。

**驗收條件**

- [ ] **Given** 訂單有模擬物流紀錄，**When** 買家查看物流進度，**Then** 可以看到該筆物流的目前狀態與託運單號。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「交易」、[核心資料](notes/product-spec.md#核心資料) Shipment、[F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)、[Q18](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q18-託運單號)）
- [ ] **Given** 訂單已出貨且管理員未提前推進物流，**When** 分別達到出貨後預設第 1 天與第 2 天，**Then** 物流依序從「已出貨」進到「配送中」及「已取貨」。（依據 [F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)）
- [ ] **Given** 訂單為「運送中」，**When** 物流變成「已取貨」，**Then** 平台記錄取貨時間，訂單變成「待確認收貨」，並以該取貨時間開始計算預設 3 天的收貨確認期限。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[業務規則](notes/product-spec.md#業務規則)「收貨確認」、[Q23](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q23-買家取貨)、[F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)、[Q21](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q21-%E9%A0%90%E8%A8%AD%E6%9C%9F%E9%99%90%E8%88%87%E5%B1%95%E7%A4%BA%E8%A8%AD%E5%AE%9A)）

### 4.6 確認收貨

身為買家，我想在取貨後確認收貨，以便結束交易。

**驗收條件**

- [ ] **Given** 自己的訂單為「待確認收貨」，**When** 買家在確認期限內確認收貨，**Then** 訂單變成「訂單完成」，刊登變成「已售出」。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[業務規則](notes/product-spec.md#業務規則)「收貨確認」、[Q23](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q23-買家取貨)、[Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)）
- [ ] **Given** 訂單仍為「待確認收貨」，**When** 從取貨起達到預設 3 天的確認期限，**Then** 平台自動完成訂單，刊登變成「已售出」。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[業務規則](notes/product-spec.md#業務規則)「收貨確認」、[F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)、[Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)、[Q21](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q21-%E9%A0%90%E8%A8%AD%E6%9C%9F%E9%99%90%E8%88%87%E5%B1%95%E7%A4%BA%E8%A8%AD%E5%AE%9A)）
- [ ] **Given** 訂單已進入「爭議處理中」，**When** 到達原收貨確認期限，**Then** 訂單維持「爭議處理中」，等待管理員裁決。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[品質要求](notes/product-spec.md#品質要求)「一致性」）

### 4.7 在待出貨時取消訂單

身為訂單的買家或賣家，我想在出貨前取消訂單，以便在無法繼續交易時結束訂單。

**驗收條件**

- [ ] **Given** 訂單為「待出貨」，**When** 該筆訂單的買家或賣家取消訂單，**Then** 訂單變成「已取消」，刊登回到「上架中」並重新開放購買。（依據 [Q22](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q22-買賣雙方自行取消)、[Q20](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q20-取消後的刊登)）
- [ ] **Given** 訂單已離開「待出貨」，**When** 買家或賣家嘗試自行取消，**Then** 平台拒絕取消，維持原訂單狀態。（依據 [Q22](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q22-買賣雙方自行取消)、[訂單流程](notes/product-spec.md#訂單流程)）

## 5. 管理後台

### 5.1 限制管理後台權限

身為管理員，我想讓後台依角色限制存取，以便只有具備管理權限的人能執行管理操作。

**驗收條件**

- [ ] **Given** 使用者已登入且具備管理權限，**When** 開啟後台，**Then** 可存取其角色有權使用的管理功能。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「管理」、[品質要求](notes/product-spec.md#品質要求)「安全」）
- [ ] **Given** 使用者未登入或無管理權限，**When** 嘗試開啟後台或執行管理操作，**Then** 平台拒絕存取與操作。（依據 [品質要求](notes/product-spec.md#品質要求)「安全」）
- [ ] **Given** 團隊部署平台，**When** 設定後台管理帳號，**Then** 團隊可建立使用同一種管理員角色的指定帳號，一般註冊建立的是一般使用者帳號。（依據 [Q24](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q24-%E7%AE%A1%E7%90%86%E5%93%A1%E5%B8%B3%E8%99%9F%E8%88%87%E8%A7%92%E8%89%B2)）

### 5.2 在後台管理使用者

身為管理員，我想在後台查閱帳號、管理停權及處理刪除申請，以便處理帳號異常與使用者的申請。

**驗收條件**

- [ ] **Given** 平台已有使用者帳號，**When** 管理員查看使用者管理區，**Then** 可查看個別帳號的暱稱與角色。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「管理」、[核心資料](notes/product-spec.md#核心資料) User）
- [ ] **Given** 一般使用者帳號可發起新交易，**When** 管理員在後台停權，**Then** 該帳號不能發起新交易，既有訂單仍可依原流程處理。（依據 [Q25](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q25-%E7%AE%A1%E7%90%86%E5%93%A1%E7%9A%84%E6%93%8D%E4%BD%9C%E7%AF%84%E5%9C%8D)）
- [ ] **Given** 一般使用者帳號處於停權狀態，**When** 管理員解除停權，**Then** 該帳號恢復發起新交易的權限，仍須符合 Email 驗證等一般條件。（依據 [Q1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q1-email-%E9%A9%97%E8%AD%89%E5%89%8D%E7%9A%84%E6%AC%8A%E9%99%90)、[Q25](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q25-%E7%AE%A1%E7%90%86%E5%93%A1%E7%9A%84%E6%93%8D%E4%BD%9C%E7%AF%84%E5%9C%8D)）
- [ ] **Given** 使用者已提出刪除帳號申請，**When** 管理員在後台查看申請，**Then** 可依 1.4 處理帳號與既有交易紀錄。（依據 [Q5](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q5-%E5%88%AA%E9%99%A4%E5%B8%B3%E8%99%9F%E7%94%B3%E8%AB%8B)、[Q25](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q25-%E7%AE%A1%E7%90%86%E5%93%A1%E7%9A%84%E6%93%8D%E4%BD%9C%E7%AF%84%E5%9C%8D)）

### 5.3 在後台查閱與下架刊登

身為管理員，我想在後台查看刊登與販售狀態，並下架仍在販售的刊登，以便管理公開販售內容。

**驗收條件**

- [ ] **Given** 平台已有刊登，**When** 管理員查看刊登管理區，**Then** 可查看個別刊登的書目、賣家與狀態。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「管理」、[核心資料](notes/product-spec.md#核心資料) Listing、[Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)）
- [ ] **Given** 刊登為「上架中」，**When** 管理員在後台下架，**Then** 刊登改為「已下架」，公開查閱依 3.1–3.3 的可見範圍處理。（依據 [Q13](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q13-%E9%9D%9E%E4%B8%8A%E6%9E%B6%E5%88%8A%E7%99%BB%E7%9A%84%E5%8F%AF%E8%A6%8B%E7%AF%84%E5%9C%8D)、[Q25](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q25-%E7%AE%A1%E7%90%86%E5%93%A1%E7%9A%84%E6%93%8D%E4%BD%9C%E7%AF%84%E5%9C%8D)）
- [ ] **Given** 刊登為「交易中」「已售出」或「已下架」，**When** 嘗試從後台下架，**Then** 平台拒絕操作，保留原刊登與訂單狀態。（依據 [Q25](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q25-%E7%AE%A1%E7%90%86%E5%93%A1%E7%9A%84%E6%93%8D%E4%BD%9C%E7%AF%84%E5%9C%8D)）

### 5.4 在後台查看訂單

身為管理員，我想在後台查看訂單的交易狀態，以便掌握各筆交易的進度。

**驗收條件**

- [ ] **Given** 平台已有訂單，**When** 管理員查看訂單管理區，**Then** 可查看個別訂單關聯的刊登、買家、賣家與目前狀態。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「管理」、[核心資料](notes/product-spec.md#核心資料) Order）
- [ ] **Given** 管理員在後台查閱訂單，**When** 需要介入交易，**Then** 可依 5.6 推進物流或依 6.2 裁決爭議，由對應規則自動更新訂單狀態。訂單狀態欄為唯讀。（依據 [Q25](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q25-%E7%AE%A1%E7%90%86%E5%93%A1%E7%9A%84%E6%93%8D%E4%BD%9C%E7%AF%84%E5%9C%8D)、[Q26](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q26-%E5%BE%8C%E5%8F%B0%E8%A8%82%E5%96%AE%E7%8B%80%E6%85%8B%E6%9B%B4%E6%96%B0)）

### 5.5 留存後台操作紀錄

身為管理員，我想讓平台留存已執行的後台管理操作並能查閱，以便事後追查管理行為。

**驗收條件**

- [ ] **Given** 管理員有權執行已定案的後台操作，例如推進物流或裁決爭議，**When** 完成該操作，**Then** 平台記錄操作者帳號、時間、操作類型、對象編號與結果。有狀態變更時，一併記錄前後狀態。（依據 [品質要求](notes/product-spec.md#品質要求)「安全」、[F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)、[Q27](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q27-%E5%BE%8C%E5%8F%B0%E6%93%8D%E4%BD%9C%E7%B4%80%E9%8C%84)）
- [ ] **Given** 平台已有操作紀錄，**When** 管理員開啟後台操作紀錄頁，**Then** 管理員可以唯讀查看紀錄。（依據 [Q27](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q27-%E5%BE%8C%E5%8F%B0%E6%93%8D%E4%BD%9C%E7%B4%80%E9%8C%84)）
- [ ] **Given** 專案尚未驗收結束，**When** 管理員查閱既有的操作紀錄，**Then** 紀錄仍可查閱。驗收結束後由團隊處理清理。（依據 [Q27](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q27-%E5%BE%8C%E5%8F%B0%E6%93%8D%E4%BD%9C%E7%B4%80%E9%8C%84)）

### 5.6 在後台推進模擬物流

身為管理員，我想從後台將物流推進到下一個狀態，以便展示完整交易流程。

**驗收條件**

- [ ] **Given** 物流為「已出貨」或「配送中」，**When** 管理員在後台推進物流，**Then** 物流依序前進一步，分別進到「配送中」或「已取貨」，並留下操作紀錄。（依據 [F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)、[品質要求](notes/product-spec.md#品質要求)「一致性」「安全」）
- [ ] **Given** 物流已是「已取貨」，**When** 嘗試繼續推進，**Then** 物流及訂單狀態保持原狀。（依據 [F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)、[品質要求](notes/product-spec.md#品質要求)「一致性」）
- [ ] **Given** 訂單為「運送中」且物流為「配送中」，**When** 管理員把物流推進到「已取貨」，**Then** 套用 4.5 的取貨連動，記錄取貨時間、更新訂單狀態並開始計算收貨確認期限。（依據 [Q23](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q23-買家取貨)、[F4](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f4-模擬物流的狀態與觸發)）

### 5.7 在後台編輯書籍分類

身為管理員，我想在後台編輯書籍分類，以便維護刊登和公開瀏覽使用的分類清單。

**驗收條件**

- [ ] **Given** 平台首次初始化，**When** 開啟書籍分類清單，**Then** 預設有教科書與參考書、考試與語言學習、文學與小說、漫畫與輕小說、童書、商管與科技、人文與生活、其他八類。（依據 [Q14](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q14-%E6%9B%B8%E7%B1%8D%E5%88%86%E9%A1%9E%E8%88%87%E5%BE%8C%E5%8F%B0%E7%B7%A8%E8%BC%AF)）
- [ ] **Given** 管理員開啟後台分類管理，**When** 修改既有分類名稱並儲存，**Then** 書目維持與該分類的關聯，刊登與公開篩選顯示更新後的名稱。（依據 [Q14](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q14-%E6%9B%B8%E7%B1%8D%E5%88%86%E9%A1%9E%E8%88%87%E5%BE%8C%E5%8F%B0%E7%B7%A8%E8%BC%AF)）

## 6. 爭議與評價

### 6.1 提出書況爭議

身為收到書況不符商品的買家，我想提出爭議並附上原因與證據，以便由管理員裁決。

**驗收條件**

- [ ] **Given** 自己的訂單為「待確認收貨」且仍在取貨後預設 3 天的確認期限內，**When** 該筆訂單的買家填寫書況爭議原因並附至少一張照片，**Then** 平台建立與訂單關聯的爭議案件，保存所提交的原因與證據，並將訂單改為「爭議處理中」。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[業務規則](notes/product-spec.md#業務規則)「收貨確認」「爭議」、[核心資料](notes/product-spec.md#核心資料) Dispute、[Q29](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q29-爭議裁決的依據)、[Q21](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q21-%E9%A0%90%E8%A8%AD%E6%9C%9F%E9%99%90%E8%88%87%E5%B1%95%E7%A4%BA%E8%A8%AD%E5%AE%9A)、[Q28](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q28-%E7%88%AD%E8%AD%B0%E6%8F%90%E5%87%BA%E8%88%87%E8%AD%89%E6%93%9A)）
- [ ] **Given** 訂單已不在「待確認收貨」或已超過確認期限，**When** 買家嘗試提出書況爭議，**Then** 平台拒絕建立爭議，訂單狀態維持原狀。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[業務規則](notes/product-spec.md#業務規則)「收貨確認」「爭議」）
- [ ] **Given** 案件已進入「爭議處理中」且尚未裁決，**When** 該筆訂單的賣家提交補充說明，**Then** 平台將說明及選填的照片附到案件。（依據 [Q28](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q28-%E7%88%AD%E8%AD%B0%E6%8F%90%E5%87%BA%E8%88%87%E8%AD%89%E6%93%9A)）
- [ ] **Given** 操作者是該筆訂單的賣家或交易雙方以外的使用者，**When** 嘗試提出爭議，**Then** 平台拒絕建立案件。（依據 [Q28](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q28-%E7%88%AD%E8%AD%B0%E6%8F%90%E5%87%BA%E8%88%87%E8%AD%89%E6%93%9A)）
- [ ] **Given** 買家或賣家上傳爭議照片，**When** 平台驗證檔案，**Then** 可接受 JPEG、PNG 和 WebP，每張上限 5 MB，並拒絕格式或大小不符的檔案。（依據 [Q28](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q28-%E7%88%AD%E8%AD%B0%E6%8F%90%E5%87%BA%E8%88%87%E8%AD%89%E6%93%9A)）

### 6.2 在後台裁決爭議

身為管理員，我想查閱待處理爭議的資料並記錄裁決，以便讓訂單及刊登依裁決更新。

**驗收條件**

- [ ] **Given** 訂單為「爭議處理中」，**When** 管理員在後台查看爭議案件，**Then** 可對照刊登的實拍照片、買家提交的原因與證據，以及賣家已提交的補充說明與照片。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「售後」「管理」、[Q29](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q29-爭議裁決的依據)、[Q28](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q28-%E7%88%AD%E8%AD%B0%E6%8F%90%E5%87%BA%E8%88%87%E8%AD%89%E6%93%9A)）
- [ ] **Given** 訂單為「爭議處理中」，**When** 管理員記錄賣家有理的裁決，**Then** 平台保存裁決結果、留下後台操作紀錄，訂單變成「訂單完成」，刊登變成「已售出」。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[核心資料](notes/product-spec.md#核心資料) Dispute、[Q10](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q10-管理刊登的範圍與刊登狀態)、[品質要求](notes/product-spec.md#品質要求)「安全」）
- [ ] **Given** 訂單為「爭議處理中」，**When** 管理員記錄買家有理的裁決，**Then** 平台保存裁決結果、留下後台操作紀錄，訂單變成「已取消」，刊登變成「已下架」。賣家取回書後可依 2.3 重新上架。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[核心資料](notes/product-spec.md#核心資料) Dispute、[F3](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f3-爭議取消後的刊登)、[Q30](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q30-書是否退回)、[品質要求](notes/product-spec.md#品質要求)「安全」）

### 6.3 互相評價

身為完成交易的買家或賣家，我想在期限內評價交易對方，以便留下交易經驗。

**驗收條件**

- [ ] **Given** 訂單為「訂單完成」且仍在完成當下起算的預設 14 天內，且該評價者尚未評過這筆訂單，**When** 買家或賣家對交易對方送出 1–5 顆整數星及選填留言，**Then** 平台保存評價與該筆訂單的關聯、評價者、被評價者及送出的星等與留言。（依據 [MVP 範圍](notes/product-spec.md#mvp-範圍)「售後」、[業務規則](notes/product-spec.md#業務規則)「評價」、[核心資料](notes/product-spec.md#核心資料) Review、[Q21](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q21-%E9%A0%90%E8%A8%AD%E6%9C%9F%E9%99%90%E8%88%87%E5%B1%95%E7%A4%BA%E8%A8%AD%E5%AE%9A)、[Q31](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q31-%E4%BA%92%E8%A9%95%E8%B3%87%E6%A0%BC%E8%88%87%E8%B5%B7%E7%AE%97%E6%99%82%E9%96%93)、[Q32](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q32-%E8%A9%95%E5%83%B9%E5%85%A7%E5%AE%B9%E8%88%87%E5%85%AC%E9%96%8B%E7%AF%84%E5%9C%8D)）
- [ ] **Given** 訂單尚未完成、已取消、已超過評價期限，或該使用者已評價過這筆訂單，**When** 嘗試送出評價，**Then** 平台拒絕新增評價。（依據 [業務規則](notes/product-spec.md#業務規則)「評價」、[Q31](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q31-%E4%BA%92%E8%A9%95%E8%B3%87%E6%A0%BC%E8%88%87%E8%B5%B7%E7%AE%97%E6%99%82%E9%96%93)、[Q32](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q32-%E8%A9%95%E5%83%B9%E5%85%A7%E5%AE%B9%E8%88%87%E5%85%AC%E9%96%8B%E7%AF%84%E5%9C%8D)）
- [ ] **Given** 買家或賣家已送出評價，**When** 嘗試修改星等或留言，**Then** 平台保留原評價。（依據 [Q32](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q32-%E8%A9%95%E5%83%B9%E5%85%A7%E5%AE%B9%E8%88%87%E5%85%AC%E9%96%8B%E7%AF%84%E5%9C%8D)）

### 6.4 查看平均星等與公開評價

身為要評估交易對象的使用者，我想查看對方的平均星等及收到的單筆評價，以便了解過往交易經驗。

**驗收條件**

- [ ] **Given** 使用者收到一筆或多筆有效的星等評價，**When** 平台更新該使用者的平均評價，**Then** 平均值以該使用者收到的有效星等計算，顯示時四捨五入至小數點後一位。（依據 [產品定位](notes/product-spec.md#產品定位)、[核心資料](notes/product-spec.md#核心資料) User／Review、[Q32](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q32-%E8%A9%95%E5%83%B9%E5%85%A7%E5%AE%B9%E8%88%87%E5%85%AC%E9%96%8B%E7%AF%84%E5%9C%8D)）
- [ ] **Given** 訪客開啟上架中的刊登詳細頁，**When** 查看賣家資訊或點選賣家暱稱，**Then** 刊登頁顯示賣家的平均星等，暱稱連到公開評價頁，可查看平均星等及單筆評價的星等與已填寫的留言。（依據 [Q32](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q32-%E8%A9%95%E5%83%B9%E5%85%A7%E5%AE%B9%E8%88%87%E5%85%AC%E9%96%8B%E7%AF%84%E5%9C%8D)、[Q33](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q33-%E5%B9%B3%E5%9D%87%E6%98%9F%E7%AD%89%E8%88%87%E5%85%AC%E9%96%8B%E8%A9%95%E5%83%B9%E5%85%A5%E5%8F%A3)）
- [ ] **Given** 買家或賣家查閱自己的訂單，**When** 點選交易對方的暱稱，**Then** 開啟對方的公開評價頁。（依據 [Q33](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q33-%E5%B9%B3%E5%9D%87%E6%98%9F%E7%AD%89%E8%88%87%E5%85%AC%E9%96%8B%E8%A9%95%E5%83%B9%E5%85%A5%E5%8F%A3)）
- [ ] **Given** 使用者尚未收到評價，**When** 查看其星等或公開評價頁，**Then** 顯示「尚無評價」。（依據 [Q33](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q33-%E5%B9%B3%E5%9D%87%E6%98%9F%E7%AD%89%E8%88%87%E5%85%AC%E9%96%8B%E8%A9%95%E5%83%B9%E5%85%A5%E5%8F%A3)）

## 跨 Story 的品質要求

- [ ] **Given** MVP 使用預設期限，**When** 平台計算期限，**Then** 出貨為下單後 3 天，收貨確認為取貨後 3 天，互評為訂單完成後 14 天。展示需要縮短期限時由團隊調整測試環境，後台提供 5.6 的物流推進操作。（依據 [Q21](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q21-%E9%A0%90%E8%A8%AD%E6%9C%9F%E9%99%90%E8%88%87%E5%B1%95%E7%A4%BA%E8%A8%AD%E5%AE%9A)）
- [ ] **Given** 買家或賣家以手機或桌面瀏覽器開啟網站，**When** 進行上架、下單、出貨、收貨及評價，**Then** 頁面會依螢幕寬度調整，使用者可完成對應操作。適用於使用者端 Story。（依據 [產品定位](notes/product-spec.md#產品定位)「MVP 型態」、[MVP 範圍](notes/product-spec.md#mvp-範圍)）
- [ ] **Given** 任一訂單狀態操作，**When** 嘗試進行規格書和 PO 決定未允許的狀態轉換，**Then** 訂單維持原狀。適用於 4.1、4.3–4.7、5.6、6.1–6.2。（依據 [訂單流程](notes/product-spec.md#訂單流程)、[品質要求](notes/product-spec.md#品質要求)「一致性」、[Wiki 訂單狀態轉換](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#%E8%A8%82%E5%96%AE)）
- [ ] **Given** 使用者填寫交易資料，**When** 平台收集或保存資料，**Then** 收集範圍限於該交易所需欄位。收件資料依 4.1 的物流方式填寫，賣家可見範圍依 4.2。（依據 [品質要求](notes/product-spec.md#品質要求)「個資」、[F1](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#f1-收件資訊欄位)、[Q19](https://github.com/cm4578/SE-2026/wiki/PO-%E6%B1%BA%E5%AE%9A#q19-訂單進行中的範圍)）

## 交接給 SM

PO 審閱此文件後，SM 可依每條 Story 的標題、敘述、驗收條件及需求來源建立 Issue。貼上內容時，將規格書的相對連結換成 GitHub 上對應的規格書段落連結，保留題號的 Wiki 連結，並在 2.1 的 Issue 附上書況分級表，供刊登編輯與詳細頁的 Issue 引用。品質要求附到對應 Issue。依[團隊流程](agile-ai-workflow.md#單一-story-流程)，在 Issue 記錄 AI 工具與起草者、加上 `ai-drafted`、放入 `AI Draft`，由 SM 檢查 INVEST 並留下紀錄，再交 PO 正式審查。優先順序、估點與 Sprint 由團隊在各自的人工關卡處理。
