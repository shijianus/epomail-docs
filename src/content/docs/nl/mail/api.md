---
title: Open platform en API-toegang
description: De gids voor het open platform en de API-toegang van EpoCanvas Mail — OAuth-apps registreren, de authorize- en token-eindpunten, userinfo, de semantiek van scopes en de toestemmings- en intrekkingsstroom aan gebruikerskant.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.16**

EpoCanvas Mail beschikt over een ingebouwd OAuth 2.0 / OIDC-autorisatiecentrum: de beheerder registreert applicaties van derden in de beheersectie «Appbeheer» (`#manage/admin/oauth-apps`), waarna externe sites «Aanmelden met Epomail» kunnen aanbieden. Deze pagina is de volledige ontwikkelaarshandleiding; waar het appbeheer in de app zit, staat in de [Interface en routekaart](/nl/mail/interface/), sectie 4, en de verwerking van autorisatiegegevens wordt openbaar gemaakt in de [Verwerkerslijst](/nl/mail/sub-processors/).

![Appbeheerpagina van EpoCanvas Mail: vier eindpuntchips, de knop van de ontwikkelaarshandleiding, de kaart van de voorbeeldapp en de ingang van de integratiecode (interface in vereenvoudigd Chinees)](/images/mail/nl/ui/apps-guide.png)

*Figuur: het appbeheer. De vier eindpunten staan bovenaan; elke appkaart draagt de referenties, een aan/uit-schakelaar en de integratiecode.*
*Aantekeningen: 1. GET/.well-known/　2. GET/oauth/author　3. POST/api/oauth/t　4. GET/api/oauth/us　5. shijianus-blogAa*

## 1. Eindpunten

| Eindpunt | Methode | Doel |
| --- | --- | --- |
| `/.well-known/openid-configuration` | GET | OIDC Discovery-metadata (issuer, eindpunten en mogelijkheden) |
| `/oauth/authorize` | GET／POST | Autorisatie-eindpunt voor gebruikers: meld de gebruiker aan en verkrijg toestemming |
| `/api/oauth/token` | POST | Tokenuitwisseling: ruil een autorisatiecode in voor tokens |
| `/api/oauth/userinfo` | GET | Gebruikersprofiel: lees het geautoriseerde profiel met een access token |

De stroom is de standaard authorization code grant: de code is eenmalig gebruikbaar en 5 minuten geldig; het access token (Bearer) en het ID Token zijn 2 uur geldig; een refresh token wordt momenteel niet uitgegeven.

## 2. Beheerkant: apps registreren en beheren

Velden van het formulier «Nieuwe app registreren»:

| Veld | Beschrijving |
| --- | --- |
| Appnaam | Aan gebruikers getoond op de toestemmingspagina |
| URL van de homepage | De homepage van de app; verifieerbaar vanaf de toestemmingspagina |
| Appbeschrijving | Doelomschrijving die op de toestemmingspagina wordt getoond |
| Redirect-URI's | De allow-list voor redirects, één per regel; de redirect bij autorisatie moet exact overeenkomen |
| URL van het apppictogram (optioneel) | App-badge op de toestemmingspagina |
| Scopes | Standaard `openid profile email`, naar behoefte inkorten |

- Client ID's hebben het voorvoegsel `epo_live_` en Client Secrets het voorvoegsel `epo_sec_`; het secret wordt slechts één keer volledig getoond, bij aanmaak of herstel, en blijft daarna in de lijst altijd gemaskeerd — eenmalige uitgifte van referenties in GitHub-stijl;
- «Secret herstellen» maakt het oude secret onmiddellijk ongeldig en geeft een nieuw uit, bedoeld voor het afhandelen van lekken;
- Elke app kan in- en uitgeschakeld, bewerkt en verwijderd worden; een uitgeschakelde app kan geen nieuwe autorisaties starten;
- De fabrieksvoorbeeldapp `shijianus-blog` (de native integratie van de officiële blog) is als referentie beschikbaar; de Meester mag haar op elk moment verwijderen of vervangen door een eigen koppeling;
- De knop «Integratiecode» op elke kaart bevat kant-en-klare voorbeelden voor NextAuth, Node, Python, cURL en generieke OIDC.

