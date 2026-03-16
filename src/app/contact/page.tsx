import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { getCoaches } from '@/lib/db/coaches';
import { ContactFormClient } from './ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact Us | Eccentric Iron Fitness',
  description:
    'Get in touch with Eccentric Iron Fitness. Ask about coaching, nutrition programming, or anything else. We respond within 24 hours.',
};

export default async function ContactPage() {
  const coaches = await getCoaches();

  return (
    <Container as="section" className="py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-cyan">
          CONTACT
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold uppercase tracking-widest text-text-primary md:text-5xl">
          GET IN TOUCH
        </h1>
        <p className="mt-4 font-body text-base leading-relaxed text-text-secondary md:text-lg">
          Have a question about coaching, nutrition, or training? Drop us a line
          and we will get back to you within 24 hours.
        </p>
      </div>

      <SectionDivider variant="heavy" />

      {/* Contact form */}
      <div className="mt-8 max-w-2xl">
        <ContactFormClient
          coaches={coaches.map((c) => ({
            id: c.id,
            name: `${c.first_name} ${c.last_name}`,
          }))}
        />
      </div>
    </Container>
  );
}
