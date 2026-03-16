import { supabase } from '@/lib/supabase';
import type { BlogPost, BlogPostWithAuthor } from '@/lib/types';

export async function getBlogPosts(options?: {
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<{ posts: BlogPost[]; total: number }> {
  let query = supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.limit) {
    const from = options.offset ?? 0;
    query = query.range(from, from + options.limit - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('getBlogPosts error:', error.message);
    return { posts: [], total: 0 };
  }

  return {
    posts: data as BlogPost[],
    total: count ?? 0,
  };
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostWithAuthor | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, author:coaches(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('getBlogPostBySlug error:', error.message);
    return null;
  }

  return data as unknown as BlogPostWithAuthor;
}
