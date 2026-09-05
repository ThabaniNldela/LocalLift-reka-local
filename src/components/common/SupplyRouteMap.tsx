import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet"

import type { LatLngExpression } from "leaflet"

type SupplyRouteMapProps = {
  stops: Array<{
    label: string
    latitude: number
    longitude: number
    type: "farm" | "vendor" | "customer"
  }>
}

const markerStyle = {
  farm: { color: "#15803d", fillColor: "#22c55e" },

  vendor: { color: "#1d4ed8", fillColor: "#3b82f6" },

  customer: { color: "#b45309", fillColor: "#f59e0b" },
}

export default function SupplyRouteMap({ stops }: SupplyRouteMapProps) {
  const center: LatLngExpression = [
    stops.reduce((total, stop) => total + stop.latitude, 0) / stops.length,

    stops.reduce((total, stop) => total + stop.longitude, 0) / stops.length,
  ]

  const route: LatLngExpression[] = stops.map((stop) => [
    stop.latitude,
    stop.longitude,
  ])

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <MapContainer
        center={center}
        className="h-64 w-full"
        zoom={11}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline color="#047857" positions={route} weight={4} />
        {stops.map((stop) => (
          <CircleMarker
            center={[stop.latitude, stop.longitude]}
            fillOpacity={1}
            key={stop.label}
            radius={9}
            {...markerStyle[stop.type]}
          >
            <Popup>
              <strong>{stop.label}</strong>
              <br />
              {stop.type}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="flex flex-wrap gap-4 bg-white px-4 py-3 text-xs text-slate-600">
        <span>
          <span className="mr-1 text-emerald-600">●</span> Farm
        </span>
        <span>
          <span className="mr-1 text-blue-600">●</span> Vendor collection
        </span>
        <span>
          <span className="mr-1 text-amber-500">●</span> Customer delivery
        </span>
      </div>
    </div>
  )
}
