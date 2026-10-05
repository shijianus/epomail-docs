---
title: Interface & Route Map
description: EpoCanvas Mail interface and route map — the eight mailbox views, the compose overlay, every settings and admin route, the login surface flows, the OAuth consent page and public profiles.
---

**Effective date: 5 October 2026 | Version: 5.13**

This page walks through every EpoCanvas Mail interface and its route. A location consists of two parts: the path prefix `/mail/u/N/` (N is the multi-account session index; always 0 for a single account) and the view route after `#` (for example `#inbox`). Legacy direct paths such as `/inbox` are normalised automatically. The login surface is deployed separately under `/login/`. What each route allows is decided by identity-group permissions, see [Operating Modes](/en/mail/modes/); the effect of each setting is described in the [Settings Guide](/en/mail/settings/).

![EpoCanvas Mail inbox panorama: compose entry and folder tree on the left, message list with verification-code badges and official markers on the right](/images/mail/ui/ui-inbox-zh.png)

*Figure: the inbox (`#inbox`). The eight views share one list skeleton; counters and labels stay in sync.*

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
| `#settings/data` | Data | Data export, notifications and forwarding, API access, third-party app authorisations, storage |
| `#settings/labels` | Labels | Label management and the classification rule builder |

![EpoCanvas Mail general settings page: personalisation area, theme wallpaper and appearance colour scheme](/images/mail/ui/ui-settings-general.png)

*Figure: the General section. The five settings sections share one skeleton; the left column is the section navigation.*

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
| Search operators, admin search and rule conditions | [Search & Rules Reference](/en/mail/search/) |
| Each settings section in detail | [Settings Guide](/en/mail/settings/) |
| Feature details with screenshots | [Features Guide](/en/mail/features/) |
| Operating forms and permission groups | [Operating Modes](/en/mail/modes/) |
| Project positioning and deployment | [Project Overview](/en/mail/project/) |
