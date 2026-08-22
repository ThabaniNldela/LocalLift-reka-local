import Button from "@/components/common/Button"
import VendorCard from "@/components/customer/VendorCard"
import { featuredVendors } from "@/data/mockData"

type HomePageProps = {
  onBrowse: () => void
  onOpenVendor: (vendorId: string) => void
  onVendorJoin: () => void
}

const VENDOR_PHOTOS = [
  { src: "/images/vendors-smiling-women.jpg", caption: "Mama Thandi's Vetkoek", location: "Hatfield, Pretoria" },
  { src: "/images/market-tomatoes-stall.jpg", caption: "Fresh Market Produce", location: "Joburg CBD" },
  { src: "/images/vendor-yellow-fruit.jpg", caption: "Fruit & Spice Corner", location: "Tembisa" },
  { src: "/images/colorful-fruit-stall.jpg", caption: "Cape Town Gatsby Bar", location: "Cape Flats" },
]

const GALLERY = [
  { src: "/images/fresh-produce-shelves.jpg", label: "Fresh Produce" },
  { src: "/images/customer-shopping-market.jpg", label: "Local Markets" },
  { src: "/images/farmer-vegetable-crate.jpg", label: "Farm to Table" },
  { src: "/images/diverse-market-team.jpg", label: "Community Vendors" },
  { src: "/images/african-pickles-market.jpg", label: "Traditional Foods" },
  { src: "/images/colorful-peppers-market.jpg", label: "Fresh Spices" },
]

const CATEGORIES = [
  { label: "🥖 Vetkoek & Amagwinya", id: "vendor-mama-thandi" },
  { label: "🍞 Bunny Chow", id: "vendor-durban-bunny" },
  { label: "🌭 Boerewors Rolls", id: "vendor-bra-zakes" },
  { label: "🥪 Gatsby", id: "vendor-gatsby-cape" },
  { label: "🍚 Pap & Wors", id: "vendor-pap-shack" },
  { label: "🍞 Kotas", id: "vendor-kota-king" },
]

