RevenueStory is an animated panel in which a revenue counter counts up while soft azure and violet bars grow month by month.

Provide `target` (final number), `label`, `series` (per month `m`, `a` azure, `b` violet, in thousands) and `max`; optionally `tone`, `eyebrow`, `legendA` and `legendB`. It sits on a `sky-tint` panel by default.

- Use it for the result section ("what you recover with Halba"); one per page.
- Azure (`chart-1`) is the lead series and violet (`chart-2`) the second: translucent fills with a solid 1.5px outline (`chart-1-line`, `chart-2-line`); the legend names both in words.
- The counter and the chart animate together over about 3 seconds, then hold, then loop.
- Under reduced motion it shows the final numbers and bars immediately.
