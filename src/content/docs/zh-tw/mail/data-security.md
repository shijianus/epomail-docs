---
title: 資料處理與安全維護
description: EpoCanvas Mail 資料生命週期、處理矩陣、縱深防禦體系、雙重屬性治理與全球合規指南。
---

**生效日期：2026 年 10 月 1 日｜版本：5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail 秉持「隱私即基本人權」與「程式碼即契約」的工程哲學。我們構建了結合託管雲端服務與開源自治專案的「雙重屬性融合」治理架構。本規範詳盡公開個人資料於系統內的全鏈路生命週期、加密儲存矩陣、四層縱深防禦工程，以及因應全球不同法域的合規標準與責任邊界。
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ 零遙測追蹤 (Zero Telemetry)</span>
    <span class="google-pill">🔐 AES-256-GCM 靜態加密</span>
    <span class="google-pill">⚡ 邊緣瞬時執行 (Edge V8)</span>
    <span class="google-pill">🌐 全球多法域合規 (GDPR / CCPA)</span>
  </div>
</div>

本文檔依[隱私政策](/zh-tw/mail/privacy-policy/)與[服務條款](/zh-tw/mail/terms-of-service/)訂定，既作為託管服務用戶查驗隱私保障與安全技術之權威指南，亦作為獨立部署者搭建合規通訊節點及主管機關依法稽核之基準規範。

## 1. 全鏈路資料生命週期與邊緣處理模型

本服務將個人資料與通訊流之生命週期嚴格劃分為「收集、處理、利用、傳輸、保存、銷毀」六大階段。各階段均在 Cloudflare 邊緣計算與全球 Anycast 網路上以無狀態方式流轉，杜絕持久化殘留與越權讀取。

![EpoCanvas Mail 資料處理與全鏈路生命週期流水線：無狀態收集、邊緣 V8 沙箱執行、AES-256-GCM 密文封包、分層儲存與密碼學粉碎](/images/mail/data-security-pipeline.svg)

*圖 1：個人資料於本服務之全鏈路生命週期流水線。系統在各個環節均落實最小必要原則與強加密隔離，具體法律性質參見[隱私政策](/zh-tw/mail/privacy-policy/)第 5 節。*

### 1.1 最小化收集與零遙測承諾

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ 極簡採集與零商業遙測</div>
    <span class="google-pill">資料最小化 · 零追蹤</span>
  </div>
  <div class="google-card-desc">
    <p><strong>嚴格最小化採集</strong>：除用戶主動註冊所必需的帳號識別（使用者名稱、郵箱別名）及身分憑據外，系統絕不索取或收集通訊錄、剪貼簿、設備感測器（陀螺儀）或跨站行為資料。</p>
    <p><strong>堅決杜絕商業遙測</strong>：EpoCanvas Mail 無論在官方託管平台還是開原始碼庫中，均恪守絕對的「零行為遙測」（Zero Telemetry）準則。系統絕不內嵌任何廣告轉化追蹤器、商業分析 SDK 或第三方監控腳本，所有通訊與閱讀互動僅在本地信箱沙箱內生效。</p>
  </div>
</div>

### 1.2 邊緣瞬時執行與記憶體隔離

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚡ 邊緣瞬時計算與奈秒沙箱</div>
    <span class="google-pill">Cloudflare V8 · 記憶體隔離</span>
  </div>
  <div class="google-card-desc">
    <p><strong>無狀態奈秒級沙箱</strong>：當郵件遞送抵達或用戶發起互動請求時，業務邏輯直接在離用戶地理最近的 Cloudflare Workers 邊緣節點（V8 Isolate）中瞬時執行，處理完成後沙箱環境奈秒級物理銷毀。</p>
    <p><strong>零宿主磁碟留存</strong>：郵件解密明文與路由上下文僅暫存於邊緣節點的易失性記憶體中，絕不寫入任何宿主機物理磁碟。這種底層架構徹底消除了傳統持久化伺服器中因常駐行程殘留、記憶體洩漏或多租戶側信道導致的潛在安全風險。</p>
  </div>
</div>

