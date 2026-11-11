# halba Terminal: guide for the Android app

Rules, measures and texts to build the halba app that runs on PSP payment terminals (Kotlin, Jetpack Compose). The previews in the Design System group **Terminal** are the picture to match; this file says how. Where a value is marked **To confirm**, it is a proposal.

Reference rendering: `project/terminal/halba-terminal.css`. In it 1 px = 1 dp for layout and 1 sp for text, on a screen of 360 × 640 dp. It is not shipped to terminals.

## 1. Device and use

- First model: Stripe Reader S700 (Android, portrait, about 5.5 in, integrated reader). Then myPOS and Adyen, one model each. One app, one layout, scaled (section 11).
- Fixed on a counter, always charging, screen always on (`FLAG_KEEP_SCREEN_ON`). Used by the cashier at arm's length and by the customer up close.
- A payment starts from the till: the till calls the halba API and the terminal wakes. The cashier touches the terminal only for setup and the staff menu.
- Kiosk mode of the PSP keeps the app in front. There is no exit button; staff functions are in a hidden menu protected by a PIN.
- Card reading on Stripe terminals is done by the Stripe app (handoff). Its screen is not ours; the steps to and from it are.

## 2. Principles

1. **Readable at 60–80 cm, in bright light.** Body text 20 sp or more, amounts 48–52 sp, nothing under 16 sp, contrast 7:1 for text on the main surfaces.
2. **One thing per screen.** One headline, one main action.
3. **Targets of 56 dp or more**; the main action is 64 dp. No gesture other than tap, and the 3 s long press of the staff menu.
4. **Same words as checkout**: short, in the customer's language, no jargon, never blame the customer.
5. **Motion explains, it does not decorate.** Each animation is under 400 ms except the loader and the time bars. With "remove animations" on, everything is static (section 9).
6. **The merchant's content comes first when idle**; halba stays discreet.

## 3. Tokens

Names follow checkout. Colours are fixed; only `primary`, `on-primary` and `accent` follow the merchant (section 3.3).

### 3.1 Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `surface` | #FFFFFF | #0E0E10 | Screen background |
| `sunken` | #F1F1EE | #1C1C22 | Panels, keys, code box |
| `ink` | #0E0E10 | #F4F4F1 | Main text |
| `muted` | #4A4A55 | #C4C4CC | Secondary text (7.9:1 on white) |
| `border` | #C9C9C2 | #33333B | Dividers |
| `border-strong` | #6F6F79 | #8A8A96 | Outline of buttons, choices, fields (3:1 or more) |
| `brand` | #5B47E0 | #A99CFF | halba violet, loader dot, mark dot |
| `on-brand` | #FFFFFF | #0E0E10 | Text on `brand` |
| `tint` | #D4CEFB | #2A2650 | Selected row, info note |
| `success` / `success-bg` | #07624A / #DDF5EA | #5FD3A0 / #0F2F25 | Approved |
| `danger` / `danger-bg` | #A8190F / #FDE7E4 | #FF8A80 / #3A1512 | Failed, offline |
| `warn` / `warn-bg` | #6B5200 / #FFF1A8 | #FFD400 / #3A3000 | Not charging, expiring |

Light is used for setup, payment, result and staff screens. Dark is used for idle, the default idle screen, boot and system states, because the terminal is always on and a dark screen has less glare and burn-in. Never invert by device theme: the screen decides.

Fixed colours on the idle screen: status pill background `#0E0E10` at 78 %, text `#FFFFFF`; offline `#B42318`; not charging `#FFD400` with text `#0E0E10`; online dot `#5FD3A0`.

### 3.2 Type

Inter for text, DM Mono for codes and technical values (both OFL; bundle the TTF files, weights 400, 500, 600, 700). Fallback: the system sans.

| Style | Size / line | Weight | Use |
|---|---|---|---|
| `amount` | 52 / 60 sp | 700, tabular figures, −0.02 em | Amount on payment screens; 48 / 56 on result |
| `code` | 72 / 80 sp | DM Mono 500, +0.08 em | Pairing code |
| `title` | 28 / 34 sp | 700 | Screen title |
| `headline` | 24 / 30 sp | 600 | Statements, QR heading |
| `text` | 20 / 28 sp | 400, `muted` | Explanations |
| `label` | 18 / 24 sp | 500 | Rows, hints |
| `caption` | 16 / 22 sp | 400, `muted` | Smallest allowed |
| Button | 22 / 28 sp (main), 20 / 28 sp (other) | 600 | Buttons |

