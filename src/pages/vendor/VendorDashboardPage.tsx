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
      <section className="grid gap-6 lg:grid-cols-2">
        <Card title="Food rescue opportunity" subtitle="Turn remaining fresh stock into income before closing time.">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-semibold text-slate-900">7 Mince Vetkoek packs are still available</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Offer them at R18 instead of R28 from 17:15. This could recover R126 in revenue while preventing food waste.</p>
            <button className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">Create rescue offer</button>
          </div>
        </Card>
        <Card title="AI business coach" subtitle="Clear actions, based on your local sales patterns.">
          <div className="space-y-3 text-sm">
            <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-950">📈 Prepare 18 additional Mince Vetkoek portions for tomorrow&apos;s lunch peak.</div>
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">🤝 Invite 12 returning customers back with a R10 loyalty offer.</div>
          </div>
        </Card>
      </section>
    </div>
  )
}
