# Loghi dei circuiti (pagina di pagamento)

File ufficiali dei circuiti e `brands.json` (id, nome, file chiaro e negativo, dimensioni, ordine). Le regole d'uso
sono nel design system (artifact, `checkout.md` → Card schemes, e `checkout-criteria.md`).

- **Id**: quelli di `brands.json` (`amex`, `cartes-bancaires`, `discover`, `jcb`, `mastercard`, `unionpay`, `visa`).
  L'orchestratore li collega ai suoi (`cartes_bancaires`, `cup`) e usa l'id del design system nelle classi
  (`halba-brand--cartes-bancaires`).
- **Pagina**: l'orchestratore copia la cartella in `src/checkout/assets/brands/` e mostra i file come `<img>` serviti
  da `pay.halba.ai/c/assets/brands/` (niente data URI). Il nome del circuito è l'`alt` dell'immagine chiara; il
  negativo ha `alt=""`.
- **Ordine**: alfabetico (`order`), come chiede Cartes Bancaires.
- **Senza file** (in `pending`: Maestro, Diners…): la pagina mostra il nome (`halba-brand--text`) finché il file non
  arriva. Per aggiungerne uno: il file in questa cartella e la voce in `schemes` e `order` di `brands.json`.
- Niente script, link esterni o font negli SVG; niente sfondo aggiunto ai PNG.
