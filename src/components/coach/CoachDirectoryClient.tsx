'use client';

import { useState } from 'react';
import type { Coach } from '@/lib/types';
import { CoachCard } from '@/components/coach/CoachCard';

type GenderFilter = 'all' | 'male' | 'female';

type CoachDirectoryClientProps = {
  coaches: Coach[];
  startingPrices: Record<string, number>;
};

export function CoachDirectoryClient({ coaches, startingPrices }: CoachDirectoryClientProps) {
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');

  const filtered = genderFilter === 'all'
    ? coaches
    : coaches.filter((c) => c.gender === genderFilter);

  return (
    <>
      {/* Gender Filter Toggle */}
      <div className="mt-8 flex justify-center gap-2">
        {(['all', 'male', 'female'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setGenderFilter(mode)}
            className={`min-h-[40px] border-3 border-border-hard px-5 font-mono text-xs font-medium uppercase tracking-widest transition-all duration-150 ${
              genderFilter === mode
                ? 'bg-cyan text-darker-bg shadow-[4px_4px_0px_#000]'
                : 'bg-card-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            {mode === 'all' ? 'ALL' : mode === 'male' ? 'MALE TRAINERS' : 'FEMALE TRAINERS'}
          </button>
        ))}
      </div>

      {/* Coach Grid */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((coach, index) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              variant={index === 0 ? 'featured' : 'compact'}
              startingPrice={startingPrices[coach.id]}
            />
          ))
        ) : (
          <p className="col-span-2 text-center font-body text-lg text-text-secondary">
            No coaches match this filter. Check back soon.
          </p>
        )}
      </div>
    </>
  );
}