Respect the user's font scale up to 1.3. Beyond that, the amount stays at its size and long texts wrap (never truncate an amount, a code or a reason).

### 3.3 Merchant colour (optional, proposal)

The accent may take the merchant's checkout primary colour, with the same rules as checkout:

- `primary` = merchant colour; `on-primary` = pure `#FFFFFF` or `#000000`, whichever has the higher contrast (at least 4.5:1). If the colour reaches neither, fall back to halba violet.
- `accent` = `primary` if it has 3:1 or more against `surface`, otherwise darkened step by step until it does.
- It is used for: main button, step progress, selected row border, progress bars, loader dot, focus ring.
- It is never used for status (success, danger, warn), for text, or for the QR code.

Decision to confirm: on or off by default. Recommendation: on, because it makes the terminal look like the merchant's, at no cost for the rest.

### 3.4 Dimensions

| Item | Value |
|---|---|
| Screen margin | 24 dp (16 dp in the payment header) |
| Space between blocks | 16 dp; between rows 8 dp |
| Radius | 16 dp controls, 20 dp tiles, 24 dp panels and sheets, pill 999 |
| Main button | height 64 dp, text 22 sp, radius 16, 2 dp border |
| Other buttons | height 56 dp, text 20 sp |
| Choice row (language, store) | height 72 dp, 2 dp border |
| Menu row | height 64 dp |
| Info row | height 64 dp |
| Input | height 64 dp, text 24 sp |
| Header with back | 72 dp; back button 56 × 56 dp minimum |
| Step progress | segments 6 dp high, 4 dp gap |
| Progress bar | 12 dp (setup), 8 dp (QR, result) |
| Method tile | 88 dp high; QR methods in 2 columns, 8 dp gap, last odd tile full width |
| QR | 288 × 288 dp including a white margin of 20 dp (more than the 4 modules of the quiet zone) |
| PIN key | 72 dp high, 12 dp gap, digits 32 sp |
| PIN dots | 24 dp, 16 dp gap |
| Icons | 28 dp (24 in notes), stroke 2 dp, rounded |
| Status badge (result) | 96 dp circle, icon 48 dp; 120 dp for approved |
| Loader | 72 dp (halba mark orbit, 32 dp small) |

## 4. Shared behaviour

- **Language**: chosen in setup (English, Italiano, Deutsch), kept until set up again. The PSP language is not used. A payment can bring a locale from the till; if it does and it is one of the three, use it for that payment only.
- **Amounts** follow the language (section 8).
- **Transitions**: 240 ms, ease-out. The payment sheet rises over the idle content; the rest cross-fade. Reduced motion: no movement, a 100 ms fade at most or an instant change.
- **Keyboard**: only the terminal name and the store search. Hide it when the field is not focused.
- **Back**: setup only, in the top left, 56 × 56 dp. It never loses what was typed.
- **No dead ends**: every error has an action (retry, new code, ask the cashier) or retries by itself.
- **Time-outs** (proposed, to confirm): pairing code valid 10 min; reader connection 15 s; card wait 60 s; PIN screen inactivity 30 s; staff menu inactivity 120 s; network retries after 2, 4, 8, 15 s, then every 30 s.

## 5. Screens and states

Each state has a preview in the Terminal group. The texts are in section 8.

### A. Guided setup (first start)

A header with back and "Step n of 7"; under it a step bar. The accent colour fills the finished segments.

1. **Welcome and language**: the halba mark, title, three language rows (72 dp). The row of the system language is preselected. "Continue" 64 dp.
2. **Pairing**: code of 8 characters in two rows of four, 72 sp DM Mono, in a `sunken` box. Alphabet without 0, O, 1, I, L. Under it the instruction. States: *waiting* (small loader, "Waiting for pairing…"); *expired* (the old code struck through is not shown; a note says it expired and the new code appears); *network error* (note, "Try again", retry by itself). The terminal polls every 3 s; pairing completes when halba confirms.
3. **Store and name**: search field (keyboard), list of stores with name and "Store code …"; selecting a store enables the next step; then the name field with the proposed value ("Till 1"; the number goes up if the store already has terminals).
4. **Reader test**: *connecting* (loader), *ready* (success badge, "Continue"), *not found* (danger note, "Try again", short help). Connect timeout 15 s.
5. **Idle screen**: download with a progress bar (percentage and MB). If the merchant has none: the default halba screen preview in a frame, the message and where to upload ("Terminals > Idle screen"). "Continue" in both cases; download failure retries by itself and does not block.
6. **Test payment** (test mode only, optional): fixed amount 1.00 in the merchant currency, "Start test payment" or "Skip"; then the result screen F.
7. **Done**: summary rows (store, name, PSP), "Start" (64 dp). Leads to idle.

