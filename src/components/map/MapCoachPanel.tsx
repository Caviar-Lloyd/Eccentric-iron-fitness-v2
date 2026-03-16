'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CoachCard } from '@/components/coach/CoachCard';
import { BrutalistLinkButton } from '@/components/ui/BrutalistButton';
import { Tag } from '@/components/ui/Tag';
import type { ServiceArea, Coach } from '@/lib/types';
import { supabase } from '@/lib/supabase';

type MapCoachPanelProps = {
  selectedArea: ServiceArea | null;
  onClose: () => void;
};

export function MapCoachPanel({ selectedArea, onClose }: MapCoachPanelProps) {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedArea) {
      setCoaches([]);
      return;
    }

    let cancelled = false;

    async function fetchCoaches(areaId: string) {
      setLoading(true);
      try {
        // Fetch coach IDs linked to this area
        const { data: links } = await supabase
          .from('coach_service_areas')
          .select('coach_id')
          .eq('service_area_id', areaId);

        if (!links || links.length === 0) {
          if (!cancelled) {
            setCoaches([]);
            setLoading(false);
          }
          return;
        }

        const coachIds = links.map((l) => l.coach_id);
        const { data } = await supabase
          .from('coaches')
          .select('*')
          .in('id', coachIds)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (!cancelled) {
          setCoaches((data as Coach[]) ?? []);
        }
      } catch {
        if (!cancelled) {
          setCoaches([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCoaches(selectedArea.id);

    return () => {
      cancelled = true;
    };
  }, [selectedArea]);

  if (!selectedArea) return null;

  return (
    <>
      {/* Desktop panel */}
      <div className="hidden lg:block">
        <DesktopPanel
          area={selectedArea}
          coaches={coaches}
          loading={loading}
          onClose={onClose}
        />
      </div>

      {/* Mobile slide-up panel */}
      <div className="lg:hidden">
        <AnimatePresence>
          {selectedArea && (
            <MobilePanel
              area={selectedArea}
              coaches={coaches}
              loading={loading}
              onClose={onClose}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

type PanelContentProps = {
  area: ServiceArea;
  coaches: Coach[];
  loading: boolean;
  onClose: () => void;
};

function DesktopPanel({ area, coaches, loading, onClose }: PanelContentProps) {
  return (
    <div className="border-3 border-border-hard bg-card-surface p-6 shadow-[4px_4px_0px_#000]">
      <PanelContent area={area} coaches={coaches} loading={loading} onClose={onClose} />
    </div>
  );
}

function MobilePanel({ area, coaches, loading, onClose }: PanelContentProps) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto border-t-3 border-border-hard bg-card-surface p-6 shadow-[0_-4px_0px_#000]"
    >
      <PanelContent area={area} coaches={coaches} loading={loading} onClose={onClose} />
    </motion.div>
  );
}

function PanelContent({ area, coaches, loading, onClose }: PanelContentProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-text-primary">
            {area.name.toUpperCase()}
          </h2>
          <Tag variant="default" className="mt-2">
            {area.province.toUpperCase()}
          </Tag>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[48px] min-w-[48px] cursor-pointer border-3 border-border-hard bg-transparent p-2 font-mono text-xl text-text-primary transition-all duration-150 hover:bg-navy focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
          aria-label="Close panel"
        >
          X
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="mt-6">
          <p className="font-mono text-sm uppercase tracking-widest text-text-muted">
            LOADING COACHES...
          </p>
        </div>
      )}

      {/* Coach cards */}
      {!loading && coaches.length > 0 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} variant="compact" />
          ))}
        </div>
      )}

      {/* No coaches fallback */}
      {!loading && coaches.length === 0 && (
        <div className="mt-6">
          <p className="font-body text-sm text-text-secondary">
            No in-person coaches are currently available in {area.name}. Check out our
            online coaching options instead.
          </p>
          <BrutalistLinkButton
            href="/coaches"
            variant="primary"
            showArrow
            className="mt-4"
          >
            BROWSE ONLINE COACHES
          </BrutalistLinkButton>
        </div>
      )}

      {/* Area page link */}
      {!loading && (
        <div className="mt-6 border-t-2 border-border pt-4">
          <Link
            href={`/areas/${area.slug}`}
            className="font-mono text-sm uppercase tracking-widest text-cyan transition-colors duration-150 hover:text-text-primary hover:underline focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
          >
            VIEW {area.name.toUpperCase()} AREA PAGE →
          </Link>
        </div>
      )}
    </div>
  );
}
