---
title: Personal Data & General Settings
description: EpoCanvas Mail personal data and general settings — avatar, nickname, contact details and addresses, appearance and theme wallpapers, reading preferences and interface language, item by item.
---

**Effective date: 6 October 2026 | Version: 5.17**

This page covers every item in the "Settings → Personal" and "Settings → General" sections. Security and data settings are covered separately in the [Account Security Guide](/en/mail/security/) and [Data Export & Storage](/en/mail/data/).

![Figure: the personal data & general settings interface](/images/mail/en/ui/preferences-guide.png)

*Figure: the personal data & general settings interface*

<details>
<summary>Walkthrough: Profile —  personal data split across four dimensions</summary>

The four cards of the profile page: identity, contact, addresses and linked settings — four dimensions of your personal data, card by card.

1. **Basics card**: Avatar upload, display name, gender and birthday. Whether name and avatar appear publicly is gated by the operator's "public profile" switch.
2. **Contact card**: The sign-in mailbox carries a "primary" tag and cannot be removed; extra mailboxes can be added and dropped at will, plus a phone number with area code.
3. **Address cards**: Home, company and other addresses are stored separately, each added, edited and removed on its own. They are profile data in the strict sense: never used for delivery, never affecting billing or the role. Whether they are needed at all — and whether they show publicly — depends on the operator public-profile switch.
4. **Linked settings and security card**: The springboard from the profile page into the other settings pages: account security (username, password, two-step verification) and third-party grants (authorised apps) sit together here, so you need not hunt back and forth between the profile and security pages. Each entry jumps to the matching section rather than opening a new page.

</details>

## 1. Personal data (`#settings/profile`)

| Card | Contents |
| --- | --- |
| Basic information | Avatar upload, nickname, gender, birthday |
| Contact information | Sign-in primary mailbox (with the primary-mailbox tag), multiple additional e-mail addresses that can be added and removed at any time, phone numbers with country codes |
| Addresses | Three address cards: home, company and other |

How much of this is shown publicly is gated by the administrator's "public profiles" switch; when open, the profile is reachable at `/<username>` — see Section 6 of the [Interface & Route Map](/en/mail/interface/).

## 2. General (`#settings/general`)

| Group | Contents |
| --- | --- |
| Bio | A short bio shown on the public profile |
| Personalisation | Appearance colour scheme (dark / light / follow-system), global theme wallpaper (eight presets + custom wallpaper and URL), personal background, interface density |
| Reading preferences | Inbox type, reading-pane position, conversation-view switch |
| Language | One of six interface languages; the default translation target language is set independently (one of 16); image OCR translation can be switched off separately |
| Data privacy | Central entrance for the personal-information and AI-processing preferences |

## 3. Scope of the appearance settings

The global theme wallpaper applies to every view, while the personal background covers only the mailbox area; dark/light can also be toggled quickly from the top bar. System mail and welcome mail are delivered in the recipient's language, independent of the interface language setting.

<details>
<summary>Walkthrough: Personal data and General</summary>

1. "Settings → Personal": upload an avatar and fill in the nickname, gender and birthday.
2. The contact-information card holds multiple additional e-mail addresses and phone numbers with country codes; the address cards store home, company and other addresses separately.
3. "Settings → General": choose the appearance colour scheme (dark / light / follow-system) and the global theme wallpaper (eight presets or custom).
4. Set the reading preferences (inbox type, reading-pane position, conversation view) and the interface language; the default translation target language is one of 16.

</details>

## 4. Related documents

| Resource | Link |
| --- | --- |
| What the public profile shows | [Interface & Route Map](/en/mail/interface/) |
| Data handling of the translation capability | [Privacy Policy](/en/mail/privacy-policy/), Section 6 |
| Password and two-step verification | [Account Security Guide](/en/mail/security/) |
| Where the two sections live in settings | [Settings Guide](/en/mail/settings/) |
