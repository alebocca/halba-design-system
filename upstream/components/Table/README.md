Table is the reference table for parameters, fields and error codes: `surface-raised` with a `border`, `radius-md`, a mono uppercase header row with a `border-strong` underline and `border` row dividers. No zebra stripes, no shadows.

`columns` is `[{key, label, mono, header, width}]` and `rows` is a list of objects; a value can be text or a node (use `Badge` or `code`). `mono` sets the cell in DM Mono (names, codes); `header` makes the first column a row header. The table scrolls sideways inside its box on narrow screens, and the box is focusable for the keyboard. `caption` is read by screen readers.

- Required and optional are words in a cell ("required"), not colours.
- Keep descriptions to one or two sentences; longer rules go in the text.
