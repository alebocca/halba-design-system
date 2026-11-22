# Terminal: receipt for alternative payment methods (APM)

How the halba app prints the receipt for methods paid with a QR code (PayPal, Klarna, iDEAL | Wero, MB WAY, Alipay and the others) on the terminal printer, through the Adyen payment app. Card receipts stay Adyen's: this one is built to look like them (same blocks, same order, same kind of document). It is printed for every outcome: approved, declined, cancelled, not completed (the QR expired). Refunds follow later with the same layout.

Previews: group **Terminal**, `TerminalReceipt` (one render per outcome, both versions, Italian, English, German). Files: `project/terminal/receipt/` (`render/` 384 px renders, `lines/` the text version line by line, `xhtml/` the XHTML templates, `receipt.json` strings and rules). The renders are the reference to compare with a real print. They are a simulation: the printer's own font, and the Adyen app's XHTML renderer, will differ in detail.

## 1. Constraints

- Thermal paper 58 mm, usable width **384 px**, black and white only (1 bit, no greys).
- Two versions, same content and same order:
  - **XHTML**, the main one: can hold a 1-bit PNG image, at most 384 px wide and under 256 KB, for the logo.
  - **Text only**, the fallback, used if the XHTML is not printed. Per line: normal or bold, width and height single or double, alignment left, centre or right. No image, no logo.
- Characters per line: about 32 with the normal font, about 16 with double width. This is an estimate to check on the S1F2. **Design for 30**: every text line is at most 30 characters (15 at double width), so the layout holds on a 30-character printer.
- A QR code can only be a second, separate print right after the text (phase 2).
- At most **25 lines** (a double-height line counts once, but it is 48 px tall), so paper is not wasted. At 8 px per millimetre the text receipt is about 7.5 cm long and the XHTML one about 9 cm with the logo.

## 2. Blocks and hierarchy

| Block | Data | Style |
| --- | --- | --- |
| Header | Logo (XHTML only); merchant name; store name; store address; VAT number (optional) | Merchant name bold. The rest normal, centred. In the text version the merchant name replaces the logo. |
| Payment | Date and time, terminal, method, merchant order reference, halba reference, PSP reference, payer account (masked) | Label left, value right, normal. Rows that have no data are not printed. |
| Result | Amount, outcome, reason (not approved), "no charge" (not approved) | Amount: bold, double width and height. Outcome: bold, double height (XHTML: bold in a 3 px frame). Reason and "no charge": normal and bold, centred. |
| Closing | Copy (CUSTOMER, and a MERCHANT one later if wanted), keep the receipt, thank you, "not a tax document" | Copy bold. The rest normal, centred. |

The amount and the outcome are the two largest things on the paper. Everything else is compact, one line per datum.

### Outcomes

| Outcome | Printed | Reason line | "No charge" line | Closing |
| --- | --- | --- | --- | --- |
| APPROVED | yes | none | none | copy, keep, thank you |
| DECLINED | yes | short text for the customer (never the technical code), see `receipt.json` `r_*` | yes | copy |
| CANCELLED | yes | "Payment cancelled before confirmation." | yes | copy |
| NOT COMPLETED | yes (QR expired) | "The QR code expired." | yes | copy |

"No charge" is a promise to the customer: it is printed only when halba knows that no money was taken. **To confirm** with operations for each PSP.

Reasons for DECLINED are a short fixed list (insufficient funds, declined by the provider, limit exceeded, method unavailable, generic "Payment not authorised"). Anything the PSP returns that is not in the list becomes the generic one. The technical code is never printed.

## 3. Text version, line by line

All lines are at most 30 characters. A row with label and value is **exactly 30 characters** (label on the left, value on the right, spaces between) and is printed centred, so the margins are the same on a 30 and on a 32 character printer. The separator is 30 hyphens, centred.

Approved, Italian (sample data):

