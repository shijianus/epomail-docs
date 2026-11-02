---
title: Quick Start
description: EpoCanvas Mail quick start — the shortest path from registration to your first sent message on the hosted instance, and the full sequence from cloning the repository to send/receive verification on a self-deployed instance.
---

**Updated: November 2, 2026 | Version: 5.25**

This page covers hosted sign-up (Path A) and self-deployment (Path B). The times below are rough functional setup estimates, not estimates for legal or security readiness. The new registration and data controls described here require the updated Worker, React login UI and Vue settings UI to be deployed together and configured; this page does not establish that any live instance has been upgraded or verified. See the dedicated guides for other features and settings.

The Traditional Chinese (Taiwan) version of this site's legal documents is the authoritative version; the other languages are reference translations, and in case of doubt the authoritative version prevails.

![EpoCanvas Mail deployment paths: the same open-source code, with each hosted or self-hosted instance using resources and external services selected by its actual operator](/images/mail/en/dual-nature-scale.svg)

*Figure: both paths run the same code. On the hosted instance, a user must explicitly check the box accepting the [Terms of Service](/en/mail/terms-of-service/) during registration; the [Privacy Policy](/en/mail/privacy-policy/) provides processing information and is not blanket consent. From self-deployment onward, the deployer must assess its role against the actual processing activities (see [Privacy and Terms Overview](/en/mail/overview/), Section 2).*

## 1. Choose a path

