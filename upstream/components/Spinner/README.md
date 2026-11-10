Spinner is the loading indicator, drawn with the Halba mark: the dot sits at the centre and the ring moves around it. It replaces the plain rotating ring.

- `variant="orbit"` (default): the ring turns and stretches while the dot breathes. For short waits inside components, buttons and modals. 24px by default.
- `variant="compose"`: the dot appears, the ring turns once around it and closes into the mark, holds, then withdraws (2.2s). For a full page or screen that is loading; use it at 96 to 128px.
- `tone="mono"` draws both parts in the current text colour: use it inside a button, so it follows the button's text colour.
- Give it a `label` when the default "Loading" is not specific ("Opening your bank").
- Under `prefers-reduced-motion` it stays still as the mark. Pair it with text when the wait is longer than about a second.