| # | Text (30 characters max) | Align | Bold | Width | Height |
|---|---|---|---|---|---|
| 1 | `Northwind Coffee Roasters` | centre | yes |  |  |
| 2 | `S.r.l.` | centre | yes |  |  |
| 3 | `Milano Duomo` | centre |  |  |  |
| 4 | `Via Torino 12, 20123 Milano MI` | centre |  |  |  |
| 5 | `P. IVA IT01234567890` | centre |  |  |  |
| 6 | `------------------------------` | centre |  |  |  |
| 7 | `Data          20/11/2026 18:47` | centre |  |  |  |
| 8 | `Terminale              Cassa 1` | centre |  |  |  |
| 9 | `Metodo    Klarna Pay Over Time` | centre |  |  |  |
| 10 | `Ordine         ORD-2026-004172` | centre |  |  |  |
| 11 | `Rif. halba    tp_7Hk2...a3Q9xA` | centre |  |  |  |
| 12 | `Rif. PSP      KL-8841926710553` | centre |  |  |  |
| 13 | `Conto         m***@example.com` | centre |  |  |  |
| 14 | `------------------------------` | centre |  |  |  |
| 15 | `24,90 €` | centre | yes | x2 | x2 |
| 16 | `APPROVATO` | centre | yes |  | x2 |
| 17 | `------------------------------` | centre |  |  |  |
| 18 | `COPIA CLIENTE` | centre | yes |  |  |
| 19 | `Conservare questo scontrino` | centre |  |  |  |
| 20 | `Grazie` | centre |  |  |  |
| 21 | `Non costituisce documento` | centre |  |  |  |
| 22 | `fiscale` | centre |  |  |  |

After the second separator the other outcomes print:

**declined**

| # | Text (30 characters max) | Align | Bold | Width | Height |
|---|---|---|---|---|---|
| 1 | `24,90 €` | centre | yes | x2 | x2 |
| 2 | `RIFIUTATO` | centre | yes |  | x2 |
| 3 | `Fondi insufficienti sul conto.` | centre |  |  |  |
| 4 | `Nessun addebito.` | centre | yes |  |  |
| 5 | `------------------------------` | centre |  |  |  |
| 6 | `COPIA CLIENTE` | centre | yes |  |  |
| 7 | `Non costituisce documento` | centre |  |  |  |
| 8 | `fiscale` | centre |  |  |  |

**cancelled**

| # | Text (30 characters max) | Align | Bold | Width | Height |
|---|---|---|---|---|---|
| 1 | `24,90 €` | centre | yes | x2 | x2 |
| 2 | `ANNULLATO` | centre | yes |  | x2 |
| 3 | `Pagamento annullato prima` | centre |  |  |  |
| 4 | `della conferma.` | centre |  |  |  |
| 5 | `Nessun addebito.` | centre | yes |  |  |
| 6 | `------------------------------` | centre |  |  |  |
| 7 | `COPIA CLIENTE` | centre | yes |  |  |
| 8 | `Non costituisce documento` | centre |  |  |  |
| 9 | `fiscale` | centre |  |  |  |

**incomplete**

| # | Text (30 characters max) | Align | Bold | Width | Height |
|---|---|---|---|---|---|
| 1 | `24,90 €` | centre | yes | x2 | x2 |
| 2 | `NON COMPLETATO` | centre | yes |  | x2 |
| 3 | `Il codice QR è scaduto.` | centre |  |  |  |
| 4 | `Nessun addebito.` | centre | yes |  |  |
| 5 | `------------------------------` | centre |  |  |  |
| 6 | `COPIA CLIENTE` | centre | yes |  |  |
| 7 | `Non costituisce documento` | centre |  |  |  |
| 8 | `fiscale` | centre |  |  |  |

Everything above the second separator is the same for all outcomes.

## 4. Long data: wrap, cut or shorten

