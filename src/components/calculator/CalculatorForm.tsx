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
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('Moderately Active');
  const [goal, setGoal] = useState<Goal>('Fat Loss');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const input: CalculatorInput = {
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
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
    [age, weight, height, gender, units, activityLevel, goal, onSubmit]
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
        <FormField
          label={units === 'Imperial' ? 'Height (inches)' : 'Height (cm)'}
          type="number"
          placeholder={units === 'Imperial' ? 'e.g. 70' : 'e.g. 178'}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          error={errors.height}
          min={1}
          inputMode="decimal"
        />
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
      <BrutalistButton type="submit" className="w-full">
        CALCULATE
      </BrutalistButton>
    </form>
  );
}
