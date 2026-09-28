---
title: 邮件发信渠道与配额控制
description: 深入配置 Resend 发信服务、Cloudflare Send Email 原生接口与外部 SMTP 中继，设置多租户单日发信配额与突发限流熔断。
---

## 📤 多渠道发信架构

EpoMail 支持可插拔的多发信网关架构。发信引擎根据管理员配置的优先级，在保证极高到达率的前提下实现自动故障转移：

```
                ┌──────────────────────────────┐
                │     EpoMail 发信调度器       │
                └──────────────┬───────────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
【渠道 1：Resend (首选)】   【渠道 2：Cloudflare Email】  【渠道 3：自定义 SMTP】
• 极高送达率与公网白名单    • 纯原生 Cloudflare 绑定     • 适用于企业既有中继服务器
• 丰富的投递状态 Webhook    • 零额外第三方依赖          • 支持自建 Haraka / Postfix
• 免费额度 3,000封/月       • 适合站内信与内部通知      • 支持密码 / SSL / TLS
```

---

## 🚀 渠道 1：集成 Resend 发信 (推荐)

[Resend](https://resend.com/) 是现代开发者首选的邮件投递服务商，具备极高信誉度的发信 IP 池。

### 1. 获取 API 密钥与添加域名
1. 注册并在 Resend 控制台添加您的发信域名（如 `mybrand.com`）；
2. 按照 Resend 提示在 Cloudflare DNS 中配置 3 条 DKIM CNAME 记录并完成校验；
3. 创建一个具有「Sending access」权限的 API Key（形如 `re_123456789...`）。

### 2. 在 EpoMail 中注入密钥
在 `mail-worker` 目录下执行安全注入：
```bash
npx wrangler secret put resend_api_key
# 粘贴您的 Resend API Key
```
无需重启，Worker 即可自动捕获发信密钥并激活 Resend 投递通道。

---

## ⚡ 渠道 2：Cloudflare Send Email 原生绑定

如果您不想注册任何第三方发信服务商，可以直接利用 Cloudflare 原生提供的 `send_email` 发信绑定（目前处于公测阶段）：

1. 打开 `mail-worker/wrangler.toml`；
2. 取消 `[[send_email]]` 的注释：
   ```toml
   [[send_email]]
   name = "email"
   ```
3. 在 Cloudflare Dashboard 的 Email Routing 设置中将目标域名加入批准发件人名单；
4. 部署后，系统将优先调用 Cloudflare 原生 API 进行出站投递。

---

## ⚙️ 渠道 3：外部标准 SMTP 网关中继

对于拥有企业自建中继服务器或 AWS SES / SendGrid 账户的用户，EpoMail 支持标准 SMTP 协议中继：

在管理后台「系统设置 ➡️ 发信配置」中填入：
- **SMTP 主机 (Host)**：例如 `smtp.sendgrid.net` 或 `email-smtp.us-east-1.amazonaws.com`
- **端口 (Port)**：`465` (SSL) 或 `587` (STARTTLS)
- **发信身份 (Username / Password)**：对应服务商提供的授权账号与密匙
- **连接超时时间**：默认 `10000ms`

---

## 🛑 多租户发信配额与熔断控制

为防止某个域内账号被盗或恶意脚本疯狂滥发垃圾邮件，导致整个域名的 IP 信誉受损，EpoMail 在系统与用户层级设立了严格的双重配额熔断机制：

### 1. 默认角色发信配额矩阵

| 角色类型 | 单日发信上限 (Daily Quota) | 单次最多收件人数 | 突发频率限制 (Burst Rate) |
| :--- | :--- | :--- | :--- |
| **`ROLE_SUPER_ADMIN`** | 无限制 (默认 10,000 封) | 100 人/封 | 60 封/分钟 |
| **`ROLE_DOMAIN_ADMIN`**| 1,000 封/日 | 50 人/封 | 30 封/分钟 |
| **`ROLE_ADVANCED_USER`**| 200 封/日 | 20 人/封 | 10 封/分钟 |
| **`ROLE_REGULAR_USER`** | 50 封/日 | 5 人/封 | 3 封/分钟 |
| **`ROLE_GUEST`**        | 0 封 (禁止发信) | 0 人 | 0 封 |

### 2. 突发限流与违规熔断
- **滑动窗口检测**：发信 API 每次被调用时，通过 KV 原子计数器检查发件人在过去 60 秒内的发信量；
- **自动冷冻触发**：若用户在短时间内触发 3 次频次超限警告，系统将自动对该邮箱账号实施「出站只读锁定」24 小时，并向超级管理员发送告警通知。
