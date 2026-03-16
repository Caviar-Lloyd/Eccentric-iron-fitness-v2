import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <Container as="main" className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="font-mono text-8xl font-extrabold text-cyan">404</span>
      <h1 className="mt-4 font-heading text-3xl font-bold uppercase tracking-widest text-text-primary">
        PAGE NOT FOUND
      </h1>
      <p className="mt-4 max-w-md font-body text-lg text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-cyan px-8 font-mono text-sm font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
        >
          GO HOME →
        </Link>
        <Link
          href="/coaches"
          className="inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-transparent px-8 font-mono text-sm font-medium uppercase tracking-widest text-text-primary shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
        >
          FIND A COACH →
        </Link>
      </div>
    </Container>
  );
}
