---
title: Official Mail Specification & Tamper-Proof Verification
description: How EpoCanvas Mail official system mail is issued and identified — the official flag, immutable delivery, client-side rendering isolation, and document tamper-proof verification.
---

**Updated: November 2, 2026 | Version: 5.25**

This document explains how official system mail is issued and how to identify it, and describes the tamper-proof verification mechanism for the legal documents on this site, so you can confirm the authenticity of official communications and documents. It is established under the [Privacy & Terms Overview](/en/mail/overview/) and [Data Processing & Security Maintenance](/en/mail/data-security/).

The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The legal and technical documents on this site follow the open-source implementation of the service and aim to establish transparent, rigorous, non-commercial community communication norms.

![EpoCanvas Mail three-layer official mail pipeline: the issuance layer locks the official sender address and injects the official flag; the delivery layer fixes an immutable snapshot with preset-translation fallback; the client layer isolates rendering with Shadow DOM and content sanitizing](/images/mail/en/anti-tamper-architecture.svg)

*Figure: the three layers of official-mail processing. The issuance layer locks the official sender address and injects the official flag; the delivery layer fixes an immutable snapshot with preset-translation fallback; the client layer isolates rendering and supports document verification.*

## 1. Official Sender Identity and the Official Flag

Official system communications are distinguished from ordinary user mail as follows:

1. **A single official sender address**: welcome mail and global announcements are issued by the system from `announcement@epocanvas.com`. The address is built into the program; official mail is generated only through the privileged system pipeline.
2. **The official flag (isOfficial)**: mail whose sender is `announcement@epocanvas.com` or `admin@epocanvas.com`, or that carries the "official" label, is marked by the system; the reading pane shows an official badge and banner so you can tell it apart from ordinary mail.
3. **Lifecycle**: welcome mail and global announcements expire after a configurable number of days (7 by default) counted from delivery and are cleaned up by a scheduled task.

## 2. Catalogue of Official Mail

The official system mail of the service is limited to the following types, all generated from built-in templates:

| Type | Trigger | Description |
| --- | --- | --- |
| Welcome mail | a new mailbox is created | built-in six-language template; expires after the configured days (7 by default) |
| Global announcement | an administrator publishes a system announcement | built-in six-language template; same lifetime as welcome mail |

Beyond this table, the system never sends mail of the kind "account abnormal", "you have won", or "verification overdue" from any address. If you receive mail claiming to be official from a different sender address, report it through the channel in Section 6.

## 3. Immutable Delivery and Preset Translation

1. **Immutable snapshot delivery**: official mail has its placeholders substituted and its content fixed into a snapshot at send time; it is not regenerated when a recipient later changes the interface language, keeping official communications objectively unique;
2. **Preset-translation fallback**: when you use "Translate" on an unmodified official mail, the preset official template in your language is rendered locally and no mail content is sent to any AI service; only mail whose body an administrator has modified goes through full-text AI translation (see Section 6 of the [Privacy Policy](/en/mail/privacy-policy/)).

## 4. Client-Side Rendering Isolation

Mail content (official and inbound alike) is rendered in the browser under the following isolation measures:

1. **Shadow DOM isolation**: the body is rendered inside its own Shadow DOM; page-wide styles and scripts cannot affect the mail content, and styles inside the mail cannot leak into the page;
2. **Whitelist sanitizing**: the body is sanitized with DOMPurify; `<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, and `<style>` tags and inline event handlers are removed, blocking script injection and interface spoofing.

## 5. Document Tamper-Proof Verification

This site provides SHA-256 comparison between Markdown source files and an integrity manifest. The manifest and page come from the same site and are not an independent digital signature; both could be changed together. A matching hash only means that the selected file matches the loaded manifest. It does not establish the web page’s content, publisher identity, document authenticity or legal compliance.

| Verification route | Mechanism | Description |
| --- | --- | --- |
| File integrity manifest | `tamper-proof.json` | Reads the documentation working-tree files at generation and records SHA-256, byte counts, generation time, a reference Git HEAD and documentation working-tree state |
| Panel on this page | “Source-file integrity comparison”, available only on this specification page | Calculates SHA-256 for a selected local source file and compares it with the loaded manifest; no file is uploaded and the rendered web page is not hashed |
| Command-line comparison | Node.js command in the panel | Converts only CRLF line endings to LF before UTF-8 SHA-256 hashing; running `sha256sum` or OpenSSL directly on raw CRLF bytes uses different input |
| Manifest source | `docs.epocanvas.com/epomail/tamper-proof.json` | HTTPS protects the connection; a manifest from the same site is not itself a signature or release certification verified through an independent trusted channel |

The manifest uses the working-tree files at generation, rather than automatically reading the committed files in HEAD. If the documentation working tree has uncommitted or untracked content, its hashes cannot be attributed to that committed HEAD version; an unrecorded state also cannot establish a match. The HEAD date is a repository commit date, not this page’s publication date.

:::tip[Comparing a file]
In this page’s “Source-file integrity comparison” panel, select the local Markdown source file at the displayed path, then click “Calculate and compare file”. Command-line comparisons must use the same line-ending normalization. A mismatch may reflect a different version, content or manifest. An unavailable manifest or a file-reading or calculation failure is not a successful comparison.
:::

## 6. Responsibility Boundaries and Reporting Channels

1. **Hosted instance**: the issuance of official mail, the sender identity, and the document seals are maintained by the official operations team;
2. **Self-hosted instances**: self-hosters configure their own delivery channels and keys and should protect their instance as described in [Data Processing & Security Maintenance](/en/mail/data-security/); official communications of a self-hosted instance are the responsibility of that instance's operator;
3. **Reporting channels**: to report mail impersonating the official identity, verification anomalies, or security vulnerabilities, contact:
   - Official sending & security channel: `announcement@epocanvas.com`
   - Privacy & data protection channel: `privacy@epocanvas.com`
