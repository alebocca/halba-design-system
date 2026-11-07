Halba helps teams lift checkout conversion. The look is fresh and colorful but precise: big confident headlines, flat color blocks, real people in the photos, and clear numbers. Friendly in tone, serious about data.

## Content fundamentals

- Write short, confident headlines that promise an outcome: "Checkout, tuned for growth." Sentence case, no exclamation marks, no emoji.
- Address the reader as "you" and the company as "we". Prefer verbs ("Spot friction early") over nouns ("Friction detection").
- Put the number first in proof points: "99.99% uptime", never "uptime of 99.99%".
- Status words are uppercase mono labels: LIVE, RECONCILED, 2 CONFLICTS. Colour never carries status alone.
- Button labels are 1–3 words and start with a verb: "Get in touch", "Explore more".

## Visual foundations

- **Colour.** Page ground is `surface`; cards are `surface-raised`. `brand` (violet) is for actions and the lead data series. Use at most one big colour block per viewport from `brand-tint`, `sky-tint` (light blue), `sun` (light yellow), `sky`, `accent`, or the `ink` block. `sun` and `sky-tint` are the soft, friendly pair for hero panels and feature sections; `accent` is the warm highlight, used sparingly.
- **Text.** Set copy in `ink`; secondary text in `ink-muted`. Text on `brand` is `on-brand`; on `accent` it is `on-accent`; on `sky` it is `on-sky`; on `sun` it is `on-sun`; on `brand-tint` and `sky-tint` it is `ink`.
- **Type.** Headlines use `display-xl`, `display-lg`, `h1`–`h3` in Plus Jakarta Sans with the negative tracking built into each style. Body uses `body`, `body-lg`, `body-sm`. Eyebrows, badges and chart legends use `label-mono`, in uppercase.
- **Fonts.** Load both from Google Fonts: Plus Jakarta Sans 400/500/600/700 and DM Mono 400/500.
- **Spacing.** Build layouts from `space-1` to `space-9`. Card padding is `space-5`; gap between cards is `space-5`; gap between site sections is `space-8`.
- **Shape.** Buttons are pills (`radius-pill`); inputs use `radius-md`; cards use `radius-lg`; stat tiles, photo panels and feature blocks use `radius-xl`.
- **Charts.** Charts are soft: translucent azure (`chart-1`) for the lead series and translucent violet (`chart-2`) for the second, each with a solid 1.5px outline or line in `chart-1-line` or `chart-2-line`. Area fills use `chart-3`; one anomaly or threshold per chart uses `chart-4`. Yellow stays for blocks and highlights, not for data. Gridlines are `border`, legends are `label-mono`. Always label values directly so colour never carries meaning alone.
- **Motion.** Motion explains, it does not decorate. Lines draw in over 900ms, cards fade up over 500ms (`ease-out`), and only status graphics loop (dotted network flow, a pulsing live node, one floating card). Everything stops under `prefers-reduced-motion`.
- **Depth.** Flat by default. Only dashboard cards and product mockups get `shadow-card`. No gradients.
- **Borders.** Card outlines use `border`; control edges use `border-strong`.
- **Focus.** Every interactive element shows a solid 3px `focus-ring` outline with a 2px offset.
- **Status colours.** Green (`success`) means OK: approved, reconciled, rescued. Yellow (`warning`) means challenge, medium risk, needs review. Red (`danger`) means KO: declined, failed, fraud, high risk. Every status carries a word and an icon (✓, !, ✕), so colour never works alone. Use the same state words in the site, app and dashboard.
- **Dark theme.** Switch with `data-theme="dark"`; all tokens flip together. Never hard-code hex values.

## Imagery

- Use real stock photographs (Unsplash, Pexels, or a paid library), never generated images.
- Pick candid people in everyday moments: shopping on a phone, travelling, working at a laptop. Warm natural light, no staged handshakes.
- Round photo corners with `radius-xl`. Crop tight and leave calm space for a headline.
- Customer testimonials use a circular headshot (`radius-pill`) with a mono label for role and company.
- Explain a service by laying product graphics over a photo with `PhotoPanel` and `OverlayCard`: a person using their phone, a card saying "Refund received!", dotted network lines behind. Keep one idea per photo.
- Product visuals without a photo are cropped UI cards on a `brand-tint`, `sky-tint` or `surface-sunken` panel, built from the real components in this system.

## Iconography

- Use one outline icon set at 1.75px stroke and 20px size, such as Lucide, coloured with `ink` or `ink-muted`. Do not use emoji as icons.
- Arrows in buttons use the plain text arrow "→" via the `withArrow` prop.

## Animated stories

- Tell the product as a short story in three animated panels: `CheckoutStory` (the form fills in and is paid), `RetryStory` (two processors decline, the backup route approves) and `RevenueStory` (the revenue counter and the bars grow).
- Each panel is a flat colour block (`brand`, `sun`, `azure` for `sky-tint`) holding one `surface-raised` card. Use one story per section, with a headline beside it.
- A story starts when it scrolls into view, runs about 3 seconds, holds, then loops. Under `prefers-reduced-motion` it shows the final state at once.
- Keep every story to one idea and three steps at most; write results ("Payment rescued"), not feature names.

## Layout

- Site: 12-column grid, 1200px maximum width, hero set left-aligned, alternating feature panels, a row of big stat tiles, then testimonials and FAQ.
- Dashboard: `surface` ground, a grid of `MetricCard` tiles on top, one wide chart card below, data tables in `surface-raised` with `border` row dividers.
- Keep one `StatTile` row per page for proof numbers; do not mix more than three tile tones in a row. Good pairings: `sun` with `brand`, `sky-tint` with `accent`, `brand-tint` with `sky`.

## Components

`Button`, `Badge`, `StatTile`, `MetricCard`, `Input`, `PhotoPanel`, `OverlayCard`, `CheckoutStory`, `RetryStory` and `RevenueStory` are in the bundle (`window.Halba`). Read each component's README for props and rules.
