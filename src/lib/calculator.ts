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

/* ── Goal-specific macro splits (percentage of calories) ── */

const MACRO_SPLITS: Record<Goal, { protein: number; carbs: number; fat: number }> = {
  'Fat Loss': { protein: 0.4, carbs: 0.35, fat: 0.25 },
  'Maintenance': { protein: 0.3, carbs: 0.4, fat: 0.3 },
  'Lean Bulk': { protein: 0.3, carbs: 0.45, fat: 0.25 },
};

/**
 * Calculate macros based on TDEE, goal, and percentage splits.
 * Fat Loss:    40% protein / 35% carbs / 25% fat
 * Maintenance: 30% protein / 40% carbs / 30% fat
 * Lean Bulk:   30% protein / 45% carbs / 25% fat
 */
export function calculateMacros(input: CalculatorInput): MacroResult {
  const tdee = calculateTDEE(input);
  const goalMultiplier = GOAL_MULTIPLIERS[input.goal];
  const adjustedCalories = Math.round(tdee * goalMultiplier);

  const split = MACRO_SPLITS[input.goal];

  // Protein (4 cal/g)
  const protein_g = Math.round((adjustedCalories * split.protein) / 4);

  // Carbs (4 cal/g)
  const carbs_g = Math.round((adjustedCalories * split.carbs) / 4);

  // Fat (9 cal/g)
  const fat_g = Math.round((adjustedCalories * split.fat) / 9);

  return {
    tdee,
    adjustedCalories,
    protein_g,
    carbs_g,
    fat_g,
    goal: input.goal,
  };
}
