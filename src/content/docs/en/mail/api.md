---
title: Open Platform & API Access
description: The EpoCanvas Mail open platform and API access guide — registering OAuth apps, the authorize and token endpoints, userinfo, scope semantics and the user-side consent and revocation flow.
---

**Effective date: 5 October 2026 | Version: 5.16**

EpoCanvas Mail ships a built-in OAuth 2.0 / OIDC authorization center: the administrator registers third-party applications in the admin "App management" section (`#manage/admin/oauth-apps`), and external sites can then offer "Sign in with Epomail". This page is the complete developer tutorial; where the interface sits in the app appears in the [Interface & Route Map](/en/mail/interface/), Section 4, and the handling of authorization data is disclosed in the [Sub-processor List](/en/mail/sub-processors/).

![EpoCanvas Mail app management page: four endpoint chips, the developer-tutorial button, the sample app card and the integration-code entry](/images/mail/ui/ui-oauth-apps.png)

*Figure: app management. The four endpoints sit across the top; each app card carries its credentials, an enable toggle and the integration code.*

## 1. Endpoints

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/.well-known/openid-configuration` | GET | OIDC Discovery metadata (issuer, endpoints and capabilities) |
| `/oauth/authorize` | GET／POST | User authorization endpoint: sign the user in and obtain consent |
| `/api/oauth/token` | POST | Token exchange: swap an authorization code for tokens |
| `/api/oauth/userinfo` | GET | User profile: read the authorized profile with an access token |

The flow is the standard authorization-code grant: the code is single-use and valid for 5 minutes; the access token (Bearer) and the ID Token are valid for 2 hours; no refresh token is issued today.

## 2. Admin side: registering and maintaining apps

Fields of the "Register new app" form:

| Field | Description |
| --- | --- |
| App name | Shown to users on the consent page |
| Homepage URL | The app's homepage; verifiable from the consent page |
| App description | Purpose statement shown on the consent page |
| Redirect URIs | The redirect allow-list, one per line; the redirect at authorize time must match exactly |
| App icon URL (optional) | App badge on the consent page |
| Scopes | Defaults to `openid profile email`, trim as needed |

- Client IDs are prefixed `epo_live_` and Client Secrets `epo_sec_`; the secret is shown in full only once at creation or reset and is always masked in the list afterwards — GitHub-style one-time delivery;
- "Reset secret" immediately voids the old secret and issues a new one, for leak response;
- Every app can be enabled/disabled, edited and deleted; a disabled app cannot start new authorizations;
- The factory sample app `shijianus-blog` (the official blog's native integration) is provided for reference; the master may delete it or wire their own at any time;
- The "Integration code" button on each card ships copy-ready examples for NextAuth, Node, Python, cURL and generic OIDC.

## 3. Integration flow (developer's view)

1. Register the app on the admin side; obtain the Client ID/Secret and register the redirect URI;
2. Send the user to `https://<instance-domain>/oauth/authorize?client_id=<id>&redirect_uri=<callback>&scope=openid profile email&state=<random>`;
3. The user signs in and consents on the consent page: in a popup the result returns via `postMessage`; a cancellation redirects back with `error=access_denied`;
4. Exchange the code at the token endpoint (JSON, form and HTTP Basic all accepted; with PKCE the `code_verifier` is verified via S256, otherwise the Client Secret):

```bash
curl -X POST https://<instance-domain>/api/oauth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"authorization_code","code":"<code>","redirect_uri":"<callback>","client_id":"<id>","client_secret":"<secret>"}'
```

5. Call userinfo with `Authorization: Bearer <access_token>` to read the profile; an expired or revoked token returns 401.

## 4. Scope semantics

| Scope | Consent-page description |
| --- | --- |
| `openid` | OpenID identity: issues an ID Token to verify the user's unique credential |
| `email` | Primary e-mail address |
| `profile` | Public profile (public nickname and avatar) |
| `comments` | Blog comment and interaction management (used by the sample app; an interaction permission) |
| `offline_access` | Long-lived sign-in; no refresh token is issued today, so granting this scope produces no offline token |

userinfo returns: `sub`, `email`, `email_verified`, `name`, `preferred_username`, `picture`, `is_admin` and `role`.

## 5. User side: consent and revocation

- The consent page shows the app's information, its official badge and the full scope list; authorizing never reveals the user's password or mail content;
- Users can remove an app's access at any time under "Settings → Data" in the "Third-party apps and services" list, or revoke everything at once from the detail dialog;
- Revocation is immediate: the app's existing tokens die on the spot (userinfo returns 401) and the grant is removed from the user's account.

## 6. Personal API tokens (current status)

:::note
The "User Data Control" card in system settings carries the "third-party API support" switch governing user-side developer access. The issue and revoke endpoints for personal access tokens (PAT) already exist, but the current version does not yet expose a general token-authenticated endpoint; third parties should read profiles through the OAuth userinfo flow above.
:::

## 7. Related documents

| Resource | Link |
| --- | --- |
| Where app management sits in the route map | [Interface & Route Map](/en/mail/interface/) |
| Authorization sign-in and third-party sign-in behaviour | [Operating Modes](/en/mail/modes/) |
| Disclosure of third-party processing and transfers | [Sub-processor List](/en/mail/sub-processors/) |
| Deploy your own instance first | [Deployment Guide](/en/mail/deployment/) |
