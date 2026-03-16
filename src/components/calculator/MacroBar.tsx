'use client';

import { motion, useReducedMotion } from 'framer-motion';

type MacroBarProps = {
  label: string;
  grams: number;
  calories: number;
  totalCalories: number;
  color: string;
  delay?: number;
};

export function MacroBar({
  label,
  grams,
  calories,
  totalCalories,
  color,
  delay = 0,
}: MacroBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const percent = totalCalories > 0 ? Math.round((calories / totalCalories) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary">
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-lg font-bold text-text-primary">
            {grams}g
          </span>
          <span className="font-mono text-xs text-text-muted">
            {percent}%
          </span>
        </div>
      </div>
      <div className="h-4 w-full border-3 border-border-hard bg-darker-bg">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, delay, ease: 'easeOut' }
          }
        />
      </div>
    </div>
  );
}
