'use server';

import { createLead } from '@/lib/db/leads';
import { createOrUpdateGHLContact } from '@/lib/integrations/ghl';
import { supabase } from '@/lib/supabase';

export async function captureCalculatorLead(data: {
  email: string;
  calculator_data: {
    tdee: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    goal: string;
  };
}): Promise<{ success: boolean; error?: string }> {
  // Basic server-side email validation
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: 'Invalid email address' };
  }

  const result = await createLead({
    email: data.email,
    source: 'calculator',
    calculator_data: data.calculator_data,
  });

  if (!result.success) {
    return { success: false, error: result.error || 'Failed to save lead' };
  }

  // Fire-and-forget GHL sync
  createOrUpdateGHLContact({
    email: data.email,
    tags: ['calculator', 'website-lead', data.calculator_data.goal.toLowerCase().replace(/\s+/g, '-')],
  }).then((ghlResult) => {
    if (ghlResult.contactId && result.lead) {
      supabase
        .from('leads')
        .update({ ghl_contact_id: ghlResult.contactId })
        .eq('id', result.lead.id)
        .then(() => {});
    }
  });

  return { success: true };
}
