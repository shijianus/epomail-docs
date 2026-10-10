---
title: Interface & Route Map
description: EpoCanvas Mail interface and route map — the eight mailbox views, the compose overlay, every settings and admin route, the login surface flows, the OAuth consent page and public profiles.
---

**Effective date: 5 October 2026 | Version: 5.17**

This page walks through every EpoCanvas Mail interface and its route. A location consists of two parts: the path prefix `/mail/u/N/` (N is the multi-account session index; always 0 for a single account) and the view route after `#` (for example `#inbox`). Legacy direct paths such as `/inbox` are normalised automatically. The login surface is deployed separately under `/login/`. What each route allows is decided by identity-group permissions, see [Operating Modes](/en/mail/modes/); the effect of each setting is described in the [Settings Guide](/en/mail/settings/).

![EpoCanvas Mail inbox panorama: compose entry and folder tree on the left, message list with verification-code badges and official markers on the right](/images/mail/en/ui/views-guide.png)

*Figure: the inbox (`#inbox`). The eight views share one list skeleton; counters and labels stay in sync.*

<details>
<summary>Walkthrough: The inbox at a glance —  the four entries you reach for first</summary>

Four annotated regions of the inbox, matching the four most-used entries: writing a new message, revisiting starred mail, checking deferred items and auditing what was sent.

1. **Compose (top sidebar button)**: The single entry point for new mail: it opens the compose overlay (not a route). On mobile it becomes a floating button, and the `?composeTo=<address>` deep link pre-fills the recipient. Available from any view.
2. **Starred (sidebar folder)**: Every starred message gathers here across folders: tap the star on a list row to add one. Use it for mail you must keep at hand; the sidebar count updates in real time.
3. **Snoozed (sidebar folder)**: A holding area for deferred follow-ups in two tiers (urgent and waiting). Choose "Snooze" on a message with a time; it returns to the top of the inbox automatically when due.
4. **Sent (sidebar folder)**: The archive of everything this account sent. Outbound volume is capped by the role's daily quota; in-site mail is delivered directly, off-site mail goes through the delivery channel.

</details>

## 1. Mailbox main interface

After signing in, the main interface is organised by view route. The nine routes:

| View route | Interface | Main contents |
| --- | --- | --- |
| `#inbox` | Inbox | Default view; ascending/descending time order, polled incremental insertion of new mail, virtualised list, unread dots, conversation grouping |
| `#all` | All Mail | Cross-folder aggregate view; clicking a sidebar label jumps here filtered by that label |
| `#message` | Message detail | Reply / reply-all / forward, star, read/unread, move to, report spam, snooze, labelling, emoji reactions, AI full-text translation, printing a message or conversation, .eml download, original headers, sender blocking, filter creation from here |
| `#sent` | Sent | Mail sent by the account |
| `#drafts` | Drafts | Local drafts; recipients left empty show a placeholder marker |
| `#starred` | Starred | Collection of starred mail |
| `#snoozed` | Snoozed | Urgent and waiting tiers; returns to the inbox automatically when due |
| `#spam` | Spam | Mail judged spam by the system or by users |
| `#trash` | Trash | Deleted mail; physically erased seven days after receipt |

Composing is an overlay rather than a route, triggered from three places: the sidebar "Compose" button, the mobile floating button (send permission required) and the deep link `?composeTo=<address>` (opens the compose window with the recipient prefilled).

![EpoCanvas Mail compose window: sender locked to the current mailbox, rich-text toolbar with attachments and send button](/images/mail/ui/ui-compose.png)

*Figure: the compose overlay. In-instance mailboxes are delivered directly; off-instance mail goes through the operator's delivery channel.*

<details>
<summary>Walkthrough: The compose overlay region by region, top to bottom</summary>

The compose overlay top to bottom: locked sender, recipients and subject, the rich-text toolbar, the body editor and the bottom action bar.

- **Sender row**: The sender is locked to the signed-in mailbox and cannot be edited while composing, so mail from this platform cannot carry a forged From. Multi-mailbox accounts switch sending identity in this row; recipients see whichever mailbox was chosen. The sender address also decides which delivery channel the outbound mail takes.
- **Recipient and subject rows**: Recipients accept contact picking and the `?composeTo=` deep link; the subject appears in lists and is searchable via `subject:`.
- **Toolbar and body**: 17 formatting tools: paragraph, size, styles, colour, alignment, lists, quote, link, image, table, emoji, translation and source mode.
- **Bottom action bar**: The attachment button (role-gated, per-instance size cap) and Send; in-site delivery is direct, off-site goes through the operator's channel.

