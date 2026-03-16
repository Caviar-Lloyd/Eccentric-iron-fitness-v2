import type { Metadata } from 'next';
import { getServiceAreas } from '@/lib/db/areas';
import { Container } from '@/components/layout/Container';
import { MapPageClient } from '@/components/map/MapPageClient';

export const metadata: Metadata = {
  title: 'Find a Coach | Eccentric Iron Fitness',
  description:
    'Find a certified personal trainer near you in British Columbia. Browse our interactive map to discover in-person and online coaching options.',
};

export default async function MapPage() {
  const areas = await getServiceAreas();

  return (
    <Container as="section" className="py-16">
      {/* Page Header */}
      <h1 className="text-center font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        FIND A COACH
      </h1>
      <p className="mt-4 text-center font-body text-lg text-text-secondary">
        Explore British Columbia to find certified personal trainers in your area.
      </p>

      {/* Client-side interactive section */}
      <MapPageClient areas={areas} />
    </Container>
  );
}