### B. Idle

- Merchant image or video full screen, no borders, `object-fit: cover`, looping. Video: ExoPlayer, no audio, `REPEAT_MODE_ALL`, kept ready to avoid a black frame at the loop.
- **Status indicator**: a pill at the top right, 16 dp from the edges, 32 dp high (touch area 56 × 56 dp). Online: a 12 dp green dot and the word "Online" at 16 sp, on a dark pill. Offline: red pill with a wifi-off icon and "Offline". Not charging: yellow pill at the top left, 56 dp high, "Connect the terminal to power", 18 sp (it is a warning, so it is large on purpose).
- **halba mark** (optional, a setting of the workspace): 40 dp circle at the bottom centre, 16 dp from the bottom, 55 % black behind a white 24 dp mark.
- **Default screen** (nothing uploaded): `#0E0E10` background, halba mark 112 dp and the word "halba" 40 sp, centred; if the merchant has a logo, it sits under the mark in a 176 × 72 dp area, with a 24 dp gap. Every 60 s the content moves by up to 4 dp in a random direction (burn-in).
- **Safe areas** (360 × 640 dp reference): the top band of **72 dp** and the bottom band of **72 dp** are reserved for the status indicator and the mark; 24 dp on both sides are margin. Text and logos in merchant content must stay in the safe area of **312 × 496 dp** (x 24–336, y 72–568). The dashboard shows these bands on the preview.
- Touch on idle does nothing, except the staff gesture (G).

### C. Payment from the till

- The till calls the API; the terminal receives it (push or poll of 2 s) and the screen changes in 240 ms: the white sheet rises from the bottom over the idle content, which dims to 60 %.
- Header: merchant name (20 sp, one line, ellipsis) and halba mark 28 dp; under it the order reference ("Order 1042", 18 sp, `muted`) and the amount at 52 sp. The amount shrinks down to 36 sp to fit, never wraps, never truncates.
- **Method choice**, only if the till did not choose: "Card" tile (88 dp, accent border) and, under "Or pay with a QR code", the QR methods enabled for the merchant in a 2-column grid. Marks are the official ones, on their allowed background, 40 dp high, as in checkout (see the brand guidelines in checkout.md). The previews show labelled placeholders.
- If the till chose a method: go straight to D or E, with no choice screen.
- "Cancel" (text button, 56 dp) is always at the bottom; it asks nothing and returns to idle with F "canceled".

### D. Card

1. **Tap, insert or swipe**: amount, card illustration, "Tap, insert or swipe the card" 30 sp, "Cancel".
2. **Handoff**: when the Stripe app takes the screen, our app waits; no overlay is drawn on top. Before leaving, show "Opening the card reader…" with the loader for at most 15 s (if the reader does not respond: failed, "Card could not be read").
3. **Return**: when the Stripe app returns, show "Processing…" with the halba loader and "Keep the card in place."; no button.
4. Then F. Card wait times out after 60 s: failed, "Payment timed out".

### E. QR

- Header: amount and method mark with the name. Instruction in the screen language ("Scan with Alipay"), and, for methods with a local line, a second line in the method's language (section 8.3).
- QR 288 dp, black on white, white margin of 20 dp inside the box; never tinted, never rounded modules, never a logo in the middle. Screen brightness is raised to the maximum while the QR is shown.
- Under it: "Time left" and `mm:ss` (DM Mono 20 sp) with a bar 8 dp. In the last 60 s the time turns `warn` with "Expires soon".
- **Waiting for payment**: after a scan is detected by the PSP, the QR fades to 12 % and shows "Confirm in the {method} app" with a loader.
- **Expired** (15:00): QR at 8 % with "QR code expired" and "New QR code" (64 dp). A new code replaces it with a new 15 minutes; "Cancel" returns to idle.
- Result arrives from the API; the terminal polls every 2 s while the screen is on.

### F. Result

Returns to idle by itself after **4 s** (a bar of 8 dp drains over 4 s and the text "Back to the start in n s" counts down). Touching the screen does not end it earlier. The state is announced once (section 10).

- **Approved**: success badge 120 dp, "Payment approved", amount 48 sp, chip with the card ("Visa •••• 4242") or method ("Alipay") and the read mode (Contactless, Chip, QR code).
- **Failed**: danger badge, the reason as a title ("Card declined") and what to do ("Try another card or ask the cashier for another way to pay."). Reasons: declined, canceled, timeout, not readable. Never show codes or acquirer messages. The 4 s apply; a failed payment returns to idle, and the till decides what to do.
- **Canceled by the till**: neutral badge, "Canceled by the cashier", "Nothing was charged."