</details>

## 2. Interface skeleton

The main interface consists of four regions:

| Region | Elements |
| --- | --- |
| Top bar | Search box (mail search on mail pages, settings search on settings pages, see the [Search & Rules Reference](/en/mail/search/)), light/dark toggle, help, notice bell (shown when unread notices exist), account menu (avatar, storage bar, account details, settings, sign-out; the menu footer carries external links to the project introduction, privacy policy and terms of service; multi-account mode adds switching, adding and signing out everywhere) |
| Sidebar | Compose button, eight folder navigation items with unread counts, label area (up to 7) and new-label entry |
| Status bar | Connection state, last sync time, unread count, mail-mode badge (indicated in encrypted mode) and version number |
| Main area | The list or detail of the current view |

Below 1025 pixels of width the sidebar collapses into a drawer summoned with a scrim, and closes automatically on route change.

## 3. Settings area

Entering settings swaps the main area for settings panels and hides the mail sidebar. Five section routes:

| Section route | Section | Contents |
| --- | --- | --- |
| `#settings/profile` | Personal | Avatar, nickname, gender, birthday, e-mail, phone and addresses |
| `#settings/general` | General | Bio, appearance colour scheme, theme wallpaper, reading preferences, language and data privacy |
| `#settings/security` | Security | Username and password, two-step verification centre, passkeys, account deletion |
| `#settings/data` | Data | Data export, notifications and forwarding, third-party app authorisations, storage |
| `#settings/labels` | Labels | Label management and the classification rule builder |

![EpoCanvas Mail general settings page: personalisation area, theme wallpaper and appearance colour scheme](/images/mail/ui/ui-settings-general.png)

*Figure: the General section. The five settings sections share one skeleton; the left column is the section navigation.*

<details>
<summary>Walkthrough: The settings shell —  the left rail and the right pane</summary>

How the general settings section looks: the left rail navigates the five settings sections; the right pane holds the general items (theme, wallpaper, …).

- **Section rail**: Switches among Profile/General/Security/Data/Labels; entering settings hides the mail sidebar until "back to mail".
- **Personalisation group**: Three theme modes (dark/light/system) and the global wallpaper (eight presets plus a custom image or URL). Its scope is every view in the app — unlike the personal background, which covers the mailbox area only. The top bar also carries a quick theme toggle, so you need not return here.
- **Remaining groups**: The three remaining groups on this page: reading preferences (inbox type, reading-pane position, conversation view), language (one of six UI languages, one of sixteen AI translation targets) and data privacy (the hub for personal-info and AI-processing preferences). This figure shows only the rail and the look; Section 3 of the settings guide explains each item.

</details>

## 4. Admin area

Admin routes take the form `#manage/admin/<section>`; the role-group segment of the path must match the account's identity (`admin` for the master, `moderator` for moderators) and is normalised to an available section otherwise. Each section is bound to an independent permission key, granted per group on the permission page:

| Section route | Section | Permission key | Responsibility |
| --- | --- | --- | --- |
| `#manage/admin/analysis` | Analytics | `analysis:query` | Volume, interception rate, source distribution, growth curves and AI usage dashboards |
| `#manage/admin/users` | User list | `user:query` | Account lookup, password reset, group changes, bans and restoration |
| `#manage/admin/mail` | All Mail | `all-email:query` | Full-store mail review, `$` advanced search, detail drawer and physical deletion |
| `#manage/admin/roles` | Permissions | `role:query` | Identity groups, quota templates and AI model authorisation |
| `#manage/admin/reg-keys` | Registration keys | `reg-key:query` | Issuing and verifying invitation codes |
| `#manage/admin/system` | System settings | `setting:query` | Instance-level configuration; the card list appears in the [Settings Guide](/en/mail/settings/) |
| `#manage/admin/apps` | App management | `setting:query` | OAuth 2.0 / OIDC third-party application credentials |
| `#manage/admin/rules` | Classification | `setting:query` | Send/receive switches, AI recognition, allow/block lists and hard interception |
| `#manage/admin/audit` | Operation reports | `setting:query` | Triage, handling and appeal adjudication of the four warning types |

![EpoCanvas Mail operation reports page: warning tickets of four types with handling buttons](/images/mail/ui/ui-audit-report.png)

*Figure: Operation reports (`#manage/admin/audit`). Triage happens in one list; handling buttons split by warning type.*

