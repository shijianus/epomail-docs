---
title: 快速上手
description: EpoCanvas Mail 快速上手——託管實例從註冊到寄出第一封信的最短路徑，與自行部署實例從複製倉庫到收發核驗的完整序列。
---

**更新日期：2026 年 11 月 2 日｜版本：5.25**

本頁說明託管實例註冊（路徑 A）與自行部署（路徑 B）。下列時間僅是功能上手的估算，不含法律與安全準備。本頁所述新註冊與資料控制流程，須配套升級 Worker、React 登入介面和 Vue 設定介面並完成設定；不表示任何線上實例已升級或通過驗證。其他功能與設定細節見各專頁。

本站法律文件以繁體中文（臺灣）版本為正式版本，其餘語言版本為對照譯本，文義有疑義時以正式版本為準。

![EpoCanvas Mail 雙軌治理示意：同一開源程式碼庫，託管與自行部署實例分別由實際營運者選擇資源及外部服務](/images/mail/zh-tw/dual-nature-scale.svg)

*圖：兩條路徑運行同一套程式碼。託管實例須由使用者在註冊時明確勾選接受[服務條款](/zh-tw/mail/terms-of-service/)；[隱私權政策](/zh-tw/mail/privacy-policy/)用於提供資料處理告知，不是概括同意。自部署之時起，部署者須依實際處理活動評估自身角色（見[總覽](/zh-tw/mail/overview/)第 2 節）。*

## 1. 選擇路徑