### G. Staff menu (hidden)

- Opens with a **long press of 3 s** on the status indicator or on the halba mark, in a touch area of 56 × 56 dp. A thin white ring of 4 dp fills around the touch while pressing (it starts after 0.5 s, so a short touch shows nothing). If lifted early, nothing happens. The customer sees nothing special.
- **PIN pad**: title, 6 dots, a 3 × 4 pad (72 dp keys, 12 dp gap) with delete at the bottom right. No keyboard. Digits are not echoed; each press is announced by TalkBack as "n of 6 digits entered". After the sixth digit the PIN is checked at once.
- **Wrong PIN**: dots turn red and shake for 240 ms (no movement with reduced motion), "Wrong PIN. n attempts left." The PIN is cleared.
- **Lock**: after 5 wrong attempts the pad is disabled for **5 minutes**, with "Too many attempts. Try again in mm:ss." The count survives a restart (stored with the time).
- Inactivity of 30 s on the PIN pad returns to idle.
- **Menu** (inactivity 120 s returns to idle): information rows (store, name, terminal ID, PSP, app version, status, last contact), then four actions of 64 dp: *Set up again*, *Refresh idle screen*, *Unpair terminal*, *Exit app*; "Close menu" at the bottom.
- **Confirmations** (bottom sheet, 24 dp radius): unpair and exit and set up again. The destructive action is the filled red button; "Cancel" is below.
- Exit calls the PSP's way of leaving kiosk mode. Text: "The till will not reach this terminal until the app is opened again."

### H. System states (dark)

- **Turned off from the dashboard**: "This terminal was turned off", help, "Pair again" (opens setup step 2). The app does not accept payments.
- **No network**: "No connection", "The till cannot send payments to this terminal right now.", "Trying again…" with the small loader. Retries as in section 4. If a payment is on screen when the network drops, the screen stays and the result is fetched when the connection returns; after 60 s it shows failed "Payment timed out".
- **Restart** (nightly reboot): the halba mark with the orbit loader and "Starting halba". It lasts only as long as the start (usually under 10 s), then goes to idle.

## 6. Dashboard components

Group Terminal in the Design System, for the halba dashboard.

- **TerminalStatus**: Online, "Offline for 12 min", Not charging; word, icon and tone.
- **TerminalFrame**: portrait bezel 9:16, with the reserved bands and safe area as an option.
- **IdleScreenUpload**: workspace or store level; preview with the frame; requirements; validation errors; distribution status ("Downloaded by 3 of 4 terminals").
- **StaffPin**: set or change a 6-digit PIN per store; never shown after saving; simple PINs refused; the terminal stores only a hash and the PIN reaches it within a minute.

## 7. Idle screen: image and video rules

Proposal for the S700, to confirm against the device specifications. The reference resolution is **1080 × 1920 px** (portrait 9:16; at 3.0 density this is 360 × 640 dp).

| Item | Rule |
|---|---|
| Ratio | 9:16 portrait. Other ratios are rejected, not cropped. |
| Best resolution | 1080 × 1920 px. Minimum 720 × 1280 px. Above 1080 × 1920 is accepted and scaled down on the server. |
| Image | JPG, PNG or WebP, up to 5 MB, sRGB |
| Video | MP4, H.264 (High profile, level 4.1 or lower), no audio track, up to 30 s, up to 30 MB, 30 fps or less, constant frame rate |
| Loop | The last frame must lead to the first without a cut; the app does not add a fade |
| Safe area for text and logos | x 24–336 dp, y 72–568 dp (312 × 496 dp), which is 6.7 % of the width on the sides and 11.25 % of the height at top and bottom |
| Reserved bands | Top 72 dp (status indicator), bottom 72 dp (halba mark) |
| Colour | Avoid pure white in the top-right corner (the pill is dark and readable on any colour, but looks heavy on white) |

The dashboard checks these on upload and says what is wrong and what is needed ("The video lasts 42 s. The maximum is 30 s."). The server also checks the real codec, duration and size, not the file extension. Distribution: terminals fetch the file by a signed URL when it changes or when staff choose "Refresh idle screen", keep the last good file, and report the result. If the download fails, the terminal keeps the previous screen or the default.

## 8. Texts

Placeholders in braces are filled by the app. Keys are stable; use them as Android string names (`terminal_<key>`).

### 8.1 Amount formats

