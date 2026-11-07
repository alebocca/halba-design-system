TextLink is an inline link in `brand`, underlined so colour is not the only cue, with an optional arrow for "Explore orchestration →".

Provide `href` and the words as `children`; add `withArrow` for a stand-alone link at the end of a block. Links inside running text use the same style through the `hb-link` class.

- Link text says where it goes ("Read the API docs"), never "click here".
- On `brand`, `ink`, `accent`, `sky` and `sun` blocks the link takes the block's text colour and keeps its underline.
- Use `Button` for actions that change something; `TextLink` only navigates.
