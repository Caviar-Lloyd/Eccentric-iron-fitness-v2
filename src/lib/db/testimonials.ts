import { supabase } from '@/lib/supabase';
import type { Testimonial, Coach } from '@/lib/types';

export async function getFeaturedTestimonials(): Promise<
  (Testimonial & { coach: Coach })[]
> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*, coach:coaches(*)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getFeaturedTestimonials error:', error.message);
    return [];
  }

  return data as (Testimonial & { coach: Coach })[];
}

export async function getTestimonialsByCoach(
  coachId: string
): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('coach_id', coachId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getTestimonialsByCoach error:', error.message);
    return [];
  }

  return data as Testimonial[];
}
