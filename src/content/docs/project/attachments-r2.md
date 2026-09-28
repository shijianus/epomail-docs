---
title: 对象存储与附件管理 (R2)
description: 深入配置 Cloudflare R2 对象存储桶，管理邮件附件与原始 EML 归档，掌握分片上传、生命周期归档与预签名防盗链下载。
---

## 📦 为什么选择 Cloudflare R2？

在传统的邮件服务器中，附件通常以物理文件的形式保存在服务器的本地磁盘（如 `/var/mail/vhosts/`）或直接将 base64 编码保存在 MySQL/PostgreSQL 数据库中。这种设计带来了两大致命问题：
1. **备份极其沉重**：包含数十万份大附件的数据库备份需要消耗数小时甚至导致数据库锁死崩溃；
2. **流量费用极高**：在 AWS S3 或阿里云 OSS 上，外网下载数据流出费用高达每 GB $0.09 左右。

**Cloudflare R2** 完美化解了上述难题：
- **完全兼容 S3 API 协议**；
- **零流出数据费用 (Zero Egress Fees)**：无论用户下载多少次附件、文件有多大，完全不收取任何网络带宽出站费用；
- **高持久度与分布式就近下载**：数据自动在 Cloudflare 全球核心存储网络中多重冗余落盘。

---

## 🛠️ 配置 R2 存储桶绑定

### 1. 确保 R2 存储桶已创建
在 `mail-worker` 目录下，使用 Wrangler 创建存储桶：
```bash
npx wrangler r2 bucket create epomail-attachments
```

### 2. 检查 `wrangler.toml` 绑定
确认 `mail-worker/wrangler.toml` 中包含如下绑定定义：
```toml
[[r2_buckets]]
binding = "r2"
bucket_name = "epomail-attachments"
```
重新部署后，Worker 中的代码即可通过 `env.r2` 对象以原生 JS API 直接操作存储桶，性能远超走外部网络 HTTP 请求。

---

## 🗂️ 存储对象目录规范

EpoMail 在 R2 存储桶中统一采用清晰的目录组织架构：

```text
epomail-attachments/
├── raw-emails/                   # 原始 RFC 822 邮件无损报文 (.eml)
│   ├── 2026-09/
│   │   ├── msg-7f3c2a8b.eml
│   │   └── msg-9b1c4e2d.eml
│   └── 2026-10/
├── attachments/                  # 解析出的二进制附件
│   ├── sha256_hash_1/
│   │   └── Q3_Financial_Report.pdf
│   └── sha256_hash_2/
│       └── architectural_spec.png
└── avatars/                      # 用户自定义头像与站标
    └── user-4a8b.jpg
```

- **哈希去重落盘**：当多封邮件包含完全相同的大附件（例如群发的一份 30MB 方案 PDF）时，系统计算文件 SHA-256 摘要，只在 R2 中存储一份物理文件，D1 数据库仅记录引用索引，大幅节省存储开销。

---

## 🔒 预签名安全下载与防盗链

为了防止未登录攻击者猜测附件文件名直接刷取敏感文件，EpoMail 对附件下载实施严格的双重鉴权：

```
[客户端请求 GET /api/v1/mail/attachment/download/:id]
                        │
                        ▼
               [验证 JWT 登录会话态]
                        │
                        ▼
         [校验当前用户是否有权访问该邮件？]
             ├── 否 ──▶ 返回 403 Forbidden
             └── 是 ──▶ 生成临时受限下载凭据
                        │
                        ▼
       [基于 R2 生成带有短期 HMAC 签名的临时链接 (TTL=15分钟)]
                        │
                        ▼
           302 重定向至边缘加速节点直接流式传输文件
```

1. **时效性**：生成的下载签名链接最长有效期为 15 分钟，过期自动失效；
2. **权限绑定**：只有该邮件的收件人、发件人或超级管理员有权向 API 申请附件的签名下载链接；
3. **MIME 安全标头强制**：对于可执行文件（`.exe`, `.sh`, `.bat`）或 HTML 文件，下载流强制注入 `Content-Disposition: attachment` 与 `X-Content-Type-Options: nosniff` 标头，杜绝跨站脚本（XSS）执行。
