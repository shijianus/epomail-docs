---
title: Offene Plattform und API-Anbindung
description: EpoCanvas Mail Offene Plattform und API-Anbindung – vollständiges Entwickler-Tutorial zur Registrierung von OAuth-Apps, zu den Autorisierungs-Endpunkten, zum Token-Austausch, zu userinfo, zur Scope-Semantik und zur Zustimmung samt Widerruf auf Benutzerseite.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

EpoCanvas Mail verfügt über ein integriertes OAuth-2.0-/OIDC-Autorisierungszentrum: Der Administrator registriert Drittanbieter-Apps im Verwaltungsbereich unter „App-Verwaltung" (`#manage/admin/oauth-apps`); externe Websites können ihren Benutzern darauf „Mit Epomail anmelden" anbieten. Diese Seite ist das vollständige Einbindungs-Tutorial für Entwickler; wo die App-Verwaltung in der Oberfläche liegt, steht in Abschnitt 4 der [Oberflächen- und Routenübersicht](/de/mail/interface/), die Verarbeitung der Autorisierungsdaten der Benutzer in der [Liste der Drittanbieter](/de/mail/sub-processors/).

![EpoCanvas Mail App-Verwaltungsseite: vier Endpunktleisten, die Schaltfläche des Entwickler-Tutorials, die Beispiel-App-Karte und der Einstieg zu den Integrationscodes](/images/mail/en/ui/apps-guide.png)

*Abb.: App-Verwaltungsseite. Oben stehen die vier Endpunkte nebeneinander; jede App-Karte führt Zugangsdaten, einen Aktivierungsschalter und den Integrationscode.*

<details>
<summary>Visuelle Anleitung zur App-Verwaltung: die fünf Punkte des geschlossenen Kreislaufs der Drittanbieter-Anbindung</summary>

Die fünf beschrifteten Bereiche der App-Verwaltungsseite: vier Endpunkte am Seitenanfang und eine Beispiel-App-Karte bilden den geschlossenen Kreislauf der Drittanbieter-Anbindung „Endpunkt nachschlagen, Zugangsdaten abrufen, Code übernehmen".

1. **`/.well-known/openid-configuration`**: Der OIDC-Discovery-Metadaten-Endpunkt: issuer, Endpunkte und unterstützte Funktionen als Selbstbeschreibung; Drittanbieter-Frameworks (etwa NextAuth) ermitteln die Konfiguration darüber automatisch.
2. **`/oauth/authorize`**: Der Autorisierungsendpunkt für Benutzer: Er führt die Benutzer durch Anmeldung und Erteilung der Zustimmung; im Popup-Szenario wird das Ergebnis über `postMessage` zurückgegeben, bei Abbruch durch die Benutzer erfolgt die Rückleitung mit `error=access_denied`.
3. **`/api/oauth/token`**: Der Token-Endpunkt: Ein einmaliger Autorisierungscode (5 Minuten gültig) wird gegen ein 2 Stunden gültiges Zugriffs-Token und ein ID Token getauscht; die Parameter lassen sich als JSON, als Formular oder per HTTP Basic übergeben, bei konfiguriertem PKCE wird `code_verifier` (S256) geprüft.
4. **`/api/oauth/userinfo`**: Der Userinfo-Endpunkt: Mit einem Bearer-Zugriffs-Token lassen sich die freigegebenen Felder wie `sub`, `email`, `name` und `picture` lesen; bei abgelaufenem oder widerrufenem Token wird 401 zurückgegeben.
5. **App-Karte (shijianus-blog)**: Eine Karte pro App: Client ID und Client Secret (das Secret wird nur einmal vollständig angezeigt, bei Erstellung oder Zurücksetzung), ein Aktivierungsschalter, Bearbeiten/Löschen sowie fünf kopierfertige Integrationsbeispiele für NextAuth, Node, Python, cURL und generisches OIDC.

</details>

## 1. Endpunktübersicht

| Endpunkt | Methode | Zweck |
| --- | --- | --- |
| `/.well-known/openid-configuration` | GET | OIDC-Discovery-Metadaten (issuer, Endpunkte und unterstützte Funktionen) |
| `/oauth/authorize` | GET / POST | Autorisierungsendpunkt für Benutzer: Anmeldung der Benutzer und Einholung der Zustimmung |
| `/api/oauth/token` | POST | Token-Endpunkt: Tausch eines Autorisierungscodes gegen Zugriffs-Token |
| `/api/oauth/userinfo` | GET | Userinfo-Endpunkt: Lesen der freigegebenen Profildaten mit einem Zugriffs-Token |

Der Ablauf folgt dem standardmäßigen Authorization-Code-Flow: Der Autorisierungscode ist einmalig und 5 Minuten gültig; das erhaltene Zugriffs-Token (Bearer) und das ID Token sind jeweils 2 Stunden gültig, ein Refresh Token wird derzeit nicht ausgestellt.

## 2. Administrationsseite: Apps registrieren und pflegen

Felder des Formulars „Neue App registrieren":

| Feld | Beschreibung |
| --- | --- |
| App-Name | Der auf der Zustimmungsseite angezeigte Name der App |
| Homepage-URL | Die Homepage der App; von der Zustimmungsseite aus verlinkt und überprüfbar |
| App-Beschreibung | Die auf der Zustimmungsseite angezeigte Zweckbeschreibung |
| Autorisierungs-Callback-URL | Die Allowlist der Redirect-URIs, mehrere durch Zeilenumbruch getrennt; der Callback beim Start der Autorisierung muss exakt mit der Allowlist übereinstimmen |
| App-Symbol-URL (optional) | Das App-Abzeichen auf der Zustimmungsseite |
| Zugriffsumfang | Standardmäßig `openid profile email`, nach Bedarf kürzbar |

