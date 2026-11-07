Card is the generic container: `surface-raised`, a `border` hairline, `radius-lg` and `space-5` padding.

Put any content inside as `children`. Add `variant="product"` for mini product cards and mockups (adds `shadow-card`, for example the "Fraud decision" card with key/value rows and a `StatusBadge`). Add `href` or `onClick` and the whole card becomes a link or button with a `border-strong` hover and a focus ring.

- Keep cards flat: the hover changes the border, never lifts or adds a shadow.
- Gap between cards is `space-5`.
- Make one element the link inside a clickable card; do not nest buttons in it.
- Do not use `product` for ordinary lists or tables.