### 1.3 密碼學銷毀與徹底遺忘機制

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🗑️ 密碼學粉碎與被遺忘權保障</div>
    <span class="google-pill">7 日緩衝 · 金鑰覆寫滅失</span>
  </div>
  <div class="google-card-desc">
    <p><strong>7 日緩衝與定時物理清理</strong>：用戶移入垃圾桶的郵件提供 7 日防誤刪緩衝期，到期由邊緣 Cron 定時任務執行不可逆的物理級覆寫擦除；當用戶信箱用量突破 90% 預警閾值時，系統亦會對已刪除郵件逕行實體擦除以保障信箱健康。</p>
    <p><strong>不可逆金鑰覆寫粉碎</strong>：當用戶請求主動註銷帳號時，系統不僅立即抹除 D1 關聯式資料庫與 KV 快取中的關聯索引，更會在物理儲存層執行加密主金鑰覆寫粉碎，從密碼學數學底層實現永久且不可逆的徹底物理滅失。</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. 資料處理矩陣與儲存介質規格

本服務所涉全部資料類別、具體收集欄位、處理目的、底層儲存媒體及安全基準如下表所列。我們對不同敏感級別的資料實施物理分層與差異化存取控制：

| 資料類別 | 具體項目 | 處理目的 | 儲存媒體與安全基準 | 保存與銷毀 |
| --- | --- | --- | --- | --- |
| 帳號憑證 | 電子郵件地址、使用者名稱、密碼雜湊值與鹽、TOTP 金鑰（AES-GCM 加密）、備用碼雜湊值、Passkey 公鑰 | 註冊、驗證、兩步驟驗證、憑證恢復 | Cloudflare D1；密碼 PBKDF2（100,000 次反覆運算加鹽）、TOTP 靜態加密 | 保存至帳號終止；實體刪除時即刻清除 |
| 網路與設備資料 | 註冊 IP、最近登入 IP、作業系統、瀏覽器 User-Agent、設備類型 | 安全稽核、異常登入識別、限流 | Cloudflare D1；限管理員稽核存取 | 保存至帳號實體刪除 |
| 會話狀態 | JWT 權杖、RBAC 角色識別、選定信箱 | 邊緣閘道授權、請求路由 | Cloudflare KV；最長有效期 30 日 | 登出即撤銷；30 日未活動自然過期 |
| 通訊資料 | 寄件人與收件人、CC/BCC、主旨、時間戳記、已讀狀態、標籤、星號、正文 | 郵件投遞、會話組織、搜尋 | Cloudflare D1（詮釋資料）；依模式以 AES-256-GCM 靜態加密 | 由當事人控制；垃圾桶 7 日實體刪除；用量逾 90% 時對已刪郵件逕行實體刪除 |
| 附件 | 原始檔名、MIME 類型、檔案大小、二進位內容 | 附件傳輸、內嵌顯示、安全下載 | 實例自有物件儲存（依序解析：自備或營運者配置之 S3 相容儲存、Cloudflare R2 綁定，預設 Cloudflare KV）；下載採防禦性標頭 | 隨所屬郵件之生命週期；實體刪除時一併清除 |
| 安全與限流記錄 | 登入失敗計數、註冊頻控記錄、AI 用量統計 | 暴力破解防護、濫用防治 | Cloudflare KV；固定視窗計數器 | 登入失敗計數 12 小時內自動過期；註冊頻控記錄每日例行清理；AI 用量統計保留 60 日 |
| 安全通知環境指紋 | 已知設備、登入地點 (Geo)、網路 ASN 指紋，1 小時防疲勞時間戳記 | 登入環境異常識別、防警報風暴去重 | Cloudflare KV（前綴 USER_KNOWN_ENV_）；保留最新 15 條指紋 | 90 日未活動或帳號實體刪除時一併清除 |
| 介面偏好 | 語言（6 語言）、明暗模式、通知旗標 | 介面一致性 | 瀏覽器 localStorage，選擇性同步至 D1 | 保留至清除快取或手動重設 |

### 2.1 憑證脫敏與 PBKDF2 / WebAuthn 儲存基準

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔐 單向密碼學保護與硬體金鑰隔離</div>
    <span class="google-pill">PBKDF2 100k · WebAuthn FIDO2</span>
  </div>
  <div class="google-card-desc">
    <p><strong>PBKDF2 100,000 次金鑰拉伸</strong>：密碼憑證絕不以明文或簡單散列儲存，系統強制採用高強度隨機鹽（Salt）結合 PBKDF2 演算法進行 100,000 次金鑰反覆運算拉伸，有效防禦離線彩虹表分析與專用 GPU 算力碰撞破解。</p>
    <p><strong>TOTP 與 FIDO2 Passkey 硬體防護</strong>：雙重驗證 TOTP 金鑰入庫前經由實例主金鑰實施 AES-256-GCM 靜態加密；Passkey 基於非對稱公鑰密碼學，私鑰永久固化於用戶安全晶片（Secure Enclave），伺服端僅儲存公鑰憑證，根本杜絕中間人釣魚與資料庫被盜冒充。</p>
  </div>
