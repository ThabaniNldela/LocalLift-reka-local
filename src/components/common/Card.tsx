import type { PropsWithChildren, ReactNode } from "react"

type CardProps = PropsWithChildren<{
  title?: string
  subtitle?: string
  action?: ReactNode
  className?: string
}>

export default function Card({ action, children, className = "", subtitle, title }: CardProps) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${className}`.trim()}>
      {(title || subtitle || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
            {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
