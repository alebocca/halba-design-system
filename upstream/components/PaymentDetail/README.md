PaymentDetail shows how a long section such as Routing is kept out of the page.

- The page carries only the verdict: one sentence ("Approved on the second route") and a button "View routing flow".
- The full story opens in a `Drawer` from the right and is drawn with `PaymentFlow`: one node per step, arrows labelled with what handed the payment on ("declined, next route"), time and technical values inside the node.
- Every node has an icon and a word, so colour never works alone. Success is green, a decline is red, the final approval is violet.
