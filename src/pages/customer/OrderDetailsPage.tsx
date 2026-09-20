import Badge from "@/components/common/Badge"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import OrderTrackingMap from "@/components/common/OrderTrackingMap"
import SectionHeading from "@/components/common/SectionHeading"
import type { Order } from "@/types"
import { formatCurrency, formatDateTime } from "@/utils/format"

type OrderDetailsPageProps = {
  onBack: () => void
  order: Order
}

const paymentLabel = (order: Order) => {
  if (order.paymentStatus === "paid") return "Paid"
  if (order.paymentStatus === "pending_vendor_payment") return "Pay vendor directly after acceptance"
  if (order.paymentStatus === "cash_on_delivery") return "Pay cash when your order arrives"
  return order.paymentMethod
}

export default function OrderDetailsPage({ onBack, order }: OrderDetailsPageProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Button onClick={onBack} variant="ghost">← Back to orders</Button>
      <SectionHeading eyebrow="Order tracking" title={`Order from ${order.vendorName || "your local vendor"}`} description={`Order ${order.id} · placed ${formatDateTime(order.createdAt)}`} />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card title="Live delivery status" subtitle="We show an approximate delivery area to protect your privacy.">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Badge label={order.status} tone={order.status === "completed" ? "success" : order.status === "cancelled" ? "danger" : "warning"} />
            <p className="text-xs text-slate-500">Updated {formatDateTime(order.updatedAt)}</p>
          </div>
          <OrderTrackingMap order={order} />
        </Card>

        <Card title="Delivery and payment">
          <dl className="space-y-4 text-sm">
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Delivery address</dt><dd className="mt-1 leading-6 text-slate-700">{order.deliveryAddress || "Collection details will be shared by the vendor."}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Payment method</dt><dd className="mt-1 font-medium text-slate-900">{order.paymentMethod}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Payment status</dt><dd className="mt-1 text-slate-700">{paymentLabel(order)}</dd></div>
            {order.notes ? <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Order note</dt><dd className="mt-1 text-slate-700">{order.notes}</dd></div> : null}
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">Receipt</dt><dd className="mt-1 text-slate-700">{order.receipt?.status === "sent" ? "Sent to your email" : "Available when email delivery is configured"}</dd></div>
          </dl>
        </Card>
      </div>

      <Card title="Order summary" subtitle={`${order.items.length} item${order.items.length === 1 ? "" : "s"} from ${order.vendorName || "your vendor"}`}>
        <div className="divide-y divide-slate-100">
          {order.items.map((item) => (
            <div className="flex items-center justify-between gap-4 py-4 text-sm" key={item.id}>
              <div><p className="font-semibold text-slate-900">{item.productName}</p><p className="mt-1 text-slate-500">{item.quantity} × {formatCurrency(item.price)}</p></div>
              <strong className="text-slate-900">{formatCurrency(item.quantity * item.price)}</strong>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 text-lg font-extrabold text-slate-950"><span>Total</span><span>{formatCurrency(order.totalAmount)}</span></div>
        </div>
      </Card>
    </div>
  )
}