</div>

### 2.2 儲存分層與自備物件儲存架構

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📦 儲存解耦與防禦性內容標頭</div>
    <span class="google-pill">BYO-S3 · R2 原生 · KV 降級</span>
  </div>
  <div class="google-card-desc">
    <p><strong>三級彈性儲存通道</strong>：系統支援按優先順序智慧路由附件資產：優先接入用戶或企業自備的 S3 相容儲存桶（BYO-Storage），次選 Cloudflare R2 邊緣原生儲存，並在輕量情境下平滑回退至 KV。自備儲存支援物理隔離讀寫憑證，賦予資料所有者完全的主權控制。</p>
    <p><strong>瀏覽器防禦性安全回應標頭</strong>：附件串流式下發時強制附加 <code>Content-Disposition: attachment</code> 與 <code>X-Content-Type-Options: nosniff</code> 標頭，強制阻斷惡意檔案內嵌解析，從瀏覽器通訊協定層切斷跨站腳本注入（XSS）與驅動式下載攻擊鏈路。</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. 四層縱深防禦體系與密碼學實現

為確保系統抵禦來自全球公共網際網路的複雜網路威脅，EpoCanvas Mail 在架構上構建了覆蓋邊緣閘道、認證通道、靜態加密及前端沙箱的四層縱深防禦體系：

![EpoCanvas Mail 縱深防禦技術架構模型：第 1 層邊緣網路與反 SSRF 閘道、第 2 層 FIDO2 Passkeys 認證、第 3 層 AES-256 靜態加密、第 4 層 Shadow DOM 客戶端沙箱與不可變存證](/images/mail/defense-layers-architecture.svg)

*圖 2：四層縱深防禦技術模型。各層獨立設防、互為補充，即使單點機制面臨極端壓力，整體資料資產依然處於受控的安全屏障之內。*

下表完整列出系統在技術、管理、流程與稽核維度的 11 項核心安全維護落實標準：

| 安全維護事項 | 本服務之落實 |
| --- | --- |
| 人員與資源配置 | 實例營運者指定管理員，依 RBAC 多級角色劃分權限 |
| 個人資料範圍之界定 | 本文檔第 2 節之處理矩陣，明確界定各類資料 |
| 風險評估及管理機制 | 三種郵件模式之加密選擇、失敗鎖定、限流與配額機制；開原始碼公開受社群檢視 |
| 事故之預防、通報及應變 | 見本文檔第 4 節 |
| 收集處理利用之內部管理程序 | [隱私政策](/zh-tw/mail/privacy-policy/)第 5 節之處理活動對應表 |
| 資料安全管理及人員管理 | 密碼學雜湊路由（防越權存取）、預設拒絕（fail-closed）之權限檢查、非白名單參數於閘道剝離 |
| 認知倡導及教育訓練 | 自行部署營運者應自行辦理；本站文檔可作為訓練素材 |
| 設備安全管理 | Cloudflare 邊緣設施承擔實體與虛擬設備安全（SOC 2 Type II、ISO/IEC 27001）；金鑰以環境變數注入，不入程式碼庫 |
| 資料安全稽核機制 | 安全日誌（登入 IP、設備、失敗記錄）留存並限稽核存取；會話得即時撤銷 |
| 使用記錄、軌跡資料及證據保存 | 登入與安全日誌保存至帳號實體刪除；濫用事件之證據依[可接受使用政策](/zh-tw/mail/acceptable-use/)保存 |
| 安全維護之整體持續改善 | 開源項目持續演進；重大安全修復隨版本發布並公告 |

### 3.1 邊緣網路與反濫用閘道

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌐 邊緣清洗與智慧反 SSRF 阻斷</div>
    <span class="google-pill">Layer 1 防線 · TLS 1.3 / HSTS</span>
  </div>
  <div class="google-card-desc">
    <p><strong>全球 Anycast 邊緣清洗</strong>：由 Cloudflare 邊緣網路抵禦並清洗全方位的分散式阻斷服務（DDoS）攻擊，全站強制執行 TLS 1.3 高強度傳輸加密與 HSTS 預先載入，根除中間人監聽與降級劫持隱患。</p>
    <p><strong>入站反 SSRF 攔截閘道</strong>：針對外部 Webhook、圖片代理與擷取請求內嵌嚴密的 IP 位址校驗機制。凡試圖探測私有區域網路（RFC 1918 內部位址）或雲端服務商底層詮釋資料介面（如 169.254.169.254）的惡意請求，一律在接入邊緣物理阻斷。</p>
  </div>
