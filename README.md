# EpomailDocs · EpoCanvas Mail 官方法律文档站

本目录是 **EpoCanvas Mail** 的官方文档站（独立 git 仓库）：法律内容以**台湾《个人资料保护法》为主要法律依据**，按 Google 政策范式拆分为 **7 篇专题文档**，另设 **1 篇专案介绍**，共 **8 篇 × 6 种语言（48 页）**，全部技术事实（数据存储位置、加密语义、第三方清单、保留期限）均经仓库源码逐项核实，全部法条引用均于 2026-09-28 自全国法规数据库（law.moj.gov.tw）逐条核验（见 [`doc/legal-reference.md`](doc/legal-reference.md)）。

- 产品定位：基于 Cloudflare Workers / D1 / KV / R2 的开源（MIT）可自托管邮箱服务
- 托管实例：[mail.epocanvas.com](https://mail.epocanvas.com)
- 视觉：Dignified Minimal 主题（靛蓝 `#2563eb` 主色 + Slate 中性色），7 张主题自适应 SVG 示意图（浅色底 + `prefers-color-scheme` 暗色适配），每图承担真实信息职责并作为文档开头的视觉分区

## 文档架构（专案介绍 1 篇 + 法律 7 篇）

| 文档 | slug | 内容 |
| --- | --- | --- |
| 专案介绍 | `project` | 产品定位、核心功能（源码逐项核实）、技术架构、安全设计、开发历程与完整提交链路（主仓 510 提交 + 本站 3 提交的里程碑锚点） |
| 总览 | `overview` | 平台身份、资料控管者/受托处理者角色界定、文档地图、效力顺序 |
| 隐私政策 | `privacy-policy` | 蒐集处理利用之法律依据（个资法 §19/§20）、AI 特别告知、国际传输（§21）、当事人权利（§3）、安全维护（§20-1） |
| 服务条款 | `terms-of-service` | 电子同意（电子签章法 §4）、审阅期（消保法 §11-1）、责任限制及效力边界（民法 §247-1）、准据法与管辖、行政监督 |
| 可接受使用政策 | `acceptable-use` | 禁止行为清单与对应法源（刑法妨害电脑使用罪章 §358-363、儿少保护法规、诈欺犯罪危害防制条例）、执行阶梯与申诉 |
| 数据处理与安全维护 | `data-security` | 数据生命周期、处理矩阵、施行细则 §12 全部 11 项措施对应、事件应变、受检配合 |
| 第三方处理者清单 | `sub-processors` | 受托处理者、经授权对象、AI 链路、自备服务、法律要求下之共享 |
| 用语定义 | `key-terms` | 法律名词（依个资法 §2 现行定义）与技术名词 |

**法律要点**：以现行修正后之个资法条文为准——修正案于 2025-11-11 公布、行政院定自 **2026-08-10 施行**，主管机关为个人资料保护委员会（§1-1），非公务机关安全维护义务为 §20-1（旧 §27 已删除，全站不再引用）；繁体中文（台湾）版为正式版本，其余语言为对照版本。当前文档版本 **4.1**（生效日期 2026-09-29，全站统一）。

## 语言矩阵（6 语言 × 7 文档）

| 语言 | 目录 | 说明 |
| --- | --- | --- |
| 简体中文（默认） | `src/content/docs/mail/` | Starlight `root` 约定占用根路径（URL 如 `/mail/privacy-policy/`） |
| 繁體中文（正式版本） | `src/content/docs/zh-tw/mail/` | 台湾官方用语（蒐集/裝置/實體刪除/罰鍰…），法条采「第 19 條第 1 項第 2 款」格式 |
| English | `src/content/docs/en/mail/` | |
| Français | `src/content/docs/fr/mail/` | |
| Español | `src/content/docs/es/mail/` | |
| Nederlands | `src/content/docs/nl/mail/` | |

语言集合与 EpoCanvas Mail 产品内建 6 语言 i18n（`zh` / `zh-Hant` / `en` / `fr` / `es` / `nl`）一一对应。

## 配图（7 张 SVG，浅色底 + 暗色自适应）

| 文件 | 内容 | 被引用于 |
| --- | --- | --- |
| `public/images/mail/project-architecture.svg` | 系统架构三层图：客户端层 → Cloudflare 边缘层（API／Email Routing／Workers AI／出站）→ 存储层（双 D1／KV／对象存储），底部安全基线 | 专案介绍 |
| `public/images/mail/self-host-responsibilities.svg` | 三方责任边界：上游开源项目 → 实例运营者（资料控管者）→ 当事人 | 总览 |
| `public/images/mail/privacy-pillars.svg` | 隐私政策五支柱与法条锚点（§8 告知屋顶、§19/§20/§21/§20-1/§3 五支柱、§22 监督基座） | 隐私政策 |
| `public/images/mail/legal-architecture.svg` | 契约层—政策层—准据法基座三层架构 | 服务条款 |
| `public/images/mail/aup-ladder.svg` | 五级执行阶梯 + 申诉回路 + 儿少保护零容忍通道 | 可接受使用政策 |
| `public/images/mail/data-flow.svg` | 数据生命周期六阶段（蒐集→处理→利用→传输→保存→销毁）+ 储存位置与保留要点 | 数据处理与安全维护 |
| `public/images/mail/subprocessor-map.svg` | 第三方共享地图四通道（受托/授权/触发/法定） | 第三方处理者清单 |

图片内标签为英文微标签（跨语言复用），语义由各语言图注（markdown 内本地化）承载；全部走站点绝对路径 `/images/mail/…`，由 `public/` 目录提供。

## 本地构建与检视

```bash
cd EpomailDocs
pnpm install        # astro ^5 / @astrojs/starlight ^0.32
pnpm build          # 48 内容页 + 404，Pagefind 全文搜索索引
pnpm preview        # http://localhost:4321/
node scripts/validate-anchors.cjs   # 校验 dist 全部页内锚点与图片引用
```

构建时 Starlight 依 Git 提交历史生成「最后更新于」时间戳；`custom.css` 提供明暗双主题设计变量。部署时将 `astro.config.mjs` 顶部 `SITE_ORIGIN` 换成实际域名即可。

## 法规引用维护

- 所有文档引用之法规条号以 [`doc/legal-reference.md`](doc/legal-reference.md) 为唯一清单（未收录者不带条号引用）
- 复现核验：`python scripts/extract-tw-articles.py tmp_laws doc/_law-raw.md`（原始页缓存 `tmp_laws/` 已 gitignore）；引注一致性：`python scripts/verify-laws.py`
- 法规修正时：重新抓取 → 更新 `doc/legal-reference.md` → 全语言同步修订对应条号
- 写作规范沉淀于 [`.zcode/skills/tw-legal-writing/SKILL.md`](.zcode/skills/tw-legal-writing/SKILL.md)（引用格式、公文红线、6 语言同步流程）

## 自托管运营者采用指南

本文档为「通用范本 + 托管实例实文」双轨设计。自托管运营者采用时：

1. **替换三处身份信息**：实例域名（`mail.epocanvas.com` → 你的域名）、联络邮箱、生效日期；
2. **复核第三方处理者清单**：未启用 Resend / Telegram / Linux DO 等就删除对应行，避免过度披露或虚假披露；
3. **如实选择邮件模式表述**：加密语义与管理员可及范围之措辞取决于你选择的「全部 / 隐私 / 加密」模式；
4. **履行控管者义务**：自行部署之时点起即为资料控管者——依个资法 §8 向用户告知、依 §20-1 办理安全维护、依 §22 接受主管机关检查；
5. **按辖区补足法定条款**（GDPR / UK GDPR / LGPD / CCPA-CPRA 等）；本模板不构成法律意见。

## 一致性保障

- 六语言版本结构 1:1（标题、表格、提示框、图片、图注逐一对应），修改任一语言时同步其余五种语言
- 页内锚点经 `scripts/validate-anchors.cjs` 全量复核（当前 396 锚点 0 断链）；法条条号经 `scripts/check-article-whitelist.py` 白名单核验（736 处引用全部合规）
- 法条引用格式：简体「第 19 条第 1 项第 2 款」、繁体「第 19 條第 1 項第 2 款」、英文 "Article 19, Paragraph 1, Subparagraph 2"
