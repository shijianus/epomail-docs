---
title: Service Scope & Support
description: EpoCanvas Mail service scope and support — what the hosted instance provides, the boundaries of that service, the official links, support channels and the appeal and recovery paths.
---

**Effective date: 5 October 2026 | Version: 5.13**

This page describes what the hosted instance ([mail.epocanvas.com](https://mail.epocanvas.com)) provides, where that service ends, and the support channels. Self-hosted instances are outside the "service" described here: the software is provided under the MIT licence and the upstream project bears no responsibility for any instance's operation — the legal position appears in [Open-Source & Self-Hosting Legal](/en/mail/open-source/); the data-controller split between the two forms is in the [Overview](/en/mail/overview/), Section 2.

![EpoCanvas Mail legal architecture: the terms of service and privacy policy rest on applicable law and security obligations](/images/mail/en/legal-architecture.svg)

*Figure: the covenant architecture of this service. This page describes the service itself; the contract and the notice standards are carried by the legal documents above it.*

## 1. What the service provides

| Item | Description |
| --- | --- |
| Accounts and registration | Accounts obtained through registration codes or open registration as configured; six identity groups decide quotas and permissions |
| Sending and receiving | Inbound through Cloudflare Email Routing, parsed on arrival; in-instance direct delivery; off-instance through the operator's delivery channel |
| Storage | Storage quota per identity group; personal object storage can be connected so attachments land directly in it |
| Organisation and automation | Eight-view mailbox, labels and the classification rule engine, advanced search, verification-code extraction |
| AI capabilities | Full-text translation and image OCR (per the instance's AI engine configuration and model authorisation) |
| Notifications and forwarding | Telegram push and rule-based forwarding (per the admin's user-data controls) |
| Clients | Web (installable as a PWA) and the Android app (epomail) |
| Languages | Six interface languages; system and welcome mail delivered in the recipient's language |

Feature-level details appear in the [Features Guide](/en/mail/features/); a tour of every interface and route is in the [Interface & Route Map](/en/mail/interface/).

## 2. Service boundaries

| Matter | Boundary |
| --- | --- |
| Availability | No service-level agreement is offered; availability rests on the Cloudflare platform |
| Retention | Trash is physically erased seven days after receipt; spam is quarantined for seven days and then moved to trash |
| Quotas | Sending, mailboxes and storage follow the factory values of the identity group, adjustable by the master on the permission page |
| Cost | The hosted instance currently offers no paid features |
| Feature change | Features evolve with releases; significant changes are announced in the in-site notice and by announcement mail |
| Attachment limit | The per-attachment cap follows the instance setting and binds only users of the operator's shared storage |

The full semantics of retention appear in [Data Processing & Security](/en/mail/data-security/); behavioural boundaries in the [Acceptable Use Policy](/en/mail/acceptable-use/).

## 3. Official links inside the app

The default targets of the official links throughout the app are listed below; an instance operator can override them in system settings:

| Link | Default target | Where |
| --- | --- | --- |
| Project introduction | This site's Project Overview page | Account-menu footer |
| Privacy policy / Terms of service | The corresponding legal documents on this site | Account-menu footer |
| Documentation | This site (entered via browser-language negotiation) | System settings, "About" card |
| Support | This site's Service Scope & Support page | System settings, "About" card |
| Releases | GitHub Releases | System settings, "About" card |
| Telegram | `t.me/epomail` | System settings, "About" card |

## 4. Support channels

| Channel | For |
| --- | --- |
| In-product contact | In-site message or `admin@epocanvas.com` |
| Privacy and data protection | `privacy@epocanvas.com` (exercising data-subject rights, data-protection appeals) |
| GitHub Issues | Bug reports and feature proposals (`github.com/shijianus/epomail`) |
| Telegram | Community chat at `t.me/epomail` |

## 5. Appeals and recovery

- Forgot password: the login page's "forgot password" dialog jumps to the appeal portal (carrying the appeal type, interface language and e-mail address); access is restored after verification;
- Ban and warning appeals: an appeal against a handling decision enters Operation Reports as a warning ticket, which an administrator adjudicates by releasing or rejecting; the enforcement ladder appears in the [Acceptable Use Policy](/en/mail/acceptable-use/), Section 6;
- Self-service data: the full JSON export, mail-history archives and single-message .eml downloads are available at any time under "Settings → Data", see the [Settings Guide](/en/mail/settings/), Section 5.

## 6. Support boundary for self-hosted instances

The upstream open-source project provides no service, support or availability commitment for any deployment of its code; the deployer bears support, notice and compliance duties toward its own users. This site's documents (including the legal set) can serve as the basis for a deployer's user-facing materials, and whoever adopts them becomes responsible for them.

## 7. Related documents

| Resource | Link |
| --- | --- |
| The contract and limitation of liability for the service | [Terms of Service](/en/mail/terms-of-service/) |
| Privacy notice and data-subject rights | [Privacy Policy](/en/mail/privacy-policy/) |
| The open-source licence and self-hosting law | [Open-Source & Self-Hosting Legal](/en/mail/open-source/) |
| Full steps to deploy your own instance | [Deployment Guide](/en/mail/deployment/) |
