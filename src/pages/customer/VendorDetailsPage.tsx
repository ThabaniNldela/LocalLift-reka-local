import { useEffect, useMemo, useState } from "react"

import { vendorsApi } from "@/api/client"
import Alert from "@/components/common/Alert"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import LoadingState from "@/components/common/LoadingState"
import Pagination from "@/components/common/Pagination"
import RatingStars from "@/components/common/RatingStars"
import SectionHeading from "@/components/common/SectionHeading"
import ProductCard from "@/components/customer/ProductCard"
import ReviewList from "@/components/customer/ReviewList"
import { vendorDetailMap } from "@/data/mockData"
import type { Product } from "@/types"

const pageSize = 4

type VendorDetailsPageProps = {
  onBack: () => void
  vendorId: string
}

export default function VendorDetailsPage({ onBack, vendorId }: VendorDetailsPageProps) {
  const vendor = vendorDetailMap[vendorId]
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<Product[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    setProducts(null)
    setLoadError(null)
    setPage(1)

    vendorsApi.products(vendorId)
      .then((response) => setProducts(response.products))
      .catch(() => {
        setLoadError("Live availability could not be loaded. Showing the last known menu.")
        setProducts(vendor.products)
      })
  }, [vendor.products, vendorId])

  const menuProducts = products ?? vendor.products
  const paginatedProducts = useMemo(() => menuProducts.slice((page - 1) * pageSize, page * pageSize), [menuProducts, page])
  const totalPages = Math.max(1, Math.ceil(menuProducts.length / pageSize))

  return (
    <div className="space-y-8">
      <Button onClick={onBack} variant="ghost">← Back to discover</Button>
      <section className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-sm lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <SectionHeading eyebrow={vendor.category} title={vendor.businessName} description={vendor.description} />
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <RatingStars rating={vendor.rating} reviews={vendor.reviewCount} />
            <span>{vendor.location}</span>
            <span>{vendor.hours}</span>
          </div>
        </div>
        <Card title="Vendor snapshot">
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Status</span><span>{vendor.isActive ? "Open now" : "Closed"}</span></div>
            <div className="flex justify-between"><span>Owner</span><span>{vendor.ownerName}</span></div>
            <div className="flex justify-between"><span>Products</span><span>{vendor.products.length}</span></div>
            <div className="flex justify-between"><span>Reviews</span><span>{vendor.reviews.length}</span></div>
          </div>
        </Card>
      </section>
      <section className="space-y-6">
        <SectionHeading eyebrow="Products" title="Browse the menu" description="Add items to your basket and complete checkout without leaving the page." />
        {loadError ? <Alert variant="warning">{loadError}</Alert> : null}
        {products === null ? <LoadingState label="Loading today's live availability..." /> : null}
        {products !== null ? <div className="grid gap-6 md:grid-cols-2">
          {paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div> : null}
        {products !== null ? <Pagination onPageChange={setPage} page={page} totalPages={totalPages} /> : null}
      </section>
      <section className="space-y-6">
        <SectionHeading eyebrow="Customer reviews" title="What people are saying" description="Reviews help build trust and keep the marketplace transparent." />
        <ReviewList reviews={vendor.reviews} />
      </section>
    </div>
  )
}
