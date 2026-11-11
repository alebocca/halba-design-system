TerminalStatus shows the state of a payment terminal in tables and cards: Online, Offline for 12 min, or Not charging.

Pass `status` (`online`, `offline`, `power`) and, for offline, `since` as a short duration such as "12 min". It is a `Badge` with an icon (wifi, wifi-off, plug), so the word and icon carry the state and colour only groups it.

- Use it in the terminals table of the dashboard, in the store page and in the terminal detail.
- Offline is danger, not charging is warning, online is success. The same three states appear on the terminal itself as the status indicator.
- Keep the duration rounded: "5 min", "3 h", "2 days".
