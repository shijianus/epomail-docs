---
title: Officiële e-mailspecificaties en architectuur tegen manipulatie
description: Officiële e-mailspecificaties van EpoCanvas Mail, 16 gelaagde beveiligingsmeldingen, afzenderbescherming, onveranderlijke aflevering en integriteitsverificatie.
---

# Officiële e-mailspecificaties en architectuur tegen manipulatie

**Ingangsdatum: 1 oktober 2026 | Versie: 5.5**

Overeenkomstig het [Overzicht van privacy en voorwaarden](/mail/overview/) en [Gegevensverwerking en beveiliging](/mail/data-security/) legt dit document het kader vast voor de uitgifte van officiële e-mails, specificaties voor beveiligingsberichten, afzenderbeveiliging aan de edge, onveranderlijke aflevering via momentopnames, client-side sandbox-isolatie en cryptografische verificatiemechanismen tegen manipulatie voor EpoCanvas Mail.

De formele referentieversie van alle juridische en technische documenten op deze site is de versie in het Traditioneel Chinees (Taiwan); andere taalversies worden uitsluitend ter informatie verstrekt. In geval van afwijkingen prevaleert de Traditioneel Chinese versie.

![Architectuur tegen manipulatie en officiële verificatie van EpoCanvas Mail: afzenderbeveiliging aan de edge, onveranderlijke afleveringspijplijn, Shadow DOM-sandbox-isolatie op de client en SHA-256-manifest](/images/mail/anti-tamper-architecture.svg)

*Afbeelding: Systeemarchitectuur tegen manipulatie en officiële verificatie. Niveau 1 vergrendelt de officiële afzenderidentiteit aan de edge; niveau 2 consolideert onveranderlijke momentopnames met AES-256-GCM-opslag; niveau 3 garandeert Shadow DOM-isolatie op de client en realtime SHA-256-verificatie via Web Crypto.*

## 1. Bescherming en verificatie van de officiële afzender

Om risico's op phishing en afzendervervalsing definitief uit te sluiten, hanteert de dienst een geprivilegieerd isolatiekanaal aan de edge dat officiële systeemcommunicatie strikt scheidt van reguliere gebruikersstromen:

1. **Exclusieve vergrendeling van het officiële adres**: Alle welkomstberichten, algemene mededelingen en beveiligingswaarschuwingen worden uitsluitend en exclusief verzonden vanaf het gecertificeerde adres `announcement@epocanvas.com`;
2. **Onderschepping van vervalsingen aan de edge**: De Cloudflare Workers-gateway past strikte filtering toe. Elke externe afzender of ongeautoriseerde interne aanroep die probeert te verzenden als `announcement@epocanvas.com` wordt onmiddellijk geblokkeerd met een HTTP 403-fout;
3. **Geverifieerd schild en officieel vinkje (`isOfficial: 1`)**: Alleen berichten gegenereerd via geprivilegieerde systeempijplijnen ontvangen de onveranderlijke eigenschap `isOfficial = 1`, waardoor in het leesvenster automatisch het geverifieerde blauwe schild en de officiële banner worden weergegeven;
4. **Levenscyclus en verwijderingsprincipes**: Welkomstberichten worden gemarkeerd voor opvolging en na 7 dagen automatisch fysiek gewist; meldingen van kritieke beveiligingsincidenten worden permanent bewaard in de database.

## 2. Systeem voor beveiligingsberichten (16 gebeurtenissen)

De dienst deelt kritieke statuswijzigingen in volgens een beveiligingsladder van 4 niveaus (Niveau 1 tot Niveau 4) met een realtime waarschuwingsmatrix van 16 afzonderlijke gebeurtenissen. De lay-out hanteert een nuchtere technische opmaak zonder kunstmatige bewoordingen, met een vectoriële SVG-schildbadge, tweezijdige actiekaarten (bevestiging van legitieme actie vs. noodmaatregelen) en een donkere actieknop naar het beveiligingscentrum:

| Niveau | Gebeurteniscode | Scenario en beveiligingscontext | Geïnjecteerde parameters | Auto ster |
| --- | --- | --- | --- | --- |
| L1 | NEW_DEVICE_LOGIN | Eerste aanmelding vanaf een nieuw apparaat of browser | Tijdstip, IP, Locatie, Apparaatnaam, Browser | Nee |
| L1 | NEW_LOCATION_LOGIN | Aanmelding vanuit een nieuwe stad of een nieuw land | Tijdstip, IP, Land en Stad, Netwerkprovider | Nee |
| L1 | NEW_NETWORK_LOGIN | Aanmelding via een nieuw autonoom netwerksysteem (ASN) | Tijdstip, IP, ASN-nummer, Netwerkorganisatie | Nee |
| L2 | PASSWORD_CHANGED | Inlogwachtwoord van het account succesvol gewijzigd | Tijdstip, IP, Locatie, Apparaat en Browser | Nee |
| L2 | PAT_CREATED | Nieuw persoonlijk toegangstoken (PAT) aangemaakt voor API | Tokennaam, Toegangsrechten, Geldigheidsduur | Nee |
| L2 | PAT_REVOKED | Persoonlijk toegangstoken handmatig ingetrokken | Tokennaam, Tijdstip van intrekking, Apparaat | Nee |
| L2 | OAUTH_AUTHORIZED | Externe OAuth 2.0-applicatie geautoriseerd voor inbox | Applicatienaam, Rechten, Client-ID | Nee |
| L2 | OAUTH_REVOKED | Toegang van externe OAuth 2.0-applicatie ingetrokken | Applicatienaam, Tijdstip van intrekking | Nee |
| L3 | TOTP_ENABLED | Tweeledige verificatie (RFC 6238) succesvol geactiveerd | Tijdstip, IP, Aanmaaktijd, Status back-upcodes | Ja |
| L3 | TOTP_DISABLED | Tweeledige verificatie gedeactiveerd (enkele factor) | Tijdstip, IP, Apparaat, Veiligheidsinstructies | Ja |
| L3 | PASSKEY_ADDED | Nieuwe toegangssleutel (Passkey FIDO2) geregistreerd | Sleutelnaam, Type authenticator, Tijdstip | Ja |
| L3 | PASSKEY_REMOVED | Eerder geregistreerde toegangssleutel verwijderd | Sleutelnaam, Tijdstip van verwijdering | Ja |
| L3 | AUTO_FORWARD_CHANGED | Regel voor automatisch doorsturen van e-mail gewijzigd | Doeladres, Filters, Ingeschakelde status | Ja |
| L3 | STORAGE_PURGED | Aangepaste opslagconfiguratie (BYO) gereset | Tijdstip van reset, IP-adres, Terugvalstatus | Ja |
| L4 | ACCOUNT_LOCKED | Drempel voor mislukte inlogpogingen bereikt (12 uur) | Aantal pogingen, Duur van blokkade, IP | Ja |
| L4 | ACCOUNT_DELETED | Verwijdering van account aangevraagd of ingepland | Tijdstip van aanvraag, Aantal aliassen | Ja |

