---
title: Privacy Policy
description: EpoCanvas Mail Privacy Policy—detailing why we process data, how we protect it, when sharing occurs, data retention, and your privacy rights.
---

# Privacy Policy

**Effective Date: October 1, 2026 | Version: 5.5**

This Privacy Policy explains how EpoCanvas Mail (the "Service") collects, utilizes, and protects your personal data. We believe that privacy is a fundamental right, and this document reflects our commitment to absolute transparency, data minimization, and user empowerment. 

By registering for or using the Service, you acknowledge and consent to the practices described in this Policy. This English version is an authoritative, standalone document governing your privacy rights.

![EpoCanvas Mail Privacy Policy pillars: collection, use, transfer, security, and data subject rights](/images/mail/privacy-pillars.svg)

## 1. Scope and Controller Identity

This Policy applies to all personal data processed when you visit our website, use our mobile application, or connect via our API. It does not apply to third-party services linked from our platform.

**Understanding Your Data Controller:**
EpoCanvas Mail is an open-source project. The entity responsible for your data (the Data Controller) depends entirely on the instance you use:
- **Hosted Community Instance (`mail.epocanvas.com`)**: Operated by the EpoCanvas maintainers. We act as the Data Controller for your account information and process your email content strictly to facilitate communication.
- **Self-Hosted Instances**: If you use an instance deployed by a third party, that deployer is your sole Data Controller. The upstream EpoCanvas open-source project contains **zero telemetry**, does not "phone home," and has absolutely no access to self-hosted data.

## 2. Why We Process Your Data

We collect and process personal data exclusively to provide, secure, and maintain the email service. We strictly adhere to the principle of purpose limitation.

### Information You Provide Directly
- **Account Credentials**: We require an email address and password to create an account. Passwords are mathematically hashed (PBKDF2-HMAC-SHA256 with 100,000 iterations and a unique salt) and can never be reverse-engineered by the Operator.
- **Security Data**: If you opt for Two-Factor Authentication (2FA), we store TOTP secrets (encrypted via AES-256-GCM) or public passkeys. Private passkeys remain exclusively on your local device.
- **Profile Data**: Optional fields such as nicknames or avatars are stored only to personalize your interface.

### Your Communications (Email Content)
- We process the emails you send and receive—including subject lines, bodies, metadata, and attachments—solely to route messages and display them in your inbox. 
- **Non-Commercial Commitment**: We do not scan your emails for advertising. We do not sell your data. We do not build marketing profiles based on your communication habits.

### Automated Technical Data
- **Security Logs**: We log IP addresses and User-Agent strings during authentication to detect anomalous login attempts and prevent unauthorized access.
- **No Tracking**: We do not utilize cross-site tracking cookies, Google Analytics, or third-party behavioral trackers. Session management relies entirely on secure, localized JWT tokens.

## 3. How We Protect Your Data

Security is engineered into the core architecture of the Service. 

- **Encryption at Rest**: Depending on the Operator's configuration, email data is subject to server-side encryption at rest. While this protects against database leaks and hardware theft, **it is not End-to-End Encryption (E2EE)**. The Operator technically retains the ability to decrypt data. If you require absolute confidentiality from the Operator, you must use client-side E2EE tools (such as PGP) before transmitting messages.
- **Infrastructure Security**: We utilize globally distributed edge infrastructure to isolate services. All in-transit data is secured via modern TLS protocols.
- **Access Controls**: Strict rate limits (e.g., account lockouts after 5 failed attempts) and cryptographic email routing prevent resource enumeration and credential stuffing.

## 4. Special Notice on Edge AI Processing

The Service incorporates specific AI-assisted features. These are privacy-first implementations designed to keep data within controlled boundaries:

- **Verification Code Extraction**: If enabled by the Operator, the first 6,000 characters of incoming emails may be processed by edge-based AI strictly to extract OTP codes. This data is not used for model training and is discarded immediately after inference.
- **On-Demand Translation / OCR**: When explicitly triggered by you, specific text or images are sent to configured AI endpoints for translation or optical character recognition. Data is only transmitted upon your manual request.

We guarantee that no email content is ever used to permanently train foundational AI models.

## 5. When Sharing Occurs

We do not sell personal data. We only share data with external parties under strict necessity:

1. **Infrastructure Processors**: We utilize third-party providers for raw compute, storage, and outbound SMTP delivery (e.g., Cloudflare, Resend). They process data entirely under our instruction. See our [Third-Party Processor List](/en/mail/sub-processors/) for details.
2. **User-Authorized Integrations**: If you connect third-party apps via OAuth, or enable Telegram push notifications, data is shared exclusively based on your explicit authorization, which you can revoke at any time.
3. **Legal Compliance**: We may disclose specific information to law enforcement only when compelled by a legally binding warrant or statutory obligation in the Operator's jurisdiction. We will notify you of such requests unless legally prohibited.

## 6. Retention Periods

We retain data only as long as necessary to fulfill the purposes outlined in this Policy:

- **Active Mail**: Retained until manually deleted by you or until account storage quotas enforce automated cleanup.
- **Spam / Trash**: Automatically and permanently expunged 7 days after entering the respective folders.
- **Account Deletion**: Upon requesting account cancellation, your sessions are immediately invalidated. Your emails and configuration data are securely and physically purged from the infrastructure. Data cannot be recovered after this physical deletion.
- **System Logs**: Routine security and authentication logs are periodically rotated and destroyed.

## 7. Your Privacy Rights

You maintain absolute sovereignty over your digital footprint. Regardless of your jurisdiction, we grant all users the following rights:

- **Right to Access & Portability**: You can instantly download a complete JSON archive of your account data and emails via the "Data Export" tool in your settings.
- **Right to Rectification**: You can modify your profile and security credentials at any time.
- **Right to Erasure (Right to be Forgotten)**: You may unilaterally terminate your account and permanently purge your data from our active systems.
- **Right to Revoke Consent**: You may disconnect OAuth applications or disable optional AI features instantaneously.

To exercise rights that require administrative assistance, contact the Operator at `privacy@epocanvas.com`. We are committed to responding within 30 days.

## 8. Updates to This Policy

We may periodically revise this Privacy Policy to reflect architectural upgrades or legal requirements. Material changes (e.g., modifications to retention schedules or the introduction of new subprocessors) will be communicated proactively via system announcements or email. Continued use of the Service after such modifications constitutes acceptance of the updated terms.

## 9. Contact Information

- **Privacy Inquiries & Data Rights**: `privacy@epocanvas.com`
- **Platform Administration**: `admin@epocanvas.com`
- **Self-Hosted Instances**: Please contact your respective Instance Operator directly.
