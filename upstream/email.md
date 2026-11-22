# halba transactional email

Guidelines and HTML templates for the emails halba sends on account events: **verify email**, **reset password**, **magic link** and **workspace invitations** (one workspace, or several in one email). They share the checkout tokens, Plus Jakarta Sans, the logo and the tone of the product: friendly, short, one thing per email. The finished HTML lives in `email/<lang>/` (`en`, `it`, `de`), each with a plain-text twin; `email/templates.json` holds subjects, preheaders and variables; the preview card **EmailTemplates** shows every email in light and dark.

## 1. The templates

| Template | File | Sent when | Link lives | Link works | Variables |
|---|---|---|---|---|---|
| Verify email | `verify-email` | A person signs up with email and password | 24 hours | Once | `ConfirmationURL`, `Email` |
| Reset password | `reset-password` | A person asks to reset the password | 1 hour | Once | `ConfirmationURL`, `Email` |
| Magic link | `magic-link` | A person asks to sign in without a password | 15 minutes | Once | `ConfirmationURL`, `Token`, `Email` |
| Workspace invitation | `invite-workspace` | A member invites someone to one workspace | 7 days | Until accepted or revoked | `InviteURL`, `InviterName`, `WorkspaceName`, `Role`, `WorkspaceRows`, `Email` |
| Workspace invitations | `invite-workspaces` | A member invites someone to two or more workspaces at once | 7 days | Until accepted or revoked | `InviteURL`, `InviterName`, `WorkspaceCount`, `WorkspaceRows`, `Email` |

The times are the targets the copy states. **The text and the backend must say the same thing**: before going live, check the real expiry of each token and edit the copy if it differs (section 7).

Several workspaces in one email means one email and one button, never one email per workspace. The button opens a page that lists the invitations and lets the person accept them in one step.

## 2. Principles

- **One email, one action.** One headline, one primary button, nothing else to click except the fallback link and Help.
- **The outcome first.** The headline says what the person is doing ("Choose a new password"), not who is writing.
- **Safe by default.** Every email says how long the link lasts and what to do if it was not requested ("ignore this email, your password stays the same"). halba never asks for a password by email.
- **Works without images.** The logo has alt text, the button is text, the code and the link are real text. If every image is blocked the email still makes sense.
- **Plain text is part of the email.** Every send is `multipart/alternative` with the `.txt` file as the text part.
- **Short.** A transactional email is read in seconds on a phone. No marketing, no illustrations, no social links, no unsubscribe footer (these are not newsletters).
- **Light and friendly.** `surface` ground, one white card, one violet pill. Dark mode follows the reader's setting.

## 3. Anatomy

From top to bottom, in this order:

1. **Preheader** (hidden preview text, one sentence, up to 90 characters).
2. **Logo**: `halba-logo.png` (mark + name), 108 × 32, left-aligned above the card.
3. **Card**: `surface-raised`, `border` hairline, 24px radius, 48px padding (40 side; 36 and 24 under 620px).
4. **Eyebrow**: `label-mono` in uppercase, `brand` ("VERIFY EMAIL").
5. **Headline**: 28/34, Plus Jakarta Sans 700, `ink`. Sentence case, no full stop, no exclamation mark.
6. **Body**: 16/26, `ink`, up to two short sentences.
7. **Workspace list** (invitations only): one row per workspace.
8. **Primary button**: a violet pill, 52px tall, a verb ("Confirm email", "Accept invitation").
9. **Code block** (magic link only, optional): the one-time code in mono 32px.
10. **Fallback link**: "Button not working? Copy this link..." and the full URL in a `surface-sunken` box.
11. **Safety note**: 14/22 `ink-muted` under a hairline: validity, and what to do if it was not requested.
12. **Footer**, outside the card: why the person got this email and to which address, the help link, company name and registered address (13/20).

## 4. Tokens in email

Email clients do not read CSS variables, so every value is a hex written inline. Use exactly these.

