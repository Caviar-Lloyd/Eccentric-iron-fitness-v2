import type { Testimonial } from '@/lib/types';

type Variant = 'full' | 'compact' | 'placeholder';

type TestimonialCardProps = {
  testimonial?: Testimonial;
  variant?: Variant;
  className?: string;
};

export function TestimonialCard({
  testimonial,
  variant = 'full',
  className = '',
}: TestimonialCardProps) {
  if (variant === 'placeholder' || !testimonial) {
    return (
      <div
        className={`border-2 border-dashed border-border bg-card-surface p-6 ${className}`}
      >
        <p className="font-mono text-sm uppercase tracking-widest text-text-muted">
          TESTIMONIAL COMING SOON
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`border-l-3 border-cyan bg-card-surface p-4 ${className}`}>
        <p className="font-body text-sm italic text-text-secondary">
          &ldquo;{testimonial.quote.length > 120
            ? `${testimonial.quote.slice(0, 120)}...`
            : testimonial.quote}&rdquo;
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          — {testimonial.client_name}
        </p>
      </div>
    );
  }

  return (
    <div className={`border-l-3 border-cyan bg-card-surface p-6 ${className}`}>
      {/* Decorative quote mark */}
      <span className="font-heading text-5xl leading-none text-navy" aria-hidden="true">
        &ldquo;
      </span>

      <blockquote className="-mt-4">
        <p className="font-body text-base italic leading-relaxed text-text-secondary">
          {testimonial.quote}
        </p>
      </blockquote>

      {testimonial.result_summary && (
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-cyan">
          {testimonial.result_summary}
        </p>
      )}

      <footer className="mt-4">
        <p className="font-mono text-sm uppercase tracking-widest text-text-primary">
          — {testimonial.client_name}
        </p>
        {testimonial.client_location && (
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
            {testimonial.client_location}
          </p>
        )}
      </footer>
    </div>
  );
}
