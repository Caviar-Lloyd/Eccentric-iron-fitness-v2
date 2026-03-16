import type { MetadataRoute } from 'next';
import { getCoaches } from '@/lib/db/coaches';
import { getServiceAreas } from '@/lib/db/areas';
import { getBlogPosts } from '@/lib/db/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eccentricironfitness.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [coaches, areas, { posts }] = await Promise.all([
    getCoaches(),
    getServiceAreas(),
    getBlogPosts({ limit: 1000 }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/coaches`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/map`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];

  const coachPages: MetadataRoute.Sitemap = coaches.map((coach) => ({
    url: `${BASE_URL}/coaches/${coach.slug}`,
    lastModified: new Date(coach.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${BASE_URL}/areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...coachPages, ...areaPages, ...blogPages];
}
