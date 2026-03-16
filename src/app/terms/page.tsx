import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Terms of Service | Eccentric Iron Fitness',
  description: 'Terms of service for Eccentric Iron Fitness.',
};

export default function TermsPage() {
  return (
    <Container as="main" className="py-16">
      <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        TERMS OF SERVICE
      </h1>
      <div className="mt-2 h-[3px] w-24 bg-cyan" />
      <div className="mt-8 max-w-3xl space-y-6 font-body text-base leading-relaxed text-text-secondary">
        <p>
          By using the Eccentric Iron Fitness website and services, you agree to the following terms and conditions.
        </p>
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">SERVICES</h2>
        <p>Eccentric Iron Fitness provides personal training, nutrition coaching, and fitness programming services through certified coaches in British Columbia.</p>
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">DISCLAIMER</h2>
        <p>All fitness and nutrition advice is for informational purposes. Consult your healthcare provider before starting any new exercise or nutrition program.</p>
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">PAYMENTS & REFUNDS</h2>
        <p>Payment terms and refund policies are specified in individual coaching agreements between you and your assigned coach.</p>
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">CONTACT</h2>
        <p>Questions about these terms? Contact us at info@eccentricironfitness.com.</p>
        <p className="font-mono text-xs text-text-muted">Last updated: March 2026</p>
      </div>
    </Container>
  );
}
