'use client';

import { useState, useCallback } from 'react';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { CalculatorResults } from '@/components/calculator/CalculatorResults';
import { EmailCapture } from '@/components/ui/EmailCapture';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { captureCalculatorLead } from './actions';
import type { MacroResult } from '@/lib/calculator';

type FlowState = 'form' | 'email-gate' | 'results';

export function CalculatorPageClient() {
  const [flowState, setFlowState] = useState<FlowState>('form');
  const [results, setResults] = useState<MacroResult | null>(null);

  const handleFormSubmit = useCallback(
    (macros: MacroResult) => {
      setResults(macros);
      setFlowState('email-gate');
    },
    []
  );

  const handleEmailSubmit = useCallback(
    async (email: string): Promise<{ success: boolean; error?: string }> => {
      if (!results) {
        return { success: false, error: 'No calculator data available' };
      }

      const response = await captureCalculatorLead({
        email,
        calculator_data: {
          tdee: results.adjustedCalories,
          protein_g: results.protein_g,
          carbs_g: results.carbs_g,
          fat_g: results.fat_g,
          goal: results.goal,
        },
      });

      if (response.success) {
        setFlowState('results');
      }

      return response;
    },
    [results]
  );

  return (
    <>
      {/* Calculator Form — always visible */}
      <div className="mt-8">
        <CalculatorForm onSubmit={handleFormSubmit} />
      </div>

      {/* Email gate modal */}
      {flowState === 'email-gate' && (
        <EmailCapture variant="modal" onSubmit={handleEmailSubmit} />
      )}

      {/* Results — shown after email capture */}
      {flowState === 'results' && results && (
        <div className="mt-12">
          <SectionDivider variant="heavy" />
          <div className="mt-12">
            <CalculatorResults results={results} />
          </div>
        </div>
      )}
    </>
  );
}
