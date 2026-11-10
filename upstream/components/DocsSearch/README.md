DocsSearch is the button that opens the docs search. It looks like a field (`surface-raised`, `border-strong` edge, `radius-md`, 40px high) with a search icon, the text "Search the docs" and a shortcut hint. Wire `onClick` to your search dialog and the shortcut (Ctrl K or Cmd K) yourself.

Below 900px it shrinks to the icon alone; keep the accessible name (`label`). `shortcut={false}` hides the hint.
