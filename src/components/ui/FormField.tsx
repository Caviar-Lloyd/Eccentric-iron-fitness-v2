'use client';

import { type InputHTMLAttributes, type SelectHTMLAttributes, type ReactNode, useId } from 'react';

/* ── Standard text input ── */

type StandardProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormField({ label, error, className = '', id: propId, ...props }: StandardProps) {
  const autoId = useId();
  const id = propId ?? autoId;
  const errorId = `${id}-error`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        className={`w-full border-b-3 bg-transparent px-0 py-3 font-body text-base text-text-primary outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-cyan disabled:cursor-not-allowed disabled:opacity-50 ${
          error ? 'border-error' : 'border-border'
        }`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="font-mono text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Select dropdown ── */

type SelectFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ label, error, children, className = '', id: propId, ...props }: SelectFieldProps) {
  const autoId = useId();
  const id = propId ?? autoId;
  const errorId = `${id}-error`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary">
        {label}
      </label>
      <select
        id={id}
        className={`w-full appearance-none border-b-3 bg-transparent px-0 py-3 font-body text-base text-text-primary outline-none transition-colors duration-150 focus:border-cyan disabled:cursor-not-allowed disabled:opacity-50 ${
          error ? 'border-error' : 'border-border'
        }`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="font-mono text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Toggle (binary choice) ── */

type ToggleFieldProps = {
  label: string;
  options: [string, string];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function ToggleField({ label, options, value, onChange, className = '' }: ToggleFieldProps) {
  const groupId = useId();

  return (
    <fieldset className={`flex flex-col gap-1 ${className}`} role="radiogroup" aria-labelledby={groupId}>
      <legend id={groupId} className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary">
        {label}
      </legend>
      <div className="flex">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={`min-h-[48px] flex-1 border-3 border-border-hard px-4 py-2 font-mono text-sm uppercase tracking-widest transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 ${
              value === option
                ? 'bg-cyan text-darker-bg'
                : 'bg-transparent text-text-primary hover:bg-card-surface'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* ── Search input ── */

type SearchFieldProps = {
  label?: string;
  onSubmit?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function SearchField({ label = 'Search', onSubmit, className = '', id: propId, ...props }: SearchFieldProps) {
  const autoId = useId();
  const id = propId ?? autoId;

  return (
    <div className={`flex ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        className="min-h-[48px] flex-1 border-3 border-r-0 border-border-hard bg-transparent px-4 py-2 font-body text-base text-text-primary outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-cyan"
        {...props}
      />
      <button
        type="button"
        onClick={onSubmit}
        className="min-h-[48px] border-3 border-border-hard bg-cyan px-4 font-mono text-sm uppercase tracking-widest text-darker-bg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-y-0 active:shadow-none focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
        aria-label={label}
      >
        GO
      </button>
    </div>
  );
}