| Language | EUR 49.90 | EUR 1,234.56 |
|---|---|---|
| English | €49.90 | €1,234.56 |
| Italiano | 49,90 € | 1.234,56 € |
| Deutsch | 49,90 € | 1.234,56 € |
| Deutsch (CHF) | 49,90 CHF | 1.234,56 CHF |

Use `NumberFormat.getCurrencyInstance` with a locale built from the screen language and the currency of the payment. English uses the symbol before the number (€49.90); Italian and German use it after, separated by a no-break space (49,90 €). Never wrap the symbol alone onto a second line.

### 8.2 Strings

German text is on average 25 % longer than English. All containers grow in height, never in font size; test with the German strings at font scale 1.3.

**Setup**

| Key | English | Italiano | Deutsch |
|---|---|---|---|
| `welcome_title` | Welcome to halba | Benvenuto in halba | Willkommen bei halba |
| `welcome_text` | Choose your language | Scegli la lingua | Sprache wählen |
| `continue` | Continue | Continua | Weiter |
| `back` | Back | Indietro | Zurück |
| `step` | Step {n} of {t} | Passo {n} di {t} | Schritt {n} von {t} |
| `pair_title` | Pair this terminal | Abbina questo terminale | Terminal koppeln |
| `pair_help` | In halba, open Connections > your PSP > Add terminal and enter this code | In halba apri Connessioni > il tuo PSP > Aggiungi terminale e inserisci questo codice | Öffnen Sie in halba Verbindungen > Ihr PSP > Terminal hinzufügen und geben Sie diesen Code ein |
| `pair_wait` | Waiting for pairing… | In attesa dell’abbinamento… | Warten auf die Kopplung… |
| `pair_expired` | This code has expired | Questo codice è scaduto | Dieser Code ist abgelaufen |
| `pair_new` | Here is a new code. Enter it in halba instead. | Ecco un nuovo codice. Inseriscilo in halba al suo posto. | Hier ist ein neuer Code. Geben Sie stattdessen diesen in halba ein. |
| `net_title` | No connection | Nessuna connessione | Keine Verbindung |
| `net_text` | Check the network cable or Wi-Fi. We will try again by ourselves. | Controlla il cavo di rete o il Wi-Fi. Riproviamo da soli. | Prüfen Sie Netzwerkkabel oder WLAN. Wir versuchen es automatisch erneut. |
| `retry` | Try again | Riprova | Erneut versuchen |
| `store_title` | Choose the store | Scegli il negozio | Geschäft wählen |
| `store_search` | Search stores | Cerca negozi | Geschäfte suchen |
| `store_code` | Store code {c} | Codice negozio {c} | Geschäftscode {c} |
| `name_title` | Name this terminal | Dai un nome al terminale | Terminal benennen |
| `name_label` | Terminal name | Nome del terminale | Name des Terminals |
| `name_value` | Till 1 | Cassa 1 | Kasse 1 |
| `reader_title` | Check the card reader | Controlla il lettore di carte | Kartenleser prüfen |
| `reader_connecting` | Connecting to the reader… | Collegamento al lettore… | Verbindung zum Kartenleser… |
| `reader_ready` | Reader ready | Lettore pronto | Kartenleser bereit |
| `reader_missing` | Reader not found | Lettore non trovato | Kartenleser nicht gefunden |
| `reader_help` | Restart the terminal and try again. If it keeps failing, contact your provider. | Riavvia il terminale e riprova. Se continua, contatta il tuo fornitore. | Starten Sie das Terminal neu und versuchen Sie es erneut. Besteht das Problem weiter, wenden Sie sich an Ihren Anbieter. |
| `idle_title` | Idle screen | Schermo a riposo | Ruhebildschirm |
| `idle_dl` | Downloading your idle screen | Scarico lo schermo a riposo | Ruhebildschirm wird geladen |
| `idle_none_title` | No idle screen yet | Ancora nessuno schermo a riposo | Noch kein Ruhebildschirm |
| `idle_none_text` | The terminal will show this screen. To show your own image or video, upload one in halba under Terminals > Idle screen. | Il terminale mostrerà questo schermo. Per mostrare una tua immagine o un video, caricali in halba in Terminali > Schermo a riposo. | Das Terminal zeigt diesen Bildschirm. Um ein eigenes Bild oder Video zu zeigen, laden Sie es in halba unter Terminals > Ruhebildschirm hoch. |
| `test_title` | Test payment | Pagamento di prova | Testzahlung |
| `test_text` | Test mode is on. Try a payment of {amt} with a test card. | La modalità test è attiva. Prova un pagamento di {amt} con una carta di prova. | Der Testmodus ist aktiv. Probieren Sie eine Zahlung über {amt} mit einer Testkarte. |
| `test_start` | Start test payment | Avvia pagamento di prova | Testzahlung starten |
| `skip` | Skip | Salta | Überspringen |
| `test_ok` | Test payment approved | Pagamento di prova approvato | Testzahlung genehmigt |
| `done_title` | All set | Tutto pronto | Alles bereit |
| `done_store` | Store | Negozio | Geschäft |
| `done_name` | Name | Nome | Name |
| `done_psp` | PSP | PSP | PSP |
| `start` | Start | Avvia | Starten |

