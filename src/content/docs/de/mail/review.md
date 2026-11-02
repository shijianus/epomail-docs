---
title: Überprüfung aller E-Mails
description: Überprüfung aller E-Mails von EpoCanvas Mail – die Suche in der E-Mail-Dimension, die Detail-Schublade und die physische Löschung auf Administratorseite, einschließlich des Einflusses des E-Mail-Modus auf den Einstieg.
---

**Aktualisiert: 2. November 2026 | Version: 5.25**

Die Überprüfung aller E-Mails ist die Oberfläche der E-Mail-Dimension im Verwaltungsbereich (`#manage/admin/mail`, Berechtigungsschlüssel `all-email:query`). Name und sichtbarer Umfang folgen dem E-Mail-Modus: Im Alle-E-Mails-Modus (Level 1) heißt der Bereich „Alle E-Mails“. Im privaten Modus (Level 2) heißt er „Spam“, umfasst tatsächlich aber auch den Papierkorb der Nutzer und nicht zugeordnete E-Mails. Im verschlüsselten Modus (Level 3) ist der Einstieg ausgeblendet und die Rückgabe der Verwaltungsliste eingeschränkt. Diese Beschränkungen betreffen die Anwendungsoberfläche und belegen nicht, dass der Betreiber auf dem Server keine Daten entschlüsseln kann; siehe Abschnitt 2 der [Betriebsmodi](/de/mail/modes/).

![Die Überprüfung aller E-Mails](/images/mail/en/ui/review-guide.png)

*Abb.: Die Überprüfung aller E-Mails*

<details>
<summary>Visuelle Anleitung: die drei sichtbaren Punkte der E-Mail-Überprüfung im privaten Modus</summary>

Die Überprüfung aller E-Mails im privaten Modus (Level 2): Der Bereich ist als „Spam" beschriftet, Suchfeld und Leerzustand sind die beiden beschrifteten Punkte der Abbildung.

1. **Suchfeld**: Unterstützt die `$`-erweiterte Syntax über den gesamten Bestand: `$sender`/`$user`/`$to`/`$subject` plus Status-Token; ein Rechtsklick auf eine beliebige E-Mail in der Ergebnisliste startet eine neue Suche direkt nach ihrem Absender, dem empfangenden Konto oder dem zugehörigen Benutzer.
2. **Bereichsname in der Seitenleiste**: Name und sichtbarer Umfang folgen dem E-Mail-Modus: Level 1 zeigt „Alle E-Mails", Level 2 zeigt „Spam", Level 3 blendet den Einstieg vollständig aus.
3. **Leerzustandsbereich**: Zeigt einen Platzhalter, wenn keine Ergebnisse vorliegen. Im privaten Modus können Ergebnisse Spam, E-Mails aus dem Papierkorb der Nutzer oder nicht zugeordnete E-Mails sein. Das Öffnen der Details erfordert einen rechtmäßigen und notwendigen Grund; der Umfang der physischen Löschung ist unten beschrieben.

</details>

## 1. Suche

- Die `$`-erweiterte Syntax der Kopfleiste greift über den gesamten Bestand: `$sender` / `$user` / `$to` / `$subject` plus Status-Token; die Bedeutung der einzelnen Operatoren steht in Abschnitt 5 der [Such- und Regelreferenz](/de/mail/search/);
- Ein Rechtsklick auf eine beliebige E-Mail in der Ergebnisliste startet eine neue Suche direkt nach ihrem Absender, dem empfangenden Konto oder dem zugehörigen Benutzer.

## 2. Details und Bearbeitung

| Fähigkeit | Beschreibung |
| --- | --- |
| Detail-Schublade | Zeigt E-Mail-Inhalte und Aufzeichnungen im Rahmen des aktuellen Modus und der Berechtigungen; sie verifiziert nicht die Vollständigkeit der ursprünglichen E-Mails oder sämtliche Umgebungs- und Übertragungssicherheitsangaben |
| Physische Löschung | Löscht Daten aus den betreffenden Betriebsspeichern; Wiederholungen bei Objektlöschfehlern, Sicherungen, externe Kopien und der Umfang verbleibender Aufzeichnungen sind gesondert zu prüfen. Dies bedeutet keine sofortige Löschung aller Kopien |
| Sortierung | Nach Zeit sortiert, um aktuelle Ereignisse zu lokalisieren |

Modusbeschränkungen der Verwaltungsliste sind weder Ende-zu-Ende-Verschlüsselung noch eine absolute technische Abschottung gegenüber dem Betreiber. Wird eine zuvor geschützte E-Mail im privaten Modus in den Papierkorb verschoben, können Betreff, Inhalt und Verifizierungscodes entschlüsselt gespeichert und für die Verwaltung sichtbar werden. Eine Prüfung benötigt weiterhin einen konkreten, notwendigen und rechtmäßigen Grund; die bloße Möglichkeit zum Öffnen erlaubt keine Nutzung zu Lernzwecken. Siehe Abschnitt 4 der [Datenschutzerklärung](/de/mail/privacy-policy/).

Auffällige Konten, die bei der Überprüfung gefunden werden, lassen sich direkt in der [Benutzerliste](/de/mail/users/) bearbeiten; Risikoereignisse gehen nach Kategorie in die [Auditberichte](/de/mail/audit/) ein.

<details>
<summary>Visuelle Anleitung: Bedienungsschritte der Überprüfung aller E-Mails</summary>

1. Öffnen Sie im Verwaltungsbereich „Alle E-Mails" (im privaten Modus als „Spam" angezeigt, im Verschlüsselungsmodus ausgeblendet).
2. Suchen Sie über die Kopfleiste mit der `$`-erweiterten Syntax, etwa `$user:<adresse>`, `$subject:<stichwort>`; Status-Token filtern gesendet / gelöscht / ohne Empfänger.
3. Klicken Sie in der Liste mit der rechten Maustaste auf eine beliebige E-Mail, um direkt nach ihrem Absender, dem empfangenden Konto oder dem zugehörigen Benutzer neu zu suchen.
4. Nach dem Prüfen von Inhalt und Umgebungsdaten in der Detail-Schublade steht die physische Löschung zur Verfügung (anders als im benutzerseitigen Papierkorb).

</details>

## 3. Verwandte Dokumente

| Ressource | Link |
| --- | --- |
| `$`-Suche und Status-Token | [Such- und Regelreferenz](/de/mail/search/) |
| E-Mail-Modi und Sichtbarkeit im Verwaltungsbereich | [Betriebsmodi](/de/mail/modes/) |
| Bewertung von Meldungen und Warnungen | [Auditberichte](/de/mail/audit/) |
| Bearbeitung in der Benutzer-Dimension | [Benutzerliste](/de/mail/users/) |
