'use client';

import { useState, useCallback } from 'react';
import { FormField, SelectField, ToggleField } from '@/components/ui/FormField';
import { BrutalistButton } from '@/components/ui/BrutalistButton';
import {
  calculatorSchema,
  calculateMacros,
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

      setErrors({});
      const macros = calculateMacros(input);
      onSubmit(macros, input);
    },
    [age, weight, height, heightFt, heightIn, gender, units, activityLevel, goal, onSubmit]
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

      {/* Activity Level & Goal */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
          onChange={(e) => setGoal(e.target.value as Goal)}
          error={errors.goal}
        >
          {GOAL_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SelectField>
      </div>

      {/* Submit */}
      <BrutalistButton type="submit" className="sm:w-auto">
        CALCULATE
      </BrutalistButton>
    </form>
  );
}
