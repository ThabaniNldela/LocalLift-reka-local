import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export function Input({ className = "", error, label, ...props }: InputProps) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 ${className}`.trim()}
        {...props}
      />
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  )
}

export function Textarea({ className = "", error, label, ...props }: TextareaProps) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <textarea
        className={`min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 ${className}`.trim()}
        {...props}
      />
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  )
}
