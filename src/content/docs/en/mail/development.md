---
title: Development Guide
description: The EpoCanvas Mail development guide — repository layout, local environment, test and inspection suites, the six-language discipline, migration discipline, the five-step workflow and how to contribute.
---

**Effective date: 5 October 2026 | Version: 5.17**

This page is for administrators and developers working on, auditing or building upon EpoCanvas Mail: the repository layout, the local environment, the quality-assurance system and the engineering workflow. The steps for running a deployment are in the [Deployment Guide](/en/mail/deployment/); they are not repeated here.

## 1. Repository layout

```text
epomail/
├── mail-vue/        Front end: Vue 3 + Vite + Element Plus (interface, i18n dictionaries, PWA)
├── mail-worker/     Back end: Cloudflare Worker (API, inbound parsing, AI, D1/KV/R2)
├── temp_login_ui/   Login surface: React app (folded into mail-worker/dist/login at build time)
├── tests/           Automated tests, public end-to-end assertions and inspection scripts
├── scripts/         Tooling (the i18n audit trio, seeding, build helpers)
├── doc/             Archive of long-form analyses
├── EpomailDocs/     This documentation site (a separate git repository)
└── CHECKLIST.log / REPORTS.md   Task log and audit archive
```

## 2. Local environment

```bash
pnpm install                      # install dependencies at the repository root
cd mail-vue && npm run dev        # front-end dev server
cd mail-vue && npm run build      # front-end build (delivery gate: zero warnings, zero errors)
cd mail-worker && npx wrangler dev  # local full stack (127.0.0.1:8787)
```

Local secrets live in `mail-worker/.dev.vars` (never committed; template in `.dev.vars.example`); after wiping `.wrangler/state`, visiting `/api/init/<jwt_secret>` seeds a complete demo dataset from zero, see the [Deployment Guide](/en/mail/deployment/), Section 3.

## 3. Tests and inspections

- The `tests/` directory holds over a hundred automated scripts: Playwright full-stack browser regressions, public-network end-to-end assertions against production, repository-wide static scans and byte-by-byte integrity comparisons;
- Representative figures: security hardening 43/43 assertions, public routing end-to-end 32/32, six-language login surface 62/62, production integrity 369 byte-for-byte comparisons;
- Interface or API changes must build first (`vite build` plus a Worker compile check) and then pass a local full-stack run; test data is always physically cleaned in `finally` blocks, leaving zero fake data in databases or KV.

## 4. The six-language discipline

The interface and back-end dictionaries support zh, zh-Hant, en, es, fr and nl with absolutely symmetric key sets. After adding or changing entries, the static audit trio must pass:

```bash
node scripts/i18n-symmetry.mjs      # six-language key sets absolutely symmetric
node scripts/i18n-audit.mjs         # zero missing literal references in code
node scripts/i18n-hardcoded.mjs     # zero unwrapped user-visible strings
```

System and welcome mail are delivered in the recipient's language; new user-visible text must always go through a dictionary key, never hardcoded.

## 5. Migration discipline

- Table definitions are maintained in one place: the `CREATE TABLE` statements in the back-end initialisation module;
- Every column change ships with an upgrade function (`vN_NDB`) that checks with `PRAGMA table_info` before running `ALTER TABLE ADD COLUMN`, keeping it idempotent;
- A fresh cold start completes all table creation and the six standard role seeds through `/api/init/<jwt_secret>` alone — migrations must never depend on hand-run SQL.

## 6. Engineering workflow

Development follows a five-step SOP:

1. Scope: fix the blast radius across APIs, tables, components, dictionaries and styles;
2. Implementation: follow the existing architecture, honouring dark mode and mobile layout, with graceful degradation and default defences;
3. Full-stack verification: build checks, the regression suite, browser testing and fake-data cleanup;
4. Disciplined commits: structured commit messages; execution records are routed to `CHECKLIST.log` (routine log) or `REPORTS.md` (dedicated audits) — the governance documents themselves never carry logs;
5. Reported hashes: every outward report leads with the full commit hash for traceability.

## 7. Documentation-site development

This site (EpomailDocs) is a separate git repository built on Astro 5 and Starlight, structurally symmetric across the six languages per document (with Traditional Chinese as the formal base):

```bash
pnpm build                          # build (regenerates the anti-tampering manifest)
node scripts/validate-anchors.cjs   # zero broken anchors site-wide
python scripts/check-structure.py   # six-language structural symmetry
python scripts/verify-laws.py       # legal citations match the verified register
```

Every build regenerates the `tamper-proof.json` manifest; a documentation change is committed in two steps — the content commit, then a commit fixing the manifest to that hash.

## 8. Contributing

- Bug reports and feature proposals go through the GitHub repository's Issues; code contributions through Pull Requests (`github.com/shijianus/epomail`);
- Contributions follow the existing commit-message conventions and the gates on this page;
- Security vulnerabilities must not be disclosed in public issues — report them privately through the contact points in [Overview](/en/mail/overview/), Section 5;
- The licensing of contributions and of the project appears in [Open-Source & Self-Hosting Legal](/en/mail/open-source/).

## 9. Related documents

| Resource | Link |
| --- | --- |
| Steps to run a deployment | [Deployment Guide](/en/mail/deployment/) |
| Technical topology and security design | [Technical Architecture](/en/mail/architecture/) |
| Service scope and support channels | [Service Scope & Support](/en/mail/service-scope/) |
| Project positioning and the commit chain | [Project Overview](/en/mail/project/) |
