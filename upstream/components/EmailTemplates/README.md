# EmailTemplates

The transactional emails halba sends: verify email, reset password, magic link, and workspace invitations (one workspace, or several in one email). Table-based HTML with inline styles, 600px, a bulletproof violet pill button, light and dark, plain-text twins, English, Italian and German.

Not a React component: the files are in `email/<lang>/` and the rules are in `email.md` (anatomy, tokens in hex, HTML rules, variables, security, copy, test list). Variables are written `{{ .Name }}`, the syntax of Supabase Auth templates. Escape every value a person typed.
