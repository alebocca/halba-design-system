# Checkout

The Halba payment page in four containers (hosted, modal, embedded, component) with one look. It is built for implementers who do not use React: a plain stylesheet, CSS variables and a markup contract.

## Files

| File | Purpose |
| --- | --- |
| `checkout/halba-checkout.css` | The whole checkout stylesheet. No scripts, no external requests. |
| `checkout/halba-checkout-fonts.css` | Optional. `@font-face` for Inter (OFL), served from the package. |
| `checkout/fonts/*.woff2` | Inter latin and latin-ext. |
| `checkout/halba-icons.svg` | Inline SVG sprite. Paste it once in the page body. |

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

Card: when the card form opens, show `.halba-brands` with the card schemes enabled on the workspace (Visa, Mastercard, Amex, Maestro…), from the workspace data.

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
| iDEAL \| Wero | Co-logo, light file on light surfaces, dark file on dark. Name "iDEAL \| Wero" (mandatory since 31 March 2026). | Our Pay button. |
| Bancontact, BLIK, MB WAY, Przelewy24 and others | Official mark from the scheme's brand manual. | Our Pay button. |

### Marks in the rows

Use `<span class="halba-method__logo halba-method__logo--mark">` with two images, `halba-mark halba-mark--on-light` and `halba-mark halba-mark--on-dark`. The stylesheet shows the right one for `data-halba-theme`. All marks are 24px high; never resize by width, recolour or crop. The files come from the schemes and are served by Halba (no external requests). Method names come from Halba's data with official spellings: Klarna, PayPal, iDEAL | Wero.

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

## Accessibility and CSP

- Methods are a radio group with a legend and labels; the whole row is the target (at least 44px high, 48px on touch).
- Focus is a 3px ring in `--halba-accent`. Errors use text and an icon, never colour alone.
- Reduced motion turns off the accordion, spinner and countdown animations. Forced colours keep borders and focus visible.
- No scripts, no data URIs, no external fonts, no inline `style=""`. Only Stripe's own sources are needed.
- Long text: names wrap or clamp (shop name at two lines), buttons and pills grow, rows stack in narrow containers. Checked with Italian and German copy.
