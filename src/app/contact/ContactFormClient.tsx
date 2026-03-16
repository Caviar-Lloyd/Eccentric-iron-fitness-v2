'use client';

import { useState, useCallback } from 'react';
import { FormField, SelectField } from '@/components/ui/FormField';
import { BrutalistButton } from '@/components/ui/BrutalistButton';
import { submitContactForm } from './actions';

type CoachOption = {
  id: string;
  name: string;
};

type ContactFormClientProps = {
  coaches: CoachOption[];
};

export function ContactFormClient({ coaches }: ContactFormClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setFieldErrors({});
      setLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

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
    []
  );

  if (submitted) {
    return (
      <div className="border-3 border-border-hard bg-card-surface p-12 text-center shadow-[4px_4px_0px_#000]">
        <p className="font-heading text-3xl font-extrabold uppercase tracking-widest text-success">
          MESSAGE SENT
        </p>
        <p className="mt-4 font-body text-base text-text-secondary">
          We will get back to you within 24 hours. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
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

      <SelectField
        label="Preferred Coach (Optional)"
        name="coach_id"
        error={fieldErrors.coach_id}
      >
        <option value="">Select a coach...</option>
        {coaches.map((coach) => (
          <option key={coach.id} value={coach.id}>
            {coach.name}
          </option>
        ))}
      </SelectField>

      {/* Textarea with brutalist styling matching FormField */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-message"
          className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us about your goals, questions, or how we can help..."
          required
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
          className={`w-full resize-y border-b-3 bg-transparent px-0 py-3 font-body text-base text-text-primary outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-cyan ${
            fieldErrors.message ? 'border-error' : 'border-border'
          }`}
        />
        {fieldErrors.message && (
          <p
            id="contact-message-error"
            className="font-mono text-xs text-error"
            role="alert"
          >
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Global error */}
      {error && (
        <div className="border-3 border-error bg-error/10 p-4">
          <p className="font-mono text-sm text-error" role="alert">
            {error}
          </p>
        </div>
      )}

      <BrutalistButton type="submit" className="w-full" disabled={loading}>
        {loading ? 'SENDING...' : 'SEND MESSAGE'}
      </BrutalistButton>
    </form>
  );
}
