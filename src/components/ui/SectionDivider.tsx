type Variant = 'line' | 'heavy' | 'titled' | 'color-break';

type SectionDividerProps = {
  variant?: Variant;
  title?: string;
  bgColor?: string;
  className?: string;
};

export function SectionDivider({
  variant = 'line',
  title,
  bgColor,
  className = '',
}: SectionDividerProps) {
  if (variant === 'color-break') {
    return (
      <div
        className={`-mx-4 py-16 md:-mx-6 lg:-mx-0 ${className}`}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
        role="separator"
      />
    );
  }

  if (variant === 'titled') {
    return (
      <div className={`py-8 ${className}`} role="separator">
        <h2 className="font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
          {title}
        </h2>
        <div className="mt-2 h-[3px] w-full bg-border-hard" />
      </div>
    );
  }

  return (
    <hr
      className={`border-0 ${
        variant === 'heavy' ? 'my-12 h-[3px] bg-border-hard' : 'my-8 h-px bg-border'
      } ${className}`}
    />
  );
}
