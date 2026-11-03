# Portfolio Niklas Schumm

Zweisprachige Portfolio-Website (Deutsch/Englisch) im Kintsugi-Design, gebaut mit [Astro](https://astro.build).
Alle Inhalte liegen als Dateien im Projekt. Die Vorlagen bauen daraus automatisch alle Seiten in beiden Sprachen.

## Starten

Voraussetzung: [Node.js](https://nodejs.org) ab Version 22.

```bash
npm install        # einmalig: Pakete installieren
npm run dev        # lokale Vorschau unter http://localhost:4321, aktualisiert sich beim Speichern
npm run build      # fertige Website in den Ordner dist/ bauen
npm run preview    # gebaute Website lokal ansehen
```

## Wo steht was?

| Was du ändern willst | Datei |
| --- | --- |
| Name, E-Mail, Ort, Social Links, Verfügbarkeit, Lebenslauf-PDFs, Showreel, Porträt | `src/data/site.yaml` |
| Adresse fürs Impressum (nur dort sichtbar) | `src/data/legal.yaml` |
| Texte von Impressum und Datenschutz | `src/content/legal/*.md` |
| Werdegang / Zeitleiste | `src/data/timeline.yaml` |
| Skills, Sprachen, Kurse | `src/data/skills.yaml` |
| Fakten, Lieblingsspiele, Hobbys auf „Über mich" | `src/data/about.yaml` |
| Alle festen Seitentexte (Überschriften, Buttons, Menü) | `src/i18n/de.yaml` und `src/i18n/en.yaml` |
| Projekte | `src/content/projects/<projekt>/` |
| Devlog-Beiträge | `src/content/devlog/<beitrag>/` |
| Farben, Schrift, Abstände | `src/styles/global.css` (Abschnitt `:root`) |
| Bilder, Videos, PDFs | `public/` (z. B. `public/images/…`, `public/cv/…`) |

Zweisprachige Felder sehen immer so aus:

```yaml
tagline:
  de: Zerbrochenes, mit Gold geflickt.
  en: Broken things, mended in gold.
```

Enthält ein Text ein Komma und steht in geschweiften Klammern `{ de: …, en: … }`, setze ihn in Anführungszeichen:
`{ de: "Erst die Größe, dann die Animation", en: "Scale before animation" }`.
Im Zweifel die mehrzeilige Schreibweise oben verwenden, dort sind Kommas kein Problem.

## Neues Projekt hinzufügen

1. Einen Ordner kopieren, z. B. `src/content/projects/tiny-forge/` → `src/content/projects/mein-spiel/`.
   Der Ordnername wird zur Adresse: `/de/projects/mein-spiel/`.
2. In `project.yaml` die Felder ausfüllen. Wichtig:
   - `order`: Reihenfolge in der Liste (1 = ganz vorne)
   - `featured: true`: erscheint als Karte auf der Startseite (maximal 3 werden gezeigt)
   - `spotlight: true`: das große Hauptprojekt (nur bei einem Projekt setzen)
   - `filters`: `unreal`, `godot`, `jam`, `tool`
   - `status`: `released`, `in-development`, `prototype` oder `jam`
3. Optional einen Langtext anlegen: `de.md` und `en.md` mit einer Überschrift oben:
   ```markdown
   ---
   heading: Worum es geht.
   ---
   Dein Text …
   ```
4. Optional Bilder: Datei nach `public/images/projects/mein-spiel/cover.jpg` legen und in `project.yaml` eintragen: `cover: /images/projects/mein-spiel/cover.jpg`.

Abschnitte wie Gameplay, Art Style, Galerie, Technik und Learnings erscheinen nur, wenn du sie in `project.yaml` ausfüllst. `kintsugi/project.yaml` zeigt alle Möglichkeiten.

Das Projekt taucht danach automatisch in der Projektliste, im Filter, in der Zählung auf der Startseite und mit eigener Seite in beiden Sprachen auf.

## Neuen Devlog-Beitrag schreiben

1. Ordner anlegen: `src/content/devlog/2026-11-mein-thema/`
2. Darin `de.md` und/oder `en.md`:
   ```markdown
   ---
   title: Mein Thema
   date: 2026-11-20
   category: kintsugi        # kintsugi | tools | tutorial | postmortem
   readingTime: 5
   excerpt: Ein Satz, der neugierig macht.
   cover: ""                 # optional, z. B. /images/devlog/mein-thema.jpg
   draft: false              # true = noch nicht veröffentlichen
   ---

   Dein Text in Markdown. ## Zwischenüberschriften gehen auch.
   ```
3. Fehlt eine Sprache, verlinkt der Sprachumschalter auf die Devlog-Übersicht der anderen Sprache.

## Sicherheitsnetz

Beim Bauen prüft die Seite alle Inhalte:

- Fehlt ein Pflichtfeld oder hat ein Feld einen ungültigen Wert, bricht der Build ab und nennt Datei und Feld.
- Haben `de.yaml` und `en.yaml` nicht dieselben Schlüssel, nennt der Build den fehlenden Text.

So geht nie eine halb ausgefüllte Seite online.

## Kontaktformular und Newsletter

- Ohne Formular-Dienst öffnet das Kontaktformular das E-Mail-Programm des Besuchers mit vorausgefüllter Nachricht.
- Mit einem Dienst wie [Formspree](https://formspree.io) trägst du dessen Adresse in `site.yaml` bei `contactFormAction` ein, dann kommen Nachrichten direkt per E-Mail bei dir an.
- Der Newsletter-Bereich im Devlog erscheint erst, wenn `newsletterAction` in `site.yaml` gesetzt ist.
- Denk daran, einen solchen Dienst in der Datenschutzerklärung zu nennen.

## Veröffentlichen

`npm run build` erzeugt den Ordner `dist/` mit reinen HTML-, CSS- und Bilddateien. Den Inhalt von `dist/` lädst du per SFTP auf deinen Webspace (z. B. in das Verzeichnis deiner Domain). Eine Datenbank oder PHP ist nicht nötig.

Die Domain trägst du in `astro.config.mjs` bei `site` ein.

Die Schrift Inter wird mit der Seite ausgeliefert (kein Google Fonts), Videos sollten ebenfalls als Datei unter `public/video/` liegen statt als YouTube-Einbettung.
