---
title: Auditrapport
description: Het auditrapport van EpoCanvas Mail — de vier waarschuwingsklassen beoordelen, de afhandelknoppen, de arbitrage van beroepen en het strippen van tijdstempels in de versleutelde modus.
---

**Datum van inwerkingtreding: 6 oktober 2026 | Versie: 5.15**

Het auditrapport is de risicoticket-interface van de beheerzone (`#manage/admin/audit`; opvragen vereist `setting:query`, afhandelen en arbitreren vereist `setting:set`). De tickets worden bewaard in een aparte auditlogtabel; de geschiedenis is per pagina doorzoekbaar.

![Auditrapportpagina van EpoCanvas Mail: waarschuwingstickets van de vier klassen, omgevingsdetails in platte tekst en afhandelknoppen (interface in vereenvoudigd Chinees)](/images/mail/ui/ui-audit-report.png)

*Figuur: het auditrapport. Elk ticket draagt klasse, prioriteit, status en de actieve omgevingen, getoond als platte tekst.*

## 1. De vier waarschuwingsklassen

| Klasse | Uitlokker | Gebruikelijke afhandeling |
| --- | --- | --- |
| Auditwaarschuwing | Het account is door andere gebruikers gemeld en de overtreding is na toetsing gegrond | Na verificatie vrijgeven of optreden |
| Risicowaarschuwing | Een veiligheidsrode lijn geraakt of een afwijkende aanmeldomgeving (bijvoorbeeld gelijktijdige multi-IP-aanmeldingen uit meerdere regio's) | Scherp volgen, gesprek of blokkeren |
| Blokkeerwaarschuwing | Het account is automatisch door het systeem of handmatig door een beheerder geblokkeerd | Waarschuwing opheffen of de blokkade houden |
| Beroepswaarschuwing | De gebruiker heeft beroep aangetekend tegen de afhandelingsbeslissing | Na beoordeling vrijgeven (blokkade opheffen) of verwerpen |

## 2. Ticketinformatie en afhandeling

- Elk ticket draagt klasse, prioriteit (P0／P1…), status en de volledige omgevingsdetails (IP, geolocatie, apparaat, vingerafdruk); alles wordt als platte tekst getoond, zonder geneste kaders;
- De afhandelknoppen lopen per klasse uiteen: beroepswaarschuwingen lichten «vrijgeven» uit, blokkeerwaarschuwingen «waarschuwing opheffen», en de gewone waarschuwingen bieden een standaardactiemenu;
- In de versleutelde modus (Level 3) worden de tijdstempels uit de records gehaald en is de tijdskolom verborgen; de tickets blijven beoordeelbaar.

## 3. Arbitrage van beroepen

De beheerder verifieert omgeving en omstandigheden van een beroepsticket en geeft dan vrij of verwerpt; de handhavingsladder en het beroepsrecht van gebruikers staan in sectie 6 van het [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/). De ingang om blokkades uit te voeren staat in de [Gebruikerslijst](/nl/mail/users/).

<details>
<summary>Visuele handleiding: waarschuwingstickets beoordelen in stappen</summary>

![Waarschuwingstickets beoordelen in stappen](/images/mail/nl/ui/audit.png)

1. Ga in de beheerzone naar het «Auditrapport» (opvragen vereist `setting:query`, afhandelen vereist `setting:set`).
2. Filter de tickets op klasse (audit／risico／blokkade／beroep) en op prioriteit.
3. Verifieer de omgevingsgegevens in platte tekst: IP, geolocatie, apparaat en vingerafdruk.
4. Handel per klasse af: beroepswaarschuwingen na beoordeling «vrijgeven», blokkeerwaarschuwingen «waarschuwing opheffen», de gewone waarschuwingen via het standaardactiemenu.
5. In de versleutelde modus worden de tijdstempels uit de records gehaald en blijven de tickets beoordeelbaar; het afhandelresultaat doorwerkt in de blokkade en het herstel aan gebruikerskant.

</details>

## 4. Verwante documenten

| Bron | Link |
| --- | --- |
| De configuratie van de waarschuwingsdrempels | [De configuratiekaarten van de systeeminstellingen](/nl/mail/system/) |
| Blokkeren en herstellen | [Gebruikerslijst](/nl/mail/users/) |
| Het aanmeldgedrag dat risicowaarschuwingen uitlokt | [Accountbeveiligingsgids](/nl/mail/security/) |
| De handhavingsladder en het beroepsrecht | [Beleid voor acceptabel gebruik](/nl/mail/acceptable-use/) |
