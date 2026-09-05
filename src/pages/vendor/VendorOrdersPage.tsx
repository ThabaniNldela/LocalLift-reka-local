import { useState } from "react"

import Card from "@/components/common/Card"
import OrderTrackingMap from "@/components/common/OrderTrackingMap"
import SectionHeading from "@/components/common/SectionHeading"
import OrderStatusSelect from "@/components/vendor/OrderStatusSelect"
import { demoOrders } from "@/data/mockData"
import type { OrderStatus } from "@/types"
import { formatCurrency, formatDateTime } from "@/utils/format"

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState(demoOrders)

  const updateStatus = (orderId: string, status: OrderStatus) => {
    setOrders((current) => current.map((order) => order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order))
  }

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Orders" title="Manage incoming orders" description="Confirm orders, update statuses, and coordinate with customers efficiently." />
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} title={`${order.customerName} • ${formatCurrency(order.totalAmount)}`} subtitle={`Order ${order.id} · ${formatDateTime(order.createdAt)}`}>
            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <div className="mb-4 grid gap-3 rounded-2xl bg-emerald-50 p-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Customer name</p>
                    <p className="mt-1 font-semibold text-slate-900">{order.customerName || "Customer"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Customer ID</p>
                    <p className="mt-1 break-all font-mono text-xs text-slate-700">{order.customerId}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-900">Items</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {order.items.map((item) => (
                    <li className="flex items-center justify-between" key={item.id}>
                      <span>{item.quantity} × {item.productName}</span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-slate-900">Live order map</p>
                  <OrderTrackingMap order={order} />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">Delivery address</p>
                  <p className="mt-2 text-sm text-slate-600">{order.deliveryAddress}</p>
                </div>
                <OrderStatusSelect onChange={(status) => updateStatus(order.id, status)} value={order.status} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
