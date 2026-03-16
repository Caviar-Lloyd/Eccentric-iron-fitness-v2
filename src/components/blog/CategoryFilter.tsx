'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  { value: '', label: 'ALL' },
  { value: 'fat_loss', label: 'FAT LOSS' },
  { value: 'nutrition', label: 'NUTRITION' },
  { value: 'training', label: 'TRAINING' },
  { value: 'lifestyle', label: 'LIFESTYLE' },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    router.push(`/blog?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Blog categories">
      {categories.map((cat) => (
        <button
          key={cat.value}
          type="button"
          role="tab"
          aria-selected={activeCategory === cat.value}
          onClick={() => handleSelect(cat.value)}
          className={`shrink-0 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 ${
            activeCategory === cat.value
              ? 'border-2 border-border-hard bg-cyan text-darker-bg'
              : 'border-2 border-border-hard bg-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
