import Badge from "@/components/common/Badge"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import RatingStars from "@/components/common/RatingStars"
import type { VendorSummary } from "@/types"

// Per-vendor hero images using local photos
const VENDOR_HERO_IMAGES: Record<string, string> = {
  "vendor-mama-thandi":  "/images/vendors-smiling-women.jpg",
  "vendor-bra-zakes":    "/images/vendor-cucumbers-apron.jpg",
  "vendor-durban-bunny": "/images/market-tomatoes-stall.jpg",
  "vendor-gatsby-cape":  "/images/colorful-fruit-stall.jpg",
  "vendor-pap-shack":    "/images/farmer-vegetable-crate.jpg",
  "vendor-kota-king":    "/images/colorful-peppers-market.jpg",
  "vendor-nomsa-fresh":  "/images/fresh-produce-shelves.jpg",
  "vendor-sipho-style":  "/images/diverse-market-team.jpg",
}

const FALLBACK_IMAGE = "/images/customer-shopping-market.jpg"

type VendorCardProps = {
  vendor: VendorSummary
  onOpen: (vendorId: string) => void
}

export default function VendorCard({ onOpen, vendor }: VendorCardProps) {
  const heroImage = VENDOR_HERO_IMAGES[vendor.id] ?? FALLBACK_IMAGE

  return (
    <Card className="overflow-hidden p-0">
      {/* Hero image */}
      <div className="relative h-48 overflow-hidden">
        <img
          alt={`${vendor.businessName} – ${vendor.category}`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-lg font-semibold leading-tight">{vendor.businessName}</h3>
          <div className="mt-1 flex items-center gap-2">
            <Badge label={vendor.category} />
            {vendor.isVerified ? <Badge label="Verified ✓" tone="success" /> : null}
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <p className="line-clamp-2 text-sm text-slate-600">{vendor.description || "Trusted street vendor serving the community with quality products."}</p>
        <div className="flex items-center justify-between gap-4">
          <RatingStars rating={vendor.rating} reviews={vendor.reviewCount} />
          <span className="text-sm text-slate-400">{vendor.location || "Nearby"}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">🕐 {vendor.deliveryTime || "20-35 min"}</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">💰 {vendor.priceRange || "Affordable"}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">📍 {vendor.distance || "Nearby"}</span>
        </div>
        <Button fullWidth onClick={() => onOpen(vendor.id)}>View vendor</Button>
      </div>
    </Card>
  )
}
