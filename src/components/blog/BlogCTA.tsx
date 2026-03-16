import Link from 'next/link';

type BlogCTAProps = {
  variant: 'compact' | 'full';
  className?: string;
};

export function BlogCTA({ variant, className = '' }: BlogCTAProps) {
  if (variant === 'compact') {
    return (
      <div className={`my-8 border-3 border-border-hard bg-card-surface p-6 shadow-[4px_4px_0px_#000] ${className}`}>
        <p className="font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
          KNOW YOUR NUMBERS
        </p>
        <p className="mt-2 font-body text-sm text-text-secondary">
          Calculate your TDEE and macros in 30 seconds — free, evidence-based, no BS.
        </p>
        <Link
          href="/calculator"
          className="mt-4 inline-flex min-h-[40px] items-center border-3 border-border-hard bg-cyan px-5 font-mono text-xs font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
        >
          CALCULATE MACROS →
        </Link>
      </div>
    );
  }

  return (
    <div className={`mt-12 border-3 border-border-hard bg-darker-bg p-8 shadow-[4px_4px_0px_#000] ${className}`}>
      <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-text-primary">
        WHAT&apos;S NEXT?
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link
          href="/calculator"
          className="flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-cyan px-4 font-mono text-xs font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
        >
          CALCULATE MACROS →
        </Link>
        <Link
          href="/coaches"
          className="flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-transparent px-4 font-mono text-xs font-medium uppercase tracking-widest text-text-primary shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
        >
          FIND A COACH →
        </Link>
        <Link
          href="/contact"
          className="flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-navy px-4 font-mono text-xs font-medium uppercase tracking-widest text-white shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
        >
          BOOK A CALL →
        </Link>
      </div>
    </div>
  );
}