| | 路徑 A：託管實例 | 路徑 B：自行部署 |
| --- | --- | --- |
| 適合 | 先試用產品，不自備基礎設施 | 已有網域與 Cloudflare 帳號，要資料完全自主 |
| 前置 | 一個瀏覽器 | 網域、Cloudflare 帳號、Node.js 與 pnpm；站外寄信另需投遞通道帳號 |
| 耗時 | 約 10 分鐘 | 約 30 分鐘 |
| 費用 | 目前不設付費功能 | 部署者自有 Cloudflare 用量 |
| 入口 | [mail.epocanvas.com](https://mail.epocanvas.com) | [部署指南](/zh-tw/mail/deployment/) |

## 2. 路徑 A：託管實例

1. **註冊帳號**：開啟 [mail.epocanvas.com](https://mail.epocanvas.com)，在登入頁切換到註冊表單，閱讀實例顯示的營運者資料、目前條款版本與[服務條款](/zh-tw/mail/terms-of-service/)，勾選未預選的「我接受服務條款」核取方塊後，提交「地址前綴 @ 實例網域」與密碼（6–30 位）。[隱私權政策](/zh-tw/mail/privacy-policy/)在此提供資料處理告知，不以一個核取方塊取得概括隱私同意；若必要法律告知或條款版本資料不完整，新註冊會關閉。此門檻只影響新註冊；既有登入與管理員初始化路徑仍可使用。註冊是否需要註冊碼、是否附帶人機校驗由實例設定決定；需要註冊碼時向營運者索取，或經 `?code=` 參數直達註冊表單。註冊即時生效，無需郵件驗證。
2. **核對身分分組**：註冊後進入實例設定的預設分組；使用註冊碼註冊時，進入該碼綁定的分組。分組決定每日寄信配額、信箱數、儲存配額與附件權限，出廠播種值見[運行模式](/zh-tw/mail/modes/)第 3 節。
3. **收第一封信**：註冊成功後查看歡迎郵件，並以您控制的外部信箱寄送合成測試內容，確認收件。驗證碼擷取不是預設啟用：須實例開啟 `verificationCodeEnabled` 並提供目前處理告知，且您主動開啟預設關閉的個人偏好。翻譯逐次確認目前告知；圖片 OCR 另需本次明確選擇與伺服器開關，公共翻譯備援預設關閉。見[設定指南](/zh-tw/mail/settings/#optional-processing)。
4. **寄第一封信**：點側欄「寫信」彈出寫信層。收件人為站內地址時直投秒達；站外地址經營運者設定的投遞通道寄送。出站量受每日寄信配額約束，計數每日重置。
5. **開啟自動整理**：出廠預置社群、訂閱、推銷、工作四個標籤，並按啟發式自動歸類新郵件；自建規則、例外與優先級見[標籤與分類管理](/zh-tw/mail/labels/)。
6. **開啟兩步驟驗證**：於「設定 → 安全」三步綁定驗證器應用程式（TOTP），完成即顯示 10 組一次性復原碼，請離線留存；步驟見[帳號安全設定指南](/zh-tw/mail/security/)。
7. **綁定 Telegram 推送**（可選）：以自備機器人即時接收新郵件推送，附 7 日有效的站內閱讀連結；步驟見[通知與轉寄指南](/zh-tw/mail/notify/)。
8. **匯出資料**（可選）：於「設定 → 資料」下載選定個人資料及未刪郵件欄位的 JSON；不含附件檔案、完整原始 MIME 或全部安全設定。垃圾桶依郵件建立時間超過 7 天清理，請在刪除前另存所需附件；見[資料匯出與儲存](/zh-tw/mail/data/)、[隱私權政策](/zh-tw/mail/privacy-policy/)、[資料處理與安全維護](/zh-tw/mail/data-security/)及[第三方處理者清單](/zh-tw/mail/sub-processors/)。

## 3. 路徑 B：自行部署

1. **核對前置條件**：一個網域、一個 Cloudflare 帳號、Node.js 與 pnpm 環境；站外寄信需 Resend 或 Mailjet 等投遞通道帳號。完整清單見[部署指南](/zh-tw/mail/deployment/)第 1 節。冷啟動前先完成 `temp_login_ui` 的 React 建構，再完成 `mail-vue` 的 Vue 建構；`mail-vue` 的建構腳本會將登入面複製到 Worker 靜態資產。
2. **部署**：於終端依序建構前端並部署 Worker（部署目標與自訂網域於 `wrangler.toml` 設定）：

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail
pnpm --dir mail-worker install --frozen-lockfile
node scripts/build-prod.mjs
```

3. **注入密鑰並部署**：由儲存庫根目錄執行 `pnpm --dir mail-worker exec wrangler secret put jwt_secret` 與 `pnpm --dir mail-worker exec wrangler secret put totp_enc_key`，另建議以相同方式設定獨立的 `init_secret`；完成後執行 `pnpm --dir mail-worker exec wrangler deploy`。密鑰經互動提示輸入，不寫入 URL、版本控制檔案或公開範例。
4. **初始化與設定告知**：透過 HTTPS 向 `/api/init` 發送 `POST`，在 `x-init-secret` 標頭提供 `init_secret`（未另設時回退為 `jwt_secret`），建立資料表、播種標準分組並初始化站長。若回應含初始密碼，私下保存並立即變更。登入管理介面後完成[營運者告知設定](/zh-tw/mail/settings/#operator-notice)，再開放註冊；缺少必填資料不阻擋站長初始化或既有登入。
5. **接通收件**：於 Cloudflare 面板啟用網域 Email Routing，將目標地址路由至 Worker，入站郵件即收即解析。
6. **接通寄件**：於系統設定設定投遞通道；未設定前，站內信箱之間仍可直投。
7. **收發核驗**：在隔離測試環境使用專門建立的帳號與合成資料，檢查註冊接受條款、歡迎郵件、站內互寄及站外收發；不可公開生產憑證。這些只是功能煙霧測試，不代表安全、隱私、刪除或法律準備全部完成，也不是可直接向真實使用者開放的證明。
8. **確認法律地位**：按實際決定處理目的與方式的情況評估角色，不因自行部署就當然成為唯一控管者。公布真實身分、所在地、聯絡資料與依法所需地址，核對接收者、有效契約、跨境安排與保存期限；範本或已填設定不能證明這些事實。見[開源與自行部署法律](/zh-tw/mail/open-source/)。

## 4. 上手之後

- 功能全景與逐介面操作：[功能指南](/zh-tw/mail/features/)、[介面與路由總覽](/zh-tw/mail/interface/)；
- 搜尋與自動化進階：[搜尋與規則參考](/zh-tw/mail/search/)、[標籤與分類管理](/zh-tw/mail/labels/)；
- 管理員設定與運行模式：[設定指南](/zh-tw/mail/settings/)、[運行模式](/zh-tw/mail/modes/)；
- 遇到問題時：支援渠道見[服務範圍與支援](/zh-tw/mail/service-scope/)第 4 節，服務邊界與保存期限見同頁第 2 節。
