halba helps teams lift checkout conversion. The look is fresh and colorful but precise: big confident headlines, flat color blocks, real people in the photos, and clear numbers. Friendly in tone, serious about data.

## Content fundamentals

- Write short, confident headlines that promise an outcome: "Checkout, tuned for growth." Sentence case, no exclamation marks, no emoji.
- Address the reader as "you" and the company as "we". Prefer verbs ("Spot friction early") over nouns ("Friction detection").
- Put the number first in proof points: "99.99% uptime", never "uptime of 99.99%".
- Status words are uppercase mono labels: LIVE, RECONCILED, 2 CONFLICTS. Colour never carries status alone.
- Button labels are 1–3 words and start with a verb: "Get in touch", "Explore more".

## Visual foundations

- **Colour.** Page ground is `surface`; cards are `surface-raised`. `brand` (violet) is for actions and the lead data series. Use at most one big colour block per viewport from `brand-tint`, `sky-tint` (light blue), `sun` (light yellow), `sky`, `accent`, or the `ink` block, built with `Panel`. A closing call-to-action on `brand` counts as that block. The `StatTile` row and a story panel are the only exceptions. `sun` and `sky-tint` are the soft, friendly pair for hero panels and feature sections; `accent` is the warm highlight, used sparingly.
- **Text.** Set copy in `ink`; secondary text in `ink-muted`. Text on `brand` is `on-brand`; on `accent` it is `on-accent`; on `sky` it is `on-sky`; on `sun` it is `on-sun`; on `brand-tint` and `sky-tint` it is `ink`.
- **Type.** Below 900px wide use `display-xl-sm`, `display-lg-sm` and `stat-sm`; the `hb-display-xl` and `hb-display-lg` classes and `StatTile` switch on their own. Headlines use `display-xl`, `display-lg`, `h1`–`h3` in Plus Jakarta Sans with the negative tracking built into each style. Body uses `body`, `body-lg`, `body-sm`. Eyebrows, badges and chart legends use `label-mono`, in uppercase.
- **Fonts.** Load both from Google Fonts: Plus Jakarta Sans 400/500/600/700 and DM Mono 400/500.
- **Spacing.** Build layouts from `space-1` to `space-9`. Card padding is `space-5`; gap between cards is `space-5`; gap between site sections is `space-8`.
- **Shape.** Buttons are pills (`radius-pill`); inputs use `radius-md`; cards use `radius-lg`; stat tiles, photo panels and feature blocks use `radius-xl`.
- **Charts.** Charts are flat and light: soft translucent fills with no outlines and no gradients. Series colours are azure (`chart-1`, the lead series and Retry), violet (`chart-2`) and `chart-3` for area fills; one anomaly or threshold per chart uses `chart-4`. For events use the status fills: `chart-success` for OK, `chart-danger` for KO, `chart-warning` for challenge, `chart-neutral` for blocked or other. Yellow appears in data only as that warning status. Lines are the only solid marks: 2px in `chart-1-line` or `chart-2-line`. Gridlines are `border` hairlines, legends are `label-mono` with a round dot, and every value is labelled directly, so colour never carries meaning alone (the soft fills are low contrast on their own).
- **Bars.** `BarChart`: flat bars with 4px rounded corners, a 2px gap between stacked segments, no outline, each bar's value above it, four hairline gridlines and short mono labels.
- **Distributions.** The weight of OK, KO and Retry (or any share of a whole) is a `PieChart`, never stacked or full-width bars: a donut with the total in the middle, a 3px gap between slices, four slices at most, and a legend row per slice with its value and percentage. A bar only shows change over time.
- **Motion.** Motion explains, it does not decorate. Lines draw in over 900ms, cards fade up over 500ms (`ease-out`), and only status graphics loop (dotted network flow, a pulsing live node, one floating card, the `Spinner` made from the logo). These values are CSS variables in `bundle.css` (`--dur-draw`, `--dur-fade`, `--ease-out`), not tokens. Skeleton placeholders are static `surface-sunken` blocks with no shimmer. Everything stops under `prefers-reduced-motion`.
- **Depth.** Flat by default. Dashboard cards and product mockups get `shadow-card`. Floating layers (Modal, Popover, DropdownMenu, Sheet, Toast, Tooltip) get `shadow-overlay` and a `border`. Nothing else has a shadow. No gradients.
- **Borders.** Card outlines use `border`; control edges use `border-strong`.
- **Focus.** Every interactive element shows a solid 3px `focus-ring` outline with a 2px offset.
- **Status colours.** Green (`success`) means OK: approved, reconciled, rescued. Yellow (`warning`) means challenge, medium risk, needs review. Red (`danger`) means KO: declined, failed, fraud, high risk. Every status carries a word and an icon (check, alert, x), so colour never works alone. Use the same state words in the site, app, dashboard and API pages: `StatusBadge` holds the list. Approved, Rescued: success. Challenge, Medium risk: warning. Declined, Failed, Fraud, High risk: danger. Pending: neutral with a clock. Refunded: brand with an undo arrow.
- **Dark theme.** Switch with `data-theme="dark"`; all tokens flip together. Never hard-code hex values.

