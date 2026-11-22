# Checkout

The Halba payment page in four containers (hosted, modal, embedded, component) with one look. It is built for implementers who do not use React: a plain stylesheet, CSS variables and a markup contract.

## Files

| File | Purpose |
| --- | --- |
| `checkout/halba-checkout.css` | The whole checkout stylesheet. No scripts, no external requests. |
| `checkout/halba-checkout-fonts.css` | Optional. `@font-face` for Inter (OFL), served from the package. |
| `checkout/fonts/*.woff2` | Inter latin and latin-ext. |
| `checkout/halba-icons.svg` | Inline SVG sprite. Paste it once in the page body. |
| `checkout/brands/*` | Card scheme artwork and `brands.json`. |
| `checkout/methods/*` | Alternative method marks and `methods.json` (tile colour, sizes). |
| `checkout-criteria.md` | Regulatory and accessibility criteria of the page. |

In the package: `@halba/design-system/checkout.css`, `/checkout-fonts.css`, `/checkout-icons.svg`.

## Setting it up

```html
<link rel="stylesheet" href="halba-checkout.css">
<!-- paste halba-icons.svg once, right after <body> -->
<div class="halba-checkout halba-checkout--hosted" data-halba-theme="light">
  <div class="halba-card"> … </div>
</div>
```

Pick the container with one class on the root: `halba-checkout--hosted | --modal | --embedded | --component`. The 3-D Secure window uses `halba-checkout--challenge`. The layout reacts to the width of the root (container queries), not to the screen, so the same markup works in a 375px phone, a 400px column or a full page. Under 520px, hosted becomes full-bleed and the modal becomes a bottom sheet.

Never use `style=""` attributes (strict CSP). Set variables with `el.style.setProperty('--halba-primary', value)` or in a `<style nonce>`.

## Token map: theme to CSS variables

Set these on the root `.halba-checkout` (or on any ancestor). Every one has a fallback.

| Merchant setting | Variable | Fallback | Notes |
| --- | --- | --- | --- |
| Primary colour | `--halba-primary` | `#5b47e0` | Button fill, selected method. Any hex. |
| Text on primary | `--halba-on-primary` | `#ffffff` | Compute it, see below. |
| Accent | `--halba-accent` | primary | Focus ring, radio, selected edge, button border. Compute it. |
| Radius | `--halba-radius` | `12px` | Always with a unit, `0px` included. Card, fields, button, methods. |
| Font | `--halba-font` | system stack | Component container inherits the site font when unset. |
| Background | `--halba-bg` | `#f9f9f7` | Hosted only. |
| Surface, text, muted | `--halba-surface`, `--halba-text`, `--halba-muted` | preset | Normally left to the preset. |
| Borders | `--halba-border`, `--halba-border-strong` | preset | Strong edge is 3:1 on the surface (fields, radio). |
| Danger, success | `--halba-danger`, `--halba-danger-bg`, `--halba-success`, `--halba-success-bg` | preset | |
| Overlay | `--halba-scrim`, `--halba-shadow` | preset | |

`data-halba-theme="light" | "dark" | "auto"` switches the preset. `auto` follows `prefers-color-scheme`.

Font stacks: system `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`; Inter `"Inter", system-ui, …` (load `halba-checkout-fonts.css`); serif `Georgia, "Iowan Old Style", "Times New Roman", serif`.

## Colour derivation (do this in JavaScript)

A merchant can pick any colour, so two values must be computed from it, with WCAG relative luminance.

1. `--halba-on-primary`: pure `#ffffff` or pure `#000000`, whichever contrasts more with the primary. Never an off-black: it can fail AA.
2. `--halba-accent`: start from the primary. While contrast against the surface is below 3:1, mix it 4% more toward the text colour (black on light, white on dark). Stop at 3:1.

```js
const lin = c => (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const lum = h => { const [r, g, b] = [1, 3, 5].map(i => lin(parseInt(h.slice(i, i + 2), 16))); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const mix = (a, b, t) => '#' + [1, 3, 5].map(i => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - t) + parseInt(b.slice(i, i + 2), 16) * t).toString(16).padStart(2, '0')).join('');
function derive(primary, surface = '#ffffff', dark = false) {
  const on = cr(primary, '#ffffff') >= cr(primary, '#000000') ? '#ffffff' : '#000000';
  let accent = primary;
  for (let t = 0; cr(accent, surface) < 3 && t < 1; ) accent = mix(primary, dark ? '#ffffff' : '#000000', (t += 0.04));
  return { on, accent };
}
```

