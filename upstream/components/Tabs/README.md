Tabs switch panels of content on one docs page (Request | Response, cURL | Node.js, Test | Live keys). Underline style: `ink` for the selected tab with a 2px `brand` line, `ink-muted` for the others, a `border` hairline under the row.

Set `options`, `value`, `onChange` and `label`. Give the tab panel `role="tabpanel"`, an `id` equal to `panelId` and `aria-labelledby` `<id>-<value>`. Arrow keys, Home and End move between tabs.

- `SegmentedControl` is the pill style for settings and views in the app; Tabs is for reading content.
- Labels are one or two words. At most five tabs; on narrow screens the row scrolls.
