---
title: User List
description: EpoCanvas Mail user list — account lookup, password reset, identity-group change, two-step verification reset, ban and restore, for administrators.
---

**Effective date: 6 October 2026 | Version: 5.17**

The User List is the admin area's account-management interface (`#manage/admin/users`, permission key `user:query`), where administrators look up and handle every account on the instance.

![Figure: the user list](/images/mail/en/ui/users-guide.png)

*Figure: the user list*

<details>
<summary>Walkthrough: The user list —  from locating an account to acting on it</summary>

Four regions of the user list: from lookup to per-row actions, an account-management flow on a single screen.

1. **Email search box**: Locate accounts by email at the top, with instant paging and sorting; combined with the per-row sent/received, storage and spam/report counters, anomalies surface fast.
2. **Email column**: The account's unique identity — the email is the account, the key for signing in, receiving mail and every grant. Row actions (reset password, change role, ban) apply to the account this column names; the other counters on the page — sent/received, storage, spam and reports — are what tell you whether an account looks abnormal.
3. **Storage column**: Live attachment-storage usage for the account; read it against the role quota to decide on expansion or clean-up.
4. **Actions column**: Per-row operations: reset password (issues a one-time password), change role, reset two-step verification, ban and restore, and purge the account's mail (irreversible — use with care).

</details>

## 1. List and search

The list shows each account row by row with mailbox, send/receive volume, storage usage, spam and reported counts and other dimensions; the top bar supports searching by mailbox; paging and sorting answer on the spot.

## 2. Account operations

| Operation | Description |
| --- | --- |
| Reset password | Issue the account a new one-time password and notify it to sign in again |
| Change identity group | Move the account to another group; quota and permissions switch immediately (group definitions in [Permissions](/en/mail/roles/)) |
| Reset two-step verification | The emergency channel when an account cannot pass two-step verification; clears its TOTP / passkey configuration |
| Ban and restore | A banned account loses its session at once; after restoration it can sign in again |
| Mailbox wipe | Erase the mail under the account (irreversible; use with care) |

## 3. Handling and appeals

A ban enters [Operation Reports](/en/mail/audit/) as a warning ticket; the affected user can appeal through the appeal portal or in-site channels, and an administrator adjudicates. The enforcement ladder and the principle of proportionality are in Section 6 of the [Acceptable Use Policy](/en/mail/acceptable-use/).

<details>
<summary>Walkthrough: the User List</summary>

1. Open the admin area's User List (permission key `user:query`).
2. Use the top search box to locate an account by mailbox.
3. In the row action menu, choose: reset password, change identity group, reset two-step verification, ban and restore, or mailbox wipe.
4. Bans and handling decisions enter Operation Reports as warning tickets for later appeal adjudication.

</details>

## 4. Related documents

| Resource | Link |
| --- | --- |
| Identity groups and quota templates | [Permissions](/en/mail/roles/) |
| Site-wide mail-dimension review | [Full-Store Mail Review](/en/mail/review/) |
| Warning tickets and appeal adjudication | [Operation Reports](/en/mail/audit/) |
| Data overview dashboards | [Analytics](/en/mail/analysis/) |
