---
title: EpoCanvas Mail Project Overview
description: A complete introduction to the EpoCanvas Mail project — positioning, core features, technical architecture, security design, development history, and the full commit chain.
---

**First commit: July 21, 2026 | Current version: v1.1.0 | License: MIT**

**Effective Date: October 3, 2026 | Version: 5.9**

EpoCanvas Mail is an open-source e-mail service running on Cloudflare's edge network. With just a domain and a Cloudflare account, you can set up your own mailbox supporting sending and receiving, attachments, and multi-device access. The project is operated publicly through the hosted instance [mail.epocanvas.com](https://mail.epocanvas.com), releases all source code for self-hosting, and ships a companion Android app (epomail). This page covers the project's positioning, features, technical architecture, security design, and development history; the legal terms of the service and privacy are in the [Privacy & Terms Overview](/en/mail/overview/).

The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The legal and technical documents on this site follow the open-source implementation of the service and aim to establish transparent, rigorous, non-commercial community communication norms.

![EpoCanvas Mail system architecture: the client layer (web app, Android app, OAuth third-party apps) connects through the Cloudflare edge; Workers host the API, inbound mail parsing, and AI features, with outbound delivery via Resend and Telegram; data lands in dual D1 databases, KV, and object storage](/images/mail/en/project-architecture.svg)

*Figure: the system architecture. Clients connect through the edge with no single-point server; inbound mail is received by Email Routing and parsed, outbound goes through the Resend channel; all state stays inside the deployer's own Cloudflare resources.*

## 1. Project Positioning

Self-hosted mail systems demand long-term maintained servers, fixed IPs, and anti-spam stewardship; commercial mailbox services concentrate data in the provider's hands, hard for users to verify. EpoCanvas Mail takes a third path: it fits the whole service inside Cloudflare's usage-based allowances (Workers compute, D1 databases, KV cache, R2 object storage), delivered serverlessly with zero fixed server cost and fully public source code.

- No ops: after deployment there is no OS or certificate upkeep; scaling and global acceleration are handled by Cloudflare;
- Data autonomy: all data of a self-hosted instance lands in the deployer's own D1 and object storage; the code has no telemetry built in;
- Two tracks: register on the hosted instance directly, or take the source code and deploy on your own domain. The definition of the data controller in each form is in Section 2 of the [Overview](/en/mail/overview/).

## 2. Feature Overview

The project spans sending and receiving, organisation, search, automation, and an open platform; a per-feature walkthrough with real interface screenshots is in the [Feature Guide](/en/mail/features/). Highlights: inbound via Cloudflare Email Routing with multi-channel outbound; an eight-view inbox with threads and a three-pane split; advanced search syntax and the classification rule engine; Workers AI code extraction and layout-preserving full-text translation; an OAuth 2.0 / OIDC centre and personal API tokens; and data export (JSON and .eml).

## 3. Architecture Overview

The server runs on Cloudflare Workers (stateless V8 Isolate sandboxes); data lands in dual physically isolated D1 databases (a user database and a mail database, with 100% single-database backward compatibility), KV, and object storage (a four-level chain: BYO S3, configured S3, R2, KV); inbound mail arrives via Email Routing, outbound goes through Resend / Mailjet and similar channels, and AI runs on Workers AI. The full topology, encryption scheme, role quotas, and mail lifecycle are in [Technical Architecture](/en/mail/architecture/).

## 4. Who It Suits — and Who Should Look Elsewhere

Choose this project when:

- you already hold a domain and a Cloudflare account and want to run a personal or small-team mailbox at zero fixed server cost;
- you want auditable source code and data that stays inside your own account as a self-hoster;
- you are an individual user who needs multi-mailbox isolation, automatic classification, and instant verification-code extraction for registration mail.

Evaluate alternatives when:

