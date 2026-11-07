MetricCard shows one dashboard number with its change and an optional sparkline.

Provide `label`, `value` (formatted), and optionally `delta` text, `trend` (good, bad or flat for the business, not up or down) and `series` (numbers, oldest first).

- Arrange cards in a grid with `space-5` gaps on `surface`.
- A falling decline rate is `good`; a falling approval rate is `bad`. Set `trend` by meaning.
- The delta is a badge with a word-like value such as "+2.8pp", so colour never works alone.
- Use at most 4 cards per row; put detailed charts in a wide `surface-raised` card below.
