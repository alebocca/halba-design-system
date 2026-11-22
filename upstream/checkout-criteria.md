# Payment page: regulatory and accessibility criteria

What the Halba payment page has to respect. These are design and build requirements taken from public sources. They are not a statement that a given page is compliant and not legal advice: compliance validates the references before they go into a contract or a certification.

## 1. Accessibility

| Criterion | What it means on the page | Source |
| --- | --- | --- |
| European Accessibility Act | E-commerce services and consumer payment flows sold to EU consumers must be accessible since 28 June 2025. | Directive (EU) 2019/882 |
| Italian transposition | Same obligation in Italy, with the supervision of AgID. | D.Lgs. 82/2022 |
| Technical standard | Meeting EN 301 549 gives presumption of conformity. Web content maps to WCAG 2.1 AA. Halba designs to WCAG 2.2 AA. | EN 301 549, WCAG 2.2 |
| Perceivable | Text 4.5:1, large text and UI components 3:1, also on dark and on the merchant colour. Information never by colour alone. Reflow at 320px, text zoom 200%. | WCAG 1.4.1, 1.4.3, 1.4.10, 1.4.11 |
| Operable | Everything works with the keyboard, visible focus (3px ring), targets at least 44px (48px on touch), no keyboard trap in the modal or in the 3-D Secure frame. | WCAG 2.1.1, 2.1.2, 2.4.7, 2.5.8 |
| Understandable | Every field has a visible label, errors name the field and say how to fix it, and `autocomplete` tokens are set (`cc-number`, `cc-exp`, `cc-csc`, `cc-name`, `email`). No cognitive test for authentication, so paste is allowed. | WCAG 1.3.5, 3.3.1, 3.3.3, 3.3.8 |
| Robust | Native controls, real radio groups with legend, `role="alert"` for errors, status messages announced without moving focus. | WCAG 4.1.2, 4.1.3 |
| Card schemes | The list of accepted schemes is a labelled group. Logos carry the scheme name as `alt`. The negative logo variant has `alt=""` so it is not read twice. The active scheme is `aria-current`. | WCAG 1.1.1 |
| Timeouts | The user is warned before a session or 3-D Secure countdown ends and can extend it. | WCAG 2.2.1 |
| Motion and contrast modes | `prefers-reduced-motion` and `forced-colors` are respected. | WCAG 2.3.3, 1.4.11 |

## 2. Payments and security

| Criterion | What it means on the page | Source |
| --- | --- | --- |
| PCI DSS v4.0.1, 6.4.3 | Every script that runs on the payment page is inventoried, authorised and integrity checked. The page ships no scripts of its own. | PCI DSS v4.0.1 (mandatory since 31 March 2025) |
| PCI DSS v4.0.1, 11.6.1 | Changes to the page and its HTTP headers are detected. Keep the CSP and the markup contract stable and versioned. | PCI DSS v4.0.1 |
| Card data | Card number, expiry and CVC are collected only in the PSP's hosted fields. Halba markup never reads or stores them. | PCI DSS |
| Strong customer authentication | The page supports the challenge (3-D Secure) in the same flow and in an accessible frame. | Directive (EU) 2015/2366 (PSD2) and its RTS |
| Choice of card brand | On a co-badged card the payer chooses the network. The merchant may preselect one but the payer can change it easily before paying. | Regulation (EU) 2015/751, Art. 8 |
| Accepted schemes shown | The page tells the payer clearly which schemes are accepted, before the payment. | Regulation (EU) 2015/751, Art. 10(4) |
| Cartes Bancaires charte (Oct 2024) | Asks for the full colour logo, unaltered, at least 52.2 × 37.8 px with a clear space of 1/4 of its height, same treatment as the other marks, alphabetical order. **Halba departs from the size rule and from the alphabetical order**: the logo is scaled like the other schemes and the order is Halba's own (see `checkout.md`, Card schemes). Colour and no alteration are kept. | GIE Cartes Bancaires, charte graphique du logo CB |
| Scheme brand rules | Use the official artwork unchanged, with equal prominence, clear space and the colour rules in `checkout.md`, Card schemes. | Visa, Mastercard, American Express, Discover, JCB, UnionPay and Cartes Bancaires brand standards |

