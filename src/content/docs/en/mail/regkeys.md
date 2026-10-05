---
title: Registration Keys
description: EpoCanvas Mail registration keys — issuing invitation codes, managing uses and expiry, and checking usage records, for administrators.
---

**Effective date: 6 October 2026 | Version: 5.15**

Registration Keys is the admin area's invitation-code interface (`#manage/admin/reg-keys`, permission key `reg-key:query`), controlling who can register on this instance. The three site-wide registration-code modes (required / off / optional) are decided by the website-settings card of [System Settings Cards](/en/mail/system/).

## 1. Issuing

The "Add" dialog issues one registration code at a time, configurable:

| Field | Description |
| --- | --- |
| Registration code | An 8-character random code; click refresh to regenerate |
| Bound group | Accounts registering through this code enter the specified identity group (groups in [Permissions](/en/mail/roles/)) |
| Valid until | Unusable after the expiry date |
| Uses | 1–99999; each successful registration decrements the count by one |

## 2. Management and verification

| Operation | Description |
| --- | --- |
| List | Shows remaining uses, bound group and expiry; sensitive segments are masked in the visitor view |
| Copy | Copy the code text in one click for distribution to invitees |
| Usage records | See which accounts have used the code |
| Delete | Void the code immediately |
| Clean unused | Clear every unused code in one click |

URLs carrying an invitation parameter (`?code=` / `?regKey=` / `?invite=`) prefill the registration form directly — see Section 5 of the [Interface & Route Map](/en/mail/interface/).

<details>
<summary>Walkthrough: Registration Keys</summary>

![Registration Keys](/images/mail/en/ui/regkeys.png)

1. Open the admin area's Registration Keys page (permission key `reg-key:query`).
2. Click "Add" to generate an 8-character random code (click refresh to regenerate).
3. Bind the identity group the registration will enter, and set the expiry and the number of uses (1–99999).
4. Copy the code and send it to the invitees; "Usage records" shows how it has been consumed; "Clean unused" voids every unused code in one click.

</details>

## 3. Related documents

| Resource | Link |
| --- | --- |
| Registration-code modes and the login-surface flow | [Operating Modes](/en/mail/modes/) |
| Definitions of the registration groups | [Permissions](/en/mail/roles/) |
| The open-registration switch | [System Settings Cards](/en/mail/system/) |
| Account responsibility for invited registration | [Terms of Service](/en/mail/terms-of-service/) |