Om waarschuwingsmoeheid bij gebruikers te voorkomen, wordt in KV een omgevingsprofiel bijgehouden (met de 15 recentste apparaten, locaties en netwerken), waarbij een stiltevenster van één uur geldt voor identieke gebeurtenissen.

## 3. Onveranderlijke aflevering en sandbox-beveiliging op de client

Officiële communicatie verloopt via onveranderlijke overdrachtsprotocollen en beveiligde sandboxes op de client om manipulatie van berichten te verhinderen:

1. **Onveranderlijke momentopname (Immutable Delivery)**: Systeemberichten worden bij verzending vastgelegd in de database en worden niet dynamisch opnieuw vertaald als de ontvanger later van interfacetaal wisselt;
2. **Symmetrische terugval naar officiële sjablonen**: De meertalige vertaalengine compileert officiële sjablonen vooraf. Komt de inhoud overeen, dan wordt de gecertificeerde vertaling getoond; bij aanpassingen schakelt het systeem soepel over naar AI;
3. **Fysieke isolatie via Shadow DOM**: De webclient rendert e-mailberichten in een hermetisch afgesloten Shadow DOM, waardoor bovenliggende stijlen en scripts geen invloed kunnen uitoefenen;
4. **Strikte opschoning met DOMPurify**: Tags zoals `<script>`, `<style>`, `<iframe>`, `<object>`, `<embed>`, `<form>` en inline scripts worden verwijderd ter bescherming tegen XSS en visuele vervalsingen.

## 4. Beveiliging tegen manipulatie en documentverificatie

Het officiële documentatieplatform (`epomail-docs`) maakt gebruik van een open cryptografisch hash-systeem waarmee iedere gebruiker de authenticiteit van documenten kan controleren:

| Dimensie | Technisch mechanisme | Verificatiecriterium | Geneutraliseerde dreiging |
| --- | --- | --- | --- |
| Deterministisch manifest | `public/tamper-proof.json` | SHA-256-hash en bestandsgrootte | Wijzigingen op spiegelsites, tekstvervanging |
| Versieherleidbaarheid | Git Commit-structuurobject | Git Commit-SHA en PGP-handtekening | Ongeautoriseerde revisies, geschiedvervalsing |
| Verificatie in de browser | Web Crypto API in het geheugen | `crypto.subtle.digest('SHA-256')` | Onderschepping onderweg (MITM), cachevervuiling |
| Offline controle in terminal | OpenSSL- / sha256sum-tools | Lokale vergelijking van Markdown-hashes | Onafhankelijke audits, compliancy-toetsing |
| Officiële bron | `https://docs.epocanvas.com/epomail` | DNSSEC-validatie en TLS-certificaten | Frauduleuze websites, phishingportalen |

:::tip[Instructies voor realtime verificatie]
Onderaan elke documentatiepagina bevindt zich het paneel «🛡️ Officiële verificatie van integriteit en anti-manipulatie». Klik op «🔍 Controleer integriteit van pagina» om direct in de browser een SHA-256-controle uit te voeren en te vergelijken met het officiële manifest. Via de terminal kan dit met `curl -sSL https://docs.epocanvas.com/epomail/tamper-proof.json | jq .`.
:::

## 5. Verantwoordelijkheden en melding van beveiligingsincidenten

1. **Verantwoordelijkheid voor de gehoste instantie**: De veilige uitgifte van e-mails, afzenderverificatie en documentintegriteit op `mail.epocanvas.com` vallen onder het officiële operationele team;
2. **Verantwoordelijkheid bij zelf hosten**: Beheerders van zelfstandige instanties configureren hun eigen Cloudflare-omgeving en dienen hun sleutels te beveiligen conform [Gegevensverwerking en beveiliging](/mail/data-security/) ;
3. **Meldings- en ondersteuningskanalen**: Neem bij vervalste e-mails, afwijkingen bij verificatie of vermoedelijke kwetsbaarheden direct contact op via:
   - Veiligheidscentrum en officieel verzendkanaal: `announcement@epocanvas.com`
   - Privacy- en gegevensbeschermingsfunctionaris: `privacy@epocanvas.com`
