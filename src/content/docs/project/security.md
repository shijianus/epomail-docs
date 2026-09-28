---
title: 安全防护与防爆破体系
description: 详解 EpoMail 多层次安全防护矩阵，涵盖 Cloudflare Turnstile 人机验证、TOTP 2FA 加密存储、JWT 鉴权、防爆破 IP 封锁与操作审计日志。
---

## 🛡️ 多层次纵深防御模型 (Defense in Depth)

邮件系统是黑客与垃圾邮件发送者最频繁攻击的目标之一。EpoMail 坚决摒弃单一弱口令防护的传统模式，构建了从边缘网络、应用网关、数据库存储到用户鉴权的**全链路多层次纵深防御体系**：

```
[Layer 1: 边缘网络防护] ──▶ Cloudflare DDoS 高防 + Turnstile 行为式人机验证挑战
                                  │
                                  ▼
[Layer 2: 应用网关防护] ──▶ 限流防爆破 (Rate Limiting) + 5次密码错误自动锁定 IP
                                  │
                                  ▼
[Layer 3: 身份鉴权防护] ──▶ 强密码哈希 (Argon2id/PBKDF2) + TOTP 2FA 动态口令
                                  │
                                  ▼
[Layer 4: 数据存储防护] ──▶ AES-256 机密加密落盘 + D1 严格参数化防 SQL 注入
                                  │
                                  ▼
[Layer 5: 审计追溯体系] ──▶ 全量不可篡改的敏感操作审计日志流水
```

---

## 🤖 1. Cloudflare Turnstile 人机验证集成

[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) 是 Google reCAPTCHA 的现代隐私友好替代方案，能够在绝大多数情况下以无感方式验证真实人类操作，无需用户点击扭曲文字或消防栓图片。

### 开启 Turnstile
1. 在 Cloudflare Dashboard 导航至 **「Turnstile」**，添加您的 EpoMail 域名，获取 **Site Key (公钥)** 与 **Secret Key (私钥)**；
2. 在 `mail-worker` 目录下注入私钥：
   ```bash
   npx wrangler secret put turnstile_secret_key
   ```
3. 在管理后台「系统设置 ➡️ 安全设置」中开启 Turnstile，并填入 Site Key；
4. 开启后，公开登录与注册表单必须携带合法的 `turnstile_token`，否则 API 直接在入口处丢弃请求，彻底杜绝黑客撞库脚本。

---

## 🔑 2. TOTP 两步验证 (2FA) 与机密隔离存储

为防范用户密码在第三方泄露导致的撞库风险，EpoMail 提供了符合 RFC 6238 规范的基于时间的一次性密码（TOTP）：

- **密钥高强度 AES-256 加密落盘**：
  用户的 TOTP 共享密钥（Secret Key）**绝不以明文保存在 D1 数据库**。写入数据库前，Worker 会使用在部署时通过 `wrangler secret put totp_enc_key` 注入的 32 字节生产主密钥进行高强度 AES-GCM 加密。即刻便数据库备份意外泄露，攻击者也无法解密出用户的 TOTP 二维码。
- **应急恢复码 (Backup Codes)**：
  用户绑定 TOTP 时，系统一次性生成 8 组单次生效的应急恢复码（经单向哈希后入库）。当用户手机丢失时，可用恢复码完成一次性紧急登录。

---

## 🔒 3. 密码防爆破与智能 IP 锁定

为了遏制针对特定邮箱账号或管理员后台的字典暴力破解，系统内置了基于 Cloudflare KV 的**滑动窗口频次检测器**：

1. **失败计数追踪**：客户端每次尝试密码登录失败，Worker 自动在 KV 空间以 `login_fails:{ip}:{username}` 为键累加计数；
2. **阶梯式渐进锁定**：
   - 连续失败 3 次：强制弹出 Turnstile 复杂人机验证码；
   - 连续失败 5 次：锁定该账户与 IP 访问 15 分钟，所有密码尝试一律返回 `429 Too Many Requests`；
   - 连续失败 10 次以上：锁定 24 小时，并向超级管理员发送高风险安全审计警报。

---

## 📜 4. 关键操作全量审计流水 (Audit Logs)

系统在 D1 数据库中维护着只读追加的 `audit_logs` 表，记录平台内发生的一切重大安全事件：

- **记录事件类型**：
  - 用户登录成功 / 失败（附带 IP、国家代码、客户端 User-Agent）；
  - 角色提权与权限变更（谁在什么时间将某用户提升为管理员）；
  - 邮箱号池分配与注销；
  - 敏感配置变更（发信渠道调整、密钥轮转）；
  - 邮件规则与 Webhook 新增/删除。
- 审计日志仅超级管理员拥有只读检索权限，任何管理员无权在后台修改或删除单条审计记录。
