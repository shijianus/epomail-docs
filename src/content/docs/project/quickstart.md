---
title: 快速上手 (本地开发栈)
description: 3 分钟搭建本地全真开发环境，运行 mail-worker 与 mail-vue 联调，掌握本地配置、实时预览与自检流程。
---

## 📋 部署前准备

在开始本地开发与体验 EpoMail 之前，请确保您的本地计算机已安装以下开发工具：

- **Node.js**：版本 `>= 18.0.0` (推荐 LTS v20.x 或 v22.x)
- **包管理器**：推荐使用 [pnpm](https://pnpm.io/)（版本 `>= 9.0.0`）
- **代码版本管理**：Git
- **开发操作系统**：macOS / Linux / Windows (WSL2)

```bash
# 检查本地环境版本
node -v   # 应输出 v18.x 或更高
pnpm -v   # 应输出 9.x 或更高
```

---

## 🚀 步骤 1：获取源码与安装依赖

首先克隆 EpoMail 代码仓库，并安装项目各模块所需依赖：

```bash
# 克隆 EpoMail 官方源码仓库
git clone https://github.com/shijianus/epomail.git
cd epomail

# 为根工程及子项目安装依赖
pnpm install
```

项目主要分为两大核心模块：
- `mail-worker/`：基于 Cloudflare Workers + Hono 的后端 API 与邮件处理引擎；
- `mail-vue/`：基于 Vue 3 + Vite + Element Plus 的响应式单页面 Webmail 客户端。

---

## 🔑 步骤 2：配置本地测试密钥 (.dev.vars)

为了保证生产安全性，**敏感密钥严禁硬编码在任何 Git 追踪的代码中**。在本地开发时，Wrangler 会自动加载 `mail-worker/.dev.vars` 文件中的环境变量：

```bash
# 进入后端 worker 目录
cd mail-worker

# 从示例模板复制生成本地环境变量文件
cp .dev.vars.example .dev.vars
```

使用编辑器打开 `mail-worker/.dev.vars`，填入本地测试用的随机安全密钥：

```ini
# mail-worker/.dev.vars (已被 .gitignore 排除，不会被提交)

# JWT 鉴权主密钥 (必须 >= 32 位随机字符)
jwt_secret="local_dev_jwt_secret_must_be_very_long_and_secure_123456"

# TOTP 双因素认证数据加密密钥 (必须为 32 位 hex 字符串)
totp_enc_key="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

# 可选：Resend 邮件发送 API 密钥 (本地发信测试需填写)
resend_api_key="re_test_xxxxxxxxxxxxxxxxxxxxxxxx"
```

:::tip[安全提示]
本地测试的 `jwt_secret` 与 `totp_enc_key` 仅用于开发调试，切勿在生产环境使用相同的弱密码。
:::

---

## ⚡ 步骤 3：启动本地全栈开发服务

得益于 Wrangler 的本地仿真能力，本地开发时无需真正连接到云端，Wrangler 会自动在本地创建基于 Miniflare 的本地 D1 数据库与 KV 模拟沙箱。

### 1. 启动后端 Worker 开发服务
打开第 1 个终端窗口：

```bash
cd mail-worker
pnpm dev
# 默认后端 API 将运行在 http://127.0.0.1:8787
```

### 2. 启动前端 Vue 3 开发服务
打开第 2 个终端窗口：

```bash
cd mail-vue
pnpm dev
# 默认前端 Vite 服务将运行在 http://localhost:5173
```

---

## 🌟 步骤 4：本地冷启动与首次管理员创建

初次启动时，本地的 D1 数据库为空，需要触发系统安全冷启动播种：

1. 在浏览器或终端中访问冷启动初始化路由（替换为您在 `.dev.vars` 中设置的 `jwt_secret`）：
   ```bash
   curl -X POST http://127.0.0.1:8787/api/init/local_dev_jwt_secret_must_be_very_long_and_secure_123456
   ```
2. 此时控制台将返回初始化成功响应，D1 数据库自动完成表结构创建，并自动播种：
   - 6 个系统核心 RBAC 角色；
   - 默认主站长账户：`admin@epomail.bond`（初始密码可在初始化参数或终端控制台日志中查看）。
3. 打开浏览器访问 `http://localhost:5173`，即可看到 EpoMail 现代化的登录界面，使用主站长账号即可成功登入体验！

---

## 🧪 步骤 5：运行本地回归自检套件

在提交代码或进行二次开发后，可运行仓库内置的全量测试套件验证核心功能与数据模型：

```bash
# 在项目根目录运行端到端自检
node tests/e2e-auth-verification.mjs
```

测试套件将自动核验用户注册、密码加密比对、TOTP 2FA 绑定校验、邮件收发状态机以及测试完成后的物理数据自动清理。
