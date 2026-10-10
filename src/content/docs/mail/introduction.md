---
title: EpoCanvas Mail 文档站介绍
description: EpoCanvas Mail 文档站介绍——站点定位、文档架构、阅读路线、多语言结构与完整导览。
---

**站点启用：2026 年 9 月 28 日｜当前版本：v5.17｜站点地址：docs.epocanvas.com/epomail**

**生效日期：2026 年 10 月 5 日｜版本：5.17**

EpoCanvas Mail 文档站（下称「本站」）是 EpoCanvas Mail 开源电子邮件服务的官方文档中心，涵盖法律条款、技术规范、使用指南与开发文档。本站以 Astro 5 + Starlight 构建，六语言完全对称（简体中文、繁体中文、English、Français、Español、Nederlands），全部文档经代码实现逐字核验，为托管实例用户、自行部署者与审计参与者提供单一可信文档源。本页说明本站的定位、文档架构、阅读路线与导览入口。

本站法律文档以繁体中文（台湾）版本为正式版本，其余语言版本为对照译本，文义有疑义时以正式版本为准。

![EpoCanvas Mail 文档架构：法律文档层（隐私政策、服务条款、可接受使用政策与数据治理文档）与技术文档层（专案介绍、功能指南、技术架构、运行模式与使用指南）共同构成完整文档体系，全部立于开源代码与透明规范之基座](/images/mail/legal-architecture.svg)

*图：文档架构。法律文档层定义数据处理与服务边界；技术文档层说明功能、架构与使用方式；两层文档均以开源代码实现为准。*

## 1. 站点定位

本站为 EpoCanvas Mail 开源项目的唯一官方文档，承担三项职能：

- **法律告知**：隐私政策、服务条款、可接受使用政策与数据处理规范，向托管实例用户履行法定告知义务；自行部署者可将本站文档作为其告知与条款之基础范本；
- **技术规范**：技术架构、安全设计、开发历程与完整提交链路，供审计参与者核验代码实现与文档承诺之一致性；
- **使用指南**：功能说明、界面导览、搜索语法、部署步骤与开发流程，帮助用户、运营者与开发者理解与使用本服务。

本站文档以开源代码之实际实现为准，禁止臆造；法条引用以 `doc/legal-reference.md` 核验白名单为准；技术事实（加密语义、保存期限、第三方清单）经自动化测试与审计脚本持续核验。

## 2. 文档架构

本站按主题分为三组文档，各组相互引用并共同构成完整之约定：

### 2.1 产品与总览

| 文档 | 内容 |
| --- | --- |
| [专案介绍](/mail/project/) | 定位、核心功能、技术架构概览、开发历程与完整提交链路 |
| [服务范围与支持](/mail/service-scope/) | 托管实例的服务边界、免责声明与联络渠道 |
| [界面与路由总览](/mail/interface/) | 收件箱、写信、设置与管理控制台的完整界面导览与路由映射 |

### 2.2 使用指南

