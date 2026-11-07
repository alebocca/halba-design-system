OverlayCard is a small floating result card placed over a photo inside a PhotoPanel. It is not a dialog; for that use `Modal`.

Provide `title` (a short result sentence), optionally `value` (a mono figure), a `tone` for the icon (success, danger, warning or sun) and a position (`top`, `left`, `right` or `bottom`). Add `float` to one card at most so it bobs gently.

- Write what happened, not what the feature is: "Refund received!", not "Refund module".
- The card is always `surface-raised` with `ink` text; the icon carries the tone together with a check, alert or x.
- Do not stack cards on top of each other or cover faces.
- Use it only inside a `PhotoPanel`.
