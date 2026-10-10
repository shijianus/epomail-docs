---
title: Zoek- en regelreferentie
description: De complete zoek- en regelreferentie van EpoCanvas Mail — veldoperators voor mail, bereikvlaggen, precisieschakelaars, markeringsgedrag, geavanceerd beheerderszoeken met $, instellingenzoeken en elke voorwaarde van de classificatieregels.
---

**Datum van inwerkingtreding: 5 oktober 2026 | Versie: 5.17**

EpoCanvas Mail heeft twee opzoeksystemen: het mailzoeken voor gebruikers (het zoekvak in de bovenbalk) en het zoeken over de hele opslag voor de beheerder (de beheersectie «Alle e-mail»); instellingenpagina's hebben daarnaast hun eigen instellingenzoeken. Deze pagina somt elke operator, vlag en regelvoorwaarde op, in overeenstemming met de huidige implementatie. Classificatieregels delen dezelfde veldsemantiek als zoeken; de regelengine wordt vanaf sectie 7 beschreven.

![Zoeken in EpoCanvas Mail: na invoer van from:github toont de lijst uitsluitend de overeenkomende mail, met het trefwoord gemarkeerd](/images/mail/nl/ui/search-guide.png)

*Figuur: mailzoeken. Operators combineren vrij met gewone trefwoorden; treffers lichten onmiddellijk op.*

<details>
<summary>Visuele handleiding: Zoeken —  de twee plekken die tellen in één zoekopdracht</summary>

Twee gebieden tonen één volledige zoekopdracht: typ een operator of trefwoord in het zoekvak, en de trefferslijst filtert onmiddellijk met de treffers gemarkeerd.

1. **Zoekvak in de bovenbalk**: Zoekt mail op mailpagina's en instellingen op instellingenpagina's. Tien veldoperators (`from:`, `to:`, `subject:`, `body:`, …) plus vlaggen zoals `is:` en `global:`; met spaties gescheiden voorwaarden combineren als EN, en Tab vult operators aan.
2. **Trefferslijst**: Alleen berichten die aan alle voorwaarden voldoen worden getoond, met de treffers native door de browser gemarkeerd (`hl:off` zet dit uit). Een rij openen schuift het fragmentvenster naar de treffer, zodat de context bewaard blijft.

</details>

## 1. Grondbeginselen van de syntax

- Meerdere voorwaarden worden gescheiden door spaties en combineren als EN — alle moeten overeenkomen;
- Waarden met spaties worden omsloten door dubbele aanhalingstekens, zoals in `subject:"annual report"`;
- Een kaal trefwoord zonder operator matcht over vijf velden heen met OF: onderwerp, naam van de afzender, adres van de afzender, adres van de geadresseerde en body;
- Matching is standaard hoofdletterongevoelig en fuzzy op subtekenreeksen; het precisie- en hoofdlettergedrag kan met vlaggen worden gewijzigd (sectie 3).

```text
from:github subject:"verification code" after:2026-10-01 exact:true
```

## 2. Veldoperators

De tien veldoperators werken op hun eigen veld; waarden zijn subtekenreeksmatches (behalve data en groottes):

| Operator | Waarde | Betekenis |
| --- | --- | --- |
| `from:<value>` | tekst | Het adres of de naam van de afzender bevat de waarde; `from:me` is gelijk aan `is:sent` |
| `to:<value>` | tekst | Het adres of de naam van de geadresseerde bevat de waarde |
| `subject:<value>` | tekst | Matcht uitsluitend het onderwerp |
| `subject_or_body:<value>` | tekst | Onderwerp of body bevat de waarde |
| `body:<value>` | tekst | Matcht uitsluitend de body in platte tekst |
| `larger:<bytes>` | geheel getal | De grootte van het bericht (body plus inhoudslengte) is ten minste zoveel bytes |
| `smaller:<bytes>` | geheel getal | De grootte van het bericht is ten hoogste zoveel bytes |
| `before:<date>` | YYYY-MM-DD | Ontvangen vóór deze datum |
| `after:<date>` | YYYY-MM-DD | Ontvangen na deze datum |
| `label:<name>` | labelnaam | Mail die dit label draagt; zet de naam tussen aanhalingstekens wanneer die niet-ASCII-tekens bevat |

## 3. Bereik en vlaggen

Vlaggen wijzigen het zoekbereik of de presentatie en worden van de trefwoorden gestript:

| Vlag | Gedrag |
| --- | --- |
| `global:` | Vergroot het zoeken tot alle mailboxen, onbeperkt door de huidige weergave |
| `is:sent` | Dwingt verzonden mail in de query |
| `is:spam` | Zet het zoekdomein om naar Spam |
| `is:trash` | Zet het zoekdomein om naar Prullenbak |
| `is:draft` | Front-endsprong naar Concepten (concepten leven alleen op het apparaat) |
| `hl:off` | Schakelt het markeren van treffers uit |
| `exact:true` | Matching op hele-woordgrenzen, waarbij vals-positieve subtekenreeksen worden vermeden |
| `case:true` | Zet hoofdlettergevoeligheid aan |

## 4. Markering en fragmenten

Treffers worden in de lijst en in de detailweergave gemarkeerd; het fragmentvenster schuift richting de treffer om diens context te bewaren. Met `exact:true` lichten alleen treffers op die hele woorden zijn, met `case:true` wordt onderscheid gemaakt tussen hoofd- en kleine letters, en `hl:off` zet de markering geheel uit. Markering is native browserweergave en verandert nooit de inhoud van het bericht.

## 5. Beheerderszoeken met `$`

