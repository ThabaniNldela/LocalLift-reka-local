import Card from "@/components/common/Card"
import RatingStars from "@/components/common/RatingStars"
import SectionHeading from "@/components/common/SectionHeading"
import ReviewList from "@/components/customer/ReviewList"
import { vendorDetailMap } from "@/data/mockData"

export default function VendorProfilePage() {
  const vendor = vendorDetailMap["vendor-mama-thandi"]

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Profile" title="Your public storefront" description="Manage the information customers see before they place an order." />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card title={vendor.businessName} subtitle={vendor.description}>
          <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Category</p><p className="mt-2">{vendor.category}</p></div>
            <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Location</p><p className="mt-2">{vendor.location}</p></div>
            <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Hours</p><p className="mt-2">{vendor.hours}</p></div>
            <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Rating</p><div className="mt-2"><RatingStars rating={vendor.rating} reviews={vendor.reviewCount} /></div></div>
          </div>
        </Card>
        <Card title="Marketplace reputation" subtitle="Recent customer feedback.">
          <ReviewList reviews={vendor.reviews} />
        </Card>
      </div>
    </div>
  )
}
