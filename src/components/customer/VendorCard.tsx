import Badge from "@/components/common/Badge"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import RatingStars from "@/components/common/RatingStars"
import type { VendorSummary } from "@/types"

type VendorCardProps = {
  vendor: VendorSummary
  onOpen: (vendorId: string) => void
}

export default function VendorCard({ onOpen, vendor }: VendorCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="h-48 bg-gradient-to-br from-emerald-800 via-emerald-700 to-amber-400 p-5 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge label={vendor.category} />
            <h3 className="mt-4 text-2xl font-semibold">{vendor.businessName}</h3>
            <p className="mt-2 max-w-xs text-sm text-white/80">{vendor.description || "Trusted street vendor serving the community with quality products."}</p>
          </div>
          {vendor.isVerified ? <Badge label="Verified" tone="success" /> : null}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <RatingStars rating={vendor.rating} reviews={vendor.reviewCount} />
          <span className="text-sm text-slate-400">{vendor.location || "Nearby"}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">{vendor.deliveryTime || "20-35 min"}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{vendor.priceRange || "Affordable"}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{vendor.distance || "0.8 km away"}</span>
        </div>
        <Button fullWidth onClick={() => onOpen(vendor.id)}>View vendor</Button>
      </div>
    </Card>
  )
}