**Idle**

| Key | English | Italiano | Deutsch |
|---|---|---|---|
| `ind_online` | Online | Online | Online |
| `ind_offline` | Offline | Offline | Offline |
| `ind_power` | Connect the terminal to power | Collega il terminale all’alimentazione | Terminal an die Stromversorgung anschließen |

**Payment**

| Key | English | Italiano | Deutsch |
|---|---|---|---|
| `ref` | Order {r} | Ordine {r} | Bestellung {r} |
| `m_card` | Card | Carta | Karte |
| `m_card_sub` | Tap, insert or swipe | Avvicina, inserisci o striscia | Auflegen, einstecken oder durchziehen |
| `or_qr` | Or pay with a QR code | Oppure paga con un codice QR | Oder mit QR-Code bezahlen |
| `cancel` | Cancel | Annulla | Abbrechen |

**Card**

| Key | English | Italiano | Deutsch |
|---|---|---|---|
| `card_tap` | Tap, insert or swipe the card | Avvicina, inserisci o striscia la carta | Karte auflegen, einstecken oder durchziehen |
| `card_amount_lbl` | Amount to pay | Importo da pagare | Zu zahlender Betrag |
| `card_open` | Opening the card reader… | Apertura del lettore di carte… | Kartenleser wird geöffnet… |
| `card_extern` | Card reader screen | Schermata del lettore di carte | Bildschirm des Kartenlesers |
| `card_extern_sub` | Shown by the PSP app, not by halba | Mostrata dall’app del PSP, non da halba | Wird von der PSP-App angezeigt, nicht von halba |
| `card_back` | Back from the reader | Ritorno dal lettore | Zurück vom Kartenleser |
| `processing` | Processing… | Elaborazione in corso… | Zahlung wird verarbeitet… |
| `processing_sub` | Keep the card in place. | Tieni la carta dov’è. | Karte nicht entfernen. |

**QR**

| Key | English | Italiano | Deutsch |
|---|---|---|---|
| `qr_scan` | Scan with {m} | Inquadra con {m} | Mit {m} scannen |
| `qr_left` | Time left | Tempo rimasto | Verbleibende Zeit |
| `qr_soon` | Expires soon | Sta per scadere | Läuft bald ab |
| `qr_wait` | Waiting for payment… | In attesa del pagamento… | Warten auf die Zahlung… |
| `qr_confirm` | Confirm in the {m} app | Conferma nell’app {m} | In der {m}-App bestätigen |
| `qr_expired` | QR code expired | Codice QR scaduto | QR-Code abgelaufen |
| `qr_new` | New QR code | Nuovo codice QR | Neuer QR-Code |
| `qr_alt` | QR code to pay with {m}. Time left {t}. | Codice QR per pagare con {m}. Tempo rimasto {t}. | QR-Code zum Bezahlen mit {m}. Verbleibende Zeit {t}. |

**Result**

| Key | English | Italiano | Deutsch |
|---|---|---|---|
| `ok_title` | Payment approved | Pagamento approvato | Zahlung genehmigt |
| `ok_contactless` | Contactless | Contactless | Kontaktlos |
| `ok_chip` | Chip | Chip | Chip |
| `ok_qr` | QR code | Codice QR | QR-Code |
| `ok_back_in` | Back to the start in {s} s | Si torna all’inizio tra {s} s | Zurück zum Start in {s} s |
| `fail_declined` | Card declined | Carta rifiutata | Karte abgelehnt |
| `fail_declined_do` | Try another card or ask the cashier for another way to pay. | Prova un’altra carta o chiedi alla cassa un altro modo di pagare. | Versuchen Sie eine andere Karte oder fragen Sie an der Kasse nach einer anderen Zahlungsart. |
| `fail_canceled` | Payment canceled | Pagamento annullato | Zahlung abgebrochen |
| `fail_canceled_do` | Nothing was charged. | Non è stato addebitato nulla. | Es wurde nichts abgebucht. |
| `fail_timeout` | Payment timed out | Tempo scaduto per il pagamento | Zeit für die Zahlung abgelaufen |
| `fail_timeout_do` | Nothing was charged. Ask the cashier to start again. | Non è stato addebitato nulla. Chiedi alla cassa di ricominciare. | Es wurde nichts abgebucht. Bitten Sie die Kasse, neu zu starten. |
| `fail_read` | Card could not be read | Carta non leggibile | Karte nicht lesbar |
| `fail_read_do` | Try again or use another card. | Riprova o usa un’altra carta. | Versuchen Sie es erneut oder nutzen Sie eine andere Karte. |
| `canceled_till` | Canceled by the cashier | Annullato dalla cassa | Von der Kasse abgebrochen |
| `canceled_till_do` | Nothing was charged. | Non è stato addebitato nulla. | Es wurde nichts abgebucht. |

