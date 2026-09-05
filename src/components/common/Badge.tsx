type BadgeProps = {
  label: string
  tone?: "default" | "success" | "warning" | "danger"
}

const tones = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-rose-100 text-rose-700",
}

export default function Badge({ label, tone = "default" }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{label}</span>
}
