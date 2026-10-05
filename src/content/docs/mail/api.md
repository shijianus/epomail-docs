---
title: 开放平台与 API 接入
description: EpoCanvas Mail 开放平台与 API 接入指南——OAuth 应用注册、授权端点、令牌置换、userinfo、scope 语义与用户授权撤销之完整开发者教程。
---

**生效日期：2026 年 10 月 5 日｜版本：5.15**

EpoCanvas Mail 内建 OAuth 2.0／OIDC 认证中心：管理员于管理区「应用管理」（`#manage/admin/oauth-apps`）注册第三方应用，外部站点即可让用户「使用 Epomail 登录」。本页是面向开发者的完整接入教程；应用管理界面的位置见[界面与路由总览](/mail/interface/)第 4 节，用户授权数据的处理见[第三方处理者清单](/mail/sub-processors/)。

![EpoCanvas Mail 应用管理页：四个端点条、开发接入教程按钮、示例应用卡片与集成代码入口](/images/mail/ui/ui-oauth-apps.png)

*图：应用管理页。页顶并列四个接入端点，应用卡片带凭据、启停开关与集成代码。*

## 1. 端点总览

| 端点 | 方法 | 用途 |
| --- | --- | --- |
| `/.well-known/openid-configuration` | GET | OIDC Discovery 元数据（issuer、端点与支持项自述） |
| `/oauth/authorize` | GET／POST | 用户授权端点：引导用户登录并同意授权 |
| `/api/oauth/token` | POST | 令牌置换端点：以授权码换取访问令牌 |
| `/api/oauth/userinfo` | GET | 用户资料端点：以访问令牌读取已授权资料 |

流程为标准授权码模式：授权码一次性且 5 分钟有效，换取的访问令牌（Bearer）与 ID Token 均为 2 小时有效，当前不签发 refresh token。

## 2. 管理端：注册与维护应用

「注册新应用」表单字段：

| 字段 | 说明 |
| --- | --- |
| 应用名称 | 授权页向用户展示的应用名 |
| 主页 URL | 应用主页；授权页可跳转核验 |
| 应用描述 | 授权页展示的用途说明 |
| 授权回调 URL | Redirect URI 白名单，多个以换行分隔；发起授权时的回调必须与白名单精确匹配 |
| 应用图标 URL（可选） | 授权页应用徽标 |
| 访问范围 | 缺省 `openid profile email`，可按需裁剪 |

- Client ID 以 `epo_live_`、Client Secret 以 `epo_sec_` 为前缀；Secret 仅在创建（或重置）时完整显示一次，离开弹窗不再可见，列表中恒为打码展示——GitHub 风格的一次性凭据交付；
- 「重置密钥」立即作废旧 Secret 并签发新 Secret，用于泄露应急处置；
- 每个应用可启用／停用、编辑与删除；停用后该应用无法发起新授权；
- 出厂示例应用 `shijianus-blog`（官方博客的原生集成）供参照，站长可随时删除或改为自接；
- 应用卡片的「集成代码」内置 NextAuth、Node、Python、cURL 与通用 OIDC 五套可复制的接入示例。

## 3. 接入流程（开发者视角）

1. 于管理端注册应用，取得 Client ID／Secret 并登记回调地址；
2. 将用户引导至 `https://<实例域名>/oauth/authorize?client_id=<id>&redirect_uri=<回调>&scope=openid profile email&state=<随机串>`；
3. 用户在授权页登录并同意：弹窗场景经 `postMessage` 回传授权结果，用户取消则回跳携带 `error=access_denied`；
4. 以授权码调用令牌端点置换令牌（支持 JSON、表单与 HTTP Basic 三种传参；配置了 PKCE 时校验 `code_verifier`（S256），否则校验 Client Secret）：

```bash
curl -X POST https://<实例域名>/api/oauth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"authorization_code","code":"<授权码>","redirect_uri":"<回调>","client_id":"<id>","client_secret":"<secret>"}'
```

5. 以 `Authorization: Bearer <access_token>` 调用 userinfo 读取用户资料；令牌过期或被撤销时返回 401。

## 4. scope 语义

| scope | 授权页说明 |
| --- | --- |
| `openid` | OpenID 身份标识：签发 ID Token，安全校验用户唯一凭证 |
| `email` | 主电子邮箱地址 |
| `profile` | 公开个人资料（公开昵称与头像） |
| `comments` | 博客评论与互动管理（示例应用使用，属互动权限） |
| `offline_access` | 长期登录保持；当前版本不签发 refresh token，授权页展示该 scope 不产生离线令牌 |

userinfo 返回字段：`sub`、`email`、`email_verified`、`name`、`preferred_username`、`picture`、`is_admin` 与 `role`。

## 5. 用户侧：授权与撤销

- 授权页向用户完整展示应用信息、官方认证徽章与所申请的 scope 清单；授权不会泄露用户的帐号密码或邮件正文；
- 用户随时可在「设置 → 资料」的「第三方应用和服务」逐应用移除访问权限，或经详情弹窗一键撤销全部授权；
- 撤销即时生效：该应用的现有令牌立即失效（userinfo 返回 401），授权记录从用户名下移除。

## 6. 个人 API 令牌（现状说明）

:::note
系统设置的「用户资料控制」卡提供「第三方 API 支援」开关，管理用户侧开发者访问能力。个人访问令牌（PAT）的签发与吊销接口已预置，但当前版本尚未开放通用的令牌鉴权端点；第三方读取用户资料请经上述 OAuth userinfo 流程。
:::

## 7. 相关文档

| 资源 | 链接 |
| --- | --- |
| 应用管理界面在整体路由中的位置 | [界面与路由总览](/mail/interface/) |
| 授权登录与第三方登录的运行行为 | [运行模式](/mail/modes/) |
| 第三方处理与传输的告知 | [第三方处理者清单](/mail/sub-processors/) |
| 部署自有实例后再接入 | [部署指南](/mail/deployment/) |
