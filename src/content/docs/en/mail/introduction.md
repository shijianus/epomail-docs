---
title: EpoCanvas Mail Documentation Site Introduction
description: EpoCanvas Mail documentation site introduction — site positioning, documentation architecture, reading paths, multilingual structure and complete navigation.
---

**Site Launch: September 28, 2026 | Current Version: v5.17 | Site URL: docs.epocanvas.com/epomail**

**Effective Date: October 5, 2026 | Version: 5.17**

The EpoCanvas Mail documentation site (hereinafter "this site") is the official documentation hub for the EpoCanvas Mail open-source email service, covering legal terms, technical specifications, usage guides and development documentation. Built with Astro 5 + Starlight, the site maintains complete structural symmetry across six languages (Simplified Chinese, Traditional Chinese, English, Français, Español, Nederlands), with every document verified word by word against the code implementation, providing hosted-instance users, self-hosters and audit participants with a single source of truth. This page explains the site's positioning, documentation architecture, reading paths and navigation entry points.

The legal documents on this site are authoritative in their Traditional Chinese (Taiwan) version; other language versions are reference translations. In case of discrepancy, the authoritative version prevails.

![EpoCanvas Mail documentation architecture: the legal-documentation layer (privacy policy, terms of service, acceptable use policy and data-governance documents) and the technical-documentation layer (project introduction, feature guide, technical architecture, operating modes and usage guides) together form a complete documentation system, all grounded in open-source code and transparent specifications](/images/mail/en/legal-architecture.svg)

*Figure: Documentation architecture. The legal-documentation layer defines data processing and service boundaries; the technical-documentation layer explains features, architecture and usage; both layers are grounded in the open-source code implementation.*

## 1. Site Positioning

This site is the sole official documentation for the EpoCanvas Mail open-source project, serving three functions:

- **Legal notice**: privacy policy, terms of service, acceptable use policy and data-processing specifications, fulfilling statutory notice obligations to hosted-instance users; self-hosters may use this site's documentation as a baseline template for their own notices and terms;
- **Technical specification**: technical architecture, security design, development history and complete commit trail, allowing audit participants to verify the consistency between code implementation and documented commitments;
- **Usage guide**: feature descriptions, interface navigation, search syntax, deployment steps and development workflow, helping users, operators and developers understand and use the service.

This site's documentation is grounded in the actual implementation of the open-source code and prohibits fabrication; legal citations use the `doc/legal-reference.md` verification whitelist; technical facts (encryption semantics, retention periods, sub-processor list) are continuously verified by automated tests and audit scripts.

## 2. Documentation Architecture

This site is organized into three groups of documents, which cross-reference each other and together form a complete set of agreements:

### 2.1 Product & Overview

| Document | Contents |
| --- | --- |
| [Project Overview](/en/mail/project/) | Positioning, core features, technical architecture overview, development history and complete commit trail |
| [Service Scope & Support](/en/mail/service-scope/) | Service boundaries, disclaimer and contact channels for the hosted instance |
| [Interface & Route Map](/en/mail/interface/) | Complete interface navigation and route mapping for inbox, compose, settings and admin console |

### 2.2 Usage Guide

