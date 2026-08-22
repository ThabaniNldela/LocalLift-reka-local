import { useMemo, useState } from "react"

import Card from "@/components/common/Card"
import EmptyState from "@/components/common/EmptyState"
import Pagination from "@/components/common/Pagination"
import SectionHeading from "@/components/common/SectionHeading"
import VendorCard from "@/components/customer/VendorCard"
import { featuredVendors } from "@/data/mockData"
import type { VendorSummary } from "@/types"

const pageSize = 6
const categories = ["All", "Street food", "Produce", "Clothing"]

type DiscoverPageProps = {
  onOpenVendor: (vendorId: string) => void
}

export default function DiscoverPage({ onOpenVendor }: DiscoverPageProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => featuredVendors.filter((vendor: VendorSummary) => {
    const matchesCategory = category === "All" || vendor.category === category
    const search = query.trim().toLowerCase()
    const matchesSearch = search.length === 0 || [vendor.businessName, vendor.description, vendor.location, vendor.category].some((value) => value?.toLowerCase().includes(search))
    return matchesCategory && matchesSearch
  }), [category, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Discover" title="Find trusted vendors near you" description="Search by product type, neighbourhood, or business name to discover local favourites." />
      <Card>
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600" onChange={(event) => { setPage(1); setQuery(event.target.value) }} placeholder="Search vendors, products, or locations" value={query} />
          <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600" onChange={(event) => { setPage(1); setCategory(event.target.value) }} value={category}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </Card>
      {paginated.length === 0 ? (
        <EmptyState title="No vendors match your search" description="Try a different category or expand your search radius." />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginated.map((vendor) => <VendorCard key={vendor.id} onOpen={onOpenVendor} vendor={vendor} />)}
        </div>
      )}
      <Pagination onPageChange={setPage} page={page} totalPages={totalPages} />
    </div>
  )
}
