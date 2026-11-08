PieChart shows how a set of events is distributed, such as the weight of OK, KO and Retry among payments: a donut with the total in the middle and a legend with the count and share of each slice.

Provide `data` (`label`, `value`, optional `tone`) and a `label` for the chart. Slices default to success (OK), danger (KO), azure (Retry), warning (Challenge) and neutral (Blocked, other). Add `totalLabel` ("payments") for the caption in the centre, or `donut={false}` for a full pie.

- Use it for shares of a whole at one moment; use `BarChart` for change over time.
- Keep to four slices, five at most; with more categories use a horizontal list of rows.
- Slices are soft fills with a 3px gap and no outline. Every slice is also a legend row with its name, value and percentage, so colour never works alone.
- Keep one meaning per colour across the product: OK is always green, KO red, Retry azure, Challenge yellow.
