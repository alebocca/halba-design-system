TerminalFrame draws a portrait terminal bezel, 9:16 (Stripe S700, Adyen Castles S1F2) or 9:20 (myPOS Ultra, `ratio="9:20"`) around any preview, such as the idle screen a merchant uploaded.

Pass `width` in px (default 180); the height follows. With `guides` it overlays the reserved bands (72 dp at the top for the status pill, 72 dp at the bottom for the halba mark) and a dashed safe area 12 % from every edge, so the merchant sees where text and logos are safe on every device.

- Content must fill the frame: `object-fit: cover`.
- The frame is decorative; the screen has an accessible name through `label`.
