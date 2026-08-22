import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import SectionHeading from "@/components/common/SectionHeading"
import VendorCard from "@/components/customer/VendorCard"
import { featuredVendors } from "@/data/mockData"

type HomePageProps = {
  onBrowse: () => void
  onOpenVendor: (vendorId: string) => void
  onVendorJoin: () => void
}

export default function HomePage({ onBrowse, onOpenVendor, onVendorJoin }: HomePageProps) {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-amber-500 px-6 py-10 text-white md:grid-cols-[1.2fr_0.8fr] md:px-10">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">Support local. Grow together.</p>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">Discover trusted local vendors and order in minutes.</h2>
          <p className="max-w-xl text-base leading-7 text-white/80">Reka Local helps customers discover nearby vendors, place orders, track deliveries, and support the informal economy with confidence.</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onBrowse} variant="secondary">Explore vendors</Button>
            <Button onClick={onVendorJoin} variant="ghost">I am a vendor</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "12k+", value: "Vendors onboarded" },
              { label: "85k+", value: "Orders delivered" },
              { label: "4.8★", value: "Average rating" },
            ].map((item) => (
              <div className="rounded-2xl bg-white/10 p-4" key={item.value}>
                <p className="text-2xl font-semibold">{item.label}</p>
                <p className="text-sm text-white/70">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <Card className="bg-white/95">
          <div className="space-y-4 text-slate-900">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">How it works</p>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-slate-900">1. Discover</strong> Search verified vendors by location, rating, or category.</div>
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-slate-900">2. Order</strong> Add items to cart, choose delivery, and pay securely.</div>
              <div className="rounded-2xl bg-slate-50 p-4"><strong className="block text-slate-900">3. Track</strong> Follow your order status and leave reviews after delivery.</div>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Featured vendors" title="Popular in your area" description="Handpicked local businesses customers love for quality, speed, and reliability." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredVendors.map((vendor) => <VendorCard key={vendor.id} onOpen={onOpenVendor} vendor={vendor} />)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { title: "Built for customers", body: "Browse by category, compare ratings, and order from trusted vendors nearby." },
          { title: "Built for vendors", body: "Manage products, orders, customer reviews, and payouts in one dashboard." },
          { title: "Built for community", body: "Increase visibility for the informal economy and strengthen local livelihoods." },
        ].map((item) => (
          <Card key={item.title} title={item.title}>
            <p className="text-sm leading-6 text-slate-600">{item.body}</p>
          </Card>
        ))}
      </section>
    </div>
  )
}
