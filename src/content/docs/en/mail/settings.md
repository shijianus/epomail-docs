---
title: Settings Guide
description: EpoCanvas Mail settings guide — the five personal-settings sections (profile, general, security, data, labels) and a complete tour of the nine admin-console sections and the system-settings cards.
---

**Effective Date: October 5, 2026 | Version: 5.16**

EpoCanvas Mail splits its settings into two areas: the "settings" area of the sidebar holds the personal settings every account can adjust itself, in five sections — profile, general, security, data and labels; the "admin" area appears only for identity groups with administrative permissions and carries the instance-level configuration. This page walks through each area and how the settings relate. For behaviour at the operating level — multi-account, mail modes, sign-in — see [Operating Modes](/en/mail/modes/).

## 1. Personal-settings sections

| Section | Contents |
| --- | --- |
| Profile | Avatar, nickname, gender, birthday and contact details |
| General | Bio, appearance colour scheme, theme wallpaper, reading preferences, interface language and translation target language |
| Security | Username and password, two-step centre, account deletion |
| Data | Data export, notifications and forwarding, storage space and personal cloud storage |
| Labels | Custom labels and classification rules |

## 2. Profile: personal details

![EpoCanvas Mail profile page: the basic-information card holds avatar upload, nickname, gender and birthday; the contact card shows the e-mail address with its primary-mailbox tag plus an add-e-mail button, and phone numbers; address cards for home, company and other follow below (interface in Simplified Chinese)](/images/mail/ui/ui-settings-profile.png)

*Figure: the profile page. The primary mailbox carries a "primary mailbox" tag; additional e-mail addresses can be added in number and removed at any time.*

The basic-information card manages the avatar, nickname, gender and birthday. The contact card lists the sign-in primary mailbox and any additional e-mail addresses added by the account holder, plus telephone numbers with country codes. The address cards store home, company and other addresses separately. How much of this is public is governed by the operator's "public profile" switch.

## 3. General: appearance and language

![EpoCanvas Mail general page: a bio text box; the appearance area offers dark, light and follow-system colour schemes; the global theme wallpaper offers eight presets plus a custom wallpaper, with the personal background and further settings below (interface in Simplified Chinese)](/images/mail/ui/ui-settings-general.png)

*Figure: appearance and wallpaper selection on the general page, shown with follow-system and the default clean wallpaper.*

- Appearance: dark, light and follow-system colour schemes; eight wallpaper presets plus custom wallpapers; the personal background and interface density are set separately;
- Reading preferences: inbox type, reading-pane position and the conversation-view switch;
- Language: one of six system languages; the translation target language is set independently with 16 options and decides the target of AI full-text translation; image OCR translation can be switched off separately;
- The data-privacy area concentrates the personal-information and AI-processing preference entrances.

## 4. Security: password and two-step verification

The security page changes the username and the password (showing when it last changed). The two-step centre holds the master switch and the independent configuration of the three second factors: an authenticator app (TOTP), backup recovery codes (10 one-time codes) and passkeys. For the sign-in behaviour and trusted-device rules, see section 4 of [Operating Modes](/en/mail/modes/). The bottom of the page holds the account-deletion entrance; after deletion the account data is handled under the deletion clauses of the [Privacy Policy](/en/mail/privacy-policy/).

## 5. Data: export, notifications and storage

![EpoCanvas Mail data page: the export card offers the full-data JSON export, the mail archive (MBOX, JSON or CSV with a time range) and the contacts-and-configuration export; the storage card below shows the attachment-usage gauge and the personal object-storage entrance (interface in Simplified Chinese)](/images/mail/ui/ui-settings-data.png)

*Figure: the data page. Export and storage management appear on one page; attachment usage counts against the identity group's quota.*

| Export | Format | Scope |
| --- | --- | --- |
| Full-data export | JSON | Complete backup: account details, mail history, contacts, classification and label rules, and security settings |
| Mail history archive | MBOX (universal), JSON or CSV | Sent and received mail only, with an optional time range |
| Contacts and configuration | JSON | Contact list, custom alias rules and personalisation preferences |

A single message can be downloaded as .eml straight from the reading pane. The notifications-and-forwarding area offers Telegram push (binding a bot and chat ID) and rule-based mail forwarding (destination address of your choice; trigger types are all mail, alias prefix and smart rules, with options to keep a copy and prefix the subject); whether these two are offered to users is decided by the operator's user-data-control switches. The storage area shows the attachment-usage gauge and allows attaching a personal object store (a Backblaze B2 or S3 bucket of your own); once connected, attachments go straight to the personal cloud and are no longer bound by the instance quota.

