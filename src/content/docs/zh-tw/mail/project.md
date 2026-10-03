---
title: EpoCanvas Mail 專案介紹
description: EpoCanvas Mail 專案完整介紹——定位、核心功能、技術架構、安全設計、開發歷程與完整提交鏈路。
---

**首次提交：2026 年 7 月 21 日｜當前版本：v1.1.0｜授權條款：MIT**

**生效日期：2026 年 10 月 4 日｜版本：5.10**

EpoCanvas Mail 是一套運行於 Cloudflare 邊緣網路的開源電子郵件服務。使用者僅需一個網域與一個 Cloudflare 帳號，即可搭建支援收發郵件、附件與多終端存取的專屬信箱。專案以託管實例 [mail.epocanvas.com](https://mail.epocanvas.com) 對外營運，同時開放全部原始碼供自行部署，並提供配套的 Android 行動應用（epomail）。本頁說明專案的定位、功能、技術架構、安全設計與開發歷程；服務與隱私的法律約定見[隱私權與條款總覽](/zh-tw/mail/overview/)。

本站法律文件以繁體中文（臺灣）版本為正式版本，其餘語言版本為對照譯本，文義有疑義時以正式版本為準。本站法律與技術文件以本服務開放原始碼實作為準，旨在建立透明、嚴謹之非商業社群通訊規範。

![EpoCanvas Mail 系統架構：用戶端層（Web 應用、Android 應用、OAuth 第三方應用）經 Cloudflare 邊緣接入；Workers 承載 API、郵件入站解析與 AI 能力，出站經 Resend 與 Telegram；資料落於雙 D1 資料庫、KV 與物件儲存](/images/mail/zh-tw/project-architecture.svg)

*圖：系統架構。用戶端經邊緣接入，無單點伺服器；入站郵件由 Email Routing 接收並解析，出站經 Resend 通道；全部狀態落於部署者自己的 Cloudflare 資源之內。*

## 1. 專案定位

自建郵件系統需要長期維護的伺服器、固定 IP 與反垃圾郵件治理；商業信箱服務則將資料集中於服務商手中，使用者難以核實其處理方式。EpoCanvas Mail 採用第三種路徑：把整套服務壓縮進 Cloudflare 的按量額度之內（Workers 運算、D1 資料庫、KV 快取、R2 物件儲存），以無伺服器方式交付，固定伺服器成本為零，原始碼全部公開。

- 免維運：部署完成後無需維護作業系統與憑證，擴容與全球加速由 Cloudflare 託管；
- 資料自主：自行部署實例的全部資料落於部署者自己的 D1 與物件儲存，程式碼不內建任何遙測回傳；
- 雙軌使用：直接註冊使用託管實例，或取得原始碼部署於自有網域。兩種形態下的資料控管者界定見[總覽](/zh-tw/mail/overview/)第 2 節。

## 2. 核心功能概覽

本專案功能橫跨收發、整理、檢索、自動化與開放平台，逐項說明與真實執行介面截圖見[功能指南](/zh-tw/mail/features/)。要點：Cloudflare Email Routing 入站與多通道出站；八視圖收件匣、會話執行緒與三欄分割；進階搜尋語法與分類規則引擎；Workers AI 驗證碼提取與保留排版的全文翻譯；OAuth 2.0／OIDC 認證中心與個人 API 權杖；資料匯出（JSON 與 .eml）。

## 3. 技術架構概覽

伺服端運行於 Cloudflare Workers（V8 Isolate 無狀態沙箱），資料落於雙 D1 物理隔離（使用者庫與郵件庫，單庫部署 100% 向後相容）、KV 與物件儲存（自備 S3、設定 S3、R2、KV 四級解析）；入站經 Email Routing，出站經 Resend／Mailjet 等通道，AI 能力由 Workers AI 承載。完整拓撲、加密體系、角色配額與郵件生命週期見[技術架構](/zh-tw/mail/architecture/)。

## 4. 適合誰與不適合誰

下列情形適合選用本專案：

- 已持有網域與 Cloudflare 帳號，希望以零固定伺服器成本運行個人或小團隊信箱者；
- 希望原始碼可稽核、資料全程落於自己帳號內之自行部署使用者；
- 需要多信箱隔離、自動分類與驗證碼即時擷取以處理註冊郵件的個人使用者。

下列情形應評估替代方案：

- 需要承諾可用率、正式技術支援或長期歸檔留存之企業場景：本服務不承諾服務水準協議，垃圾桶郵件自收受之日起 7 日實體刪除（見[服務條款](/zh-tw/mail/terms-of-service/)第 8 節）；
- 以大量外寄行銷為主要用途者：可接受使用政策禁止未經請求之大量商業郵件（見[可接受使用政策](/zh-tw/mail/acceptable-use/)第 3 節）；
- 需要端對端加密之通信者：本服務之加密為伺服器端靜態加密且不涵蓋附件（見[資料處理與安全維護](/zh-tw/mail/data-security/)第 3 節）；
- 無意願維護 Cloudflare 資源、網域與金鑰配置者：自行部署仍需完成金鑰注入與初始化（見第 8 節）。

## 5. 安全設計概覽

密碼經 PBKDF2-HMAC-SHA256（100,000 次迭代）加鹽雜湊，TOTP 金鑰以 AES-256-GCM 靜態加密；郵件 URL 採用 HMAC-SHA256 簽章之 20 位隨機 Hash 防越權與防枚舉；XSS 三重防禦與 SSRF 阻斷；官方郵件不可變快照投遞。上述措施於 2026 年 9 月 22 日全量安全加固中閉環（43 項自動化斷言全綠）；完整清單見[技術架構](/zh-tw/mail/architecture/)第 7 節，面向個人之告知與保存期限見[資料處理與安全維護](/zh-tw/mail/data-security/)。

## 6. 開發歷程與提交鏈路

專案自 2026 年 7 月 21 日首次提交（`2bbb582`）起持續開發。截至 2026 年 10 月 4 日，主儲存庫累計逾 560 個提交；本站（EpomailDocs，獨立 git 儲存庫）另有逾 45 個提交（下列鏈路為里程碑粒度，其間與之後的提交見 GitHub）。下表按階段列出里程碑與錨點提交（短 Hash）：

| 階段 | 時間 | 交付內容 | 錨點提交 |
| --- | --- | --- | --- |
| 1. 專案奠基 | 2026-07-21 → 07-23 | 儲存庫初始化；Vue 3 介面第一階段（全域色板、字體、明暗側欄）；Outlook 風格三欄分割畫面閱讀 | `2bbb582` `29f9896` `a531341` |
| 2. 品牌與登入面 | 2026-08-05 → 08-09 | 透明 Logo 與 favicon 統一；預設暗色主題與品牌載入動畫；React 登入面與太空躍遷動畫 | `6572695` `e3e57c6` |
| 3. 原型落地與規則引擎 | 2026-08-12 → 08-17 | 原型介面全量應用；標籤體系與後端同步；延後／垃圾郵件／垃圾桶；分類規則引擎（預設範本、啟發式、黑白名單硬攔截）；進階搜尋語法；分類分析儀表板；防爆破鎖定 | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. 編輯器與歡迎郵件 | 2026-08-28 → 08-30 | 全員歡迎郵件大彈窗；TinyMCE Alloy 工具列 17 項 Markdown 工具重構 | `9f6ece8` `59bfe60` |
| 5. 開放平台與儲存治理 | 2026-09-03 → 09-06 | OAuth 2.0／OIDC 認證中心；雙 D1 物理隔離；B2／S3 自備儲存與配額計量；儲存與核心資料庫管理中心；6 大核心管理群組權限與參觀者沙箱 | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. AI 能力體系 | 2026-09-06 → 09-13 | Gmail 收件架構與 AI 全文翻譯；300+ 離線向量圖示；AI Hub 多模型池與 0-Token 測速；多片並發翻譯與圖片 OCR 字幕 | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. 權限收斂與安全修復 | 2026-09-09 → 09-11 | GitHub Release v1.1.0；跨網域提權零日修復；多網域管理員登入；第三方應用與資料共享面板 | `7558fc8` `5855db1` `3234d69` |
| 8. 六語言國際化 | 2026-09-14 → 09-17 | 全專案六語言與零洩漏字典；郵件範本按收件人語言投遞；全量推送 GitHub；生產 Cloudflare 正式上線 | `aa1955e` `42c33f1` `25985b1` |
| 9. 兩步驟驗證與稽核強化 | 2026-09-18 → 09-22 | TOTP／Passkey 登入；全新部署引導鏈與密鑰隔離；UI 全面稽核修復批次；全量安全強化 | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Gmail 級體驗對齊 | 2026-09-25 → 09-27 | 郵件詳情排版分層；內嵌回覆與表情回應；會話群組優化；Gmail 式路由與深層連結；密碼學雜湊防越權路由 | `a8d841a` `4af2985` `4b371a8` |
| 11. 法律文件站 | 2026-09-27 → 09-29 | 本站六語言七篇法律文件；Google 政策範式增補；Astro 5 + Starlight 站點化；獨立 git 儲存庫 | `2bed02b` `617cccf` |
| 12. 定稿與上線稽核 | 2026-09-29 → 09-30 | 專案介紹頁與官方隱私政策整合；v5.0 去條號立場全量改寫；上線前技術事實校準與第三方清單增補 | `7ad5ebc` `05c222c` `5197f50` |
| 13. 文件站持續營運 | 2026-10-01 → 10-04 | 本地示範實例與播種工具；v5.8 視覺與入口打磨；v5.9 功能指南／技術架構擴充（×6 語言）與真實產品截圖；v5.9 獨立稽核全量對碼 | `26f6c3b` `8a60539` |

主儲存庫的完整里程碑錨點鏈（40 位全量 Hash，可於 GitHub 提交歷史逐條核驗）：

```text
2bbb582e19b8a1aca410767a5b5c52ae5d7f4423  2026-07-21  init: initial commit before UI/UX updates
29f98962399ec85c894fbc02ff6ef69d7d496222  2026-07-23  feat(ui): implement 3-column split view layout for mail reading
65726950939d72d82dbaccd974ff1a75ffe1b226  2026-08-06  feat: default dark theme & apply brand loading animation
e3e57c69a6154bc13218be27a6537711e0a21527  2026-08-09  Enhance: Upgrade collision warning to a high-tech sci-fi HUD
8664f84cce7d2fdb038322f8bf66c5189f93f33d  2026-08-12  Phase 1: Refactor UI/UX colors and layout to match prototype style
803b0e05d2d55bbcbb3b0f4d4279524c31524c21  2026-08-13  feat: implement advanced search syntax and highlighting
0b7e37d953e2a25ff74dcf313272632fb60ba9c8  2026-08-13  fix(labels): ensureDefaultRules injection + system rule lock UI + real heuristic engine
643edea268fb8dc4f67b4bfe17db49025f6c7662  2026-08-15  feat(ui): phase 3 - classification management analytics dashboard
79f200fcb1a401e08c4d89ff94b8c3a65b51aef0  2026-08-16  feat: enhance login UX with toast and 12h anti-brute force lockout
9fd02b75dcaa31e1c12c2424b3b9c52b19eab203  2026-09-03  feat(oauth): 管理员专属 OAuth 开放平台与应用管理独立分区上线及个人资料解耦清退
2cc2801ccec3d9ee07d5b1688f2af652d7dc25a2  2026-09-03  feat(db): introduce dual-db physical isolation architecture with 100% single-db backward compatibility
b1a6a0ebe02a5bb196bf5da601a182f022ab1664  2026-09-03  feat(storage): implement Backblaze B2 and S3 object storage with pure WebCrypto SigV4 presigner
6c5bda2b794fef6f9467a5d880ae2fede77824cd  2026-09-04  feat(db): 系统设置「存储与核心数据库」管理中心上线与第三方DB配置体系全量重构
f09c963752e731d3e308893fa6ed09d1212713e8  2026-09-06  feat(role): 细化6大核心管理组权限控制规范、开源参观者沙箱交互、博客等级联动与UI架构透视全景上线
deceaaa5b3e7589c63c2240df97b020bab5c2c14  2026-09-06  feat(content): 学习Gmail收件UI架构，升级to-me详情卡片、顶部操作栏与AI全文翻译及管理面板API密钥集成
56768378f4d83b9eb70e65376930cfa16db16209  2026-09-07  feat(icons): 系统级全量300+离线矢量图标重构、零网络请求秒开与满Icon状态闭环
d103cd4edd4fbedbeaec669fc068bed2c5648dfa  2026-09-08  feat(ai-hub): automated dropdown model detection, multi-model pool role hierarchy, and real prompt live test response
aa1955eeb1b564f11a370892c48ea94f7c21015f  2026-09-14  feat: 全专案主流多语言支持(正体中文/法/西/荷)、多语言欢迎邮件、网站公告全域公告邮件
25985b1d0ca1c71e59222a3ecb3a9c53532834ef  2026-09-17  fix(prod): 生产环境Cloudflare正式上线、Playwright真机视觉全链路核验、Vue-i18n转义与抽屉缺陷修复
b0251537e0a56b7d3b80f794ce79ff839871f945  2026-09-18  feat(auth): 登录界面两步验证 (TOTP/Passkey) 流体动效与丝滑交互重构
5cfdaf910bd628d183f0b6d102134d1042f2e7df  2026-09-19  fix(core): 三大核验缺陷全量修复、全新部署引导链重构与密钥安全体系隔离
7ee3a66d5fb17c44983ff2b7f35534d82c815524  2026-09-22  fix(security): 全量安全加固与漏洞闭环——P0/P1/P2防护/SSRF阻断/XSS三重防御/会话脱敏/权限对齐
a8d841a13c3a0aa31b72c1d82580f2e9c7a1e561  2026-09-25  feat(ui): 对齐 Gmail 邮件详情排版分层与悬浮快捷回复体验
4b371a834458cb2be6ab5766ec15e99a91bc2022  2026-09-27  feat(routing): 严格对齐 Gmail 多账户隔离与密码学 Hash 防越权路由架构
617cccf855a0bd9a0a46d37deaceacc4a8b0ddde  2026-09-29  docs(repo): EpomailDocs 独立为专用 git 仓库，自父仓库解除追踪
4cf8014279669dbc67ff54ceb47239044c943ac8  2026-10-03  docs(checklist): 归档 EpomailDocs v5.8 视觉与入口打磨轮流水（EpomailDocs a1c1e89——翻页卡图标/表格居中/Accept-Language 协商）
8a60539d318eef618b84aa0db4e8a88672c4940d  2026-10-04  docs(checklist): 归档 EpomailDocs v5.9 专案文档拆分扩充轮流水（EpomailDocs beb956a——功能指南/技术架构两新页×6 语言、真实产品截图、内容栏居中根治、本地演示实例）
26f6c3b9750b2bad1c60f35a9a08b4db11dc1a6b  2026-10-04  feat(demo): 本地演示实例播种工具——seed-demo.py 演示邮件生成器与 wrangler-demo.toml 本地配置忽略
33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查
```

本站（EpomailDocs 獨立儲存庫）的提交鏈路：

```text
fd57a71ab71d99ff61b83a9a7c4f4b191dd96b99  2026-09-28  feat: initial commit for epomail-docs with open-source and legal compliance documentation
5208abc054626e305a5caac3e7320219706e3785  2026-09-29  docs(legal): 法律文档站 v4.1——台湾法域全量定稿（6 语言 × 7 篇 × 42 页）
5fb18df6a9c317bf064b477d143a53eb0d54bf07  2026-09-29  docs(visual)+chore: aup-ladder.svg 布局重构消除遮挡，视觉验收与归档流水
270cfd12c365b406661b5f40219740547d2b7d99  2026-09-29  fix(site): 补全根路径跳转页，/ 404 → 六语言总览入口
7ad5ebc1bc3b2846d0932c872ef7666b0d07d6bb  2026-09-29  docs(project): 新增六语言专案介绍页——定位、功能、架构、安全与完整提交链路
5cc2b2f12d00f195d0e84cea34911f1b3390ce6b  2026-09-28  feat(legal): integrate official privacy policy and technical baseline spec
d7beca35a2db489e75ff865435f95f20e68fd27f  2026-09-28  docs(audit): enrich architecture & legal compliance per subagent audits
d3d1d309888f92e7c30c217c13a4f5b02781202b  2026-09-29  docs(repo): 采纳远端旧结构文档线为历史祖先，树以本地六语言法律文档站为准
05c222c4ff2531dc17b29994c0806ade1ed99ed0  2026-09-29  docs(legal): 法律文档站 v5.0——全站去条号引用，六语言 × 7 篇 × SVG 配图全量同步
52412e393613a8b2763d133a95f6a3205e8cb6ce  2026-09-30  docs(legal): v5.1 独立审计修订——第三方清单增补博客等级联动披露、时效数据校正与工具补盲
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): 上线前审计修订——系统邮件不可变投递事实校准、AI 翻译预置模板披露、robots.txt
79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 内容完善——正式版本条款全站覆盖、专案介绍增补适用边界与常见疑问
90c06edcdd29a90a991bd56ba480c031cf85a9cf  2026-09-30  docs(legal): v5.3——独立复审缺陷治理与发布链路定案（docs.epocanvas.com/epomail）
6da475e6a7bd1f892e00165031ad94d5bacdb872  2026-10-01  docs(legal): v5.4 内容完整性补齐——配图全覆盖、术语补定义、保留期缺项与引用精度
3223e7d6181a6b82192f225eaded3ed8ddab0a56  2026-10-01  feat(legal): integrate official mail specifications and complete anti-tampering verification engine
e6eb758709b6702b3b51fddb1057bee94380a3e7  2026-10-03  docs(legal): v5.7 全站去幻觉与六语言深度整合——源码事实校准、en 九篇 1:1 重译、配图扁平化重绘
c5de61f5e1330726fe31257588ee21fdec178d8e  2026-10-03  feat(figures): 十二张原理图全量六语言本地化——每种语言的文档配该语言的图
fcc1d10f9616b905e1c6b89ccb4e6f8ac953c476  2026-10-03  docs(legal): v5.8 独立复审打磨——P1/P2 全项治理、八项补章、全站单 h1 与首次公网发布
a1c1e89c4e8b85579346304df3d5b37d197b68db  2026-10-03  feat(ui)+feat(infra): v5.8 视觉与入口打磨——翻页卡文档图标、表格居中与 Accept-Language 入口协商
beb956a1b50b5c4b94d3bbc9b9feba8ef774417a  2026-10-03  feat(docs): v5.9 专案文档拆分扩充——功能指南/技术架构两新页 ×6 语言 + 真实产品截图 + 内容栏居中
e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a
```

上表與上方錨點鏈為里程碑粒度；階段之間的全部日常修復、測試與文件提交均保存於 git 歷史，可經 [GitHub 提交歷史](https://github.com/shijianus/epomail/commits)逐條追溯。主儲存庫另設 `CHECKLIST.log`（任務執行流水）與 `REPORTS.md`（專項稽核報告）兩份歸檔，與提交一一對應。

## 7. 品質保障

- `tests/` 目錄含 逾百個自動化測試、稽核與巡檢腳本，覆蓋 Playwright 全真環境瀏覽器回歸、生產環境公網端對端斷言與全庫靜態掃描；
- 代表性量化核驗：安全強化 43／43 斷言、公網路由端對端 32／32、六語言登入面 62／62、感官巡檢 33／33、生產完整性 369 項逐位元組比對；
- 多語言靜態稽核三件套：`i18n-symmetry`（六語言鍵集絕對對稱）、`i18n-audit`（字面量引用零缺失）、`i18n-hardcoded`（用戶可見文字零未包裹硬編碼）；
- 測試資料零殘留：所有用例具備 `finally` 物理清理機制，資料庫與 KV 無假資料；
- 開發流程遵循五步 SOP（範圍確認、規範編碼、全真環境測試、規範提交、置頂匯報），產出分流至 `CHECKLIST.log` 與 `REPORTS.md`。

## 8. 取得與部署

| 途徑 | 說明 |
| --- | --- |
| 託管實例 | [mail.epocanvas.com](https://mail.epocanvas.com) 註冊即用 |
| 自行部署 | 依下方三步部署於自有網域與 Cloudflare 帳號 |
| 原始碼 | [github.com/shijianus/epomail](https://github.com/shijianus/epomail)（MIT 授權條款） |
| 行動應用 | Android 應用 epomail |

自行部署最小步驟：

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

首次部署後存取 `/api/init/<jwt_secret>` 完成資料庫初始化與六個標準角色的播種；生產密鑰一律經 `npx wrangler secret put` 注入，本地開發使用 `.dev.vars`（不入庫）。

## 9. 常見疑問

**使用本服務需要付費嗎？**
軟體依 MIT 授權條款免費取用；自行部署之成本為部署者自有之 Cloudflare 用量。託管實例目前不設付費功能，信箱數量、寄信量與儲存配額依帳號角色設定。

**管理員能看到我的郵件嗎？**
取決於實例採用之郵件模式：全部郵件模式下管理員得讀取全部郵件；隱私模式下僅限垃圾、已刪除與無主郵件；加密模式下管理介面不回傳使用者郵件。詳見[隱私權政策](/zh-tw/mail/privacy-policy/)第 10 節之加密範圍說明。

**刪除的郵件還能復原嗎？**
垃圾桶郵件自收受之日起 7 日後由系統實體刪除，不可復原；需要留存者請先以「設定 → 資料匯出」取得完整副本（見[隱私權政策](/zh-tw/mail/privacy-policy/)第 8 節）。

**自行部署需要哪些準備？**
一個網域與一個 Cloudflare 帳號；部署步驟與金鑰注入見第 8 節。全部資料落於部署者自己之 Cloudflare 資源內，程式碼不內建任何遙測回傳。

## 10. 相關文件

| 資源 | 連結 |
| --- | --- |
| 隱私權與條款總覽 | [總覽](/zh-tw/mail/overview/) |
| 隱私權政策 | [隱私權政策](/zh-tw/mail/privacy-policy/) |
| 服務條款 | [服務條款](/zh-tw/mail/terms-of-service/) |
| 可接受使用政策 | [可接受使用政策](/zh-tw/mail/acceptable-use/) |
| 資料處理與安全維護 | [資料處理與安全維護](/zh-tw/mail/data-security/) |
| 第三方處理者清單 | [第三方處理者清單](/zh-tw/mail/sub-processors/) |
| 用語定義 | [用語定義](/zh-tw/mail/key-terms/) |
