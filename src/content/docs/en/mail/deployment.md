---
title: Deployment Guide
description: The EpoCanvas Mail deployment guide — prerequisites, the three-step deployment, initialisation and the bootstrap chain, secret injection, mail configuration, storage choices, the demo instance and upgrades.
---

**Effective date: 5 October 2026 | Version: 5.15**

This page is for users and administrators preparing to deploy EpoCanvas Mail themselves; it covers the full path from zero to a working instance. Once deployed, all instance data lives in the deployer's own Cloudflare resources, and the deployer becomes the data controller for its users — the legal position is set out in [Open-Source & Self-Hosting Legal](/en/mail/open-source/). Using the hosted instance ([mail.epocanvas.com](https://mail.epocanvas.com)) requires none of these steps.

![EpoCanvas Mail system architecture: clients reach the Cloudflare edge, Workers carry the API and mail processing, data lands in dual D1, KV and object storage](/images/mail/en/project-architecture.svg)

*Figure: the running topology after deployment. No single-point server; every component runs within Cloudflare's metered quotas.*

## 1. Prerequisites

| Category | Requirement |
| --- | --- |
| Required | One domain; one Cloudflare account; Node.js and pnpm |
| Outbound mail | A delivery channel account such as Resend or Mailjet (required for off-instance sending) |
| Inbound mail | Cloudflare Email Routing (enabling the domain's e-mail routing suffices) |
| Optional | Backblaze B2 or S3 bring-your-own storage, a Turso external database, a Telegram bot, Turnstile, AI provider keys |

## 2. Three-step deployment

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

The front-end build folds the login surface into the Worker's static assets, so one deployment yields the complete site; the deploy target and custom domains are configured in `wrangler.toml`.

## 3. Initialisation and the bootstrap chain

After the first deployment, visit `/api/init/<jwt_secret>` (replacing the path parameter with the secret value chosen by the deployer). This entry point creates every database table, seeds the six standard identity groups (Visitor, Regular User, Regular User LV.0, Regular User LV.1, Moderator, Master) and initialises the primary master account.

- The bootstrap chain is idempotent by design: upgrade functions check columns with `PRAGMA table_info` before running `ALTER TABLE`, so repeated visits have no side effects;
- After wiping `.wrangler/state` for a cold start, that single entry point completes all seeding end to end — no hand-run SQL is ever needed.

## 4. Secret system

| Secret | Production injection | Local development |
| --- | --- | --- |
| `jwt_secret` (session signing) | `npx wrangler secret put jwt_secret` | `.dev.vars` file |
| `totp_enc_key` (2FA secret encryption) | `npx wrangler secret put totp_enc_key` | `.dev.vars` file |

- `.dev.vars` is excluded by `.gitignore` and never committed; the committed template is `.dev.vars.example`;
- Never write any production secret in plain text into `wrangler.toml` or any other version-controlled file;
- The `jwt_secret` in the initialisation path is the session-signing secret; the two must match.

## 5. Mail flows and system mail

- Inbound: enable Email Routing for the domain in the Cloudflare dashboard and route destination addresses to the Worker; mail is parsed on arrival;
- Outbound: once a delivery channel (such as Resend) is configured in system settings, off-instance mail is sent through it; without one, only in-instance direct delivery works;
- System mail (welcome mail, security notices, announcement mail) is rendered from built-in templates in the recipient's language: buttons in the welcome mail such as "open the inbox" are in-site relative paths whose landing behaviour depends on the mail client's handling of relative links, while security notices use absolute links on the instance's domain. Self-hosters can adapt the wording and sender signature through the template constants; the delivery semantics of official mail appear in [Anti-Tampering & Official Specs](/en/mail/tamper-proof/).

## 6. Storage and database choices

| Component | Default | Alternatives |
| --- | --- | --- |
| User and mail databases | Cloudflare D1 with dual-database physical isolation (100% single-database backward compatible) | Turso or another external database (configured in system settings) |
| Attachments and objects | Cloudflare R2 | Backblaze B2 or an S3 bucket of your own |
| Cache | Workers KV | — |

The storage hierarchy and quota metering are described in [Technical Architecture](/en/mail/architecture/); individuals can additionally connect their own storage so attachments land directly in their cloud, see the [Settings Guide](/en/mail/settings/), Section 5.

## 7. Demo instance

For local rehearsal a demo stack can be run without public exposure: start `mail-worker` with `wrangler dev` and seed demo mail and multi-account state with the repository's demo seeding script. Demo data lives only in local `.wrangler/state` (excluded by `.gitignore`) and never reaches the repository or production; the product screenshots on this site were taken from that demo instance.

## 8. Upgrades and rollback

- Upgrade: `git pull` for the latest code → rebuild the front end → `wrangler deploy`; data migrations run idempotently with the bootstrap chain and can safely repeat;
- Version check: the "About" card in system settings shows the instance version and checks for updates;
- Rollback: revert instantly through the Cloudflare Workers deployment history, or redeploy an older commit.

## 9. Related documents

| Resource | Link |
| --- | --- |
| Operating forms and role quotas after initialisation | [Operating Modes](/en/mail/modes/) |
| Development environment, test suites and engineering discipline | [Development Guide](/en/mail/development/) |
| Instance-level configuration in detail | [Settings Guide](/en/mail/settings/) |
| The deployer's legal position and the licence | [Open-Source & Self-Hosting Legal](/en/mail/open-source/) |
| Technical topology and encryption | [Technical Architecture](/en/mail/architecture/) |
