import Badge from "@/components/common/Badge"
import Card from "@/components/common/Card"
import EmptyState from "@/components/common/EmptyState"
import SectionHeading from "@/components/common/SectionHeading"
import type { Order } from "@/types"
import { formatCurrency, formatDateTime } from "@/utils/format"

type OrderHistoryPageProps = {
  onOpenOrder: (orderId: string) => void
  orders: Order[]
}

export default function OrderHistoryPage({ onOpenOrder, orders }: OrderHistoryPageProps) {
  if (orders.length === 0) {
    return <EmptyState title="No orders yet" description="Once you place your first order, it will appear here with live status tracking." />
  }

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Orders" title="Track every purchase" description="View statuses, delivery information, and payment details for each order." />
      <div className="space-y-4">
        {orders.map((order) => (
          <Card action={<button className="text-sm font-semibold text-emerald-700" onClick={() => onOpenOrder(order.id)} type="button">View details</button>} key={order.id} title={order.vendorName} subtitle={formatDateTime(order.createdAt)}>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Status</p>
                <div className="mt-2"><Badge label={order.status} tone={order.status === "completed" ? "success" : "warning"} /></div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Total</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{formatCurrency(order.totalAmount)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Payment</p>
                <p className="mt-2 text-sm text-slate-600">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Items</p>
                <p className="mt-2 text-sm text-slate-600">{order.items.length} item(s)</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
