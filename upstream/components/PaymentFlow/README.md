PaymentFlow draws what happened to one payment as a vertical flow.

Each step has a title, a line of explanation, an optional time and technical values (`meta`). `via` is the word on the arrow that leads to the step ("declined, next route"). `summary` is the sentence at the top that says the result. Keep each explanation to one sentence and put codes in `meta`.

Put it inside a `Drawer`, not in the page.
