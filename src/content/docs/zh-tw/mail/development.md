---
title: 開發指南
description: EpoCanvas Mail 開發指南——儲存庫結構、本地開發環境、測試與巡檢套件、六語言紀律、資料庫遷移紀律、五步工程流程與參與貢獻之完整說明。
---

**生效日期：2026 年 10 月 5 日｜版本：5.13**

本頁面向參與 EpoCanvas Mail 開發、稽核或二次開發的管理者與開發者，說明儲存庫結構、本地環境、品質保障體系與工程流程。部署運行的步驟見[部署指南](/zh-tw/mail/deployment/)；本頁不重複部署步驟。

## 1. 儲存庫結構

```text
epomail/
├── mail-vue/        前端：Vue 3 + Vite + Element Plus（介面、i18n 字典、PWA）
├── mail-worker/     後端：Cloudflare Worker（API、入站解析、AI 能力、D1/KV/R2）
├── temp_login_ui/   登入面：React 應用（構建時併入 mail-worker/dist/login）
├── tests/           自動化測試、公網端對端斷言與巡檢腳本
├── scripts/         工具腳本（i18n 稽核三件套、播種、構建輔助）
├── doc/             超長專項分析報告歸檔
├── EpomailDocs/     本文件站（獨立 git 儲存庫）
└── CHECKLIST.log / REPORTS.md   任務流水與專項稽核歸檔
```

## 2. 本地開發環境

```bash
pnpm install                      # 於儲存庫根安裝依賴
cd mail-vue && npm run dev        # 前端開發伺服器
cd mail-vue && npm run build      # 前端構建（交付門檻：零警告零報錯）
cd mail-worker && npx wrangler dev  # 後端本地全真堆疊（127.0.0.1:8787）
```

本地密鑰經 `mail-worker/.dev.vars` 承載（不入庫，範本見 `.dev.vars.example`）；清空 `.wrangler/state` 後存取 `/api/init/<jwt_secret>` 可從零播種完整示範資料，見[部署指南](/zh-tw/mail/deployment/)第 3 節。

## 3. 測試與巡檢

- `tests/` 目錄含逾百個自動化腳本：Playwright 全真堆疊瀏覽器回歸、生產環境公網端對端斷言、全倉靜態掃描與逐位元組完整性比對；
- 代表性量化核驗：安全強化 43／43 斷言、公網路由端對端 32／32、六語言登入面 62／62、生產完整性 369 項逐位元組比對；
- 涉及介面或 API 的改動須先構建（`vite build` 與 Worker 試編譯），再以本地全真堆疊實測；測試資料一律具備 `finally` 物理清理，資料庫與 KV 零假資料殘留。

## 4. 六語言紀律

介面與後端字典支援 zh、zh-Hant、en、es、fr、nl 六種語言，鍵集絕對對稱。新增或修改詞條後須通過靜態稽核三件套：

```bash
node scripts/i18n-symmetry.mjs      # 六語言鍵集絕對對稱
node scripts/i18n-audit.mjs         # 程式碼字面量引用零缺失
node scripts/i18n-hardcoded.mjs     # 使用者可見文字零未包裹硬編碼
```

系統郵件與歡迎郵件按收件人語言投遞；新增使用者可見文案一律經字典鍵引用，不得硬編碼。

## 5. 資料庫遷移紀律

- 資料表定義統一維護於後端初始化模組的 `CREATE TABLE` 原生定義；
- 欄位變更須同步撰寫升級函式（`vN_NDB`），以 `PRAGMA table_info` 條件檢查後執行 `ALTER TABLE ADD COLUMN`，保證冪等；
- 全新冷啟動僅憑 `/api/init/<jwt_secret>` 完成全部建表與六個標準角色的播種，遷移不得依賴手工 SQL。

## 6. 工程流程

開發遵循五步 SOP：

1. 範圍確認：明確介面、資料表、元件、字典與樣式的影響邊界；
2. 規範編碼：遵循既有架構，兼顧暗色模式與行動裝置适配、降級與缺省防禦；
3. 全真堆疊測試：構建核驗、回歸套件、瀏覽器實測與假資料清理；
4. 規範提交：結構化提交資訊；執行記錄按分流寫入 `CHECKLIST.log`（日常流水）或 `REPORTS.md`（專項稽核），制度文件本身不記流水；
5. 置頂彙報：對外輸出置頂完整 Commit Hash，保證版本可追溯。

## 7. 文件站開發

本文件站（EpomailDocs）為獨立 git 儲存庫，基於 Astro 5 與 Starlight，六語言結構逐篇對稱（以繁體中文為正式版本基準）：

```bash
pnpm build                          # 構建（含防竄改清單重生成）
node scripts/validate-anchors.cjs   # 全站錨點零斷鏈
python scripts/check-structure.py   # 六語言結構對稱校驗
python scripts/verify-laws.py       # 法條引用與核驗底稿一致
```

每次構建重新生成 `tamper-proof.json` 防竄改清單；文件改動的提交與其 Hash 固化分兩筆提交完成。

## 8. 參與貢獻

- 缺陷與功能建議經 GitHub 儲存庫的 Issue 與 Pull Request 提交（`github.com/shijianus/epomail`）；
- 貢獻程式碼遵循既有提交資訊規範，一併遵循本頁流程與測試門檻；
- 安全漏洞請勿公開揭露，經[總覽](/zh-tw/mail/overview/)第 5 節的聯絡窗口私下報告；
- 貢獻之授權與專案之授權條款見[開源與自行部署法律](/zh-tw/mail/open-source/)。

## 9. 相關文件

| 資源 | 連結 |
| --- | --- |
| 部署運行步驟 | [部署指南](/zh-tw/mail/deployment/) |
| 技術拓撲與安全設計 | [技術架構](/zh-tw/mail/architecture/) |
| 服務範圍與支援管道 | [服務範圍與支援](/zh-tw/mail/service-scope/) |
| 專案定位與提交鏈路 | [專案介紹](/zh-tw/mail/project/) |
