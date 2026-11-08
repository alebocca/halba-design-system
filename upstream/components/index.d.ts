export interface ButtonProps {
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
  /** Default "neutral". success = OK, warning = challenge or medium risk, danger = KO, fraud or high risk. Always put a word inside, never colour alone. */
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
  /** Leading icon. success, warning and danger get check, alert and x by default; pass false to hide. */
  icon?: 'check' | 'x' | 'alert' | 'clock' | 'undo' | false;
  children: React.ReactNode;
}

export interface StatTileProps {
  /** The big number, e.g. "99.99%". */
  value: string;
  /** One-line caption under the number. */
  label: string;
  /** Block colour. Default "brand". */
  tone?: 'brand' | 'accent' | 'sky' | 'brand-tint' | 'sun' | 'sky-tint' | 'ink' | 'lavender' | 'azure';
}

export interface MetricCardProps {
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
  /** Panel colour. Each story has its own default. */
  tone?: 'brand' | 'sun' | 'azure';
  /** Small mono label at the top of the panel. */
  eyebrow?: string;
}

export interface CheckoutStoryProps extends StoryBaseProps {
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
  /** The one list of payment and risk states, with fixed word, tone and icon. */
  status: 'approved' | 'rescued' | 'declined' | 'failed' | 'fraud' | 'high-risk' | 'challenge' | 'medium-risk' | 'pending' | 'refunded';
}

export interface CardProps {
  /** "product" adds shadow-card, for mini product cards and mockups. */
  variant?: 'default' | 'product';
  /** href renders a link, onClick a button; either gives the hover and focus states. */
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface PanelProps {
  /** Colour block, named after the tokens. Default "brand-tint". */
  tone?: 'brand' | 'brand-tint' | 'sky-tint' | 'sky' | 'sun' | 'accent' | 'ink' | 'sunken';
  children: React.ReactNode;
}

export interface TextLinkProps {
  href: string;
  /** Adds a trailing arrow, e.g. "Explore orchestration →". */
  withArrow?: boolean;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export interface SpinnerProps {
  /** Text read by screen readers. Default "Loading". */
  label?: string;
}

export interface ModalProps {
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
  name: 'check' | 'x' | 'alert' | 'clock' | 'undo' | 'info' | 'circle-check' | 'circle-x';
  /** Default 20. */
  size?: number;
}

export interface SegmentedControlProps {
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
  /** Form side: a SegmentedControl, heading and form. */
  children: React.ReactNode;
  /** Graphic side, usually a PhotoPanel with OverlayCards. Hidden below 900px and for screen readers. */
  aside?: React.ReactNode;
  /** Wordmark text. Default "Halba". */
  logo?: string;
}

export interface AlertProps {
  /** Default "info". */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** Message text; links inside use TextLink. */
  children: React.ReactNode;
  /** Adds a dismiss button. Alerts are not dismissible by default. */
  onDismiss?: () => void;
  /** Default "alert" for danger and "status" for the others. */
  role?: 'alert' | 'status';
}
