import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const fieldBaseStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-500 focus:outline-2 focus:outline-offset-0 focus:outline-blue-100 disabled:bg-slate-50 disabled:text-slate-400";

type FieldWrapperProps = {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function FieldWrapper({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
          {label}
          {required ? <span className="ml-0.5 text-blue-600">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-sm text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, required, wrapperClassName, className, id, ...props },
  ref
) {
  return (
    <FieldWrapper
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <input
        ref={ref}
        id={id}
        required={required}
        className={cn(
          fieldBaseStyles,
          error && "border-red-300 focus:border-red-500 focus:outline-red-100",
          className
        )}
        {...props}
      />
    </FieldWrapper>
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function Textarea({
  label,
  error,
  hint,
  required,
  wrapperClassName,
  className,
  id,
  ...props
}: TextareaProps) {
  return (
    <FieldWrapper
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <textarea
        id={id}
        required={required}
        className={cn(fieldBaseStyles, "min-h-28 resize-y", className)}
        {...props}
      />
    </FieldWrapper>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
};

export function Select({
  label,
  error,
  hint,
  required,
  wrapperClassName,
  className,
  id,
  children,
  ...props
}: SelectProps) {
  return (
    <FieldWrapper
      label={label}
      htmlFor={id}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <select
        id={id}
        required={required}
        className={cn(fieldBaseStyles, "pr-8", className)}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
