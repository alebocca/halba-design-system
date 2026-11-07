PhotoPanel is a rounded stock photo with overlaid product graphics that explain a service, with an optional animated network of dotted lines.

Provide `image` (a URL or imported file of a real stock photo) and `alt`, then place `OverlayCard` elements as `children`. Without `image` it shows a flat `brand-tint` placeholder so layouts can be built before photos are chosen.

- Choose a candid photo of one person in an everyday moment with calm space on one side; keep faces and hands clear of the cards.
- Use two or three `OverlayCard`s at most, staggered at different heights, each saying one result ("Refund received!", "Approval rate 94.6%").
- Add `network` when the service is about connections or routing; leave it off when the photo already feels busy.
- Overlays are always `surface-raised` with `ink` text, so they stay readable on any photo. Never put text directly on the photo.
- Motion is gentle and stops when the reader prefers reduced motion; do not add other loops.
- Use `radius-xl` corners and one PhotoPanel per section, next to the headline that explains the service.