| Role | Token | Light | Dark |
|---|---|---|---|
| Page background | `surface` | `#f9f9f7` | `#0f0f14` |
| Card | `surface-raised` | `#ffffff` | `#181820` |
| Link box, code box | `surface-sunken` | `#efefeb` | `#0a0a0e` |
| Text | `ink` | `#0e0e10` | `#f4f4f1` |
| Secondary text, footer | `ink-muted` | `#5c5c66` | `#a8a8b3` |
| Hairlines and card edge | `border` | `#deded8` | `#2c2c36` |
| Button fill, links, eyebrow | `brand` | `#5b47e0` | `#a99bff` |
| Button text | `on-brand` | `#ffffff` | `#14121f` |
| Workspace tile | `brand-tint` | `#d4cefb` | `#2a2457` |

Type: Plus Jakarta Sans for everything, DM Mono for the eyebrow, the link and the code. Neither is installed on most devices, so each stack ends in system fonts (`-apple-system`, `Segoe UI`, `Roboto`, `Helvetica`, `Arial`; mono: `ui-monospace`, `Menlo`, `Consolas`). Do not load web fonts: Apple Mail would use them and every other client would not, so design for the fallback. Sizes: 28 headline, 16 body, 14 notes, 13 footer and eyebrow, 32 code. Nothing below 13px, and never use 13px for anything the person must act on.

Colour is never the only signal. Contrast: `ink` on the card is 19:1, `ink-muted` on the card 6.6:1, white on the violet button 6.1:1, `#14121f` on the dark button 7.8:1.

## 5. HTML rules

Email HTML is not web HTML. These rules are what keep it readable in Gmail, Apple Mail, Outlook (Windows, Mac, new Outlook, outlook.com) and Yahoo.

**Document**
- `<!doctype html>`, `lang` and `dir="ltr"` on `<html>`, `<meta charset="utf-8">`, the viewport meta, `x-apple-disable-message-reformatting`, and `color-scheme` and `supported-color-schemes` set to `light dark`.
- `<title>` is the subject line.
- The Outlook block `<!--[if mso]> ... OfficeDocumentSettings ... <![endif]-->` sets 96 PPI so images are not scaled.
- Keep each file under 100 KB (Gmail clips the message above about 102 KB). Today each template is about 10 KB.

**Layout**
- Tables only, with `role="presentation"`, `cellpadding="0" cellspacing="0" border="0"`. No flexbox, no grid, no `float`, no `position`, no `gap`.
- One column, 600px wide: `width="600"` plus `style="width:100%;max-width:600px"`, and an Outlook ghost table (`<!--[if mso]>...<![endif]-->`) because Outlook ignores `max-width`.
- Spacing with `padding` on `<td>`, not `margin` on blocks (Outlook ignores margin on most blocks; `margin` on `<p>` and `<h1>` is fine and is what the templates use).
- No `rem`, `em` or `calc()`. Use `px`. Write `line-height` in px.
- No background images, no `<video>`, no `<svg>`, no `<form>`, no JavaScript, no `position: sticky`. Gradients are not used.
- Rounded corners with `border-radius` (Outlook desktop draws them square: that is acceptable, except the button, see below).

**CSS**
- Styles are **inline** on every element. The `<style>` block in `<head>` holds only what inline cannot do: client resets, the mobile `@media (max-width:620px)` rules, the dark-mode rules and the Outlook.com `[data-ogsc]`/`[data-ogsb]` overrides. Some clients drop `<style>`; the email must be correct without it in light mode.
- Colours are 6-digit hex. Do not use `rgba()`, named colours or CSS variables.
- Do not use `font` shorthand with `/` line-height, shorthand `background: url()`, or `!important` outside the dark-mode block.
- Give links their colour inline and keep the underline on text links (the link must not rely on colour alone).

**Text**
- Body 16px or larger, 1.6 line height. Short lines: the card is 520px of text at most.
- Every URL shown as text sits in a box with `word-break:break-all`, so long links wrap on a phone.
- Use real `<h1>` and `<p>`. One `<h1>` per email.
- Typographic apostrophe and quotes (`’`, `“ ”`, `„ “`). Write special characters as UTF-8, not entities, except `&nbsp;`, `&zwnj;` and `&amp;`.
- Hidden preheader: a `div` with `display:none;font-size:1px;line-height:1px;max-height:0;opacity:0;overflow:hidden;mso-hide:all`, followed by `&nbsp;&zwnj;` repeated about 60 times so the client does not pull body text into the preview.

