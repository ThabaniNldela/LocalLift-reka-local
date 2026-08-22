import type { ReactNode } from "react"

type AlertProps = {
  children: ReactNode
  variant?: "info" | "success" | "warning" | "error"
}

const styles = {
  info: "border-slate-200 bg-slate-50 text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
}

export default function Alert({ children, variant = "info" }: AlertProps) {
  return <div className={`rounded-2xl border px-4 py-3 text-sm ${styles[variant]}`}>{children}</div>
}