Expand 3-digit hex to 6 digits before calling it. Results:

| Colour | Primary | Text on primary | Accent on white | Accent on dark surface |
| --- | --- | --- | --- | --- |
| Halba violet | `#5b47e0` | `#ffffff` 6.1:1 | `#5b47e0` 6.1:1 | `#624ee1` 3.1:1 |
| Navy | `#1a2b4c` | `#ffffff` 14.1:1 | `#1a2b4c` 14.1:1 | `#5a667e` 3.1:1 |
| Yellow | `#ffd400` | `#000000` 14.7:1 | `#ad9000` 3.1:1 | `#ffd400` 12.3:1 |
| Red | `#d92d20` | `#ffffff` 4.8:1 | `#d92d20` 4.8:1 | `#d92d20` 3.7:1 |
| Mint | `#7be0b5` | `#000000` 13.2:1 | `#59a182` 3.1:1 | `#7be0b5` 11.1:1 |
| Mid grey | `#777777` | `#000000` 4.7:1 | `#777777` 4.5:1 | `#777777` 3.9:1 |
| White | `#ffffff` | `#000000` 21.0:1 | `#8f8f8f` 3.2:1 | `#ffffff` 17.6:1 |
| Black | `#000000` | `#ffffff` 21.0:1 | `#000000` 21.0:1 | `#666666` 3.1:1 |
| Orange | `#ff7a00` | `#000000` 8.0:1 | `#eb7000` 3.1:1 | `#ff7a00` 6.8:1 |
| Teal | `#0f9d9a` | `#000000` 6.3:1 | `#0f9d9a` 3.3:1 | `#0f9d9a` 5.3:1 |

Checked on 20,000 random hex colours: lowest text-on-primary contrast 4.58:1, lowest accent-on-white contrast 3.00:1.

## Markup contract

- Root `.halba-checkout`, then `.halba-card`. Inside: `.halba-header` (optional `.halba-logo`, `.halba-shop`), `.halba-amount`, `details.halba-summary`, `form.halba-form`, `.halba-footer`.
- Methods are a `fieldset.halba-methods` with a `legend` and one radio per method: `.halba-method` containing `input.halba-method__input`, `label.halba-method__label` and `.halba-method__panel`. The panel opens in place with CSS only (`:checked`), so there is no script to write for the accordion.
- Extra fields (`.halba-field`, `.halba-label`, `.halba-input`, `.halba-select`) go inside the panel. A method with no extra data has only a short `.halba-note`.
- The card panel has `.halba-control` boxes where the Stripe Elements iframes mount (number, expiry, CVC). Add `is-focused` / `is-loading` from Stripe events, and `.halba-field--error` plus the message in `.halba-error[role="alert"]`.
- Pay button: `button.halba-pay`. Disabled is `aria-disabled="true"` (not the `disabled` attribute, so it stays focusable). Loading adds `aria-busy="true"` and the Halba mark loader (`svg.halba-loader`, markup in the previews) before the label; in the 3-D Secure window use `halba-loader--compose`.
- Message under the button: keep an empty `div[role="alert"]` in the page from the start, then fill it, so screen readers announce it. Use `.halba-alert` inside.
- Icons: `<svg class="halba-icon" aria-hidden="true"><use href="#halba-i-lock"/></svg>`. Symbols: lock, check, x, alert, clock, search, cloud-off, arrow-left, chevron-down, info, card, bank, wallet, smartphone, globe.

## Methods and ordering

Halba sends the methods already ordered; render them in that order. With 5 or fewer, show all. With more, show the first four and put the rest in `details.halba-more` ("More payment methods (n)"). If the selected method is in the hidden part, open it. After a decline, re-render with the new order, add `.halba-pill--suggested` to the proposed method and `.halba-pill--danger` ("Declined") to the one that failed, and nothing is preselected. The button stays disabled until a method is chosen and its fields are valid.