<details>
<summary>Walkthrough: The audit page as a table on the admin side</summary>

The audit page as admins see it: tickets in a table, with actions branching by ticket category.

- **Ticket table**: One alert per row, with columns for category (audit, risk control, ban, appeal), priority (P0/P1), current status and the environment pool in plain text — IP, geo, device and fingerprint. The pool aggregates by request behaviour, so the anomaly only becomes visible once one account logs in concurrently from many IPs.
- **Action buttons**: The buttons branch by ticket category: appeal tickets foreground "release after review" (releasing restores the account), ban tickets foreground "lift the alert", and the rest fall back to the standard action menu. The button records only the verdict; the ban or restore itself is executed from the users page, and the two pages stay in sync.
- **Mode coupling**: One table, three shapes: under all-mail mode (L1) it carries the most information; under private mode (L2) it looks as in this figure; under encrypted mode (L3) timestamps are stripped and the time column hides, leaving the admin to adjudicate from category and environment pool alone, without any way to reconstruct the order of events.

</details>

## 5. Login surface

`/login/` is a separate login application deployed apart from the main interface. One login card carries all flows:

| Flow | Behaviour |
| --- | --- |
| Password sign-in | Account (e-mail) and password submitted; repeated failures trigger brute-force lockout |
| Two-step verification | Authenticator app (six-digit TOTP), backup recovery codes and passkeys — one factor or several in step-up; ticking "Don't ask again on this device" grants 30-day trust |
| Third-party sign-in | Providers enabled and configured by the administrator appear as buttons; enabled ones without credentials show greyed as "coming soon" |
| Registration | E-mail (optional preset domain suffix), password and registration code; the code modes are required, off and optional, and the URL may carry invitation parameters |
| Forgot password | A dialog jumps to the external appeal portal carrying the appeal type, interface language and e-mail address |
| Add account | In multi-account mode reached via `?action=addAccount&u=N`; after signing in the session lands in the corresponding slot |

![EpoCanvas Mail login page: e-mail and password fields, the "stay in orbit" checkbox and third-party quick sign-in buttons](/images/mail/ui/ui-login-oauth.png)

*Figure: the login page. The three-state display rule for third-party buttons appears in [Operating Modes](/en/mail/modes/), Section 4.*

<details>
<summary>Walkthrough: Every flow the sign-in page carries</summary>

The sign-in page at large: one card hosts password login, two-step verification, third-party sign-in, registration and password recovery.

- **Input area**: The path most visitors take: the email is the account, and the password is stored as a salted hash — the server never sees plaintext. Repeated failures trigger brute-force lockout, whose granularity and duration the backend decides; ticking keep-this-device-trusted skips re-verification for 30 days.
- **Third-party area**: Providers the admin enabled and keyed appear as buttons; enabled-but-unkeyed ones show greyed as "coming soon"; the rest never appear.
- **Other flows**: The same card carries three further paths: accounts with two-step verification continue to a second factor (TOTP, a recovery code or a passkey); in reg-key mode a code parameter pre-fills the registration form; and forgot-password hops to the external appeal portal carrying the appeal type, UI language and email. Section 4 of the modes page has the rules.

</details>

## 6. Standalone pages and global capabilities

| Interface | Route | Description |
| --- | --- | --- |
| OAuth consent page | `#/oauth/authorize` | Shown when a third-party app requests authorisation: app information, official badge, scope list, and authorise / cancel |
| Public profile | `/<username>` | Reachable without sign-in; shows avatar, time zone, identity group, join date, a personal data board and "e-mail me"; gated by the administrator's "public profiles" switch |
| 404 page | other paths | Empty-state page for unknown paths with a way back |
| PWA | — | The web app can be installed; an Android app (epomail) is also provided |

The mail mode also reshapes the admin interface: in encrypted mode (Level 3) the full-store review entry is hidden and operation reports shed their timestamps, see [Operating Modes](/en/mail/modes/), Section 2.

## 7. Related documents

| Resource | Link |
| --- | --- |
| OAuth app registration and endpoint integration tutorial | [OAuth app registration and endpoint integration tutorial](/en/mail/api/) |
| Search operators, admin search and rule conditions | [Search & Rules Reference](/en/mail/search/) |
| Each settings section in detail | [Settings Guide](/en/mail/settings/) |
| Feature details with screenshots | [Features Guide](/en/mail/features/) |
| Operating forms and permission groups | [Operating Modes](/en/mail/modes/) |
| Project positioning and deployment | [Project Overview](/en/mail/project/) |
