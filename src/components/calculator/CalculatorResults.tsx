'use client';

import Link from 'next/link';
import { MacroBar } from '@/components/calculator/MacroBar';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { BrutalistLinkButton } from '@/components/ui/BrutalistButton';
import type { MacroResult } from '@/lib/calculator';

type CalculatorResultsProps = {
  results: MacroResult;
};

const FRAMEWORK_STEPS = [
  {
    step: '01',
    title: 'COOK',
    description:
      'Prep your meals using whole foods. Weigh ingredients raw for accuracy. Batch cooking saves time and keeps you consistent.',
  },
  {
    step: '02',
    title: 'MEASURE',
    description:
      'Track your portions against your macro targets. A food scale and a tracking app are your best friends here.',
  },
  {
    step: '03',
    title: 'EAT',
    description:
      'Hit your numbers daily. Consistency beats perfection. Aim for 80% adherence and adjust as your body responds.',
  },
];

export function CalculatorResults({ results }: CalculatorResultsProps) {
  const { adjustedCalories, protein_g, carbs_g, fat_g, goal } = results;

  const proteinCals = protein_g * 4;
  const carbsCals = carbs_g * 4;
  const fatCals = fat_g * 9;

  return (
    <div className="space-y-12">
      {/* TDEE / Adjusted Calories */}
      <div className="text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary">
          YOUR DAILY TARGET ({goal.toUpperCase()})
        </p>
        <p className="mt-2 font-heading text-5xl font-extrabold text-cyan md:text-6xl lg:text-7xl">
          {adjustedCalories.toLocaleString()}
        </p>
        <p className="mt-1 font-mono text-sm text-text-muted">CALORIES / DAY</p>
        {results.tdee !== adjustedCalories && (
          <p className="mt-2 font-mono text-xs text-text-muted">
            MAINTENANCE TDEE: {results.tdee.toLocaleString()} kcal
          </p>
        )}
      </div>

      {/* Macro Bars */}
      <div className="space-y-6">
        <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
          YOUR MACROS
        </h3>
        <MacroBar
          label="Protein"
          grams={protein_g}
          calories={proteinCals}
          totalCalories={adjustedCalories}
          color="bg-cyan"
          delay={0}
        />
        <MacroBar
          label="Carbs"
          grams={carbs_g}
          calories={carbsCals}
          totalCalories={adjustedCalories}
          color="bg-navy"
          delay={0.15}
        />
        <MacroBar
          label="Fat"
          grams={fat_g}
          calories={fatCals}
          totalCalories={adjustedCalories}
          color="bg-text-muted"
          delay={0.3}
        />
      </div>

      <SectionDivider variant="heavy" />

      {/* Cook -> Measure -> Eat Framework */}
      <div className="space-y-8">
        <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
          THE FRAMEWORK
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FRAMEWORK_STEPS.map((item) => (
            <div
              key={item.step}
              className="border-3 border-border-hard bg-card-surface p-6 shadow-[4px_4px_0px_#000]"
            >
              <span className="font-mono text-xs text-cyan">{item.step}</span>
              <h4 className="mt-2 font-heading text-xl font-bold uppercase tracking-widest text-text-primary">
                {item.title}
              </h4>
              <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider variant="heavy" />

      {/* Coaching Upsell */}
      <div className="space-y-6 text-center">
        <h3 className="font-heading text-2xl font-extrabold uppercase tracking-widest text-text-primary md:text-3xl">
          WANT EXPERT GUIDANCE?
        </h3>
        <p className="mx-auto max-w-xl font-body text-base leading-relaxed text-text-secondary">
          Numbers are a starting point. A coach helps you dial in what works for
          your body, your schedule, and your goals. Get personalized programming
          and accountability from a certified trainer.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <BrutalistLinkButton href="/coaches" showArrow>
            BROWSE ALL COACHES
          </BrutalistLinkButton>
          <Link
            href="/contact"
            className="font-mono text-sm uppercase tracking-widest text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
          >
            OR GET IN TOUCH
          </Link>
        </div>
      </div>
    </div>
  );
}
