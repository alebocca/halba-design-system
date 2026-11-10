Logo is the Halba mark: an open ring with a dot at its centre. The ring opens at the bottom right. `variant="lockup"` adds the word "halba" next to it.

- The name is always written `halba`, lowercase, in the logo and in UI copy, in Plus Jakarta Sans 700. Never "Halba" or "HALBA" in the logo.
- Default tone: ring `ink`, dot `brand` (violet). In the dark theme the tokens flip, so the ring turns light and the dot lilac. Use `tone="mono"` for one colour (it follows the text colour: documents, small spots, a button) and `tone="on-brand"` on a `brand` block.
- Do not use `accent` (orange) on the dot, and do not recolour the two parts independently.
- Sizes: 16, 24, 32 or 48 px high. Up to 20px the system draws a slightly fuller ring and dot so it stays legible. The lockup word is 0.75 of the mark height, with a gap of 11px.
- Clear space around it equals the diameter of the dot's ring opening, about a quarter of the height. Do not rotate, stretch, outline, add shadows or place it on photos without a block behind it.
- Header: `lockup` at 32px. Favicon and app icon: use the files in `brand/` (`halba-favicon.svg` follows the browser theme; `halba-app-icon.svg` is white on `brand`). Outside React use the SVG files: `halba-mark.svg` (ring ink, dot brand), `halba-mark-dark.svg`, `halba-mark-mono.svg`, `halba-mark-white.svg`.
