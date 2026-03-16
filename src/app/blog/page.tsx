import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getBlogPosts } from '@/lib/db/blog';
import { Container } from '@/components/layout/Container';
import { BlogCard } from '@/components/blog/BlogCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';

export const metadata: Metadata = {
  title: 'Blog | Eccentric Iron Fitness',
  description:
    'Evidence-based articles on fat loss, nutrition, training, and lifestyle from certified coaches.',
};

type Props = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

const PAGE_SIZE = 6;

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const offset = (page - 1) * PAGE_SIZE;

  const { posts, total } = await getBlogPosts({
    category: params.category,
    limit: PAGE_SIZE,
    offset,
  });

  const hasMore = offset + posts.length < total;

  return (
    <Container as="main" className="py-16">
      <h1 className="text-center font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        BLOG
      </h1>
      <p className="mt-4 text-center font-body text-lg text-text-secondary">
        Evidence-based articles on fat loss, macros, training, and lifestyle.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>
      </div>

      {posts.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="font-mono text-lg uppercase tracking-widest text-text-muted">
            CONTENT COMING SOON
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {posts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                featured={index === 0 && page === 1}
                className={index === 0 && page === 1 ? 'md:col-span-2' : ''}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <a
                href={`/blog?${params.category ? `category=${params.category}&` : ''}page=${page + 1}`}
                className="inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-transparent px-8 font-mono text-sm font-medium uppercase tracking-widest text-text-primary shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
              >
                LOAD MORE
              </a>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
