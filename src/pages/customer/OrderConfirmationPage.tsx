import Badge from "@/components/common/Badge"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import SectionHeading from "@/components/common/SectionHeading"
import type { Order } from "@/types"
import { formatCurrency, formatDateTime } from "@/utils/format"

type OrderConfirmationPageProps = {
  onTrackOrder: () => void
  order: Order
}

export default function OrderConfirmationPage({ onTrackOrder, order }: OrderConfirmationPageProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SectionHeading align="center" eyebrow="Order placed" title="Your order is confirmed" description="Your vendor has received the request and is preparing the order." />
      <Card className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">✓</div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-900">Order #{order.id}</h3>
          <p className="mt-2 text-sm text-slate-500">Placed on {formatDateTime(order.createdAt)}</p>
        </div>
        <div className="flex justify-center"><Badge label={order.status} tone="success" /></div>
        <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 text-left text-sm text-slate-600">
          <div className="flex justify-between"><span>Vendor</span><span>{order.vendorName}</span></div>
          <div className="flex justify-between"><span>Payment</span><span>{order.paymentMethod}</span></div>
          <div className="flex justify-between"><span>Total</span><span>{formatCurrency(order.totalAmount)}</span></div>
        </div>
        <Button onClick={onTrackOrder}>Track order</Button>
      </Card>
    </div>
  )
}
