---
title: EpoCanvas Mail 文件站介紹
description: EpoCanvas Mail 文件站介紹——站點定位、文件架構、閱讀路線、多語言結構與完整導覽。
---

**站點啟用：2026 年 9 月 28 日｜當前版本：v5.17｜站點地址：docs.epocanvas.com/epomail**

**生效日期：2026 年 10 月 5 日｜版本：5.17**

EpoCanvas Mail 文件站（下稱「本站」）是 EpoCanvas Mail 開放原始碼電子郵件服務的官方文件中心，涵蓋法律條款、技術規範、使用指南與開發文件。本站以 Astro 5 + Starlight 構建，六語言完全對稱（簡體中文、繁體中文、English、Français、Español、Nederlands），全部文件經程式碼實作逐字核驗，為託管實例使用者、自行部署者與稽核參與者提供單一可信文件源。本頁說明本站的定位、文件架構、閱讀路線與導覽入口。

本站法律文件以繁體中文（臺灣）版本為正式版本，其餘語言版本為對照譯本，文義有疑義時以正式版本為準。

![EpoCanvas Mail 文件架構：法律文件層（隱私權政策、服務條款、可接受使用政策與資料治理文件）與技術文件層（專案介紹、功能指南、技術架構、運行模式與使用指南）共同構成完整文件體系，全部立於開放原始碼與透明規範之基座](/images/mail/zh-tw/legal-architecture.svg)

*圖：文件架構。法律文件層定義資料處理與服務邊界；技術文件層說明功能、架構與使用方式；兩層文件均以開放原始碼實作為準。*

## 1. 站點定位

本站為 EpoCanvas Mail 開放原始碼專案的唯一官方文件，承擔三項職能：

- **法律告知**：隱私權政策、服務條款、可接受使用政策與資料處理規範，向託管實例使用者履行法定告知義務；自行部署者可將本站文件作為其告知與條款之基礎範本；
- **技術規範**：技術架構、安全設計、開發歷程與完整提交鏈路，供稽核參與者核驗程式碼實作與文件承諾之一致性；
- **使用指南**：功能說明、介面導覽、搜尋語法、部署步驟與開發流程，幫助使用者、營運者與開發者理解與使用本服務。

本站文件以開放原始碼之實際實作為準，禁止臆造；法條引用以 `doc/legal-reference.md` 核驗白名單為準；技術事實（加密語義、保存期限、第三方清單）經自動化測試與稽核指令碼持續核驗。

## 2. 文件架構

本站按主題分為三組文件，各組相互引用並共同構成完整之約定：

### 2.1 產品與總覽

| 文件 | 內容 |
| --- | --- |
| [專案介紹](/zh-tw/mail/project/) | 定位、核心功能、技術架構概覽、開發歷程與完整提交鏈路 |
| [服務範圍與支援](/zh-tw/mail/service-scope/) | 託管實例的服務邊界、免責聲明與聯絡管道 |
| [介面與路由總覽](/zh-tw/mail/interface/) | 收件匣、寫信、設定與管理控制台的完整介面導覽與路由映射 |

### 2.2 使用指南

