---
title: 邮件安全与加密技术白皮书
description: 深入阐述 EpoMail 在传输层、静态存储层与应用层的端到端加密、SPF/DKIM/DMARC 防伪鉴权、MTA-STS 规范与零知识架构。
---

## 🔒 架构安全概览

电子邮件最初设计于上世纪 70 年代，缺乏内生安全与加密验证机制，导致明文嗅探与伪造发信事件屡见不鲜。

EpoMail 采用**现代网络安全纵深防御标准**，从底层全面重构了邮件流转的每一个接触点。本白皮书面向企业安全主管、审计人员与极客开发者，详尽公开系统的安全技术规格与协议实现。

---

## 🚀 1. 传输层加密体系 (In-Transit Encryption)

EpoMail 坚决杜绝任何公网明文传输行为，确保数据在所有中继跳数中受到最高规格密码学保护：

### 1.1 客户端与 Web 访问强制 TLS 1.3
- 浏览器与前端 API 通信强制使用 **HTTPS (TLS 1.3)** 协议，禁用所有存在已知安全隐患的旧版协议（TLS 1.0、TLS 1.1 及脆弱的 TLS 1.2 密码套件）；
- 默认采用具备完全前向保密（PFS）的密码套件（如 `TLS_AES_256_GCM_SHA384`、`TLS_CHACHA20_POLY1305_SHA256`）；
- 强制注入 HSTS 标头（`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`）。

### 1.2 邮件服务器间传输 (STARTTLS & MTA-STS)
- **强制协商 STARTTLS**：入站与出站 SMTP 握手阶段强制发起 STARTTLS 加密信令；
- **支持 MTA-STS 规范 (RFC 8461)**：通过在 `mta-sts.mybrand.com` 上发布策略清单，强制外部发信服务器在向 EpoMail 投递时必须建立有效 TLS 连接，彻底粉碎中间人（MITM）降级明文攻击；
- **配置 TLSRPT (RFC 8460)**：持续接收全球各大 MTA 汇报的传输加密成功率与异常失败报告。

---

## 🗄️ 2. 静态数据存储加密 (At-Rest Encryption)

所有持久化到底层物理存储的数据均处于严密加密状态：

```
┌────────────────────────────────────────────────────────┐
│            EpoMail 静态数据加密三层防护模型             │
└────────────────────────────────────────────────────────┘
  [1] 硬件与介质层：Cloudflare 数据中心 NVMe 磁盘原生 AES-256 全盘加密
  [2] 对象与存储层：Cloudflare R2 存储桶服务端自动加密 (SSE)
  [3] 应用应用层：TOTP 密钥与敏感凭据在进入 D1 前通过独立主密钥进行 AES-GCM 封装
```

- **TOTP 密钥动态加密 (Application-Layer AES-GCM)**：
  数据库中存储的 TOTP 动态口令密钥，并非以明文形式入库，而是由 Worker 在运行态读取独立注入的 `totp_enc_key` 执行高强度对称加密后方才落盘。即便数据库快照发生物理泄漏，未持有主密钥的攻击者也绝无法还原任何双因素凭证。

---

## 🛡️ 3. 邮件防伪验证三重门 (SPF, DKIM, DMARC)

```mermaid
flowchart TD
    M[外部接收端收到邮件] --> S{检查 SPF 记录?}
    S -- IP 不合法 --> F[SPF 校验失败]
    S -- IP 合法 --> P1[SPF 校验通过]

    M --> D{检查 DKIM 签名?}
    D -- RSA 验签失败 --> F
    D -- RSA 验签成功 --> P2[DKIM 校验通过]

    P1 & P2 --> C{评估 DMARC 策略对齐?}
    F --> C
    C -- 符合 p=reject 严格对齐 --> INBOX[投递至收件箱 (高信誉)]
    C -- 对齐失败 --> REJECT[彻底拒绝 / 拦截至垃圾箱]
```

- **SPF (RFC 7208)**：发件人策略框架，向全球宣告授权发信节点；
- **DKIM (RFC 6376)**：采用 **2048 位 RSA 强密钥** 对邮件头及正文哈希进行不可伪造的数字签名；
- **DMARC (RFC 7489)**：推行最高安全级别的 `p=reject` 策略，从根本上杜绝他人盗用该域名伪造冒充邮件。

---

## 💻 4. 应用层安全防御与边界隔离

1. **V8 沙箱边缘强隔离**：
   Cloudflare Workers 基于 Google Chrome 打造的 V8 隔离区（Isolates）运行，各请求间具有严格的内存边界，杜绝进程间内存越权与侧信道嗅探；
2. **严格参数化防 SQL 注入**：
   与 D1 数据库的所有交互严格采用 Drizzle ORM 的预编译参数化绑定（Prepared Statements），从语法层面消灭 SQL 注入风险；
3. **内容安全策略 (CSP)**：
   前端强制部署严苛的 CSP 策略，邮件正文在渲染时经过高强度 HTML 净化（Sanitization），自动剥离所有 `<script>`、`<iframe>`、内联 JavaScript 事件处理器，杜绝存储型 XSS 漏洞。
