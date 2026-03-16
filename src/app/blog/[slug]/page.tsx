import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/db/blog';
import { Container } from '@/components/layout/Container';
import { Tag } from '@/components/ui/Tag';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { CoachCard } from '@/components/coach/CoachCard';
import { BlogCTA } from '@/components/blog/BlogCTA';

type Props = { params: Promise<{ slug: string }> };

const categoryLabels: Record<string, string> = {
  fat_loss: 'FAT LOSS',
  nutrition: 'NUTRITION',
  training: 'TRAINING',
  lifestyle: 'LIFESTYLE',
};

export async function generateStaticParams() {
  const { posts } = await getBlogPosts({ limit: 100 });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.seo_title || post.title} | Eccentric Iron Fitness Blog`,
    description: post.seo_description || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  // Split content into paragraphs for mid-article CTA insertion
  const paragraphs = post.content.split('\n').filter(Boolean);

  return (
    <Container as="article" className="py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs uppercase tracking-widest text-text-muted">
        <Link href="/" className="hover:text-text-secondary">Home</Link>
        <span className="mx-2" aria-hidden="true">&gt;</span>
        <Link href="/blog" className="hover:text-text-secondary">Blog</Link>
        <span className="mx-2" aria-hidden="true">&gt;</span>
        <span className="text-text-secondary">{post.title}</span>
      </nav>

      {/* Header */}
      <header>
        <Tag variant="accent">{categoryLabels[post.category] ?? post.category.toUpperCase()}</Tag>
        <h1 className="mt-4 font-heading text-3xl font-extrabold uppercase tracking-tight text-text-primary md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          {post.author && (
            <Link
              href={`/coaches/${post.author.slug}`}
              className="text-cyan hover:underline"
            >
              {post.author.first_name} {post.author.last_name}
            </Link>
          )}
          {date && <span>{date}</span>}
          <span>{post.read_time_minutes} MIN READ</span>
        </div>
      </header>

      <SectionDivider variant="heavy" />

      {/* Content */}
      <div className="mx-auto max-w-3xl">
        {paragraphs.map((paragraph, i) => (
          <div key={i}>
            <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
              {paragraph}
            </p>
            {/* Mid-article CTA after 3rd paragraph */}
            {i === 2 && paragraphs.length > 4 && (
              <BlogCTA variant="compact" />
            )}
          </div>
        ))}
      </div>

      {/* Author card */}
      {post.author && (
        <>
          <SectionDivider variant="line" />
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">WRITTEN BY</p>
            <div className="mt-3">
              <CoachCard coach={post.author} variant="minimal" />
            </div>
          </div>
        </>
      )}

      {/* End-of-article CTA */}
      <div className="mx-auto max-w-3xl">
        <BlogCTA variant="full" />
      </div>
    </Container>
  );
}
