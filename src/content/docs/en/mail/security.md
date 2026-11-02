---
title: Account Security Guide
description: The EpoCanvas Mail account security guide — enabling two-step verification in three steps, managing recovery codes, registering passkeys, sign-in verification behaviour and account deletion.
---

**Updated: November 2, 2026 | Version: 5.25**

This page walks through every action on the "Settings → Security" page. The overall behaviour of two-step verification (trusted devices, forced policies) is described in [Operating Modes](/en/mail/modes/), Section 4; this page only covers configuration. Entry: sidebar "Settings → Security" (`#settings/security`).

![EpoCanvas Mail security settings page: password change and the two-step verification centre with three second factors](/images/mail/en/ui/twofa-guide.png)

*Figure: the security page. Username and password above, the two-step verification centre below.*

<details>
<summary>Walkthrough: The two-step centre —  four cards, three second factors</summary>

Four regions of the security page: the credential change entry on top, and the two-step-verification centre listing three second factors that can be combined.

1. **Username and password card**: Change the username and password, with the last change shown. Disabling two-step verification also requires the password plus a dynamic code here.
2. **Authenticator app (TOTP)**: After scanning the QR code it yields a 6-digit code every 30 seconds. Completing binding immediately reveals 10 recovery codes, each single-use, for moments when the app is unavailable.
3. **Backup recovery codes**: The fallback when the app is gone. The card shows how many remain; revealing the full codes or regenerating requires the account password, and a reset voids all old codes.
4. **Passkeys**: Hardware security keys or device biometrics. A newly registered passkey activates once approved by the bound authenticator (or automatically after a 30-day time lock); "Test" then verifies the unlock flow.

</details>

## 1. Security page tour

| Block | Contents |
| --- | --- |
| Username and password | Change username, change password (shows the last change time) |
| Two-step verification centre | Master switch state, plus three cards: authenticator app, backup recovery codes, passkeys |
| Account deletion | Deletion entry at the bottom of the page |

The centre's visibility follows the instance mail mode: privacy and encrypted modes force it on for everyone; only in All Mail mode (Level 1) can the operator turn it off.

## 2. Enabling two-step verification (three steps)

1. On the "Authenticator app" card press "Set up", scan the QR code with your authenticator; if scanning fails, type the shown key manually;
2. Enter the 6-digit code from the authenticator to confirm the binding;
3. The page then shows 10 recovery codes: press "Copy all" or "Download .txt" to keep them, or print them for offline storage. Each code works once, for signing in when the authenticator is unavailable.

## 3. Recovery-code management

- The card shows the remaining usable count at all times;
- Viewing the full list or regenerating requires the account password;
- Regenerate before the codes run out; a reset voids every old code.

## 4. Passkeys

1. On the "Passkeys" card press "Add" and name the key (for example MacBook Touch ID, YubiKey 5C); the browser or system then runs its registration flow;
2. A freshly registered passkey is pending: activate it immediately by approving with the bound authenticator, or wait for the 30-day time lock to elapse;
3. Once active its state is active; use "Test" to check the unlock flow, and delete when no longer needed.

## 5. Sign-in verification

- After the password, the second factor runs as configured: a dynamic code, a recovery code or a passkey, whichever you choose;
- Ticking "Don't ask again on this device" at sign-in exempts the device from re-verification for 30 days (rules in [Operating Modes](/en/mail/modes/), Section 4);
- When the system detects an abnormal sign-in environment (multi-region, multi-IP concurrency) it escalates: even after the first factor passes, a different second factor is demanded;
- Turning two-step verification off requires the account password plus the current dynamic code or one recovery code.

## 6. Account deletion

The entry at the bottom requests deletion of the current account. This round's local implementation first disables the account and all its mailboxes in D1, then revokes sessions, personal access tokens (PATs), device trust, pending OAuth credentials and grants. Inbound mail for disabled accounts is blocked before AI processing. Public-profile display choices are enforced by the backend, and inactive accounts' public profiles return 404. Reading and attachment-sharing requests recheck the current account and message state and revocation version each time. Ordinary logout is not this account-wide revocation or account deletion. These are local code mechanisms, not confirmation that every live instance has been updated.

A `manual_review` result means access is disabled but deletion still awaits manual review, not that physical erasure is complete. `cleanup_failed` means the account remains disabled while some cleanup needs attention; contact the operator and track the request. Administrators can inspect the object-cleanup queue but cannot cancel a deletion request by a one-click restore. Original BYO object locations are retained until the queue confirms the work. Chat copies, server-hosted static avatars, audit records, backups and local drafts do not all disappear automatically on a deletion response. Check [Data Export](/en/mail/data/) before retaining data and separately confirm device-draft cleanup there; follow Sections 8 and 9 of the [Privacy Policy](/en/mail/privacy-policy/) to track complete deletion.

## 7. Related documents

| Resource | Link |
| --- | --- |
| Trusted-device periods and third-party sign-in rules | [Operating Modes](/en/mail/modes/) |
| Settings sections and where security lives | [Settings Guide](/en/mail/settings/) |
| Data export, notifications and forwarding | [Notifications & Forwarding Guide](/en/mail/notify/) |
| How passwords and tokens are stored | [Data Processing & Security](/en/mail/data-security/) |
