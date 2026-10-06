---
title: Account Security Guide
description: The EpoCanvas Mail account security guide — enabling two-step verification in three steps, managing recovery codes, registering passkeys, sign-in verification behaviour and account deletion.
---

**Effective date: 5 October 2026 | Version: 5.16**

This page walks through every action on the "Settings → Security" page. The overall behaviour of two-step verification (trusted devices, forced policies) is described in [Operating Modes](/en/mail/modes/), Section 4; this page only covers configuration. Entry: sidebar "Settings → Security" (`#settings/security`).

![EpoCanvas Mail security settings page: password change and the two-step verification centre with three second factors](/images/mail/en/ui/twofa-guide.png)

*Figure: the security page. Username and password above, the two-step verification centre below.*
*Annotations: 1. Authenticator Ap　2. Backup Recovery 　3. Passkeys & Secur　4. Back to Mail*

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

A deletion entry sits at the bottom of the page. After deletion the account data follows the erasure clauses of the [Privacy Policy](/en/mail/privacy-policy/); export your data first via "Settings → Data" (see [Notifications & Forwarding Guide](/en/mail/notify/)).

## 7. Related documents

| Resource | Link |
| --- | --- |
| Trusted-device periods and third-party sign-in rules | [Operating Modes](/en/mail/modes/) |
| Settings sections and where security lives | [Settings Guide](/en/mail/settings/) |
| Data export, notifications and forwarding | [Notifications & Forwarding Guide](/en/mail/notify/) |
| How passwords and tokens are stored | [Data Processing & Security](/en/mail/data-security/) |
