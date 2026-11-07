Panel is a flat colour block (`radius-xl`, `space-6` padding) that holds a headline, copy and buttons, or a card.

Pick `tone` from brand, brand-tint, sky-tint, sky, sun, accent, ink or sunken: the names match the tokens. Text colour is set by the block, and so are the focus ring and link colour inside it.

- Use at most one big colour block per viewport; a closing call-to-action on `brand` counts as that block.
- Put `Button` `secondary` or `on-brand` on `brand` and `ink`; never `ghost`.
- Use `sunken` for quiet grouping behind cards, not as an accent.
- Not the same as `PhotoPanel`, which holds a photograph.
