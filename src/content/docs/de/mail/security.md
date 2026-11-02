---
title: Leitfaden zur Kontosicherheit
description: "Der Leitfaden zur Kontosicherheit von EpoCanvas Mail: Zwei-Faktor-Verifizierung in drei Schritten aktivieren, Wiederherstellungscodes verwalten, Passkeys registrieren und aktivieren, das Verifizierungsverhalten bei der Anmeldung und die Kontolöschung, Schritt für Schritt erläutert."
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Diese Seite erläutert Schritt für Schritt jede Aktion auf der Seite „Einstellungen → Sicherheit". Das Gesamtverhalten der Zwei-Faktor-Verifizierung (vertrauenswürdige Geräte, erzwungene Richtlinien) ist in Abschnitt 4 der [Betriebsmodi](/de/mail/modes/) beschrieben; diese Seite behandelt nur die Konfiguration. Einstieg über die Seitenleiste: „Einstellungen → Sicherheit" (`#settings/security`).

![EpoCanvas Mail Sicherheitsseite: Passwortänderung und das Zwei-Faktor-Zentrum mit drei zweiten Verifizierungsarten](/images/mail/en/ui/twofa-guide.png)

*Abb.: Die Sicherheitsseite. Im oberen Teil Benutzername und Passwort, im unteren Teil das Zwei-Faktor-Zentrum.*

<details>
<summary>Visuelle Anleitung zum Zwei-Faktor-Zentrum: vier Karten und drei zweite Faktoren</summary>

Vier gekennzeichnete Bereiche der Sicherheitsseite: oben der Einstieg zum Ändern der Kontoanmeldedaten, darunter das Zwei-Faktor-Zentrum, das drei zweite Verifizierungsarten nebeneinander anbietet, die sich kombinieren lassen.

1. **Karte Benutzername und Passwort**: Benutzername und Anmeldepasswort ändern, mit Anzeige der letzten Änderung; zum Deaktivieren der Zwei-Faktor-Verifizierung ist hier ebenfalls Passwort plus dynamischer Code einzugeben.
2. **Authenticator-App (TOTP)**: Nach dem Scannen des QR-Codes zur Bindung erzeugt sie alle 30 Sekunden einen 6-stelligen dynamischen Code; mit Abschluss der Bindung werden sofort 10 Wiederherstellungscodes angezeigt, von denen jeder nur einmal nutzbar ist und die für die Anmeldung dienen, wenn die App nicht verfügbar ist.
3. **Ersatzwiederherstellungscodes**: die Anmelde-Rückfallebene, wenn die App nicht verfügbar ist; die Karte zeigt den verbleibenden nutzbaren Bestand in Echtzeit; das Einblenden der vollständigen Codes oder das Neuerzeugen erfordert das Kontopasswort, nach dem Zurücksetzen verlieren alle alten Codes ihre Gültigkeit.
4. **Passkey**: Hardwaresicherheitsschlüssel oder biometrische Verifizierung des Geräts; ein neu registrierter Schlüssel wird nach Freigabe durch die bereits gebundene Authenticator-App sofort aktiviert (oder automatisch nach Ablauf der 30-tägigen Fristensperre); nach der Aktivierung lässt sich der Entsperrvorgang mit „Test" verifizieren.

</details>

## 1. Rundgang über die Sicherheitsseite

| Bereich | Inhalt |
| --- | --- |
| Benutzername und Passwort | Benutzername ändern, Passwort ändern (mit Anzeige der letzten Änderung) |
| Zwei-Faktor-Zentrum | Zustand des Hauptschalters sowie drei Karten: Authenticator-App, Ersatz-Wiederherstellungscodes, Passkeys |
| Kontolöschung | Einstieg zur Löschung am Seitenende |

Die Sichtbarkeit des Zwei-Faktor-Zentrums folgt dem E-Mail-Modus der Instanz: Im Datenschutzmodus und im Verschlüsselungsmodus ist es instanzweit erzwungen; nur im Modus Alle E-Mails (Level 1) kann der Betreiber es deaktivieren.

## 2. Zwei-Faktor-Verifizierung aktivieren (drei Schritte)

1. Drücken Sie auf der Karte „Authenticator-App" auf „Einrichten" und scannen Sie den QR-Code mit Ihrer Authenticator-App; wenn das Scannen nicht gelingt, geben Sie den auf der Seite angezeigten Schlüssel von Hand ein;
2. geben Sie den 6-stelligen dynamischen Verifizierungscode aus der Authenticator-App ein, um die Bindung zu bestätigen;
3. die Seite zeigt daraufhin 10 Wiederherstellungscodes: Speichern Sie sie über „Alle kopieren" oder „.txt herunterladen" oder drucken Sie sie zur Offline-Aufbewahrung aus. Jeder Wiederherstellungscode ist nur einmal verwendbar und dient der Anmeldung, wenn die Authenticator-App nicht verfügbar ist.

## 3. Verwaltung der Wiederherstellungscodes

