AuthLayout is the sign-in page: the form on the left half and a graphic on the right half.

Put a `SegmentedControl` (Login | Sign up), a headline and the form as `children`; pass the graphic as `aside`, usually a `PhotoPanel` with `network` and two or three `OverlayCard`s over a real stock photo. The wordmark sits top left and the form sits in a 400px column anchored near the top, so the switch does not move when the form grows. Below 900px the graphic is hidden and the form fills the page.

- The headline promises an outcome ("Welcome back", "Start rescuing payments"); the button starts with a verb ("Log in", "Create account") and fills the column with `hb-btn--block`.
- Use `Input` for every field, with a hint for the password rule and the error message under the field.
- The graphic is decorative: it carries no information the form needs, so it is hidden from screen readers.
- One idea in the graphic, one `float` card at most, and no faces covered.
