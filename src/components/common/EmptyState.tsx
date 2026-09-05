import Button from "@/components/common/Button"

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ actionLabel, description, onAction, title }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      {actionLabel && onAction ? <Button className="mt-4" onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  )
}
