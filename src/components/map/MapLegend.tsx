'use client';

import { Tag } from '@/components/ui/Tag';

type FilterMode = 'all' | 'in-person' | 'online';

type MapLegendProps = {
  filterMode: FilterMode;
  onFilterChange: (mode: FilterMode) => void;
};

export function MapLegend({ filterMode, onFilterChange }: MapLegendProps) {
  return (
    <div className="border-3 border-border-hard bg-card-surface p-4 shadow-[4px_4px_0px_#000]">
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
        FILTER BY TYPE
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onFilterChange('all')}
          className={`min-h-[48px] cursor-pointer px-4 py-2 transition-all duration-150 focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 ${
            filterMode === 'all' ? '' : 'opacity-50 hover:opacity-75'
          }`}
          aria-pressed={filterMode === 'all'}
        >
          <Tag variant={filterMode === 'all' ? 'accent' : 'default'}>ALL</Tag>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('in-person')}
          className={`min-h-[48px] cursor-pointer px-4 py-2 transition-all duration-150 focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 ${
            filterMode === 'in-person' ? '' : 'opacity-50 hover:opacity-75'
          }`}
          aria-pressed={filterMode === 'in-person'}
        >
          <Tag variant={filterMode === 'in-person' ? 'filled' : 'default'}>
            IN-PERSON
          </Tag>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('online')}
          className={`min-h-[48px] cursor-pointer px-4 py-2 transition-all duration-150 focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 ${
            filterMode === 'online' ? '' : 'opacity-50 hover:opacity-75'
          }`}
          aria-pressed={filterMode === 'online'}
        >
          <Tag variant={filterMode === 'online' ? 'accent' : 'default'}>
            ONLINE
          </Tag>
        </button>
      </div>

      {/* Legend symbols */}
      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 border-2 border-border-hard bg-cyan" />
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            SERVICE AREA
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 border-2 border-border-hard bg-orange" />
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            SELECTED
          </span>
        </div>
      </div>
    </div>
  );
}
