---
title: Settings Guide
description: EpoCanvas Mail settings guide — the five personal-settings sections (profile, general, security, data, labels) and a complete tour of the nine admin-console sections and the system-settings cards.
---

**Updated: November 2, 2026 | Version: 5.25**

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

![EpoCanvas Mail profile page: the basic-information card holds avatar upload, nickname, gender and birthday; the contact card shows the e-mail address with its primary-mailbox tag plus an add-e-mail button, and phone numbers; address cards for home, company and other follow below (interface in Simplified Chinese)](/images/mail/en/ui/preferences-guide.png)

*Figure: the profile page. The primary mailbox carries a "primary mailbox" tag; additional e-mail addresses can be added in number and removed at any time.*

<details>
<summary>Walkthrough: Profile —  personal data split across four dimensions</summary>

The four cards of the profile page: identity, contact, addresses and linked settings — four dimensions of your personal data, card by card.

1. **Basics card**: Avatar upload, display name, gender and birthday. Whether name and avatar appear publicly is gated by the operator's "public profile" switch.
2. **Contact card**: The sign-in mailbox carries a "primary" tag and cannot be removed; extra mailboxes can be added and dropped at will, plus a phone number with area code.
3. **Address cards**: Home, company and other addresses are stored separately, each added, edited and removed on its own. They are profile data in the strict sense: never used for delivery, never affecting billing or the role. Whether they are needed at all — and whether they show publicly — depends on the operator public-profile switch.
4. **Linked settings and security card**: The springboard from the profile page into the other settings pages: account security (username, password, two-step verification) and third-party grants (authorised apps) sit together here, so you need not hunt back and forth between the profile and security pages. Each entry jumps to the matching section rather than opening a new page.

</details>

The basic-information card manages the avatar, nickname, gender and birthday. The contact card lists the sign-in primary mailbox and any additional e-mail addresses added by the account holder, plus telephone numbers with country codes. The address cards store home, company and other addresses separately. How much of this is public is governed by the operator's "public profile" switch.

## 3. General: appearance and language

![EpoCanvas Mail general page: a bio text box; the appearance area offers dark, light and follow-system colour schemes; the global theme wallpaper offers eight presets plus a custom wallpaper, with the personal background and further settings below (interface in Simplified Chinese)](/images/mail/en/ui/general-guide.png)

*Figure: appearance and wallpaper selection on the general page, shown with follow-system and the default clean wallpaper.*

<details>
<summary>Walkthrough: General —  three cards for look and reading habits</summary>

The three cards of the general page — bio, personalisation and preferences — covering every aspect of look and reading habits.

1. **Bio card**: A short text shown on your public profile page; whether that page is reachable is decided by the operator's "public profile" switch.
2. **Personalisation card**: Three theme modes (dark/light/system, also switchable from the top bar) and the global wallpaper (eight presets plus custom image or URL); a personal background (mailbox area only) and UI density are here too.
3. **Preferences card**: Reading preferences (inbox type, reading-pane position, conversation view) and language (UI in one of six; AI translation target in one of 16). The data-privacy group gathers personal-info and AI-processing preferences.

</details>

- Appearance: dark, light and follow-system colour schemes; eight wallpaper presets plus custom wallpapers; the personal background and interface density are set separately;
- Reading preferences: inbox type, reading-pane position and the conversation-view switch;
- Language: one of six system languages; the translation target language is set independently with 16 options and decides the target of AI full-text translation; image OCR translation can be switched off separately;
- The data-privacy area concentrates the personal-information and AI-processing preference entrances.

## 4. Security: password and two-step verification

The security page changes the username and the password (showing when it last changed). The two-step centre holds the master switch and the independent configuration of the three second factors: an authenticator app (TOTP), backup recovery codes (10 one-time codes) and passkeys. Disabling TOTP removes the TOTP secret; if an active passkey remains, two-step verification stays enabled and the passkey is not removed. For the sign-in behaviour and trusted-device rules, see section 4 of [Operating Modes](/en/mail/modes/). The bottom of the page holds the account-deletion entrance; after deletion the account data is handled under the deletion clauses of the [Privacy Policy](/en/mail/privacy-policy/).

## 5. Data: export, notifications and storage

![EpoCanvas Mail data page: interface entries for profile, mail archive and configuration exports; all exports have field limits, and a time-range option does not mean the backend applies it; attachment usage and object-storage entries appear below (interface in Simplified Chinese)](/images/mail/en/ui/data-guide.png)

*Figure: the data page. Export and storage management appear on one page; attachment usage counts against the identity group's quota.*

<details>
<summary>Walkthrough: Data —  four regions of personal-data autonomy</summary>

The four cards of the data page: three export formats, a forwarding region, a storage region and a third-party grants region — personal data autonomy in one screen.