## Logo and loading

- The logo is an open ring with a dot at its centre. Default colours: ring `ink`, dot `brand`; one colour (`mono`) where the text colour decides, `on-brand` on a violet block. Never orange, never two unrelated colours.
- The name is always `halba`, lowercase, Plus Jakarta Sans 700, set next to the mark as a lockup (the `Logo` component with `variant="lockup"`, 32px in headers).
- Loading uses the mark: the dot first, then the ring turns around it. `Spinner` has two forms: `orbit` (continuous, for components and buttons) and `compose` (the ring closes into the mark, for full pages). The checkout uses the same animations.

## Imagery

- Use real stock photographs (Unsplash, Pexels, or a paid library), never generated images.
- Pick candid people in everyday moments: shopping on a phone, travelling, working at a laptop. Warm natural light, no staged handshakes.
- Round photo corners with `radius-xl`. Crop tight and leave calm space for a headline.
- Customer testimonials use a circular headshot (`radius-pill`) with a mono label for role and company.
- Explain a service by laying product graphics over a photo with `PhotoPanel` and `OverlayCard`: a person using their phone, a card saying "Refund received!", dotted network lines behind. Keep one idea per photo.
- Product visuals without a photo are cropped UI cards on a `brand-tint`, `sky-tint` or `surface-sunken` panel, built from the real components in this system.

## Iconography

- Use one outline icon set, Lucide, through the `Icon` component: 20px at 1.75px stroke, 12px at 2.5px inside badges, coloured with `ink` or `ink-muted`. Do not use emoji or text glyphs (✓ ✕) as icons.
- Arrows in buttons use the plain text arrow "→" via the `withArrow` prop.

## Animated stories

- Tell the product as a short story in three animated panels: `CheckoutStory` (the form fills in and is paid), `RetryStory` (one or two routes decline, the backup route approves) and `RevenueStory` (the revenue counter and the bars grow).
- Each panel is a flat colour block (`brand`, `sun`, `azure` for `sky-tint`) holding one `surface-raised` card. Use one story per section, with a headline beside it.
- A story starts when it scrolls into view, runs about 3 seconds, holds, then loops. Under `prefers-reduced-motion` it shows the final state at once.
- Keep every story to one idea and three steps at most; write results ("Payment rescued"), not feature names.

## Layout

- Site: 12-column grid, `container-max` (1200px) maximum width, hero set left-aligned, alternating feature panels, a row of big stat tiles, then testimonials and FAQ.
- Dashboard: `surface` ground, a grid of `MetricCard` tiles on top, one wide chart card below, data tables in `surface-raised` with `border` row dividers.
- Sign-in: `AuthLayout`, two equal halves; on the left a `SegmentedControl`, headline and form in a 400px column, on the right a photo panel with product cards. Below 900px only the form remains.
- Keep one `StatTile` row per page for proof numbers; do not mix more than three tile tones in a row. Good pairings: `sun` with `brand`, `sky-tint` with `accent`, `brand-tint` with `sky`.

## Components

`Button`, `Badge`, `StatusBadge`, `StatTile`, `MetricCard`, `Input`, `SegmentedControl`, `AuthLayout`, `Alert`, `PieChart`, `BarChart`, `Card`, `Panel`, `TextLink`, `Logo`, `Spinner`, `Modal`, `Icon`, `PhotoPanel`, `OverlayCard`, `CheckoutStory`, `RetryStory`, `RevenueStory`, and for docs `DocsLayout`, `DocsHeader`, `DocsSearch`, `Endpoint`, `MethodBadge`, `CodeBlock`, `Tabs`, `Table` and `Callout` are in the bundle (`window.Halba`). Read each component's README for props and rules.

`Button` takes `href` and renders a link; on a `brand` or `ink` block use the `on-brand` variant. Inline text links use `TextLink` (or the `hb-link` class). `Modal` is not `OverlayCard`: the first is a dialog over the page, the second a result card laid over a photo.