| Document | Contents |
| --- | --- |
| [Feature Guide](/en/mail/features/) | Inbox organization, composing and sending, search syntax, label rules, verification-code extraction, forwarding/push and AI capabilities |
| [Operating Modes](/en/mail/modes/) | Deployment forms, three-tier mail-mode privacy levels, identity groups and quotas, sign-in and two-step verification |
| [Settings Guide](/en/mail/settings/) | Five personal-settings sections (profile, general, security, data, labels) and nine admin-console sections |
| [Search & Rules Reference](/en/mail/search/) | Complete reference for search operators, admin-side retrieval and classification rule conditions |
| [Mailbox Interface & Message Detail](/en/mail/mailbox/) | Inbox views, three-column split, conversation threads and message-detail page item by item |
| [Labels & Classification Management](/en/mail/labels/) | Label taxonomy, classification rule engine, black/white lists and global governance tools |
| [Personal Data & General Settings](/en/mail/preferences/) | Profile cards, address cards, interface language, theme wallpaper and reading preferences |
| [Data Export & Storage](/en/mail/data/) | JSON full-copy export, .eml single-message download and storage-usage management |
| [Account Security Guide](/en/mail/security/) | Username and password, two-step verification center (TOTP, backup recovery codes, passkeys) and trusted devices |
| [Notifications & Forwarding Guide](/en/mail/notify/) | Personal forwarding, Telegram push and global forwarding rules configuration and behavior |
| [Analytics](/en/mail/analysis/) | Data visualization dashboards, user growth and mail classification statistics |
| [User List](/en/mail/users/) | Account management, role groups, sending quotas and ban/restore operations |
| [Full-Store Mail Review](/en/mail/review/) | Admin-side mail retrieval, spam governance and visible scope constrained by mail mode |
| [Permissions](/en/mail/roles/) | Six identity groups, storage quotas, sending limits and AI authorized models |
| [Registration Keys](/en/mail/regkeys/) | Invite code generation, usage-count limits and expiry management |
| [System Settings Cards](/en/mail/system/) | Item-by-item description of nine configuration cards: site settings, personalization, storage, push and open platform |
| [Open Platform & API Access](/en/mail/api/) | OAuth 2.0 / OIDC authentication center, application registration, endpoint access and personal API tokens |
| [Classification](/en/mail/category/) | Global classification rules, sender blacklist and subject-keyword blacklist |
| [Operation Reports](/en/mail/audit/) | Audit alert tickets, risk-control adjudication, ban appeals and timestamp stripping linked to mail mode |

### 2.3 Technology & Trust

| Document | Contents |
| --- | --- |
| [Technical Architecture](/en/mail/architecture/) | Cloudflare edge deployment topology, dual-database isolation, three-mode encryption system, attachment storage chain and application security design |
| [Anti-Tampering & Official Specs](/en/mail/tamper-proof/) | Official-mail specifications and identification, official authentication mark, immutable delivery and document anti-tampering verification |

### 2.4 Self-Hosting & Development

| Document | Contents |
| --- | --- |
| [Deployment Guide](/en/mail/deployment/) | Complete steps for self-hosting, prerequisites, initialization flow and secret injection |
| [Development Guide](/en/mail/development/) | Development environment, engineering workflow, test and audit scripts, commit conventions and contribution guidelines |

### 2.5 Privacy & Data Governance

| Document | Contents |
| --- | --- |
| [Overview](/en/mail/overview/) | Platform identity, data-processing role definition, documentation architecture, order of precedence and contact points |
| [Privacy Policy](/en/mail/privacy-policy/) | Collection, processing and use of personal data, processing nature, data-subject rights and international transfers |
| [Data Processing & Security](/en/mail/data-security/) | Data lifecycle, processing matrix, security-maintenance measures, incident response and inspection cooperation |
| [Sub-processors](/en/mail/sub-processors/) | Sub-processors, sharing recipients, data involved and international-transfer safeguards |

### 2.6 Terms & Compliance

| Document | Contents |
| --- | --- |
| [Terms of Service](/en/mail/terms-of-service/) | Contractual conditions for service use, rights and obligations, limitation of liability, governing law and jurisdiction |
| [Acceptable Use Policy](/en/mail/acceptable-use/) | Behavioral boundaries, prohibited-conduct list and operator enforcement procedures |
| [Open-Source & Self-Hosting Legal](/en/mail/open-source/) | MIT license applicability, data-controller responsibility for self-hosting and disclaimer |
| [Key Terms](/en/mail/key-terms/) | Definitions of technical and legal terms used in this site's legal documentation |

## 3. Reading Paths

This site is organized around two complementary paths:

**Path 1: Understanding the project, preparing for deployment or learning to use**

[Project Overview](/en/mail/project/) → [Feature Guide](/en/mail/features/) → [Operating Modes](/en/mail/modes/) → [Interface & Route Map](/en/mail/interface/) → [Search & Rules Reference](/en/mail/search/) → [Settings Guide](/en/mail/settings/) → [Deployment Guide](/en/mail/deployment/) → [Development Guide](/en/mail/development/)

