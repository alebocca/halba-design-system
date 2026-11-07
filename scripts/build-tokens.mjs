// Genera tokens/tokens.css e tokens/typography.css da tokens/tokens.json (copia di project/tokens.json
// dell'artifact "Halba Design System"). tokens.json è l'unica fonte: non modificare a mano i CSS generati.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const t = JSON.parse(readFileSync(join(root, "tokens/tokens.json"), "utf8"));
const header = "/* Halba Design System — generated from tokens/tokens.json by scripts/build-tokens.mjs. Do not edit. */\n";

const themes = t.color.themes.map((th) => th.id);
const [first] = themes;
const valueFor = (tok, theme) => (typeof tok.value === "string" ? (theme === first ? tok.value : undefined) : tok.value[theme]);

const light = [];
const dark = [];
for (const tok of t.color.tokens) {
  light.push(`  --${tok.name}: ${valueFor(tok, first)};`);
  const d = valueFor(tok, "dark");
  if (d !== undefined && d !== valueFor(tok, first)) dark.push(`  --${tok.name}: ${d};`);
}
for (const tok of t.shadow?.tokens ?? []) {
  light.push(`  --${tok.name}: ${valueFor(tok, first)};`);
  const d = valueFor(tok, "dark");
  if (d !== undefined) dark.push(`  --${tok.name}: ${d};`);
}

const scalar = [];
scalar.push(`  --font-sans: ${t.type.families.sans};`);
scalar.push(`  --font-mono: ${t.type.families.mono};`);
const typeClasses = [];
for (const group of t.type.groups) {
  for (const s of group.styles) {
    // --<style> è la dimensione (come nel sito); gli altri attributi hanno un suffisso
    scalar.push(`  --${s.name}: ${s.fontSize};`);
    scalar.push(`  --${s.name}-line-height: ${s.lineHeight};`);
    scalar.push(`  --${s.name}-weight: ${s.fontWeight};`);
    if (s.letterSpacing) scalar.push(`  --${s.name}-tracking: ${s.letterSpacing};`);
    const upper = group.family === "mono" ? " text-transform: uppercase;" : "";
    typeClasses.push(
      `.hb-type-${s.name} { font-family: var(--font-${group.family}); font-size: var(--${s.name}); line-height: var(--${s.name}-line-height); font-weight: var(--${s.name}-weight);` +
        (s.letterSpacing ? ` letter-spacing: var(--${s.name}-tracking);` : "") +
        upper +
        " }",
    );
  }
}
for (const fam of ["spacing", "radius"]) for (const tok of t[fam].tokens) scalar.push(`  --${tok.name}: ${tok.value};`);

const css =
  header +
  `:root {\n  color-scheme: light;\n${light.join("\n")}\n\n${scalar.join("\n")}\n}\n\n` +
  `[data-theme="dark"] {\n  color-scheme: dark;\n${dark.join("\n")}\n}\n`;
writeFileSync(join(root, "tokens/tokens.css"), css);
writeFileSync(join(root, "tokens/typography.css"), header + typeClasses.join("\n") + "\n");
console.log(`tokens.css: ${light.length} colori/ombre, ${dark.length} override scuri, ${scalar.length} scalari`);
