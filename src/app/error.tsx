'use client';

import { Container } from '@/components/layout/Container';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container as="main" className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="font-mono text-6xl font-extrabold text-error">ERROR</span>
      <h1 className="mt-4 font-heading text-3xl font-bold uppercase tracking-widest text-text-primary">
        SOMETHING WENT WRONG
      </h1>
      <p className="mt-4 max-w-md font-body text-lg text-text-secondary">
        An unexpected error occurred. Try refreshing the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-cyan px-8 font-mono text-sm font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
      >
        TRY AGAIN
      </button>
    </Container>
  );
}
