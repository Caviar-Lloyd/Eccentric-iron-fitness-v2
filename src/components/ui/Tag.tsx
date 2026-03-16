type Variant = 'default' | 'filled' | 'accent';

type TagProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<Variant, string> = {
  default: 'border-2 border-border-hard bg-transparent text-text-primary',
  filled: 'bg-navy text-white',
  accent: 'bg-cyan text-darker-bg',
};

export function Tag({ variant = 'default', children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block px-3 py-1 font-mono text-xs font-medium uppercase tracking-widest ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
