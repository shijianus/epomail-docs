---
title: Operation Reports
description: EpoCanvas Mail operation reports — triage of the four warning classes, handling buttons, appeal adjudication and timestamp stripping in encrypted mode, for administrators.
---

**Effective date: 6 October 2026 | Version: 5.16**

Operation Reports is the admin area's risk-ticket interface (`#manage/admin/audit`; querying needs `setting:query`, handling and adjudication need `setting:set`). Tickets are persisted in a dedicated audit-log table, and history is searchable with paging.

![EpoCanvas Mail operation reports page: warning tickets of the four classes, plain-text environment details and handling buttons (interface in Simplified Chinese)](/images/mail/ui/ui-audit-report.png)

*Figure: Operation Reports. Each ticket carries its class, priority, status and the active-environment pool shown as plain text.*

## 1. The four warning classes

| Class | Trigger | Usual handling |
| --- | --- | --- |
| Audit warning | A report by other users or a rule violation is upheld | Verify, then release or apply controls |
| Risk warning | A security red line or an anomalous sign-in environment (e.g. concurrent logins from multiple locations and IPs) | Watch closely, interview or ban |
| Ban warning | The account has been banned automatically by the system or manually by an administrator | Dismiss the warning or maintain the ban |
| Appeal warning | The user has appealed against a handling decision | Release or reject |

## 2. Ticket contents and handling

- Every ticket carries its class, priority (P0 / P1 …), status and full environment details (IP, geolocation, device, fingerprint), all shown as plain text with no nested frames;
- Handling buttons are routed by class: appeal warnings highlight "release", ban warnings highlight "dismiss the warning", and ordinary warnings offer a standard action menu;
- In encrypted mode (Level 3) record timestamps are stripped and the time column is hidden, but tickets can still be adjudicated.

## 3. Appeal adjudication

Appeal tickets are adjudicated by an administrator, who verifies the environment and the grounds before choosing "release" or rejecting; the enforcement ladder and the user's right of appeal are in Section 6 of the [Acceptable Use Policy](/en/mail/acceptable-use/). Bans are executed from the [User List](/en/mail/users/).

<details>
<summary>Walkthrough: adjudicating the warning tickets</summary>

![Adjudicating the warning tickets](/images/mail/en/ui/audit.png)

1. Open the admin area's Operation Reports (querying needs `setting:query`, handling needs `setting:set`).
2. Filter the tickets by class (audit / risk / ban / appeal) and priority.
3. Verify the plain-text environment details: IP, geolocation, device and fingerprint.
4. Handle by class: appeal warnings "release", ban warnings "dismiss the warning", ordinary warnings through the action menu.
5. In encrypted mode the timestamps are stripped yet tickets can still be adjudicated; the handling result drives the user-side ban and restore.

</details>

## 4. Related documents

| Resource | Link |
| --- | --- |
| Configuring the warning thresholds | [System Settings Cards](/en/mail/system/) |
| Ban and restore operations | [User List](/en/mail/users/) |
| Sign-in-side behaviour of risk triggers | [Account Security Guide](/en/mail/security/) |
| The enforcement ladder and the right of appeal | [Acceptable Use Policy](/en/mail/acceptable-use/) |
