RetryStory is an animated panel that shows a payment failing on two processors and being rescued by a backup route.

Provide `first`, `second` and `backup` processor names and the `amount`; optionally `tone` and `eyebrow`. It sits on a `sun` panel by default. The headline moves from "Checking rules…" to "Trying the next route…" to "Payment rescued", each attempt appearing with a connecting line and a word badge (Declined, Approved).

- Use it to explain retries, routing or fallbacks; keep exactly three steps.
- Status is always a word plus an icon, never colour alone.
- It starts when scrolled into view, loops with a pause, and shows the finished state for readers who prefer reduced motion.
