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

export interface SpinnerProps {
  className?: string;
  /** Text read by screen readers. Default "Loading". */
  label?: string;
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
  name: 'check' | 'x' | 'alert' | 'clock' | 'undo';
  /** Default 20. */
  size?: number;
}

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
export declare function Spinner(props: SpinnerProps): React.ReactElement | null;
export declare function Modal(props: ModalProps): React.ReactElement | null;
export declare function Icon(props: IconProps): React.ReactElement | null;
