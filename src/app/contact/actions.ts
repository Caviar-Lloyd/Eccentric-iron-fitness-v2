'use server';

import { z } from 'zod';
import { createLead } from '@/lib/db/leads';
import { createOrUpdateGHLContact } from '@/lib/integrations/ghl';
import { supabase } from '@/lib/supabase';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().max(30, 'Phone number is too long').optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required').max(5000, 'Message is too long'),
  coach_id: z.string().optional().or(z.literal('')),
});

export async function submitContactForm(
  formData: FormData
): Promise<{ success: boolean; error?: string; fieldErrors?: Record<string, string> }> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    message: formData.get('message') as string,
    coach_id: formData.get('coach_id') as string,
  };

  const result = contactFormSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false, fieldErrors };
  }

  const { name, email, phone, message, coach_id } = result.data;

  const leadResult = await createLead({
    email,
    source: 'contact_form',
    ...(coach_id ? { coach_id } : {}),
  });

  if (!leadResult.success) {
    return { success: false, error: leadResult.error || 'Failed to submit. Please try again.' };
  }

  // Fire-and-forget GHL sync
  createOrUpdateGHLContact({
    email,
    name,
    phone: phone || undefined,
    tags: ['contact-form', 'website-lead'],
  }).then((ghlResult) => {
    if (ghlResult.contactId && leadResult.lead) {
      supabase
        .from('leads')
        .update({ ghl_contact_id: ghlResult.contactId })
        .eq('id', leadResult.lead.id)
        .then(() => {});
    }
  });

  // Log contact message (the leads table doesn't store message/name/phone,
  // so the GHL contact captures that data)
  console.log('Contact form submission:', { name, email, phone, message, coach_id });

  return { success: true };
}
