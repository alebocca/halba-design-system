/* Halba Design System — generated from upstream/components/index.d.ts by scripts/build-bundle.mjs. Do not edit. */
import type * as React from "react";

export interface ButtonProps {
  className?: string;
  /** Visual style. Default "primary". */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'on-brand';
  /** Default "md" (44px tall). */
  size?: 'sm' | 'md' | 'lg';
  /** Adds a trailing arrow. */
  withArrow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  /** With href the button renders as a link (<a>). */
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export interface BadgeProps {
  className?: string;
  /** Default "neutral". success = OK, warning = challenge or medium risk, danger = KO, fraud or high risk. Always put a word inside, never colour alone. */
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
  /** Leading icon. success, warning and danger get check, alert and x by default; pass false to hide. */
  icon?: 'check' | 'x' | 'alert' | 'clock' | 'undo' | false;
  children: React.ReactNode;
}

export interface StatTileProps {
  className?: string;
  /** The big number, e.g. "99.99%". */
  value: string;
  /** One-line caption under the number. */
  label: string;
  /** Block colour. Default "brand". */
  tone?: 'brand' | 'accent' | 'sky' | 'brand-tint' | 'sun' | 'sky-tint' | 'ink' | 'lavender' | 'azure';
}

export interface MetricCardProps {
  className?: string;
  label: string;
  value: string;
  /** Change versus previous period, e.g. "+2.8pp". */
  delta?: string;
  /** Whether the change is good, bad or neutral for the business. Default "flat". */
  trend?: 'good' | 'bad' | 'flat';
  /** Numbers for the sparkline, oldest first. */
  series?: number[];
}

export interface PhotoPanelProps {
  className?: string;
  /** URL of a real stock photo (Unsplash, Pexels or paid). Omit to show a flat placeholder. */
  image?: string;
  /** Describes the photo for screen readers; use "" if purely decorative. */
  alt?: string;
  /** Minimum height in px. Default 420. */
  height?: number;
  /** Draws the decorative animated network of dotted lines and nodes. */
  network?: boolean;
  /** OverlayCard elements placed over the photo. */
  children?: React.ReactNode;
}

export interface OverlayCardProps {
  className?: string;
  title: string;
  /** Small mono line under the title, e.g. "94.6%". */
  value?: string;
  /** Icon style. Default "success". */
  tone?: 'success' | 'warning' | 'danger' | 'sun';
  /** Gently bobs up and down. */
  float?: boolean;
  /** Position inside the PhotoPanel, CSS lengths or numbers. */
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

export interface StoryBaseProps {
  className?: string;
  /** Panel colour. Each story has its own default. */
  tone?: 'brand' | 'sun' | 'azure';
  /** Small mono label at the top of the panel. */
  eyebrow?: string;
}

export interface CheckoutStoryProps extends StoryBaseProps {
  className?: string;
  /** Merchant name shown on the form. Default "Northwind". */
  merchant?: string;
  /** Amount to pay, formatted. Default "$89.00". */
  amount?: string;
  /** Wording of the three checks once done (past tense) and while waiting. */
  check1?: string;
  check2?: string;
  check3?: string;
  check1Wait?: string;
  check2Wait?: string;
  check3Wait?: string;
}

export interface RetryStoryProps extends StoryBaseProps {
  className?: string;
  /** 2 or 3 attempts in order; the last one should be approved. Overrides first, second and backup. */
  steps?: { name: string; result: 'declined' | 'approved' }[];
  /** Three-step default: names of the two processors that decline and of the backup route that approves. */
  first?: string;
  second?: string;
  backup?: string;
  /** Rescued amount, formatted. Default "$89.00". */
  amount?: string;
}

export interface RevenueStoryProps extends StoryBaseProps {
  className?: string;
  /** Final value of the counter. Default 225237. */
  target?: number;
  /** Counter caption. Default "Rescued revenue". */
  label?: string;
  /** Bars per month: a is the lead series (azure), b the second (violet), in thousands. */
  series?: { m: string; a: number; b: number }[];
  /** Axis maximum in thousands. Default 800. */
  max?: number;
  legendA?: string;
  legendB?: string;
}

export interface InputProps {
  className?: string;
  label: string;
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  /** Error message; replaces the hint and turns the border red. */
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StatusBadgeProps {
  className?: string;
  /** The one list of payment and risk states, with fixed word, tone and icon. */
  status: 'approved' | 'rescued' | 'declined' | 'failed' | 'fraud' | 'high-risk' | 'challenge' | 'medium-risk' | 'pending' | 'refunded';
}

export interface CardProps {
  className?: string;
  /** "product" adds shadow-card, for mini product cards and mockups. */
  variant?: 'default' | 'product';
  /** href renders a link, onClick a button; either gives the hover and focus states. */
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface PanelProps {
  className?: string;
  /** Colour block, named after the tokens. Default "brand-tint". */
  tone?: 'brand' | 'brand-tint' | 'sky-tint' | 'sky' | 'sun' | 'accent' | 'ink' | 'sunken';
  children: React.ReactNode;
}

export interface TextLinkProps {
  className?: string;
  href: string;
  /** Adds a trailing arrow, e.g. "Explore orchestration →". */
  withArrow?: boolean;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export interface LogoProps {
  className?: string;
  /** mark: the ring and dot only. lockup: the mark with the word "halba", always lowercase. Default mark. */
  variant?: 'mark' | 'lockup';
  /** default: ring ink, dot brand. mono: one colour (currentColor). on-brand: on-brand colour on a brand block. */
  tone?: 'default' | 'mono' | 'on-brand';
  /** Mark height in px: 16, 24, 32 or 48. Default 32. */
  size?: number;
  /** Accessible name of the mark on its own. Default "halba". */
  label?: string;
  className?: string;
}

export interface SpinnerProps {
  className?: string;
  /** Text read by screen readers. Default "Loading". */
  label?: string;
  /** orbit: ring turns and stretches, for short waits. compose: the dot appears and the ring closes around it, for full pages. Default orbit. */
  variant?: 'orbit' | 'compose';
  /** Height in px. Default 24. */
  size?: number;
  /** mono draws both parts in the current text colour. */
  tone?: 'default' | 'mono';
  className?: string;
}

export interface ModalProps {
  className?: string;
  title: string;
  /** Default true. */
  open?: boolean;
  /** Shows the close button and enables Esc and backdrop click. */
  onClose?: () => void;
  /** Actions, right-aligned; put the primary button last. */
  footer?: React.ReactNode;
  /** Shows a spinner over the body while content such as an iframe loads. */
  loading?: boolean;
  loadingLabel?: string;
  /** Use role alertdialog, for confirmations. */
  confirm?: boolean;
  size?: 'md' | 'lg';
  /** Fill the nearest positioned parent instead of the window (previews). */
  contained?: boolean;
  id?: string;
  children?: React.ReactNode;
}

export interface IconProps {
  className?: string;
  name: 'check' | 'x' | 'alert' | 'clock' | 'undo' | 'info' | 'circle-check' | 'circle-x' | 'search' | 'copy' | 'menu' | 'chevron-right' | 'chevron-down' | 'wifi' | 'wifi-off' | 'plug' | 'upload' | 'image' | 'play';
  /** Default 20. */
  size?: number;
}

export interface SegmentedControlProps {
  className?: string;
  /** Options in order; the selected one is the one whose value equals `value`. */
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name of the group, e.g. "Account". */
  label: string;
  /** Selected option fill: "raised" (surface-raised with ink text, default) or "brand". */
  tone?: 'raised' | 'brand';
  /** Stretch to the full width, options sharing it equally. */
  block?: boolean;
  /** Set it when the control switches a panel: it then renders as tabs and that panel needs role tabpanel and aria-labelledby `<id>-<value>`. Without it the control is a radiogroup, for a setting such as Test | Live. */
  panelId?: string;
  id?: string;
}

export interface AuthLayoutProps {
  className?: string;
  /** Form side: a SegmentedControl, heading and form. */
  children: React.ReactNode;
  /** Graphic side, usually a PhotoPanel with OverlayCards. Hidden below 900px and for screen readers. */
  aside?: React.ReactNode;
  /** Wordmark text. Default "Halba". */
  logo?: string;
}

export interface AlertProps {
  className?: string;
  /** Default "info". */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** Message text; links inside use TextLink. */
  children: React.ReactNode;
  /** Adds a dismiss button. Alerts are not dismissible by default. */
  onDismiss?: () => void;
  /** Default "alert" for danger and "status" for the others. */
  role?: 'alert' | 'status';
}

export type ChartTone = 'success' | 'danger' | 'warning' | 'neutral' | 'azure' | 'violet' | 'sky';

export interface PieChartProps {
  className?: string;
  /** Slices in order; slices with value 0 stay in the legend. At most four or five. */
  data: { label: string; value: number; /** Default by position: success, danger, azure, warning, neutral. */ tone?: ChartTone }[];
  /** Accessible name of the chart. */
  label: string;
  /** Full pie instead of a donut. Default true (donut). */
  donut?: boolean;
  /** Small caption under the total in the donut centre, e.g. "payments". */
  totalLabel?: string;
  /** Formats the values. Default thousands separators. */
  format?: (n: number) => string;
}

export interface BarChartProps {
  className?: string;
  /** One entry per bar; `values` has one number per series. */
  data: { label: string; values: number[] }[];
  series?: { name: string; tone?: ChartTone }[];
  /** Stack the series (default) or place them side by side. */
  stacked?: boolean;
  /** Plot height in px. Default 220. */
  height?: number;
  /** Axis maximum; default rounded up from the data. */
  max?: number;
  /** Write each bar's value above it. Default true. */
  showValues?: boolean;
  legend?: boolean;
  label?: string;
  format?: (n: number) => string;
}

export interface MethodBadgeProps {
  className?: string; /** HTTP method, any case. */ method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; className?: string; }
export interface EndpointProps {
  className?: string; method: MethodBadgeProps['method']; /** Path or URL; write parameters in braces. */ path: string; className?: string; }

export interface CodeBlockProps {
  className?: string;
  /** One sample. Use `tabs` for several languages. */
  code?: string;
  tabs?: { label: string; code: string }[];
  /** Uppercase mono label for a single block, e.g. "Response 201". */
  title?: string;
  /** Accessible name of the language tabs. */
  label?: string;
  /** Default true. Pass false for terminal output. */
  highlight?: boolean;
  /** Show the Copy button. Default true. */
  copy?: boolean;
  id?: string;
  className?: string;
}

export interface TabsProps {
  className?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  /** Id of the tab panel; tabs get ids `<id>-<value>`. */
  panelId?: string;
  id?: string;
  className?: string;
}

export interface TableProps {
  className?: string;
  columns: { key: string; label: string; mono?: boolean; header?: boolean; width?: string }[];
  rows: Record<string, React.ReactNode>[];
  label?: string;
  /** Read by screen readers. */
  caption?: string;
  className?: string;
}

export interface CalloutProps {
  className?: string;
  /** Default "note". */
  tone?: 'note' | 'tip' | 'warning' | 'danger';
  /** Replaces the default word (Note, Tip, Warning, Important). */
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface DocsHeaderProps {
  className?: string;
  breadcrumb?: { label: string; href?: string }[];
  title: string;
  lead?: string;
  /** Usually an Endpoint. */
  children?: React.ReactNode;
  className?: string;
}

export interface DocsSearchProps {
  className?: string;
  onClick?: () => void;
  placeholder?: string;
  /** Accessible name. Default "Search the docs". */
  label?: string;
  /** Shortcut hint; false hides it. Default "Ctrl K". */
  shortcut?: string | false;
  className?: string;
}

export interface DocsLayoutProps {
  className?: string;
  nav: { title: string; items: { label: string; href: string; current?: boolean }[] }[];
  /** "On this page" links; hidden under 1100px. */
  toc?: { label: string; href: string; current?: boolean }[];
  section?: string;
  logo?: React.ReactNode;
  search?: React.ReactNode;
  tools?: React.ReactNode;
  mainId?: string;
  children: React.ReactNode;
  className?: string;
}

export declare function MethodBadge(props: MethodBadgeProps): React.ReactElement | null;
export declare function Endpoint(props: EndpointProps): React.ReactElement | null;
export declare function CodeBlock(props: CodeBlockProps): React.ReactElement | null;
export declare function Tabs(props: TabsProps): React.ReactElement | null;
export declare function Table(props: TableProps): React.ReactElement | null;
export declare function Callout(props: CalloutProps): React.ReactElement | null;
export declare function DocsHeader(props: DocsHeaderProps): React.ReactElement | null;
export declare function DocsSearch(props: DocsSearchProps): React.ReactElement | null;
export declare function DocsLayout(props: DocsLayoutProps): React.ReactElement | null;

export interface TerminalStatusProps {
  className?: string; status: 'online' | 'offline' | 'power'; /** e.g. "12 min"; shown as "Offline for 12 min" */ since?: string; className?: string; }
export declare function TerminalStatus(props: TerminalStatusProps): React.ReactElement | null;

export interface TerminalFrameProps {
  className?: string; /** Screen width in px; height follows 9:16. Default 180 */ width?: number; /** Overlay the reserved bands (72 dp top and bottom) and the 24 dp side margins */ guides?: boolean; label?: string; children?: React.ReactNode; className?: string; }
export declare function TerminalFrame(props: TerminalFrameProps): React.ReactElement | null;

export interface IdleScreenFile {
  className?: string; name: string; kind: 'image' | 'video'; size: number; type?: string; width?: number; height?: number; duration?: number; src?: string; }
export interface IdleScreenUploadProps {
  className?: string;
  scope?: 'workspace' | 'store'; storeName?: string; /** store scope only: no own file, the workspace one is used */ usesWorkspace?: boolean;
  file?: IdleScreenFile | null; /** validation messages produced by the dashboard */ errors?: string[];
  distribution?: { done: number; total: number; failed?: number };
  onPick?: (file: File) => void; onRemove?: () => void; onUseWorkspace?: () => void; className?: string;
}
export declare function IdleScreenUpload(props: IdleScreenUploadProps): React.ReactElement | null;

export interface StaffPinProps {
  className?: string; isSet?: boolean; storeName?: string; /** show the "saved" confirmation */ saved?: boolean; onSave?: (pin: string) => void; className?: string; }
export declare function StaffPin(props: StaffPinProps): React.ReactElement | null;

export interface ShareBarProps {
  className?: string;
  /** Parts of a whole, few (two to five). Tone default by position: success, warning, danger, neutral. */
  data: { label: string; value: number; /** Second line under the label */ hint?: string; tone?: 'success' | 'warning' | 'danger' | 'neutral' | 'azure' | 'violet' }[];
  /** Accessible name of the bar. */
  label?: string;
  format?: (n: number) => string;
  className?: string;
}
export declare function ShareBar(props: ShareBarProps): React.ReactElement | null;

export interface PaymentFlowStep {
  className?: string;
  title: string; sub?: string; time?: string;
  /** Default neutral. */
  status?: 'success' | 'danger' | 'warning' | 'neutral' | 'brand';
  /** Word on the arrow that leads to this step, e.g. "declined, next route". */
  via?: string;
  icon?: IconProps['name'];
  meta?: { k: string; v: string }[];
}
export interface PaymentFlowProps {
  className?: string;
  steps: PaymentFlowStep[];
  /** One sentence at the top that says what happened. */
  summary?: { title: string; text?: string; tone?: 'success' | 'danger' | 'warning' | 'neutral' };
  label?: string;
  className?: string;
}
export declare function PaymentFlow(props: PaymentFlowProps): React.ReactElement | null;

export interface DrawerProps {
  className?: string;
  title: string; subtitle?: string;
  /** Default true. */
  open?: boolean; onClose?: () => void;
  footer?: React.ReactNode;
  /** Fill the nearest positioned parent instead of the window (previews). */
  contained?: boolean; id?: string; className?: string;
  children?: React.ReactNode;
}
export declare function Drawer(props: DrawerProps): React.ReactElement | null;

export declare function Button(props: ButtonProps): React.ReactElement | null;
export declare function Badge(props: BadgeProps): React.ReactElement | null;
export declare function StatTile(props: StatTileProps): React.ReactElement | null;
export declare function MetricCard(props: MetricCardProps): React.ReactElement | null;
export declare function Input(props: InputProps): React.ReactElement | null;
export declare function PhotoPanel(props: PhotoPanelProps): React.ReactElement | null;
export declare function OverlayCard(props: OverlayCardProps): React.ReactElement | null;
export declare function CheckoutStory(props: CheckoutStoryProps): React.ReactElement | null;
export declare function RetryStory(props: RetryStoryProps): React.ReactElement | null;
export declare function RevenueStory(props: RevenueStoryProps): React.ReactElement | null;
export declare function StatusBadge(props: StatusBadgeProps): React.ReactElement | null;
export declare function Card(props: CardProps): React.ReactElement | null;
export declare function Panel(props: PanelProps): React.ReactElement | null;
export declare function TextLink(props: TextLinkProps): React.ReactElement | null;
export declare function Logo(props: LogoProps): React.ReactElement | null;
export declare function Spinner(props: SpinnerProps): React.ReactElement | null;
export declare function Modal(props: ModalProps): React.ReactElement | null;
export declare function Icon(props: IconProps): React.ReactElement | null;
export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement | null;
export declare function Alert(props: AlertProps): React.ReactElement | null;
export declare function PieChart(props: PieChartProps): React.ReactElement | null;
export declare function BarChart(props: BarChartProps): React.ReactElement | null;
export declare function AuthLayout(props: AuthLayoutProps): React.ReactElement | null;
export declare function MethodBadge(props: MethodBadgeProps): React.ReactElement | null;
export declare function Endpoint(props: EndpointProps): React.ReactElement | null;
export declare function CodeBlock(props: CodeBlockProps): React.ReactElement | null;
export declare function Tabs(props: TabsProps): React.ReactElement | null;
export declare function Table(props: TableProps): React.ReactElement | null;
export declare function Callout(props: CalloutProps): React.ReactElement | null;
export declare function DocsHeader(props: DocsHeaderProps): React.ReactElement | null;
export declare function DocsSearch(props: DocsSearchProps): React.ReactElement | null;
export declare function DocsLayout(props: DocsLayoutProps): React.ReactElement | null;
export declare function TerminalStatus(props: TerminalStatusProps): React.ReactElement | null;
export declare function TerminalFrame(props: TerminalFrameProps): React.ReactElement | null;
export declare function IdleScreenUpload(props: IdleScreenUploadProps): React.ReactElement | null;
export declare function StaffPin(props: StaffPinProps): React.ReactElement | null;
export declare function ShareBar(props: ShareBarProps): React.ReactElement | null;
export declare function PaymentFlow(props: PaymentFlowProps): React.ReactElement | null;
export declare function Drawer(props: DrawerProps): React.ReactElement | null;