1. **Export card**: JSON, mail archive and configuration exports all use the same backend response, containing only selected fields. The time range is not applied, and this is not a complete backup. Individual .eml files are also reconstructed from existing fields.
2. **Forwarding card**: Telegram and mail-forwarding settings; availability is controlled by the administrator. Personal smart-rule forwarding (`rules`) is currently unavailable, forwards nothing at runtime and does not fall back to all mail; Telegram notification scope, preview and code-copy controls are enforced according to their settings. See the Notifications & Forwarding Guide.
3. **Storage card**: Attachment usage and quota; personal Backblaze B2/S3 storage can receive new attachments, while other limits still apply. Disconnecting does not migrate or delete old objects, nor guarantee continued access to old attachments.
4. **Third-party apps card**: View and revoke OAuth grants; the server can reject subsequent related requests, but cannot recall data already provided, ID tokens already issued or third-party sessions.

</details>

| Export | Format | Scope |
| --- | --- | --- |
| Full-data export (interface label) | JSON | Selected profile fields, selected fields of mail not marked deleted, and `customLabels`; excludes attachment files, complete contacts and rules, security settings and audit records |
| Mail history archive | MBOX, JSON or CSV | The browser converts mail fields from the same response; the backend does not apply the time range, and trash mail and complete original MIME are excluded |
| Contacts and configuration | JSON | The returned subset of profile fields, `customLabels` and export time; not a complete backup of contacts, aliases or all preferences |

Individual .eml files are reconstructed from existing fields; see [Data Export & Storage](/en/mail/data/) for the full export limitations. See the [Notifications & Forwarding Guide](/en/mail/notify/) for linking, filtering and link-revocation limits in the notifications-and-forwarding area. Personal Backblaze B2/S3 storage can route new attachments to your own storage and bypass system quota checks in the attachment-saving path, but other mail, sending and provider limits still apply. Disconnecting does not migrate or delete old objects.

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
| Audit report | Triaging, handling, evidence drawers and appeal adjudication of risk tickets across the four boards |

<span id="operator-notice"></span>

The Operator and Privacy card requires an identifiable operator name, actual country or region, contact email, terms version and valid Terms of Service and privacy-notice links. Add an appropriate contact address and recipient and retention information as applicable. Missing required information blocks new registration; existing sign-in and initialization remain available. New users actively select an initially unchecked terms-acceptance box. The server records the account, version, time, language and terms URL; the privacy notice is not blanket consent.

<span id="optional-processing"></span>

Optional verification-code extraction, translation and OCR default to off and require a data-destination notice before activation. Automatic code extraction also needs the user's explicit data-settings choice; translation requires confirmation of the current notice for each request, and OCR a separate selection for that request. Public translation fallback is unavailable. Data settings also offer revocation of existing Telegram reading links and explicitly confirmed device-data clearing. Account closure reports disabled access and deletion awaiting verification, not erasure of every copy. Upgrade the frontend and backend together; configuration cannot prove actual identity, contracts, recipients or retention practices.

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

The audit-report page presents site-wide risk events in four boards — abuse threats, appeal audits, risk management and action records — each summarizing one class of tickets with its own differentiated ticket table:

| Board | Tickets included | Usual triage |
| --- | --- | --- |
| Abuse threats | LV3+ threat accounts: multi-accounting, severe reports, etc. | Verify the evidence, then unban, ban or extend |
| Appeal audits | Appeals submitted against handling decisions | Review each form, then release or reject |
| Risk management | Routine risk control: spam, roaming IP jumps, etc. | Triage and archive by violation level |
| Action records | Finalized handling and archive updates | Trace the full ledger and appeal counts |

![EpoCanvas Mail audit-report page: four board cards on top with a differentiated ticket table, the toolbar offering batch extension, refresh, reset, data export, history clean-up and a docs link](/images/mail/en/ui/audit-guide.png)

*Figure: the audit report. Each of the four boards summarizes one class of tickets; in encrypted mode the record timestamps are redacted.*

<details>
<summary>Walkthrough: Audit —  the four-board ticket console</summary>

The four annotated zones of the audit page: the board cards set the triage direction, tickets are handled row by row.

1. **Abuse-threat card**: the consolidated ledger of LV3+ threat accounts with a live "pending N / banned N" count; clicking enters the threat board's compact handling view.
2. **Appeal-audit card**: the number of appeal tickets and the entry to per-ticket form review; a release restores the account's sending capability.
3. **Risk-management card**: routine risk tickets triaged by violation level, alarm reason and deadline.
4. **Action-record card**: the finalized-handling ledger with update counts, last update and appeal counts; the full evidence-drawer, batch-handling and CSV-export details are in [Operation Reports](/mail/audit/).

</details>

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
