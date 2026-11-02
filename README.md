# EpomailDocs · EpoCanvas Mail 官方法律文档站

本目录是 **EpoCanvas Mail** 的官方文档站（独立 git 仓库），包含 **36 篇 × 7 种语言（252 页）**。法律文件按主题说明个人维护、非营利学习与测试服务的条件、数据流与责任边界。项目以欧盟数据保护原则为设计与维护参照，按实际风险、技术现状及合理实施成本尽合理努力改善，并明确告知已知风险，方便用户判断用途与选用功能；这不是全面合规认证或无事故保证。适用法律仍依实际运营、服务对象及处理活动判断。源码事实与5.23审阅见 [`doc/legal-review-2026-11-02-v5.23.md`](doc/legal-review-2026-11-02-v5.23.md)，本轮措辞调整见 [`doc/legal-wording-2026-11-02-v5.24.md`](doc/legal-wording-2026-11-02-v5.24.md)，本轮实施与验证证据见 [`doc/privacy-implementation-2026-11-02-v5.25.md`](doc/privacy-implementation-2026-11-02-v5.25.md)，本轮本地化适配与交付审计见 [`doc/localization-audit-2026-11-02-v5.25.md`](doc/localization-audit-2026-11-02-v5.25.md)；这些报告区分当前工作树行为与线上事实。

