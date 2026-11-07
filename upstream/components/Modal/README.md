Modal is a dialog over the page: `scrim` backdrop, a `surface-raised` box with `border`, `radius-lg` and `shadow-overlay`, a title, a close button and optional actions.

Provide `title`, `children`, and `onClose` (enables the close button, Esc and backdrop click). Pass `footer` with the buttons, primary last. Set `loading` while content such as the 3DS provider iframe opens: a `Spinner` covers the body. Set `confirm` for destructive confirmations (role alertdialog). Focus moves into the box, is kept inside while it is open, and returns to the trigger on close.

- One idea per dialog; the title is a short sentence in `h3` style.
- For the CSS-only version (pages without React, or a layer injected into another site) use `hb-scrim` around `hb-modal` and move focus yourself.
- Do not put a Modal on top of another Modal.
- `contained` is only for previews: it fills the nearest positioned parent.
