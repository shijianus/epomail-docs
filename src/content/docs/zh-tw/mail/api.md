---
title: 開放平台與 API 接入
description: EpoCanvas Mail 開放平台與 API 接入指南——OAuth 應用註冊、授權端點、權杖置換、userinfo、scope 語義與使用者授權撤銷之完整開發者教學。
---

**生效日期：2026 年 10 月 5 日｜版本：5.15**

EpoCanvas Mail 內建 OAuth 2.0／OIDC 認證中心：管理員於管理區「應用管理」（`#manage/admin/oauth-apps`）註冊第三方應用，外部站點即可讓使用者「使用 Epomail 登入」。本頁是面向開發者的完整接入教學；應用管理介面的位置見[介面與路由總覽](/zh-tw/mail/interface/)第 4 節，使用者授權資料的處理見[第三方處理者清單](/zh-tw/mail/sub-processors/)。

![EpoCanvas Mail 應用管理頁：四個端點條、開發接入教學按鈕、範例應用卡片與整合程式碼入口](/images/mail/ui/ui-oauth-apps.png)

*圖：應用管理頁。頁頂並列四個接入端點，應用卡片帶憑證、啟停開關與整合程式碼。*

## 1. 端點總覽

| 端點 | 方法 | 用途 |
| --- | --- | --- |
| `/.well-known/openid-configuration` | GET | OIDC Discovery 元資料（issuer、端點與支援項自述） |
| `/oauth/authorize` | GET／POST | 使用者授權端點：引導使用者登入並同意授權 |
| `/api/oauth/token` | POST | 權杖置換端點：以授權碼換取存取權杖 |
| `/api/oauth/userinfo` | GET | 使用者資料端點：以存取權杖讀取已授權資料 |

流程為標準授權碼模式：授權碼一次性且 5 分鐘有效，換取的存取權杖（Bearer）與 ID Token 均為 2 小時有效，目前不簽發 refresh token。

## 2. 管理端：註冊與維護應用

「註冊新應用」表單欄位：

| 欄位 | 說明 |
| --- | --- |
| 應用名稱 | 授權頁向使用者展示的應用名 |
| 主頁 URL | 應用主頁；授權頁可跳轉核驗 |
| 應用描述 | 授權頁展示的用途說明 |
| 授權回呼 URL | Redirect URI 白名單，多個以換行分隔；發起授權時的回呼必須與白名單精確匹配 |
| 應用圖示 URL（可選） | 授權頁應用徽標 |
| 存取範圍 | 預設 `openid profile email`，可按需裁剪 |

- Client ID 以 `epo_live_`、Client Secret 以 `epo_sec_` 為前綴；Secret 僅在建立（或重設）時完整顯示一次，離開彈窗不再可見，列表中恆為打碼展示——GitHub 風格的一次性憑證交付；
- 「重設密鑰」立即作廢舊 Secret 並簽發新 Secret，用於洩漏應急處置；
- 每個應用可啟用／停用、編輯與刪除；停用後該應用無法發起新授權；
- 出廠範例應用 `shijianus-blog`（官方部落格的原生整合）供參照，站長可隨時刪除或改為自接；
- 應用卡片的「整合程式碼」內建 NextAuth、Node、Python、cURL 與通用 OIDC 五套可複製的接入範例。

## 3. 接入流程（開發者視角）

1. 於管理端註冊應用，取得 Client ID／Secret 並登記回呼地址；
2. 將使用者引導至 `https://<實例網域>/oauth/authorize?client_id=<id>&redirect_uri=<回呼>&scope=openid profile email&state=<隨機串>`；
3. 使用者在授權頁登入並同意：彈窗情境經 `postMessage` 回傳授權結果，使用者取消則回跳攜帶 `error=access_denied`；
4. 以授權碼呼叫權杖端點置換權杖（支援 JSON、表單與 HTTP Basic 三種傳參；配置了 PKCE 時校驗 `code_verifier`（S256），否則校驗 Client Secret）：

```bash
curl -X POST https://<實例網域>/api/oauth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"authorization_code","code":"<授權碼>","redirect_uri":"<回呼>","client_id":"<id>","client_secret":"<secret>"}'
```

5. 以 `Authorization: Bearer <access_token>` 呼叫 userinfo 讀取使用者資料；權杖過期或被撤銷時回傳 401。

## 4. scope 語義

| scope | 授權頁說明 |
| --- | --- |
| `openid` | OpenID 身分標識：簽發 ID Token，安全校驗使用者唯一憑證 |
| `email` | 主電子信箱地址 |
| `profile` | 公開個人資料（公開暱稱與頭像） |
| `comments` | 部落格留言與互動管理（範例應用使用，屬互動權限） |
| `offline_access` | 長期登入保持；目前版本不簽發 refresh token，授權頁展示該 scope 不產生離線權杖 |

userinfo 回傳欄位：`sub`、`email`、`email_verified`、`name`、`preferred_username`、`picture`、`is_admin` 與 `role`。

## 5. 使用者側：授權與撤銷

- 授權頁向使用者完整展示應用資訊、官方認證徽章與所申請的 scope 清單；授權不會洩漏使用者的帳號通關密語或郵件正文；
- 使用者隨時可在「設定 → 資料」的「第三方應用和服務」逐應用移除存取權限，或經詳情彈窗一鍵撤銷全部授權；
- 撤銷即時生效：該應用的現有權杖立即失效（userinfo 回傳 401），授權記錄從使用者名下移除。

## 6. 個人 API 權杖（現況說明）

:::note
系統設定的「使用者資料控制」卡提供「第三方 API 支援」開關，管理使用者側開發者存取能力。個人存取權杖（PAT）的簽發與吊銷介面已預置，但目前版本尚未開放通用的權杖鑑別端點；第三方讀取使用者資料請經上述 OAuth userinfo 流程。
:::

## 7. 相關文件

| 資源 | 連結 |
| --- | --- |
| 應用管理介面在整體路由中的位置 | [介面與路由總覽](/zh-tw/mail/interface/) |
| 授權登入與第三方登入的運行行為 | [運行模式](/zh-tw/mail/modes/) |
| 第三方處理與傳輸的告知 | [第三方處理者清單](/zh-tw/mail/sub-processors/) |
| 部署自有實例後再接入 | [部署指南](/zh-tw/mail/deployment/) |