Card: when the card form opens, show `.halba-brands` with the card schemes enabled for the online channel by the connected PSPs, from the workspace data. See Card schemes below and `checkout-criteria.md`.

## States

Initial (nothing selected, button disabled, hint), redirect method (note only, button active), card (form open), loading, validation error, declined with suggestion, 3-D Secure window (500×640 over the page, full screen under 520px), success with a 5 s countdown, and the pages: link expired, payment not found, payments unavailable. Previews show each one, in English, Italian and German.

## Method marks and the wallet buttons

Payment schemes set their own brand rules. Checked in November 2026 against the official pages; re-read the current rule before release, and use the artwork the scheme provides.

**Rule: our Pay button for every method in the list.** Many methods are enabled through another PSP and end in a redirect, so the row needs only the scheme's official mark. **The only exception is Apple Pay and Google Pay**: their official buttons are shown at the top, above the methods, never as rows.

### Apple Pay and Google Pay (express buttons)

- Markup: `div.halba-express` (role group) with one `div.halba-express__btn` per wallet, then `p.halba-express__or` ("Or pay another way"), then the methods. Each provider SDK mounts its own button into its slot.
- One button loaded: full width, same width as the card. Both loaded: the row splits 50/50, side by side and aligned with the card below. The layout comes from the CSS alone: a slot that is empty (SDK not loaded, wallet unsupported on this device or disabled by the workspace) is hidden, and the row and the "Or pay another way" divider adapt, or disappear if no slot is filled. Do not remove empty slots from the DOM and do not set widths.
- Under 280px of container width the buttons stack.
- Order: Apple Pay first, then Google Pay. Equal size; neither smaller than the other buttons on the page.
- Use the official buttons from the provider API only; never copy them. Do not change font, colour, radius or padding. Apple's and Google's SDKs take a corner radius: pass the merchant radius. Height 48px. Choose the SDK style (dark or light; Apple also white with outline) from the card surface, not from the page background: dark button on light surfaces, light or white on dark.
- Apple: minimum 100×30pt, margins at least one tenth of the height. Google: at least 8dp clear space. Show each only where the device supports it. Apple needs domain validation and a session started by the click, provided by the PSP.
- Because the button is the Pay action for the wallet, an error from the wallet shows in the usual alert under our Pay button.

### Other methods

| Method | Row in the list | Button |
| --- | --- | --- |
| PayPal | Official PayPal mark. | Our Pay button (redirect). The PayPal SDK button is not used. |
| Klarna | Official badge or mark. | Our Pay button (redirect through the PSP). Not checked: whether Klarna requires its button in PSP redirect flows. |
| iDEAL \| Wero | Co-logo on its tile (yellow lockup on a yellow tile, see below). Name "iDEAL \| Wero" (mandatory since 31 March 2026). | Our Pay button. |
| Bancontact, BLIK, MB WAY, Przelewy24 and others | Official mark from the scheme's brand manual. | Our Pay button. |

### Marks in the rows

