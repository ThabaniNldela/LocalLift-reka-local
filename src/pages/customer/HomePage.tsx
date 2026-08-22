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
  // Show only top 3 featured vendors on homepage
  const showcaseVendors = featuredVendors.slice(0, 3)

  return (
    <div className="space-y-12">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[2rem]">
        {/* Background hero image – South African street food market */}
        <img
          alt="South African street food vendors at a local market"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/80 to-amber-600/60" />

        <div className="relative grid gap-8 px-6 py-12 text-white md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-16">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">🇿🇦 Support local. Grow together.</p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
              South Africa's favourite local food vendors, now online.
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/85">
              Vetkoek from Hatfield. Bunny chow from Durban. Boerewors rolls from Soweto. Gatsby from the Cape Flats.
              Order authentic township food from vendors you can trust — delivered in minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onBrowse} variant="secondary">Explore vendors</Button>
              <Button onClick={onVendorJoin} variant="ghost">Sell on Reka Local</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "6 Cities", value: "Pretoria · JHB · Durban · Cape Town · Vaal · Tembisa" },
                { label: "85k+", value: "Orders delivered" },
                { label: "4.8★", value: "Average vendor rating" },
              ].map((item) => (
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm" key={item.value}>
                  <p className="text-xl font-semibold">{item.label}</p>
                  <p className="mt-1 text-xs text-white/70">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur">
            <div className="space-y-4 text-slate-900">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">🍴 How it works</p>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <strong className="block text-slate-900">1. Discover</strong>
                  Search vetkoek, bunny chow, boerewors, gatsby, pap & wors, kotas, and more from verified vendors near you.
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <strong className="block text-slate-900">2. Order</strong>
                  Add to cart, choose cash, card, or mobile wallet payment, and confirm in seconds.
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <strong className="block text-slate-900">3. Enjoy</strong>
                  Track delivery, leave a review, and support local livelihoods — one order at a time.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Food category pills ────────────────────────────────── */}
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Popular categories</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "🥖 Vetkoek & Amagwinya", id: "vendor-mama-thandi" },
            { label: "🍞 Bunny Chow", id: "vendor-durban-bunny" },
            { label: "🌭 Boerewors Rolls", id: "vendor-bra-zakes" },
            { label: "🥪 Gatsby", id: "vendor-gatsby-cape" },
            { label: "🍚 Pap & Wors", id: "vendor-pap-shack" },
            { label: "🍞 Kotas", id: "vendor-kota-king" },
          ].map((cat) => (
            <button
              className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 hover:shadow-sm"
              key={cat.id}
              onClick={() => onOpenVendor(cat.id)}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured vendors ──────────────────────────────────── */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Featured vendors"
          title="Loved by your community"
          description="Handpicked vendors serving authentic South African street food you can order right now."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcaseVendors.map((vendor) => <VendorCard key={vendor.id} onOpen={onOpenVendor} vendor={vendor} />)}
        </div>
        <div className="text-center">
          <Button onClick={onBrowse} variant="outline">See all vendors →</Button>
        </div>
      </section>

      {/* ── Value props ───────────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { emoji: "🛒", title: "Built for customers", body: "Browse bunny chow, vetkoek, gatsby and more by category, compare ratings, and order from vendors trusted by your neighbours." },
          { emoji: "🏪", title: "Built for vendors", body: "Manage products, process orders, collect payment, and track your revenue — all in one simple dashboard." },
          { emoji: "🌱", title: "Built for the township economy", body: "Every order directly supports a local entrepreneur. We exist to make the informal economy visible, trusted, and accessible." },
        ].map((item) => (
          <Card key={item.title} title={`${item.emoji} ${item.title}`}>
            <p className="text-sm leading-6 text-slate-600">{item.body}</p>
          </Card>
        ))}
      </section>
    </div>
  )
}
