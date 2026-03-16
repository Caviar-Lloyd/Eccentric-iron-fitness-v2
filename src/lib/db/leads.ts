import { supabase } from '@/lib/supabase';
import type { Lead } from '@/lib/types';

export async function createLead(data: {
  email: string;
  source: Lead['source'];
  calculator_data?: Lead['calculator_data'];
  coach_id?: string;
}): Promise<{ success: boolean; error?: string; lead?: Lead }> {
  const { data: existing } = await supabase
    .from('leads')
    .select('id')
    .eq('email', data.email)
    .single();

  if (existing) {
    // Update existing lead with new data
    const { data: updated, error } = await supabase
      .from('leads')
      .update({
        source: data.source,
        ...(data.calculator_data && { calculator_data: data.calculator_data }),
        ...(data.coach_id && { coach_id: data.coach_id }),
      })
      .eq('email', data.email)
      .select()
      .single();

    if (error) {
      console.error('createLead update error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, lead: updated as Lead };
  }

  const { data: lead, error } = await supabase
    .from('leads')
    .insert({
      email: data.email,
      source: data.source,
      calculator_data: data.calculator_data ?? null,
      coach_id: data.coach_id ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error('createLead insert error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, lead: lead as Lead };
}

export async function getLeadByEmail(email: string): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('getLeadByEmail error:', error.message);
    return null;
  }

  return data as Lead;
}
