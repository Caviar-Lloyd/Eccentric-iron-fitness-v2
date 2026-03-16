import Link from 'next/link';
import Image from 'next/image';
import { getCoaches } from '@/lib/db/coaches';
import { Container } from '@/components/layout/Container';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Tag } from '@/components/ui/Tag';

export function generateMetadata() {
  return {
    title: 'Eccentric Iron Fitness | Applied Hypertrophy & Evidence-Based Nutrition',
    description:
      'Find your certified personal trainer in BC. Fat loss, body recomposition, and nutrition coaching. Calculate your macros free.',
  };
}

const steps = [
  { num: '01', title: 'FIND YOUR COACH', desc: 'Browse our map or directory to find a certified trainer in your area — or train online province-wide.' },
  { num: '02', title: 'GET YOUR PLAN', desc: 'Use our free TDEE/Macro calculator or book a discovery call to get a plan tailored to your goals.' },
  { num: '03', title: 'START TRAINING', desc: 'Choose DIY programming or 1-on-1 coaching. Evidence-based methods, real results, no BS.' },
];

export default async function Home() {
  const coaches = await getCoaches();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
        {/* Background image */}
        <Image
          src="https://assets.cdn.filesafe.space/z3m4mhravHce78P6jW12/media/02b8549b-a390-4492-8116-b5eb257e2cb0.png"
          alt="Brutalist gym interior with iron plates and cyan accent lighting"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <p className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
          Certified Personal Training
        </p>
        <h1 className="relative z-10 mt-4 font-heading text-5xl font-extrabold uppercase leading-none tracking-tight text-white md:text-7xl lg:text-8xl">
          DEFINE YOUR
          <br />
          <span className="text-cyan">STRENGTH</span>
        </h1>
        <p className="relative z-10 mt-6 max-w-2xl font-body text-lg text-white/80">
          Personal trainers for fat loss, body recomposition, and evidence-based nutrition coaching.
          Online and in-person across British Columbia — calculate your macros, find your coach, start training.
        </p>
        <div className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/map"
            className="inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-cyan px-8 font-mono text-sm font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
          >
            FIND A COACH <span className="ml-2" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/calculator"
            className="inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-transparent px-8 font-mono text-sm font-medium uppercase tracking-widest text-text-primary shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
          >
            CALCULATE MACROS <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <SectionDivider variant="heavy" />

      {/* How It Works */}
      <Container as="section" className="py-16">
        <h2 className="text-center font-heading text-3xl font-bold uppercase tracking-tight text-text-primary md:text-4xl">
          HOW IT WORKS
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="border-3 border-border-hard bg-card-surface p-6 shadow-[4px_4px_0px_#000]">
              <span className="font-mono text-4xl font-extrabold text-cyan">{step.num}</span>
              <h3 className="mt-3 font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-sm text-text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      <SectionDivider variant="heavy" />

      {/* Coach Preview */}
      {coaches.length > 0 && (
        <Container as="section" className="py-16">
          <h2 className="text-center font-heading text-3xl font-bold uppercase tracking-tight text-text-primary md:text-4xl">
            MEET OUR COACHES
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach) => (
              <Link
                key={coach.id}
                href={`/coaches/${coach.slug}`}
                className="group border-3 border-border-hard bg-card-surface shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000]"
              >
                {/* Photo placeholder */}
                <div className="flex h-48 items-center justify-center bg-navy">
                  <span className="font-mono text-4xl font-bold text-white">
                    {coach.first_name[0]}{coach.last_name[0]}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
                    {coach.first_name} {coach.last_name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {coach.specialties.slice(0, 3).map((spec) => (
                      <Tag key={spec} variant="default">{spec}</Tag>
                    ))}
                  </div>
                  <p className="mt-3 line-clamp-2 font-body text-sm text-text-secondary">
                    {coach.bio}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-cyan group-hover:underline">
                    VIEW PROFILE →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <SectionDivider variant="heavy" />

      {/* Calculator CTA Banner */}
      <section className="bg-cyan py-16">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-darker-bg md:text-4xl">
            KNOW YOUR NUMBERS
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-lg text-darker-bg/80">
            Use our free TDEE & Macro calculator to get your personalized nutrition targets.
            Evidence-based formulas, zero fluff.
          </p>
          <Link
            href="/calculator"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-darker-bg px-8 font-mono text-sm font-medium uppercase tracking-widest text-text-primary shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
          >
            CALCULATE NOW <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </Container>
      </section>
    </>
  );
}
