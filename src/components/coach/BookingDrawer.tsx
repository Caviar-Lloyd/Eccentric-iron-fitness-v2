'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { FormField } from '@/components/ui/FormField';
import { BrutalistButton } from '@/components/ui/BrutalistButton';
import { SlideOutDrawer } from '@/components/ui/SlideOutDrawer';
import { submitContactForm } from '@/app/contact/actions';

type BookingDrawerProps = {
  coachId: string;
  coachName: string;
};

export function BookingDrawer({ coachId, coachName }: BookingDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [smsOptIn, setSmsOptIn] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setFieldErrors({});
      setLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.set('coach_id', coachId);
      if (smsOptIn) formData.set('sms_opt_in', 'true');

      try {
        const result = await submitContactForm(formData);
        if (result.success) {
          setSubmitted(true);
        } else if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        } else {
          setError(result.error || 'Something went wrong. Please try again.');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [coachId, smsOptIn]
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setSubmitted(false);
    setError('');
    setFieldErrors({});
    setSmsOptIn(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-cyan px-8 font-mono text-sm font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-none"
      >
        BOOK DISCOVERY CALL <span className="ml-2" aria-hidden="true">&rarr;</span>
      </button>

      <SlideOutDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="BOOK A CALL"
      >
        {submitted ? (
          <div className="py-12 text-center">
            <p className="font-heading text-3xl font-extrabold uppercase tracking-widest text-cyan">
              MESSAGE SENT
            </p>
            <p className="mt-4 font-body text-base text-text-secondary">
              {coachName} will get back to you within 24 hours.
            </p>
            <BrutalistButton
              type="button"
              className="mt-8"
              onClick={() => setIsOpen(false)}
            >
              CLOSE
            </BrutalistButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <p className="font-body text-sm text-text-secondary">
              Book a free discovery call with <strong className="text-text-primary">{coachName}</strong> to discuss your goals.
            </p>

            <FormField
              label="Name"
              name="name"
              type="text"
              placeholder="Your full name"
              required
              error={fieldErrors.name}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              error={fieldErrors.email}
            />

            <FormField
              label="Phone (Optional)"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              error={fieldErrors.phone}
            />

            <div className="flex flex-col gap-1">
              <label
                htmlFor="drawer-message"
                className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary"
              >
                Message
              </label>
              <textarea
                id="drawer-message"
                name="message"
                rows={4}
                placeholder="Tell us about your goals..."
                required
                className={`w-full resize-y border-b-3 bg-transparent px-0 py-3 font-body text-base text-text-primary outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-cyan ${
                  fieldErrors.message ? 'border-error' : 'border-border'
                }`}
              />
              {fieldErrors.message && (
                <p className="font-mono text-xs text-error" role="alert">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {/* SMS Opt-in (optional, unchecked by default) */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-cyan"
              />
              <span className="font-body text-xs leading-relaxed text-text-muted">
                I agree to receive SMS/text messages from Eccentric Iron Fitness including
                promotions, reminders, and fitness tips. Message frequency varies. Msg &amp; data
                rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a
                condition of purchase.
              </span>
            </label>

            {/* Legal links */}
            <p className="font-body text-[11px] leading-relaxed text-text-muted">
              By submitting this form, you agree to our{' '}
              <Link href="/privacy" className="text-cyan hover:underline" target="_blank">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-cyan hover:underline" target="_blank">
                Terms &amp; Conditions
              </Link>
              .
            </p>

            {error && (
              <div className="border-3 border-error bg-error/10 p-4">
                <p className="font-mono text-sm text-error" role="alert">{error}</p>
              </div>
            )}

            <BrutalistButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </BrutalistButton>
          </form>
        )}
      </SlideOutDrawer>
    </>
  );
}
