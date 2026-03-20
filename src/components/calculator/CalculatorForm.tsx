'use client';

import { useState, useCallback } from 'react';
import { FormField, SelectField, ToggleField } from '@/components/ui/FormField';
import { BrutalistButton } from '@/components/ui/BrutalistButton';
import {
  calculatorSchema,
  calculateMacros,
  MACRO_SPLITS,
  type CalculatorInput,
  type MacroResult,
  type Gender,
  type UnitSystem,
  type ActivityLevel,
  type Goal,
} from '@/lib/calculator';

type CalculatorFormProps = {
  onSubmit: (results: MacroResult, input: CalculatorInput) => void;
};

const ACTIVITY_OPTIONS: ActivityLevel[] = [
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
  'Extremely Active',
];

const GOAL_OPTIONS: Goal[] = ['Fat Loss', 'Maintenance', 'Lean Bulk'];

function getDefaultSplit(goal: Goal) {
  const s = MACRO_SPLITS[goal];
  return {
    protein: Math.round(s.protein * 100),
    carbs: Math.round(s.carbs * 100),
    fat: Math.round(s.fat * 100),
  };
}

export function CalculatorForm({ onSubmit }: CalculatorFormProps) {
  const [units, setUnits] = useState<UnitSystem>('Imperial');
  const [gender, setGender] = useState<Gender>('Male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('Moderately Active');
  const [goal, setGoal] = useState<Goal>('Fat Loss');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const defaultSplit = getDefaultSplit(goal);
  const [proteinPct, setProteinPct] = useState(defaultSplit.protein);
  const [carbsPct, setCarbsPct] = useState(defaultSplit.carbs);
  const [fatPct, setFatPct] = useState(defaultSplit.fat);

  const total = proteinPct + carbsPct + fatPct;
  const isValid = total === 100;

  const handleGoalChange = (newGoal: Goal) => {
    setGoal(newGoal);
    const s = getDefaultSplit(newGoal);
    setProteinPct(s.protein);
    setCarbsPct(s.carbs);
    setFatPct(s.fat);
  };

  const clampPct = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const heightValue = units === 'Imperial'
        ? Number(heightFt) * 12 + Number(heightIn || 0)
        : Number(height);

      const input: CalculatorInput = {
        age: Number(age),
        weight: Number(weight),
        height: heightValue,
        gender,
        units,
        activityLevel,
        goal,
      };

      const result = calculatorSchema.safeParse(input);

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const field = issue.path[0] as string;
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        }
        setErrors(fieldErrors);
        return;
      }

      if (!isValid) {
        setErrors({ macros: `Macro percentages must add up to 100% (currently ${total}%)` });
        return;
      }

      setErrors({});
      const customSplit = {
        protein: proteinPct / 100,
        carbs: carbsPct / 100,
        fat: fatPct / 100,
      };
      const macros = calculateMacros(input, customSplit);
      onSubmit(macros, input);
    },
    [age, weight, height, heightFt, heightIn, gender, units, activityLevel, goal, proteinPct, carbsPct, fatPct, isValid, total, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Unit & Gender toggles */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ToggleField
          label="Units"
          options={['Imperial', 'Metric']}
          value={units}
          onChange={(v) => setUnits(v as UnitSystem)}
        />
        <ToggleField
          label="Gender"
          options={['Male', 'Female']}
          value={gender}
          onChange={(v) => setGender(v as Gender)}
        />
      </div>

      {/* Biometrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FormField
          label="Age"
          type="number"
          placeholder="e.g. 30"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          error={errors.age}
          min={13}
          max={120}
          inputMode="numeric"
        />
        <FormField
          label={units === 'Imperial' ? 'Weight (lbs)' : 'Weight (kg)'}
          type="number"
          placeholder={units === 'Imperial' ? 'e.g. 180' : 'e.g. 82'}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          error={errors.weight}
          min={1}
          inputMode="decimal"
        />
        {units === 'Imperial' ? (
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary">
              Height
            </span>
            <div className="flex gap-3">
              <div className="flex flex-1 items-end gap-2">
                <input
                  type="number"
                  placeholder="5"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  min={1}
                  max={8}
                  inputMode="numeric"
                  className={`w-full border-b-3 bg-transparent px-0 py-3 font-body text-base text-text-primary outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-cyan ${errors.height ? 'border-error' : 'border-border'}`}
                />
                <span className="shrink-0 pb-3 font-mono text-xs uppercase text-text-muted">ft</span>
              </div>
              <div className="flex flex-1 items-end gap-2">
                <input
                  type="number"
                  placeholder="10"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  min={0}
                  max={11}
                  inputMode="numeric"
                  className="w-full border-b-3 border-border bg-transparent px-0 py-3 font-body text-base text-text-primary outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-cyan"
                />
                <span className="shrink-0 pb-3 font-mono text-xs uppercase text-text-muted">in</span>
              </div>
            </div>
            {errors.height && (
              <p className="font-mono text-xs text-error" role="alert">{errors.height}</p>
            )}
          </div>
        ) : (
          <FormField
            label="Height (cm)"
            type="number"
            placeholder="e.g. 178"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            error={errors.height}
            min={1}
            inputMode="decimal"
          />
        )}
      </div>

      {/* Activity Level, Goal & Macro Split */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <SelectField
          label="Activity Level"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
          error={errors.activityLevel}
        >
          {ACTIVITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Goal"
          value={goal}
          onChange={(e) => handleGoalChange(e.target.value as Goal)}
          error={errors.goal}
        >
          {GOAL_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SelectField>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary">
              Macro Split
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-widest ${
                isValid ? 'text-text-muted' : 'text-error'
              }`}
            >
              {total}%
            </span>
          </div>
          <div className="flex gap-2">
            <MacroSplitInput label="P" value={proteinPct} onChange={(v) => setProteinPct(clampPct(v))} />
            <MacroSplitInput label="C" value={carbsPct} onChange={(v) => setCarbsPct(clampPct(v))} />
            <MacroSplitInput label="F" value={fatPct} onChange={(v) => setFatPct(clampPct(v))} />
          </div>
          {errors.macros && (
            <p className="font-mono text-xs text-error" role="alert">{errors.macros}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <BrutalistButton type="submit" className="sm:w-auto">
        CALCULATE
      </BrutalistButton>
    </form>
  );
}

/* ── Macro Split Input ── */

type MacroSplitInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

function MacroSplitInput({ label, value, onChange }: MacroSplitInputProps) {
  return (
    <div className="flex flex-1 items-end gap-1">
      <span className="shrink-0 pb-3 font-mono text-xs uppercase text-text-muted">{label}</span>
      <input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        inputMode="numeric"
        className="w-full border-b-3 border-border bg-transparent px-0 py-3 text-center font-body text-base text-text-primary outline-none transition-colors duration-150 focus:border-cyan"
      />
      <span className="shrink-0 pb-3 font-mono text-xs uppercase text-text-muted">%</span>
    </div>
  );
}
