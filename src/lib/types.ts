/** Coach profile — the core entity of the platform */
export interface Coach {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  bio: string;
  approach: string;
  photo_url: string | null;
  certifications: string[];
  specialties: string[];
  gender: 'male' | 'female' | null;
  is_active: boolean;
  is_online: boolean;
  is_in_person: boolean;
  founding_rate_remaining: number | null;
  social_links: { instagram?: string; tiktok?: string; youtube?: string };
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/** Service tier (e.g., DIY $150, Coaching $200/mo) */
export interface ServiceTier {
  id: string;
  coach_id: string;
  name: string;
  slug: string;
  description: string;
  price_cents: number;
  price_type: 'one_time' | 'monthly' | 'per_session';
  features: string[];
  exclusions: string[];
  is_featured: boolean;
  cta_label: string;
  cta_url: string;
  sort_order: number;
  is_active: boolean;
}

/** Geographic area for city page SEO and map display */
export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  province: string;
  lat: number;
  lng: number;
  boundary_geojson: Record<string, unknown> | null;
  seo_title: string;
  seo_description: string;
  content: string;
  monthly_search_volume: number | null;
  is_active: boolean;
}

/** Many-to-many join: which coaches serve which areas (in-person) */
export interface CoachServiceArea {
  coach_id: string;
  service_area_id: string;
  is_primary: boolean;
}

/** Client testimonial displayed on coach profiles */
export interface Testimonial {
  id: string;
  coach_id: string;
  client_name: string;
  client_location: string | null;
  quote: string;
  result_summary: string | null;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

/** Coach progress photo for before/after comparisons */
export interface ProgressPhoto {
  id: string;
  coach_id: string;
  photo_date: string;
  pose: 'front' | 'back' | 'lateral_left' | 'lateral_right';
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

/** Blog post authored by a coach */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'fat_loss' | 'nutrition' | 'training' | 'lifestyle';
  author_id: string;
  cover_image_url: string | null;
  seo_title: string;
  seo_description: string;
  read_time_minutes: number;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Lead captured from calculator, contact form, or newsletter */
export interface Lead {
  id: string;
  email: string;
  source: 'calculator' | 'contact_form' | 'newsletter' | 'waitlist';
  calculator_data: Record<string, unknown> | null;
  ghl_contact_id: string | null;
  coach_id: string | null;
  created_at: string;
}

/* ── Composite types for queries with joins ── */

export interface CoachWithRelations extends Coach {
  service_tiers: ServiceTier[];
  testimonials: Testimonial[];
  service_areas: ServiceArea[];
  progress_photos: ProgressPhoto[];
}

export interface ServiceAreaWithCoaches extends ServiceArea {
  coaches: Coach[];
}

export interface BlogPostWithAuthor extends BlogPost {
  author: Coach;
}