**Images**
- Only the logo, as PNG at 2x with transparent background (216 × 64 for a 108 × 32 slot). No SVG (Gmail does not render it), no WebP, no GIF animation.
- `width` and `height` attributes, `style="display:block"`, `border:0`, `alt="halba"`.
- Absolute `https://` URLs on `https://halba.ai/email/` (host the files in `email/img/` there). Never data URIs or CID attachments: Gmail blocks data URIs.
- Two logos for dark mode: `halba-logo.png` (visible by default) and `halba-logo-dark.png` (hidden with `display:none;max-height:0;overflow:hidden;mso-hide:all`, shown by `.dm-show` in the dark block). Gmail's own dark mode recolours automatically; the ring stays legible because the PNG is transparent.

**Button**
- Bulletproof: a link styled as a pill (`display:inline-block;padding:16px 36px;border-radius:100px;background:#5b47e0;color:#ffffff;font-weight:700`), 52px tall, with a VML `roundrect` for Outlook desktop (`<!--[if mso]> ... <![endif]-->`) and the plain link for everything else (`<!--[if !mso]><!--> ... <!--<![endif]-->`).
- The label is the action ("Confirm email"), at most 3 words, centred.
- Do not use `<button>` or an image as a button.

**Links**
- `https` only. The domain is the app's own (`app.halba.ai`), never a shortener or a tracking domain.
- No `target`, no `rel` games, no UTM parameters on auth links.
- The full URL is always shown again as text under the button.

**Dark mode**
- Light is the default and the inline style. The `@media (prefers-color-scheme: dark)` block overrides colours through classes: `bg-page`, `bg-card`, `bg-sunken`, `tx`, `tx-m`, `brand`, `lk`, `lk-m`, `bd`, `bd-t`, `btn-a`, `tile`, `dm-hide`, `dm-show`. Add the class to every element whose colour has a dark value.
- Outlook.com does not read the media query: the `[data-ogsc]` (text) and `[data-ogsb]` (background) rules mirror the same overrides.
- Test dark mode in Apple Mail, Gmail (app, forced dark), Outlook for iOS and outlook.com.

**Mobile**
- Under 620px the card padding drops to 36/24 and the headline to 26/32. Buttons stay at least 48px tall; the pill is already 52.

## 6. Variables and rendering

Placeholders are written `{{ .Name }}`, the syntax Supabase Auth templates use, so the three account emails can be pasted into the dashboard as they are. Names:

| Variable | Meaning | Escape |
|---|---|---|
| `ConfirmationURL` | Supabase link for verify, reset and magic link | Supplied by Supabase |
| `Token` | Six-digit one-time code (magic link, optional block) | Digits only |
| `Email` | Recipient address | HTML-escape |
| `InviteURL` | Link to the invitation page | URL as built by the app |
| `InviterName` | Name of the member who invited, up to 60 characters | HTML-escape |
| `WorkspaceName` | The workspace (single invitation), up to 60 characters | HTML-escape |
| `Role` | The role, already translated ("Admin", "Membro", "Mitglied") | HTML-escape |
| `WorkspaceCount` | Number of workspaces (several invitations) | Number |
| `WorkspaceRows` | The workspace list, already built as HTML `<tr>` rows | Built from escaped values (see below) |

**Escape every value that a person typed** (names of people and workspaces). Without escaping, a workspace called `<a href=...>` becomes a link inside a halba email, a phishing risk. Cut names at 60 characters.

**Workspace row.** The invitation emails take their list as pre-built `<tr>` rows, one per workspace, inside the template's `<table>`. Show at most five; if there are more, add one line of text after the list ("and 3 more", "e altri 3", "und 3 weitere") and let the invitation page show all.

