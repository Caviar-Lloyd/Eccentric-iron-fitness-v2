import type { Metadata } from 'next';
import { getCoaches } from '@/lib/db/coaches';
import { supabase } from '@/lib/supabase';
import { Container } from '@/components/layout/Container';
import { CoachCard } from '@/components/coach/CoachCard';

export const metadata: Metadata = {
  title: 'Our Coaches | Eccentric Iron Fitness',
  description:
    'Browse our certified personal trainers across BC. Fat loss, body recomposition, nutrition coaching — find the right fit for your goals.',
};

export default async function CoachDirectoryPage() {
  const coaches = await getCoaches();

  // Fetch lowest active tier price per coach
  const { data: tiers } = await supabase
    .from('service_tiers')
    .select('coach_id, price_cents')
    .eq('is_active', true)
    .order('price_cents', { ascending: true });

  const startingPrices: Record<string, number> = {};
  for (const tier of tiers ?? []) {
    if (!(tier.coach_id in startingPrices)) {
      startingPrices[tier.coach_id] = tier.price_cents;
    }
  }

  if (coaches.length === 0) {
    return (
      <Container as="main" className="py-16 text-center">
        <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
          OUR COACHES
        </h1>
        <p className="mt-6 font-body text-lg text-text-secondary">
          No coaches available at the moment. Check back soon.
        </p>
      </Container>
    );
  }

  return (
    <Container as="main" className="py-16">
      <h1 className="text-center font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        OUR COACHES
      </h1>
      <p className="mt-4 text-center font-body text-lg text-text-secondary">
        BCRPA-certified trainers across British Columbia. Find the right fit for your goals.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {coaches.map((coach, index) => (
          <CoachCard
            key={coach.id}
            coach={coach}
            variant={index === 0 ? 'featured' : 'compact'}
            startingPrice={startingPrices[coach.id]}
          />
        ))}
      </div>
    </Container>
  );
}
