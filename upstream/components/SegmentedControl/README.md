SegmentedControl switches between two to four views of the same screen, such as "Login | Sign up". It is a pill track (`surface-sunken`, `border-strong`, `radius-pill`) with the selected option raised.

Provide `options` (`{ value, label }`), the current `value`, `onChange` and an accessible `label`. The selected option is `surface-raised` with `ink` text and a `border` hairline; set `tone="brand"` to fill it with `brand` and `on-brand` instead. Add `block` to stretch it across a form. Arrow keys, Home and End move and select, and the focus ring is the usual 3px `focus-ring`. Options are `body-sm` at weight 600. Without `panelId` it is a radiogroup (a setting such as Test | Live); with `panelId` it is a tablist that switches a panel (Login | Sign up).

- Use it to switch what is shown below it; use `Button` for actions and a select for long lists.
- Labels are one or two words in sentence case ("Login", "Sign up").
- When it switches a panel, pass `panelId` and give that panel `role="tabpanel"`, an `id` matching it, and `aria-labelledby` set to `<id>-<value>`.
- Use `raised` by default; use `brand` only when the control is the one colour accent on the screen.
- Use it for Log in | Sign up and for Test | Live. The selected option stays flat, with a `border` hairline instead of a shadow.
