import Card from "@/components/common/Card"
import SectionHeading from "@/components/common/SectionHeading"
import { vendorDashboardStats } from "@/data/mockData"
import { formatCurrency } from "@/utils/format"

export default function VendorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Analytics" title="Understand your business performance" description="Track revenue, order volume, and top products across the week." />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card title="Weekly sales">
          <div className="flex h-72 items-end gap-3">
            {vendorDashboardStats.salesTrend.map((point) => (
              <div className="flex flex-1 flex-col items-center gap-3" key={point.label}>
                <div className="w-full rounded-t-2xl bg-emerald-700" style={{ height: `${Math.max(24, point.value / 40)}px` }} />
                <span className="text-xs text-slate-500">{point.label}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Top products">
          <div className="space-y-4">
            {vendorDashboardStats.topProducts.map((product) => (
              <div className="rounded-2xl bg-slate-50 p-4" key={product.label}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">{product.label}</span>
                  <span className="text-sm text-slate-500">{product.value} orders</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Total revenue"><p className="text-3xl font-semibold text-slate-950">{formatCurrency(vendorDashboardStats.totalRevenue)}</p></Card>
        <Card title="Completed orders"><p className="text-3xl font-semibold text-slate-950">{vendorDashboardStats.completedOrders}</p></Card>
        <Card title="Returning customers"><p className="text-3xl font-semibold text-slate-950">{vendorDashboardStats.returningCustomers}%</p></Card>
      </div>
    </div>
  )
}