Check the exact article numbers against the current text before quoting them to a customer.

## 3. Rules for the card schemes field

1. Show only the schemes enabled for the online channel by the PSPs connected to the workspace. Never a fixed list.
2. If a scheme is enabled by at least one PSP for the channel, it is shown once.
3. Same order for everyone (`brands.json`, `order`: Visa, Mastercard, Maestro, Cartes Bancaires, American Express, Discover, Diners Club, JCB, UnionPay; a scheme not enabled is skipped), same framed chip, one row aligned left above the card number box and no wider than it, no scheme highlighted before the payer types a number.
4. When the number is recognised, mark the scheme with `halba-brand--active` and `aria-current="true"`, and show the same logo inside the number box.
5. When the number is a co-badged card, ask the payer to choose the network (section 4, `halba-cobrand`). Preselect the network the merchant prefers, never hide the choice.
6. No scheme has artwork yet in the system: show its name as text (`halba-brand--text`) and report it, do not draw it.

## 4. Rules for the choice of network (co-badged cards)

1. The control appears only when the PSP says the card has two networks, after the full number. It is under the number field, inside the card panel.
2. Two options, equal size, border, type and logo treatment. No "recommended", no different colour, no different order logic. Only the selected state differs.
3. One option is preselected (Cartes Bancaires). The text next to the options says it can be changed.
4. The logo in the number field follows the chosen network.
5. While the PSP answers, the space is reserved: the content below does not move when the result arrives.
6. If the check fails, the payer pays with the main network and is told in a status line. The payer is never blocked.
7. When the chosen network is Cartes Bancaires, say "You'll confirm with your bank." under the Pay button, and show the redirect state on the button after Pay. For Visa no note.
8. It is a labelled radio group ("Pay with"), keyboard operable, announced as a status when it appears or changes, targets at least 44px, contrast AA in light, dark and with the merchant colours, with no information by colour alone.
9. Works with the merchant radius, in hosted, modal, embedded and component pages, at 375px and in a container under 280px.
10. The Apple Pay and Google Pay buttons and the rest of the card panel are not changed.

Acceptance, per rule:

| Rule | Pass when |
| --- | --- |
| 1 | A non co-badged card (4242…) shows no control. A co-badged test card shows it within 1 second of the last digit. |
| 2, 3 | The two options measure the same. Cartes Bancaires is selected on first view. A screen capture without colour still shows which is selected. |
| 4 | Choosing Visa changes the logo in the number field to Visa, choosing Cartes Bancaires changes it back. |
| 5 | Layout shift (CLS) caused by the control is 0 while checking and when the result arrives. |
| 6 | With the PSP call blocked, the page shows the note, pays with the main network and the Pay button works. |
| 7 | With Cartes Bancaires selected the note shows under Pay. After Pay the button shows "Taking you to your bank…" and the page goes to the bank through the PSP. With Visa there is no note. |
| 8 | Keyboard only: arrows change the choice, Tab leaves the group. VoiceOver and NVDA announce the two networks and the selected one when the control appears, and the new choice when it changes. |
| 9 | Checked in the `CheckoutNetworkChoice` preview, light and dark, radius 0 and 24, 375px and 280px. |

## 5. How to test

- Keyboard only, from the first field to the pay button, in the modal and in the 3-D Secure frame.
- Screen reader (VoiceOver, NVDA): the card group is announced as "We accept", then each scheme once. With a co-badged card, the network choice is announced when it appears.
- 320px wide, 200% zoom, dark theme, forced colours, reduced motion.
- Contrast with the merchant colours (`--halba-primary` is computed to stay AA).
- Automated pass (axe or Lighthouse) is a first filter, not the proof.
- Print the list of scripts and headers of the page and compare with the authorised inventory (6.4.3, 11.6.1).
