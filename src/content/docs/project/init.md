---
title: 系统冷启动与站长初始化
description: 深入解析 EpoMail 独创的高安全门禁初始化机制 /api/init/<jwt_secret>，自动化数据库建表、6 级系统角色播种与站长首登账号设立。
---

## 🛡️ 为什么需要安全冷启动门禁？

许多传统的开源 Web 系统（如早期 WordPress、各类 Forum 论坛程序）使用明文的 `/install` 或 `/setup` 引导向导页面。这种方式存在致命的安全漏洞：**一旦运维人员完成代码部署但在打开浏览器完成配置前的数分钟内，黑客或扫描机器人极有可能抢先提交表单，夺取全站最高管理员权限**。

EpoMail 创新设计了**“零抢注、无状态、强机密对齐”的冷启动门禁机制**：

```mermaid
flowchart TD
    Req["客户端请求 POST /api/init/{SECRET_TOKEN}"] --> CheckSecret{"SECRET_TOKEN == env.jwt_secret ?"}
    CheckSecret -- "否 (密钥不匹配)" --> Err401["401 Unauthorized<br/>(拦截非法扫描)"]
    CheckSecret -- "是 (匹配)" --> CheckInit{"数据库是否已完成播种？"}
    CheckInit -- "是 (已初始化)" --> Err403["403 Forbidden<br/>(防重放与重入篡改)"]
    CheckInit -- "否 (首次冷启动)" --> Tx["D1 事务级初始化流水"]

    subgraph D1_Pipeline ["D1 事务流水"]
        Tx --> Step1["1. 幂等建表 (CREATE TABLE IF NOT EXISTS)"]
        Step1 --> Step2["2. 播种 6 大 RBAC 角色与其系统级权限"]
        Step2 --> Step3["3. 创建主站长账号 (ROLE_SUPER_ADMIN)"]
        Step3 --> Step4["4. 绑定系统底层初始运行参数"]
    end

    D1_Pipeline --> Resp200["200 OK: 交付站长凭据与初始化报告"]
```

---

## ⚡ 执行冷启动初始化

在您成功部署 Cloudflare Worker 后，只需在终端中向您的线上域名发起一次 `POST` 请求：

```bash
# 替换为您的线上域名和此前通过 wrangler secret put 注入的真实 jwt_secret
curl -X POST https://epomail.mybrand.com/api/init/<YOUR_JWT_SECRET>
```

### 成功响应示例
初始化成功后，API 将返回 JSON 格式的初始化报告：

```json
{
  "code": 200,
  "msg": "EpoMail system initialized successfully!",
  "data": {
    "admin_account": "admin@mybrand.com",
    "initial_password": "epomail_admin_temp_pass_2026",
    "roles_seeded": [
      "ROLE_SUPER_ADMIN",
      "ROLE_DOMAIN_ADMIN",
      "ROLE_OPERATOR",
      "ROLE_ADVANCED_USER",
      "ROLE_REGULAR_USER",
      "ROLE_GUEST"
    ],
    "database_status": "ready",
    "timestamp": 1774780800000
  }
}
```

---

## 🔒 核心保障：幂等性与重入防御

1. **不可重入保护 (Non-Reentrancy)**：
   当首次初始化顺利完成后，数据库标记位将永久落盘。此后任何第三方（即便持有正确的 `jwt_secret`）再次访问该接口，系统一律返回 `403 Forbidden: System is already initialized`，任何参数与超级管理员账号均不可被重置覆写。
2. **迁移幂等性 (Idempotent Migrations)**：
   系统建表语句均内置 `CREATE TABLE IF NOT EXISTS` 原生保护。当后续版本迭代升级时，升级函数会通过 `PRAGMA table_info` 预先检查列定义，确保无损增量变更，绝不破坏用户已有数据。

---

## 🔑 首次登录与生产加固指引

1. 打开浏览器访问您的 EpoMail 域名（如 `https://epomail.mybrand.com`）；
2. 使用初始化输出的站长账号 `admin@mybrand.com` 和临时初始密码登入系统；
3. **立即执行密码修改**：
   - 进入右上方「个人资料」设置页面；
   - 修改为至少 12 位、包含大小写字母与特殊符号的强密码；
4. **立即启用 TOTP 两步验证 (2FA)**：
   - 切换到「安全与认证」选项卡；
   - 使用 Google Authenticator、1Password 等验证器 App 扫描二维码并绑定 TOTP；
   - 保存生成的离线应急恢复码（Backup Codes）。
