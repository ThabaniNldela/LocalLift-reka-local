import Badge from "@/components/common/Badge"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import RatingStars from "@/components/common/RatingStars"
import type { VendorSummary } from "@/types"

// SA street food hero images – verified Unsplash free photos
const CATEGORY_IMAGES: Record<string, string> = {
  "Street food": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  "Produce":     "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",
  "Clothing":    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
  "Baked goods": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  "Beverages":   "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
}

// Per-vendor hero images for SA street food vendors
const VENDOR_HERO_IMAGES: Record<string, string> = {
  "vendor-mama-thandi":  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",  // fried dough
  "vendor-bra-zakes":    "https://images.unsplash.com/photo-1612392062631-94b4a7657f5a?auto=format&fit=crop&w=800&q=80",  // grilled sausage roll
  "vendor-durban-bunny": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",  // curry bread bowl
  "vendor-gatsby-cape":  "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=800&q=80",  // large sub sandwich
  "vendor-pap-shack":    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",  // grilled chicken
  "vendor-kota-king":    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",  // filled bread
  "vendor-nomsa-fresh":  "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",  // fresh fruit
  "vendor-sipho-style":  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",  // clothing
}

type VendorCardProps = {
  vendor: VendorSummary
  onOpen: (vendorId: string) => void
}

export default function VendorCard({ onOpen, vendor }: VendorCardProps) {
  const heroImage = VENDOR_HERO_IMAGES[vendor.id] ?? CATEGORY_IMAGES[vendor.category] ?? CATEGORY_IMAGES["Street food"]

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
