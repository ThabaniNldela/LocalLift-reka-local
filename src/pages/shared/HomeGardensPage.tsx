import { useEffect, useMemo, useState } from "react"

import { farmersApi } from "@/api/client"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import LoadingState from "@/components/common/LoadingState"
import SectionHeading from "@/components/common/SectionHeading"
import SupplyRouteMap from "@/components/common/SupplyRouteMap"
import { useApp } from "@/context/AppContext"
import { useAuth } from "@/context/AuthContext"
import type { HarvestListing } from "@/types"
import { formatCurrency } from "@/utils/format"

type LocationStatus = "idle" | "loading" | "ready" | "unavailable"

type CommunityGrower = {
  description: string
  distance?: number
  grower: string
  latitude: number
  longitude: number
  neighbourhood: string
  produce: string[]
}

const communityGrowers: CommunityGrower[] = [
  {
    grower: "Lerato's Balcony Garden",
    neighbourhood: "Hatfield, Pretoria",
    latitude: -25.7475,
    longitude: 28.236,
    produce: ["Spinach", "Herbs", "Spring onions"],
    description: "A small-space garden turning sun, compost, and care into fresh bundles for neighbours.",
  },
  {
    grower: "Mpho's Backyard Harvest",
    neighbourhood: "Mamelodi, Pretoria",
    latitude: -25.708,
    longitude: 28.369,
    produce: ["Tomatoes", "Chillies", "Kale"],
    description: "Seasonal vegetables grown at home and picked on collection day.",
  },
  {
    grower: "Ubuntu Community Patch",
    neighbourhood: "Soshanguve, Pretoria",
    latitude: -25.523,
    longitude: 28.103,
    produce: ["Cabbage", "Beetroot", "Carrots"],
    description: "A shared community garden creating affordable fresh food and local income.",
  },
]

const earthRadiusKm = 6371

const distanceBetween = (
  start: Pick<CommunityGrower, "latitude" | "longitude">,
  end: Pick<CommunityGrower, "latitude" | "longitude">,
) => {
  const toRadians = (value: number) => (value * Math.PI) / 180
  const latitudeDelta = toRadians(end.latitude - start.latitude)
  const longitudeDelta = toRadians(end.longitude - start.longitude)
  const latitudeStart = toRadians(start.latitude)
  const latitudeEnd = toRadians(end.latitude)
  const segment =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(latitudeStart) * Math.cos(latitudeEnd) * Math.sin(longitudeDelta / 2) ** 2

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(segment), Math.sqrt(1 - segment))
}

