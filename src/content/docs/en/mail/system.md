---
title: System Settings Cards
description: EpoCanvas Mail system settings, card by card — the eleven configuration cards from website settings, customization and third-party authentication to storage, mail push, the AI engine, user data control, Turnstile, notices, operation-report thresholds and about.
---

**Effective date: 6 October 2026 | Version: 5.17**

The system-settings page (`#manage/admin/system`, permission keys `setting:query` / `setting:set`) organises all instance-level configuration into cards. This page explains them card by card; card names match the application interface.

![Figure: system settings and its eleven cards](/images/mail/en/ui/system-guide.png)

*Figure: system settings and its eleven cards*

<details>
<summary>Walkthrough: System settings —  the five most-used configuration cards</summary>

Five of the eleven configuration cards on the system page: instance-level settings grouped by theme — here the five most-used.

1. **Site-settings card**: The master switches: open registration, public profiles, mail mode (three tiers), two-step verification, hide the login domain, reg-keys, extra mailboxes, multi-account quick switching and mailbox prefix rules.
2. **Personalisation card**: The public face of the instance: the site title brands both the sign-in page and the browser tab, the dialog text overrides the built-in prompt copy, and the dynamic/static switch decides whether the sign-in page animates — static suits low-powered devices and screenshot evidence better. Changes apply to everyone at once.
3. **Storage and databases card**: Object storage (B2/S3 with R2/KV fallback), core and third-party database backends, the per-attachment cap with cascade deletion, and KV cache diagnostics.
4. **AI engine card**: The AI provider (custom OpenAI-compatible endpoint or Cloudflare Workers AI), the enable switch, daily quota and rate limits, and per-role model grants.
5. **User data control card**: What regular users may do on the data page: Telegram push, mail forwarding, third-party API support, bring-your-own storage and the default storage quota. Data export stays open regardless of this card.

</details>

## 1. Website settings

Open registration, public profiles, mail mode (three levels — see Section 2 of [Operating Modes](/en/mail/modes/)), two-step verification, hidden login domain, registration codes, extra mailboxes, multi-account quick switching and mailbox-prefix rules — all instance-level switches.

## 2. Customization

Site title, pop-up notices and the dynamic / static interface, controlling the branding of the login surface and the interface.

## 3. Third-party authentication & SSO

The quick sign-in master switch and per-provider credentials (GitHub, Google, Microsoft, Apple, custom SSO); the three-state display rule of the login-page buttons is in Section 4 of [Operating Modes](/en/mail/modes/). The card's display is governed by a low-level feature flag; a default deployment does not render it.

## 4. Storage & core database

Object storage (B2 / S3, falling back to R2 / KV by default), the core and external database architecture (Turso and the like), the single-attachment limit with cascade deletion, and the KV cache health check. Technical details are in [Technical Architecture](/en/mail/architecture/).

## 5. Mail push

The official Telegram bot (site-wide push), push-field display preferences (show/hide sender / recipient / body item by item), global forwarding and rule forwarding; locked off in encrypted mode. Private user-side bots are in the [Notifications & Forwarding Guide](/en/mail/notify/).

## 6. AI Engine & Model Integration Hub

The AI provider, one of two (a custom OpenAI-compatible endpoint or Cloudflare Workers AI), the enable switch, daily quota and rate limit, and model authorisation per identity group (working with [Permissions](/en/mail/roles/)).

## 7. User Data Control

The capability switches for ordinary users on the "Data" page: Telegram push, mail forwarding, third-party API support, bring-your-own storage and the default storage quota; data export stays open at all times and is not constrained by this card.

## 8. Turnstile human verification

The site key and switch of human verification, applied to public entrances such as registration.

## 9. Notice

Login pop-up notices, announcement mail broadcasts and welcome-mail templates (multilingual, delivered in the recipient's language); the delivery semantics of official mail are in [Official Mail Specification & Tamper-Proof Verification](/en/mail/tamper-proof/).

## 10. Operation Reports

The operational thresholds at which warnings trigger (feeding ticket generation in [Operation Reports](/en/mail/audit/)).

## 11. About

Instance version information and the update check (against GitHub Releases).

<details>
<summary>Walkthrough: the eleven configuration cards at a glance (numbering matches the interface)</summary>

1. ① Website settings: open registration, public profiles, mail mode, two-step verification, registration codes, extra mailboxes, multi-account switching and mailbox prefixes.
2. ② Customization: site title, pop-up notices and the dynamic / static interface. ③ Storage & core database: B2 / S3, the core and external database, and the single-attachment limit.
3. ④ Mail push: the official Telegram bot, push-field show/hide, global and rule forwarding. ⑤ AI Engine: the provider, quota and rate limit, and model authorisation.
4. ⑥ User Data Control: the user-side push / forwarding / API / bring-your-own storage switches and the default quota. ⑦ Turnstile human verification. ⑧ Notice: pop-ups, broadcasts and the welcome-mail template.
5. ⑨ Operation Reports: the thresholds at which warnings trigger. ⑩ About: version and the update check. The Third-party authentication & SSO card's display is governed by a feature flag.

</details>

## 12. Related documents

| Resource | Link |
| --- | --- |
| User-side landing points of the account capability switches | [Data Export & Storage](/en/mail/data/) |
| Group quotas and model authorisation | [Permissions](/en/mail/roles/) |
| Deployment and secret injection | [Deployment Guide](/en/mail/deployment/) |
| How the switches reshape the interface | [Operating Modes](/en/mail/modes/) |
