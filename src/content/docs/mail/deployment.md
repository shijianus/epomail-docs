---
title: 部署指南
description: EpoCanvas Mail 部署指南——前置条件、三步部署、初始化与引导链、密钥注入、邮件收发配置、存储选型、演示实例与升级回滚之完整说明。
---

**生效日期：2026 年 10 月 5 日｜版本：5.17**

本页面向准备自行部署 EpoCanvas Mail 的使用者与管理员，说明从零到可用实例的完整路径。部署完成后，实例的全部资料落于部署者自己的 Cloudflare 资源内；部署者随之成为其用户的数据控制者，相关法律地位见[开源与自行部署法律](/mail/open-source/)。托管实例（[mail.epocanvas.com](https://mail.epocanvas.com)）的注册使用无需本页步骤。

![EpoCanvas Mail 系统架构：客户端经 Cloudflare 边缘接入，Workers 承载 API 与邮件处理，数据落于双 D1、KV 与对象存储](/images/mail/project-architecture.svg)

*图：部署完成后的运行拓扑。无单点服务器，全部组件运行于 Cloudflare 按量额度之内。*

## 1. 前置条件

| 类别 | 要求 |
| --- | --- |
| 必需 | 一个域名；一个 Cloudflare 帐号；Node.js 与 pnpm 运行环境 |
| 出站邮件 | Resend 或 Mailjet 等投递通道帐号（站外发信必需） |
| 入站邮件 | Cloudflare Email Routing（域名邮箱路由启用即可） |
| 可选 | Backblaze B2 或 S3 自备存储、Turso 第三方数据库、Telegram 机器人、Turnstile 人机验证、AI 提供商密钥 |

## 2. 三步部署

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

前端构建会将登录面一并并入 Worker 的静态资产，单次部署即得完整站点；部署目标与自定义域名于 `wrangler.toml` 配置。

## 3. 初始化与引导链

首次部署后访问 `/api/init/<jwt_secret>`（以部署者设定的密钥值替换路径参数）。该入口完成：全部数据表的建立、六个标准身份分组（参观者、普通用户、普通用户 LV.0、普通用户 LV.1、协管者、站长）的播种与主站长帐号的初始化。

- 引导链为幂等设计：升级函数以 `PRAGMA table_info` 条件检查字段后执行 `ALTER TABLE`，重复访问不产生副作用；
- 清空本地 `.wrangler/state` 冷启动后，仅凭该入口即可端到端完成全部播种，无需手工执行任何 SQL。

## 4. 密钥体系

| 密钥 | 生产注入 | 本地开发 |
| --- | --- | --- |
| `jwt_secret`（会话签名） | `npx wrangler secret put jwt_secret` | `.dev.vars` 文件 |
| `totp_enc_key`（两步验证密钥加密） | `npx wrangler secret put totp_enc_key` | `.dev.vars` 文件 |

- `.dev.vars` 已被 `.gitignore` 排除，不入库；入库模板维护于 `.dev.vars.example`；
- 严禁将任何生产密钥明文写入 `wrangler.toml` 等纳入版本控制的文件；
- 初始化路径中的 `jwt_secret` 即会话签名密钥，二者应保持一致。

## 5. 邮件收发与系统邮件

- 入站：于 Cloudflare 面板启用域名 Email Routing，将目标地址路由至 Worker，即收即解析；
- 出站：于系统设置配置投递通道（如 Resend）后，站外信件经该通道发送；未配置时仅可站内直投；
- 系统邮件（欢迎邮件、安全通知、公告邮件）由内置模板按收件人语言渲染：欢迎邮件内的「进入收件箱」等按钮为站内相对路径，其在邮件客户端内的落点取决于客户端对相对链接的处理；安全通知类使用实例域名的绝对链接。自部署者可经模板常量自订文案与发件署名，官方邮件的投递语义见[防篡改与官方规范](/mail/tamper-proof/)。

## 6. 存储与数据库选型

| 组件 | 缺省 | 可选替代 |
| --- | --- | --- |
| 用户库与邮件库 | Cloudflare D1 双库物理隔离（单库部署 100% 向后兼容） | Turso 等第三方数据库（系统设置配置） |
| 附件与对象 | Cloudflare R2 | Backblaze B2 或 S3 自备存储桶 |
| 缓存 | Workers KV | — |

存储层级与配额计量的技术细节见[技术架构](/mail/architecture/)；个人可另接入自带存储，接入后附件直接落其云端，见[设置指南](/mail/settings/)第 5 节。

## 7. 演示实例

本地演练可运行不对外开放的演示栈：`mail-worker` 以 `wrangler dev` 启动后，经仓库提供的演示播种脚本写入演示邮件与多帐号状态。演示数据仅存本地 `.wrangler/state`（已被 `.gitignore` 排除），不入库亦不进生产；本站产品截图即取自该演示实例的真实运行画面。

## 8. 升级与回滚

- 升级：`git pull` 拉取最新代码 → 重建前端 → `wrangler deploy`；数据迁移随引导链幂等执行，可安全重复；
- 版本核对：系统设置「关于」配置卡提供实例版本与更新检查；
- 回滚：经 Cloudflare Workers 的部署版本历史即时回退，或以旧提交重新部署。

## 9. 相关文档

| 资源 | 链接 |
| --- | --- |
| 初始化后的运行形态与角色配额 | [运行模式](/mail/modes/) |
| 开发环境、测试套件与工程规范 | [开发指南](/mail/development/) |
| 实例级配置的逐项导览 | [设置指南](/mail/settings/) |
| 部署者的法律地位与授权条款 | [开源与自行部署法律](/mail/open-source/) |
| 技术拓扑与加密体系 | [技术架构](/mail/architecture/) |
