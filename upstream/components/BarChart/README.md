BarChart shows a value over time, one bar per day, week or month.

Provide `data` (`label` and one number per series in `values`), `series` (`name`, `tone`) and a `label`. Series stack by default; set `stacked={false}` for side-by-side bars. The axis rounds up to a clean maximum with four hairline gridlines, and each bar carries its value above it.

- Bars are flat soft fills with rounded corners and a 2px gap between stacked segments. No outlines and no gradients.
- Use `success`, `danger` and `neutral` for authorized, declined and blocked; use `azure` and `violet` for two comparable series, azure first.
- Keep labels short ("Nov 6"); the axis labels are mono and truncate.
- For the weight of OK, KO and Retry use `PieChart`, not stacked bars.
