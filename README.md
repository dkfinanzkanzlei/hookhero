# Hook Hero & Close Hero Website

Zwei-Marken-Website für das Hook Hero / Close Hero Ökosystem.

## Schnellstart

```bash
npm install
npm run dev
```

Dann im Browser öffnen:
- **Hook Hero:** http://localhost:3000/index.html
- **Close Hero:** http://localhost:3000/close-hero.html

## Seiten

| Seite | Datei | Beschreibung |
|---|---|---|
| Hook Hero | `index.html` | Content-Tool Landing Page (Cyan/Blau) |
| Close Hero | `close-hero.html` | Lead-Shop für Versicherungsprofis (Gold/Schwarz) |

## Vor dem Launch

1. **PayPal-Link anpassen** – in `close-hero.html` die Zeile:
   ```js
   const PAYPAL_ME = 'https://www.paypal.com/paypalme/hookhero';
   ```
   → `hookhero` durch deinen echten PayPal.me-Nutzernamen ersetzen

2. **AGB / Datenschutz / Impressum** – Links in den Footern beider Seiten befüllen

3. **Domain** – Einfach den ganzen Ordner auf Netlify, Vercel oder deinen Hoster hochladen

## Kontakt

info@hookhero.de
