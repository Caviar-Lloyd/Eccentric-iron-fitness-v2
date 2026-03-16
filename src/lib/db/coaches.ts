import { supabase } from '@/lib/supabase';
import type { Coach, CoachWithRelations } from '@/lib/types';

export async function getCoaches(): Promise<Coach[]> {
  const { data, error } = await supabase
    .from('coaches')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getCoaches error:', error.message);
    return [];
  }

  return data as Coach[];
}

export async function getCoachBySlug(slug: string): Promise<Coach | null> {
  const { data, error } = await supabase
    .from('coaches')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('getCoachBySlug error:', error.message);
    return null;
  }

  return data as Coach;
}

export async function getCoachWithRelations(
  slug: string
): Promise<CoachWithRelations | null> {
  const { data: coach, error: coachError } = await supabase
    .from('coaches')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (coachError || !coach) {
    console.error('getCoachWithRelations error:', coachError?.message);
    return null;
  }

  const [tiersResult, testimonialsResult, areasResult] = await Promise.all([
    supabase
      .from('service_tiers')
      .select('*')
      .eq('coach_id', coach.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('testimonials')
      .select('*')
      .eq('coach_id', coach.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('coach_service_areas')
      .select('service_area_id')
      .eq('coach_id', coach.id)
      .then(async ({ data: links }) => {
        if (!links || links.length === 0) return { data: [], error: null };
        const ids = links.map((l) => l.service_area_id);
        return supabase
          .from('service_areas')
          .select('*')
          .in('id', ids)
          .eq('is_active', true);
      }),
  ]);

  return {
    ...(coach as Coach),
    service_tiers: (tiersResult.data ?? []) as CoachWithRelations['service_tiers'],
    testimonials: (testimonialsResult.data ?? []) as CoachWithRelations['testimonials'],
    service_areas: (areasResult.data ?? []) as CoachWithRelations['service_areas'],
  };
}