- Die Client ID trägt das Präfix `epo_live_`, das Client Secret das Präfix `epo_sec_`; das Secret wird nur einmal vollständig angezeigt, bei Erstellung (oder Zurücksetzung), ist nach dem Schließen des Dialogs nicht mehr sichtbar und in der Liste stets maskiert, eine einmalige Übergabe der Zugangsdaten im GitHub-Stil;
- „Secret zurücksetzen" macht das alte Secret sofort ungültig und stellt ein neues aus, für die Notfallreaktion bei einem Leak;
- Jede App lässt sich aktivieren und deaktivieren, bearbeiten und löschen; eine deaktivierte App kann keine neuen Autorisierungen starten;
- Die werkseitig angelegte Beispiel-App `shijianus-blog` (die native Integration des offiziellen Blogs) dient als Referenz; der Betreiber kann sie jederzeit löschen oder durch eine eigene Anbindung ersetzen;
- Der Punkt „Integrationscode" auf jeder App-Karte enthält fünf kopierfertige Einbindungsbeispiele für NextAuth, Node, Python, cURL und generisches OIDC.

## 3. Einbindungsablauf (Entwicklersicht)

1. Registrieren Sie die App auf der Administrationsseite, notieren Sie Client ID/Secret und hinterlegen Sie die Callback-Adresse;
2. Leiten Sie die Benutzer zu `https://<Instanz-Domain>/oauth/authorize?client_id=<id>&redirect_uri=<callback>&scope=openid profile email&state=<random>`;
3. Die Benutzer melden sich auf der Zustimmungsseite an und willigen ein: Im Popup-Szenario wird das Autorisierungsergebnis über `postMessage` zurückgegeben, bei Abbruch erfolgt die Rückleitung mit `error=access_denied`;
4. Tauschen Sie den Autorisierungscode am Token-Endpunkt gegen die Token (als JSON, Formular oder HTTP Basic übergebbar; bei konfiguriertem PKCE wird `code_verifier` (S256) geprüft, sonst das Client Secret):

```bash
curl -X POST https://<Instanz-Domain>/api/oauth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"authorization_code","code":"<code>","redirect_uri":"<callback>","client_id":"<id>","client_secret":"<secret>"}'
```

5. Rufen Sie userinfo mit `Authorization: Bearer <access_token>` auf, um die Profildaten zu lesen; ein abgelaufenes oder widerrufenes Token liefert 401.

## 4. Scope-Bedeutung

| Scope | Beschreibung auf der Zustimmungsseite |
| --- | --- |
| `openid` | OpenID-Identität: Stellt ein ID Token aus und verifiziert das eindeutige Benutzerkennzeichen |
| `email` | Die primäre E-Mail-Adresse |
| `profile` | Öffentliches Profil (öffentlicher Spitzname und Avatar) |
| `comments` | Verwaltung von Blog-Kommentaren und Interaktionen (von der Beispiel-App verwendet, eine Interaktionsberechtigung) |
| `offline_access` | Langfristig angemeldet bleiben; die aktuelle Version stellt kein Refresh Token aus, die Anzeige dieses Scopes auf der Zustimmungsseite erzeugt kein Offline-Token |

userinfo gibt folgende Felder zurück: `sub`, `email`, `email_verified`, `name`, `preferred_username`, `picture`, `is_admin` und `role`.

## 5. Benutzerseite: Zustimmung und Widerruf

- Die Zustimmungsseite zeigt den Benutzern die App-Informationen, das offizielle Verifizierungsabzeichen und die vollständige Liste der beantragten Scopes an; die Autorisierung legt niemals das Passwort oder den Inhalt der E-Mails der Benutzer offen;
- Benutzer können den Zugriff jederzeit in „Einstellungen → Profildaten" unter „Drittanbieter-Apps und -Dienste" appweise entziehen oder über den Detaildialog alle Autorisierungen auf einen Schlag widerrufen;
- Der Widerruf wirkt sofort: Die bestehenden Token der App verlieren unmittelbar ihre Gültigkeit (userinfo liefert 401), und der Autorisierungseintrag wird vom Konto des Benutzers entfernt.

## 6. Persönliche API-Token (Status quo)

:::note
Die Konfigurationskarte „Benutzerdatensteuerung" der Systemeinstellungen enthält den Schalter „Unterstützung der Drittanbieter-API", der den entwicklerseitigen Zugriff auf Benutzerseite steuert. Die Schnittstellen zum Ausstellen und Widerrufen persönlicher Zugriffs-Token (PAT) sind bereits vorhanden, doch die aktuelle Version bietet noch keinen allgemeinen token-authentifizierten Endpunkt; Drittanbieter lesen die Profildaten bitte über den oben beschriebenen OAuth-userinfo-Flow.
:::

## 7. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Der Ort der App-Verwaltung in der Gesamtroute | [Oberflächen- und Routenübersicht](/de/mail/interface/) |
| Verhalten von Autorisierungsanmeldung und Drittanbieter-Anmeldung | [Betriebsmodi](/de/mail/modes/) |
| Offenlegung der Verarbeitung und Übertragung durch Drittanbieter | [Liste der Drittanbieter](/de/mail/sub-processors/) |
| Erst die eigene Instanz bereitstellen, dann anbinden | [Bereitstellungsleitfaden](/de/mail/deployment/) |