- you need a promised uptime, formal technical support, or long-term archiving for an enterprise scenario: the Service promises no SLA, and trash mail is hard-deleted 7 days after receipt (see Section 8 of the [Terms of Service](/en/mail/terms-of-service/));
- your main use is bulk outbound marketing: the Acceptable Use Policy forbids unsolicited bulk commercial mail (see Section 3 of the [Acceptable Use Policy](/en/mail/acceptable-use/));
- you need end-to-end encryption: this service's encryption is server-side encryption at rest and does not cover attachments (see Section 1 of [Data Processing & Security Maintenance](/en/mail/data-security/));
- you have no intention of maintaining Cloudflare resources, domains, and key configuration: self-hosting still requires key injection and initialisation (see Section 8).

## 5. Security Design Overview

Passwords are salted PBKDF2-HMAC-SHA256 hashes (100,000 iterations); TOTP secrets are encrypted at rest with AES-256-GCM; mail URLs use 20-character HMAC-SHA256-signed random hashes against privilege escalation and enumeration; XSS is handled by triple defence and SSRF is blocked; official mail is delivered as immutable snapshots. These measures were closed out in the 2026-09-22 full security hardening (43 automated assertions green); the complete list is in [Technical Architecture](/en/mail/architecture/), Section 7, and the notices and retention owed to individuals are in [Data Processing & Security Maintenance](/en/mail/data-security/).

## 6. Development History and Commit Chain

The project has been developed continuously since its first commit (`2bbb582`) on July 21, 2026. As of September 30, 2026 the main repository holds more than 540 commits; this site (EpomailDocs, a separate git repository) has 12 more (shown in the chain below; later commits are on GitHub). The table lists milestones and anchor commits (short hashes) by stage:

| Stage | Period | Delivered | Anchor commits |
| --- | --- | --- | --- |
| 1. Foundation | 2026-07-21 → 07-23 | repository init; Vue 3 interface phase one (global palette, fonts, light/dark sidebar); Outlook-style three-pane reading | `2bbb582` `29f9896` `a531341` |
| 2. Brand and login surface | 2026-08-05 → 08-09 | unified transparent logo and favicon; default dark theme and brand loading animation; React login surface with space-warp animation | `6572695` `e3e57c6` |
| 3. Prototype and rule engine | 2026-08-12 → 08-17 | prototype applied app-wide; label system synced with back end; snooze / spam / trash; classification rule engine (default templates, heuristics, block-list hard interception); advanced search syntax; classification analytics dashboard; brute-force lockout | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. Editor and welcome mail | 2026-08-28 → 08-30 | site-wide welcome-mail modal; TinyMCE Alloy toolbar rebuilt with 17 Markdown tools | `9f6ece8` `59bfe60` |
| 5. Open platform and storage governance | 2026-09-03 → 09-06 | OAuth 2.0 / OIDC authorization center; dual-D1 physical isolation; B2 / S3 bring-your-own storage with quota metering; storage and core-database admin center; six core admin groups and visitor sandbox | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. AI capability system | 2026-09-06 → 09-13 | Gmail-style inbox architecture and AI full-text translation; 300+ offline vector icons; AI Hub multi-model pool and 0-Token speed test; multi-chunk concurrent translation and image OCR captions | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. Permission tightening and security fixes | 2026-09-09 → 09-11 | GitHub Release v1.1.0; cross-domain privilege-escalation zero-day fix; multi-domain admin login; third-party app and data-sharing panels | `7558fc8` `5855db1` `3234d69` |
| 8. Six-language i18n | 2026-09-14 → 09-17 | six languages project-wide with a zero-leak dictionary; mail templates delivered per recipient language; full push to GitHub; production launch on Cloudflare | `aa1955e` `42c33f1` `25985b1` |
| 9. Two-step verification and hardening | 2026-09-18 → 09-22 | TOTP / passkey login; new deployment bootstrap chain and key isolation; UI audit fix batches; full security hardening | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Gmail-grade experience | 2026-09-25 → 09-27 | layered mail-detail layout; inline reply and emoji reactions; conversation-thread refinement; Gmail-style routing and deep links; cryptographic-hash anti-IDOR routing | `a8d841a` `4af2985` `4b371a8` |
| 11. Legal documents site | 2026-09-27 → 09-29 | this site's six-language seven-document legal set; Google policy paradigm additions; Astro 5 + Starlight site; separate git repository | `2bed02b` `617cccf` |
| 12. Finalisation and launch audit | 2026-09-29 → 09-30 | project overview page and official privacy policy integration; v5.0 full rewrite without article citations; pre-launch technical-fact calibration and sub-processor additions | `7ad5ebc` `05c222c` `5197f50` |