| 文档 | 内容 |
| --- | --- |
| [功能指南](/mail/features/) | 收件箱整理、撰写发送、搜索语法、标签规则、验证码提取、转发推送与 AI 能力 |
| [运行模式](/mail/modes/) | 部署形态、邮件模式三档隐私等级、身份分组与配额、登录与两步验证 |
| [设置指南](/mail/settings/) | 个人设置五分区（个资、常规、安全、数据、标签）与管理控制台九分区导览 |
| [搜索与规则参考](/mail/search/) | 搜索算子、管理端检索与分类规则条件的完整参考 |
| [邮箱界面与邮件详情](/mail/mailbox/) | 收件箱视图、三栏分屏、会话线程与邮件详情页的逐项说明 |
| [标签与分类管理](/mail/labels/) | 标签体系、分类规则引擎、黑白名单与全局治理工具 |
| [个资与常规设置](/mail/preferences/) | 个人资料卡、地址卡、界面语言、主题壁纸与阅读偏好 |
| [数据导出与存储](/mail/data/) | JSON 完整副本导出、.eml 单邮件下载与存储用量管理 |
| [帐号安全设置指南](/mail/security/) | 用户名与密码、两步验证中心（TOTP、备用恢复码、通行密钥）与信任设备 |
| [通知与转发指南](/mail/notify/) | 个人转发、Telegram 推送与全局转发规则的配置与行为 |
| [分析页](/mail/analysis/) | 数据可视化仪表盘、用户增长与邮件分类统计 |
| [用户列表](/mail/users/) | 帐号管理、角色分组、发信配额与封禁／恢复操作 |
| [全库邮件审查](/mail/review/) | 管理端邮件检索、垃圾邮件治理与受邮件模式约束的可见范围 |
| [权限控制](/mail/roles/) | 六大身份分组、存储配额、发件上限与 AI 授权模型 |
| [注册密钥](/mail/regkeys/) | 邀请码生成、使用次数限制与过期管理 |
| [系统设置配置卡详解](/mail/system/) | 网站设置、个性化、存储、推送与开放平台等九张配置卡的逐项说明 |
| [开放平台与 API 接入](/mail/api/) | OAuth 2.0 / OIDC 认证中心、应用注册、端点接入与个人 API 令牌 |
| [分类管理](/mail/category/) | 全局分类规则、发件人黑名单与主题关键词黑名单 |
| [操作报告](/mail/audit/) | 审计预警工单、风控研判、封禁申诉与受邮件模式联动的时间戳剥离 |

### 2.3 技术与信任

| 文档 | 内容 |
| --- | --- |
| [技术架构](/mail/architecture/) | Cloudflare 边缘部署拓扑、双数据库隔离、三模式加密体系、附件存储链与应用安全设计 |
| [防篡改与官方规范](/mail/tamper-proof/) | 官方邮件规格与识别、官方认证标记、不可变投递与文档防篡改校验 |

### 2.4 自部署与开发

| 文档 | 内容 |
| --- | --- |
| [部署指南](/mail/deployment/) | 自行部署的完整步骤、前置条件、初始化引导链与密钥注入 |
| [开发指南](/mail/development/) | 开发环境、工程流程、测试与审计脚本、提交规范与参与贡献 |

### 2.5 隐私与数据保护

| 文档 | 内容 |
| --- | --- |
| [总览](/mail/overview/) | 平台身份、数据处理角色界定、文档架构、效力顺序与联络窗口 |
| [隐私政策](/mail/privacy-policy/) | 个人资料之收集处理利用、处理性质、当事人权利与国际传输 |
| [数据处理与安全维护](/mail/data-security/) | 数据生命周期、处理矩阵、安全维护措施、事件应变与受检配合 |
| [第三方处理者清单](/mail/sub-processors/) | 受托处理者、共享对象、涉及资料与国际传输保障机制 |

### 2.6 条款与合规

| 文档 | 内容 |
| --- | --- |
| [服务条款](/mail/terms-of-service/) | 服务使用之契约条件、权利义务、责任限制、准据法与管辖 |
| [可接受使用政策](/mail/acceptable-use/) | 使用行为之边界、禁止行为清单与运营者之处置、执行程序 |
| [开源与自行部署法律](/mail/open-source/) | MIT 授权条款适用、自部署之数据控制者责任与免责声明 |
| [用语定义](/mail/key-terms/) | 本站法律文档所用技术与法律名词之定义 |

## 3. 阅读路线

本站按两条互补路线组织：

**路线一：了解专案、准备部署或学习使用**

[专案介绍](/mail/project/) → [功能指南](/mail/features/) → [运行模式](/mail/modes/) → [界面与路由总览](/mail/interface/) → [搜索与规则参考](/mail/search/) → [设置指南](/mail/settings/) → [部署指南](/mail/deployment/) → [开发指南](/mail/development/)

