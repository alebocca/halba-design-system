// Tipi dei componenti: upstream/components/index.d.ts dell'artifact, più className e le dichiarazioni delle funzioni.
import type * as React from "react";

export interface ButtonProps {
  className?: string;
  /** Visual style. Default "primary". */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  /** Default "md" (44px tall). */
  size?: 'sm' | 'md' | 'lg';
  /** Adds a trailing arrow. */
  withArrow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: React.ReactNode;
}

export interface BadgeProps {
  className?: string;
  /** Default "neutral". success = OK, warning = challenge or medium risk, danger = KO, fraud or high risk. Always put a word inside, never colour alone. */
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
}

export interface StatTileProps {
  className?: string;
  /** The big number, e.g. "99.99%". */
  value: string;
  /** One-line caption under the number. */
  label: string;
  /** Block colour. Default "brand". */
  tone?: 'brand' | 'accent' | 'sky' | 'lavender' | 'sun' | 'azure' | 'ink';
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
  /** Names of the first and second processor that decline, and of the backup route that approves. */
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

export declare function Button(props: ButtonProps): React.ReactElement;
export declare function Badge(props: BadgeProps): React.ReactElement;
export declare function StatTile(props: StatTileProps): React.ReactElement;
export declare function MetricCard(props: MetricCardProps): React.ReactElement;
export declare function Input(props: InputProps): React.ReactElement;
export declare function PhotoPanel(props: PhotoPanelProps): React.ReactElement;
export declare function OverlayCard(props: OverlayCardProps): React.ReactElement;
export declare function CheckoutStory(props: CheckoutStoryProps): React.ReactElement;
export declare function RetryStory(props: RetryStoryProps): React.ReactElement;
export declare function RevenueStory(props: RevenueStoryProps): React.ReactElement;
