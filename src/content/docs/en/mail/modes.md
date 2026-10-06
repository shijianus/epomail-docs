---
title: Operating Modes
description: EpoCanvas Mail operating modes — deployment forms, the three mail-mode privacy levels, identity groups and quotas, sign-in and two-step verification, multi-account, and interface display modes.
---

**Effective Date: October 5, 2026 | Version: 5.16**

The same code base presents different operating forms depending on configuration: an instance can be hosted or self-deployed; the administrator chooses the balance between privacy and reviewability across three mail modes; accounts receive quotas and permissions according to their identity group; and sign-in, multi-account use, and the interface each offer several options. This page documents the behaviour of and differences between each mode. For the data handling involved, see [Data Processing & Security Maintenance](/en/mail/data-security/); for feature operation, see the [Feature Guide](/en/mail/features/); for the item-by-item settings entrances, see the [Settings Guide](/en/mail/settings/).

## 1. Deployment forms: hosted instance and self-deployment

The service is available in the following two forms; the definition of the data controller in each case is set out in section 2 of the [Privacy & Terms Overview](/en/mail/overview/):

| Form | Operator | Suited to |
| --- | --- | --- |
| Hosted instance | The EpoCanvas operations team ([mail.epocanvas.com](https://mail.epocanvas.com)) | Sign up and use, with no need to bring your own domain or Cloudflare account |
| Self-deployed instance | The deploying person or organisation | All data stays within the deployer's own Cloudflare resources, with auditable source code |

## 2. Mail mode: three privacy levels

The administrator selects the instance's mail mode on the website-settings card of the system settings. The mode determines the storage encryption policy and the scope in which the admin side can see user mail content:

![EpoCanvas Mail system settings, website settings card: the mail-mode dropdown is open showing All-Mail Mode (Level 1), Privacy Mail Mode (Level 2 [Recommended]) and Encrypted Mail Mode (Level 3 [E2EE]); the current value is Privacy Mail Mode with a Level 2 enhanced-privacy badge (interface in Simplified Chinese)](/images/mail/en/ui/mode-guide.png)

*Figure: mail-mode selection. The instance shown runs in Privacy Mail Mode; the personalisation card on the right and the storage and push cards below are on the same page.*
*Annotations: 1. WebsiteSign UpPu　2. Website*

| Mode | Mail storage | Admin-side visibility | Two-step master switch | Global forwarding & bot push |
| --- | --- | --- | --- | --- |
| All-Mail Mode (Level 1) | Everything in plaintext | All mail | Can be turned off | Can be turned on |
| Privacy Mail Mode (Level 2, factory default) | User correspondence encrypted at rest with AES-256-GCM; trash kept in plaintext for recovery | Spam, trash and ownerless mail only | Locked on | Can be turned on |
| Encrypted Mail Mode (Level 3 [E2EE]) | All mail (trash included) fully encrypted | Returns no user mail list whatsoever | Locked on | Locked off |

Mode changes take effect immediately. In encrypted mode the admin mail list is permanently empty, audit records have their timestamps stripped, and the mail-review entry in the admin sidebar is hidden as well. Per-user forwarding and Telegram push configured by individual users do not follow the site-wide mode; they are governed by the operator's user-data-control switches and the users' own settings. In privacy mode, restoring a message from the trash decrypts it before it lands back in the mailbox, and re-encrypts it afterwards.

## 3. Identity groups and quotas

Every account belongs to one identity group, which determines the sending quota, number of mailboxes, storage quota, and attachment permission:

![EpoCanvas Mail permission page: a table lists the six identity groups — Regular User, Visitor, Regular User LV.0, Regular User LV.1, Moderator and Master — each with its positioning tag, storage quota, sending limit, attachment permission and AI model authorisation columns (interface in Simplified Chinese)](/images/mail/en/ui/roles-guide.png)

*Figure: the architecture and grading overview on the permission page. Storage quota, sending limit and attachment permission are set per group; the Master group has no sending or mailbox cap.*
*Annotations: 1. 　2. Name　3. Storage Quota　4. Sending Limit　5. Attachment Permi*

| Identity group | Positioning | Daily sending | Mailboxes | Storage quota | Attachments |
| --- | --- | --- | --- | --- | --- |
| Visitor | Read-only sandbox for open-source tours and inspection | Banned | 0 | 0 MB | Not allowed |
| Regular User | Basic member | 5 | 1 | 5 MB | Not allowed |
| Regular User LV.0 | Certified friend | 8 | 2 | 10 MB | Not allowed |
| Regular User LV.1 | Active scholar | 10 | 3 | 25 MB | Allowed |
| Moderator | Co-management | 100 | 10 | 500 MB | Allowed |
| Master | Highest authority | Uncapped | Uncapped | 1024 MB | Allowed |

New registrations land in the factory-default group, the Visitor; the operator can change the default on the permission page. The LV.0 and LV.1 tiers sync automatically through blog-level linkage: binding a blog account raises the account to LV.0, and active participation on the blog raises it to LV.1. The Visitor is a read-only sandbox with the full interface for interaction: it can browse the read-only admin sections and is barred from sending mail. Quotas and permissions can also be adjusted per instance on the permission page; the table above shows the factory-seeded values. The Master group's sending and mailbox counts are uncapped via zero values, while its storage is factory-seeded at 1024 MB (the permission page labels it as unlimited) and can be adjusted as needed.

## 4. Sign-in and two-step verification

![EpoCanvas Mail login page: e-mail address and password fields, a "keep the orbit connected" checkbox and the sign-in button, with Google and GitHub quick sign-in buttons below, both greyed with a "coming soon" badge (interface in Simplified Chinese)](/images/mail/en/ui/login-guide.png)

*Figure: the login page. Password sign-in is the baseline; third-party buttons enabled by the administrator without credentials are greyed out as "coming soon", and disabled ones are not shown.*
*Annotations: 1. 　2. *

- Password sign-in: the baseline method available on every instance; passphrases are stored as salted hashes, and repeated failures trigger brute-force lockout;
- Two-step verification: switched on by the account holder in the two-step centre of the security settings; three second factors are available — an authenticator app (TOTP dynamic codes), backup recovery codes (10 one-time codes), and passkeys (hardware security keys or device biometrics);
- Trusted devices: after ticking "Don't ask again on this device" during the two-step verification step, the device skips re-verification for 30 days; between 30 and 60 days verification is asked again, and after 60 days the trust lapses; automation or environment tampering is always refused the exemption;
- Third-party quick sign-in: the administrator enables and configures providers one by one from GitHub, Google, Microsoft, Apple and custom SSO; an enabled provider without credentials shows greyed as "coming soon", a disabled one is not shown at all. The data involved in third-party sign-in is listed in the [Sub-processor List](/en/mail/sub-processors/).

![EpoCanvas Mail security settings page: the upper card holds the username, mailbox and password change; below, the two-step centre lists the three second factors — authenticator app, backup recovery codes and passkeys — each with its configuration status and action buttons (interface in Simplified Chinese)](/images/mail/en/ui/twofa-guide.png)

*Figure: the two-step centre on the security settings page. Each second factor is configured independently, and they can be combined.*
*Annotations: 1. Authenticator Ap　2. Backup Recovery 　3. Passkeys & Secur　4. Back to Mail*

## 5. Multi-account mode

The administrator can turn on "multi-account quick switching" (off by default). Once on, the avatar menu lists the signed-in accounts with a switching entry, and "manage your Epomail accounts" leads to the add-account flow; each account keeps an independent session, and interface paths are isolated by the `/mail/u/index/` prefix, so switching accounts never overwrites another account's sign-in state. Switching between mailbox aliases within one account does not create a new session.

![EpoCanvas Mail avatar menu opened at the top right of the inbox: the current account admin (Master) with a dropdown arrow, a "manage your Epomail accounts" button and the storage-usage bar (interface in Simplified Chinese)](/images/mail/ui/ui-account-menu.png)

*Figure: multi-account quick switching. The menu gathers the signed-in accounts; adding an account goes through the dedicated flow on the login page, and sessions never overwrite each other.*

## 6. Interface languages and display modes

The interface ships in six languages — 简体中文, 繁體中文, English, Français, Español and Nederlands — switched in the general settings; system mail and welcome mail are delivered in each recipient's language. Display modes come in three states — dark, light, and follow-system — with global theme wallpapers and a personal background on top. The web app supports PWA installation, and an Android app (epomail) is available as well.

## 7. Related documents

| Resource | Link |
| --- | --- |
| Full steps for self-deployment | [Deployment Guide](/en/mail/deployment/) |
| The hosted instance's service boundaries and support channels | [Service Scope & Support](/en/mail/service-scope/) |
| Project positioning and deployment | [Project Overview](/en/mail/project/) |
| Item-by-item tour of personal settings and the admin console | [Settings Guide](/en/mail/settings/) |
| Feature details with interface screenshots | [Feature Guide](/en/mail/features/) |
| Privacy semantics and retention of the mail modes | [Data Processing & Security Maintenance](/en/mail/data-security/) |
| Admin visibility over mail content | [Privacy Policy](/en/mail/privacy-policy/), section 10 |
