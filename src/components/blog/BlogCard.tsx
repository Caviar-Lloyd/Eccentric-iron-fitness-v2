import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { Tag } from '@/components/ui/Tag';

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
  className?: string;
};

const categoryLabels: Record<BlogPost['category'], string> = {
  fat_loss: 'FAT LOSS',
  nutrition: 'NUTRITION',
  training: 'TRAINING',
  lifestyle: 'LIFESTYLE',
};

export function BlogCard({ post, featured = false, className = '' }: BlogCardProps) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col border-3 border-border-hard bg-card-surface shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] ${className}`}
    >
      {/* Image placeholder */}
      <div className={`flex items-center justify-center bg-navy ${featured ? 'h-56' : 'h-40'}`}>
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-white/60">
            {featured ? 'HERO IMAGE' : 'THUMB'}
          </span>
          <div className="mt-2">
            <Tag variant="accent">{categoryLabels[post.category]}</Tag>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className={`font-heading font-bold uppercase tracking-widest text-text-primary ${featured ? 'text-xl' : 'text-base'}`}>
          {post.title}
        </h3>

        <div className="mt-2 flex items-center gap-3 font-mono text-xs text-text-muted">
          {date && <span>{date}</span>}
          <span>{post.read_time_minutes} MIN READ</span>
        </div>

        <p className="mt-3 line-clamp-2 font-body text-sm text-text-secondary">
          {post.excerpt}
        </p>

        <p className="mt-auto pt-4 font-mono text-xs uppercase tracking-widest text-cyan group-hover:underline">
          READ MORE →
        </p>
      </div>
    </Link>
  );
}
