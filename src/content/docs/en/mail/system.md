---
title: System Settings Cards
description: EpoCanvas Mail system settings, card by card — the eleven configuration cards from website settings, customization and third-party authentication to storage, mail push, the AI engine, user data control, Turnstile, notices, operation-report thresholds and about.
---

**Effective date: 6 October 2026 | Version: 5.15**

The system-settings page (`#manage/admin/system`, permission keys `setting:query` / `setting:set`) organises all instance-level configuration into cards. This page explains them card by card; card names match the application interface.

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

## 12. Related documents

| Resource | Link |
| --- | --- |
| User-side landing points of the account capability switches | [Data Export & Storage](/en/mail/data/) |
| Group quotas and model authorisation | [Permissions](/en/mail/roles/) |
| Deployment and secret injection | [Deployment Guide](/en/mail/deployment/) |
| How the switches reshape the interface | [Operating Modes](/en/mail/modes/) |
