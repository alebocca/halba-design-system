Alert is an inline message in a `radius-md` box with `space-4` padding, a 20px icon and `body-sm` text.

Provide the message as `children` and pick a `tone`: `info` on `sky-tint` with an `ink` icon, `success`, `warning` and `danger` on their `-tint` fills with the icon in the tone colour. Text stays `ink`. Links inside use `TextLink`. It is not dismissible unless you pass `onDismiss`. Danger uses `role="alert"`, the others `role="status"`.

- Say what happened and what to do next in one or two sentences; no exclamation marks.
- The icon and the words carry the tone, never the colour alone.
- Place it next to what it is about: above a form for a failed submit, under a field for one error (use the `Input` `error` prop for that).
- Do not stack more than one alert in a view.
