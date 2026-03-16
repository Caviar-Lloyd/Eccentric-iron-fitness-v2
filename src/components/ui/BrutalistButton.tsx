import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'inverse' | 'ghost';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-cyan text-darker-bg border-3 border-border-hard shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none',
  secondary:
    'bg-transparent text-text-primary border-3 border-border-hard shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none',
  inverse:
    'bg-navy text-white border-3 border-border-hard shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none',
  ghost:
    'bg-transparent text-text-primary border-0 underline-offset-4 hover:underline',
};

const base =
  'inline-flex items-center justify-center font-mono text-sm font-medium uppercase tracking-widest min-h-[48px] px-6 transition-all duration-150 ease-in-out cursor-pointer focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 disabled:grayscale disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_#000]';

type ButtonProps = {
  variant?: Variant;
  showArrow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = {
  variant?: Variant;
  showArrow?: boolean;
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export function BrutalistButton({
  variant = 'primary',
  showArrow = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && <span className="ml-2" aria-hidden="true">→</span>}
    </button>
  );
}

export function BrutalistLinkButton({
  variant = 'primary',
  showArrow = false,
  className = '',
  children,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={`${base} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && <span className="ml-2" aria-hidden="true">→</span>}
    </a>
  );
}
