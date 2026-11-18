# Bunto – Website

Statische Landing Page (DE/EN) für die Bunto-Ausmal-App inkl. Impressum und Datenschutzerklärung.
Reines HTML/CSS/JS, keine Build-Schritte, keine externen Ressourcen (kein Tracking, keine CDN-Fonts).

## Struktur
| Pfad | Inhalt |
|---|---|
| `index.html`, `impressum.html`, `datenschutz.html` | Deutsch (`/`, `/impressum`, `/datenschutz`) |
| `en/index.html`, `en/imprint.html`, `en/privacy.html` | Englisch (`/en/`, `/en/imprint`, `/en/privacy`) |
| `assets/` | CSS, JS, App-Icon, Screenshots (`assets/shots/{de,en}`) |
| `Dockerfile`, `nginx.conf`, `docker-compose.yml` | Deployment |

## Vor dem Livegang ausfüllen
Gelb markierte Stellen (`class="todo"`) in `impressum.html`, `datenschutz.html`, `en/imprint.html`, `en/privacy.html`:
Name/Anschrift/E-Mail und Hosting-Anbieter. Suche: `grep -rn 'class="todo"' .`
Sobald die App live ist: den „Bald im App Store“-Button (`span.cta.soon` in `index.html` und `en/index.html`) durch einen Link
`<a class="cta" href="https://apps.apple.com/…">` ersetzen.

## Lokal testen
```bash
docker compose up --build   # dann http://localhost:8080 (Port-Mapping nur lokal, siehe unten)
# oder ohne Docker:
python3 -m http.server 8080
```
(Mit `python3 -m http.server` funktionieren die „schönen“ URLs `/impressum` nicht – dafür `.html` anhängen.)

## Deployment mit Coolify
1. Coolify → *Project* → **+ New Resource** → **Public/Private Repository** (GitHub-App oder Deploy Key) → dieses Repo wählen, Branch `main`.
2. **Build Pack: Dockerfile** (einfachster Weg) – *Ports Exposes:* `80`.
   (Alternativ *Docker Compose*, nutzt `docker-compose.yml`.)
3. **Domains:** z. B. `https://bunto.app` (und `https://www.bunto.app`) eintragen; DNS-A-Record auf den Coolify-Server. Let's Encrypt-Zertifikat macht Coolify automatisch.
4. **Deploy**. Healthcheck ist im Dockerfile enthalten.
5. **Automatisch aktualisieren (Wartung):** *Webhooks → Automatic Deployment* aktivieren (bzw. bei GitHub-App ist es Standard). Danach gilt:
   Änderung machen → `git push` → Coolify baut und deployt neu. Kein Server-Zugriff nötig, Rollback über *Deployments → Redeploy* einer älteren Version.

Der Container ist ein winziges `nginx:alpine` (~25 MB) ohne Access-Logs.