export default function HomeGardensPage() {
  const { navigate } = useApp()
  const { user } = useAuth()
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle")
  const [locationError, setLocationError] = useState<string | null>(null)
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null)
  const [listings, setListings] = useState<HarvestListing[]>([])
  const [loadingListings, setLoadingListings] = useState(true)

  useEffect(() => {
    farmersApi
      .listHarvests()
      .then((response) => setListings(response.data))
      .finally(() => setLoadingListings(false))
  }, [])

  const gardeners = useMemo(
    () =>
      communityGrowers
        .map((grower) => ({
          ...grower,
          distance: position ? distanceBetween(position, grower) : undefined,
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)),
    [position],
  )

  const findNearbyGardens = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable")
      setLocationError("Your browser does not support location. Browse the community gardens below instead.")
      return
    }

    setLocationStatus("loading")
    setLocationError(null)
    navigator.geolocation.getCurrentPosition(
      (currentPosition) => {
        setPosition({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        })
        setLocationStatus("ready")
      },
      () => {
        setLocationStatus("unavailable")
        setLocationError("Location was not shared. You can still explore featured community gardens.")
      },
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 },
    )
  }

  const mapStops = [
    ...gardeners.map((grower) => ({
      label: grower.grower,
      latitude: grower.latitude,
      longitude: grower.longitude,
      type: "farm" as const,
    })),
    ...(position
      ? [{ label: "Your approximate area", ...position, type: "customer" as const }]
      : []),
  ]

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-emerald-950 px-6 py-12 text-white md:px-10 md:py-16">
        <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" src="/images/home-garden-training.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-900/30" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Home Gardens</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">A garden near you can feed a community everywhere.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">Discover fresh fruit and vegetables grown by home gardeners, buy directly from your neighbourhood, and help every backyard become a local business.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button disabled={locationStatus === "loading"} onClick={findNearbyGardens} variant="secondary">
              {locationStatus === "loading" ? "Finding nearby gardens..." : "Use my location"}
            </Button>
            <Button onClick={() => navigate("register", { userType: "farmer" })} variant="ghost">Start selling your harvest</Button>
          </div>
          <p className="mt-4 text-xs text-white/60">Your location is used only in this browser to sort nearby gardens. We never publish your precise address.</p>
        </div>
      </section>

      {locationError ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{locationError}</div> : null}
      {locationStatus === "ready" ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-900">Showing community growers nearest to your approximate location.</div> : null}

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card title="Gardens near you" subtitle={position ? "Sorted by approximate distance from your shared location." : "Share your location to see distance from your community."}>
          <div className="space-y-3">
            {gardeners.map((grower) => (
              <div className="rounded-2xl border border-emerald-100 bg-white p-4" key={grower.grower}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">{grower.grower}</p>
                    <p className="mt-1 text-sm text-slate-500">{grower.neighbourhood}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{grower.distance === undefined ? "Nearby garden" : `${grower.distance.toFixed(1)} km away`}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{grower.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">{grower.produce.map((crop) => <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800" key={crop}>{crop}</span>)}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Neighbourhood garden map" subtitle="Grower locations are intentionally approximate for household privacy.">
          <SupplyRouteMap stops={mapStops} />
        </Card>
      </section>

      <section className="space-y-5">
        <SectionHeading eyebrow="Fresh from the garden" title="Seasonal produce, ready for your community" description="Home gardeners and small growers can list their harvests through the Farmer Hub; buyers reserve fresh produce before it is picked." />
        {loadingListings ? <LoadingState label="Loading garden harvests..." /> : (
          <div className="grid gap-5 md:grid-cols-3">
            {listings.slice(0, 3).map((listing, index) => (
              <Card className="overflow-hidden p-0" key={listing.id}>
                <img alt={listing.crop} className="h-40 w-full object-cover" src={index % 2 === 0 ? "/images/home-garden-grower.jpg" : "/images/home-garden-irrigation.jpg"} />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Picked locally</p>
                  <h3 className="mt-2 font-bold text-slate-900">{listing.crop}</h3>
                  <p className="mt-1 text-sm text-slate-500">{listing.farmerName} · {listing.location}</p>
                  <div className="mt-4 flex items-center justify-between"><strong className="text-emerald-800">{formatCurrency(listing.price)} <span className="text-xs font-normal text-slate-500">per {listing.unit}</span></strong><span className="text-xs text-slate-500">{listing.quantity - listing.reservedQuantity} left</span></div>
                </div>
              </Card>
            ))}
          </div>
        )}
        <div className="flex justify-center"><Button onClick={() => navigate("farmers")} variant="secondary">Browse all harvests</Button></div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["Grow anywhere", "Balcony, backyard, rooftop, or community plot—every grower has a place in the market.", "/images/home-garden-grower.jpg"],
          ["Keep it local", "Your fresh produce reaches neighbours quickly, cutting food miles and building community resilience.", "/images/home-garden-irrigation.jpg"],
          ["Scale with confidence", "Use the Farmer Hub for harvest listings, group reservations, traceability, and income visibility.", "/images/home-garden-training.jpg"],
        ].map(([title, description, image]) => (
          <Card className="overflow-hidden p-0" key={title}>
            <img alt="" className="h-36 w-full object-cover" src={image} />
            <div className="p-5"><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>
          </Card>
        ))}
      </section>

      <section className="rounded-[2rem] bg-amber-100 p-7 text-center md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">From your home to the world</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold text-emerald-950">Turn today&apos;s surplus into tomorrow&apos;s local food system.</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-emerald-900/75">Register as a grower, list your fresh harvest, and connect with the community around you—wherever you live.</p>
        <Button className="mt-6" onClick={() => navigate(user ? "farmers" : "register", user ? undefined : { userType: "farmer" })}>Join as a home gardener</Button>
      </section>
    </div>
  )
}
