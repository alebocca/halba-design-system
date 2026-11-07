CheckoutStory is an animated panel that shows a card form being filled in and paid, then three checks turning green before "Payment OK".

Provide `merchant` and `amount` if you want your own, and optionally `tone` and `eyebrow`. It sits on a `brand` panel by default. The form types the card number, expiry and CVC; the button goes to "Processing…"; then "Account verified", "Fraud check passed" and "Smart routing applied" each spin and turn into a green check, one after the other. Only when all three are green does the button turn green with "Payment OK". Rename the checks with `check1`, `check2`, `check3` (done wording) and `check1Wait`, `check2Wait`, `check3Wait` (waiting wording).

- Use it next to a headline about the checkout; one story per section.
- Card numbers are always masked; never show a real or full card number.
- It starts when scrolled into view, runs about 4.5 seconds, holds, then loops. Under reduced motion it shows the finished state at once.
- Keep exactly three checks; each states a result in the past tense.
- Do not put other animated panels within the same viewport.
