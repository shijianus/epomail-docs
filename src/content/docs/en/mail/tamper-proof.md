---
title: Official Mail Specification & Anti-Tampering Architecture
description: EpoCanvas Mail official system email specifications, 16 tiered security notifications, sender anti-spoofing, immutable delivery, client sandboxing, and document integrity verification.
---

# Official Mail Specification & Anti-Tampering Architecture

**Effective Date: October 1, 2026 | Version: 5.5**

Pursuant to the Privacy & Terms Overview and our Data Processing directives, this document establishes the definitive technical specifications for the EpoCanvas Mail anti-tampering architecture. This framework ensures the undeniable authenticity of official communications, providing verifiable mechanisms to detect spoofing, prevent document manipulation, and isolate potentially malicious content. Whether operating within the managed environment or a self-hosted instance, these architectural constraints guarantee the integrity of the 16-level security notification system and the safety of the client-side rendering sandbox.

> [!IMPORTANT]
> **Brand Protection and Spoofing Prevention**: Operators of self-hosted open-source instances must ensure their deployments do not falsely present themselves as official communications from the EpoCanvas Mail administrative team. Our anti-tampering architecture includes cryptographic proofs that strictly distinguish official platform communications from third-party instance traffic.

### The 16-Level Security Event System

EpoCanvas Mail employs a highly structured, 16-level security event notification framework to alert users to critical account activities. These events range from routine informational notices (Level 1: New Device Login) to critical security breaches (Level 16: Cryptographic Key Compromise Protocol). Each notification level is uniquely cryptographically signed at the edge before dispatch. This system ensures that security alerts cannot be suppressed or forged by intermediate network actors. The hierarchical nature of these alerts dictates the corresponding automated response, escalating from simple UI warnings to immediate account lockdown and enforced session termination.

### Edge Sender Anti-Spoofing and Authentication

To combat the pervasive threat of phishing and identity forgery, our architecture relies heavily on stringent sender anti-spoofing protocols enforced directly at the network edge. EpoCanvas Mail strictly mandates the validation of SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication, Reporting, and Conformance) records for all incoming and outgoing traffic. By validating the cryptographic signatures of inbound mail before it ever reaches the application layer, we discard spoofed communications instantaneously, protecting the user's inbox from deceptive social engineering attacks.

<div class="tamper-proof-panel">
  <h4>Verified Official Communication</h4>
  <p>This panel indicates that the message has been cryptographically signed and verified by the EpoCanvas Mail Core infrastructure. Its contents are immutable and guaranteed authentic.</p>
</div>

### Immutable Snapshot Delivery

Integrity is maintained through the implementation of immutable snapshot delivery. Once an email payload is received and cryptographically verified at the edge, a finalized, read-only snapshot of the message is generated and committed to the D1/KV storage layer. This snapshot is cryptographically hashed, and any subsequent attempt to modify the database record will instantly invalidate the hash. This guarantees that once a communication is securely stored within the EpoCanvas Mail ecosystem, its contents cannot be retroactively altered, tampered with, or silently corrupted, preserving a pristine audit trail for all correspondence.

### Client-Side Sandbox Isolation

The final layer of the anti-tampering architecture resides within the user interface itself. To mitigate the risks associated with malicious payloads, tracking pixels, or cross-site scripting (XSS) embedded within complex HTML emails, the EpoCanvas Mail web client employs aggressive sandbox isolation. All incoming message content is strictly sanitized and rendered within restricted iframe contexts with `sandbox` attributes enabled. External resource loading is blocked by default, and active scripting is entirely neutralized. This ensures that even if an attacker manages to deliver a maliciously crafted email, it cannot execute code or exfiltrate session data from the user's browser environment.

> [!TIP]
> Advanced users can independently verify the cryptographic hash of any received message by utilizing the "View Message Source and Integrity Proof" option within the mail client interface.
