---
title: Operation Reports
description: "EpoCanvas Mail operation reports — the four-board risk ticket console: differentiated column sets for abuse threats, appeal audits, risk management and action records, with an evidence drawer, batch handling and appeal adjudication for administrators."
---

**Updated: November 2, 2026 | Version: 5.25**

Operation Reports is the risk-ticket console of the admin area (`#manage/admin/audit`; querying requires `setting:query`, while handling, adjudication and clean-up require `setting:set`). Tickets are persisted in a dedicated audit-log table with paginated history. Four report boards at the top each summarize one class of tickets; clicking a board switches the workbench below to that board's differentiated ticket table.

![EpoCanvas Mail operation reports page: four board cards on top and a differentiated ticket table, the abuse-threat card showing pending and banned counts, with a toolbar offering batch extension, refresh, reset, data export, history clean-up and a docs link](/images/mail/en/ui/audit-guide.png)

*Figure: Operation Reports. The four board cards set the direction, tickets are triaged row by row, and the evidence drawer plus CSV export close the loop.*

<details>
<summary>Figure guide: Operation Reports — six anchors of one ticket console</summary>

The six annotated zones of the operation reports page: the four board cards set the triage direction, while the evidence drawer and data export finish the job.

1. **Abuse-threat card**: the consolidated ledger of LV3+ threat accounts (multi-accounting, severe reports, account resale, etc.), with a live "pending N / banned N" count; clicking enters the threat board, and the "auto-folded batches today" bar below expands routine-inspection batches archived automatically.
2. **Appeal-audit card**: the number of appeal tickets submitted by users against decisions; enter the appeal board to review each form.
3. **Risk-management card**: the number of routine risk tickets such as spam and roaming IP jumps; enter the risk board and triage by violation level.
4. **Action-record card**: the ledger of finalized tickets (bans, unbans, archive updates); enter the record board to trace the full course.
5. **Evidence drawer (Details)**: the "Details" button on each ticket opens a read-only evidence drawer: side-by-side comparison of baseline versus actual evidence, the full handling timeline and a multi-dimensional risk profile.
6. **Export data**: exports the current board's tickets as a full-column CSV for offline triage and archiving.

</details>

## 1. Four boards and their differentiated ticket tables

| Board | Tickets included | Column-set highlights |
| --- | --- | --- |
| Abuse threats | LV3+ threat accounts: multi-accounting, severe reports, account resale, etc. | A compact handling view: ticket no., target, status, category, handling and actions |
| Appeal audits | Appeals submitted by users against decisions | Ticket no., identity group, violation category, alarm count, suggestion, expiry time and final authority |
| Risk management | Routine risk control: spam, roaming IP jumps, etc. | Adds violation level, alarm reason and deadline columns |
| Action records | Finalized handling and archive updates | Adds update count, last update and appeal count columns |

All four boards share the same filter and batch tools: after selecting tickets you can batch-unban, batch-ban, batch-extend or batch-delete; on the threat board the batch actions are narrowed to assigning an owner, starting a review and releasing, to avoid bulk permanent sanctions.

## 2. Ticket triage and handling

- Each ticket carries a ticket number, target (email and user identifier), status badge (pending, banned, released, etc.), violation category and handling suggestion; violation categories (outbound abuse, account security, content compliance, quota evasion, etc.) align with the sanction ladder in Section 6 of the [Acceptable Use Policy](/mail/acceptable-use/);
- Handling suggestions come from the policy engine (suggest ban, keep ban, temporary ban for N days, keep watching, routine archive, etc.), and the final-authority column records who decided: the system risk policy (automatic engine verdict), a security auditor or the master administrator;
- Inline actions cover unban, re-ban, extension (7 / 30 / 90 days or permanent) and appended review notes; the owner column distinguishes automated system programs from human security administrators.

## 3. Evidence drawer and handling timeline

"Details" opens the ban-ledger evidence (read-only) drawer — the ban ledger is a transparent, tamper-proof record for verifying evidence and preserving unban history:

- **Case card**: ticket number, current status, user email, ban time, last handling time, violation category, reason code and evidence-retention window (180 days remaining);
- **Risk assessment and grounds for handling**: the full appeal text, trigger reason and handling explanation;
- **Full-lifecycle handling timeline**: entries from rule-engine hit (policy engine) through ban enforcement (system) to manual review release (administrator);
- **Multi-dimensional risk profile**: a side-by-side comparison of "actual evidence values for this account" against "system baseline / normal values / risk thresholds" — device fingerprint, client, triggering IP, accounts sharing the same IP, subnet topology, user reports and delivery rate, item by item.

## 4. Appeal adjudication and handover

Appeal tickets are adjudicated by an administrator after verifying the evidence drawer: release or reject — release immediately restores the account's sending capability; bans can also be enforced from the [User List](/mail/users/). The sanction ladder and users' appeal rights are in Section 6 of the [Acceptable Use Policy](/mail/acceptable-use/).

<details>
<summary>Figure guide: triaging a warning ticket</summary>

![Triaging a warning ticket](/images/mail/en/ui/audit.png)

1. Open "Operation Reports" in the admin area (querying requires `setting:query`, handling requires `setting:set`).
2. Click a board card to switch the ticket set, or filter by status, violation category or risk level.
3. Open the "Details" evidence drawer and verify the side-by-side evidence comparison and handling timeline.
4. Handle per board: unban, re-ban, extend or append notes; for appeal tickets, release or reject.
5. Use "Export data" to export the current board's tickets as CSV for the record.

</details>

## 5. Export, clean-up and mode linkage

- **Export data**: exports the current board's tickets as a full-column CSV (with BOM, openable directly in spreadsheet software);
- **Clean historical logs**: one click clears non-critical routine-inspection records (only normal-risk audit records); ban and appeal ledgers are untouched;
- **Circuit-breaker bar**: when the global circuit breaker trips, a warning bar appears at the top of the threat board — during a trip, new violations are only held back and accounts are not banned automatically;
- **Mail-mode linkage**: in encrypted mode (Level 3) record timestamps are redacted; tickets can still be triaged by category and evidence, but the original event order cannot be reconstructed.

## 6. Related documents

| Resource | Link |
| --- | --- |
| Configuring warning thresholds | [System Settings Cards](/mail/system/) |
| Banning and restoring accounts | [User List](/mail/users/) |
| Login-side behaviour of risk control | [Account Security Guide](/mail/security/) |
| Sanction ladder and appeal rights | [Acceptable Use Policy](/mail/acceptable-use/) |
