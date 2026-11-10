CheckoutPage is the Halba payment page: header with optional logo and shop name, a prominent amount, an order summary, the payment methods as an accordion radio group, the Pay button and a footer with "Back to shop" and "Secured by halba".

It is plain HTML and CSS (`checkout/halba-checkout.css`), not a React component, so any frontend can use it. Pick a container with one class on the root: `halba-checkout--hosted`, `--modal`, `--embedded` or `--component`. The look is the same in all four; the merchant sets `--halba-primary`, `--halba-radius`, `--halba-font` and `--halba-bg`, and the rest follows.

- Methods arrive already ordered by Halba. Show them all up to 5; beyond that show four and "More payment methods (n)".
- Selecting a method opens its fields in place; a redirect method opens only a short note. The Pay button is disabled until a method and its fields are ready, and shows a spinner while it processes.
- The card number, expiry and CVC are Stripe Elements; we style the box around them.
- Errors sit next to what they are about, with `role="alert"`. After a decline, reorder the methods and mark the suggested one.
- Compute `--halba-on-primary` and `--halba-accent` from the merchant colour, see the Checkout guide.
- Do not add scripts, external fonts or inline styles: the page runs under a strict CSP.
- Branded methods (Apple Pay, Google Pay, Klarna, PayPal, iDEAL | Wero) use the scheme's official marks next to our Pay button; the only exception is Apple Pay and Google Pay, whose official buttons sit above the methods: one fills the width, two share the row 50/50. See "Method marks and branded buttons" in the Checkout guide.
