import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet"
import { useEffect } from "react"
import type { LatLngExpression } from "leaflet"

import type { Order } from "@/types"

type OrderTrackingMapProps = {
  order: Order
}

function RecenterMap({ position }: { position: LatLngExpression }) {
  const map = useMap()

  useEffect(() => {
    map.setView(position, 13)
  }, [map, position])

  return null
}

export default function OrderTrackingMap({ order }: OrderTrackingMapProps) {
  const tracking = order.tracking

  if (!tracking) {
    return (
      <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
        Tracking becomes available once the vendor confirms this order.
      </div>
    )
  }

  const center: LatLngExpression = [
    (tracking.vendor.latitude + tracking.customer.latitude) / 2,
    (tracking.vendor.longitude + tracking.customer.longitude) / 2,
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <MapContainer center={center} className="h-56 w-full" scrollWheelZoom>
        <RecenterMap position={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker center={[tracking.vendor.latitude, tracking.vendor.longitude]} color="#1e3a8a" fillColor="#2563eb" fillOpacity={0.95} radius={9}>
          <Popup><strong>{order.vendorName}</strong><br />Vendor location</Popup>
        </CircleMarker>
        <CircleMarker center={[tracking.customer.latitude, tracking.customer.longitude]} color="#047857" fillColor="#10b981" fillOpacity={0.85} radius={9}>
          <Popup><strong>{order.customerName || "Customer"}</strong><br />Delivery area</Popup>
        </CircleMarker>
        {tracking.driver ? (
          <CircleMarker center={[tracking.driver.latitude, tracking.driver.longitude]} color="#b45309" fillColor="#f59e0b" fillOpacity={0.95} radius={8}>
            <Popup><strong>Delivery in progress</strong><br />Updated {new Date(tracking.driver.updatedAt).toLocaleTimeString()}</Popup>
          </CircleMarker>
        ) : null}
      </MapContainer>
      <div className="flex flex-wrap gap-x-4 gap-y-2 bg-white px-4 py-3 text-xs text-slate-600">
        <span><span className="mr-1 text-base text-blue-600">●</span> Vendor</span>
        <span><span className="mr-1 text-base text-emerald-600">●</span> Customer delivery area</span>
        {tracking.driver ? <span><span className="mr-1 text-base text-amber-500">●</span> Live delivery position</span> : null}
      </div>
    </div>
  )
}
