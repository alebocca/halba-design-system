// Preset Tailwind 3 per la dashboard (shadcn/ui): le classi shadcn (bg-primary, text-muted-foreground,
// border-input, ring-ring…) leggono direttamente le variabili di tokens/tokens.css.
//
// Uso (tailwind.config.ts):
//   import halba from "@halba/design-system/tailwind-preset";
//   export default { presets: [halba], content: [...] };
// e in src/index.css: @import "@halba/design-system/styles.css"; togliendo il blocco :root/.dark di shadcn
// (le sue variabili HSL --border, --accent, --ring… hanno gli stessi nomi dei token e li sovrascriverebbero).
//
// I token sono esadecimali, non terne HSL: i colori usano color-mix per supportare i modificatori di opacità
// (bg-primary/50). shadcn "accent" è lo sfondo di hover, non l'arancio del brand: l'arancio è bg-hb-accent.

const v = (name) => `color-mix(in srgb, var(--${name}) calc(<alpha-value> * 100%), transparent)`;

const tokenColors = [
  "surface", "surface-raised", "surface-sunken", "ink", "ink-muted", "border", "border-strong",
  "brand", "brand-hover", "on-brand", "on-brand-veil", "brand-tint", "accent", "on-accent", "sky", "on-sky", "sky-tint", "sun", "on-sun",
  "success", "success-tint", "warning", "warning-tint", "danger", "danger-tint", "focus-ring", "scrim",
  "chart-1", "chart-1-line", "chart-2", "chart-2-line", "chart-3", "chart-4",
  "chart-success", "chart-danger", "chart-warning", "chart-neutral",
];

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Nomi shadcn
        border: v("border"),
        input: v("border-strong"),
        ring: v("focus-ring"),
        background: v("surface"),
        foreground: v("ink"),
        primary: { DEFAULT: v("brand"), foreground: v("on-brand") },
        secondary: { DEFAULT: v("surface-sunken"), foreground: v("ink") },
        destructive: { DEFAULT: v("danger"), foreground: v("on-brand") },
        muted: { DEFAULT: v("surface-sunken"), foreground: v("ink-muted") },
        accent: { DEFAULT: v("surface-sunken"), foreground: v("ink") },
        popover: { DEFAULT: v("surface-raised"), foreground: v("ink") },
        card: { DEFAULT: v("surface-raised"), foreground: v("ink") },
        sidebar: {
          DEFAULT: v("surface-raised"),
          foreground: v("ink"),
          primary: v("brand"),
          "primary-foreground": v("on-brand"),
          accent: v("surface-sunken"),
          "accent-foreground": v("ink"),
          border: v("border"),
          ring: v("focus-ring"),
        },
        success: { DEFAULT: v("success"), tint: v("success-tint") },
        warning: { DEFAULT: v("warning"), tint: v("warning-tint") },
        danger: { DEFAULT: v("danger"), tint: v("danger-tint") },
        // Tutti i token del design system, con il loro nome: bg-hb-sun, text-hb-ink-muted, fill-hb-chart-1…
        hb: Object.fromEntries(tokenColors.map((n) => [n, v(n)])),
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      // "shadow-card" collide con il colore shadcn "card" (shadow-<colore>): si usa shadow-hb-card
      boxShadow: { "hb-card": "var(--shadow-card)", "hb-overlay": "var(--shadow-overlay)" },
      spacing: Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => [`space-${n}`, `var(--space-${n})`])),
      maxWidth: { container: "var(--container-max)" },
      fontSize: Object.fromEntries(
        ["display-xl", "display-lg", "stat", "display-xl-sm", "display-lg-sm", "stat-sm", "h1", "h2", "h3", "body-lg", "body", "body-sm", "button", "label-mono"].map((n) => [
          n,
          [`var(--${n})`, { lineHeight: `var(--${n}-line-height)`, fontWeight: `var(--${n}-weight)` }],
        ]),
      ),
    },
  },
};
