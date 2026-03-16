import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionDivider } from '@/components/ui/SectionDivider';

export const metadata: Metadata = {
  title: 'Services | Eccentric Iron Fitness',
  description: 'Explore our coaching services — DIY programs, 1-on-1 coaching, and online training across BC.',
};

const services = [
  {
    title: 'DIY PROGRAMS',
    desc: 'Get a structured fat loss or muscle-building plan you can execute on your own. Evidence-based programming, macro targets, and training templates.',
    cta: 'VIEW COACHES →',
    href: '/coaches',
  },
  {
    title: '1-ON-1 COACHING',
    desc: 'Weekly check-ins, personalized programming, nutrition coaching, and accountability from a certified trainer. The fastest path to results.',
    cta: 'FIND YOUR COACH →',
    href: '/coaches',
  },
  {
    title: 'ONLINE TRAINING',
    desc: 'Train with a BCRPA-certified coach from anywhere in British Columbia. Same quality coaching, delivered remotely via video and app.',
    cta: 'EXPLORE MAP →',
    href: '/map',
  },
];

export default function ServicesPage() {
  return (
    <Container as="main" className="py-16">
      <h1 className="text-center font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        OUR SERVICES
      </h1>
      <p className="mt-4 text-center font-body text-lg text-text-secondary">
        Applied hypertrophy and evidence-based nutrition — choose the level of support that fits your goals.
      </p>

      <SectionDivider variant="heavy" />

      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="border-3 border-border-hard bg-card-surface p-6 shadow-[4px_4px_0px_#000]">
            <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">
              {service.title}
            </h2>
            <p className="mt-3 font-body text-sm text-text-secondary">{service.desc}</p>
            <Link
              href={service.href}
              className="mt-6 inline-flex min-h-[40px] items-center border-3 border-border-hard bg-cyan px-4 font-mono text-xs font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
            >
              {service.cta}
            </Link>
          </div>
        ))}
      </div>

      <SectionDivider variant="heavy" />

      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-widest text-text-primary">
          NOT SURE WHERE TO START?
        </h2>
        <p className="mt-3 font-body text-lg text-text-secondary">
          Use our free calculator to get your personalized macro targets, or book a discovery call.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/calculator"
            className="inline-flex min-h-[48px] items-center border-3 border-border-hard bg-cyan px-8 font-mono text-sm font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
          >
            CALCULATE MACROS →
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center border-3 border-border-hard bg-transparent px-8 font-mono text-sm font-medium uppercase tracking-widest text-text-primary shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
          >
            BOOK A CALL →
          </Link>
        </div>
      </div>
    </Container>
  );
}