Alternative methods use a tile: `<span class="halba-method__logo halba-method__logo--tile halba-method__logo--tile-light|dark|pink|yellow"><img class="halba-tile__img" src="…" alt=""></span>`. The tile is 80 × 40, same for every method, with a 1px border; the mark is scaled to fit 64 × 24 inside it. The tile colour belongs to the method and is the same in light and dark themes (white, black or the method's own colour such as Klarna pink; never themed), so a colour logo with a black wordmark and a white-on-black logo sit next to each other without a theme swap. The image has `alt=""` because the method name is the label of the row. Files, tile colour and sizes are in `checkout/methods/methods.json`.

| Method | File | Tile | Note |
| --- | --- | --- | --- |
| Alipay | `alipay.png` | white | Colour lockup. Raster, ask for the vector. |
| WeChat Pay | `wechat.png` | white | The file received is the WeChat lockup, not the WeChat Pay mark. Replace it. Raster. |
| BLIK | `blik.png` | white | Official badge (black gradient, red dot, soft shadow). Raster. |
| Bizum | `bizum.png` | white | Teal lockup. The white version is not used. Raster. |
| iDEAL \| Wero | `ideal-wero.svg` | yellow `#FFF48D` | Official co-logo, yellow horizontal lockup, vector. The square lockup is not used. |
| MB WAY | `mbway.svg` | white | Positive horizontal lockup. Vector. |
| Klarna | `klarna.png` | pink `#FFA8CD` | Black wordmark on Klarna Pink, as in Klarna's own badge. Raster. Still not checked: whether Klarna requires its button in PSP redirect flows. |
| PayPal | `paypal.png` | white | Colour horizontal lockup. Raster. The PayPal button of the SDK is still not used (our Pay button). |
| TWINT | `twint.png` | black | White-on-black version. Raster. Ask for the colour version too. |

Pending: Bancontact, Przelewy24 (they show a dashed placeholder until the file arrives). Apple Pay and Google Pay stay as the SDK buttons.

Rules for new marks: crop to the artwork, no background baked in (transparent PNG or SVG), pick the tile that gives the best contrast (white unless the official artwork is white), never recolour or add effects, check the scheme's brand rules and note any departure here. Card scheme marks (Visa, Mastercard…) are a different thing: see Card schemes.

The previous method for older marks (two images swapped by theme, `halba-mark--on-light` and `--on-dark`, 24px high) remains in the CSS for methods whose artwork has an official negative.

## Stripe Elements

Stripe's iframe lets us set only fonts, size, text colour, placeholder colour and the error colour. Everything else (border, background, padding, radius, label, error text) is `.halba-control` and `.halba-field`. Use literal values, because the iframe cannot read our variables:

```js
const cs = getComputedStyle(root);
elements = stripe.elements({
  fonts: [{ family: 'Inter', src: 'url(https://…/Inter-latin.woff2)', weight: '400 700' }], // only if the merchant font is Inter
  appearance: { variables: {
    fontFamily: cs.getPropertyValue('--hc-font').trim(),
    fontSizeBase: '16px',                       // 16px avoids zoom on iOS
    colorText: cs.getPropertyValue('--hc-text').trim(),
    colorTextPlaceholder: cs.getPropertyValue('--hc-muted').trim(),
    colorDanger: cs.getPropertyValue('--hc-danger').trim()
  } }
});
```

## Card schemes

Official artwork lives in `checkout/brands/`, described by `brands.json` (id, name, files, size, order). Every scheme sits in the same framed chip (40 × 26, 1px border, 4px padding), so marks of different shapes (Amex is square, Visa is a strip) read at the same size. One row, aligned left, directly above the card number box, never wider than the box (it wraps if the container is narrow). The label "We accept" stays in the markup for assistive technology and is hidden visually.

Artwork widths inside the chip (px): Amex 18, Cartes Bancaires 26, Diners Club 20, Discover 28, JCB 24, Maestro 26, Mastercard 26, UnionPay 29, Visa 30.

**Departure from brand rules, decided by Halba:** the Cartes Bancaires charte asks for at least 52.2 × 37.8 px (and a clear space of a quarter of its height) when its logo sits with other marks, and for alphabetical order. Halba scales it like the other schemes (26 px wide) and uses its own fixed order (see Rules below). Keep this decision in mind if CB or an acquirer audits the page.

When the payer starts typing, the same logo of the recognised scheme appears inside the card number box (`.halba-control__trail`, no ring). This is done in code: on the first digits, detect the scheme (BIN ranges, or the PSP's brand event), mark the matching list item with `halba-brand--active` and `aria-current="true"`, and mount the same markup in the trail. Remove it when the number is cleared or not recognised. In the field there is no frame (the field is the frame) and the logos are a little larger (Visa 38, Mastercard 34, Maestro 34, Amex 26, Cartes Bancaires 32, Discover 34, Diners Club 26, JCB 32, UnionPay 36).

| Scheme | Light file | Negative file | On a dark page |
| --- | --- | --- | --- |
| American Express | `amex.svg` (blue square, white backing) | none | Same file. The backing keeps the letters white. |
| Cartes Bancaires | `cartes-bancaires.png` (raster, ask for the vector) | none | Same file. The charte allows only the full colour logo, letters and ring in pure white. |
| Diners Club | `diners.svg` (disc symbol, vector converted from the colour EPS; wordmark removed because it would be unreadable at this size) | none | Same file. Black EPS received, not used. Brand rules not checked yet. |
| Discover | `discover.png` (transparent, raster) | none | Same file. Ask for the vector. |
| JCB | `jcb.png` (transparent corners, raster) | none | Same file. Ask for the vector. |
| Maestro | `maestro.svg` (the two circles only, from the horizontal positive lockup; the wordmark would be unreadable at this size) | none | Same file. Symbol-only use not checked against the brand rules yet. The vertical lockup and the horizontal one were received. |
| Mastercard | `mastercard.svg` (symbol) | none | Same symbol. Never recoloured, never grayscale. |
| UnionPay | `unionpay.svg` (vector from the official logo pack, white lettering on the three cards) | none | Same file. Brand rules not checked yet. |
| Visa | `visa.svg` (Visa Blue #1434CB) | `visa-negative.svg` (white) | Use the negative. Visa allows only blue or white. |

Negatives are used only when the scheme publishes one: today that is Visa, on a dark theme (`data-halba-theme="dark"`, or `auto` with a dark system). The CSS swaps `--on-light` and `--on-dark` images; the hidden one is not exposed to assistive technology. Do not make a negative for a scheme that has none.

Rules:

- Show only the schemes enabled for the online channel by the connected PSPs, each once, in the fixed order Visa, Mastercard, Maestro, Cartes Bancaires, American Express, Discover, Diners Club, JCB, UnionPay (`brands.json`, `order`; Maestro follows Mastercard and Diners Club follows Discover). A scheme that is not enabled is skipped and the next one in the order takes its place, so the row never has gaps. The "Card" row of the method list shows no logos and no text hint: the name is self-explanatory, and the schemes appear once, in this list, when the row is open.
- Markup: `div.halba-brands[role=group][aria-labelledby]` with a visible label and a `ul.halba-brands__list`. Each `li.halba-brand.halba-brand--{id}` holds the image with `alt` = scheme name. The negative image has `alt=""`.
- Detected scheme: add `halba-brand--active` (accent border on the chip in the list) and `aria-current="true"`.
- Co-badged card: the payer chooses the network, see "Co-badged cards: choice of network" below.
- Spacing: 4px between chips, nothing else inside a chip. Do not crop, stretch, add shadows or effects, or put a scheme inside a container of another colour.
- A scheme without artwork in the system is shown as text (`halba-brand--text`) until the file is added.

Pending artwork: Bancontact, PagoBANCOMAT.

## Co-badged cards: choice of network

Many European cards carry two networks (Cartes Bancaires + Visa, or Cartes Bancaires + Mastercard). Regulation (EU) 2015/751, Art. 8, requires that the payer can choose. The merchant may preselect one network, but the payer must be able to change it easily before paying. Preview: `CheckoutNetworkChoice`.

### When it appears

- Only for a co-badged card. For any other card there is no control and nothing changes: the card number field shows the logo of the detected scheme, as today.
- The network is known only after the full number is typed. Halba asks the PSP for the card's networks (about 1 second) and then sets `data-open="true"` on the wrapper. The control sits under the number field, inside the card panel, and never anywhere else.
- Apple Pay, Google Pay and the rest of the card panel are not touched by it.

### Content and preselection

- Group label (legend): "Pay with". Two options side by side, same size, same border, same type, each with the official network logo (`brands/`, same chip and same usage rules as the scheme list) and the name: "Cartes Bancaires", "Visa".
- Preselect Cartes Bancaires (usually the cheaper network for the merchant). The line under the options says it can be changed: "You can change this before you pay."
- Nothing makes one option more important than the other: no "recommended" label, no different colour, no different order logic. The only difference is the selected state: accent border plus a 1px ring and the filled radio. The preselected option looks exactly like a chosen one.
- The logo in the card number field follows the chosen network. Changing the choice changes the logo.

### States

| State | What the page does |
| --- | --- |
| Not co-badged | No control. Logo of the scheme in the number field. |
| Checking | After the last digit, the wrapper stays in the DOM and shows `.halba-network__skel` with `aria-busy="true"`. It has the same height as the control, so nothing moves when the result arrives. The number field shows the generic card icon. |
| Co-badged, preselected | `data-open="true"`, the fieldset with Cartes Bancaires selected, the CB logo in the number field. A visually hidden `p.halba-sr[role=status]` announces: "Your card has two networks: Cartes Bancaires and Visa. Cartes Bancaires is selected." |
| Changed | The new radio is checked, the field logo changes, the status line announces "Visa selected." Focus stays on the radio. |
| Check failed | No control. A `p.halba-note[role=status]` says "We couldn't check your card's networks, so you'll pay with Visa." The page pays with the main network. The payer is never blocked. |

If the number is edited after the check, go back to the checking state, then to the new result.

### Taking the payer to the bank

- If the chosen network is Cartes Bancaires, the PSP takes the payer to the bank after "Pay" (full-page redirect, not the halba 3-D Secure window). Show `p.halba-redirect-note` under the Pay button: "You'll confirm with your bank."
- After "Pay", the button becomes the redirect state: loader and "Taking you to your bank…", `aria-busy="true"`, `aria-disabled="true"`.
- If the chosen network is Visa (or any other where the 3-D Secure window opens as usual), no note and the normal button.
- The note appears and disappears with the choice. It is a status, not an alert.

### Markup

```html
<div class="halba-network" data-open="true">
  <p class="halba-sr" role="status">Your card has two networks: Cartes Bancaires and Visa. Cartes Bancaires is selected.</p>
  <div class="halba-network__inner">
    <fieldset class="halba-cobrand" aria-describedby="net-hint">
      <legend class="halba-cobrand__legend">Pay with</legend>
      <div class="halba-cobrand__opts">
        <label class="halba-cobrand__opt">
          <input type="radio" name="network" value="cartes-bancaires" checked>
          <span class="halba-brand halba-brand--cartes-bancaires">…</span>
          <span class="halba-cobrand__name">Cartes Bancaires</span>
        </label>
        <label class="halba-cobrand__opt">…Visa…</label>
      </div>
      <p class="halba-cobrand__hint" id="net-hint">You can change this before you pay.</p>
    </fieldset>
  </div>
</div>
```

The wrapper stays in the DOM from the start, closed (`data-open="false"` or absent): it takes no space, its content is `visibility: hidden`. Halba code sets `data-open` and swaps the body (skeleton, control or note). The markup is the contract, the logic and the PSP call are in the page code.

### Layout and themes

- Two columns when the card is wider than 340px. At 340px or less (375px phones, narrow components) the options stack in one column, logo and name on one line. The reserved height changes with it, so nothing jumps.
- Light, dark and `auto`, merchant radius (`--halba-radius`) and merchant colour (`--halba-primary`, through the accent). On dark the Visa chip uses the white negative, like everywhere.
- Same in hosted, modal, embedded and component pages. The control only depends on the width of the card (`@container halba`).
- Motion: the wrapper opens in 0.22s; with `prefers-reduced-motion` it opens at once. Forced colours: borders are `CanvasText`, the selected one is thicker.

### Accessibility

- A real `fieldset` with a `legend` and native radios: arrows move and select, Tab leaves the group, Space selects.
- The appearance of the control is announced by the status line, focus does not move.
- Targets: each option is at least 76px high (56px stacked) and the whole card is the label, so well over 44px.
- Contrast: text 4.5:1, border and selected ring 3:1 on the surface, light and dark. The state is never only colour: the radio is filled and the border is thicker.

## Accessibility and CSP

The full list of regulatory and accessibility criteria is in `checkout-criteria.md`.

- Methods are a radio group with a legend and labels; the whole row is the target (at least 44px high, 48px on touch).
- Focus is a 3px ring in `--halba-accent`. Errors use text and an icon, never colour alone.
- Reduced motion turns off the accordion, spinner and countdown animations. Forced colours keep borders and focus visible.
- No scripts, no data URIs, no external fonts, no inline `style=""`. Only Stripe's own sources are needed.
- Long text: names wrap or clamp (shop name at two lines), buttons and pills grow, rows stack in narrow containers. Checked with Italian and German copy.
