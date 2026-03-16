import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { CalculatorPageClient } from './CalculatorPageClient';

export const metadata: Metadata = {
  title: 'TDEE & Macro Calculator | Eccentric Iron Fitness',
  description:
    'Calculate your Total Daily Energy Expenditure and personalized macro breakdown for fat loss, maintenance, or lean bulk. Free evidence-based calculator from Eccentric Iron Fitness.',
};

export default function CalculatorPage() {
  return (
    <Container as="section" className="py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-cyan">
          FREE TOOL
        </p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold uppercase tracking-widest text-text-primary md:text-5xl">
          TDEE & MACRO CALCULATOR
        </h1>
        <p className="mt-4 font-body text-base leading-relaxed text-text-secondary md:text-lg">
          Get your personalized calorie and macro targets using the Mifflin-St
          Jeor equation. Whether you are cutting, maintaining, or building, these
          numbers give you an evidence-based starting point.
        </p>
      </div>

      <SectionDivider variant="heavy" />

      {/* Client-side calculator flow */}
      <CalculatorPageClient />
    </Container>
  );
}
