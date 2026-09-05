import { useState } from "react"

import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import SectionHeading from "@/components/common/SectionHeading"
import { formatCurrency } from "@/utils/format"

const translations = {
  English: { title: "Community impact, made visible", description: "Every Reka Local order strengthens local livelihoods, cuts food waste, and makes community commerce more accessible." },
  isiZulu: { title: "Umthelela womphakathi uyabonakala", description: "Yonke i-oda ye-Reka Local iqinisa impilo yendawo futhi inciphise ukumoshwa kokudla." },
  Sepedi: { title: "Khuetso ya setshaba e a bonagala", description: "Otara ye nngwe le ye nngwe e tiiša dikgwebo tša selegae le go fokotša tshenyo ya dijo." },
  isiXhosa: { title: "Ifuthe loluntu liyabonakala", description: "I-odolo nganye ye-Reka Local ixhasa amashishini asekuhlaleni." },
  Setswana: { title: "Seabe sa baagi se a bonala", description: "Otata nngwe le nngwe e tshegetsa dikgwebo tsa mo gae." },
}

const rescueOffers = [
  { item: "Mince Vetkoek (2-pack)", vendor: "Mama Thandi's Vetkoek", before: 28, now: 18, remaining: 7, closes: "18:00" },
  { item: "Boerie + Chips Combo", vendor: "Bra Zakes Boerewors Corner", before: 70, now: 45, remaining: 4, closes: "20:00" },
  { item: "Seasonal Fruit Cup", vendor: "Nomsa's Fresh Fruits", before: 35, now: 22, remaining: 9, closes: "17:30" },
]

type ImpactHubPageProps = {
  onBrowse: () => void
  onVendorDashboard: () => void
}

export default function ImpactHubPage({ onBrowse, onVendorDashboard }: ImpactHubPageProps) {
  const [language, setLanguage] = useState<keyof typeof translations>("English")
  const [lowDataMode, setLowDataMode] = useState(false)
  const [claimedOffer, setClaimedOffer] = useState<string | null>(null)
  const [pin, setPin] = useState("")
  const [pinStatus, setPinStatus] = useState("")
  const copy = translations[language]

  const verifyPin = () => {
    setPinStatus(pin.length === 4 ? "Delivery confirmed. Enjoy your order!" : "Enter the 4-digit PIN shared with you by the customer.")
  }

  return (
    <div className={`space-y-10 ${lowDataMode ? "contrast-125" : ""}`}>
      <section className="relative overflow-hidden rounded-[2rem] bg-emerald-950 px-6 py-12 text-white md:px-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Reka Local Impact Hub</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">{copy.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={onBrowse} variant="secondary">Explore local offers</Button>
            <Button onClick={onVendorDashboard} variant="ghost">Open vendor tools</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["R 1.28m", "Kept in local economies"],
          ["42 680", "Meals rescued from waste"],
          ["286", "Active vendor livelihoods"],
          ["18.4 t", "Estimated CO2e avoided"],
        ].map(([value, label]) => (
          <Card className="border-emerald-100 bg-white" key={label}>
            <p className="text-3xl font-extrabold text-emerald-800">{value}</p>
            <p className="mt-2 text-sm text-slate-600">{label}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card title="Rescue tonight's food" subtitle="Fresh meals nearing closing time at a reduced price. You save money; vendors recover income; less food goes to waste.">
          <div className="space-y-3">
            {rescueOffers.map((offer) => (
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4" key={offer.item}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-200 text-xl">🌱</div>
                <div className="min-w-40 flex-1">
                  <p className="font-semibold text-slate-900">{offer.item}</p>
                  <p className="text-xs text-slate-600">{offer.vendor} · {offer.remaining} remaining · closes {offer.closes}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 line-through">{formatCurrency(offer.before)}</p>
                  <p className="font-bold text-emerald-800">{formatCurrency(offer.now)}</p>
                </div>
                <Button onClick={() => setClaimedOffer(offer.item)} variant="secondary">{claimedOffer === offer.item ? "Saved ✓" : "Rescue meal"}</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Accessible by design" subtitle="Built for the realities of local trading and mobile data.">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800" htmlFor="language">Language</label>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm" id="language" onChange={(event) => setLanguage(event.target.value as keyof typeof translations)} value={language}>
                {Object.keys(translations).map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
              <div><p className="font-semibold text-slate-900">Low-data mode</p><p className="text-xs text-slate-500">Prioritizes clear content and essential order actions.</p></div>
              <button aria-pressed={lowDataMode} className={`h-8 w-14 rounded-full p-1 transition ${lowDataMode ? "bg-emerald-700" : "bg-slate-300"}`} onClick={() => setLowDataMode((value) => !value)} type="button">
                <span className={`block h-6 w-6 rounded-full bg-white shadow transition ${lowDataMode ? "translate-x-6" : ""}`} />
              </button>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">💬 WhatsApp-ready order alerts are designed for vendors who trade from their phones.</div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card title="AI business coach" subtitle="Simple, explainable recommendations based on vendor sales patterns.">
          <div className="space-y-3">
            {[
              ["Peak opportunity", "Prepare 18 more Mince Vetkoek portions before the 12:00–14:00 lunch peak.", "📈"],
              ["Reduce waste", "Discount 7 remaining vetkoek portions through Food Rescue at 17:15.", "🌱"],
              ["Grow loyalty", "Send a thank-you offer to 12 returning customers who have not ordered this month.", "🤝"],
            ].map(([title, message, icon]) => (
              <div className="flex gap-3 rounded-2xl bg-slate-50 p-4" key={title}>
                <span className="text-2xl">{icon}</span><div><p className="font-semibold text-slate-900">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{message}</p></div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Safe handover with delivery PIN" subtitle="A one-time PIN confirms that the correct customer received the order.">
          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm leading-6 text-emerald-900">The customer receives a private four-digit code with their order. The rider confirms it at handover; no PIN is stored in the order record.</p>
            <div className="mt-4 flex gap-3">
              <input aria-label="Delivery confirmation PIN" className="min-w-0 flex-1 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-center font-mono tracking-[0.5em] outline-none focus:border-emerald-700" inputMode="numeric" maxLength={4} onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))} placeholder="0000" value={pin} />
              <Button onClick={verifyPin}>Confirm</Button>
            </div>
            {pinStatus ? <p className={`mt-3 text-sm ${pin.length === 4 ? "text-emerald-700" : "text-rose-700"}`}>{pinStatus}</p> : null}
          </div>
        </Card>
      </section>
    </div>
  )
}