`Alert` is the inline message (`info` on `sky-tint`, `success`, `warning`, `danger` on their `-tint` fills, with a 20px icon). `SegmentedControl` switches views or a setting on one screen (Login | Sign up, Test | Live, Day | Week | Month): `surface-sunken` track with a `border-strong` edge, the selected option `surface-raised` with `ink` text (or `brand` with `on-brand`). The sign-in page is `AuthLayout`: form on the left, a `PhotoPanel` with `OverlayCard`s on the right.

## Checkout

The payment page is plain HTML and CSS, so it works without React: `checkout/halba-checkout.css`, optional Inter fonts and an SVG icon sprite. One markup, four containers (hosted, modal, embedded, component), the same look. The merchant sets `--halba-primary`, `--halba-radius`, `--halba-font` and `--halba-bg`; `--halba-on-primary` and `--halba-accent` are computed from the primary so contrast stays AA with any colour. Read `checkout.md` for the token map, the markup contract, the Stripe Elements mapping and the CSP and accessibility rules, the rules for official method marks (Apple Pay, Google Pay, Klarna, PayPal, iDEAL | Wero) and the Apple Pay and Google Pay buttons above the methods, and the Checkout previews for every state in desktop, mobile, English, Italian and German.

## Technical documentation

Developer pages (guides, API reference) are deliberately plain: no photos, no illustrations, no animated stories, no gradients, no big colour blocks. Flat `surface` ground, code on `surface-sunken`, tables on `surface-raised`, `brand` only for links, the selected tab and the current page. The marketing site keeps its photos and stories; docs share the same tokens, type and logo.

- **Shell**: `DocsLayout`: top bar with logo and `DocsSearch`, navigation (260px), page (720px max), "On this page" (220px). Under 1100px the right column goes; under 900px the navigation becomes a Menu.
- **Page order** for a reference page: `DocsHeader` with `Endpoint`, Request (`CodeBlock` with language tabs), Parameters (`Table`), Response (`CodeBlock`), Errors (`Table`). The `Callout` is for what can cost the reader (live keys, one-time secrets), at most one per section.
- **Code**: DM Mono 13px; syntax colours keep AA on the block in light and dark; examples use test keys (`sk_test_...`).
- **Text**: body 16px/26px, `h2` 28px, `h3` 20px, sentence case; the title names the thing ("Create a payment").
- **Motion**: none, except focus. Copy feedback is a word change.
- See the Docs page preview for the full composition.

## Outside the React app

- **Consuming from code.** `bundle.js` is a classic script that sets `window.Halba` and reads `window.React`; it has no `import` or `export`. A frontend that installs this system as a package needs a small ES-module build around it (or loads the script and reads `window.Halba`). The CSS (`tokens.css`, `bundle.css`) works as it is.
- **Pages without JavaScript** (pay.halba.ai status pages): plain HTML with `tokens.css`, `bundle.css` and the `hb-*` classes: `Panel` or `Card` on `surface`, `StatusBadge`, `Icon` paths inline as SVG, and `Button` as `<a class="hb-btn hb-btn--primary" href>`. Centre one status card with the logo (`brand/halba-mark.svg` and the word "halba" in lowercase), a title, a message and one action. They render light; to follow the visitor's theme set `data-theme="dark"` from `matchMedia('(prefers-color-scheme: dark)')`.
- **Layer injected into a merchant page** (halba.js 3DS challenge on the checkout): use `halba-checkout--challenge` from the checkout stylesheet; other layers use `hb-scrim` and `hb-modal` with `loading` while the provider iframe opens. Load no fonts (the stack falls back to `system-ui`), ship no global reset, and define the token variables on the overlay's own root element, never on `:root`, so the merchant's styles are untouched.
- **Logo.** Use the mark files in `brand/` (`halba-mark.svg`, `-dark`, `-mono`, `-white`) and write the name `halba`, always lowercase. Favicon: `brand/halba-favicon.svg` plus the 32px and 48px PNG; app icon: `brand/halba-apple-touch-180.png` and `halba-icon-512.png`.

## Planned

Not built yet; each must follow these rules. Dashboard: Select, sortable data table with empty state and pagination (the docs `Table` has no sorting), Switch, Checkbox, Textarea, AlertDialog, Tooltip, Toast, DropdownMenu, Popover, Sheet, Skeleton, Slider, date range picker, table filter bar, page layout with sidebar. Line and area charts (same flat, outline-free style). Site: header with Platform menu, footer, FAQ accordion, numbered steps, page header (eyebrow, title, subtitle), Testimonial with circular headshot, Every control uses `border-strong` for its edge, the 3px `focus-ring`, `radius-md`, and `brand` for its selected state; every floating layer uses `shadow-overlay`, `border` and `scrim`.