## 3. Integratietraject (ontwikkelaarsperspectief)

1. Registreer de app aan de beheerkant; verkrijg het Client ID/Secret en registreer de redirect-URI;
2. Stuur de gebruiker naar `https://<instance-domain>/oauth/authorize?client_id=<id>&redirect_uri=<callback>&scope=openid profile email&state=<random>`;
3. De gebruiker meldt zich aan en geeft toestemming op de toestemmingspagina: in een pop-up keert het resultaat terug via `postMessage`; bij annulering gaat het terug met `error=access_denied`;
4. Wissel de code in bij het token-eindpunt (JSON, formulier en HTTP Basic worden allemaal geaccepteerd; met PKCE wordt de `code_verifier` via S256 gecontroleerd, anders het Client Secret):

```bash
curl -X POST https://<instance-domain>/api/oauth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"authorization_code","code":"<code>","redirect_uri":"<callback>","client_id":"<id>","client_secret":"<secret>"}'
```

5. Roep userinfo aan met `Authorization: Bearer <access_token>` om het profiel te lezen; een verlopen of ingetrokken token geeft 401 terug.

## 4. Scope-semantiek

| Scope | Beschrijving op de toestemmingspagina |
| --- | --- |
| `openid` | OpenID-identiteit: geeft een ID Token uit om de unieke identiteit van de gebruiker te verifiëren |
| `email` | Primair e-mailadres |
| `profile` | Openbaar profiel (openbare bijnaam en avatar) |
| `comments` | Beheer van blogreacties en interacties (gebruikt door de voorbeeldapp; een interactierecht) |
| `offline_access` | Aangemeld blijven voor langere tijd; momenteel wordt geen refresh token uitgegeven, dus het verlenen van deze scope levert geen offline token op |

userinfo geeft terug: `sub`, `email`, `email_verified`, `name`, `preferred_username`, `picture`, `is_admin` en `role`.

## 5. Gebruikerskant: toestemming en intrekking

- De toestemmingspagina toont de informatie van de app, de officiële badge en de volledige scopelijst; autoriseren legt nooit het wachtwoord of de e-mailinhoud van de gebruiker bloot;
- Gebruikers kunnen de toegang van een app op elk moment intrekken onder «Instellingen → Gegevens» in de lijst «Apps en diensten van derden», of alles tegelijk intrekken via het detailvenster;
- Intrekking werkt onmiddellijk: de bestaande tokens van de app vervallen ter plekke (userinfo geeft 401 terug) en de machtiging wordt uit het account van de gebruiker verwijderd.

## 6. Persoonlijke API-tokens (huidige status)

:::note
De kaart «Gebruikersgegevensbeheer» in de systeeminstellingen draagt de schakelaar «ondersteuning voor API's van derden» die de ontwikkelaarstoegang aan gebruikerskant stuurt. De uitgifte- en intrekkingseindpunten voor persoonlijke access tokens (PAT) bestaan al, maar de huidige versie stelt nog geen algemeen token-geauthenticeerd eindpunt bloot; derden lezen profielen via de OAuth userinfo-stroom hierboven.
:::

## 7. Verwante documenten

| Bron | Link |
| --- | --- |
| Waar het appbeheer in de routekaart zit | [Interface en routekaart](/nl/mail/interface/) |
| Aanmeldgedrag bij autorisatie en aanmelden via derden | [Werkingsmodi](/nl/mail/modes/) |
| Openbaarmaking van verwerking en doorgifte door derden | [Verwerkerslijst](/nl/mail/sub-processors/) |
| Rol eerst je eigen instantie uit | [Uitrolgids](/nl/mail/deployment/) |