| Datum | Rule |
| --- | --- |
| Merchant name, store, address, method, reason | Wraps at spaces. Merchant name and address at most 2 lines, store 1 line, reason 2 lines. If it still does not fit, the last line ends with "..." (text) or "…" (XHTML). A word longer than a line is split. |
| Label and value of a row | If label, a space and value fit in 30 characters they share the row. If not (a long method name), the label has its own row and the value goes below it, right-aligned, on at most 2 rows. |
| References (order, halba, PSP, payer account) | Never wrapped, never cut at the end. If too long, shortened in the middle, keeping the start and the end, for example `KL-884...0553`, so the customer can still match it. |
| halba reference | The payment id `tp_…`, always shortened to 16 characters in the middle. |
| Payer account | Printed only if the PSP gives it, already masked by the PSP. In the text version the bullet `•` becomes `*` (it is not in the printer character set). |
| Amount | Double width, so at most 15 characters. If it is longer (very rare), print it at normal width. |

If the receipt would pass 25 lines, drop rows in this order: payer account, merchant order reference, terminal, VAT number.

## 5. Languages and formats

Italian, English and German, the language of the terminal. Labels, outcomes, reasons and closing lines are in `receipt.json`.

| | Italian | English | German |
| --- | --- | --- | --- |
| Amount | `24,90 €` | `€24.90` | `24,90 €` |
| Date and time | `20/11/2026 18:47` | `20/11/2026 18:47` (English, day first, **to confirm** for other markets) | `20.11.2026 18:47` |

Labels are at most 10 characters (German "USt-IdNr." and "Bestellung") so that a value of 19 characters shares the row. The line "Not a tax document" is printed only where it is needed (today Italy, **to confirm** per market) and is not translated into English or German in this version.

Character set: the text version needs the printer code page to include `€ è à ò ù ä ö ü ß`. **Check on the S1F2.** If `€` is missing, print the currency code (`EUR`) in the text version.

## 6. Logo

- **Default halba logo** for the XHTML: `halba-receipt-logo-384x156.png`, PNG 1 bit, 384 × 156 px, mark and word "halba" on one line, about 350 px wide, with 9 px of white above and below. It is the same artwork as the Adyen card receipt logo (384 × 240 BMP, see `terminal.md` section 13) with the empty rows removed, so the receipts look alike and paper is saved.
- **Merchant logo**: the one the merchant uploads in the dashboard (PNG, JPG or BMP). The dashboard converts it to black and white and prepares both versions: 384 × 240 BMP for Adyen and a PNG 1 bit for the XHTML.
  - Maximum area **384 × 240 px**. The logo is scaled to fit, never stretched.
  - It is **centred** horizontally. Empty rows above and below are cut and 9 px of white are left, so the PNG is 384 px wide and at most 240 px high.
  - Pure black and white, no greys (threshold, no dithering for logos). PNG under 256 KB.
  - If the merchant has no logo, the halba logo is printed.
- Text version: no image. The merchant name, bold and centred, takes its place.

## 7. XHTML version

The templates are in `xhtml/` (one per language and outcome). The markup is deliberately simple: `p`, `table`, `b`, `img` and a few inline styles (`text-align`, `font-size`, `font-weight`, `border`). Label and value use a two-cell table. The logo is an `img` of width 384. **To confirm with Adyen** the exact XHTML tags and styles the app accepts (tables, borders, font sizes) and how the image is passed; the templates must be adapted to what it prints.

## 8. Checks on the terminal

- Print all four outcomes in the three languages, on the S1F2 with real paper, in both versions, and compare with the renders.
- Count the characters per line (32 or 30) and the width of the double-width lines.
- Print a merchant name, a method name and a reference that are too long, and check the rules of section 4.
- Print with and without the VAT number, the PSP reference and the payer account.
- Check the code page (section 5), the sharpness of the logo and that nothing is cut at the edges.
- The XHTML does not print: confirm that the text version is used.

## 9. Open points

1. XHTML subset and image passing in the Adyen app.
2. Real characters per line on the S1F2 (30, 32 or other) and the code page.
3. "No charge" wording and when halba can say it, for each PSP.
4. "Not a tax document": which markets, and the wording in English and German.
5. Which PSP references and which masked payer accounts each PSP gives.
6. Date format for English-speaking markets other than the UK.
7. Refund receipt (same layout, outcome REFUNDED, amount with a minus sign) and the merchant copy: later.
8. QR code with a link to the online receipt, as a second print: phase 2.
