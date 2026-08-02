# Crane Courts: CMS für die News-Seite

Diese Anleitung ist nur für dich, nicht für den Kunden. Sie kommt nicht ins Repo.

## Was sich ändert

Bisher steht der Event-Text fest in `news.html`. Ab jetzt liegt jedes Event als
eigene kleine Datei im Ordner `events`. Vercel baut daraus beim Veröffentlichen
die News-Seite zusammen. Alle anderen Seiten bleiben unangetastet und werden
1:1 kopiert.

Der Kunde sieht davon nichts. Er loggt sich bei Pages CMS ein, füllt ein
Formular aus, klickt speichern. Zwei Minuten später steht das Event online.

**Wichtig:** Nach dieser Umstellung darf die Vercel-Einstellung "Build Command"
nicht mehr leer sein. Schritt 2 unten nicht überspringen.

---

## Schritt 1: Dateien ins Repo

Alles über die GitHub-Website, kein Terminal nötig.
Repo: `joanmanueltejeda-hash/Crane_Courts`

### 1a. Diese Dateien in den Ordner `Crane_Courts_Website` legen

Neu:

- `eleventy.config.js`
- `package.json`
- `events/events.json`
- `events/2026-08-02-eroeffnung.md`
- `Images/Events/platzhalter.txt`

Ersetzen (gleicher Name, überschreibt die alte Version):

- `news.html`
- `styles.css`

So geht das Hochladen: im Ordner `Crane_Courts_Website` auf
**Add file → Upload files**, die Dateien reinziehen, unten auf
**Commit changes**. Ordner mit Inhalt kannst du direkt mitziehen, GitHub legt
sie an.

### 1b. `.gitignore` anlegen

Im Ordner `Crane_Courts_Website` auf **Add file → Create new file**, als Namen
`.gitignore` eintippen (mit Punkt am Anfang) und das hier reinkopieren:

```
node_modules
_site
.DS_Store
```

### 1c. `.pages.yml` anlegen

Diese Datei gehört **ganz nach oben ins Repo**, also neben den Ordner
`Crane_Courts_Website`, nicht hinein.

Auf der Startseite des Repos auf **Add file → Create new file**, Namen
`.pages.yml` eintippen und den Inhalt der beigelegten Datei `pages.yml`
reinkopieren.

---

## Schritt 2: Vercel umstellen

Vercel muss jetzt bauen statt nur Dateien auszuliefern.

1. vercel.com → Projekt `crane-courts` → **Settings** → **Build and Deployment**
2. **Framework Preset**: von "Other" auf **Eleventy** stellen
3. **Build Command**: `npx @11ty/eleventy` (oder Override aus, wenn Eleventy
   erkannt wird)
4. **Output Directory**: `_site`
5. **Root Directory** bleibt wie es ist: `Crane_Courts_Website`
6. Speichern, dann unter **Deployments** beim letzten Eintrag auf **Redeploy**

Danach `www.cranecourts.com/news.html` aufrufen. Die Seite muss exakt aussehen
wie vorher. Falls der Build scheitert, bleibt automatisch die letzte
funktionierende Version online, es geht also nichts kaputt.

---

## Schritt 3: Pages CMS einrichten

1. Auf [app.pagescms.org](https://app.pagescms.org) mit deinem GitHub-Konto
   einloggen
2. Zugriff nur für das Repo `Crane_Courts` erlauben
3. Repo auswählen. Pages CMS liest `.pages.yml` und zeigt links **Events**
4. Kunden einladen: im Projekt unter **Collaborators** die E-Mail-Adresse
   eintragen. Er braucht kein GitHub-Konto und kommt auch nur an die Events,
   an sonst nichts.

---

## So legt der Kunde ein Event an

1. Bei Pages CMS einloggen, links auf **Events**, oben auf **Add an entry**
2. Felder ausfüllen:
   - **Titel**: Überschrift
   - **Datum** und **Uhrzeit**: stehen klein über der Überschrift
   - **Einleitung**: ein bis zwei Sätze, groß über dem blauen Kasten
   - **Foto**: optional, Querformat, wird auf 3:2 beschnitten
   - **Bildbeschreibung**: kurz sagen, was zu sehen ist
   - **Programmpunkte**: die Liste im blauen Kasten, ein Punkt pro Eintrag
   - **Adresse**: wird automatisch mit Google Maps verlinkt
   - **Text**: der Fließtext im blauen Kasten
3. **Save**. Nach ein bis zwei Minuten ist das Event online.

Das neueste Event steht immer oben. Alte Events löscht der Kunde selbst über
den Papierkorb in der Event-Liste.

---

## Wenn du später etwas änderst

- Neue Unterseite angelegt? Dann muss ihr Dateiname in `eleventy.config.js`
  oben in die Liste `COPY_AS_IS`, sonst ändert sich ihre Adresse.
- Am Aufbau von `news.html` zwischen `{%- for event ... %}` und
  `{%- endfor %}` nichts löschen. Das ist die Stelle, an der die Events
  eingesetzt werden. Text und Klassen drumherum kannst du normal anpassen.
- Neue CSS-Klassen für Events kommen wie gewohnt in `styles.css`.

## Neu in styles.css

Drei Ergänzungen, alles im bestehenden Type- und Token-System:

- `.post + .post` setzt den Abstand zwischen zwei Events
- `.post__media` und `.post__media img` für das Event-Foto, Radius passend zum
  blauen Kasten (40px, ab 900px 32px, ab 760px 24px)
- Die alten Post-Regeln bleiben unverändert
