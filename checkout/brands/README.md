# Loghi dei circuiti (pagina di pagamento)

Un file SVG per circuito, con questo nome: `visa.svg`, `mastercard.svg`, `amex.svg`, `maestro.svg`,
`cartes_bancaires.svg`, `discover.svg`, `diners.svg`, `jcb.svg`, `cup.svg` (UnionPay).

L'orchestratore copia la cartella in `src/checkout/assets/brands/` e incolla l'SVG nella pagina dentro
`.halba-brand` (niente richieste in più, nessuna regola CSP per il componente). Senza file mostra la sigla.

- Il nome per i lettori di schermo lo mette la pagina (`role="img"` e `aria-label` sul contenitore): l'SVG non
  deve avere `<title>` né testo.
- `viewBox` obbligatorio; l'altezza la decide il CSS (14px), la larghezza segue le proporzioni.
- Niente `id` (gradienti, clip): lo stesso logo compare due volte nella pagina e gli id si scontrerebbero.
- Niente script, link esterni o font: solo forme.