</div>

### 3.2 強身分認證與無密碼通行金鑰

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔑 網域綁定通行金鑰與頻控防線</div>
    <span class="google-pill">Layer 2 防線 · 指紋識別</span>
  </div>
  <div class="google-card-desc">
    <p><strong>FIDO2 WebAuthn 強綁定</strong>：系統深度整合現代通行金鑰標準，憑證與特定根網域實施密碼學綁定，天然免疫釣魚網站詐欺；全面支援硬體安全金鑰（YubiKey）與平台生物識別。</p>
    <p><strong>指數退避與環境異常警示</strong>：密碼登入通道配備多階梯頻控引擎，短時連續失敗觸發指數級退避並鎖定 12 小時；後台同步核對最新 15 組常用設備與網路 ASN 指紋，對異地異常登入即時推送分級安全警報。</p>
  </div>
</div>

### 3.3 靜態資料加密與金鑰隔離

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔒 工業級 AES-256-GCM 密文封包</div>
    <span class="google-pill">Layer 3 防線 · 金鑰隔離</span>
  </div>
  <div class="google-card-desc">
    <p><strong>信件獨立認證標籤（Tag）</strong>：郵件寫入 D1 關聯式資料庫前，正文經由加密主金鑰衍生生成獨立密文並攜帶認證標籤（AES-256-GCM），全面防禦資料庫離線勒索與未授權磁碟快照外洩風險。</p>
    <p><strong>執行階段安全環境變數注入</strong>：主加密金鑰由 Cloudflare Workers 執行階段加密環境變數注入，不落盤、不入庫、不提交程式碼倉，確保儲存介質與加解密上下文在物理拓撲上絕對隔離。</p>
  </div>
</div>

### 3.4 客戶端沙箱與不可變存證

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Shadow DOM 隔離與版本指紋校驗</div>
    <span class="google-pill">Layer 4 防線 · DOMPurify 白名單</span>
  </div>
  <div class="google-card-desc">
    <p><strong>雙重客戶端內容沙箱</strong>：所有外部接收的富文本 HTML 均通過 DOMPurify 白名單剝離 <code>&lt;script&gt;</code>、<code>&lt;iframe&gt;</code>、<code>&lt;style&gt;</code> 等惡意節點，並在獨立封裝的 Shadow DOM 沙箱中隔離渲染，阻斷樣式滲透與跨站腳本竊取會話。</p>
    <p><strong>不可變規範公開存證</strong>：官方發布規格依託 Git Commit 與 SHA-256 雜湊雙向存證，保障版本可追溯且全網公開可核驗，消除傳統中心化平台暗箱修改規則的技術隱患。</p>
  </div>
</div>

:::caution[加密之範圍與技術限制]
本服務所提供之「全部／隱私／加密」模式，系指伺服器端靜態加密（Server-side Encryption at Rest）。金鑰由實例伺服器之運行時安全環境變數與用戶身分上下文衍生。此機制旨在防範資料庫勒索、脫機備份遭竊取或儲存快照洩漏之系統級風險，而非傳統端對端加密（E2EE）；掌握伺服器實例底層運行權限與環境變數之營運者在理論技術上具備解密能力。若用戶間通訊涉及國家安全、高度機密或要求營運者亦完全無法查閱之絕對保密場景，當事人應自行使用 GPG / PGP 等客戶端公鑰密碼學工具於本地完成正文加解密後再行投遞。
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. 雙重屬性融合與開源治理邊界

EpoCanvas Mail 具有鮮明的「雙重屬性」：它既是一個面向公眾開放的免費託管郵件服務平台，也是一個在 MIT 協議下公開運作的開源軟體專案。明確兩者的權責分工與法律邊界，是維護健康社群生態的基石：

![EpoCanvas Mail 雙重屬性治理與全球合規矩陣：官方託管雲服務與開源自治專案權責劃分，以及 GDPR、CCPA 與 APAC 法規落地標準](/images/mail/dual-nature-compliance-matrix.svg)

*圖 3：雙重屬性融合治理邊界與全球合規矩陣。上游開源項目僅提供程式碼；各實例營運者是獨立的資料控制者並全權承擔法律責任；終端用戶享有自主選擇託管或私有化部署的充分權利。*

