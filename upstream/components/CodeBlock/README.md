CodeBlock shows a code sample on `surface-sunken` with a `border`, `radius-md`, 13px DM Mono and a bar with a Copy button.

Pass `code` for one sample, or `tabs` (`[{label, code}]`) for the same sample in several languages; the tabs are real tabs with arrow keys. Highlighting is built in (strings, numbers, comments, keywords, JSON keys) with colours that keep AA contrast on the block in light and dark; pass `highlight={false}` for plain output such as terminal logs. `title` names a file or a response (uppercase mono label).

- Docs only. No images, no motion: the only change on click is the button reading "Copied" for two seconds, announced to screen readers.
- Show the shortest sample that runs. Never put a real secret in it: use `sk_test_...`.
- Long lines scroll inside the block; the block is focusable so the keyboard can scroll it.
