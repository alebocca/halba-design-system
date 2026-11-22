DocsHeading is the title of a section of a docs page (`h2` or `h3`) with a link beside it that copies the address of that section. Every section of a docs page has a stable `id` and a copyable link, so support and readers can send "see how to try BLIK" and the link keeps working.

Props: `id` (required, written by the page author), `level` (`2` default, or `3`), `children` (the title), `label` (accessible name when the title is not a plain string), `url` (page address without fragment; default is the current page), `lang` (when the title is not in the page language), `labels` (translated words), `className`.

- **The id is a promise.** The author writes it by hand and never derives it from the title: rewording a title must not break links already sent. Use short, lower-case, hyphenated ids (`sandbox`, `go-to-production`); an `h3` repeats its parent in the id (`integrate-create`). Never reuse a removed id for another section; if a section is renamed, keep the old id. The toc href is `#` + the same id.
- **Signal.** With a mouse (hover and fine pointer) the link is hidden at rest and appears on hover of the title, on keyboard focus (3px `focus-ring`), after a copy, and on the section a link has just opened (`:target`). With touch it is always visible, with a 44px target. No transition, no animation.
- **Copy.** Click copies the full address (`url` or current page, plus `#id`) and, as a normal anchor does, updates the address bar. The icon turns into a check and a word "Copied" appears for two seconds, like `CodeBlock`; a hidden polite live region announces "Link copied". If the clipboard is blocked the word becomes "Link in address bar": the link has still navigated, so the address bar holds it. Ctrl/Cmd/Shift-click and middle click keep the browser default.
- **Accessible name.** "Copy link to Test in the sandbox" (the title is read, not an icon alone). Server-rendered, and without JavaScript, the name is "Link to Test in the sandbox" and the link is a plain anchor to `#id`.
- **Layout.** The link sits after the title in the same row; a long, wrapping title (German) keeps its full width minus the link and breaks with `overflow-wrap` and `hyphens: auto` (pass `lang`). The title is `h2` 28/36 or `h3` 20/28 as in `DocsLayout`; the link is centred on the first line. `scroll-margin-top: 88px` keeps the opened section clear of the 64px sticky bar.
- **Pair with "On this page".** Give `DocsLayout` a `toc` entry for every `h2`, and for every `h3` worth reaching add `level: 3` (indented). The toc is not marked current by scrolling; the page manages `current`.
- Scope: documentation pages only. The site and the dashboard do not use it for now.

Hand-written HTML (no React) uses the same classes. Put the real `id` on the heading and keep the icon and the word as shown:

```html
<div class="hb-sechead hb-sechead--2">
  <h2 class="hb-sechead__title" id="sandbox">Try in the sandbox</h2>
  <a class="hb-sechead__link" href="#sandbox" aria-label="Link to Try in the sandbox">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  </a>
</div>
```

Without JavaScript this is a normal anchor. To copy as well, add once per page:

```html
<script>
document.addEventListener('click', function (ev) {
  var a = ev.target.closest('.hb-sechead__link');
  if (!a || ev.defaultPrevented || ev.button || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || !navigator.clipboard) return;
  var title = a.parentNode.querySelector('.hb-sechead__title').textContent;
  navigator.clipboard.writeText(location.origin + location.pathname + location.search + a.getAttribute('href')).then(function () {
    var w = document.createElement('span'); w.className = 'hb-sechead__word'; w.textContent = 'Copied';
    a.setAttribute('data-state', 'copied'); a.setAttribute('aria-label', 'Copied. Copy link to ' + title); a.appendChild(w);
    setTimeout(function () { a.removeAttribute('data-state'); a.setAttribute('aria-label', 'Copy link to ' + title); w.remove(); }, 2000);
  });
});
</script>
```

The vanilla version has no live region; add `<span class="hb-sr" aria-live="polite"></span>` after the link and write "Link copied" into it if the page needs the announcement. Prefer `DocsHeading` where React is available.
