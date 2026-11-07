// Componenti statici del design system, portati da upstream/components/bundle.js con le minime modifiche
// (React importato invece di window.React). Nessuno stato né effetti: si rendono lato server senza JavaScript.
import * as React from "react";

const h = React.createElement;

export function cx() {
  return Array.prototype.slice.call(arguments).filter(Boolean).join(" ");
}

export function Button(p) {
  var variant = p.variant || "primary";
  var size = p.size || "md";
  return h(
    "button",
    {
      type: p.type || "button",
      disabled: p.disabled,
      onClick: p.onClick,
      className: cx("hb-btn", "hb-btn--" + variant, "hb-btn--" + size, p.className),
    },
    p.children,
    p.withArrow ? h("span", { className: "hb-btn__arrow", "aria-hidden": "true" }, "→") : null,
  );
}

export function Badge(p) {
  return h("span", { className: cx("hb-badge", "hb-badge--" + (p.tone || "neutral"), p.className) }, p.children);
}

export function StatTile(p) {
  return h(
    "div",
    { className: cx("hb-stat", "hb-stat--" + (p.tone || "brand"), p.className) },
    h("div", { className: "hb-stat__value" }, p.value),
    h("div", { className: "hb-stat__label" }, p.label),
  );
}

function Sparkline(p) {
  var values = p.values || [];
  var w = 240,
    ht = 64,
    pad = 4;
  if (values.length < 2) return null;
  var min = Math.min.apply(null, values);
  var max = Math.max.apply(null, values);
  var span = max - min || 1;
  var pts = values.map(function (v, i) {
    var x = pad + (i * (w - 2 * pad)) / (values.length - 1);
    var y = ht - pad - ((v - min) / span) * (ht - 2 * pad);
    return [x, y];
  });
  var line = pts.map(function (q, i) { return (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); }).join(" ");
  var area = line + " L" + pts[pts.length - 1][0].toFixed(1) + " " + ht + " L" + pts[0][0].toFixed(1) + " " + ht + " Z";
  var last = pts[pts.length - 1];
  return h(
    "svg",
    { className: "hb-spark", viewBox: "0 0 " + w + " " + ht, role: "img", "aria-label": p.label || "Trend" },
    h("path", { className: "hb-spark__area", d: area }),
    h("path", { className: "hb-spark__line", d: line, fill: "none", pathLength: 1 }),
    h("circle", { className: "hb-spark__dot", cx: last[0], cy: last[1], r: 4 }),
  );
}

export function MetricCard(p) {
  var trend = p.trend || "flat";
  var tone = trend === "good" ? "success" : trend === "bad" ? "danger" : "neutral";
  return h(
    "div",
    { className: cx("hb-metric", p.className) },
    h(
      "div",
      { className: "hb-metric__head" },
      h("span", { className: "hb-metric__label" }, p.label),
      p.delta ? h(Badge, { tone: tone }, p.delta) : null,
    ),
    h("div", { className: "hb-metric__value" }, p.value),
    p.series ? h(Sparkline, { values: p.series, label: p.label + " trend" }) : null,
  );
}

export function Input(p) {
  var id = p.id || p.name || "hb-input";
  var describedBy = p.error ? id + "-error" : p.hint ? id + "-hint" : undefined;
  return h(
    "div",
    { className: cx("hb-field", p.error ? "hb-field--error" : "", p.className) },
    h("label", { className: "hb-field__label", htmlFor: id }, p.label),
    h("input", {
      id: id,
      name: p.name,
      type: p.type || "text",
      value: p.value,
      defaultValue: p.defaultValue,
      placeholder: p.placeholder,
      disabled: p.disabled,
      onChange: p.onChange,
      className: "hb-field__input",
      "aria-invalid": p.error ? "true" : undefined,
      "aria-describedby": describedBy,
    }),
    p.error
      ? h("div", { id: id + "-error", className: "hb-field__error" }, p.error)
      : p.hint
        ? h("div", { id: id + "-hint", className: "hb-field__hint" }, p.hint)
        : null,
  );
}

export function OverlayCard(p) {
  var pos = {};
  ["top", "left", "right", "bottom"].forEach(function (k) {
    if (p[k] !== undefined) pos[k] = p[k];
  });
  var tone = p.tone || "success";
  return h(
    "div",
    { className: cx("hb-overlay", p.float ? "hb-overlay--float" : "", p.className), style: pos },
    h("span", { className: "hb-overlay__icon hb-overlay__icon--" + tone, "aria-hidden": "true" }, tone === "danger" ? "✕" : tone === "warning" ? "!" : "✓"),
    h(
      "div",
      null,
      h("div", { className: "hb-overlay__title" }, p.title),
      p.value ? h("div", { className: "hb-overlay__value" }, p.value) : null,
    ),
  );
}

function Network() {
  var nodes = [[60, 80], [180, 140], [320, 90], [340, 250], [120, 300], [250, 330]];
  var links = [[0, 1], [1, 2], [1, 3], [1, 4], [3, 5]];
  return h(
    "svg",
    { className: "hb-net", viewBox: "0 0 400 400", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true" },
    links.map(function (l, i) {
      return h("line", { key: "l" + i, className: "hb-net__line", x1: nodes[l[0]][0], y1: nodes[l[0]][1], x2: nodes[l[1]][0], y2: nodes[l[1]][1] });
    }),
    nodes.map(function (n, i) {
      return h("circle", { key: "n" + i, className: cx("hb-net__node", i === 1 ? "hb-net__node--live" : ""), cx: n[0], cy: n[1], r: i === 1 ? 9 : 6 });
    }),
  );
}

export function PhotoPanel(p) {
  return h(
    "div",
    {
      className: cx("hb-photo", p.image ? "" : "hb-photo--empty", p.className),
      style: p.height ? { minHeight: p.height } : undefined,
    },
    p.image ? h("img", { className: "hb-photo__img", src: p.image, alt: p.alt || "" }) : h("span", { className: "hb-photo__slot" }, "Stock photo"),
    p.network ? h(Network) : null,
    p.children,
  );
}