```html
<tr><td style="padding:0 0 12px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bd" style="border:1px solid #deded8;border-radius:16px;border-collapse:separate"><tr><td width="52" style="width:52px;padding:12px 0 12px 12px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td class="tile" width="40" height="40" align="center" valign="middle" style="width:40px;height:40px;background:#d4cefb;border-radius:12px;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:18px;line-height:40px;font-weight:700;color:#0e0e10">{{ .Initial }}</td></tr></table></td><td style="padding:12px 16px 12px 12px"><p class="tx" style="margin:0;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;font-weight:700;color:#0e0e10">{{ .Name }}</p><p class="tx-m" style="margin:0;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;color:#5c5c66">{{ .Role }}</p></td></tr></table></td></tr>
```

A minimal renderer for an Edge Function (it is not tied to a provider):

```ts
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export function render(tpl: string, vars: Record<string, string>, raw = ['WorkspaceRows']) {
  return tpl.replace(/\{\{ \.(\w+) \}\}/g, (_, k) => (raw.includes(k) ? (vars[k] ?? '') : esc(vars[k] ?? '')));
}

export const workspaceRows = (rows: { name: string; role: string }[], row: string) =>
  rows.slice(0, 5).map(w => row
    .replace('{{ .Initial }}', esc(Array.from(w.name)[0].toUpperCase()))
    .replace('{{ .Name }}', esc(w.name))
    .replace('{{ .Role }}', esc(w.role))).join('');
```

For the `.txt` twin pass `raw = ['WorkspaceRowsText']` and do not escape. The subject and the preheader come from `email/templates.json` and go through the same `render`.

**Supabase Auth.** The dashboard (Authentication, Email Templates) holds one template per type, in one language. The three account emails use `Confirm signup`, `Reset Password` and `Magic Link`. To send in the person's language (`en`, `it`, `de`), use the Send Email auth hook in an Edge Function that picks `email/<lang>/<template>.html` from the user's locale and sends it with your mail provider. Workspace invitations are product emails, not Supabase's `Invite user` (that one invites someone to the project): send them from your own function with the same files.

## 7. Security and delivery

- **Do not track auth links.** Turn off click tracking and open tracking at the mail provider for these emails. Tracking rewrites the URL (and leaks the token to a third party) and often breaks single-use links.
- **Security scanners open links.** Corporate mail gateways fetch every link before the person does, and a single-use link is then "already used". Make the link open a page of ours with a button (the page confirms on click), or use the one-time code. The magic link template carries both.
- **Tokens.** Single-use, stored hashed, short-lived, never in a subject line, never logged. Expiry in the copy must equal the real expiry. Supabase has one "Email OTP expiration" for all its email types (check Authentication, Providers, Email): if it is one hour, the verify email must say one hour, or generate those links in your own function.
- **Reset must not reveal accounts.** The request page says the same thing whether or not the address exists; send the reset email only when it does.
- **Rate limits.** At most one email per type per address every 60 seconds, and a daily cap per address and per inviter. Invitations: a cap per workspace per day.
- **Sender.** `halba <no-reply@mail.halba.ai>` (or another dedicated sending subdomain), reply-to the support address. Set SPF, DKIM and DMARC on the subdomain before the first send. Keep transactional and marketing mail on separate subdomains.
- **Footer.** Company name and registered address are mandatory; the placeholders `[Company name], [registered address]` must be filled before sending.

## 8. Copy

Sentence case, second person ("you", "tu", "du"), no exclamation marks, no emoji, no "Dear". The headline is the action, the button is the verb. Subjects are at most 60 characters with their variables filled, never contain a token or a link, and say what the email is. Italian uses the informal "tu" and avoids gendered forms; German uses "du".

**English**

| Email | Subject | Preheader | Headline | Button |
|---|---|---|---|---|
| Verify email | Confirm your email address for halba | One click to finish creating your halba account. | Confirm your email address | Confirm email |
| Reset password | Reset your halba password | Choose a new password. The link works for one hour. | Choose a new password | Set new password |
| Magic link | Your halba sign-in link | Sign in with one click. The link works for 15 minutes. | Sign in to halba | Sign in |
| Workspace invitation (one) | {{ .InviterName }} invited you to {{ .WorkspaceName }} on halba | Accept the invitation to start working together. | Join {{ .WorkspaceName }} | Accept invitation |
| Workspace invitations (several) | {{ .InviterName }} invited you to {{ .WorkspaceCount }} workspaces on halba | Review and accept your invitations in one step. | You have invitations to {{ .WorkspaceCount }} workspaces | Review invitations |

