# Cosa manca nel design system

Pezzi di interfaccia che i frontend usano e l'artifact non definisce. Vanno aggiunti all'artifact
(README del componente, preview, bundle), poi portati qui. Situazione al 7 novembre 2026.

## Per tutti i frontend

- **Bottone come link**: `Button` rende solo `<button>`; sito e pagine usano `<a>`. Serve `href` (o un
  `ButtonLink`). Oggi il sito mette le classi `hb-btn` sugli `<a>` a mano.
- **Bottone su blocco colorato**: variante per bottoni secondari/ghost sopra `brand` o `ink` (oggi il sito
  forza `color: var(--on-brand)` su un ghost, e l'hover diventa `surface-sunken`).
- **Card generica** (`surface-raised` + `border` + `radius-lg`, con variante "product" con `shadow-card`) e card
  cliccabile con hover.
- **Blocco di colore / Panel** (brand, brand-tint, sky-tint, sky, sun, accent, ink, sunken) come componente:
  il README ne parla, ma esiste solo dentro StatTile e le storie.
- **Link testuale con freccia** ("Explore orchestration →") e stile dei link nel testo.
- **Tipografia responsive**: gli stili display/stat sono fissi (72/56/88px); manca la regola per mobile.
  `StatTile` a 88px non si adatta (il sito lo riduce a 64px sotto i 900px).
- **Token di layout e motion**: larghezza contenitore (1200px nel README, non un token), curva `ease-out`, durate
  (900ms, 500ms).
- **Icone**: il README indica Lucide, ma non c'è un componente/convenzione (dimensione 20px, tratto 1.75px).
  Badge e OverlayCard usano glifi testuali (✓ ! ✕).
- **Logo**: nessun file del marchio; sito e dashboard scrivono "Halba" in testo.

## Dashboard (sandbox.halba.ai) — dagli import shadcn

In ordine di uso: **form** (Label, Form con messaggi di errore, 25 import), **Select** (23), **Table** (21:
intestazioni, righe, ordinamento, stato vuoto, paginazione), **Alert** / messaggio in linea (21), **Dialog**
(20) e **AlertDialog** di conferma (13), **Tabs** (16), **Switch** (12), **Tooltip** (10), **Skeleton** /
caricamento (9) e **spinner** (3), **DropdownMenu** (9), **ScrollArea** (7), **Toast** (6), **Popover** (3),
**Separator** (3), **Sheet / drawer** (2), **Slider** (2), **Calendar** e **date range picker** (filtri per
data), **Checkbox**, **Textarea**, **Toggle / ToggleGroup**, **Progress**, **Pagination**.
Più quelli specifici:

- **Filtri** di tabella (barra con ricerca, select, intervallo di date, chip dei filtri attivi).
- **Badge di stato dei pagamenti** con parola e icona: l'elenco degli stati (Approved, Declined, Challenge,
  Refunded, Pending, Failed…) con il tono di ciascuno, uguale in sito, dashboard e API.
- **Grafici** completi: il README definisce colori e regole, ma l'unico grafico è lo sparkline di
  `MetricCard`. La dashboard usa 8 grafici a barre, 5 ad area, 3 a linee e 3 a torta (Recharts): servono
  asse, legenda, tooltip e la regola per la torta (che i colori `chart-*` non coprono).
- **Layout dell'app**: barra laterale, intestazione di pagina con azioni, stato vuoto, pagina di errore.
- **Codice / chiavi API**: blocco di codice e campo copiabile (anche nel sito, `pre` e `code`).

## Sito (halba.ai)

- **Navigazione**: header fisso con menu a tendina "Platform", menu mobile, footer a colonne.
- **FAQ / accordion** (`details`), **elenco di passaggi numerati**, **tabella** dei contenuti (sviluppatori,
  prezzi), **intestazione di pagina** (eyebrow + titolo + sottotitolo), **sezione CTA** su blocco brand.
- **Mini card di prodotto** con righe chiave/valore e badge (le schede "Fraud decision", "Order 1001").
- **RetryStory con due tentativi**: il sito dice "retry once on your backup PSP", ma la storia mostra sempre due
  rifiuti e un'approvazione (tre passi fissi). Serve una prop per il numero di tentativi (o una variante a due
  passi); oggi il sito la usa con Adyen e Stripe rifiutati e Checkout.com approvato, che non corrisponde al
  testo.

## Pagine pay.halba.ai (`halba-orchestrator/src/api/app.ts`)

Pagine di passaggio (reindirizzamento al provider, link scaduto, pagamento non trovato, provider non
disponibile) scritte con stili in linea e `system-ui`, senza token né font. Mancano:

- **Pagina di stato centrata**: logo, titolo, messaggio, icona di stato (successo/errore/attesa) e azione
  ("Torna al negozio").
- **Indicatore di attesa** per "Redirecting to your payment provider…".
- Versione **senza JavaScript e senza React** (HTML + CSS dei token e delle classi `hb-*`, servibile dall'API).

## Overlay 3DS di halba.js (`halba-orchestrator/src/client/halba.js`)

Lo strato e il riquadro dell'iframe del challenge sono scritti con colori fissi (`rgba(15,23,42,.55)`, `#fff`,
raggio 12px). Mancano:

- **Modale / overlay** (velo, riquadro `surface-raised`, `radius-lg`, ombra, chiusura, focus intrappolato):
  serve anche alla dashboard (Dialog).
- **Stato di caricamento** dentro il riquadro mentre l'iframe del provider si apre.
- **Token di velo** (colore dello sfondo scurito) per chiaro e scuro.
- Versione **CSS-only con prefisso** da iniettare nella pagina del merchant senza toccarne gli stili.

## Distribuzione (scelta: repository pubblico)

**Repository pubblico** `alebocca/halba-design-system`, installato dai frontend con un tag git:
`"@halba/design-system": "github:alebocca/halba-design-system#v0.1.0"`.

- Niente da nascondere: token, CSS e storie sono già pubblici nel CSS/JS servito da halba.ai.
- Nessun token di lettura da creare, ruotare e copiare nelle variabili di build di Cloudflare (`halba-site` e
  `halba-app`), nessun `.npmrc` e nessun workflow di pubblicazione: si crea un tag e si aggiorna il numero
  nei frontend.
- Il pacchetto non ha passo di build (moduli ES e CSS), quindi l'installazione da git funziona così com'è.

GitHub Packages privato è l'alternativa se il codice deve restare privato: workflow che pubblica su
`npm.pkg.github.com` a ogni tag, `.npmrc` in ogni frontend con
`@halba:registry=https://npm.pkg.github.com` e `//npm.pkg.github.com/:_authToken=${NPM_TOKEN}`, e un token
classico con `read:packages` (i token a grana fine non leggono il registro npm) in `NPM_TOKEN` nelle
variabili di build di ogni Worker. Funziona, ma è un segreto in più da gestire per un pacchetto che non
contiene nulla di riservato.
