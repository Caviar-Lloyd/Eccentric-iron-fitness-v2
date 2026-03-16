import { z } from 'zod';

/* ── Types ── */

export type Gender = 'Male' | 'Female';
export type UnitSystem = 'Metric' | 'Imperial';
export type ActivityLevel =
  | 'Sedentary'
  | 'Lightly Active'
  | 'Moderately Active'
  | 'Very Active'
  | 'Extremely Active';
export type Goal = 'Fat Loss' | 'Maintenance' | 'Lean Bulk';

export interface CalculatorInput {
  age: number;
  weight: number;
  height: number;
  gender: Gender;
  units: UnitSystem;
  activityLevel: ActivityLevel;
  goal: Goal;
}

export interface MacroResult {
  tdee: number;
  adjustedCalories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  goal: string;
}

/* ── Zod Schema ── */

export const calculatorSchema = z.object({
  age: z
    .number({ error: 'Age is required' })
    .int('Age must be a whole number')
    .min(13, 'Must be at least 13 years old')
    .max(120, 'Please enter a valid age'),
  weight: z
    .number({ error: 'Weight is required' })
    .positive('Weight must be positive')
    .max(1000, 'Please enter a valid weight'),
  height: z
    .number({ error: 'Height is required' })
    .positive('Height must be positive')
    .max(300, 'Please enter a valid height'),
  gender: z.enum(['Male', 'Female']),
  units: z.enum(['Metric', 'Imperial']),
  activityLevel: z.enum([
    'Sedentary',
    'Lightly Active',
    'Moderately Active',
    'Very Active',
    'Extremely Active',
  ]),
  goal: z.enum(['Fat Loss', 'Maintenance', 'Lean Bulk']),
});

/* ── Activity Multipliers ── */

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  'Sedentary': 1.2,
  'Lightly Active': 1.375,
  'Moderately Active': 1.55,
  'Very Active': 1.725,
  'Extremely Active': 1.9,
};

/* ── Goal Multipliers ── */

const GOAL_MULTIPLIERS: Record<Goal, number> = {
  'Fat Loss': 0.8,
  'Maintenance': 1.0,
  'Lean Bulk': 1.1,
};

/* ── Unit Conversion Helpers ── */

function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

function inchesToCm(inches: number): number {
  return inches * 2.54;
}

function kgToLbs(kg: number): number {
  return kg / 0.453592;
}

/* ── Core Calculations ── */

/**
 * Mifflin-St Jeor equation for BMR, then multiplied by activity factor.
 * Male:   10 x weight(kg) + 6.25 x height(cm) - 5 x age + 5
 * Female: 10 x weight(kg) + 6.25 x height(cm) - 5 x age - 161
 */
export function calculateTDEE(input: CalculatorInput): number {
  let weightKg = input.weight;
  let heightCm = input.height;

  if (input.units === 'Imperial') {
    weightKg = lbsToKg(input.weight);
    heightCm = inchesToCm(input.height);
  }

  const genderOffset = input.gender === 'Male' ? 5 : -161;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * input.age + genderOffset;
  const tdee = bmr * ACTIVITY_MULTIPLIERS[input.activityLevel];

  return Math.round(tdee);
}

/**
 * Calculate macros based on TDEE, goal, and bodyweight.
 * Protein: 1g per lb bodyweight
 * Fat: 25% of total adjusted calories
 * Carbs: remainder
 */
export function calculateMacros(input: CalculatorInput): MacroResult {
  const tdee = calculateTDEE(input);
  const goalMultiplier = GOAL_MULTIPLIERS[input.goal];
  const adjustedCalories = Math.round(tdee * goalMultiplier);

  // Protein: 1g per lb bodyweight
  const weightLbs =
    input.units === 'Imperial' ? input.weight : kgToLbs(input.weight);
  const protein_g = Math.round(weightLbs);

  // Fat: 25% of adjusted calories (9 cal/g)
  const fatCalories = adjustedCalories * 0.25;
  const fat_g = Math.round(fatCalories / 9);

  // Carbs: remainder (4 cal/g)
  const proteinCalories = protein_g * 4;
  const carbCalories = adjustedCalories - proteinCalories - fatCalories;
  const carbs_g = Math.max(0, Math.round(carbCalories / 4));

  return {
    tdee,
    adjustedCalories,
    protein_g,
    carbs_g,
    fat_g,
    goal: input.goal,
  };
}
