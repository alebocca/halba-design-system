// Catalogo: ogni token, componente e storia del pacchetto, con gli stessi esempi delle preview dell'artifact
// (upstream/components/*/preview.html). Serve a controllare il pacchetto, non è una pagina pubblica.
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles.css";
import "./catalog.css";
import tokens from "../tokens/tokens.json";
import {
  Button, Badge, StatTile, MetricCard, Input, PhotoPanel, OverlayCard, CheckoutStory, RetryStory, RevenueStory,
  StatusBadge, Card, Panel, TextLink, Spinner, Modal, Icon, SegmentedControl, Alert, AuthLayout,
} from "../src/index.js";

const STATUSES = ["approved", "rescued", "challenge", "medium-risk", "declined", "failed", "fraud", "high-risk", "pending", "refunded"];

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="cat-section">
      <div className="hb-type-label-mono cat-eyebrow">{eyebrow}</div>
      <h2 className="hb-type-h2 cat-h2">{title}</h2>
      {children}
    </section>
  );
}

function Spec({ name, note, children }) {
  return (
    <div className="cat-card">
      <div className="cat-card__head">
        <span className="hb-type-h3">{name}</span>
        {note ? <span className="cat-note">{note}</span> : null}
      </div>
      <div className="cat-card__body">{children}</div>
    </div>
  );
}

function Colors() {
  return (
    <div className="cat-swatches">
      {tokens.color.tokens.map((t) => (
        <div key={t.name} className="cat-swatch">
          <div className="cat-swatch__chip" style={{ background: `var(--${t.name})` }} />
          <div className="cat-swatch__name">{t.name}</div>
          <div className="cat-swatch__value">{typeof t.value === "string" ? t.value : `${t.value.light} · ${t.value.dark}`}</div>
          <div className="cat-swatch__usage">{t.usage}</div>
        </div>
      ))}
    </div>
  );
}

function Type() {
  return (
    <div className="cat-type">
      {tokens.type.groups.flatMap((g) =>
        g.styles.map((s) => (
          <div key={s.name} className="cat-type__row">
            <div className="cat-type__meta">
              <span className="cat-swatch__name">{s.name}</span>
              <span className="cat-swatch__value">{s.fontSize}/{s.lineHeight} · {s.fontWeight}</span>
            </div>
            <div className={`hb-type-${s.name} cat-type__sample`}>{s.name === "stat" ? "99.99%" : "Checkout, tuned for growth"}</div>
          </div>
        )),
      )}
    </div>
  );
}

function Scales() {
  return (
    <div className="cat-scales">
      <div>
        <h3 className="hb-type-h3">Spacing</h3>
        {tokens.spacing.tokens.map((t) => (
          <div key={t.name} className="cat-scale">
            <span className="cat-swatch__name">{t.name}</span>
            <span className="cat-scale__bar" style={{ width: `var(--${t.name})` }} />
            <span className="cat-swatch__value">{t.value}</span>
          </div>
        ))}
      </div>
      <div>
        <h3 className="hb-type-h3">Radius and shadow</h3>
        <div className="cat-radii">
          {tokens.radius.tokens.map((t) => (
            <div key={t.name} className="cat-radius" style={{ borderRadius: `var(--${t.name})` }}>
              <span className="cat-swatch__name">{t.name}</span>
              <span className="cat-swatch__value">{t.value}</span>
            </div>
          ))}
          <div className="cat-radius" style={{ boxShadow: "var(--shadow-card)", border: 0 }}>
            <span className="cat-swatch__name">shadow-card</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Copertina dell'artifact (upstream/components/Cover/preview.html), stesso SVG e stesse classi di colore
function Cover() {
  return (
    <div className="cat-cover">
      <svg viewBox="0 0 960 300" aria-hidden="true">
        <rect className="c-brand" x="504" y="24" width="192" height="252" rx="28" />
        <g className="c-tint">
          {[64, 100, 136].flatMap((y) => [540, 576, 612, 648].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="10" />))}
        </g>
        <circle className="c-ink" cx="600" cy="220" r="40" />
        <rect className="c-sun" x="712" y="24" width="112" height="120" rx="20" />
        <rect className="c-accent" x="712" y="160" width="112" height="116" rx="20" />
        <rect className="c-sky" x="840" y="24" width="96" height="252" rx="48" />
        <circle className="c-azure" cx="888" cy="204" r="24" />
        <circle className="c-ground" cx="888" cy="72" r="14" />
        <circle className="c-ground" cx="888" cy="120" r="14" />
      </svg>
      <div className="cat-cover__text">
        <h1 className="cat-cover__name">Halba</h1>
        <p className="cat-cover__tag">Checkout, tuned for growth.</p>
      </div>
    </div>
  );
}

function SegDemo() {
  const [a, setA] = useState("login");
  const [b, setB] = useState("week");
  return (
    <div className="cat-form">
      <SegmentedControl id="seg-a" label="Account" block value={a} onChange={setA} options={[{ value: "login", label: "Login" }, { value: "signup", label: "Sign up" }]} />
      <SegmentedControl id="seg-b" label="Period" tone="brand" value={b} onChange={setB} options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]} />
    </div>
  );
}