- die Karte zeigt jederzeit den verbleibenden nutzbaren Bestand;
- das Einblenden der vollständigen Codes oder das Neuerzeugen erfordert die Bestätigung mit dem Kontopasswort;
- setzen Sie die Codes rechtzeitig zurück, bevor sie aufgebraucht sind; nach dem Zurücksetzen verlieren alle alten Codes ihre Gültigkeit.

## 4. Passkeys

1. Drücken Sie auf der Karte „Passkeys" auf „Hinzufügen" und vergeben Sie einen Namen für den Schlüssel (etwa MacBook Touch ID, YubiKey 5C); der Browser oder das System startet daraufhin den Registrierungsvorgang;
2. ein neu registrierter Passkey ist zunächst ausstehend: Er lässt sich sofort durch Freigabe über die bereits gebundene Authenticator-App aktivieren oder wartet auf die automatische Aktivierung nach Ablauf der 30-tägigen Fristensperre;
3. nach der Aktivierung lautet sein Status „active"; mit „Test" lässt sich der Entsperrvorgang verifizieren, und wenn er nicht mehr gebraucht wird, kann er gelöscht werden.

## 5. Verifizierung bei der Anmeldung

- nach bestandenem Passwort folgt gemäß der Kontokonfiguration die zweite Verifizierung: dynamischer Verifizierungscode, Wiederherstellungscode oder Passkey, je nach Wahl;
- aktivieren Sie bei der Anmeldung „Dieses Gerät künftig nicht erneut verifizieren", bleibt das Gerät 30 Tage von wiederholter Verifizierung ausgenommen (Regeln in Abschnitt 4 der [Betriebsmodi](/de/mail/modes/));
- stellt das System eine anomale Anmeldungssituation fest (etwa gleichzeitige Zugriffe aus mehreren Regionen über mehrere IPs), stuft es die zweite Verifizierung herauf: selbst nach bestandenem ersten Faktor wird eine weitere Prüfung mit einem anderen Faktortyp verlangt;
- zum Deaktivieren der Zwei-Faktor-Verifizierung sind das Kontopasswort plus der aktuelle dynamische Verifizierungscode oder ein Wiederherstellungscode einzugeben.

## 6. Kontolöschung

Am Seitenende lässt sich die Löschung des aktuellen Kontos beantragen. Die lokale Implementierung dieser Überarbeitung deaktiviert zunächst das Konto und sämtliche Postfächer in D1 und widerruft anschließend Sitzungen, persönliche Zugriffstokens (PAT), Gerätevertrauen, ausstehende OAuth-Zugangsdaten und Berechtigungen. Eingehende E-Mails deaktivierter Konten werden vor der KI-Verarbeitung blockiert. Das Backend setzt Anzeigeoptionen öffentlicher Profile durch; Profile inaktiver Konten liefern 404. Jeder geteilte Lese- oder Anhangsabruf prüft Kontostatus, Nachrichtenstatus und Widerrufsversion erneut. Gewöhnliches Abmelden ist weder dieser kontoweite Widerruf noch eine Kontolöschung. Diese lokalen Mechanismen bestätigen keine Aktualisierung aller Online-Instanzen.

`manual_review` bedeutet, dass der Zugriff deaktiviert ist und die Löschung auf manuelle Prüfung wartet, nicht dass die physische Löschung abgeschlossen ist. `cleanup_failed` bedeutet, dass das Konto deaktiviert bleibt, aber Teile der Bereinigung noch bearbeitet werden müssen; kontaktieren Sie den Betreiber und verfolgen Sie den Antrag. Administratoren können die Objektbereinigungswarteschlange einsehen, einen Löschantrag aber nicht durch Wiederherstellung mit einem Klick aufheben. Ursprüngliche BYO-Objektzuordnungen bleiben bis zur Bestätigung durch die Warteschlange erhalten. Chatkopien, statische Avatare auf dem Server, Audit-Aufzeichnungen, Backups und lokale Entwürfe verschwinden durch diese Antwort nicht automatisch vollständig. Prüfen Sie den Umfang des [Datenexports](/de/mail/data/) und bestätigen Sie dort die Gerätebereinigung gesondert; verfolgen Sie die vollständige Löschung nach den Abschnitten 8 und 9 der [Datenschutzerklärung](/de/mail/privacy-policy/).

## 7. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| Vertrauenswürdige-Geräte-Zeiträume und Regeln der Drittanbieter-Anmeldung | [Betriebsmodi](/de/mail/modes/) |
| Einstellungsbereiche und der Standort der Sicherheitsseite | [Einstellungsleitfaden](/de/mail/settings/) |
| Datenexport, Benachrichtigungen und Weiterleitung | [Leitfaden zu Benachrichtigungen und Weiterleitung](/de/mail/notify/) |
| Sichere Speicherung von Passwörtern und Tokens | [Datenverarbeitung und Sicherheit](/de/mail/data-security/) |