De beheersectie «Alle e-mail» biedt een geavanceerde syntax met `$`-voorvoegsel voor controle over de hele opslag:

| Token | Betekenis |
| --- | --- |
| `$sender` | Zoeken op naam of adres van de afzender |
| `$user` | Zoeken op het account dat de mail bezit |
| `$to` | Zoeken op het ontvangende account |
| `$subject` | Zoeken op onderwerp |
| `$received` / `$sent` / `$deleted` / `$norecipient` / `$all` | Statusfilter: ontvangen, verzonden, verwijderd, geen geadresseerde, alles |

Tokens accepteren Engelse hoofdlettervarianten en Chinese aliassen (zoals `$发件人`, `$用户`, `$收件人`, `$主题`); een letterlijke `$` in een waarde wordt geëscaped als `\$`. Een rechtermuisklik op willekeurige mail in de lijst start rechtstreeks een zoekopdracht op diens afzender, ontvangende account of bezittende gebruiker. In de versleutelde modus (Level 3) is de beheerlijst van e-mail permanent leeg en is deze syntax daarmee onbeschikbaar, zie [Werkingsmodi](/nl/mail/modes/), sectie 2.

## 6. Instellingenzoeken

Op instellingenpagina's wisselt het zoekvak naar het instellingenzoeken:

| Invoer | Gedrag |
| --- | --- |
| geen voorvoegsel | Zoekt alleen in het huidige paneel, markeert treffers en scrollt ze in beeld, met nul verzoeken |
| `all:` of `global:` | Zoekt over alle instellingenpagina's heen in een gegroepeerd uitklapmenu; een klik springt erheen en lokaliseert |
| `app:`, `oauth:`, `client:` | Zoekt OAuth-apps in het appbeheer |

Suggesties verschijnen tijdens het typen; Tab voltooit een operator.

## 7. Voorwaarden van classificatieregels

De regeleditor in de labelsectie definieert elke regel in twee stappen — voorwaarden en uitzonderingen: de actie wordt uitgevoerd wanneer elke voorwaarde overeenkomt en geen enkele uitzondering dat doet. De beschikbare voorwaarden:

| Voorwaarde | Betekenis |
| --- | --- |
| `from` (afzender is) | Adres of naam van de afzender matcht exact, met ondersteuning voor meerdere waarden gescheiden door komma's |
| `to` (geadresseerde is) | De geadresseerde matcht exact, meerdere waarden ondersteund |
| `sender_address_includes` (afzenderadres bevat) | Matcht op het domein van de afzender of een adresfragment |
| `recipient_address_includes` (adres van de geadresseerde bevat) | Matcht op het domein van de geadresseerde of een adresfragment |
| `email_received_for_others` (ook naar anderen verzonden) | Het adres staat op een andere ontvangersplaats |
| `subject_include` (onderwerp bevat) | Trefwoorden in het onderwerp, meerdere waarden ondersteund |
| `message_body_includes` (body bevat) | Trefwoorden in de body, meerdere waarden ondersteund |
| `subject_or_body_include` (onderwerp of body bevat) | Eén van beide matcht |
| `system_setting` (systeemoordeel) | Verwijst naar een oordeel op systeemniveau (zoals een treffer op de witte lijst) |

:::note
De regeleditor biedt ook voorwaarden voor grootte (`at_least` / `at_most`), datum (`before` / `after`) en berichtheaders (`message_header_includes`); de huidige engineversie implementeert hun evaluatie nog niet — een regel die ze bevat, zal niet matchen. Ze worden hier vermeld om verkeerde configuratie te voorkomen.
:::

## 8. Acties en prioriteit

- Een regel die matcht, labelt de mail met het label van de regel;
- Het getal `priority` beslist over de uitvoervolgorde, lagere getallen eerst;
- Met `stopProcessing` ingeschakeld beëindigt een treffer op die regel de regelcascade;
- Regels lopen automatisch bij ontvangst en kunnen ook handmatig vanaf de labelpagina worden gedraaid.

## 9. Ingebouwde heuristiek en sitegovernance

- Vier labels worden standaard meegeleverd — Gemeenschap, Abonnementen, Promoties en Werk; Abonnementen en Promoties worden onderhouden door ingebouwde heuristiek: afzenders zonder antwoordvoorvoegsel, domeinen van e-mailmarketingplatforms en afmeldsignalen belanden in Abonnementen; kortings- en spoedwoorden in het onderwerp, samen met de dichtheid van marketingwoorden, belanden in Promoties;
- Gouvernance op siteniveau wordt geconfigureerd in de beheersectie «Classificatie»: witte en zwarte lijsten van afzenders, trefwoorden in onderwerp en inhoud, witte-lijstmodus, onderschepping van afzenders zonder naam, onderschepping van niet-geadresseerden en onderschepping van uitvoerbare bijlagen; treffers op lijsten passen automatisch hun eigen labels toe, en harde onderschepping wijst ronduit af met een teller;
- Het gedrag van regels en lijsten staat verder beschreven in de [Functiegids](/nl/mail/features/), sectie 4.

## 10. Verwante documenten

| Bron | Link |
| --- | --- |
| Interfacetroutes en waar de zoekvakken staan | [Interface en routekaart](/nl/mail/interface/) |
| Waar labels en regels worden beheerd | [Instellingengids](/nl/mail/settings/) |
| Functies in detail met schermafbeeldingen | [Functiegids](/nl/mail/features/) |
| Hoe de e-mailmodus het zoekbereik begrenst | [Werkingsmodi](/nl/mail/modes/) |
