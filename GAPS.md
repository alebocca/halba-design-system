# Cosa manca nel design system

Pezzi di interfaccia che i frontend usano e l'artifact non definisce ancora. Vanno aggiunti all'artifact, poi
portati qui con `npm run sync`. Situazione all'8 novembre 2026 (artifact `1794094029-2d44`, pacchetto v0.2.0).

## Coperto dalla v0.2.0

Button come link e variante `on-brand`, StatusBadge con l'elenco degli stati, Card, Panel, TextLink, Spinner,
Modal con `scrim` e `shadow-overlay` (anche per l'overlay 3DS), Icon (Lucide), tipografia sotto i 900px,
`container-max`, durate e curva di motion, regole per torta e ciambella, RetryStory a 2 passi, indicazioni per le
pagine pay.halba.ai senza JavaScript e per il livello iniettato da halba.js.

## Ancora da fare

Già elencati dall'artifact come "Planned":

- **Dashboard:** Select, Table (ordinamento, stato vuoto, paginazione), Tabs, Switch, Checkbox, Textarea, Alert,
  AlertDialog, Tooltip, Toast, DropdownMenu, Popover, Sheet, Skeleton, Slider, date range picker, barra dei filtri
  della tabella, layout di pagina con barra laterale.
- **Sito:** header con menu Platform, footer, FAQ, passaggi numerati, intestazione di pagina, Testimonial, blocco di
  codice con copia.

Non ancora nell'artifact:

- **RevenueStory:** valuta fissa in dollari (`$` nel codice); serve una prop `currency` o un `format`. Il sito è in
  euro.
- **Preview di Card:** la card cliccabile contiene un `TextLink`, cioè un link dentro un link (React lo segnala), in
  contrasto con il README di Card. Il catalogo del pacchetto lo evita.
- **Grafici della dashboard:** le regole ci sono, ma non un componente (assi, legenda, tooltip per Recharts).
- **Form:** Label e messaggio di errore esistono solo dentro `Input`; la dashboard usa react-hook-form con
  `FormLabel`/`FormMessage` separati.
- **Bottone distruttivo e bottone solo icona:** la dashboard li usa (10 `destructive`, vari `size="icon"`).
- **Logo:** ancora nessun file del marchio.

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