### 4.1 官方託管服務之營運承諾與責任限制

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">☁️ 官方託管服務定位與免責範疇</div>
    <span class="google-pill">mail.epocanvas.com · 非商用 SLA</span>
  </div>
  <div class="google-card-desc">
    <p><strong>公共託管服務品質</strong>：官方託管站點 <code>mail.epocanvas.com</code> 由核心團隊作為獨立營運者提供。我們承諾全力維護託管節點的可用性、零遙測合規性及密碼學防篡改標準，保障普通用戶免費享用安全純淨的通訊服務。</p>
    <p><strong>免責與用戶備份義務</strong>：託管服務屬於非商業公益性質，不提供企業級商業 SLA（服務水準協議）承諾，亦不對因不可抗力、上游雲基礎設施故障（如 Cloudflare 網路中斷）或用戶自身保管不慎導致的憑證遺失承擔間接賠償責任。用戶對其資料資產負有最終保管義務，應定期匯出備份重要通信。</p>
  </div>
</div>

### 4.2 開源專案許可、二次開發與分發準則

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📜 MIT 許可授權與二次開發紅線</div>
    <span class="google-pill">MIT 協議 · 商標隔離 · 獨立聲明</span>
  </div>
  <div class="google-card-desc">
    <p><strong>程式碼自由與稽核權利</strong>：系統底層原始碼依託 MIT 許可證全面開放，任何人均擁有自由查閱、獨立稽核、Fork 分支二次開發或搭建私有商業節點的完整法定權利。</p>
    <p><strong>分發與品牌三大紅線</strong>：</p>
    <ul>
      <li><strong>商標與官方品牌隔離</strong>：未經書面許可，任何第三方部署實例或二次開發版本不得在網域、介面標題或行銷文案中使用「EpoCanvas Mail 官方」、「官方節點」等誤導性字樣；</li>
      <li><strong>版權與許可完整保留</strong>：所有二次分發的原始碼副本或實質修改版本，必須完整保留原作者版權聲明及 MIT 許可證原文；</li>
      <li><strong>獨立營運者聲明</strong>：二次開發者若面向公眾提供服務，必須公示其自身營運主體與隱私條款，不得將官方文檔用作自身服務的法律背書。</li>
    </ul>
  </div>
</div>

### 4.3 獨立自建節點營運者之法定受託義務

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚖️ 自建節點營運者之獨佔資料控制權</div>
    <span class="google-pill">獨立資料控制者 · 無連帶責任</span>
  </div>
  <div class="google-card-desc">
    <p><strong>排他性資料控制者地位</strong>：第三方使用本專案程式碼在自有 Cloudflare 帳戶或伺服器搭建節點時，<strong>該營運者即成為該實例唯一且排他的「資料控制者」（Data Controller）</strong>。上游開源貢獻者與官方團隊對該獨立實例無物理控制權、無資料存取權限，亦不承擔任何法律連帶責任。</p>
    <p><strong>屬地合規與監管承接</strong>：自建節點營運者必須依法獨立履行其所在地資料保護義務，包括安全注入加密金鑰、制定符合當地法規的隱私聲明、處理用戶刪號與資料匯出請求，並獨立應對屬地司法與監管機構的合法調閱。</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. 全球區域合規與跨境資料流動

EpoCanvas Mail 服務面向全球網際網路開放。為確保用戶在不受到地域無理阻隔的同時，清晰了解不同司法管轄區下的法律權利與資料主權風險，我們針對全球主流法規體系制定了針對性的合規實施框架：

### 5.1 歐洲經濟區 (GDPR) 權利保障與跨境標準條款

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇪🇺 歐盟 GDPR 權利賦能與跨境保護</div>
    <span class="google-pill">GDPR Art. 15-22 · Art. 6 · SCCs</span>
  </div>
  <div class="google-card-desc">
    <p><strong>資料主體法定權利（Articles 15–22）</strong>：歐盟與歐洲經濟區（EEA）用戶享有隨時查閱、更正、匯出全部個人通訊資料、限制處理以及請求徹底刪除帳號的不可剝奪權利。</p>
    <p><strong>合法處理依據與標準合約條款（SCCs）</strong>：系統處理通訊流嚴格基於履行服務合約之必需（Art. 6(1)(b)）或用戶明確知情同意（Art. 6(1)(a)）；跨境中繼傳輸依託 Cloudflare 全球基礎設施所具備的歐盟標準合約條款（SCCs）與 GDPR 附錄協議保障流轉合法性。</p>
  </div>