**Italian**

| Email | Subject | Preheader | Headline | Button |
|---|---|---|---|---|
| Verify email | Conferma il tuo indirizzo email per halba | Un clic per completare la creazione del tuo account halba. | Conferma il tuo indirizzo email | Conferma email |
| Reset password | Reimposta la password di halba | Scegli una nuova password. Il link è valido per un’ora. | Scegli una nuova password | Imposta nuova password |
| Magic link | Il tuo link di accesso a halba | Accedi con un clic. Il link è valido per 15 minuti. | Accedi a halba | Accedi |
| Workspace invitation (one) | {{ .InviterName }} ti invita in {{ .WorkspaceName }} su halba | Accetta l’invito per iniziare a lavorare insieme. | Entra in {{ .WorkspaceName }} | Accetta l’invito |
| Workspace invitations (several) | {{ .InviterName }} ti invita in {{ .WorkspaceCount }} workspace su halba | Controlla e accetta i tuoi inviti in un solo passaggio. | Hai ricevuto un invito per {{ .WorkspaceCount }} workspace | Controlla gli inviti |

**German**

| Email | Subject | Preheader | Headline | Button |
|---|---|---|---|---|
| Verify email | Bestätige deine E-Mail-Adresse für halba | Ein Klick, um dein halba-Konto fertig einzurichten. | Bestätige deine E-Mail-Adresse | E-Mail bestätigen |
| Reset password | Setze dein halba-Passwort zurück | Wähle ein neues Passwort. Der Link ist eine Stunde gültig. | Wähle ein neues Passwort | Neues Passwort festlegen |
| Magic link | Dein Anmeldelink für halba | Mit einem Klick anmelden. Der Link ist 15 Minuten gültig. | Bei halba anmelden | Anmelden |
| Workspace invitation (one) | {{ .InviterName }} lädt dich zu {{ .WorkspaceName }} bei halba ein | Nimm die Einladung an, um gemeinsam loszulegen. | Tritt {{ .WorkspaceName }} bei | Einladung annehmen |
| Workspace invitations (several) | {{ .InviterName }} lädt dich zu {{ .WorkspaceCount }} Workspaces bei halba ein | Prüfe und nimm deine Einladungen in einem Schritt an. | Du hast Einladungen für {{ .WorkspaceCount }} Workspaces erhalten | Einladungen prüfen |

Full body, safety notes and footers are in the files and in `email/templates.json`.

## 9. Test before every release

1. Send each template, in each language, to Gmail (web, iOS, Android), Apple Mail (macOS, iOS), Outlook (Windows, Mac, new Outlook, outlook.com, iOS) and Yahoo. A rendering service (Litmus, Email on Acid) covers most of these.
2. Check dark mode and 320px width; check with images blocked.
3. Open the plain-text part; make sure the link is on its own line.
4. Click every link; make sure the link does not pass through a tracker.
5. Run a spam check (for example mail-tester) and confirm SPF, DKIM and DMARC pass.
6. Read it with a screen reader: one `<h1>`, the button reads as a link with its label, the logo reads "halba".
7. Check the size of the HTML (under 100 KB) and the longest German string at 320px.

## 10. Files

```
email/
  en/ it/ de/        verify-email, reset-password, magic-link, invite-workspace, invite-workspaces (.html + .txt)
  img/               halba-logo.png, halba-logo-dark.png (216 x 64, 2x)
  templates.json     subjects, preheaders, variables, expiry, the workspace row
  _preview/          the same emails with sample data, in light and dark (for the preview card only)
```

The files are generated from one text source (`ds-scripts/em_gen.py`): change a sentence or a colour there and regenerate, never edit one language by hand.

## 11. Open points

- Registered company name and address for the footer.
- Sending domain and the support address.
- The real expiry of each token; adjust the copy or the backend.
- Where the logo PNGs are hosted (`https://halba.ai/email/`).
- Whether the verify email should also carry a code (the magic link already does).
- More email types (change of address, workspace role change, payment receipts) follow the same anatomy; add them as new files.