| | Path A: hosted instance | Path B: self-deployment |
| --- | --- | --- |
| Suits | Trying the product first, without running infrastructure | Already holding a domain and a Cloudflare account and wanting full data autonomy |
| Prerequisites | A browser | A domain, a Cloudflare account, Node.js and pnpm; outbound mail also needs a delivery-channel account |
| Time | About 10 minutes | About 30 minutes |
| Cost | No paid features at present | The deployer's own Cloudflare usage |
| Entry | [mail.epocanvas.com](https://mail.epocanvas.com) | [Deployment Guide](/en/mail/deployment/) |

## 2. Path A: hosted instance

1. **Create an account**: Open [mail.epocanvas.com](https://mail.epocanvas.com), switch to the registration form on the login page, review the operator details, current terms version and [Terms of Service](/en/mail/terms-of-service/) shown by the instance, and tick the unchecked “I accept the Terms of Service” box before submitting a “prefix @ instance domain” address with a password (6–30 characters). The [Privacy Policy](/en/mail/privacy-policy/) supplies processing information here; one checkbox is not blanket privacy consent. If required legal notices or terms-version data are incomplete, new registration is closed. This gate affects new registration only; existing sign-in and administrative initialization paths remain available. Whether an invitation code or human-verification challenge is required is decided by the instance configuration; ask the operator for a code when one is required, or reach the registration form directly with the `?code=` parameter. Registration takes effect immediately, with no e-mail verification loop.
2. **Check your identity group**: After registration you enter the instance's default group; registering with an invitation code puts you in the group bound to that code. The group determines the daily sending quota, the number of mailboxes, the storage quota and attachment permission; the factory-seeded values are in [Operating Modes](/en/mail/modes/), Section 3.
3. **Receive your first message**: After registration, check the welcome message and send synthetic test content from an external mailbox you control to verify receipt. Verification-code extraction is not enabled by default: the instance must enable `verificationCodeEnabled` and provide a current processing notice, and you must turn on your default-off personal preference. Translation requires confirmation of the current notice for each request; image OCR also needs an explicit choice for that request and server enablement. Public translation fallback is off by default. See the [Settings Guide](/en/mail/settings/#optional-processing).
4. **Send your first message**: Open the compose layer from the compose entry in the sidebar. Recipients on the instance receive delivery directly; external addresses go through the delivery channel configured by the operator. Outbound volume is subject to the daily sending quota, whose counter resets every day.
5. **Switch on automatic sorting**: Four labels ship by default — Social, Subscriptions, Promotions and Work — and new mail is sorted by built-in heuristics; custom rules, exceptions and priorities are covered in [Labels & Classification Management](/en/mail/labels/).
6. **Turn on two-step verification**: Under "Settings → Security", bind an authenticator app (TOTP) in three steps; ten one-time recovery codes are shown on completion and should be kept offline. Steps in the [Account Security Guide](/en/mail/security/).
7. **Connect Telegram push (optional)**: Receive new mail in real time through your own bot, with a 7-day in-site reading link. Steps in the [Notifications & Forwarding Guide](/en/mail/notify/).
8. **Export data (optional)**: under "Settings → Data", download JSON containing selected profile and undeleted-mail fields; attachment files, complete original MIME and all security settings are not included. Trash cleanup uses mail creation time older than 7 days; save attachments separately before deletion. See [Data Export & Storage](/en/mail/data/), the [Privacy Policy](/en/mail/privacy-policy/), [Data Processing & Security Maintenance](/en/mail/data-security/) and the [Sub-processor List](/en/mail/sub-processors/).

## 3. Path B: self-deployment

1. **Check the prerequisites**: One domain, one Cloudflare account, Node.js and pnpm; outbound mail needs a delivery-channel account such as Resend or Mailjet. The full list is in the [Deployment Guide](/en/mail/deployment/), Section 1. Before a cold deployment, build `temp_login_ui` (React) first, then `mail-vue` (Vue); the `mail-vue` build copies the login surface into the Worker's static assets.
2. **Build and deploy**: Build the front ends and deploy the Worker in this order (the deployment target and custom domains are configured in `wrangler.toml`):

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail
pnpm --dir mail-worker install --frozen-lockfile
node scripts/build-prod.mjs
```

3. **Set secrets and deploy**: From the repository root, run `pnpm --dir mail-worker exec wrangler secret put jwt_secret` and `pnpm --dir mail-worker exec wrangler secret put totp_enc_key`; a separate `init_secret` set the same way is recommended. Then run `pnpm --dir mail-worker exec wrangler deploy`. Enter secret values through the interactive prompts, never in URLs, version-controlled files or public examples.
4. **Initialise and configure notices**: Send `POST /api/init` over HTTPS with `init_secret` in the `x-init-secret` header (falling back to `jwt_secret` only if no separate secret is set) to create tables, seed standard groups and initialise the owner. If the response contains an initial password, keep it private and change it immediately. Sign in to administration and complete the [operator notice settings](/en/mail/settings/#operator-notice) before opening registration; missing required notice data does not block owner initialization or existing sign-in.
5. **Connect inbound mail**: Enable domain Email Routing in the Cloudflare dashboard and route destination addresses to the Worker; inbound mail is parsed as it arrives.
6. **Connect outbound mail**: Configure the delivery channel in system settings; until then, mailboxes on the instance can still deliver directly among themselves.
7. **Verify send and receive**: In an isolated test environment, use dedicated accounts and synthetic data to check terms acceptance at registration, welcome mail, internal exchanges and external sending and receipt; do not publish production credentials. These are functional smoke tests, not proof of complete security, privacy, deletion or legal readiness, or permission to open the service directly to real users.
8. **Confirm your legal position**: Assess roles according to who actually determines processing purposes and means; self-deployment does not automatically make you the sole controller. Publish real identity, location, contact details and any legally required address, and check recipients, effective contracts, transfer arrangements and retention periods. Templates or completed configuration fields cannot establish those facts. See [Open-Source & Self-Hosting Legal](/en/mail/open-source/).

## 4. Where to go next

- Full feature coverage and per-interface operation: the [Feature Guide](/en/mail/features/), the [Interface & Route Map](/en/mail/interface/);
- Search and automation in depth: the [Search & Rules Reference](/en/mail/search/), [Labels & Classification Management](/en/mail/labels/);
- Administrator configuration and operating modes: the [Settings Guide](/en/mail/settings/), [Operating Modes](/en/mail/modes/);
- When something goes wrong: support channels in [Service Scope & Support](/en/mail/service-scope/), Section 4; service boundaries and retention periods in Section 2 of the same page.
