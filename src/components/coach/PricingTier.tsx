import type { ServiceTier } from '@/lib/types';

type Variant = 'standard' | 'highlighted' | 'standalone';

type PricingTierProps = {
  tier: ServiceTier;
  variant?: Variant;
  foundingRateRemaining?: number | null;
  className?: string;
};

function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

const priceTypeLabels: Record<ServiceTier['price_type'], string> = {
  one_time: 'one-time',
  monthly: '/month',
  per_session: '/session',
};

export function PricingTier({
  tier,
  variant = 'standard',
  foundingRateRemaining,
  className = '',
}: PricingTierProps) {
  const isHighlighted = variant === 'highlighted' || tier.is_featured;

  return (
    <div
      className={`flex flex-col ${
        isHighlighted
          ? 'border-4 border-border-hard shadow-[6px_6px_0px_#000]'
          : 'border-3 border-border-hard shadow-[4px_4px_0px_#000]'
      } bg-card-surface ${className}`}
    >
      {/* Cyan accent bar for highlighted */}
      {isHighlighted && <div className="h-1.5 bg-cyan" />}

      <div className="flex flex-1 flex-col p-6">
        {/* Scarcity badge */}
        {foundingRateRemaining != null && foundingRateRemaining > 0 && (
          <div className="mb-4 inline-block self-start bg-orange px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-white">
            ONLY {foundingRateRemaining} FOUNDING SPOTS LEFT
          </div>
        )}

        {/* Tier name */}
        <h3 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">
          {tier.name}
        </h3>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-heading text-4xl font-extrabold text-text-primary">
            {formatPrice(tier.price_cents)}
          </span>
          <span className="font-mono text-sm text-text-secondary">
            {priceTypeLabels[tier.price_type]}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 font-body text-sm text-text-secondary">{tier.description}</p>

        {/* Features */}
        {tier.features.length > 0 && (
          <ul className="mt-5 flex flex-col gap-2">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 font-body text-sm text-text-primary">
                <span className="mt-0.5 text-cyan" aria-hidden="true">▪</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Exclusions */}
        {tier.exclusions.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {tier.exclusions.map((exclusion) => (
              <li key={exclusion} className="flex items-start gap-2 font-body text-sm text-text-muted">
                <span className="mt-0.5" aria-hidden="true">✗</span>
                {exclusion}
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-auto pt-6">
          <a
            href={tier.cta_url}
            className={`flex min-h-[48px] w-full items-center justify-center border-3 border-border-hard font-mono text-sm font-medium uppercase tracking-widest shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none ${
              isHighlighted
                ? 'bg-cyan text-darker-bg'
                : 'bg-transparent text-text-primary'
            }`}
          >
            {tier.cta_label}
          </a>
        </div>
      </div>
    </div>
  );
}
