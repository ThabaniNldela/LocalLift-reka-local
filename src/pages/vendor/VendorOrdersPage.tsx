import { useState } from "react"

import Card from "@/components/common/Card"
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
          <Card key={order.id} title={`${order.customerName} • ${formatCurrency(order.totalAmount)}`} subtitle={formatDateTime(order.createdAt)}>
            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="text-sm font-medium text-slate-900">Items</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {order.items.map((item) => (
                    <li className="flex items-center justify-between" key={item.id}>
                      <span>{item.quantity} × {item.productName}</span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
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