**Staff**

| Key | English | Italiano | Deutsch |
|---|---|---|---|
| `pin_title` | Staff PIN | PIN del personale | Personal-PIN |
| `pin_enter` | Enter the 6-digit PIN | Inserisci il PIN di 6 cifre | Geben Sie die 6-stellige PIN ein |
| `pin_wrong` | Wrong PIN. {n} attempts left. | PIN errato. Restano {n} tentativi. | Falsche PIN. Noch {n} Versuche. |
| `pin_locked` | Too many attempts | Troppi tentativi | Zu viele Versuche |
| `pin_locked_text` | Try again in {t}. | Riprova tra {t}. | Versuchen Sie es in {t} erneut. |
| `pin_digits` | {n} of 6 digits entered | {n} cifre su 6 inserite | {n} von 6 Ziffern eingegeben |
| `pin_delete` | Delete | Cancella | Löschen |
| `menu_title` | Staff menu | Menu del personale | Personalmenü |
| `menu_close` | Close menu | Chiudi il menu | Menü schließen |
| `i_store` | Store | Negozio | Geschäft |
| `i_name` | Name | Nome | Name |
| `i_id` | Terminal ID | ID terminale | Terminal-ID |
| `i_psp` | PSP | PSP | PSP |
| `i_app` | App version | Versione dell’app | App-Version |
| `i_status` | Status | Stato | Status |
| `i_contact` | Last contact | Ultimo contatto | Letzter Kontakt |
| `i_contact_v` | 12 s ago | 12 s fa | vor 12 s |
| `menu_setup` | Set up again | Rifai la configurazione | Neu einrichten |
| `menu_refresh` | Refresh idle screen | Aggiorna lo schermo a riposo | Ruhebildschirm aktualisieren |
| `menu_unpair` | Unpair terminal | Scollega il terminale | Terminal trennen |
| `menu_exit` | Exit app | Esci dall’app | App beenden |
| `c_unpair_t` | Unpair this terminal? | Scollegare questo terminale? | Dieses Terminal trennen? |
| `c_unpair_x` | It will stop receiving payments and will need a new pairing code. | Non riceverà più pagamenti e servirà un nuovo codice di abbinamento. | Es empfängt keine Zahlungen mehr und braucht einen neuen Kopplungscode. |
| `c_unpair_ok` | Unpair | Scollega | Trennen |
| `c_exit_t` | Exit the app? | Uscire dall’app? | App beenden? |
| `c_exit_x` | The till will not reach this terminal until the app is opened again. | La cassa non raggiungerà questo terminale finché l’app non sarà riaperta. | Die Kasse erreicht dieses Terminal erst wieder, wenn die App erneut geöffnet wird. |
| `c_exit_ok` | Exit app | Esci dall’app | App beenden |
| `c_setup_t` | Set up this terminal again? | Rifare la configurazione? | Terminal neu einrichten? |
| `c_setup_x` | You will choose the store and the name again. The pairing stays. | Sceglierai di nuovo negozio e nome. L’abbinamento resta. | Sie wählen Geschäft und Name erneut. Die Kopplung bleibt bestehen. |
| `c_setup_ok` | Set up again | Rifai | Neu einrichten |

**System**

