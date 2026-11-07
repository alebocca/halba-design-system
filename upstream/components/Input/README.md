Input is a labelled single-line text field with an optional hint and error message.

Provide `label` and either `value` + `onChange` or `defaultValue`. Add `hint` for guidance or `error` for a validation message; the error replaces the hint.

- Always show the label above the field; never use the placeholder as the label.
- Write errors as a sentence that says how to fix it ("Enter a 16-digit card number").
- The border uses `border-strong`; focus shows the 3px `focus-ring` outline.
- Group fields with `space-4` gaps.
