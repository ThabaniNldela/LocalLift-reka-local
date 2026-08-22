import Badge from "@/components/common/Badge"
import Card from "@/components/common/Card"
import SectionHeading from "@/components/common/SectionHeading"
import { demoOrders, vendorDashboardStats } from "@/data/mockData"
import { formatCurrency, formatDateTime } from "@/utils/format"

export default function VendorDashboardPage() {
  const stats = [
    { label: "Revenue", value: formatCurrency(vendorDashboardStats.totalRevenue) },
    { label: "Orders", value: String(vendorDashboardStats.totalOrders) },
    { label: "Products", value: String(vendorDashboardStats.activeProducts) },
    { label: "Average rating", value: vendorDashboardStats.averageRating.toFixed(1) },
  ]

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Dashboard" title="Keep your store running smoothly" description="Monitor demand, track recent orders, and take action on the tasks that matter today." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card title="Recent orders" subtitle="Review the latest incoming orders from customers.">
          <div className="space-y-4">
            {demoOrders.map((order) => (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4" key={order.id}>
                <div>
                  <p className="font-semibold text-slate-900">{order.customerName}</p>
                  <p className="text-sm text-slate-500">{formatDateTime(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <Badge label={order.status} tone={order.status === "completed" ? "success" : "warning"} />
                  <p className="mt-2 text-sm font-semibold text-slate-900">{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Operational checklist" subtitle="Suggested actions based on live store activity.">
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-amber-50 p-4">Confirm today's ready-for-pickup orders before 13:00.</div>
            <div className="rounded-2xl bg-emerald-50 p-4">Restock Mince Vetkoek to avoid running out during lunch peak.</div>
            <div className="rounded-2xl bg-slate-50 p-4">Reply to recent reviews to keep your response rate high.</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
