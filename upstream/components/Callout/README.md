Callout is a note inside a docs page: an icon, a bold title word and text, on a tint. `note` on `sky-tint`, `tip` on `success-tint`, `warning` on `warning-tint`, `danger` (title "Important") on `danger-tint`. Text stays `ink`.

The title word and icon carry the tone, never the colour alone. Pass `title` to replace the default word. `danger` uses `role="alert"`; the others `role="note"`.

- Use for what could cost the reader time or money: live keys, irreversible actions, data that is not returned again.
- Alert is the inline message of the app (form errors, status); Callout belongs to reading.
- No more than one per section.
