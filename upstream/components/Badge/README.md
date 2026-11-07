Badge is a small mono uppercase status label such as LIVE, RECONCILED or 2 CONFLICTS, with an icon on success, warning and danger.

Provide the word as `children` and pick a `tone`. Every badge carries a word, because colour alone must not carry status; success, warning and danger also show an icon (check, alert, x). Override it with `icon` (`clock`, `undo`, or `false`).

For payment and risk states use `StatusBadge` with `status`: the word, tone and icon are fixed so the site, dashboard and API pages always agree.

- `approved`, `rescued`: success. `challenge`, `medium-risk`: warning. `declined`, `failed`, `fraud`, `high-risk`: danger. `pending`: neutral with a clock. `refunded`: brand with an undo arrow.
- Use `Badge` directly for anything that is not a payment state: `brand` for highlights, `neutral` for everything else.
- Keep text under three words and let the component uppercase it.
- Do not use badges as buttons.
