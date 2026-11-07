# @halba/design-system

Il design system di Halba in un unico pacchetto, usato da tutti i frontend: sito (halba.ai), dashboard
(sandbox.halba.ai), pagine `pay.halba.ai` e overlay di halba.js.

La fonte è l'artifact **Halba Design System** su claude.ai
(`https://claude.ai/artifact/SNLsXy6NJRXYqoMrXWyvRH`). Le regole (contenuti, colori, tipografia, motion,
immagini) sono in [`upstream/README.md`](upstream/README.md) e nei README dei componenti in
[`upstream/components/`](upstream/components). **Un pezzo che manca si aggiunge prima all'artifact, poi qui.**

## Contenuto

| Percorso | Cosa |
| --- | --- |
| `upstream/` | Copia esatta dei file `project/` dell'artifact (versione `1794077435-11a5`, 7 novembre 2026): token, bundle, tipi, README e preview. Non modificare: serve a confrontare a ogni aggiornamento. |
| `tokens/tokens.json` | Token (copia di `upstream/tokens.json`), unica fonte. |
| `tokens/tokens.css` | Variabili CSS, tema chiaro su `:root` e scuro su `[data-theme="dark"]`. Generato: `npm run tokens`. |
| `tokens/typography.css` | Classi `hb-type-<stile>` (display-xl, h1, body, label-mono…). Generato. |
| `src/components.css` | CSS dei componenti (classi `hb-*`), identico a `upstream/components/bundle.css`. |
| `src/components/basic.js` | Button, Badge, StatTile, MetricCard, Input, PhotoPanel, OverlayCard. Statici: si rendono lato server senza JS. |
| `src/stories/stories.js` | CheckoutStory, RetryStory, RevenueStory: le storie animate originali. |
| `src/index.d.ts` | Tipi (da `upstream/components/index.d.ts`, più `className`). |
| `tailwind/preset.js` | Preset Tailwind 3 che collega le variabili shadcn ai token. |
| `catalog/` | Catalogo di token, componenti e storie: `npm run catalog` (porta 4400). |

## Uso

```js
// una volta per app: token + tipografia + componenti
import "@halba/design-system/styles.css";
import { Button, Badge, CheckoutStory } from "@halba/design-system";
```

- **Astro**: con `@astrojs/react`, i componenti statici si usano senza direttiva (HTML puro, zero JS); le storie
  con `client:visible`. Il render lato server mostra lo stato finale, quindi senza JS o con
  `prefers-reduced-motion` si vede subito il risultato.
- **HTML senza React** (pagine `pay.halba.ai`, overlay di halba.js): le classi `hb-*` e le variabili funzionano
  anche scritte a mano, per esempio `<a class="hb-btn hb-btn--primary hb-btn--md">`.
- **Tema scuro**: `data-theme="dark"` su `<html>`. Mai valori esadecimali nel codice delle app.
- **Font**: Plus Jakarta Sans 400/500/600/700 e DM Mono 400/500 da Google Fonts, caricati dall'app.

## Differenze dal bundle originale

Il codice è quello di `upstream/components/bundle.js`, diviso in moduli ES. Cambiano solo:

1. `import React` al posto di `window.React`;
2. `reducedMotion()` controlla che `window` esista (render lato server);
3. le storie partono dallo stato finale (progress 1) e ricominciano da 0 quando entrano in vista: senza questo
   il render lato server mostrerebbe un modulo vuoto. Tempi, testi e classi sono invariati.

## Aggiornare dall'artifact

1. Rileggere i file `project/` dell'artifact e sovrascrivere `upstream/`.
2. `git diff upstream/` mostra cosa è cambiato; riportarlo in `tokens/tokens.json`, `src/components.css`,
   `src/components/`, `src/stories/`, `src/index.d.ts`.
3. `npm run tokens`, poi `npm run catalog` per controllare.
4. Alzare la versione in `package.json` e creare il tag.

## Piano di adozione per la dashboard (`colorful-landing-world`)

Non ancora applicato. Un passo per PR, ognuno rilasciabile da solo.

1. **Token e preset Tailwind.** Aggiungere la dipendenza; in `src/index.css` importare
   `@halba/design-system/styles.css` e **togliere** il blocco `:root`/`.dark` di shadcn: le sue variabili HSL
   (`--border`, `--accent`, `--ring`…) hanno gli stessi nomi dei token e li sovrascriverebbero. In
   `tailwind.config.ts` usare `presets: [halba]` e togliere `theme.extend.colors` e `borderRadius`. Cercare
   gli usi diretti di `hsl(var(--…))` nel codice (vanno sostituiti con `var(--…)`) e il selettore del tema
   scuro (`.dark` → `[data-theme="dark"]`, il preset imposta già `darkMode`). Attenzione: in shadcn `accent` è
   lo sfondo di hover (resta così); l'arancio del brand è `bg-hb-accent`. A questo punto la dashboard ha già
   colori, font, raggi e ombre del design system, senza toccare i componenti.
2. **Componenti già nel design system**, schermata per schermata: `Button` (96 import), `Input` (43), `Badge`
   (12) e le card metriche → `MetricCard`. I bottoni diventano pillole e i badge maiuscoli monospazio.
3. **Componenti che mancano** (tabelle, dialog, select, tabs, toast…): prima si aggiungono all'artifact, poi
   al pacchetto, poi si sostituisce il componente shadcn. Fino ad allora restano quelli shadcn, già colorati
   dal preset al passo 1.
4. Quando non resta nessun import da `@/components/ui/*` di un componente, si cancella il suo file.

## Distribuzione

In locale i frontend lo usano come `file:../halba-design-system`, che funziona solo su questa macchina:
prima di pubblicare un frontend che lo usa, il pacchetto deve stare su GitHub e la dipendenza deve puntare lì
(raccomandazione in fondo a [`GAPS.md`](GAPS.md)).