| 文件 | 內容 |
| --- | --- |
| [功能指南](/zh-tw/mail/features/) | 收件匣整理、撰寫傳送、搜尋語法、標籤規則、驗證碼提取、轉寄推送與 AI 能力 |
| [運行模式](/zh-tw/mail/modes/) | 部署形態、郵件模式三檔隱私等級、身分分組與配額、登入與兩步驟驗證 |
| [設定指南](/zh-tw/mail/settings/) | 個人設定五分區（個資、常規、安全、資料、標籤）與管理控制台九分區導覽 |
| [搜尋與規則參考](/zh-tw/mail/search/) | 搜尋算子、管理端檢索與分類規則條件的完整參考 |
| [信箱介面與郵件詳情](/zh-tw/mail/mailbox/) | 收件匣視圖、三欄分屏、對話線程與郵件詳情頁的逐項說明 |
| [標籤與分類管理](/zh-tw/mail/labels/) | 標籤體系、分類規則引擎、黑白名單與全域治理工具 |
| [個資與常規設定](/zh-tw/mail/preferences/) | 個人資料卡、地址卡、介面語言、主題桌布與閱讀偏好 |
| [資料匯出與儲存](/zh-tw/mail/data/) | JSON 完整副本匯出、.eml 單郵件下載與儲存用量管理 |
| [帳號安全設定指南](/zh-tw/mail/security/) | 使用者名稱與密碼、兩步驟驗證中心（TOTP、備用恢復碼、通行密鑰）與信任裝置 |
| [通知與轉寄指南](/zh-tw/mail/notify/) | 個人轉寄、Telegram 推送與全域轉寄規則的配置與行為 |
| [分析頁](/zh-tw/mail/analysis/) | 資料視覺化儀表板、使用者增長與郵件分類統計 |
| [使用者清單](/zh-tw/mail/users/) | 帳號管理、角色分組、發信配額與封禁／恢復操作 |
| [全庫郵件審查](/zh-tw/mail/review/) | 管理端郵件檢索、垃圾郵件治理與受郵件模式約束的可見範圍 |
| [權限控制](/zh-tw/mail/roles/) | 六大身分分組、儲存配額、發件上限與 AI 授權模型 |
| [註冊密鑰](/zh-tw/mail/regkeys/) | 邀請碼生成、使用次數限制與過期管理 |
| [系統設定配置卡詳解](/zh-tw/mail/system/) | 網站設定、個性化、儲存、推送與開放平台等九張配置卡的逐項說明 |
| [開放平台與 API 接入](/zh-tw/mail/api/) | OAuth 2.0 / OIDC 認證中心、應用註冊、端點接入與個人 API 令牌 |
| [分類管理](/zh-tw/mail/category/) | 全域分類規則、發件人黑名單與主題關鍵詞黑名單 |
| [操作報告](/zh-tw/mail/audit/) | 稽核預警工單、風控研判、封禁申訴與受郵件模式聯動的時間戳剝離 |

### 2.3 技術與信任

| 文件 | 內容 |
| --- | --- |
| [技術架構](/zh-tw/mail/architecture/) | Cloudflare 邊緣部署拓撲、雙資料庫隔離、三模式加密體系、附件儲存鏈與應用安全設計 |
| [防竄改與官方規範](/zh-tw/mail/tamper-proof/) | 官方郵件規格與識別、官方認證標記、不可變投遞與文件防竄改校驗 |

### 2.4 自部署與開發

| 文件 | 內容 |
| --- | --- |
| [部署指南](/zh-tw/mail/deployment/) | 自行部署的完整步驟、前置條件、初始化引導鏈與密鑰注入 |
| [開發指南](/zh-tw/mail/development/) | 開發環境、工程流程、測試與稽核指令碼、提交規範與參與貢獻 |

### 2.5 隱私與資料保護

| 文件 | 內容 |
| --- | --- |
| [總覽](/zh-tw/mail/overview/) | 平台身分、資料處理角色界定、文件架構、效力順序與聯絡窗口 |
| [隱私權政策](/zh-tw/mail/privacy-policy/) | 個人資料之蒐集處理利用、處理性質、當事人權利與國際傳輸 |
| [資料處理與安全維護](/zh-tw/mail/data-security/) | 資料生命週期、處理矩陣、安全維護措施、事件應變與受檢配合 |
| [第三方處理者清單](/zh-tw/mail/sub-processors/) | 受託處理者、共享對象、涉及資料與國際傳輸保障機制 |

### 2.6 條款與合規

| 文件 | 內容 |
| --- | --- |
| [服務條款](/zh-tw/mail/terms-of-service/) | 服務使用之契約條件、權利義務、責任限制、準據法與管轄 |
| [可接受使用政策](/zh-tw/mail/acceptable-use/) | 使用行為之邊界、禁止行為清單與營運者之處置、執行程序 |
| [開源與自行部署法律](/zh-tw/mail/open-source/) | MIT 授權條款適用、自部署之資料控制者責任與免責聲明 |
| [用語定義](/zh-tw/mail/key-terms/) | 本站法律文件所用技術與法律名詞之定義 |

## 3. 閱讀路線

本站按兩條互補路線組織：

**路線一：了解專案、準備部署或學習使用**

[專案介紹](/zh-tw/mail/project/) → [功能指南](/zh-tw/mail/features/) → [運行模式](/zh-tw/mail/modes/) → [介面與路由總覽](/zh-tw/mail/interface/) → [搜尋與規則參考](/zh-tw/mail/search/) → [設定指南](/zh-tw/mail/settings/) → [部署指南](/zh-tw/mail/deployment/) → [開發指南](/zh-tw/mail/development/)

