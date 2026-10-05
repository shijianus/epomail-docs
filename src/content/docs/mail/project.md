---
title: EpoCanvas Mail 专案介绍
description: EpoCanvas Mail 专案完整介绍——定位、核心功能、技术架构、安全设计、开发历程与完整提交链路。
---

**首次提交：2026 年 7 月 21 日｜当前版本：v1.1.0｜授权条款：MIT**

**生效日期：2026 年 10 月 5 日｜版本：5.15**

EpoCanvas Mail 是一套运行于 Cloudflare 边缘网络的开源电子邮件服务。使用者仅需一个域名与一个 Cloudflare 帐号，即可搭建支持收发邮件、附件与多终端访问的专属邮箱。专案以托管实例 [mail.epocanvas.com](https://mail.epocanvas.com) 对外运营，同时开放全部源代码供自行部署，并提供配套的 Android 移动应用（epomail）。本页说明专案的定位、功能、技术架构、安全设计与开发历程；服务与隐私的法律约定见[隐私权与条款总览](/mail/overview/)。

本站法律文档以繁体中文（台湾）版本为正式版本，其余语言版本为对照译本，文义有疑义时以正式版本为准。本站法律与技术文档以本服务开源实现为准，旨在建立透明、严谨之非商业社区通讯规范。

![EpoCanvas Mail 系统架构：客户端层（Web 应用、Android 应用、OAuth 第三方应用）经 Cloudflare 边缘接入；Workers 承载 API、邮件入站解析与 AI 能力，出站经 Resend 与 Telegram；数据落于双 D1 数据库、KV 与对象存储](/images/mail/project-architecture.svg)

*图：系统架构。客户端经边缘接入，无单点服务器；入站邮件由 Email Routing 接收并解析，出站经 Resend 通道；全部状态落于部署者自己的 Cloudflare 资源之内。*

## 1. 专案定位

自建邮件系统需要长期维护的服务器、固定 IP 与反垃圾邮件治理；商业邮箱服务则将资料集中于服务商手中，使用者难以核实其处理方式。EpoCanvas Mail 采用第三种路径：把整套服务压缩进 Cloudflare 的按量额度之内（Workers 运算、D1 数据库、KV 缓存、R2 对象存储），以无服务器方式交付，固定服务器成本为零，源代码全部公开。

- 免运维：部署完成后无需维护操作系统与证书，扩容与全球加速由 Cloudflare 托管；
- 资料自主：自行部署实例的全部资料落于部署者自己的 D1 与对象存储，代码不内置任何遥测回传；
- 双轨使用：直接注册使用托管实例，或取得源代码部署于自有域名。两种形态下的数据控制者界定见[总览](/mail/overview/)第 2 节。

## 2. 核心功能概览

本专案功能横跨收发、整理、检索、自动化与开放平台，逐项说明与真实运行界面截图见[功能指南](/mail/features/)。要点：Cloudflare Email Routing 入站与多通道出站；八视图收件箱、会话线程与三栏分屏；高级搜索语法与分类规则引擎；Workers AI 验证码提取与保留排版的全文翻译；OAuth 2.0／OIDC 认证中心与个人 API 令牌；数据导出（JSON 与 .eml）。

专案的界面骨架与全部路由逐项导览于[界面与路由总览](/mail/interface/)；搜索算子与分类规则引擎的完整参考见[搜索与规则参考](/mail/search/)。
## 3. 技术架构概览

服务端运行于 Cloudflare Workers（V8 Isolate 无状态沙箱），数据落于双 D1 物理隔离（用户库与邮件库，单库部署 100% 向后兼容）、KV 与对象存储（自备 S3、配置 S3、R2、KV 四级解析）；入站经 Email Routing，出站经 Resend／Mailjet 等通道，AI 能力由 Workers AI 承载。完整拓扑、加密体系、角色配额与邮件生命周期见[技术架构](/mail/architecture/)。

## 4. 适合谁与不适合谁

下列情形适合选用本专案：

- 已持有域名与 Cloudflare 帐号，希望以零固定服务器成本运行个人或小团队邮箱者；
- 希望源代码可审计、资料全程落于自己帐号内之自托管使用者；
- 需要多信箱隔离、自动分类与验证码即时提取以处理注册邮件的个人用户。

下列情形应评估替代方案：

- 需要承诺可用率、正式技术支持或长期归档留存之企业场景：本服务不承诺服务水平协议，回收站邮件自收受之日起 7 日实体删除（见[服务条款](/mail/terms-of-service/)第 8 节）；
- 以大量外发营销为主要用途者：可接受使用政策禁止未经请求之大量商业邮件（见[可接受使用政策](/mail/acceptable-use/)第 3 节）；
- 需要端对端加密之通信者：本服务之加密为服务器端静态加密且不涵盖附件（见[数据处理与安全维护](/mail/data-security/)第 1 节）；
- 无意愿维护 Cloudflare 资源、域名与密钥配置者：自行部署仍需完成密钥注入与初始化（见第 8 节）。

## 5. 安全设计概览

密码经 PBKDF2-HMAC-SHA256（100,000 次迭代）加盐哈希，TOTP 密钥以 AES-256-GCM 静态加密；邮件 URL 采用 HMAC-SHA256 签名之 20 位随机 Hash 防越权与防枚举；XSS 三重防御与 SSRF 阻断；官方邮件不可变快照投递。上述措施于 2026 年 9 月 22 日全量安全加固中闭环（43 项自动化断言全绿）；完整清单见[技术架构](/mail/architecture/)第 7 节，面向个人之告知与保存期限见[数据处理与安全维护](/mail/data-security/)。

## 6. 开发历程与提交链路

专案自 2026 年 7 月 21 日首次提交（`2bbb582`）起持续开发。截至 2026 年 10 月 5 日，主仓库累计逾 660 个提交；本站（EpomailDocs，独立 git 仓库）另有逾 50 个提交（下列链路为里程碑粒度，其间与之后的提交见 GitHub）。下表按阶段列出里程碑与锚点提交（短 Hash）：

| 阶段 | 时间 | 交付内容 | 锚点提交 |
| --- | --- | --- | --- |
| 1. 专案奠基 | 2026-07-21 → 07-23 | 仓库初始化；Vue 3 界面第一阶段（全局色板、字体、明暗侧栏）；Outlook 风格三栏分屏阅读 | `2bbb582` `29f9896` `a531341` |
| 2. 品牌与登录面 | 2026-08-05 → 08-09 | 透明 Logo 与 favicon 统一；默认暗色主题与品牌加载动画；React 登录面与太空跃迁动画 | `6572695` `e3e57c6` |
| 3. 原型落地与规则引擎 | 2026-08-12 → 08-17 | 原型界面全量应用；标签体系与后端同步；延后／垃圾／垃圾箱；分类规则引擎（默认模板、启发式、黑白名单硬拦截）；高级搜索语法；分类分析仪表盘；防爆破锁定 | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. 编辑器与欢迎邮件 | 2026-08-28 → 08-30 | 全员欢迎邮件大弹窗；TinyMCE Alloy 工具栏 17 项 Markdown 工具重构 | `9f6ece8` `59bfe60` |
| 5. 开放平台与存储治理 | 2026-09-03 → 09-06 | OAuth 2.0／OIDC 认证中心；双 D1 物理隔离；B2／S3 自备存储与配额计量；存储与核心数据库管理中心；6 大核心管理组权限与参观者沙箱 | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. AI 能力体系 | 2026-09-06 → 09-13 | Gmail 收件架构与 AI 全文翻译；300+ 离线矢量图标；AI Hub 多模型池与 0-Token 测速；多片并发翻译与图片 OCR 字幕 | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. 权限收敛与安全修复 | 2026-09-09 → 09-11 | GitHub Release v1.1.0；跨域名提权零日修复；多域名管理员登录；第三方应用与数据共享面板 | `7558fc8` `5855db1` `3234d69` |
| 8. 六语言国际化 | 2026-09-14 → 09-17 | 全专案六语言与零泄漏字典；邮件模板按收件人语言投递；全量推送 GitHub；生产 Cloudflare 正式上线 | `aa1955e` `42c33f1` `25985b1` |
| 9. 两步验证与审计加固 | 2026-09-18 → 09-22 | TOTP／Passkey 登录；全新部署引导链与密钥隔离；UI 全面审计修复批次；全量安全加固 | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Gmail 级体验对齐 | 2026-09-25 → 09-27 | 邮件详情排版分层；内联回复与表情回应；会话线程优化；Gmail 式路由与深链；密码学 Hash 防越权路由 | `a8d841a` `4af2985` `4b371a8` |
| 11. 法律文档站 | 2026-09-27 → 09-29 | 本站六语言七篇法律文档；Google 政策范式增补；Astro 5 + Starlight 站点化；独立 git 仓库 | `2bed02b` `617cccf` |
| 12. 定稿与上线审计 | 2026-09-29 → 09-30 | 专案介绍页与官方隐私政策整合；v5.0 去条号立场全量重写；上线前技术事实校准与第三方清单增补 | `7ad5ebc` `05c222c` `5197f50` |
| 13. 文档站持续运营 | 2026-10-01 → 10-04 | 本地演示实例与播种工具；v5.8 视觉与入口打磨；v5.9 功能指南／技术架构扩充（×6 语言）与真实产品截图；v5.9 独立审计全量对码 | `26f6c3b` `8a60539` |
| 14. 审计治理与介绍扩充 | 2026-10-04 → 10-05 | v5.10 独立审计治理（全量对码修订、en 纳入结构对称）；v5.11 运行模式／设置指南两新页（×6 语言、真实产品截图）；审计控制台重构（RBAC 与 D1 持久化）与 OAuth 特性开关 | `08448fb` `ff4e93f` `596e7c1` |

主仓库的完整里程碑锚点链（40 位全量 Hash，可于 GitHub 提交历史逐条核验）：

```text
2bbb582e19b8a1aca410767a5b5c52ae5d7f4423  2026-07-21  init: initial commit before UI/UX updates
29f98962399ec85c894fbc02ff6ef69d7d496222  2026-07-23  feat(ui): implement 3-column split view layout for mail reading
65726950939d72d82dbaccd974ff1a75ffe1b226  2026-08-06  feat: default dark theme & apply brand loading animation
e3e57c69a6154bc13218be27a6537711e0a21527  2026-08-09  Enhance: Upgrade collision warning to a high-tech sci-fi HUD
8664f84cce7d2fdb038322f8bf66c5189f93f33d  2026-08-12  Phase 1: Refactor UI/UX colors and layout to match prototype style
803b0e05d2d55bbcbb3b0f4d4279524c31524c21  2026-08-13  feat: implement advanced search syntax and highlighting
0b7e37d953e2a25ff74dcf313272632fb60ba9c8  2026-08-13  fix(labels): ensureDefaultRules injection + system rule lock UI + real heuristic engine
643edea268fb8dc4f67b4bfe17db49025f6c7662  2026-08-15  feat(ui): phase 3 - classification management analytics dashboard
79f200fcb1a401e08c4d89ff94b8c3a65b51aef0  2026-08-16  feat: enhance login UX with toast and 12h anti-brute force lockout
9fd02b75dcaa31e1c12c2424b3b9c52b19eab203  2026-09-03  feat(oauth): 管理员专属 OAuth 开放平台与应用管理独立分区上线及个人资料解耦清退
2cc2801ccec3d9ee07d5b1688f2af652d7dc25a2  2026-09-03  feat(db): introduce dual-db physical isolation architecture with 100% single-db backward compatibility
b1a6a0ebe02a5bb196bf5da601a182f022ab1664  2026-09-03  feat(storage): implement Backblaze B2 and S3 object storage with pure WebCrypto SigV4 presigner
6c5bda2b794fef6f9467a5d880ae2fede77824cd  2026-09-04  feat(db): 系统设置「存储与核心数据库」管理中心上线与第三方DB配置体系全量重构
f09c963752e731d3e308893fa6ed09d1212713e8  2026-09-06  feat(role): 细化6大核心管理组权限控制规范、开源参观者沙箱交互、博客等级联动与UI架构透视全景上线
deceaaa5b3e7589c63c2240df97b020bab5c2c14  2026-09-06  feat(content): 学习Gmail收件UI架构，升级to-me详情卡片、顶部操作栏与AI全文翻译及管理面板API密钥集成
56768378f4d83b9eb70e65376930cfa16db16209  2026-09-07  feat(icons): 系统级全量300+离线矢量图标重构、零网络请求秒开与满Icon状态闭环
d103cd4edd4fbedbeaec669fc068bed2c5648dfa  2026-09-08  feat(ai-hub): automated dropdown model detection, multi-model pool role hierarchy, and real prompt live test response
aa1955eeb1b564f11a370892c48ea94f7c21015f  2026-09-14  feat: 全专案主流多语言支持(正体中文/法/西/荷)、多语言欢迎邮件、网站公告全域公告邮件
25985b1d0ca1c71e59222a3ecb3a9c53532834ef  2026-09-17  fix(prod): 生产环境Cloudflare正式上线、Playwright真机视觉全链路核验、Vue-i18n转义与抽屉缺陷修复
b0251537e0a56b7d3b80f794ce79ff839871f945  2026-09-18  feat(auth): 登录界面两步验证 (TOTP/Passkey) 流体动效与丝滑交互重构
5cfdaf910bd628d183f0b6d102134d1042f2e7df  2026-09-19  fix(core): 三大核验缺陷全量修复、全新部署引导链重构与密钥安全体系隔离
7ee3a66d5fb17c44983ff2b7f35534d82c815524  2026-09-22  fix(security): 全量安全加固与漏洞闭环——P0/P1/P2防护/SSRF阻断/XSS三重防御/会话脱敏/权限对齐
a8d841a13c3a0aa31b72c1d82580f2e9c7a1e561  2026-09-25  feat(ui): 对齐 Gmail 邮件详情排版分层与悬浮快捷回复体验
4b371a834458cb2be6ab5766ec15e99a91bc2022  2026-09-27  feat(routing): 严格对齐 Gmail 多账户隔离与密码学 Hash 防越权路由架构
617cccf855a0bd9a0a46d37deaceacc4a8b0ddde  2026-09-29  docs(repo): EpomailDocs 独立为专用 git 仓库，自父仓库解除追踪
4cf8014279669dbc67ff54ceb47239044c943ac8  2026-10-03  docs(checklist): 归档 EpomailDocs v5.8 视觉与入口打磨轮流水（EpomailDocs a1c1e89——翻页卡图标/表格居中/Accept-Language 协商）
8a60539d318eef618b84aa0db4e8a88672c4940d  2026-10-04  docs(checklist): 归档 EpomailDocs v5.9 专案文档拆分扩充轮流水（EpomailDocs beb956a——功能指南/技术架构两新页×6 语言、真实产品截图、内容栏居中根治、本地演示实例）
26f6c3b9750b2bad1c60f35a9a08b4db11dc1a6b  2026-10-04  feat(demo): 本地演示实例播种工具——seed-demo.py 演示邮件生成器与 wrangler-demo.toml 本地配置忽略
33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查
21af692803770c94ac2cfbdec5c32624e45754ce  2026-10-03  feat(sys-setting): 新增底层特性开关 ENABLE_OAUTH_INTEGRATION 并默认关闭隐藏第三方认证设置
73a2561d3e91867a2b9e442bebe8366a639b5914  2026-10-04  feat(audit): refactor audit console to user-list standards with RBAC and D1 persistence
596e7c1f4e4d022f3573917cfd56f72b65ae0136  2026-10-05  docs(checklist): 归档 EpomailDocs v5.11 专案介绍扩充轮流水（EpomailDocs ff4e93f+c597fca——运行模式/设置指南两新页×6 语言、9 张真实产品截图、全站 5.11 版本同步、本地视觉验证全绿）
```

本站（EpomailDocs 独立仓库）的提交链路：

```text
fd57a71ab71d99ff61b83a9a7c4f4b191dd96b99  2026-09-28  feat: initial commit for epomail-docs with open-source and legal compliance documentation
5208abc054626e305a5caac3e7320219706e3785  2026-09-29  docs(legal): 法律文档站 v4.1——台湾法域全量定稿（6 语言 × 7 篇 × 42 页）
5fb18df6a9c317bf064b477d143a53eb0d54bf07  2026-09-29  docs(visual)+chore: aup-ladder.svg 布局重构消除遮挡，视觉验收与归档流水
270cfd12c365b406661b5f40219740547d2b7d99  2026-09-29  fix(site): 补全根路径跳转页，/ 404 → 六语言总览入口
7ad5ebc1bc3b2846d0932c872ef7666b0d07d6bb  2026-09-29  docs(project): 新增六语言专案介绍页——定位、功能、架构、安全与完整提交链路
5cc2b2f12d00f195d0e84cea34911f1b3390ce6b  2026-09-28  feat(legal): integrate official privacy policy and technical baseline spec
d7beca35a2db489e75ff865435f95f20e68fd27f  2026-09-28  docs(audit): enrich architecture & legal compliance per subagent audits
d3d1d309888f92e7c30c217c13a4f5b02781202b  2026-09-29  docs(repo): 采纳远端旧结构文档线为历史祖先，树以本地六语言法律文档站为准
05c222c4ff2531dc17b29994c0806ade1ed99ed0  2026-09-29  docs(legal): 法律文档站 v5.0——全站去条号引用，六语言 × 7 篇 × SVG 配图全量同步
52412e393613a8b2763d133a95f6a3205e8cb6ce  2026-09-30  docs(legal): v5.1 独立审计修订——第三方清单增补博客等级联动披露、时效数据校正与工具补盲
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): 上线前审计修订——系统邮件不可变投递事实校准、AI 翻译预置模板披露、robots.txt
79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 内容完善——正式版本条款全站覆盖、专案介绍增补适用边界与常见疑问
90c06edcdd29a90a991bd56ba480c031cf85a9cf  2026-09-30  docs(legal): v5.3——独立复审缺陷治理与发布链路定案（docs.epocanvas.com/epomail）
6da475e6a7bd1f892e00165031ad94d5bacdb872  2026-10-01  docs(legal): v5.4 内容完整性补齐——配图全覆盖、术语补定义、保留期缺项与引用精度
3223e7d6181a6b82192f225eaded3ed8ddab0a56  2026-10-01  feat(legal): integrate official mail specifications and complete anti-tampering verification engine
e6eb758709b6702b3b51fddb1057bee94380a3e7  2026-10-03  docs(legal): v5.7 全站去幻觉与六语言深度整合——源码事实校准、en 九篇 1:1 重译、配图扁平化重绘
c5de61f5e1330726fe31257588ee21fdec178d8e  2026-10-03  feat(figures): 十二张原理图全量六语言本地化——每种语言的文档配该语言的图
fcc1d10f9616b905e1c6b89ccb4e6f8ac953c476  2026-10-03  docs(legal): v5.8 独立复审打磨——P1/P2 全项治理、八项补章、全站单 h1 与首次公网发布
a1c1e89c4e8b85579346304df3d5b37d197b68db  2026-10-03  feat(ui)+feat(infra): v5.8 视觉与入口打磨——翻页卡文档图标、表格居中与 Accept-Language 入口协商
beb956a1b50b5c4b94d3bbc9b9feba8ef774417a  2026-10-03  feat(docs): v5.9 专案文档拆分扩充——功能指南/技术架构两新页 ×6 语言 + 真实产品截图 + 内容栏居中
e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a
68a014ce25cca575ec348f68db746419fd19e2ce  2026-10-04  chore: sync manifest commit hash for 08448fb
08448fb63b011699b129e69266e7150a2174a49e  2026-10-04  feat(docs): v5.10 独立审计治理轮——P1×3 全量对码修订、P2 全项落地、en 纳入结构对称校验
ff4e93f7bb9da6ee1a4729cb2d826b1993fe5167  2026-10-05  feat(docs): v5.11 专案介绍扩充——运行模式/设置指南两新页 ×6 语言与真实产品截图全量入库
c597fca8b14005a6fc7a3482d683b9a2937c55d8  2026-10-05  chore: sync manifest commit hash for ff4e93f
```

上表与上方锚点链为里程碑粒度；阶段之间的全部日常修复、测试与文档提交均保存于 git 历史，可经 [GitHub 提交历史](https://github.com/shijianus/epomail/commits)逐条追溯。主仓库另设 `CHECKLIST.log`（任务执行流水）与 `REPORTS.md`（专项审计报告）两份归档，与提交一一对应。

## 7. 质量保障

- `tests/` 目录含 逾百个自动化测试、审计与巡检脚本，覆盖 Playwright 全真栈浏览器回归、生产环境公网端到端断言与全仓静态扫描；
- 代表性量化核验：安全加固 43／43 断言、公网路由端到端 32／32、六语言登录面 62／62、感官巡检 33／33、生产完整性 369 项逐字节比对；
- 多语言静态审计三件套：`i18n-symmetry`（六语言键集绝对对称）、`i18n-audit`（字面量引用零缺失）、`i18n-hardcoded`（用户可见文本零未包裹硬编码）；
- 测试数据零残留：所有用例具备 `finally` 物理清理机制，数据库与 KV 无假数据；
- 开发流程遵循五步 SOP（范围确认、规范编码、全真栈测试、规范提交、置顶汇报），产出分流至 `CHECKLIST.log` 与 `REPORTS.md`。

## 8. 获取与部署

| 途径 | 说明 |
| --- | --- |
| 托管实例 | [mail.epocanvas.com](https://mail.epocanvas.com) 注册即用 |
| 自行部署 | 依下方三步部署于自有域名与 Cloudflare 帐号 |
| 源代码 | [github.com/shijianus/epomail](https://github.com/shijianus/epomail)（MIT 授权条款） |
| 移动应用 | Android 应用 epomail |

自部署最小步骤：

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

首次部署后访问 `/api/init/<jwt_secret>` 完成数据库初始化与六个标准角色的播种；生产密钥一律经 `npx wrangler secret put` 注入，本地开发使用 `.dev.vars`（不入库）。

自行部署的完整前置条件、初始化引导链与密钥注入见[部署指南](/mail/deployment/)；参与开发、审计与贡献的流程见[开发指南](/mail/development/)。
## 9. 常见疑问

**使用本服务需要付费吗？**
软件依 MIT 授权条款免费取用；自行部署之成本为部署者自有之 Cloudflare 用量。托管实例当前不设付费功能，信箱数量、发信量与存储配额依帐号角色设定。

**管理员能看到我的邮件吗？**
取决于实例采用之邮件模式：全部邮件模式下管理员得读取全部邮件；隐私模式下仅限垃圾、已删除与无主邮件；加密模式下管理界面不回传用户邮件。详见[隐私政策](/mail/privacy-policy/)第 10 节之加密范围说明。

**删除的邮件还能复原吗？**
回收站邮件自收受之日起 7 日后由系统实体删除，不可复原；需要留存者请先以「设置 → 数据导出」取得完整副本（见[隐私政策](/mail/privacy-policy/)第 8 节）。

**自行部署需要哪些准备？**
一个域名与一个 Cloudflare 帐号；部署步骤与密钥注入见第 8 节。全部资料落于部署者自己之 Cloudflare 资源内，代码不内置任何遥测回传。

## 10. 相关文档

| 资源 | 链接 |
| --- | --- |
| 每一界面的路由与元素 | [界面与路由总览](/mail/interface/) |
| 搜索算子与分类规则条件 | [搜索与规则参考](/mail/search/) |
| 自行部署的完整步骤 | [部署指南](/mail/deployment/) |
| 开发环境与工程流程 | [开发指南](/mail/development/) |
| 托管实例的服务内容与支持渠道 | [服务范围与支持](/mail/service-scope/) |
| 开源授权与自部署法律地位 | [开源与自行部署法律](/mail/open-source/) |
| 运行模式：部署形态、邮件模式与登录方式 | [运行模式](/mail/modes/) |
| 设置指南：个人设置与管理控制台 | [设置指南](/mail/settings/) |
| 隐私权与条款总览 | [总览](/mail/overview/) |
| 隐私政策 | [隐私政策](/mail/privacy-policy/) |
| 服务条款 | [服务条款](/mail/terms-of-service/) |
| 可接受使用政策 | [可接受使用政策](/mail/acceptable-use/) |
| 数据处理与安全维护 | [数据处理与安全维护](/mail/data-security/) |
| 第三方处理者清单 | [第三方处理者清单](/mail/sub-processors/) |
| 用语定义 | [用语定义](/mail/key-terms/) |
