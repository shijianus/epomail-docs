---
title: 规则引擎与自动化推送 (TG Bot)
description: 深入掌握 EpoMail 邮件入站匹配规则、自动外部转发机制、Telegram Bot 实时推送信令与关键词打标过滤。
---

## ⚡ 为什么需要规则引擎？

现代人每天接收海量邮件，绝大部分是系统自动化账单、注册验证码、监控告警或新闻简报。通过 EpoMail 的**边缘规则引擎 (Edge Rule Engine)**，您可以在邮件落盘入库的毫秒级瞬间执行自定义触发动作，无需手动刷新网页查收。

---

## 🤖 1. Telegram Bot 实时推送信令

许多极客与团队使用 Telegram 作为主力即时通信工具。EpoMail 支持将入站邮件秒级转发推送到指定的 Telegram 私聊窗口或工作群组中。

### 配置 Telegram Bot
1. 在 Telegram 中找到 [@BotFather](https://t.me/BotFather)，发送 `/newbot` 指令，按照引导创建一个专属 Bot，获取 **Bot Token**（形如 `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`）；
2. 获取您的目标 **Chat ID**（可向 [@userinfobot](https://t.me/userinfobot) 发送任意消息获取私聊 Chat ID，或将机器人拉入群组后查看群组 ID）；
3. 登录 EpoMail Web 后台，进入「个人偏好 ➡️ 消息通知」，填入 Bot Token 与 Chat ID 并点击「发送测试消息」；
4. 验证成功后开启「接收新邮件实时推送」。

### 智能卡片推送效果
当收到新邮件时，Telegram Bot 将自动推送结构化富文本卡片：

```text
📬 [EpoMail] 收到新邮件通知
────────────────────────
发件人: GitHub <noreply@github.com>
收件箱: dev@mybrand.com
主题: [GitHub] Your one-time verification code
时间: 2026-09-28 10:15:32 (UTC)

🔑 智能提取验证码:
┌──────────────┐
│    849201    │
└──────────────┘

摘要: GitHub 安全中心发送的一次性临时登录验证码，有效时间 10 分钟。
────────────────────────
👉 访问 EpoMail 查看完整邮件
```

---

## 🔀 2. 邮件多条件过滤与自动转发

您可以针对不同类型的邮件设定复合规则：

### 规则匹配条件 (Conditions)
- **发件人地址 (From)**：精确匹配（如 `alert@aws.com`）或后缀通配符（如 `*@service.google.com`）；
- **收件人别名 (To)**：按特定别名分类（如发送给 `finance@mybrand.com` 的邮件）；
- **邮件主题 (Subject)**：包含特定关键词（如“发票”、“账单”、“Password Reset”、“验证码”）；
- **附件类型**：是否包含 PDF、图片或压缩包附件。

### 规则执行动作 (Actions)
- **自动打上标签 (Apply Label)**：自动归入「财务」、「社交」、「监控告警」等分类文件夹；
- **标为星标 / 高优先级 (Mark Starred)**：重要通知自动置顶；
- **外部邮箱转发 (Forward to External)**：无缝将正文及原始附件直接转发抄送至您的日常个人主邮箱（如 `yourname@gmail.com`）；
- **静默归档 (Skip Inbox)**：将推销订阅类邮件直接移入归档区，保持主收件箱零噪音。
