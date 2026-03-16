-- Eccentric Iron Fitness v2 — Initial Schema
-- Run against Supabase SQL Editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════
-- COACHES
-- ═══════════════════════════════════════════
CREATE TABLE coaches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  bio TEXT NOT NULL,
  approach TEXT NOT NULL DEFAULT '',
  photo_url TEXT,
  certifications TEXT[] NOT NULL DEFAULT '{}',
  specialties TEXT[] NOT NULL DEFAULT '{}',
  gender TEXT CHECK (gender IN ('male', 'female')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_online BOOLEAN NOT NULL DEFAULT true,
  is_in_person BOOLEAN NOT NULL DEFAULT false,
  founding_rate_remaining INTEGER,
  social_links JSONB NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_coaches_slug ON coaches(slug);
CREATE INDEX idx_coaches_active ON coaches(is_active) WHERE is_active = true;

-- ═══════════════════════════════════════════
-- SERVICE TIERS
-- ═══════════════════════════════════════════
CREATE TABLE service_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price_cents INTEGER NOT NULL,
  price_type TEXT NOT NULL CHECK (price_type IN ('one_time', 'monthly', 'per_session')),
  features TEXT[] NOT NULL DEFAULT '{}',
  exclusions TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  cta_label TEXT NOT NULL DEFAULT 'Get Started',
  cta_url TEXT NOT NULL DEFAULT '/contact',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(coach_id, slug)
);

CREATE INDEX idx_service_tiers_coach ON service_tiers(coach_id);

-- ═══════════════════════════════════════════
-- SERVICE AREAS
-- ═══════════════════════════════════════════
CREATE TABLE service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  province TEXT NOT NULL DEFAULT 'BC',
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  boundary_geojson JSONB,
  seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  monthly_search_volume INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_service_areas_slug ON service_areas(slug);

-- ═══════════════════════════════════════════
-- COACH <> SERVICE AREA (JOIN)
-- ═══════════════════════════════════════════
CREATE TABLE coach_service_areas (
  coach_id UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  service_area_id UUID NOT NULL REFERENCES service_areas(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (coach_id, service_area_id)
);

-- ═══════════════════════════════════════════
-- TESTIMONIALS
-- ═══════════════════════════════════════════
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coach_id UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_location TEXT,
  quote TEXT NOT NULL,
  result_summary TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_testimonials_coach ON testimonials(coach_id);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;

-- ═══════════════════════════════════════════
-- BLOG POSTS
-- ═══════════════════════════════════════════
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fat_loss', 'nutrition', 'training', 'lifestyle')),
  author_id UUID NOT NULL REFERENCES coaches(id) ON DELETE RESTRICT,
  cover_image_url TEXT,
  seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC) WHERE is_published = true;
CREATE INDEX idx_blog_posts_category ON blog_posts(category) WHERE is_published = true;

