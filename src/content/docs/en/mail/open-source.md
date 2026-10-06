---
title: Open-Source & Self-Hosting Legal
description: EpoCanvas Mail open-source and self-hosting legal terms — the scope of the MIT licence, what lies outside it, the self-deployer's position as data controller, third-party arrangements and contributions.
---

**Effective date: 5 October 2026 | Version: 5.16**

This page sets out the scope of EpoCanvas Mail's open-source licence and the legal position of self-hosting. It is not a user contract for any instance: users of the hosted instance are governed by the [Terms of Service](/en/mail/terms-of-service/) and the [Privacy Policy](/en/mail/privacy-policy/); users of a self-hosted instance are governed by whatever terms its deployer publishes.

![EpoCanvas Mail responsibility boundaries: the upstream open-source project supplies source code, the instance is run independently by its operator who bears data-controller responsibility](/images/mail/en/self-host-responsibilities.svg)

*Figure: the responsibility boundaries among the software, its operator and users. The upstream authors run no e-mail service and answer for no instance's conduct.*

## 1. The licence

The source code of this project is released under the MIT License. Any person may obtain it free of charge and:

1. use, copy, modify, merge, publish, distribute, sublicense and sell copies of the software;
2. subject to including the original copyright notice and this licence in all copies or substantial parts of the software;
3. the software is provided "as is", without warranty of any kind, express or implied, including the warranties of merchantability, fitness for a particular purpose and non-infringement;
4. the authors or copyright holders are not liable for any claim, damages or other liability arising from the software or its use.

## 2. Outside the licence

- The MIT licence grants no trademark or brand rights: the names EpoCanvas and Epomail, their logos and visual assets are not licensed by the publication of the source code;
- No statement may be made suggesting endorsement of, or partnership with, the upstream project;
- Derived distributions bear their own compliance for naming and branding and maintain their own statement of differences from the upstream code.

## 3. The self-deployer's legal position

- From the moment of deployment the deployer is the data controller for its instance's users, and the upstream authors have no access to instance data (the split appears in the [Overview](/en/mail/overview/), Section 2);
- The deployer owes its users notice, data-subject rights handling, security maintenance and international-transfer compliance under the law applicable at its location;
- This site's legal documents (privacy policy, terms of service, acceptable use policy, data processing, sub-processor list) may serve as templates for a deployer's users; they must be revised to the deployer's actual configuration, and responsibility passes to the deployer on adoption;
- Third-party services the deployer configures (Cloudflare, Resend, Backblaze, Turso and others) are contracted for by the deployer, whose terms then bind the deployer and its users — independent of the hosted instance's [sub-processor list](/en/mail/sub-processors/).

## 4. Technical threshold and security responsibility

The deployer is responsible for completing secret injection and the initialisation bootstrap (steps in the [Deployment Guide](/en/mail/deployment/)), and for the instance's access control, key custody and follow-up updates; security fixes published upstream do not automatically reach a deployment that is not updated.

## 5. Contributions

- Bug reports and proposals go through the GitHub repository's Issues; code through Pull Requests;
- Contributors must be entitled to what they submit; once merged, a contribution is distributed under the MIT licence with the source;
- Security vulnerabilities must not be disclosed in a public issue — report them privately through the contact points in the [Overview](/en/mail/overview/), Section 5.

## 6. Related documents

| Resource | Link |
| --- | --- |
| Tour of the legal documents and their order of precedence | [Overview](/en/mail/overview/) |
| Full steps to deploy your own instance | [Deployment Guide](/en/mail/deployment/) |
| The hosted instance's service scope and support | [Service Scope & Support](/en/mail/service-scope/) |
| Key terms | [Key Terms](/en/mail/key-terms/) |
