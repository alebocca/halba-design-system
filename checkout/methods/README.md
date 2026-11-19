# Marchi dei metodi di pagamento (pagina di pagamento e app del terminale)

File ufficiali dei metodi alternativi (non circuiti di carta) e `methods.json` (id, nome, file, colore del riquadro,
dimensioni). Fonte di verità: `methods.json`. Regole d'uso in `checkout.md` (Method marks) e `terminal.md`.

- **Metodi**: Alipay, Bizum, BLIK, iDEAL | Wero, Klarna, MB WAY, PayPal, TWINT, WeChat Pay. In arrivo: Bancontact
  (come metodo) e Przelewy24 (`pending`).
- **Riquadro fisso**, colore da `tile` in `methods.json`: bianco per la maggior parte, nero per TWINT, rosa `#FFA8CD`
  per Klarna, giallo `#FFF48D` per iDEAL | Wero.
  - Pagina di pagamento: 80 × 40 px, bordo 1px, immagine 64 × 24 (`halba-method__logo--tile` e
    `--tile-dark | --tile-pink | --tile-yellow` in `halba-checkout.css`).
  - App del terminale: 112 × 48 dp senza cornice propria (ce l'ha il bottone), immagine 96 × 32.
- **Uso**: i file così come sono, senza ridisegnarli, ricolorarli, tagliarli, deformarli o metterli su un fondo di un
  altro colore.
- **Vettoriali**: iDEAL | Wero e MB WAY. Gli altri sono PNG (320 px di larghezza) e verranno sostituiti con i
  vettoriali quando arrivano. Il file WeChat è il marchio di WeChat, non quello di WeChat Pay: da sostituire.
- **Id di halba**: `wechatpay` usa `wechat`; `klarna_paynow` e `klarna_account` usano `klarna`; `ideal` usa
  `ideal-wero.svg`. Un metodo senza file mostra il nome con la grafia ufficiale.
- Niente script, link esterni o font negli SVG; niente sfondo aggiunto ai PNG.
