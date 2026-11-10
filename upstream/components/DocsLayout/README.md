DocsLayout is the shell of every technical page: a sticky top bar (logo lockup, section name, `search` and `tools` slots), the section navigation on the left (260px), the page in the middle (at most 720px, 16px/26px body) and "On this page" on the right (220px). Props: `nav` (`[{title, items:[{label, href, current}]}]`), `toc` (`[{label, href, current}]`), `section`, `search`, `tools`, `logo`, children.

- Static by design: no images, no illustrations, no animation, no gradients; flat `surface` ground, code and tables on `surface-sunken` and `surface-raised`. `brand` appears only on the selected tab, links and the current page marker.
- Under 1100px the "On this page" column disappears; under 900px the navigation folds into a "Menu" disclosure and the top bar keeps the logo, the search icon and the tools.
- The current page is marked with `aria-current="page"` and `brand-tint`; the navigation has an accessible name. Use one `h1` (`DocsHeader`), `h2` and `h3` with ids that match the `toc` hrefs.
- Page rhythm: header, then sections of text, one `CodeBlock` and one `Table` at a time, `Callout` only for what can cost the reader; at most one per section.
- Compose a reference page in this order: `DocsHeader` with `Endpoint`, Request (`CodeBlock` with tabs), Parameters (`Table`), Response (`CodeBlock`), Errors (`Table`). The preview "Docs page" shows the full page.
