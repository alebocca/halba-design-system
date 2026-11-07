RetryStory is an animated panel that shows a payment failing on one or two routes and being rescued by the next one.

Provide `steps` (2 or 3 attempts, each `{ name, result }` with `result` "declined" or "approved"; the last should be approved) and the `amount`; optionally `tone` and `eyebrow`. Without `steps` it shows the three-step default from `first`, `second` and `backup`. It sits on a `sun` panel by default. The headline moves from "Checking rules…" to "Trying the next route…" to "Payment rescued", each attempt appearing with a connecting line and a word badge (Declined, Approved).

- Match the story to the copy beside it: "retry once on your backup PSP" is two steps, one declined and one approved.
- Use it to explain retries, routing or fallbacks; keep two or three steps, never more.
- Status is always a word plus an icon, never colour alone.
- It starts when scrolled into view, loops with a pause, and shows the finished state for readers who prefer reduced motion.
