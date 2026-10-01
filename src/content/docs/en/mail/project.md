---
title: EpoCanvas Mail Project Overview
description: A complete introduction to the EpoCanvas Mail project—positioning, core features, technical architecture, security design, development history, and the full commit chain.
---

**First commit: July 21, 2026 | Current version: v1.1.0 | License: MIT**
**Effective date: October 1, 2026 | Version: 5.4**

EpoCanvas Mail is an open source email service running on the Cloudflare edge network. With one domain and one Cloudflare account, you can set up a personal mailbox service that supports sending and receiving email, attachments, and multi-device access. The project is operated as a hosted instance at [mail.epocanvas.com](https://mail.epocanvas.com), publishes its full source code for self-hosting, and ships a companion Android app (epomail). This page describes the project's positioning, features, technical architecture, security design, and development history; the legal terms of the service and privacy practices are set out in the [Privacy and Terms Overview](/en/mail/overview/).

The Traditional Chinese (Taiwan) versions of the legal documents on this site are the authoritative versions; translations in other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version shall prevail.

![EpoCanvas Mail system architecture: the client layer (web app, Android app, OAuth third-party apps) connects through the Cloudflare edge; Workers carry the API, inbound email parsing, and AI capabilities, with outbound delivery via Resend and Telegram; data is stored in dual D1 databases, KV, and object storage](/images/mail/project-architecture.svg)

*Figure: System architecture. Clients connect through the edge with no single origin server; inbound email is received and parsed by Email Routing, and outbound delivery goes through the Resend channel; all state is stored in the deployer's own Cloudflare resources.*

## 1. Positioning

Running your own mail system calls for a long-term maintained server, a fixed IP, and anti-spam operations; commercial mailbox services concentrate your data in the provider's hands, and users can hardly verify how it is handled. EpoCanvas Mail takes a third path: the whole service fits inside Cloudflare's metered free tier (Workers compute, D1 databases, KV cache, R2 object storage), delivered serverlessly, with zero fixed server cost and fully open source code.

- No operations burden: after deployment there is no OS or certificate maintenance; scaling and global acceleration are handled by Cloudflare;
- Data ownership: all data of a self-hosted instance lives in the deployer's own D1 and object storage, and the code contains no telemetry of any kind;
- Two ways to use it: register on the hosted instance, or take the source code and deploy on your own domain. The allocation of data controller roles in each scenario is set out in Section 2 of the [Overview](/en/mail/overview/).

## 2. Core Features

Every feature below has been verified item by item against the repository source code, grouped by theme.

### 2.1 Sending, Receiving, and Mail Management

| Capability | Description |
| --- | --- |
| Inbound mail | Received through Cloudflare Email Routing, parsed by postal-mime for body and attachments |
| Outbound mail | Sent through the Resend API, supporting bulk sending, inline images, and attachments, with delivery status |
| Three mail modes | All, Private, and Encrypted modes; the encryption semantics and administrator visibility are described in [Data Processing and Security](/en/mail/data-security/) |
| Attachment storage | The instance's own object storage (resolved in order: BYO or configured S3-compatible storage, a Cloudflare R2 binding, defaulting to Cloudflare KV), with quota metering |
| Reading experience | Conversation threading, three-pane split view, inline reply, emoji reactions, snooze／spam／trash, and a raw header viewer |

### 2.2 Search and Classification

- Advanced search syntax: field filters such as `from`, `to`, and `subject` combined with free keywords, at two levels (site-wide search and in-page find), with hit highlighting based on the CSS Highlights API;
- Classification rule engine: built-in default templates (Community, Subscriptions, Promotions, Work), composable conditions and exceptions, blocklists and allowlists with hard interception, and a bypass switch for internal mail;
- Captcha extraction: Workers AI automatically extracts verification codes from email.

### 2.3 AI Capabilities

- AI Hub model pool: connects to OpenAI, Anthropic, DeepSeek, and other protocols; endpoints and models are detected automatically, with zero-token speed tests and per-role model authorization;
- Full-text translation: multilingual translation that preserves the original HTML layout of the email, with multi-chunk concurrent load balancing, OCR captions for images, and a configurable target language;
- Usage analytics: charts of AI call trends and model distribution, presented in the same analytics panel as system statistics.

### 2.4 Identity, Roles, and the Open Platform

- Account security: passwords are salted and hashed with PBKDF2-HMAC-SHA256 at 100,000 iterations; TOTP and Passkey two-step verification; a 12-hour brute-force lockout; Turnstile human verification;
- Role permissions: an RBAC system with 6 core administrative role groups; features, models, and quotas are narrowed per role, and visitors enter a read-only sandbox;
- OAuth 2.0 / OIDC authentication center: register third-party applications with the authorization code and client credentials flows; users can view and revoke third-party app grants in real time;
- Multiple domains: one instance can bind several email domains, with multi-domain administrator and alias sign-in.

### 2.5 Interface and Languages

- Six interface languages: Simplified Chinese, Traditional Chinese, English, Français, Español, Nederlands; the frontend and backend dictionaries are 100% symmetric across all six languages (key counts per the `scripts/i18n-*.mjs` static audit output), guaranteeing zero hardcoded user-visible strings;
- Multilingual email: welcome emails and system-wide announcement emails ship with six-language official templates; system emails are delivered in the version the administrator sent (an immutable snapshot); when reading, unmodified official emails render in your language locally from the preset templates, while modified ones fall back to AI translation;
- Interface details: 300+ offline vector icons (zero external requests), light and dark themes, responsive layout, PWA installation, and customizable site title and login background.

## 3. Technical Architecture

| Layer | Technology |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie, Vite 7, vite-plugin-pwa |
| Login shell | React 18, Tailwind CSS 4, Vite 6 (built separately, shipped with the frontend bundle) |
| Server | Hono 4.12, Drizzle ORM, postal-mime, i18next, Resend SDK |
| Platform | Cloudflare Workers, D1 (dual databases), KV, R2, Workers AI, Email Routing, Turnstile |
| External services | Resend (sending), Telegram Bot (push notifications), optional B2／S3-compatible storage |

The dual databases are physically isolated: `USER_DB` holds accounts, roles, and settings, while `MAIL_DB` holds mail and logs; single-database deployments remain 100% backward compatible. The repository is organized as follows:

| Directory | Responsibility |
| --- | --- |
| `mail-worker` | Backend: api (20 endpoint modules), service, dao, email (inbound processing), security, i18n, init (deployment bootstrap) |
| `mail-vue` | Frontend single-page application (PWA) |
| `temp_login_ui` | React login shell, built into the frontend `dist/login` |
| `EpomailDocs` | This legal documents site (Astro 5 + Starlight, a separate git repository) |
| `tests` | Over one hundred automated test, audit, and inspection scripts (Playwright full-stack, public end-to-end, static scans) |
| `scripts` | Toolchain including the i18n symmetry／reference／hardcoded audit trio |

## 4. Who This Suits and Who It Does Not

The project suits the following situations:

- Individuals or small teams that already hold a domain and a Cloudflare account and want a mailbox with zero fixed server cost;
- Self-hosting users who want auditable source code with all data staying inside their own account;
- Individual users who need multiple isolated mailboxes, automatic classification, and instant verification-code extraction for sign-up mail.

Evaluate alternatives in the following situations:

- Business scenarios requiring availability commitments, formal support, or long-term archival retention: the service offers no SLA, and trash email is physically deleted 7 days after receipt (see [Terms of Service](/en/mail/terms-of-service/), Section 8);
- Use cases centered on bulk outbound marketing: the Acceptable Use Policy prohibits unsolicited bulk commercial email (see [Acceptable Use Policy](/en/mail/acceptable-use/), Section 3);
- Communication requiring end-to-end encryption: encryption here is server-side encryption at rest and does not cover attachments (see [Data Processing and Security](/en/mail/data-security/), Section 3);
- Users unwilling to maintain Cloudflare resources, domains, and key configuration: self-hosting still requires secret injection and initialization (see Section 8).

## 5. Security Design

- Credentials and sessions: passwords are salted and hashed with PBKDF2-HMAC-SHA256 at 100,000 iterations; sessions are JWTs valid for 30 days, kept in KV and deeply redacted;
- Anti-tamper routing: mail URLs always use a 20-character random hash signed with HMAC-SHA256, bound to the user and tenant; sequential IDs are never exposed, ruling out enumeration and BOLA／IDOR tampering;
- Three-layer XSS defense: DOMPurify sanitization, body style injection filtering, and attachment output restricted to a MIME allowlist with a strict CSP and `nosniff`;
- SSRF blocking: outbound requests pass a public-address check; loopback, RFC 1918, and cloud metadata addresses are always rejected;
- Permission gateway: 137 routes with 100% authentication coverage; deleting an account revokes its KV session immediately.

These measures were closed out in the full security hardening of September 22, 2026 (remediation of P0／P1／P2 findings, 43 automated assertions all green). The notification duties toward individuals, retention periods, the third-party list, and data subject rights are described in [Data Processing and Security](/en/mail/data-security/) and the [Third-Party Processor List](/en/mail/sub-processors/).

## 6. Development History and the Commit Chain

The project has been under continuous development since the first commit on July 21, 2026 (`2bbb582`). As of September 30, 2026, the main repository holds more than 540 commits; this site (EpomailDocs, a separate git repository) holds 12 more (as listed below; later commits are on GitHub). The table below lists the milestones by phase with their anchor commits (short hashes):

| Phase | Period | Delivered | Anchor commits |
| --- | --- | --- | --- |
| 1. Foundation | 2026-07-21 → 07-23 | Repository initialization; Vue 3 interface phase one (global palette, typography, light and dark sidebar); Outlook-style three-pane split reading | `2bbb582` `29f9896` `a531341` |
| 2. Branding and login shell | 2026-08-05 → 08-09 | Unified transparent logo and favicon; default dark theme and branded loading animation; React login shell with the space-warp animation | `6572695` `e3e57c6` |
| 3. Prototype and rule engine | 2026-08-12 → 08-17 | Prototype interface applied in full; label system synced to the backend; snooze／spam／trash; classification rule engine (default templates, heuristics, blocklist hard interception); advanced search syntax; classification analytics dashboard; brute-force lockout | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. Editor and welcome mail | 2026-08-28 → 08-30 | Full-screen welcome email dialog; TinyMCE Alloy toolbar rebuilt around 17 Markdown tools | `9f6ece8` `59bfe60` |
| 5. Open platform and storage | 2026-09-03 → 09-06 | OAuth 2.0／OIDC authentication center; dual-D1 physical isolation; B2／S3 bring-your-own storage with quota metering; storage and database management center; 6 core role groups and the visitor sandbox | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. AI capabilities | 2026-09-06 → 09-13 | Gmail-style inbox architecture and AI full-text translation; 300+ offline vector icons; AI Hub model pool with zero-token speed tests; multi-chunk concurrent translation and OCR image captions | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. Permission tightening and security fixes | 2026-09-09 → 09-11 | GitHub Release v1.1.0; fix for the cross-domain privilege escalation zero-day; multi-domain administrator sign-in; third-party app and data sharing panel | `7558fc8` `5855db1` `3234d69` |
| 8. Six-language internationalization | 2026-09-14 → 09-17 | Project-wide six languages with zero-leakage dictionaries; email templates delivered in the recipient's language; full push to GitHub; production launch on Cloudflare | `aa1955e` `42c33f1` `25985b1` |
| 9. Two-step verification and audits | 2026-09-18 → 09-22 | TOTP／Passkey sign-in; rebuilt deployment bootstrap chain and secrets isolation; UI audit fix batches; full security hardening | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Gmail-grade experience | 2026-09-25 → 09-27 | Layered message detail layout; inline reply and emoji reactions; conversation threading improvements; Gmail-style routing and deep links; cryptographic hash anti-tamper routing | `a8d841a` `4af2985` `4b371a8` |
| 11. Legal documents site | 2026-09-27 → 09-29 | This site's six-language, seven-document legal set; Google policy paradigm expansion; Astro 5 + Starlight site build; separate git repository | `2bed02b` `617cccf` |
| 12. Finalization and pre-launch audit | 2026-09-29 → 09-30 | Integration of the project page and the official privacy policy; full v5.0 rewrite without article-number citations; pre-launch technical-fact calibration and supplement to the sub-processor list | `7ad5ebc` `05c222c` `5197f50` |

The complete milestone anchor chain of the main repository (full 40-character hashes, verifiable one by one in the GitHub commit history):

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

The commit chain of this site (the separate EpomailDocs repository):

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

The table and anchor chain above are at milestone granularity; every routine fix, test, and documentation commit between the phases is preserved in git history and can be traced one by one through the [GitHub commit history](https://github.com/shijianus/epomail/commits). The main repository also keeps two archival files, `CHECKLIST.log` (task execution log) and `REPORTS.md` (in-depth audit reports), matched one-to-one with the commits.

## 7. Quality Assurance

- The `tests/` directory holds over one hundred automated test, audit, and inspection scripts, covering Playwright full-stack browser regression, public end-to-end assertions against production, and repository-wide static scans;
- Representative quantified checks: security hardening 43／43 assertions, public routing end-to-end 32／32, six-language login surface 62／62, sensory inspection 33／33, and 369 item-by-item production integrity comparisons;
- The three-part static i18n audit: `i18n-symmetry` (absolutely symmetric key sets across six languages), `i18n-audit` (zero missing literal references), and `i18n-hardcoded` (zero unwrapped hardcoded user-visible text);
- Zero test data residue: every test case cleans up physically in a `finally` block; the database and KV hold no fake data;
- Development follows a five-step SOP (scope confirmation, disciplined coding, full-stack testing, disciplined commits, and top-of-reply reporting), with output routed to `CHECKLIST.log` and `REPORTS.md`.

## 8. Get the Project and Deploy

| Channel | Description |
| --- | --- |
| Hosted instance | Register and use [mail.epocanvas.com](https://mail.epocanvas.com) directly |
| Self-hosting | Deploy on your own domain and Cloudflare account in the three steps below |
| Source code | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) (MIT License) |
| Mobile app | The Android app, epomail |

Minimal self-hosting steps:

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

After the first deployment, visit `/api/init/<jwt_secret>` to complete database initialization and the seeding of the six standard roles; production secrets are always injected with `npx wrangler secret put`, and local development uses `.dev.vars` (never committed).

## 9. Frequently Asked Questions

**Does using this service cost anything?**
The software is free under the MIT license; the cost of self-hosting is your own Cloudflare usage. The hosted instance currently has no paid features; mailbox count, sending volume, and storage quotas are set by account role.

**Can the administrator read my email?**
It depends on the mail mode of the instance: in full-mail mode the administrator can read all email; in privacy mode only spam, deleted, and unowned email; in encrypted mode the admin interface does not return user email. See the encryption scope in the [Privacy Policy](/en/mail/privacy-policy/), Section 10.

**Can deleted email be recovered?**
Trash email is physically deleted by the system 7 days after receipt and cannot be recovered; keep a copy first via "Settings → Data Export" (see the [Privacy Policy](/en/mail/privacy-policy/), Section 8).

**What does self-hosting require?**
A domain and a Cloudflare account; the deployment steps and secret injection are in Section 8. All data stays within the deployer's own Cloudflare resources, and the code contains no telemetry.

## 10. Related Documents

| Resource | Link |
| --- | --- |
| Privacy and Terms Overview | [Overview](/en/mail/overview/) |
| Privacy Policy | [Privacy Policy](/en/mail/privacy-policy/) |
| Terms of Service | [Terms of Service](/en/mail/terms-of-service/) |
| Acceptable Use Policy | [Acceptable Use Policy](/en/mail/acceptable-use/) |
| Data Processing and Security | [Data Processing and Security](/en/mail/data-security/) |
| Third-Party Processor List | [Third-Party Processor List](/en/mail/sub-processors/) |
| Key Terms | [Key Terms](/en/mail/key-terms/) |