**路線二：了解隱私法律約定與服務邊界**

[總覽](/zh-tw/mail/overview/) → [隱私權政策](/zh-tw/mail/privacy-policy/) → [服務條款](/zh-tw/mail/terms-of-service/) → [可接受使用政策](/zh-tw/mail/acceptable-use/) → [資料處理與安全維護](/zh-tw/mail/data-security/) → [第三方處理者清單](/zh-tw/mail/sub-processors/)

兩條路線於[功能指南](/zh-tw/mail/features/)與[運行模式](/zh-tw/mail/modes/)處交會。

## 4. 多語言結構

本站提供六種語言，結構 1:1 對稱：

| 語言 | 標識 | 說明 |
| --- | --- | --- |
| 簡體中文 | `zh` | 站點預設語言，佔用 URL 根路徑（`/epomail/mail/...`） |
| 繁體中文（臺灣） | `zh-tw` | 法律文件正式版本，其餘語言為對照譯本（`/epomail/zh-tw/mail/...`） |
| English | `en` | 對照譯本（`/epomail/en/mail/...`） |
| Français | `fr` | 對照譯本（`/epomail/fr/mail/...`） |
| Español | `es` | 對照譯本（`/epomail/es/mail/...`） |
| Nederlands | `nl` | 對照譯本（`/epomail/nl/mail/...`） |

站點首頁（`/` 與 `/epomail/`）經 Cloudflare Pages Functions 按瀏覽器 `Accept-Language` 標頭協商語言，自動跳轉至對應語言的[總覽](/zh-tw/mail/overview/)頁。舊根軌道路徑 `/mail/...` 重新導向至帶語言協商的規範路徑。

每種語言的文件數量、標題層級、表格行列、圖片與提示框數量必須嚴格一致，由 `scripts/check-structure.py` 自動化核驗。版本號與生效日期全站統一。

## 5. 文件品質保障

本站文件經以下機制保障品質與一致性：

- **程式碼實作核驗**：技術事實（加密語義、保存期限、第三方清單、角色配額）以 epomail 程式庫原始碼為準，禁止臆造；
- **法條引用白名單**：`doc/legal-reference.md` 是全站唯一法條引用依據，僅允許引用該清單已核驗之條號；
- **結構對稱檢查**：`scripts/check-structure.py` 校驗六語言文件的標題、表格、圖片與提示框數量嚴格一致；
- **錨點完整性**：`scripts/validate-anchors.cjs` 掃描全站錨點與圖片引用，確保零斷鏈；
- **建置零報錯**：`pnpm build` 必須零報錯通過，任何警告或錯誤均阻止發布；
- **防竄改校驗**：官方文件經 HMAC-SHA256 簽章與不可變快照投遞，見[防竄改與官方規範](/zh-tw/mail/tamper-proof/)。

## 6. 站點技術堆疊

| 組件 | 實作 |
| --- | --- |
| 靜態生成 | Astro 5.0 + Starlight 0.32 |
| 路由協商 | Cloudflare Pages Functions（`functions/_lib.js` 共享語言協商邏輯） |
| 部署 | Cloudflare Pages（`npx wrangler pages deploy dist --project-name epomail-docs`） |
| 建置產物 | 雙軌發布：`dist/*` 根路徑與 `dist/epomail/*` 子路徑鏡像（`scripts/post-build.mjs` 執行） |
| 樣式系統 | 自訂 CSS（`src/styles/custom.css`，627 列），對齊 EpoCanvasDocs 靛藍科技配色 |
| 圖示與資產 | 300+ 離線向量圖示、明暗雙主題、六語言本地化插圖（`/images/mail/{zh-tw,en,es,fr,nl}/*.svg`） |

## 7. 相關資源

| 資源 | 連結 |
| --- | --- |
| 託管實例 | [mail.epocanvas.com](https://mail.epocanvas.com) |
| 原始碼 | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) |
| 文件站原始碼 | EpomailDocs 獨立 git 程式庫（本站建置產物） |
| 隱私事項聯絡 | privacy@epocanvas.com |
| 產品內聯絡 | 站內訊息或 admin@epocanvas.com |
| 開放原始碼專案 Issue | GitHub 程式庫 Issue |
