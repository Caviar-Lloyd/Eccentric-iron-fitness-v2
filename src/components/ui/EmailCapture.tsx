'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { BrutalistButton } from '@/components/ui/BrutalistButton';

type EmailCaptureVariant = 'modal' | 'inline' | 'banner';

type EmailCaptureProps = {
  variant: EmailCaptureVariant;
  onSubmit: (email: string) => Promise<{ success: boolean; error?: string }>;
  /** Called when user dismisses the modal (close button only, NOT backdrop) */
  onClose?: () => void;
  buttonLabel?: string;
  placeholder?: string;
  className?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function EmailCapture({
  variant,
  onSubmit,
  onClose,
  buttonLabel,
  placeholder = 'YOUR EMAIL ADDRESS',
  className = '',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultLabel =
    variant === 'modal' ? 'UNLOCK YOUR RESULTS' : 'SUBMIT';

  useEffect(() => {
    if (variant === 'modal' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [variant]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      if (!email.trim()) {
        setError('Email is required');
        return;
      }

      if (!isValidEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      setLoading(true);
      try {
        const result = await onSubmit(email);
        if (!result.success) {
          setError(result.error || 'Something went wrong. Please try again.');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [email, onSubmit]
  );

  const inputElement = (
    <input
      ref={inputRef}
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        if (error) setError('');
      }}
      placeholder={placeholder}
      autoComplete="email"
      className={`min-h-[48px] w-full border-3 border-border-hard bg-transparent px-4 py-3 font-body text-base text-text-primary outline-none placeholder:text-text-muted focus:border-cyan ${
        variant === 'banner' ? 'bg-darker-bg' : ''
      }`}
      aria-label="Email address"
      aria-invalid={error ? true : undefined}
      disabled={loading}
    />
  );

  const errorElement = error ? (
    <p className="font-mono text-xs text-error" role="alert">
      {error}
    </p>
  ) : null;

  /* ── Modal variant ── */
  if (variant === 'modal') {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Enter your email to unlock results"
      >
        <div className="w-full max-w-md border-3 border-border-hard bg-card-surface p-8 shadow-[6px_6px_0px_#000]">
          <h2 className="font-heading text-2xl font-extrabold uppercase tracking-widest text-text-primary">
            UNLOCK YOUR RESULTS
          </h2>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Enter your email to see your personalized TDEE and macro breakdown.
            No spam, ever.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {inputElement}
            {errorElement}
            <BrutalistButton
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'SUBMITTING...' : (buttonLabel ?? defaultLabel)}
            </BrutalistButton>
          </form>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text-primary focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
            >
              SKIP FOR NOW
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Inline variant ── */
  if (variant === 'inline') {
    return (
      <form
        onSubmit={handleSubmit}
        className={`space-y-2 ${className}`}
      >
        <div className="flex gap-0">
          {inputElement}
          <BrutalistButton
            type="submit"
            className="shrink-0"
            disabled={loading}
          >
            {loading ? '...' : (buttonLabel ?? defaultLabel)}
          </BrutalistButton>
        </div>
        {errorElement}
      </form>
    );
  }

  /* ── Banner variant ── */
  return (
    <div className={`w-full bg-cyan p-6 md:p-8 ${className}`}>
      <div className="mx-auto max-w-2xl space-y-4">
        <h3 className="font-heading text-xl font-extrabold uppercase tracking-widest text-darker-bg">
          STAY IN THE LOOP
        </h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col gap-0 sm:flex-row">
            {inputElement}
            <BrutalistButton
              type="submit"
              variant="secondary"
              className="shrink-0"
              disabled={loading}
            >
              {loading ? '...' : (buttonLabel ?? defaultLabel)}
            </BrutalistButton>
          </div>
          {errorElement}
        </form>
      </div>
    </div>
  );
}