-- ═══════════════════════════════════════════
-- LEADS
-- ═══════════════════════════════════════════
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('calculator', 'contact_form', 'newsletter', 'waitlist')),
  calculator_data JSONB,
  ghl_contact_id TEXT,
  coach_id UUID REFERENCES coaches(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_source ON leads(source);

-- ═══════════════════════════════════════════
-- AUTO-UPDATE TIMESTAMPS
-- ═══════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER coaches_updated_at
  BEFORE UPDATE ON coaches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ═══════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public read for content tables
CREATE POLICY "Public read coaches" ON coaches FOR SELECT USING (is_active = true);
CREATE POLICY "Public read service_tiers" ON service_tiers FOR SELECT USING (is_active = true);
CREATE POLICY "Public read service_areas" ON service_areas FOR SELECT USING (is_active = true);
CREATE POLICY "Public read coach_service_areas" ON coach_service_areas FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (is_published = true);

-- Leads: service_role only
CREATE POLICY "Service role manages leads" ON leads FOR ALL USING (auth.role() = 'service_role');

-- Write access: service_role only for all tables
CREATE POLICY "Service role writes coaches" ON coaches FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role updates coaches" ON coaches FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Service role writes service_tiers" ON service_tiers FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role updates service_tiers" ON service_tiers FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Service role writes service_areas" ON service_areas FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role updates service_areas" ON service_areas FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Service role writes testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role updates testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Service role writes blog_posts" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role updates blog_posts" ON blog_posts FOR UPDATE USING (auth.role() = 'service_role');

-- ═══════════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════════
INSERT INTO coaches (slug, first_name, last_name, email, phone, bio, approach, certifications, specialties, gender, is_active, is_online, is_in_person, founding_rate_remaining, social_links)
VALUES (
  'carver-lloyd', 'Carver', 'Lloyd', 'carver@eccentriciron.ca', '(604) 200-3390',
  'Fat loss and body recomposition specialist in Maple Ridge, BC. Certified trainer helping real people get real results through consistency, not complexity.',
  'Full body first. Same exercises for 6-8 weeks. Earn complexity through consistency. Cook → Measure → Eat. No tracking apps. No fake timelines.',
  ARRAY['Applied Hypertrophy Specialist'],
  ARRAY['fat loss', 'body recomposition', 'applied hypertrophy', 'nutrition coaching'],
  'male', true, true, false, 3,
  '{"instagram": "https://www.instagram.com/eccentriciron"}'::jsonb
);

INSERT INTO service_tiers (coach_id, name, slug, description, price_cents, price_type, features, exclusions, is_featured, cta_label, cta_url, sort_order)
VALUES
  ((SELECT id FROM coaches WHERE slug = 'carver-lloyd'),
   'DIY Fat Loss Program', 'diy-fat-loss',
   'Pre-built training program for self-starters who just need a plan. Unlimited purchase - buy once, keep forever.',
   15000, 'one_time',
   ARRAY['Pre-built full body program (3 days/week)', 'Video exercise library', 'Macro targets via calculator', 'Cook → Measure → Eat framework'],
   ARRAY['Movement assessment', 'Zoom calls', 'Phone/text access', 'Video form reviews', 'Custom program', 'Weekly check-ins'],
   false, 'COMING SOON', '#', 1),
  ((SELECT id FROM coaches WHERE slug = 'carver-lloyd'),
   'Online Coaching', 'online-coaching',
   'Custom program with weekly 1-on-1 Zoom calls and direct access to your coach.',
   20000, 'monthly',
   ARRAY['Custom full body program', 'Weekly 30-min Zoom calls', 'Video form reviews', 'Direct phone/text access', 'Weekly check-ins', 'Personalized macro targets', 'Movement assessment + custom warm-up'],
   ARRAY[]::TEXT[],
   true, 'Book Discovery Call', '/contact', 2);

-- Service areas for city page SEO (not linked to Carver — he is online-only)
INSERT INTO service_areas (name, slug, lat, lng, seo_title, seo_description, monthly_search_volume)
VALUES
  ('Maple Ridge', 'maple-ridge', 49.2193, -122.5984, 'Personal Trainer in Maple Ridge, BC | Eccentric Iron Fitness', 'Find a certified personal trainer in Maple Ridge. Fat loss, body recomposition, and nutrition coaching.', 90),
  ('Langley', 'langley', 49.1044, -122.6608, 'Personal Trainer in Langley, BC | Eccentric Iron Fitness', 'Find a certified personal trainer in Langley. Evidence-based fat loss and body recomposition coaching.', 210),
  ('Coquitlam', 'coquitlam', 49.2838, -122.7932, 'Personal Trainer in Coquitlam, BC | Eccentric Iron Fitness', 'Find a certified personal trainer in Coquitlam. Custom training programs and nutrition coaching.', 170),
  ('Surrey', 'surrey', 49.1913, -122.8490, 'Personal Trainer in Surrey, BC | Eccentric Iron Fitness', 'Find a certified personal trainer in Surrey. Fat loss, muscle building, and online coaching available.', 320);

-- Testimonials
INSERT INTO testimonials (coach_id, client_name, quote, is_featured, sort_order, is_active)
VALUES
  ((SELECT id FROM coaches WHERE slug = 'carver-lloyd'),
   'Kent Keyworth',
   'I have worked with Carver for about 8 months now and couldn''t be happier with the results. If you''re serious about achieving your fitness goals, Carver has the knowledge and tools for you to be successful. He is so supportive and not judgemental at all. I am really impressed by his attention to details regarding proper posture and technique for each exercise and piece of equipment we use. His expertise in fitness and nutrition far exceeds most people''s, and is a big reason for my success with getting the body I want. I couldn''t have done it without him, that''s for sure. Thank you "Body" Carver!',
   true, 0, true),
  ((SELECT id FROM coaches WHERE slug = 'carver-lloyd'),
   'Jamie McNulty',
   'Carver is an Excellent trainer. He''s attentive, encouraging, and always focused on perfecting your technique. Sessions are fun, challenging, and just the right amount of painful for real growth. He tailors everything to your ability and pushes you safely toward progress.',
   false, 1, true);

-- Carver is online-only (province-wide BC). Service areas exist for city page SEO
-- but are NOT linked to Carver. Future in-person coaches will be linked to areas.
-- INSERT INTO coach_service_areas when in-person coaches are onboarded.