- 产品定位：基于 Cloudflare Workers / D1 / KV / R2 的开源（MIT）可自托管邮箱服务
- 托管实例：[mail.epocanvas.com](https://mail.epocanvas.com)
- 视觉：Dignified Minimal 主题（靛蓝 `#2563eb` 主色 + Slate 中性色），12 张主题自适应 SVG 原理图（浅色底 + `prefers-color-scheme` 暗色适配，七语言全量本地化）+ 8 张托管实例真实运行截图，每图承担真实信息职责并作为文档开头的视觉分区

## 文档架构（专案介绍 1 篇 + 法律 7 篇 + 专页 3 篇）

| 文档 | slug | 内容 |
| --- | --- | --- |
| 专案介绍 | `project` | 产品定位、核心功能（源码逐项核实）、适用边界与常见疑问、技术架构、安全设计、开发历程与完整提交链路（主仓逾 560 提交 + 本站逾 45 提交的里程碑锚点） |
| 总览 | `overview` | 平台身份、资料控管者/受托处理者角色界定、文档地图、效力顺序 |
| 隐私政策 | `privacy-policy` | 资料蒐集处理利用之告知事项与处理性质、AI 特别告知、国际传输保障、当事人权利、安全维护措施 |
| 服务条款 | `terms-of-service` | 契约接受、使用与退出、比例处置、合理限责，以及消费者与数据当事人不可排除的救济 |
| 可接受使用政策 | `acceptable-use` | 禁止行为清单与运营者处置措施（零容忍/先行移除/隔离/证据保存/移交）、执行阶梯与申诉 |
| 数据处理与安全维护 | `data-security` | 数据生命周期、静态加密与本地数据边界、实际删除限制、权利请求与事故处理 |
| 第三方处理者清单 | `sub-processors` | 受托处理者、经授权对象、AI 链路、自备服务、法律要求下之共享 |
| 用语定义 | `key-terms` | 法律名词（采资料保护法制通用定义）与技术名词 |
| 官方邮件规范与防篡改验证 | `tamper-proof` | 官方发信身份与认证标记、官方邮件目录、不可变投递与预置翻译、渲染隔离、文档 SHA-256 存证清单 |
| 功能指南 | `features` | 收件箱整理、撰写发送、搜索语法、标签规则引擎、验证码提取、垃圾治理、转发推送、AI 能力与开放平台 |
| 技术架构 | `architecture` | 部署拓扑、技术栈、三模式加密体系、附件存储链、角色权限模型、邮件生命周期与应用安全设计 |

**法律写作边界**：公开文件不逐条列法条号，依据与适用条件记录于核验底稿。法律适用不只取决于运营者所在地；选择台湾法、使用 MIT 源代码、免费或非营利均不排除适用的强制保护。Cloudflare 的认证与契约范本不单独证明某实例的数据传输合法。繁体中文（台湾）版为正式版本，译本地位不得排除可理解告知、消费者解释及不可排除的权利。当前文档版本 **5.25**（更新日期 2026-11-02）；日期记录文本更新，不证明所有用户已接受新条件或实际部署已完成合规。

## 语言矩阵（7 语言 × 36 文档）

| 语言 | 目录 | 说明 |
| --- | --- | --- |
| 简体中文（默认） | `src/content/docs/mail/` | Starlight `root` 约定占用根路径（URL 如 `/mail/privacy-policy/`） |
| 繁體中文（正式版本） | `src/content/docs/zh-tw/mail/` | 台湾官方用语（蒐集/裝置/實體刪除/罰鍰…），义务表述锚定适用法律（不逐条引用条号） |
| English | `src/content/docs/en/mail/` | |
| Français | `src/content/docs/fr/mail/` | |
| Español | `src/content/docs/es/mail/` | |
| Nederlands | `src/content/docs/nl/mail/` | |
| Deutsch | `src/content/docs/de/mail/` | 对照译本（文档站先行新增语言）；产品界面暂无德语，页面截图统一引用英文界面 `/images/mail/en/ui/` |

语言集合此前与 EpoCanvas Mail 产品内建 6 语言 i18n（`zh` / `zh-Hant` / `en` / `fr` / `es` / `nl`）一一对应；v5.22 起文档站先行扩展第 7 种语言 Deutsch，产品界面语言集合维持 6 种。新增语言的完整流程：astro.config.mjs（locale + redirects + 侧栏翻译）→ `scripts/figures-strings-*.mjs` 补全 12 图字符串并重跑 `generate-figures.mjs` → 翻译 36 篇文档 → `check-structure.py` 纳入新语言并跑全语言对称核验。

## 配图（12 张 SVG 原理图 × 7 语言本地化 + 产品截图，浅色底 + 暗色自适应）

| 文件 | 内容 | 被引用于 |
| --- | --- | --- |
| `public/images/mail/project-architecture.svg` | 系统架构三层图：客户端层 → Cloudflare 边缘层（API／Email Routing／Workers AI／出站）→ 存储层（双 D1／KV／对象存储），底部安全基线 | 专案介绍、技术架构 |
| `public/images/mail/self-host-responsibilities.svg` | 三方责任边界：上游开源项目 → 实例运营者（资料控管者）→ 当事人 | 总览 |
| `public/images/mail/privacy-pillars.svg` | 隐私政策五支柱（契约与同意、目的限制、传输保障、安全维护、权利救济五内涵，主管监督基座） | 隐私政策 |
| `public/images/mail/legal-architecture.svg` | 契约层—政策层—适用法律基座三层架构 | 总览 |
| `public/images/mail/aup-ladder.svg` | 五级执行阶梯 + 申诉回路 + 儿少保护零容忍通道 | 可接受使用政策 |
| `public/images/mail/security-trust-shield.svg` | 传输、边缘、静态存储与凭证四层防护 + 用户自主控制 | 数据处理与安全维护 |
| `public/images/mail/dual-nature-scale.svg` | 双轨运营责任天平（托管实例 / 自建实例） | 数据处理与安全维护 |
| `public/images/mail/data-sovereignty-export.svg` | 资料自主：导出／删除／控制路径 | 数据处理与安全维护 |
| `public/images/mail/subprocessor-map.svg` | 第三方共享地图四通道（受托/授权/触发/法定） | 第三方处理者清单 |
| `public/images/mail/tos-contract.svg` | 服务条款契约生命周期四阶段（电子同意→履约→修订→终止）+ 准据法基座 + 完整约定三文档 | 服务条款 |
| `public/images/mail/key-terms-glossary.svg` | 用语地图：法律名词与技术名词两族定义 + 全站一致使用 + 解释基准 | 用语定义 |
| `public/images/mail/anti-tamper-architecture.svg` | 官方邮件三层处理（签发／投递／客户端）与文档存证核验 | 防篡改与官方规范 |
| `public/images/mail/ui/*.png` | 托管实例真实运行截图 8 张（收件箱亮暗／写信／搜索／验证码详情／官方公告／en／移动端） | 功能指南等 |

图片内标签为英文微标签（跨语言复用），语义由各语言图注（markdown 内本地化）承载；全部走站点绝对路径 `/images/mail/…`，由 `public/` 目录提供。

## 本地构建与检视

```bash
cd EpomailDocs
pnpm install        # astro ^5 / @astrojs/starlight ^0.32
pnpm build          # 252 篇内容页、跳转页及 Pagefind 搜索索引
pnpm preview        # http://localhost:4321/
node scripts/validate-anchors.cjs   # 校验 dist 全部页内锚点与图片引用
python scripts/check-delivery.py --version 5.25 # 校验内链、SEO、镜像及252篇源码散列
```

构建时 Starlight 依 Git 历史显示「文档最近一次 Git 提交」，未提交文本的实际修订日期见各页版本头；两者均不证明生产部署时间。`custom.css` 提供明暗双主题、键盘焦点、可横向滚动的语义表格与移动端间距；隐私政策在窄屏使用简化的五主题 SVG。部署时将 `astro.config.mjs` 顶部 `SITE_ORIGIN` 换成实际域名即可。

## 正式上线检查清单（部署前）

1. ~~确定域名并修改 `SITE_ORIGIN`~~ **已定案（v5.3）**：发布地址 `https://docs.epocanvas.com/epomail/`，`SITE_ORIGIN = https://docs.epocanvas.com`、`base = '/epomail'` 已写入 `astro.config.mjs`，内链与图路径经 `rehypePrefixBase` 自动携带 base 前缀；
2. **同步 `public/robots.txt`**：将 `Sitemap:` 行改为与 `SITE_ORIGIN` 一致；
3. **同步应用内文档链接**：mail-worker 环境变量 `DOCS_URL`（现默认 `https://docs.epocanvas.com/epomail`）与 `mail-vue/src/const/links-const.js` 之 `docs` 值指向最终地址；
4. **建立发布管道**：以 Cloudflare Pages 连接本仓库（构建命令 `pnpm build`，输出目录 `dist`），或执行 `pnpm exec wrangler pages deploy dist`；
5. **发布前核验**：`pnpm validate`（构建、页内锚点与图片、7 语言 × 36 篇结构对称）；法规施行状态与部署事实另按核验底稿核实，脚本不提供法律认证。

## 法规引用维护

- 法规依据以 [`doc/legal-reference.md`](doc/legal-reference.md) 为唯一核验底稿；全站不引用法条条号，义务表述锚定「适用法律」（v5.0 立场）
- `python scripts/verify-laws.py` 仅打印 `tmp_laws/` 历史缓存，既不在线核验也不判断生效日；部分旧缓存法码／标题有误，不得把成功退出当作现行法核验通过。
- 法规修正时：核对官方正文、沿革与施行注记，记录来源及读取日期，更新 `doc/legal-reference.md`，再同步相关语言。不要使用未核实的「2026-08-10 已施行」说法。
- 写作格式见 [`.zcode/skills/tw-legal-writing/SKILL.md`](.zcode/skills/tw-legal-writing/SKILL.md)。其中历史法规时效提示须让位于核验底稿与官方现行状态；七语言正文、表格及图注保持对应。

## 自托管运营者采用指南

本文档可供自行部署者参考，不能只更换域名即作为实际实例的合规证明。采用时：

1. 核实并公布实际运营者可识别名称、国家、适当联络地址与依法需要的其他资料；不因个人项目而必须成立公司，但不能虚构主体。
2. 按实际启用功能记录供应者、数据字段、地区、有效处理契约、传输机制及保存／删除条件；未满足必要保障的外传先停用。
3. 按真实实现说明服务器端加密、本地缓存、分享链接、管理权限及导出边界；不能承诺端到端保密或注销即全部删除。
4. 按处理目的及方式判断控制者、处理者或其他角色，并评估 GDPR 的地域适用与不可排除的当地保护；运营者所在地不是唯一标准。
5. 为保留期限、请求期限、删除结果及事故处理建立可实际执行的轻量记录；独立核验运营事实，不能把模板或构建成功当作上线许可。

## 一致性保障

- 七语言版本结构 1:1（标题、表格、提示框、图片、图注逐一对应），修改任一语言时同步其余六种语言
- 页内锚点经 `scripts/validate-anchors.cjs` 核对；七语言标题、表格及图片结构经 `scripts/check-structure.py` 校验。法律依据与适用范围按核验底稿判断，`scripts/verify-laws.py` 的历史缓存输出不作为合规证明
- 全站不引用法条条号（v5.0 立场）：法规仅以名称出现；v4.1 及更早版本的条号引用格式规范已随去条号立场废止
- 时效型数据（主仓/本站提交数、测试脚本数、锚点总数）随源码演进变化：每次文档仓提交前运行 `pnpm check`，并对照 `git rev-list --count HEAD` 与 `ls tests/*.mjs | wc -l` 刷新 project.md 与本 README 之数值
