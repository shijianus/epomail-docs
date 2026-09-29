---
title: 核心 API 接口端点速查
description: 详尽查阅 EpoMail 核心 RESTful 端点，包括认证鉴权、邮箱管理、邮件收发与检索、用户权限与大屏统计。
---

## 📑 API 核心端点分类导航

```
EpoMail RESTful API 端点全集
├── 1. 认证与账户域 (/api/v1/auth)
│   ├── POST /api/v1/auth/login               # 用户凭据登录
│   ├── POST /api/v1/auth/logout              # 注销并吊销当前会话
│   ├── GET  /api/v1/auth/profile             # 获取当前登录用户信息
│   └── POST /api/v1/auth/2fa/verify          # 验证并绑定 TOTP
│
├── 2. 邮件收发与管理域 (/api/v1/mail)
│   ├── GET  /api/v1/mail/list                # 分页拉取邮件列表 (支持过滤与检索)
│   ├── GET  /api/v1/mail/detail/:id          # 查看单封邮件详情 (HTML/正文/附件索引)
│   ├── POST /api/v1/mail/send                # 发送/群发邮件 (支持富文本与附件)
│   ├── POST /api/v1/mail/mark-read           # 批量标为已读/未读
│   ├── POST /api/v1/mail/star                # 批量标为星标/取消星标
│   ├── DELETE /api/v1/mail/trash             # 批量移入回收站
│   └── DELETE /api/v1/mail/purge             # 物理彻底删除邮件
│
├── 3. 号池与别名域 (/api/v1/aliases)
│   ├── GET  /api/v1/aliases/list             # 查看名下绑定的所有邮箱别名
│   ├── POST /api/v1/aliases/create           # 申请/分配新的邮箱前缀别名
│   └── DELETE /api/v1/aliases/delete/:id     # 注销特定邮箱别名
│
└── 4. 统计与监控域 (/api/v1/stats)
    └── GET  /api/v1/stats/dashboard          # 获取系统 30 天收发增长数据与存储分布
```

---

## 📬 1. 邮件检索列表接口 (`GET /api/v1/mail/list`)

### 请求参数 (Query Parameters)
- `page` (number)：当前页码，默认 `1`
- `limit` (number)：每页条数，默认 `20`，最大 `100`
- `folder` (string)：文件夹类型，可选 `inbox` (收件箱), `sent` (已发送), `trash` (回收站), `starred` (星标)
- `search` (string)：可选检索关键词（支持匹配发件人、主题及正文片段）

### 调用示例 (Request Snippets)

import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="cURL">
```bash
curl -X GET "https://epomail.mybrand.com/api/v1/mail/list?page=1&limit=20&folder=inbox" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -H "Content-Type: application/json"
```
  </TabItem>
  <TabItem label="JavaScript (Fetch)">
```javascript
const response = await fetch("https://epomail.mybrand.com/api/v1/mail/list?page=1&limit=20&folder=inbox", {
  method: "GET",
  headers: {
    "Authorization": "Bearer <YOUR_JWT_TOKEN>",
    "Content-Type": "application/json"
  }
});
const data = await response.json();
console.log("Emails count:", data.data.total);
```
  </TabItem>
</Tabs>

### 响应示例 (JSON Response)
```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "list": [
      {
        "id": "msg_8c4f2e1a",
        "mailbox": "dev@mybrand.com",
        "from": "Cloudflare <noreply@cloudflare.com>",
        "subject": "Workers and D1 Monthly Digest",
        "preview": "Discover the latest improvements to Cloudflare Workers...",
        "has_attachment": true,
        "is_read": false,
        "is_starred": true,
        "verification_code": null,
        "created_at": 1774780800000
      }
    ]
  }
}
```

---

## ✉️ 2. 发送邮件接口 (`POST /api/v1/mail/send`)

### 调用示例 (Request Snippets)

<Tabs>
  <TabItem label="cURL">
```bash
curl -X POST "https://epomail.mybrand.com/api/v1/mail/send" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "support@mybrand.com",
    "to": ["client@example.com"],
    "subject": "Project Proposal & Delivery Schedule",
    "html_body": "<h2>Hello Team,</h2><p>Please find the attached proposal.</p>"
  }'
```
  </TabItem>
  <TabItem label="JavaScript (Fetch)">
```javascript
const payload = {
  from: "support@mybrand.com",
  to: ["client@example.com"],
  subject: "Project Proposal & Delivery Schedule",
  html_body: "<h2>Hello Team,</h2><p>Please find the attached proposal.</p>"
};

const response = await fetch("https://epomail.mybrand.com/api/v1/mail/send", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <YOUR_JWT_TOKEN>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});
const result = await response.json();
console.log("Send status:", result.data.delivery_status);
```
  </TabItem>
</Tabs>

### 请求体 (Request Body)
```json
{
  "from": "support@mybrand.com",
  "to": ["client@example.com"],
  "cc": ["team@mybrand.com"],
  "bcc": [],
  "subject": "Project Proposal & Delivery Schedule",
  "html_body": "<h2>Hello Team,</h2><p>Please find the attached proposal.</p>",
  "attachment_keys": ["attachments/a8f2.../proposal.pdf"]
}
```

### 响应示例
```json
{
  "code": 200,
  "msg": "Message sent successfully",
  "data": {
    "message_id": "msg_9f3b18c4e",
    "delivery_status": "queued",
    "channel": "resend",
    "timestamp": 1774780800000
  }
}
```
