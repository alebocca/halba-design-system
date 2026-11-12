FilterGroup narrows a list by category: the type and channel filters of the Connections page, a payments list, a report. Options are separate chips that wrap onto more lines, so on a phone nothing scrolls sideways and nothing is hidden.

Provide `label` (the visible name of the group, "Type"), `options` (`{ value, label, count?, disabled? }`) and a `name`. Always pass `name` when the page is rendered on the server, so server and browser agree.

- **One choice** (default): the options are radios. Add `allLabel="All"` for a first option that means no filter; its value is `""`. Control it with `value` and `onChange(value)`, or leave it uncontrolled with `defaultValue`.
- **Several choices**: add `multiple`. The options are checkboxes and `value` is an array. There is no "All": nothing selected means no filter. Pass `onClear` to show a "Clear" button while something is selected.
- **Counts**: `count` is shown small after the label and read to screen readers as "12 results" (`countWord` changes the word). Show counts only when they are cheap and exact. An option with no results is `disabled`, not hidden.
- **Selected state** has three signals, not colour alone: a check mark, a 2px `brand` border with a `brand-tint` fill, and weight 600.
- **Several groups** go side by side in a `hb-filters` container (inside `hb-filters-wrap`); under 640px of container width each group takes its own row. Two to five options is the sweet spot; with more than about eight use a select (planned) or a search.
- **Labels** are one to three words in sentence case; long labels wrap inside the chip. Test German.
- Keep the chips and the results close, and announce the new number of results in a polite live region (`role="status"`) on the page.

**Accessibility.** Each option is a native `<input>` inside a `<label>`, so the browser provides the roles (radio group or checkboxes), arrow keys for radios, Space for checkboxes and the grouping by `fieldset` and `legend`. The focus ring is the usual 3px `focus-ring`; touch targets are 44px (36px with a mouse). Motion is a 120ms colour change, removed under `prefers-reduced-motion`.

**Server rendering and plain HTML.** The component renders the same markup on the server and in the browser, and it works with no JavaScript: it is a form control. Use the `hb-*` classes by hand:

```html
<form method="get" action="/connections">
  <div class="hb-filters-wrap"><div class="hb-filters">
    <fieldset class="hb-filter">
      <legend class="hb-filter__legend">Type</legend>
      <div class="hb-filter__options">
        <label class="hb-filter__opt">
          <input class="hb-filter__input" type="radio" name="type" value="" checked>
          <span class="hb-filter__chip">
            <svg class="hb-filter__check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5"/></svg>
            <span class="hb-filter__label">All</span>
          </span>
        </label>
        <!-- one label per option; add <span class="hb-filter__count" aria-hidden="true">12</span><span class="hb-sr">, 12 results</span> for a count -->
      </div>
    </fieldset>
  </div></div>
  <noscript><button class="hb-btn hb-btn--secondary hb-btn--sm" type="submit">Apply filters</button></noscript>
</form>
```

Without JavaScript the form submits as a GET request and the page filters on the server; with JavaScript, listen to `change` on the form and filter in place. The check mark shows by CSS (`:checked`), so the chips need no script to look selected.

**FilterGroup or SegmentedControl.** SegmentedControl switches how one screen is seen or set (Login | Sign up, Test | Live, Day | Week): two to four short options, always exactly one selected, in one joined track. FilterGroup narrows the items of a list: three or more options, an "All" or several at once, separate chips that wrap. If choosing changes what the whole panel is, use SegmentedControl; if it removes rows from a list, use FilterGroup.
