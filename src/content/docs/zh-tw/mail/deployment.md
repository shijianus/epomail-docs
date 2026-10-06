---
title: 部署指南
description: EpoCanvas Mail 部署指南——前置條件、三步部署、初始化與引導鏈、密鑰注入、郵件收發配置、儲存選型、示範實例與升級回滾之完整說明。
---

**生效日期：2026 年 10 月 5 日｜版本：5.16**

本頁面向準備自行部署 EpoCanvas Mail 的使用者與管理員，說明從零到可用實例的完整路徑。部署完成後，實例的全部資料落於部署者自己的 Cloudflare 資源內；部署者隨之成為其使用者的資料控制者，相關法律地位見[開源與自行部署法律](/zh-tw/mail/open-source/)。託管實例（[mail.epocanvas.com](https://mail.epocanvas.com)）的註冊使用無需本頁步驟。

![EpoCanvas Mail 系統架構：客戶端經 Cloudflare 邊緣接入，Workers 承載 API 與郵件處理，資料落於雙 D1、KV 與物件儲存](/images/mail/zh-tw/project-architecture.svg)

*圖：部署完成後的運行拓撲。無單點伺服器，全部組件運行於 Cloudflare 按量額度之內。*

## 1. 前置條件

| 類別 | 要求 |
| --- | --- |
| 必需 | 一個網域；一個 Cloudflare 帳號；Node.js 與 pnpm 執行環境 |
| 對外郵件 | Resend 或 Mailjet 等投遞通道帳號（寄往站外必需） |
| 收信 | Cloudflare Email Routing（啟用網域郵件路由即可） |
| 可選 | Backblaze B2 或 S3 自備儲存、Turso 第三方資料庫、Telegram 機器人、Turnstile 人機驗證、AI 提供者密鑰 |

## 2. 三步部署

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

前端構建會將登入面一併併入 Worker 的靜態資產，單次部署即得完整站點；部署目標與自訂網域於 `wrangler.toml` 配置。

## 3. 初始化與引導鏈

首次部署後存取 `/api/init/<jwt_secret>`（以部署者設定的密鑰值替換路徑參數）。該入口完成：全部資料表的建立、六個標準身分分組（參觀者、普通使用者、普通使用者 LV.0、普通使用者 LV.1、協管者、站長）的播種與主站長帳號的初始化。

- 引導鏈為冪等設計：升級函式以 `PRAGMA table_info` 條件檢查欄位後執行 `ALTER TABLE`，重複存取不產生副作用；
- 清空本地 `.wrangler/state` 冷啟動後，僅憑該入口即可端到端完成全部播種，無需手工執行任何 SQL。

## 4. 密鑰體系

| 密鑰 | 生產注入 | 本地開發 |
| --- | --- | --- |
| `jwt_secret`（工作階段簽章） | `npx wrangler secret put jwt_secret` | `.dev.vars` 檔案 |
| `totp_enc_key`（兩步驗證密鑰加密） | `npx wrangler secret put totp_enc_key` | `.dev.vars` 檔案 |

- `.dev.vars` 已被 `.gitignore` 排除，不入庫；入庫範本維護於 `.dev.vars.example`；
- 嚴禁將任何生產密鑰明文寫入 `wrangler.toml` 等納入版本控制的檔案；
- 初始化路徑中的 `jwt_secret` 即工作階段簽章密鑰，二者應保持一致。

## 5. 郵件收發與系統郵件

- 收信：於 Cloudflare 面板啟用網域 Email Routing，將目標地址路由至 Worker，即收即解析；
- 寄信：於系統設定配置投遞通道（如 Resend）後，站外信件經該通道寄送；未配置時僅可站內直投；
- 系統郵件（歡迎郵件、安全通知、公告郵件）由內建範本按收件人語言渲染：歡迎郵件內的「進入收件箱」等按鈕為站內相對路徑，其在郵件用戶端內的落點取決於用戶端對相對連結的處理；安全通知類使用實例網域的絕對連結。自部署者可經範本常數自訂文案與寄件署名，官方郵件的投遞語義見[防竄改與官方規範](/zh-tw/mail/tamper-proof/)。

## 6. 儲存與資料庫選型

| 元件 | 預設 | 可選替代 |
| --- | --- | --- |
| 使用者庫與郵件庫 | Cloudflare D1 雙庫物理隔離（單庫部署 100% 向下相容） | Turso 等第三方資料庫（系統設定配置） |
| 附件與物件 | Cloudflare R2 | Backblaze B2 或 S3 自備儲存桶 |
| 快取 | Workers KV | — |

儲存層級與配額計量的技術細節見[技術架構](/zh-tw/mail/architecture/)；個人可另接入自備儲存，接入後附件直接落其雲端，見[設定指南](/zh-tw/mail/settings/)第 5 節。

## 7. 示範實例

本地演練可運行不對外開放的示範堆疊：`mail-worker` 以 `wrangler dev` 啟動後，經倉庫提供的示範播種腳本寫入示範郵件與多帳號狀態。示範資料僅存本地 `.wrangler/state`（已被 `.gitignore` 排除），不入庫亦不進生產；本站產品截圖即取自該示範實例的真實運行畫面。

## 8. 升級與回滾

- 升級：`git pull` 拉取最新程式碼 → 重建前端 → `wrangler deploy`；資料遷移隨引導鏈冪等執行，可安全重複；
- 版本核對：系統設定「關於」配置卡提供實例版本與更新檢查；
- 回滾：經 Cloudflare Workers 的部署版本歷史即時回退，或以舊提交重新部署。

## 9. 相關文件

| 資源 | 連結 |
| --- | --- |
| 初始化後的運行形態與角色配額 | [運行模式](/zh-tw/mail/modes/) |
| 開發環境、測試套件與工程規範 | [開發指南](/zh-tw/mail/development/) |
| 實例級配置的逐項導覽 | [設定指南](/zh-tw/mail/settings/) |
| 部署者的法律地位與授權條款 | [開源與自行部署法律](/zh-tw/mail/open-source/) |
| 技術拓撲與加密體系 | [技術架構](/zh-tw/mail/architecture/) |
