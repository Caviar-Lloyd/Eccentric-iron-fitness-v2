import Link from 'next/link';
import Image from 'next/image';
import type { Coach } from '@/lib/types';
import { Tag } from '@/components/ui/Tag';

type Variant = 'featured' | 'compact' | 'minimal';

type CoachCardProps = {
  coach: Coach;
  variant?: Variant;
  startingPrice?: number;
  className?: string;
};

function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

export function CoachCard({
  coach,
  variant = 'compact',
  startingPrice,
  className = '',
}: CoachCardProps) {
  if (variant === 'minimal') {
    return (
      <Link
        href={`/coaches/${coach.slug}`}
        className={`group block p-3 transition-colors duration-150 hover:bg-card-surface ${className}`}
      >
        <p className="font-mono text-sm uppercase tracking-widest text-text-primary group-hover:text-cyan">
          {coach.first_name} {coach.last_name}
        </p>
        <p className="font-body text-xs text-text-muted">
          {coach.specialties[0]}
        </p>
      </Link>
    );
  }

  const isFeatured = variant === 'featured';

  return (
    <Link
      href={`/coaches/${coach.slug}`}
      className={`group flex flex-col border-3 border-border-hard bg-card-surface shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] ${
        isFeatured ? 'md:flex-row' : ''
      } ${className}`}
    >
      {/* Photo or placeholder */}
      <div
        className={`flex items-center justify-center bg-navy ${
          isFeatured ? 'h-48 md:h-auto md:w-64' : 'h-40'
        }`}
      >
        {coach.photo_url ? (
          <Image
            src={coach.photo_url}
            alt={`Photo of ${coach.first_name} ${coach.last_name}`}
            width={isFeatured ? 256 : 400}
            height={isFeatured ? 320 : 160}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-mono text-4xl font-bold text-white">
            {coach.first_name[0]}{coach.last_name[0]}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
          {coach.first_name} {coach.last_name}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {coach.is_online && <Tag variant="accent">ONLINE</Tag>}
          {coach.is_in_person && <Tag variant="filled">IN-PERSON</Tag>}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {coach.specialties.slice(0, 3).map((spec) => (
            <Tag key={spec} variant="default">{spec}</Tag>
          ))}
        </div>

        {isFeatured && (
          <p className="mt-3 line-clamp-2 font-body text-sm text-text-secondary">
            {coach.bio}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          {startingPrice != null && (
            <span className="font-heading text-lg font-bold text-text-primary">
              FROM {formatPrice(startingPrice)}
            </span>
          )}
          <span className="font-mono text-xs uppercase tracking-widest text-cyan group-hover:underline">
            VIEW PROFILE →
          </span>
        </div>
      </div>
    </Link>
  );
}
