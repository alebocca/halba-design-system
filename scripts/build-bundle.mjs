// Genera src/bundle.js, src/components.css e src/index.d.ts dai file dell'artifact copiati in upstream/.
// Il bundle originale è uno script classico (window.React → window.Halba): qui diventa un modulo ES con
// queste sole modifiche, ognuna verificata (se una non si applica lo script si ferma):
//   1. React importato invece di window.React, export invece di window.Halba;
//   2. reducedMotion() non tocca window lato server (Astro, SSR);
//   3. le storie partono dallo stato finale (progress 1): il render lato server, senza JavaScript e con
//      prefers-reduced-motion mostra il risultato; quando la storia entra in vista l'animazione riparte da 0.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const up = (p) => readFileSync(join(root, "upstream/components", p), "utf8");
let js = up("bundle.js");

function replaceOnce(label, from, to) {
  const n = typeof from === "string" ? js.split(from).length - 1 : (js.match(new RegExp(from, "g")) || []).length;
  if (n !== 1) throw new Error(`build-bundle: "${label}" trovato ${n} volte invece di 1: il bundle dell'artifact è cambiato, aggiornare lo script`);
  js = js.replace(from, to);
}

const meta = JSON.parse(js.match(/@ds-bundle: (\{.*\}) \*\//)[1]);
const names = meta.components.map((c) => c.name);

replaceOnce("apertura IIFE", /\(function \(\) \{\n  var React = window\.React;\n/, "");
replaceOnce("chiusura IIFE", /\n\}\)\(\);\s*$/, "\n");
replaceOnce("window.Halba", /\n  window\.Halba = \{[^}]*\};/, `\n  export { ${names.join(", ")} };`);
replaceOnce(
  "reducedMotion",
  "return !!(window.matchMedia && window.matchMedia(",
  "return !!(typeof window !== 'undefined' && window.matchMedia && window.matchMedia(",
);
replaceOnce(
  "useProgress",
  /  function useProgress\(ref, duration, hold\) \{[\s\S]*?\n    return prog;\n  \}\n/,
  `  function useProgress(ref, duration, hold) {
    var inView = useInView(ref);
    var s = React.useState(1);
    var prog = s[0], setProg = s[1];
    React.useEffect(function () {
      if (reducedMotion()) { setProg(1); return; }
      if (!inView) return;
      var start = null, raf;
      function frame(ts) {
        if (start === null) start = ts;
        var el = ts - start;
        if (el >= duration + hold) { start = ts; el = 0; }
        setProg(Math.min(1, el / duration));
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
      return function () { cancelAnimationFrame(raf); };
    }, [inView, duration, hold]);
    return prog;
  }
`,
);

const header = "/* Halba Design System — generated from upstream/components/bundle.js by scripts/build-bundle.mjs. Do not edit. */\n";
writeFileSync(join(root, "src/bundle.js"), header + 'import * as React from "react";\n' + js);
writeFileSync(join(root, "src/components.css"), header + up("bundle.css"));

// Tipi: quelli dell'artifact, più className su ogni interfaccia e la dichiarazione di ogni componente
let dts = up("index.d.ts").replace(/^export interface (\w+)( extends \w+)? \{/gm, "export interface $1$2 {\n  className?: string;");
dts += "\n" + names.map((n) => `export declare function ${n}(props: ${n}Props): React.ReactElement | null;`).join("\n") + "\n";
writeFileSync(join(root, "src/index.d.ts"), header.replace("bundle.js", "index.d.ts") + 'import type * as React from "react";\n\n' + dts);
console.log(`bundle: ${names.length} componenti (${names.join(", ")})`);