**路线二：了解隐私法律约定与服务边界**

[总览](/mail/overview/) → [隐私政策](/mail/privacy-policy/) → [服务条款](/mail/terms-of-service/) → [可接受使用政策](/mail/acceptable-use/) → [数据处理与安全维护](/mail/data-security/) → [第三方处理者清单](/mail/sub-processors/)

两条路线于[功能指南](/mail/features/)与[运行模式](/mail/modes/)处交汇。

## 4. 多语言结构

本站提供六种语言，结构 1:1 对称：

| 语言 | 标识 | 说明 |
| --- | --- | --- |
| 简体中文 | `zh` | 站点默认语言，占用 URL 根路径（`/epomail/mail/...`） |
| 繁体中文（台湾） | `zh-tw` | 法律文档正式版本，其余语言为对照译本（`/epomail/zh-tw/mail/...`） |
| English | `en` | 对照译本（`/epomail/en/mail/...`） |
| Français | `fr` | 对照译本（`/epomail/fr/mail/...`） |
| Español | `es` | 对照译本（`/epomail/es/mail/...`） |
| Nederlands | `nl` | 对照译本（`/epomail/nl/mail/...`） |

站点首页（`/` 与 `/epomail/`）经 Cloudflare Pages Functions 按浏览器 `Accept-Language` 头协商语言，自动跳转至对应语言的[总览](/mail/overview/)页。旧根轨道路径 `/mail/...` 重定向至带语言协商的规范路径。

每种语言的文档数量、标题层级、表格行列、图片与提示框数量必须严格一致，由 `scripts/check-structure.py` 自动化核验。版本号与生效日期全站统一。

## 5. 文档质量保障

本站文档经以下机制保障质量与一致性：

- **代码实现核验**：技术事实（加密语义、保存期限、第三方清单、角色配额）以 epomail 仓库源码为准，禁止臆造；
- **法条引用白名单**：`doc/legal-reference.md` 是全站唯一法条引用依据，仅允许引用该清单已核验之条号；
- **结构对称检查**：`scripts/check-structure.py` 校验六语言文档的标题、表格、图片与提示框数量严格一致；
- **锚点完整性**：`scripts/validate-anchors.cjs` 扫描全站锚点与图片引用，确保零断链；
- **构建零报错**：`pnpm build` 必须零报错通过，任何警告或错误均阻止发布；
- **防篡改校验**：官方文档经 HMAC-SHA256 签名与不可变快照投递，见[防篡改与官方规范](/mail/tamper-proof/)。

## 6. 站点技术栈

| 组件 | 实现 |
| --- | --- |
| 静态生成 | Astro 5.0 + Starlight 0.32 |
| 路由协商 | Cloudflare Pages Functions（`functions/_lib.js` 共享语言协商逻辑） |
| 部署 | Cloudflare Pages（`npx wrangler pages deploy dist --project-name epomail-docs`） |
| 构建产物 | 双轨发布：`dist/*` 根路径与 `dist/epomail/*` 子路径镜像（`scripts/post-build.mjs` 执行） |
| 样式系统 | 自定义 CSS（`src/styles/custom.css`，627 行），对齐 EpoCanvasDocs 靛蓝科技配色 |
| 图标与资产 | 300+ 离线矢量图标、明暗双主题、六语言本地化插图（`/images/mail/{zh-tw,en,es,fr,nl}/*.svg`） |

## 7. 相关资源

| 资源 | 链接 |
| --- | --- |
| 托管实例 | [mail.epocanvas.com](https://mail.epocanvas.com) |
| 源代码 | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) |
| 文档站源代码 | EpomailDocs 独立 git 仓库（本站构建产物） |
| 隐私事项联络 | privacy@epocanvas.com |
| 产品内联络 | 站内消息或 admin@epocanvas.com |
| 开源项目 Issue | GitHub 代码库 Issue |