The main repository's full milestone anchor chain (40-character hashes, verifiable in the GitHub commit history):

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
```

This site's (EpomailDocs separate repository) commit chain:

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
```

The table and anchor chains above are milestone-granular; all routine fixes, tests, and documentation commits between stages are preserved in git history, traceable one by one via the [GitHub commit history](https://github.com/shijianus/epomail/commits). The main repository also keeps `CHECKLIST.log` (task execution log) and `REPORTS.md` (special-audit reports), matched one-to-one with commits.

## 7. Quality Assurance

- The `tests/` directory holds over a hundred automated test, audit, and inspection scripts covering Playwright full-stack browser regression, production public-network end-to-end assertions, and repository-wide static scanning;
- Representative verified figures: security hardening 43/43 assertions, public-route end-to-end 32/32, six-language login surface 62/62, sensory inspection 33/33, production integrity 369-item byte-by-byte comparison;
- The multilingual static-audit trio: `i18n-symmetry` (six-language key sets absolutely symmetric), `i18n-audit` (zero missing literal references), `i18n-hardcoded` (zero unwrapped hard-coded user-visible text);
- Zero test-data residue: all cases have `finally` physical cleanup; the database and KV hold no fake data;
- Development follows the five-step SOP (scope, implement, full-stack testing, disciplined commit, top-posted report), with output routed to `CHECKLIST.log` and `REPORTS.md`.

## 8. Getting and Deploying

| Route | Description |
| --- | --- |
| Hosted instance | register and use at [mail.epocanvas.com](https://mail.epocanvas.com) |
| Self-hosting | deploy on your own domain and Cloudflare account with the three steps below |
| Source code | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) (MIT license) |
| Mobile app | the Android app epomail |

Minimal self-hosting steps:

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

After the first deployment, visit `/api/init/<jwt_secret>` to initialise the database and seed the six standard roles; production secrets are always injected with `npx wrangler secret put`, and local development uses `.dev.vars` (not committed).

## 9. FAQ

**Does using this service cost anything?**
The software is free under the MIT license; self-hosting costs whatever the deployer's own Cloudflare usage amounts to. The hosted instance currently has no paid features; mailbox count, sending volume, and storage quotas are set per account role.

**Can the administrator read my mail?**
It depends on the instance's mail mode: in "All-mail" mode the administrator can read all mail; in "Private" mode only spam, deleted, and unassigned mail; in "Encrypted" mode the admin interface does not return user mail. See the encryption-scope note in Section 10 of the [Privacy Policy](/en/mail/privacy-policy/).

**Can deleted mail be recovered?**
Trash mail is hard-deleted 7 days after receipt and cannot be recovered; to keep something, first get a complete copy through "Settings → Data Export" (see Section 8 of the [Privacy Policy](/en/mail/privacy-policy/)).

**What does self-hosting require?**
A domain and a Cloudflare account; deployment steps and key injection are in Section 8. All data stays inside the deployer's own Cloudflare resources, and the code has no telemetry built in.

## 10. Related Documents

| Resource | Link |
| --- | --- |
| Privacy & Terms Overview | [Overview](/en/mail/overview/) |
| Privacy Policy | [Privacy Policy](/en/mail/privacy-policy/) |
| Terms of Service | [Terms of Service](/en/mail/terms-of-service/) |
| Acceptable Use Policy | [Acceptable Use Policy](/en/mail/acceptable-use/) |
| Data Processing & Security Maintenance | [Data Processing & Security Maintenance](/en/mail/data-security/) |
| Sub-processor List | [Sub-processor List](/en/mail/sub-processors/) |
| Key Terms | [Key Terms](/en/mail/key-terms/) |
