// Font della pagina di pagamento: scarica da npm i pacchetti Fontsource (licenza SIL OFL 1.1) e scrive in
// checkout/fonts/ i sottoinsiemi latin e latin-ext, un foglio @font-face per font e il catalogo fonts.json.
// Nessuna richiesta a Google Fonts dalla pagina: i file li serve halba (CSP rigida, niente dati a terzi).
//
//   node scripts/build-checkout-fonts.mjs
//
// Il catalogo (fonts.json) lo leggono l'orchestratore (schema del tema, file serviti) e la dashboard (editor).
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const SERIF = 'Georgia, "Iowan Old Style", "Times New Roman", serif';

// id, nome, pacchetto, categoria; static: pesi dei font senza versione variabile
const FONTS = [
  ["inter", "Inter", "inter", "sans"],
  ["roboto", "Roboto", "roboto", "sans"],
  ["open_sans", "Open Sans", "open-sans", "sans"],
  ["lato", "Lato", "lato", "sans", [400, 700]],
  ["montserrat", "Montserrat", "montserrat", "sans"],
  ["poppins", "Poppins", "poppins", "sans", [400, 500, 600, 700]],
  ["nunito", "Nunito", "nunito", "sans"],
  ["raleway", "Raleway", "raleway", "sans"],
  ["work_sans", "Work Sans", "work-sans", "sans"],
  ["dm_sans", "DM Sans", "dm-sans", "sans"],
  ["manrope", "Manrope", "manrope", "sans"],
  ["plus_jakarta_sans", "Plus Jakarta Sans", "plus-jakarta-sans", "sans"],
  ["source_sans_3", "Source Sans 3", "source-sans-3", "sans"],
  ["ibm_plex_sans", "IBM Plex Sans", "ibm-plex-sans", "sans"],
  ["figtree", "Figtree", "figtree", "sans"],
  ["rubik", "Rubik", "rubik", "sans"],
  ["noto_sans", "Noto Sans", "noto-sans", "sans"],
  ["lora", "Lora", "lora", "serif"],
  ["merriweather", "Merriweather", "merriweather", "serif"],
  ["playfair_display", "Playfair Display", "playfair-display", "serif"],
  ["source_serif_4", "Source Serif 4", "source-serif-4", "serif"],
  ["eb_garamond", "EB Garamond", "eb-garamond", "serif"],
];

const out = new URL("../checkout/fonts/", import.meta.url).pathname;
const tmp = mkdtempSync(join(tmpdir(), "halba-fonts-"));
const ranges = (css, subset) => css.match(new RegExp(`/\\* [a-z0-9-]+-${subset}-(?:wght|400)-normal \\*/[\\s\\S]*?unicode-range: ([^;]+);`))?.[1];

// Font di sistema e serif: nessun file
const catalog = [
  { id: "system", label: "System", category: "sans", stack: SANS, files: [] },
  { id: "serif", label: "Serif (Georgia)", category: "serif", stack: SERIF, files: [] },
];
try {
  for (const [id, label, pkg, category, weights] of FONTS) {
    const name = weights ? `@fontsource/${pkg}` : `@fontsource-variable/${pkg}`;
    const tgz = execFileSync("npm", ["pack", "-q", name], { cwd: tmp, encoding: "utf8" }).trim().split("\n").pop();
    const dir = join(tmp, id);
    execFileSync("mkdir", ["-p", dir]);
    execFileSync("tar", ["xzf", join(tmp, tgz), "-C", dir]);
    const p = join(dir, "package");
    const css = readFileSync(join(p, weights ? "400.css" : "wght.css"), "utf8");
    const slug = id === "inter" ? "Inter" : pkg; // file di Inter già nel pacchetto (halba-checkout-fonts.css)
    const faces = [];
    const files = [];
    for (const subset of ["latin-ext", "latin"]) {
      const range = ranges(css, subset);
      if (!range) throw new Error(`${id}: unicode-range ${subset} non trovato`);
      for (const w of weights ?? ["wght"]) {
        const src = `${pkg}-${subset}-${w}-normal.woff2`;
        const file = weights ? `${slug}-${subset}-${w}.woff2` : `${slug}-${subset}.woff2`;
        copyFileSync(join(p, "files", src), join(out, file));
        files.push(file);
        faces.push(`@font-face {\n  font-family: "${label}";\n  font-style: normal;\n  font-weight: ${weights ? w : "100 900"};\n  font-display: swap;\n  src: url("./${file}") format("woff2");\n  unicode-range: ${range};\n}`);
      }
    }
    const license = readdirSync(p).find((f) => /^licen[cs]e/i.test(f));
    if (license) copyFileSync(join(p, license), join(out, `${slug}-OFL.txt`));
    writeFileSync(join(out, `${slug}.css`), `/* ${label}, licensed under the SIL Open Font License 1.1 (${slug}-OFL.txt). Served by halba: no external font request. */\n${faces.join("\n")}\n`);
    catalog.push({ id, label, category, stack: `"${label}", ${category === "serif" ? SERIF : SANS}`, css: `${slug}.css`, files: [...files, `${slug}.css`, `${slug}-OFL.txt`] });
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
writeFileSync(join(out, "fonts.json"), JSON.stringify(catalog, null, 2) + "\n");
console.log(`${catalog.length} font in ${out}`);
