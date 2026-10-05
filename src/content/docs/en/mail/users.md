---
title: User List
description: EpoCanvas Mail user list — account lookup, password reset, identity-group change, two-step verification reset, ban and restore, for administrators.
---

**Effective date: 6 October 2026 | Version: 5.15**

The User List is the admin area's account-management interface (`#manage/admin/users`, permission key `user:query`), where administrators look up and handle every account on the instance.

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

## 4. Related documents

| Resource | Link |
| --- | --- |
| Identity groups and quota templates | [Permissions](/en/mail/roles/) |
| Site-wide mail-dimension review | [Full-Store Mail Review](/en/mail/review/) |
| Warning tickets and appeal adjudication | [Operation Reports](/en/mail/audit/) |
| Data overview dashboards | [Analytics](/en/mail/analysis/) |
