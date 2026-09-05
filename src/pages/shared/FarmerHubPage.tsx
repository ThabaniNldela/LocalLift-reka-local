import { useEffect, useMemo, useState } from "react"

import { ApiError, farmersApi } from "@/api/client"

import Button from "@/components/common/Button"

import Card from "@/components/common/Card"

import SectionHeading from "@/components/common/SectionHeading"

import SupplyRouteMap from "@/components/common/SupplyRouteMap"

import { useApp } from "@/context/AppContext"

import { useAuth } from "@/context/AuthContext"

import type { FarmerImpact, HarvestListing } from "@/types"

import { formatCurrency } from "@/utils/format"

const listingImage = (listing: HarvestListing) =>
  listing.crop.toLowerCase().includes("tomato")
    ? "/images/greenhouse-growing.jpg"
    : "/images/farmer-harvesting-greens.jpg"

export default function FarmerHubPage() {
  const { navigate } = useApp()

  const { token } = useAuth()

  const [listings, setListings] = useState<HarvestListing[]>([])

  const [impact, setImpact] = useState<FarmerImpact | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  const [reservedListing, setReservedListing] = useState<string | null>(null)

  const [showTraceability, setShowTraceability] = useState(false)

  const totalReserved = useMemo(
    () => listings.reduce((sum, listing) => sum + listing.reservedQuantity, 0),
    [listings],
  )

  const supplyStops = useMemo(
    () => [
      ...listings.map((listing) => ({
        label: listing.farmerName,
        latitude: listing.latitude,
        longitude: listing.longitude,
        type: "farm" as const,
      })),

      {
        label: "Mama Thandi's Vetkoek",
        latitude: -25.7479,
        longitude: 28.2293,
        type: "vendor" as const,
      },

      {
        label: "Community collection point",
        latitude: -25.91,
        longitude: 28.17,
        type: "customer" as const,
      },
    ],
    [listings],
  )

  useEffect(() => {
    const loadExchange = async () => {
      try {
        const [harvests, impactData] = await Promise.all([
          farmersApi.listHarvests(),

          farmersApi.impact(),
        ])

        setListings(harvests.data)

        setImpact(impactData)
      } catch (loadError) {
        setError(
          loadError instanceof ApiError
            ? loadError.message
            : "Unable to load the harvest exchange. Please try again.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadExchange()
  }, [token])

  const reserveBulkOrder = async (listing: HarvestListing) => {
    if (!token) {
      navigate("login")

      return
    }

    try {
      setError(null)

      const reservation = await farmersApi.reserveHarvest(token, listing.id, 5)

      setListings((current) =>
        current.map((candidate) =>
          candidate.id === listing.id ? reservation.listing : candidate,
        ),
      )

      setReservedListing(listing.id)
    } catch (reservationError) {
      setError(
        reservationError instanceof ApiError
          ? reservationError.message
          : "Unable to reserve this harvest. Please try again.",
      )
    }
  }

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-emerald-950 px-6 py-12 text-white md:px-10">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src="/images/local-farm-harvest.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-950/50" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
            Farmer Hub
          </p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Harvest to market. Fairly, visibly, locally.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/80">
            Farmers list fresh harvests, local vendors buy together, and every
            customer can see where their food began.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              onClick={() =>
                document
                  .getElementById("harvest-listings")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="secondary"
            >
              Browse today&apos;s harvest
            </Button>
            <Button onClick={() => setShowTraceability(true)} variant="ghost">
              View traceability label
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [
            formatCurrency(impact?.farmerIncome ?? 0),
            "Farmer income this month",
          ],

          [`${totalReserved} units`, "Reserved by local vendors"],

          [`${impact?.produceRescuedKg ?? 0} kg`, "Produce saved from waste"],

          [
            String(impact?.businessesSupplied ?? 0),
            "Local businesses supplied",
          ],
        ].map(([value, label]) => (
          <Card key={label}>
            <p className="text-2xl font-extrabold text-emerald-800">{value}</p>
            <p className="mt-2 text-sm text-slate-600">{label}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-5" id="harvest-listings">
        <SectionHeading
          eyebrow="Harvest exchange"
          title="Available from local farms today"
          description="Reserve produce in bulk before it reaches peak freshness. One combined collection lowers costs for every vendor."
        />
        {error ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            {error}
          </p>
        ) : null}
        {isLoading ? (
          <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">
            Loading today&apos;s harvests...
          </p>
        ) : null}
        <div className="grid gap-6 md:grid-cols-3">
          {listings.map((listing) => {
            const available = listing.quantity - listing.reservedQuantity

            return (
              <Card className="overflow-hidden p-0" key={listing.id}>
                <img
                  alt={listing.crop}
                  className="h-40 w-full object-cover"
                  src={listingImage(listing)}
                />
                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="font-bold text-slate-900">{listing.crop}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {listing.farmerName} · {listing.location}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-extrabold text-emerald-800">
                        {formatCurrency(listing.price)}{" "}
                        <span className="text-xs font-normal text-slate-500">
                          per {listing.unit}
                        </span>
                      </p>
                      <p className="mt-1 text-xs font-medium text-emerald-700">
                        Harvested {listing.harvestDate}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500">
                      {available} available
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-xs text-slate-500">
                      <span>Bulk order progress</span>
                      <span>
                        {listing.reservedQuantity}/{listing.quantity}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-600"
                        style={{
                          width: `${(listing.reservedQuantity / listing.quantity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    disabled={available < 5}
                    fullWidth
                    onClick={() => void reserveBulkOrder(listing)}
                    variant="secondary"
                  >
                    {reservedListing === listing.id
                      ? "5 reserved for your group ✓"
                      : token
                        ? "Reserve 5 for bulk buy"
                        : "Sign in to reserve"}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
        {!isLoading && listings.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">
            No harvests are available right now. Please check back soon.
          </p>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card
          title="Smart collection route"
          subtitle="One consolidated route connects farms, township vendors, and community collection points."
        >
          <SupplyRouteMap stops={supplyStops} />
          <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-950">
            Today&apos;s combined route reduces 32 km of duplicate trips and
            serves {impact?.businessesSupplied ?? 0} local businesses.
          </div>
        </Card>
        <Card
          title="Farmer financial record"
          subtitle="A trusted record that helps growers demonstrate income for funding, grants, and insurance."
        >
          <div className="space-y-3">
            {[
              ["Verified sales", formatCurrency(impact?.verifiedSales ?? 0)],
              ["Harvests delivered", `${totalReserved} units`],
              ["On-time fulfilment", `${impact?.fulfilledOnTimePercent ?? 0}%`],
              ["Funding readiness", impact?.fundingReadiness ?? "Loading"],
            ].map(([label, value]) => (
              <div
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                key={label}
              >
                <span className="text-sm text-slate-600">{label}</span>
                <strong className="text-slate-900">{value}</strong>
              </div>
            ))}
          </div>
          <Button className="mt-5" fullWidth>
            Download farm income statement
          </Button>
        </Card>
      </section>

      {showTraceability ? (
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
            <div
              className="grid h-36 w-36 grid-cols-7 gap-1 rounded-xl bg-white p-3 shadow-sm"
              aria-label="Traceability QR code"
            >
              {Array.from({ length: 49 }, (_, index) => (
                <span
                  className={
                    index % 3 === 0 || index % 7 === 1
                      ? "bg-emerald-900"
                      : "bg-white"
                  }
                  key={index}
                />
              ))}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Farm-to-food traceability
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                Thabo&apos;s Green Farm · Spinach
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Harvested today in Mamelodi · Sold to Mama Thandi&apos;s Vetkoek
                · Consolidated collection route · QR label ready for customers.
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
