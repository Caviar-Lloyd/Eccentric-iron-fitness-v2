import { supabase } from '@/lib/supabase';
import type { ServiceArea, ServiceAreaWithCoaches, Coach } from '@/lib/types';

export async function getServiceAreas(): Promise<ServiceArea[]> {
  const { data, error } = await supabase
    .from('service_areas')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('getServiceAreas error:', error.message);
    return [];
  }

  return data as ServiceArea[];
}

export async function getServiceAreaBySlug(
  slug: string
): Promise<ServiceAreaWithCoaches | null> {
  const { data: area, error: areaError } = await supabase
    .from('service_areas')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (areaError || !area) {
    console.error('getServiceAreaBySlug error:', areaError?.message);
    return null;
  }

  const coaches = await getCoachesByArea(area.id);

  return {
    ...(area as ServiceArea),
    coaches,
  };
}

export async function getCoachesByArea(areaId: string): Promise<Coach[]> {
  const { data: links, error: linksError } = await supabase
    .from('coach_service_areas')
    .select('coach_id')
    .eq('service_area_id', areaId);

  if (linksError || !links || links.length === 0) {
    if (linksError) console.error('getCoachesByArea error:', linksError.message);
    return [];
  }

  const coachIds = links.map((l) => l.coach_id);

  const { data, error } = await supabase
    .from('coaches')
    .select('*')
    .in('id', coachIds)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getCoachesByArea coaches error:', error.message);
    return [];
  }

  return data as Coach[];
}