## 6. Label management

The labels section manages the colours and icons of custom labels and configures rule conditions, exceptions and priorities; the four factory labels are Social, Subscriptions, Promotions and Work. The rule engine's behaviour and the search syntax are covered in sections 3 and 4 of the [Feature Guide](/en/mail/features/).

## 7. Admin console

The admin area is shown item by item according to the identity group's permissions, and the interface paths are bound to the role group to prevent privilege escalation. The nine admin sections:

| Section | Responsibility |
| --- | --- |
| Analytics | Dashboards of mail volume, classification and labels |
| User list | Account lookup, password reset, identity-group change, two-step reset, ban and restore, mailbox wipe |
| Spam / All mail | The site-wide mail-review section; its name and scope follow the mail mode (Level 1 shows All Mail, Level 2 shows the spam section, Level 3 hides the entrance) |
| Permissions | Quota and permission templates for the six identity groups, the default group and AI model authorisation; the Visitor and Master groups are protected against deletion |
| Registration keys | Issuing and checking invitation codes |
| System settings | Instance-level configuration — see the card list below |
| App management | Issuing and managing the access credentials of OAuth 2.0 / OIDC third-party applications |
| Classification | Receive and send function switches, AI recognition settings, block/allow lists and hard-block rules |
| Audit report | Reviewing, handling and adjudicating the four warning classes |

The system-settings page organises the instance-level configuration into cards:

| Card | Contents |
| --- | --- |
| Website settings | Open registration, public profiles, mail mode, two-step verification, hidden login domain, registration codes, extra mailboxes, multi-account quick switching, mailbox-prefix rules |
| Customization | Site title, pop-up notices, dynamic/static interface |
| Third-party authentication & SSO | The quick sign-in master switch and per-provider credentials (shown under a feature flag) |
| Storage & core database | Object storage (B2 / S3, falling back to R2 / KV by default), core and external database architecture, single-attachment limit and cascade deletion, KV cache health check |
| Mail push | Telegram bot, global forwarding and rule forwarding (locked off in encrypted mode) |
| AI Engine & Model Integration Hub | AI provider (custom OpenAI-compatible endpoint or Cloudflare Workers AI), enable switch, daily quota and rate limit, model authorisation |
| User Data Control | User Telegram push, mail forwarding, API and bring-your-own storage switches, and the default storage quota |
| Turnstile | Human-verification site key and switch |
| Notice | Notice pop-ups, announcement broadcasts and welcome-mail templates (multilingual) |
| Operation Reports | Operational thresholds that trigger warnings |
| About | Version information and update check |

The audit-report page presents site-wide risk events as warning tickets, each carrying its class, priority, status and full environment details (IP, geolocation, device and fingerprint):

| Warning class | Trigger | Usual handling |
| --- | --- | --- |
| Audit warning | A report or rule violation flagged by other users holds up | Verify, then release or take action |
| Risk warning | A security red line or anomalous sign-in environment (e.g. concurrent multi-IP, multi-location logins) | Watch closely, interview or ban |
| Ban warning | The account has been banned automatically by the system or manually by an administrator | Lift the warning or maintain the ban |
| Appeal warning | The user has appealed against a handling decision | Release (lift the ban) or reject |

![EpoCanvas Mail audit-report page: the table lists warning tickets of the four classes — appeal, ban, audit and risk — each with its priority, status tag, active-environment details and handling buttons such as release and lift-warning (interface in Simplified Chinese)](/images/mail/ui/ui-audit-report.png)

*Figure: the audit report. All four warning classes are reviewed in one list, with handling buttons routed by class; in encrypted mode the record timestamps are stripped.*

## 8. Related documents

| Resource | Link |
| --- | --- |
| Step-by-step 2FA, recovery codes and passkeys | [Step-by-step 2FA, recovery codes and passkeys](/en/mail/security/) |
| Step-by-step Telegram push and auto-forwarding | [Step-by-step Telegram push and auto-forwarding](/en/mail/notify/) |
| OAuth app registration and endpoint integration tutorial | [OAuth app registration and endpoint integration tutorial](/en/mail/api/) |
| The route and elements of every interface | [Interface & Route Map](/en/mail/interface/) |
| Search operators and classification rule conditions | [Search & Rules Reference](/en/mail/search/) |
| Deployment forms, mail modes and sign-in | [Operating Modes](/en/mail/modes/) |
| Feature details with interface screenshots | [Feature Guide](/en/mail/features/) |
| Technical topology and encryption | [Technical Architecture](/en/mail/architecture/) |
| Data handling and retention behind the settings | [Data Processing & Security Maintenance](/en/mail/data-security/) |
