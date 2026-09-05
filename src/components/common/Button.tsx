import type { ButtonHTMLAttributes, PropsWithChildren } from "react"

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  fullWidth?: boolean
}

const variants = {
  primary: "bg-emerald-800 text-white hover:bg-emerald-700",
  secondary: "bg-amber-500 text-slate-950 hover:bg-amber-400",
  ghost: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  danger: "bg-rose-600 text-white hover:bg-rose-500",
}

export default function Button({ children, className = "", variant = "primary", fullWidth, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
