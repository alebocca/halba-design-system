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
| `upstream/` | Copia esatta dei file `project/` dell'artifact (versione `1794161239-f3e0`, 8 novembre 2026): token, bundle, tipi, README e preview. Non modificare a mano: si sovrascrive a ogni aggiornamento. |
| `tokens/tokens.json` | Token (copia di `upstream/tokens.json`), unica fonte. |
| `tokens/tokens.css` | Variabili CSS, tema chiaro su `:root` e scuro su `[data-theme="dark"]`. Generato: `npm run tokens`. |
| `tokens/typography.css` | Classi `hb-type-<stile>` (display-xl, h1, body, label-mono…). Generato. |
| `src/components.css` | CSS dei componenti (classi `hb-*`), copia di `upstream/components/bundle.css`. Generato. |
| `src/bundle.js` | Tutti i componenti come modulo ES, generato da `upstream/components/bundle.js` (`npm run sync`). |
| `src/index.d.ts` | Tipi (da `upstream/components/index.d.ts`, più `className`). Generato. |
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

## Componenti

Button (anche come link con `href`, variante `on-brand` sui blocchi colorati), SegmentedControl, Alert, AuthLayout,
PieChart (distribuzioni: OK, KO, Retry), BarChart (valori nel tempo), Badge, StatusBadge (gli stati di
pagamento), StatTile, MetricCard, Input, Card, Panel, TextLink, Spinner, Modal, Icon (Lucide), PhotoPanel,
OverlayCard e le storie CheckoutStory, RetryStory (2 o 3 passi con `steps`), RevenueStory. Statici, tranne
Modal e le storie: si rendono lato server senza JS (anche i due grafici).

Colori dei grafici: `chart-1` (azzurro, serie principale e Retry), `chart-2` (viola), `chart-3`, `chart-4`
(una sola anomalia) e gli stati `chart-success`, `chart-danger`, `chart-warning`, `chart-neutral`; nel preset
Tailwind sono `bg-hb-chart-success` e simili. Riempimenti morbidi senza bordo; solo le linee sono piene (2px).

## Differenze dal bundle originale

`src/bundle.js` è `upstream/components/bundle.js` trasformato da `scripts/build-bundle.mjs`, che cambia solo:

1. `import React` al posto di `window.React`, `export` al posto di `window.Halba`;
2. `reducedMotion()` controlla che `window` esista (render lato server);
3. le storie partono dallo stato finale (progress 1) e ricominciano da 0 quando entrano in vista: senza questo
   il render lato server mostrerebbe un modulo vuoto. Tempi, testi e classi sono invariati.

Se il bundle dell'artifact cambia in quei punti lo script si ferma e va aggiornato.

## Aggiornare dall'artifact

1. Rileggere i file `project/` dell'artifact e sovrascrivere `upstream/` (e `tokens/tokens.json` con
   `upstream/tokens.json`).
2. `npm run sync`: rigenera token, bundle, CSS e tipi.
3. `git diff upstream/` per vedere cosa è cambiato; aggiungere al catalogo i componenti nuovi e al preset
   Tailwind i colori nuovi; `npm run catalog` per controllare.
4. Alzare la versione in `package.json`, committare, `git tag vX.Y.Z`, `git push --follow-tags`, poi aggiornare
   il tag nei frontend.

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

Repository pubblico `alebocca/halba-design-system`, senza registro npm né token. I frontend lo installano da
un tag git:

```json
"@halba/design-system": "github:alebocca/halba-design-system#v0.4.0"
```

Per una nuova versione: aggiornare `version` in `package.json`, committare, `git tag vX.Y.Z`,
`git push --follow-tags`, poi cambiare il tag nei frontend e rifare `npm install`. Il pacchetto non ha passo di
build (moduli ES e CSS), quindi l'installazione da git funziona così com'è.