| Key | English | Italiano | Deutsch |
|---|---|---|---|
| `off_title` | This terminal was turned off | Questo terminale è stato disattivato | Dieses Terminal wurde deaktiviert |
| `off_text` | It was turned off in halba. Pair it again to use it. | È stato disattivato in halba. Abbinalo di nuovo per usarlo. | Es wurde in halba deaktiviert. Koppeln Sie es erneut, um es zu nutzen. |
| `off_btn` | Pair again | Abbina di nuovo | Erneut koppeln |
| `nonet_title` | No connection | Nessuna connessione | Keine Verbindung |
| `nonet_text` | The till cannot send payments to this terminal right now. | La cassa non può inviare pagamenti a questo terminale in questo momento. | Die Kasse kann derzeit keine Zahlungen an dieses Terminal senden. |
| `nonet_try` | Trying again… | Nuovo tentativo in corso… | Neuer Versuch läuft… |
| `boot` | Starting halba | Avvio di halba | halba wird gestartet |



### 8.3 QR instruction in the method's language

Shown under the instruction in the screen language, when the method has one. To be checked by a native speaker before release.

| Method | Line |
|---|---|
| Alipay | 请使用支付宝扫码 |
| WeChat Pay | 请使用微信扫码 |
| Bizum | Escanea con Bizum |
| BLIK | Zeskanuj w aplikacji banku |
| TWINT | Same as the language of the screen (no local line) |

## 9. Motion

| Where | Motion | Duration | Reduced motion |
|---|---|---|---|
| Idle to payment | Sheet rises, idle dims | 240 ms | Instant change |
| Screen to screen | Cross-fade | 240 ms | Instant |
| Loader (halba orbit) | Dot orbits the ring | 1.4 s loop | Static mark, the word stays |
| Result bar | Drains | 4 s linear | The bar is kept (it is information, not decoration); no easing |
| QR bar | Drains | 15 min | Updates once a second |
| Long press ring | Fills | 3 s | Same (it is feedback) |
| Wrong PIN | Shake | 240 ms | Dots stay red, no shake |
| Default idle | Position shift | 60 s | Same, it is not visible motion |

"Reduced motion" is `Settings.Global.ANIMATOR_DURATION_SCALE == 0` or the PSP's equivalent. Read it at each screen change.

## 10. Accessibility

- Every control has `contentDescription` or visible text; decorative icons are `invisibleToUser`.
- **Announcements** (`liveRegion = Assertive`): "Payment approved, 49.90 euros, Visa ending 4242", "Payment declined. Try another card.", "Payment canceled by the cashier". Others are polite: "Waiting for pairing", "Reader ready", "Time left 1 minute".
- Amounts are spoken in the language of the screen, with the currency name, not the symbol.
- The pairing code is read character by character ("A, 7, K, 2...") with a pause between the two groups.
- The QR has the description "QR code to pay with {method}. Time left {t}." and no other semantics.
- The PIN pad keys are announced by digit; the dots are one element ("n of 6 digits entered"); the long press that opens the PIN screen is announced to TalkBack users only through the indicator's action "Open staff menu" (custom accessibility action), so staff who use TalkBack can still reach it.
- Focus order follows reading order: headline, amount, main content, then the actions.
- Never rely on colour: status always has a word and an icon.
- Contrast: text on surfaces 7:1 or more; non-text parts (borders, icons, dots) 3:1 or more.

## 11. Other screen sizes

Design is made in dp for **360 × 640** (9:16) and uses the system density, so the S700 renders it at its real size.

- **Width and height**: use `fillMaxSize`, no fixed positions. Margins stay 24 dp; blocks flow top to bottom; the main action sticks to the bottom.
- **Taller** (up to 9:19.5): extra height goes to the space around the central block; never enlarge text.
- **Shorter** (down to 360 × 560 dp): the card illustration (128 dp) and the pairing instruction shrink first; the QR keeps its 288 dp if the height allows, otherwise it scales down to a minimum of 240 dp, never below.
- **Wider** (up to 480 dp): content keeps a maximum width of 400 dp, centred; the idle media fills the screen.
- **Larger screens** (myPOS, Adyen models): scale only the amount (up to 64 sp), the code (up to 88 sp) and the QR (up to 360 dp); keep all other sizes. Do not use landscape: the app is locked to portrait; if a model is landscape only, a separate layout must be designed first.
- **Density**: all sizes in dp and sp, never px.
- **Idle media** is scaled with `cover`; the safe area in dp is computed from the screen, in the same proportions (sides 6.7 %, top and bottom 11.25 %).

## 12. Open points

1. S700 real resolution and density (assumed 1080 × 1920 px, 3.0).
2. Merchant colour on or off by default.
3. Timings of section 4 (pairing 10 min, card wait 60 s, reader 15 s, PIN 30 s, menu 120 s, retries).
4. Official payment marks (the previews use labelled placeholders, see checkout).
5. Local-language QR lines checked by native speakers.
6. How each PSP exposes kiosk exit, brightness and animation settings (myPOS, Adyen).
