import type { OrderStatus } from "@/types"

type OrderStatusSelectProps = {
  value: OrderStatus
  onChange: (status: OrderStatus) => void
}

const statuses: OrderStatus[] = ["pending", "confirmed", "preparing", "ready", "out_for_delivery", "completed", "cancelled"]

export default function OrderStatusSelect({ onChange, value }: OrderStatusSelectProps) {
  return (
    <select
      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
      onChange={(event) => onChange(event.target.value as OrderStatus)}
      value={value}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>{status.replaceAll("_", " ")}</option>
      ))}
    </select>
  )
}