**Path 2: Understanding privacy-legal agreements and service boundaries**

[Overview](/en/mail/overview/) → [Privacy Policy](/en/mail/privacy-policy/) → [Terms of Service](/en/mail/terms-of-service/) → [Acceptable Use Policy](/en/mail/acceptable-use/) → [Data Processing & Security](/en/mail/data-security/) → [Sub-processors](/en/mail/sub-processors/)

The two paths converge at [Feature Guide](/en/mail/features/) and [Operating Modes](/en/mail/modes/).

## 4. Multilingual Structure

This site provides six languages with 1:1 structural symmetry:

| Language | Identifier | Description |
| --- | --- | --- |
| Simplified Chinese | `zh` | Site default language, occupies URL root path (`/epomail/mail/...`) |
| Traditional Chinese (Taiwan) | `zh-tw` | Authoritative version for legal documents; other languages are reference translations (`/epomail/zh-tw/mail/...`) |
| English | `en` | Reference translation (`/epomail/en/mail/...`) |
| Français | `fr` | Reference translation (`/epomail/fr/mail/...`) |
| Español | `es` | Reference translation (`/epomail/es/mail/...`) |
| Nederlands | `nl` | Reference translation (`/epomail/nl/mail/...`) |

The site homepage (`/` and `/epomail/`) negotiates language via Cloudflare Pages Functions based on the browser's `Accept-Language` header, automatically redirecting to the corresponding language's [Overview](/en/mail/overview/) page. The legacy root path `/mail/...` redirects to the canonical path with language negotiation.

The number of documents, heading hierarchy, table rows and columns, number of images and alert boxes must be strictly identical for each language, verified automatically by `scripts/check-structure.py`. Version numbers and effective dates are unified site-wide.

## 5. Documentation Quality Assurance

This site's documentation is assured by the following mechanisms:

- **Code implementation verification**: technical facts (encryption semantics, retention periods, sub-processor list, role quotas) are grounded in the epomail repository source code and fabrication is prohibited;
- **Legal citation whitelist**: `doc/legal-reference.md` is the sole source for legal citations site-wide; only article numbers verified in this list may be cited;
- **Structural symmetry check**: `scripts/check-structure.py` verifies that the six-language documents' headings, tables, images and alert-box counts are strictly identical;
- **Anchor integrity**: `scripts/validate-anchors.cjs` scans site-wide anchors and image references, ensuring zero broken links;
- **Zero-error build**: `pnpm build` must pass with zero errors; any warnings or errors block publication;
- **Anti-tampering verification**: official documents are HMAC-SHA256 signed and delivered via immutable snapshots, see [Anti-Tampering & Official Specs](/en/mail/tamper-proof/).

## 6. Site Technology Stack

| Component | Implementation |
| --- | --- |
| Static generation | Astro 5.0 + Starlight 0.32 |
| Route negotiation | Cloudflare Pages Functions (`functions/_lib.js` shared language-negotiation logic) |
| Deployment | Cloudflare Pages (`npx wrangler pages deploy dist --project-name epomail-docs`) |
| Build artifacts | Dual-track publication: `dist/*` root path and `dist/epomail/*` subpath mirror (`scripts/post-build.mjs` executes) |
| Style system | Custom CSS (`src/styles/custom.css`, 627 lines), aligned with EpoCanvasDocs indigo-tech color scheme |
| Icons & assets | 300+ offline vector icons, light/dark dual themes, six-language localized illustrations (`/images/mail/{zh-tw,en,es,fr,nl}/*.svg`) |

## 7. Related Resources

| Resource | Link |
| --- | --- |
| Hosted instance | [mail.epocanvas.com](https://mail.epocanvas.com) |
| Source code | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) |
| Documentation site source code | EpomailDocs independent git repository (this site's build artifact) |
| Privacy contact | privacy@epocanvas.com |
| In-product contact | In-site message or admin@epocanvas.com |
| Open-source project issues | GitHub repository Issues |
