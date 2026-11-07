Button triggers an action; it is a pill (`radius-pill`) and comes in primary, accent, secondary, ghost and on-brand styles.

Provide a short verb-first label as `children`. Add `withArrow` for navigation actions such as "Get in touch". Add `href` to navigate: it then renders an `<a>` with the same look.

- Use one `primary` button per view; use `accent` only for a single high-priority promotion on the site.
- Use `secondary` next to a primary for the lesser choice, and `ghost` for toolbar actions on `surface`.
- On a `brand` or `ink` block use `on-brand` (outline) for the lesser choice, and `secondary` for the main one. Never `ghost` there: its `ink` text falls to about 3:1 on `brand`.
- Keep the label to 1–3 words in sentence case.
- Do not use `accent` and `primary` side by side.
- Disabled buttons show `surface-sunken` with `ink-muted` text; explain why nearby. A disabled link has no `href`.
