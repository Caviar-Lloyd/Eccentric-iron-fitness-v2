import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy | Eccentric Iron Fitness',
  description: 'Privacy policy for Eccentric Iron Fitness.',
};

export default function PrivacyPage() {
  return (
    <Container as="main" className="py-16">
      <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        PRIVACY POLICY
      </h1>
      <div className="mt-2 h-[3px] w-24 bg-cyan" />
      <div className="mt-8 max-w-3xl space-y-6 font-body text-base leading-relaxed text-text-secondary">
        <p>
          Eccentric Iron Fitness (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
        </p>
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">INFORMATION WE COLLECT</h2>
        <p>We collect information you provide directly, including your email address when using our calculator or contact form, and any details you share during coaching consultations.</p>
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">HOW WE USE YOUR INFORMATION</h2>
        <p>Your information is used to provide coaching services, send relevant communications, and improve our platform. We do not sell your personal data to third parties.</p>
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">DATA STORAGE</h2>
        <p>Your data is stored securely using Supabase (PostgreSQL) with row-level security policies. We use GoHighLevel for CRM and email communications.</p>
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">CONTACT US</h2>
        <p>If you have questions about this privacy policy, contact us at info@eccentricironfitness.com.</p>
        <p className="font-mono text-xs text-text-muted">Last updated: March 2026</p>
      </div>
    </Container>
  );
}