export default function HomePage({ onBrowse, onOpenVendor, onVendorJoin }: HomePageProps) {
  const showcaseVendors = featuredVendors.slice(0, 3)

  return (
    <div className="space-y-16 -mt-8">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative -mx-4 -mt-8 overflow-hidden sm:-mx-6 lg:-mx-8">
        <img
          alt="South African street food vendors"
          className="h-[70vh] w-full object-cover object-center"
          src="/images/vendor-cucumbers-apron.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl space-y-6 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-sm">
                🇿🇦 South Africa&apos;s Community Market
              </div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Real Vendors.<br />
                <span className="text-amber-300">Real Food.</span><br />
                Real Community.
              </h1>
              <p className="text-base leading-7 text-white/85 md:text-lg">
                Vetkoek from Hatfield. Bunny chow from Durban. Boerewors rolls from Soweto.
                Order directly from trusted street vendors and support local livelihoods.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={onBrowse} variant="secondary">
                  Browse vendors →
                </Button>
                <button
                  className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition"
                  onClick={onVendorJoin}
                  type="button"
                >
                  Sell on Reka Local
                </button>
              </div>
              <div className="flex flex-wrap gap-6 pt-2">
                {[["85k+", "Orders"], ["6", "Cities"], ["4.8★", "Rating"]].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-2xl font-black text-amber-300">{n}</p>
                    <p className="text-xs text-white/60">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo strip: Meet the vendors ─────────────────────── */}
      <section className="px-4 sm:px-0 space-y-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">Our vendors</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">Meet the people behind the food</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {VENDOR_PHOTOS.map((p) => (
            <div className="group relative overflow-hidden rounded-2xl shadow-md aspect-[3/4] cursor-pointer" key={p.src} onClick={onBrowse}>
              <img alt={p.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={p.src} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-3 text-white">
                <p className="text-sm font-bold leading-tight">{p.caption}</p>
                <p className="text-[11px] text-white/70">{p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category pills ─────────────────────────────────────── */}
      <section className="space-y-4 px-4 sm:px-0">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Browse by category</p>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              className="rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50 hover:shadow-md"
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
      <section className="space-y-6 px-4 sm:px-0">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">Top picks</p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">Loved by your community</h2>
          </div>
          <button
            className="hidden text-sm font-semibold text-emerald-700 hover:underline sm:block"
            onClick={onBrowse}
            type="button"
          >
            See all →
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcaseVendors.map((vendor) => <VendorCard key={vendor.id} onOpen={onOpenVendor} vendor={vendor} />)}
        </div>
        <div className="pt-2 text-center sm:hidden">
          <Button onClick={onBrowse} variant="secondary">See all vendors →</Button>
        </div>
      </section>

      {/* ── Photo gallery strip ───────────────────────────────── */}
      <section className="relative -mx-4 overflow-hidden bg-emerald-950 py-12 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Our marketplace</p>
            <h2 className="mt-1 text-2xl font-extrabold md:text-3xl">From farms to your door</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {GALLERY.map((g) => (
              <div className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer" key={g.src}>
                <img alt={g.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" src={g.src} />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100 flex items-center justify-center">
                  <p className="text-xs font-bold text-white text-center px-2">{g.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="px-4 sm:px-0">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">Simple process</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">How Reka Local works</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { step: "01", emoji: "🔍", title: "Discover", body: "Browse vendors by food type, location, or rating. Search vetkoek, bunny chow, boerewors, gatsby, pap & wors, kotas, and more." },
            { step: "02", emoji: "🛒", title: "Order", body: "Add items to your cart, choose a delivery time, and pay with cash, card, or Snapscan. Confirmation in seconds." },
            { step: "03", emoji: "🌟", title: "Enjoy & Support", body: "Track your delivery, leave a review, and know that every order supports a real person building their business." },
          ].map((item) => (
            <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-stone-100" key={item.step}>
              <div className="absolute top-4 right-4 text-5xl font-black text-slate-50">{item.step}</div>
              <div className="mb-4 text-4xl">{item.emoji}</div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vendor CTA banner ────────────────────────────────── */}
      <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
        <img
          alt="Vendor market scene"
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/vendor-woman-crates.jpg"
        />
        <div className="absolute inset-0 bg-emerald-950/85" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Join 200+ vendors</p>
          <h2 className="text-3xl font-extrabold md:text-4xl">Ready to grow your business?</h2>
          <p className="mt-4 text-base text-white/80 max-w-xl mx-auto">
            Register as a vendor, list your products, and start receiving orders from customers across your city — completely free to start.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={onVendorJoin} variant="secondary">Start selling today →</Button>
            <button
              className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              onClick={onBrowse}
              type="button"
            >
              Explore as customer
            </button>
          </div>
        </div>
      </section>

      {/* ── Social proof ─────────────────────────────────────── */}
      <section className="px-4 sm:px-0">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">Testimonials</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">What our community says</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              photo: "/images/vendors-smiling-women.jpg",
              name: "Thandi M.",
              role: "Vendor · Hatfield",
              quote: "Reka Local changed my business. I went from selling 20 vetkoek a day to over 80 orders — all from my phone. My kids can now go to better schools.",
            },
            {
              photo: "/images/market-tomatoes-exchange.jpg",
              name: "Sipho K.",
              role: "Customer · Soweto",
              quote: "I love ordering bunny chow from the original place. Fast, real, cheap. The tracking feature is amazing — I know exactly when my food arrives.",
            },
            {
              photo: "/images/farmer-vegetable-crate.jpg",
              name: "Fatima A.",
              role: "Vendor · Cape Flats",
              quote: "The vendor dashboard shows me exactly which products sell best. I cut slow sellers, doubled my gatsby range, and my revenue tripled in 3 months.",
            },
          ].map((t) => (
            <div className="overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm" key={t.name}>
              <div className="h-32 overflow-hidden">
                <img alt={t.name} className="h-full w-full object-cover" src={t.photo} />
              </div>
              <div className="p-5">
                <p className="text-sm italic leading-6 text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-800">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                  <div className="ml-auto text-amber-400 text-sm">★★★★★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Padding for footer */}
      <div className="h-4" />
    </div>
  )
}
