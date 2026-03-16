import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getCoaches, getCoachWithRelations } from '@/lib/db/coaches';
import { Container } from '@/components/layout/Container';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Tag } from '@/components/ui/Tag';
import { PricingTier } from '@/components/coach/PricingTier';
import { TestimonialCard } from '@/components/coach/TestimonialCard';
import { CoachSubNav } from '@/components/coach/CoachSubNav';
import { BookingDrawer } from '@/components/coach/BookingDrawer';
import { ProgressGallery } from '@/components/coach/ProgressGallery';
import Link from 'next/link';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const coaches = await getCoaches();
  return coaches.map((coach) => ({ slug: coach.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const coach = await getCoachWithRelations(slug);
  if (!coach) return {};

  return {
    title: `${coach.first_name} ${coach.last_name} | Eccentric Iron Fitness`,
    description: `${coach.specialties.slice(0, 3).join(', ')} — ${coach.bio.slice(0, 150)}...`,
  };
}

export default async function CoachProfilePage({ params }: Props) {
  const { slug } = await params;
  const coach = await getCoachWithRelations(slug);

  if (!coach) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <Container className="py-3">
        <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-widest text-text-muted">
          <Link href="/" className="hover:text-text-secondary">Home</Link>
          <span className="mx-2" aria-hidden="true">&gt;</span>
          <Link href="/coaches" className="hover:text-text-secondary">Coaches</Link>
          <span className="mx-2" aria-hidden="true">&gt;</span>
          <span className="text-text-secondary">{coach.first_name} {coach.last_name}</span>
        </nav>
      </Container>

      {/* Sub-nav */}
      <CoachSubNav />

      {/* Hero */}
      <section className="bg-darker-bg py-16">
        <Container className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          {/* Photo / Video or placeholder */}
          <div className="shrink-0 overflow-hidden border-3 border-border-hard bg-navy shadow-[4px_4px_0px_#000]">
            {coach.photo_url?.endsWith('.mp4') ? (
              <video
                src={coach.photo_url}
                autoPlay
                loop
                muted
                playsInline
                className="w-64 md:w-80"
                aria-label={`Video of ${coach.first_name} ${coach.last_name}`}
              />
            ) : coach.photo_url ? (
              <Image
                src={coach.photo_url}
                alt={`Photo of ${coach.first_name} ${coach.last_name}`}
                width={320}
                height={480}
                className="w-64 md:w-80"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
                <span className="font-mono text-6xl font-bold text-white">
                  {coach.first_name[0]}{coach.last_name[0]}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
              {coach.first_name} {coach.last_name}
            </h1>

            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              {coach.is_online && <Tag variant="accent">ONLINE</Tag>}
              {coach.is_in_person && <Tag variant="filled">IN-PERSON</Tag>}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {coach.specialties.map((spec) => (
                <Tag key={spec} variant="filled">{spec}</Tag>
              ))}
            </div>

            {coach.certifications.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                {coach.certifications.map((cert) => (
                  <Tag key={cert} variant="default">{cert}</Tag>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Progress Photos */}
      {coach.progress_photos.length > 0 && (
        <>
          <SectionDivider variant="heavy" />
          <Container as="section" className="py-12" id="progress">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-text-primary md:text-3xl">
              PERSONAL PROGRESS
            </h2>
            <div className="mt-2 h-[3px] w-24 bg-cyan" />
            <div className="mt-8">
              <ProgressGallery photos={coach.progress_photos} />
            </div>
          </Container>
        </>
      )}

      <SectionDivider variant="heavy" />

      {/* About */}
      <Container as="section" className="py-12" id="about">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-text-primary md:text-3xl">
          ABOUT
        </h2>
        <div className="mt-2 h-[3px] w-24 bg-cyan" />
        <div className="mt-6 max-w-3xl space-y-4">
          {coach.bio.split('\n').filter(Boolean).map((paragraph, i) => (
            <p key={i} className="font-body text-base leading-relaxed text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>

      <SectionDivider variant="line" />

      {/* Approach */}
      <Container as="section" className="py-12" id="approach">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-text-primary md:text-3xl">
          APPROACH
        </h2>
        <div className="mt-2 h-[3px] w-24 bg-cyan" />
        <div className="mt-6 max-w-3xl space-y-4">
          {coach.approach.split('\n').filter(Boolean).map((paragraph, i) => (
            <p key={i} className="font-body text-base leading-relaxed text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>

      {/* Testimonials */}
      <SectionDivider variant="line" />
      <Container as="section" className="py-12" id="testimonials">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-text-primary md:text-3xl">
          TESTIMONIALS
        </h2>
        <div className="mt-2 h-[3px] w-24 bg-cyan" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {coach.testimonials.length > 0 ? (
            [...coach.testimonials]
              .sort((a, b) => {
                if (a.is_featured && !b.is_featured) return -1;
                if (!a.is_featured && b.is_featured) return 1;
                return a.sort_order - b.sort_order;
              })
              .map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  variant={testimonial.is_featured ? 'full' : 'compact'}
                />
              ))
          ) : (
            <TestimonialCard variant="placeholder" />
          )}
        </div>
      </Container>

      {/* Pricing */}
      {coach.service_tiers.length > 0 && (
        <>
          <SectionDivider variant="heavy" />
          <Container as="section" className="py-12" id="pricing">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-text-primary md:text-3xl">
              SERVICES & PRICING
            </h2>
            <div className="mt-2 h-[3px] w-24 bg-cyan" />
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {[...coach.service_tiers]
                .sort((a, b) => {
                  if (a.is_featured && !b.is_featured) return -1;
                  if (!a.is_featured && b.is_featured) return 1;
                  return a.sort_order - b.sort_order;
                })
                .map((tier) => (
                  <PricingTier
                    key={tier.id}
                    tier={tier}
                    variant={tier.is_featured ? 'highlighted' : 'standard'}
                    foundingRateRemaining={coach.founding_rate_remaining}
                  />
                ))}
            </div>
          </Container>
        </>
      )}

      {/* Booking CTA */}
      <SectionDivider variant="heavy" />
      <section className="bg-darker-bg py-16" id="book">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-text-primary md:text-4xl">
            READY TO START?
          </h2>
          <div className="mx-auto mt-3 flex justify-center gap-3">
            {coach.is_online && <Tag variant="accent">ONLINE COACHING</Tag>}
            {coach.is_in_person && <Tag variant="filled">IN-PERSON TRAINING</Tag>}
          </div>
          <p className="mx-auto mt-4 max-w-lg font-body text-lg text-text-secondary">
            Book a free discovery call with {coach.first_name} to discuss your goals and find the right plan.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookingDrawer
              coachId={coach.id}
              coachName={`${coach.first_name} ${coach.last_name}`}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
