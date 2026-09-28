---
title: Cloudflare 生产部署指南
description: 从零开始在 Cloudflare 生产环境中部署上线专属 EpoMail，涵盖 D1 数据库、KV 命名空间、R2 存储桶创建、Secrets 密钥安全注入与一键发布。
---

## 🎯 部署架构前瞻

生产部署将直接把 EpoMail 交付至 Cloudflare 全球边缘网络。部署完成后，您的前端单页静态应用将通过 Cloudflare Workers Assets 托管，后端 API 与 Email Routing 流水线将由同一 Worker 无缝接管，共享全球就近加速能力。

---

## 📋 步骤 1：准备 Cloudflare 账户与 Wrangler 认证

1. 注册并登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)；
2. 确保您至少拥有一个域名，并已将其权威 Nameservers（NS 记录）解析托管至 Cloudflare；
3. 在本地终端中通过 Wrangler CLI 登录并授权您的 Cloudflare 账户：

```bash
# 登录 Cloudflare 账户 (浏览器将自动弹出授权确认)
npx wrangler login
```

---

## 🗄️ 步骤 2：创建生产云端存储资源

在 `mail-worker` 目录下，运行以下命令依次创建 D1 关系型数据库、KV 缓存与 R2 对象存储桶：

### 1. 创建 D1 关系型数据库
```bash
npx wrangler d1 create epomail
```
终端将输出类似如下的信息：
```text
✅ Successfully created DB 'epomail'!
database_id = "542cbca1-fce5-41c5-93f2-c1d04fa919e8"
```
记下该 `database_id`。

### 2. 创建 KV 命名空间
```bash
npx wrangler kv namespace create kv
```
记下输出的 KV `id`（如 `e708c64d291e42c3a03b896914d42575`）。

### 3. 创建 R2 对象存储桶 (用于附件存储)
```bash
npx wrangler r2 bucket create epomail-attachments
```

---

## 📝 步骤 3：更新生产配置文件 (wrangler.toml)

打开 `mail-worker/wrangler.toml`，将上述生成的真实资源 ID 与您的自有域名填入对应配置项：

```toml
name = "epomail"
main = "src/index.js"
compatibility_date = "2025-06-04"

# 数据库存储绑定 (填入您实际的 database_id)
[[d1_databases]]
binding = "USER_DB"
database_name = "epomail"
database_id = "542cbca1-fce5-41c5-93f2-c1d04fa919e8"

[[d1_databases]]
binding = "MAIL_DB"
database_name = "epomail"
database_id = "542cbca1-fce5-41c5-93f2-c1d04fa919e8"

[[d1_databases]]
binding = "db"
database_name = "epomail"
database_id = "542cbca1-fce5-41c5-93f2-c1d04fa919e8"

# KV 缓存命名空间绑定 (填入您的 KV id)
[[kv_namespaces]]
binding = "kv"
id = "e708c64d291e42c3a03b896914d42575"

# R2 对象存储桶绑定
[[r2_buckets]]
binding = "r2"
bucket_name = "epomail-attachments"

# Workers AI 算力绑定 (用于提取验证码)
[ai]
binding = "ai"

# 前端静态资源绑定
[assets]
binding = "assets"
directory = "./dist"
not_found_handling = "single-page-application"
run_worker_first = true

# 系统基础环境变量
[vars]
domain = ["mybrand.com"]          # 您绑定的邮件域名列表
admin = "admin@mybrand.com"       # 首登管理员的默认邮箱
```

---

## 🔐 步骤 4：安全注入生产凭据 (Wrangler Secrets)

:::danger[工程安全红线]
生产环境的 `jwt_secret` 与 `totp_enc_key` 属于核心机密，**绝对禁止**明文写入 `wrangler.toml` 文件中！
生产凭证必须通过 `wrangler secret put` 密文注入 Cloudflare 密钥库：
:::

```bash
# 1. 注入生产 JWT 签名密钥 (建议生成至少 64 位的强随机密码)
npx wrangler secret put jwt_secret
# 根据提示输入您的生产 jwt_secret 并回车

# 2. 注入 TOTP 两步验证数据加密密钥 (必须为 32 位 Hex 随机字符串)
npx wrangler secret put totp_enc_key
# 根据提示输入您的生产 totp_enc_key 并回车

# 3. (可选) 注入 Resend 发信服务 API 密钥
npx wrangler secret put resend_api_key
# 填入来自 resend.com 控制台的 API 密钥
```

---

## 🚀 步骤 5：前端打包与全栈发布

EpoMail 的构建链已将前端产物编译与后端 Worker 部署完全串联。您只需在 `mail-worker` 目录执行一键发布：

```bash
cd mail-worker

# 执行全栈构建与部署
npx wrangler deploy
```

Wrangler 将自动执行：
1. 编译前端登录子模块与主应用 `mail-vue`，将生产产物打包至 `mail-worker/dist`；
2. 试编译后端 Worker 脚本与路由规则；
3. 将静态资源与 Worker 算力打包并瞬间推送到全球 Cloudflare 边缘节点。

部署成功后，控制台将输出分配的 Worker 访问地址（例如 `https://epomail.<your-account>.workers.dev`）。接下来，请继续查阅 [系统冷启动与站长初始化](/project/init/) 完成初次系统设置。