</div>

### 5.2 美國法域 (CCPA / CPRA) 隱私權利與無銷售承諾

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇺🇸 加州 CCPA / CPRA 隱私權利聲明</div>
    <span class="google-pill">No Sale / Share · 無歧視對待</span>
  </div>
  <div class="google-card-desc">
    <p><strong>絕不銷售或共享個人資訊承諾</strong>：我們明確聲明：過去 12 個月內未曾、且未來亦絕不向任何資料經紀商、廣告聯盟或第三方商業實體銷售、出租或共享用戶的任何個人資訊與郵件資料（Do Not Sell or Share My Personal Information）。</p>
    <p><strong>知情權與非歧視待遇</strong>：加州居民享有要求揭露系統收集之資訊類別、商業目的及要求實體刪除的同等法定權利；系統絕不因用戶行使隱私權利而在服務水準、儲存容量或接入速度上施加任何歧視性限制。</p>
  </div>
</div>

### 5.3 亞太地區法規調適與當事人自主風險認知

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌏 亞太地區法規調適與自主風險認知</div>
    <span class="google-pill">台灣 PDPA · 跨國路由 · 終端安全</span>
  </div>
  <div class="google-card-desc">
    <p><strong>屬地管轄與跨國中繼路徑</strong>：官方託管實例由位於台灣的團隊營運，嚴格遵守當地個人資料保護法制（PDPA）。跨國電子郵件經由公網 SMTP 通訊協定流轉時，可能經過不同國家的網路交換節點並受沿途電信法例管轄，當事人應對跨法域路由具備基本認知。</p>
    <p><strong>終端自衛與反濫用治理</strong>：用戶應切實保管自身終端設備安全（防範木馬、定期更新韌體、啟用 Passkey/TOTP 雙重驗證）；嚴禁利用本服務從事跨國駭客攻擊、網路釣魚或垃圾郵件轟炸，違者營運團隊將依[可接受使用政策](/zh-tw/mail/acceptable-use/)迅速封禁並配合合法司法調查。</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. 安全事件應急響應與主管機關受檢

為積極應對突發的網路安全事件與資料安全漏洞，EpoCanvas Mail 建立了標準化的安全應急響應與通報機制，確保在最短時間內控制風險並向相關方公開透明說明：

### 6.1 72 小時應急阻斷與通報流程

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🚨 應急響應標準作業程序 (SOP)</div>
    <span class="google-pill">72 小時通報 · 快速阻斷 · 社群補丁</span>
  </div>
  <div class="google-card-desc">
    <p><strong>四步緊急阻斷與通報程序</strong>：</p>
    <ul>
      <li><strong>即時阻斷與威脅隔離</strong>：數分鐘內於邊緣閘道阻斷惡意來源 IP、強制註銷涉事會話 JWT 權杖，並視險情立即輪換實例加解密主金鑰；</li>
      <li><strong>數位鑑識與影響評估</strong>：隔離邊緣稽核日誌，精準界定受波及的帳號範圍、欄位類型與實際安全影響等級；</li>
      <li><strong>72 小時法定公開通報</strong>：若達到法定重大事件門檻，營運者將於確認事故後 72 小時內，通過全站公告及官方系統郵件通知受影響當事人，並向監管機關正式報備；</li>
      <li><strong>開源根因修復與安全公告</strong>：查明漏洞後立即合併上游修復程式碼，發布官方安全公告（Security Advisory），指引全網自建節點同步修補。</li>
    </ul>
  </div>
</div>

### 6.2 官方通報管道與受檢配合承接

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📮 官方專屬安全溝通與主管機關對接窗口</div>
    <span class="google-pill">官方對接 · 漏洞報告</span>
  </div>
  <div class="google-card-desc">
    <p><strong>合規受檢與自建責任隔離</strong>：官方託管服務 <code>mail.epocanvas.com</code> 接受主管機關依法實施的檢查與監督，本文檔即作為稽核基準。自建節點營運者應制定其自有規章並獨立應對屬地監管。安全研究員或用戶發現漏洞隱患時，請通過官方唯一可信窗口聯絡：</p>
    <ul>
      <li><strong>官方安全應急響應中心</strong>：<code>announcement@epocanvas.com</code></li>
      <li><strong>隱私與資料保護合規辦公室</strong>：<code>privacy@epocanvas.com</code></li>
    </ul>
  </div>
</div>
