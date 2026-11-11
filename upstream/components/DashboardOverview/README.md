DashboardOverview shows how the overview page is composed.

- Metric row: `hb-metric-grid` (auto-fit, 200px minimum). `MetricCard` sizes its figure with its own width, so it never leaves the card when the browser zoom grows or the column narrows.
- Shares of a whole are charts: reasons with a long tail go in a `PieChart` (four slices, the rest as "Other"); few parts such as 3-D Secure outcomes go in a `ShareBar`.
- Tables show five rows at most on the overview, with a "View all" link. The complete list lives on its own page.
- One idea per card: a title, one visual, at most one link.
