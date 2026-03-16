'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MapLegend } from '@/components/map/MapLegend';
import { MapCoachPanel } from '@/components/map/MapCoachPanel';
import { MapSearch } from '@/components/map/MapSearch';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Tag } from '@/components/ui/Tag';
import type { ServiceArea } from '@/lib/types';

const MapView = dynamic(
  () => import('@/components/map/MapView').then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[50vh] w-full items-center justify-center border-3 border-border-hard bg-card-surface lg:h-[600px]">
        <p className="font-mono text-sm uppercase tracking-widest text-text-muted">
          LOADING MAP...
        </p>
      </div>
    ),
  }
);

type FilterMode = 'all' | 'in-person' | 'online';

type MapPageClientProps = {
  areas: ServiceArea[];
};

export function MapPageClient({ areas }: MapPageClientProps) {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  const handleAreaSelect = useCallback((area: ServiceArea) => {
    setSelectedArea(area);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedArea(null);
  }, []);

  const handleFilterChange = useCallback((mode: FilterMode) => {
    setFilterMode(mode);
  }, []);

  // Online-only coaches get a separate label
  const hasOnlineCoaches = true; // Always show since online coaching is available BC-wide

  return (
    <div>
      <SectionDivider variant="heavy" />

      {/* Search & Filters Row */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <MapSearch areas={areas} onAreaSelect={handleAreaSelect} />
        <MapLegend filterMode={filterMode} onFilterChange={handleFilterChange} />
      </div>

      {/* Map View */}
      <div className="mt-8">
        <MapView
          areas={areas}
          filterMode={filterMode}
          onAreaSelect={handleAreaSelect}
          selectedAreaId={selectedArea?.id ?? null}
        />
      </div>

      {/* Online coaching banner */}
      {hasOnlineCoaches && (
        <div className="mt-4 border-3 border-border-hard bg-navy p-4 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center gap-3">
            <Tag variant="accent">ONLINE</Tag>
            <p className="font-mono text-sm uppercase tracking-widest text-text-primary">
              ONLINE COACHING AVAILABLE ACROSS BC
            </p>
          </div>
        </div>
      )}

      {/* Coach Discovery Panel */}
      <div className="mt-8">
        <MapCoachPanel selectedArea={selectedArea} onClose={handleClose} />
      </div>
    </div>
  );
}
