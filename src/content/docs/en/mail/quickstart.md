---
title: Quick Start
description: EpoCanvas Mail quick start — the shortest path from registration to your first sent message on the hosted instance, and the full sequence from cloning the repository to send/receive verification on a self-deployed instance.
---

**Updated: November 2, 2026 | Version: 5.21**

This page gives the shortest action sequence for two paths: Path A registers on the hosted instance and goes from sign-up to a first sent message in about ten minutes; Path B deploys the whole service onto your own domain and Cloudflare account, going from cloning the repository to send/receive verification in about thirty minutes. Both paths run the same code and the same interface; this page lists actions and results only, with links into the dedicated pages for behaviour and configuration, and everything follows the open-source implementation.

The Traditional Chinese (Taiwan) version of this site's legal documents is the authoritative version; the other languages are reference translations, and in case of doubt the authoritative version prevails.

![EpoCanvas Mail deployment paths: the same open-source code, with each hosted or self-hosted instance using resources and external services selected by its actual operator](/images/mail/en/dual-nature-scale.svg)

*Figure: both paths run the same code. Choosing the hosted instance means accepting its [Privacy Policy](/en/mail/privacy-policy/) and [Terms of Service](/en/mail/terms-of-service/); from the moment of self-deployment, the deployer becomes the data controller for their users (see [Privacy and Terms Overview](/en/mail/overview/), Section 2).*

## 1. Choose a path

| | Path A: hosted instance | Path B: self-deployment |
| --- | --- | --- |
| Suits | Trying the product first, without running infrastructure | Already holding a domain and a Cloudflare account and wanting full data autonomy |
| Prerequisites | A browser | A domain, a Cloudflare account, Node.js and pnpm; outbound mail also needs a delivery-channel account |
| Time | About 10 minutes | About 30 minutes |
| Cost | No paid features at present | The deployer's own Cloudflare usage |
| Entry | [mail.epocanvas.com](https://mail.epocanvas.com) | [Deployment Guide](/en/mail/deployment/) |

## 2. Path A: hosted instance

1. **Create an account**: Open [mail.epocanvas.com](https://mail.epocanvas.com), switch to the registration form on the login page, and submit a "prefix @ instance domain" address with a password (6–30 characters). Whether registration requires an invitation code, and whether a human-verification challenge is attached, is decided by the instance configuration; ask the operator for a code when one is required, or reach the registration form directly with the `?code=` parameter. Registration takes effect immediately, with no e-mail verification loop.
2. **Check your identity group**: After registration you enter the instance's default group; registering with an invitation code puts you in the group bound to that code. The group determines the daily sending quota, the number of mailboxes, the storage quota and attachment permission; the factory-seeded values are in [Operating Modes](/en/mail/modes/), Section 3.
3. **Receive your first message**: A welcome e-mail is delivered automatically once registration succeeds, and is waiting when you sign in. Then send a test message containing a verification code from any external mailbox to your new address: the code is extracted automatically by Workers AI and presented in large type with a green badge in the list and the detail view (see the [Feature Guide](/en/mail/features/), Section 5).
4. **Send your first message**: Open the compose layer from the compose entry in the sidebar. Recipients on the instance receive delivery directly; external addresses go through the delivery channel configured by the operator. Outbound volume is subject to the daily sending quota, whose counter resets every day.
5. **Switch on automatic sorting**: Four labels ship by default — Social, Subscriptions, Promotions and Work — and new mail is sorted by built-in heuristics; custom rules, exceptions and priorities are covered in [Labels & Classification Management](/en/mail/labels/).
6. **Turn on two-step verification**: Under "Settings → Security", bind an authenticator app (TOTP) in three steps; ten one-time recovery codes are shown on completion and should be kept offline. Steps in the [Account Security Guide](/en/mail/security/).
7. **Connect Telegram push (optional)**: Receive new mail in real time through your own bot, with a 7-day in-site reading link. Steps in the [Notifications & Forwarding Guide](/en/mail/notify/).
8. **Export data (optional)**: under "Settings → Data", download JSON containing selected profile and undeleted-mail fields; attachment files, complete original MIME and all security settings are not included. Trash cleanup uses mail creation time older than 7 days; save attachments separately before deletion. See [Data Export & Storage](/en/mail/data/), the [Privacy Policy](/en/mail/privacy-policy/), [Data Processing & Security Maintenance](/en/mail/data-security/) and the [Sub-processor List](/en/mail/sub-processors/).

## 3. Path B: self-deployment

1. **Check the prerequisites**: One domain, one Cloudflare account, Node.js and pnpm; outbound mail needs a delivery-channel account such as Resend or Mailjet. The full list is in the [Deployment Guide](/en/mail/deployment/), Section 1.
2. **Deploy in three commands**: Run the following in a terminal (the deployment target and custom domains are configured in `wrangler.toml`):

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

3. **Initialise**: After the first deployment, visit `/api/init/<jwt_secret>` to create all data tables, seed the six standard identity groups and initialise the primary owner account; the bootstrap chain is idempotent and safe to repeat.
4. **Inject the secrets**: In production, inject `jwt_secret` and `totp_enc_key` via `npx wrangler secret put`; for local development use `.dev.vars` (never committed). The secret value in the initialisation path must match the session-signing secret.
5. **Connect inbound mail**: Enable domain Email Routing in the Cloudflare dashboard and route destination addresses to the Worker; inbound mail is parsed as it arrives.
6. **Connect outbound mail**: Configure the delivery channel in system settings; until then, mailboxes on the instance can still deliver directly among themselves.
7. **Verify send and receive**: Register a test account and confirm the welcome e-mail arrives; exchange one message on the instance between the test account and the primary owner account; after configuring the delivery channel, send one external message and confirm its arrival. When all four checks pass, deployment is complete.
8. **Confirm your legal position**: From the moment of self-deployment, the deployer is the data controller for their users and owes them notification and security-maintenance duties; this site's legal documents may serve as a base template (see [Open-Source & Self-Hosting Legal](/en/mail/open-source/)).

## 4. Where to go next

- Full feature coverage and per-interface operation: the [Feature Guide](/en/mail/features/), the [Interface & Route Map](/en/mail/interface/);
- Search and automation in depth: the [Search & Rules Reference](/en/mail/search/), [Labels & Classification Management](/en/mail/labels/);
- Administrator configuration and operating modes: the [Settings Guide](/en/mail/settings/), [Operating Modes](/en/mail/modes/);
- When something goes wrong: support channels in [Service Scope & Support](/en/mail/service-scope/), Section 4; service boundaries and retention periods in Section 2 of the same page.
