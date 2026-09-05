type LoadingStateProps = {
  label?: string
}

export default function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-700 border-t-transparent" />
      <span>{label}</span>
    </div>
  )
}