function AuthDemo() {
  const [mode, setMode] = useState("login");
  const login = mode === "login";
  const aside = (
    <PhotoPanel network alt="">
      <OverlayCard title="Payment rescued" value="+$89.00" tone="success" float top={48} left={40} />
      <OverlayCard title="Backup route approved" value="Retry 2 of 2" tone="sun" bottom={120} right={40} />
    </PhotoPanel>
  );
  return (
    <div className="cat-auth">
      <AuthLayout aside={aside}>
        <SegmentedControl id="auth" label="Account" block value={mode} onChange={setMode} options={[{ value: "login", label: "Login" }, { value: "signup", label: "Sign up" }]} />
        <h3 className="hb-type-h1" style={{ margin: 0 }}>{login ? "Welcome back" : "Start rescuing payments"}</h3>
        <Input id="cat-email" label="Work email" type="email" />
        <Button size="lg" className="hb-btn--block">{login ? "Log in" : "Create account"}</Button>
      </AuthLayout>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("hb-catalog-theme") || "light"; } catch { return "light"; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("hb-catalog-theme", theme); } catch {}
  }, [theme]);

  return (
    <div className="cat">
      <header className="cat-header">
        <span className="cat-logo">Halba Design System</span>
        <nav className="cat-nav">
          <a href="#tokens">Tokens</a>
          <a href="#components">Components</a>
          <a href="#stories">Stories</a>
        </nav>
        <Button variant="secondary" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "Light theme" : "Dark theme"}
        </Button>
      </header>

      <Cover />

      <Section id="tokens" eyebrow="Foundations" title="Colour">
        <Colors />
      </Section>
      <Section eyebrow="Foundations" title="Type">
        <Type />
      </Section>
      <Section eyebrow="Foundations" title="Spacing and shape">
        <Scales />
      </Section>

      <Section id="components" eyebrow="Components" title="Components">
        <div className="cat-grid">
          <Spec name="Button" note="Variants, sizes, states">
            <div className="cat-row">
              <Button variant="primary" withArrow>Get in touch</Button>
              <Button variant="accent">Start free</Button>
              <Button variant="secondary">View docs</Button>
              <Button variant="ghost">Cancel</Button>
            </div>
            <div className="cat-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button href="#" withArrow>As a link</Button>
            </div>
            <Panel tone="brand">
              <div className="cat-row">
                <Button variant="secondary" withArrow>Get in touch</Button>
                <Button variant="on-brand" href="#">Read the docs</Button>
              </div>
            </Panel>
          </Spec>
          <Spec name="Badge" note="Status tones">
            <div className="cat-row">
              <Badge tone="neutral">Live</Badge>
              <Badge tone="brand">New</Badge>
              <Badge tone="success">Approved</Badge>
              <Badge tone="warning">Challenge</Badge>
              <Badge tone="warning">Medium risk</Badge>
              <Badge tone="danger">KO</Badge>
              <Badge tone="danger">Fraud</Badge>
            </div>
            <div className="cat-row">
              {STATUSES.map((st) => <StatusBadge key={st} status={st} />)}
            </div>
          </Spec>
          <Spec name="Card" note="Default, product, clickable">
            <div className="cat-cards">
              <Card>
                <div className="hb-type-h3">Smart routing</div>
                <p className="cat-muted">Send each payment down the route most likely to approve it.</p>
              </Card>
              <Card variant="product">
                <div className="cat-kv cat-kv--head"><b>Order 1001</b><StatusBadge status="challenge" /></div>
                <div className="cat-kv"><span>Amount</span><span>$89.00</span></div>
                <div className="cat-kv"><span>Risk</span><span>Medium</span></div>
              </Card>
              <Card href="#">
                <div className="hb-type-h3">Clickable card</div>
                <p className="cat-muted">The whole card is the link.</p>
              </Card>
            </div>
          </Spec>
          <Spec name="Panel" note="Flat colour blocks">
            <div className="cat-panels">
              {["brand", "brand-tint", "sky-tint", "sky", "sun", "accent", "ink", "sunken"].map((t) => (
                <Panel key={t} tone={t}><span className="hb-type-label-mono">{t}</span></Panel>
              ))}
            </div>
          </Spec>
          <Spec name="TextLink, Spinner and Icon" note="Links, loading, Lucide icons">
            <div className="cat-row">
              <TextLink href="#">Read the guide</TextLink>
              <TextLink href="#" withArrow>Explore orchestration</TextLink>
              <Spinner label="Loading payments" />
              {["check", "x", "alert", "clock", "undo"].map((n) => <Icon key={n} name={n} />)}
            </div>
          </Spec>
          <Spec name="SegmentedControl" note="Raised and brand">
            <SegDemo />
          </Spec>
          <Spec name="Alert" note="Info, success, warning, danger">
            <div className="cat-form" style={{ gridTemplateColumns: "1fr" }}>
              <Alert tone="info">Test mode is on. Payments here never reach a real card.</Alert>
              <Alert tone="success">Backup route connected. Retries now run on Checkout.com.</Alert>
              <Alert tone="warning">Your 3DS rate dropped to 61% today. Review the challenge rules.</Alert>
              <Alert tone="danger" onDismiss={() => {}}>We could not log you in. Check your email and password.</Alert>
            </div>
          </Spec>
          <Spec name="AuthLayout" note="Sign-in page, form left, graphic right">
            <AuthDemo />
          </Spec>
          <Spec name="Modal" note="Dialog with loading state, contained preview">
            <div className="cat-modal">
              <Modal contained title="Refund €20.00" onClose={() => {}} footer={<><Button variant="secondary">Cancel</Button><Button>Refund</Button></>}>
                <p className="cat-muted">The customer gets the money back in 5–10 days. This cannot be undone.</p>
              </Modal>
            </div>
          </Spec>
          <Spec name="Input" note="Default, hint, error, disabled">
            <div className="cat-form">
              <Input id="a" label="Work email" placeholder="you@company.com" hint="We reply within one working day." />
              <Input id="b" label="Card number" defaultValue="4242 4242" error="Enter a 16-digit card number." />
              <Input id="c" label="Company" defaultValue="Northwind" />
              <Input id="d" label="Region" defaultValue="EU" disabled />
            </div>
          </Spec>
          <Spec name="MetricCard" note="Dashboard metrics">
            <div className="cat-metrics">
              <MetricCard label="Approval rate" value="94.6%" delta="+2.8pp" trend="good" series={[88, 89, 90, 90, 92, 93, 94.6]} />
              <MetricCard label="Decline rate" value="9.4%" delta="+6.2pp" trend="bad" series={[3, 3.2, 3.1, 3.6, 4, 9.4, 5.2]} />
              <MetricCard label="Fees by processor" value="GBP 1,350" delta="Flat" trend="flat" />
            </div>
          </Spec>
          <Spec name="StatTile" note="Proof-number tiles">
            <div className="cat-stats">
              <StatTile tone="accent" value="99.99%" label="Uptime" />
              <StatTile tone="sky" value="+4.2pp" label="Average approval lift" />
              <StatTile tone="lavender" value="120+" label="Payment methods" />
              <StatTile tone="sun" value="3x" label="Faster reconciliation" />
              <StatTile tone="azure" value="45" label="Countries" />
              <StatTile tone="ink" value="24/7" label="Monitoring" />
              <StatTile tone="brand" value="1" label="API call" />
            </div>
          </Spec>
          <Spec name="PhotoPanel and OverlayCard" note="Photo with animated overlays">
            <div className="cat-photo">
              <PhotoPanel network height={460}>
                <OverlayCard title="Refund received!" tone="success" top={28} left={24} />
                <OverlayCard title="Approval rate" value="94.6%" tone="sun" float top={150} right={24} />
                <OverlayCard title="Checkout friction" value="2 conflicts" tone="danger" bottom={56} left={40} />
              </PhotoPanel>
            </div>
          </Spec>
        </div>
      </Section>

      <Section id="stories" eyebrow="Stories" title="Animated stories">
        <div className="cat-stories">
          <Spec name="CheckoutStory" note="Form, three checks, payment OK"><CheckoutStory /></Spec>
          <Spec name="RetryStory" note="Three steps, or two with steps"><RetryStory /><div style={{ height: 24 }} /><RetryStory steps={[{ name: "Primary PSP", result: "declined" }, { name: "Backup PSP", result: "approved" }]} amount="€129.90" /></Spec>
          <Spec name="RevenueStory" note="Revenue counter and bars"><RevenueStory /></Spec>
        </div>
      </Section>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
