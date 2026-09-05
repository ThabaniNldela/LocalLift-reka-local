import React, { useState, useEffect, useCallback } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'

interface Vendor {
  id: string
  businessName: string
  category: string
  location: string
  rating: number
  reviewCount: number
  image?: string
  description?: string
}

export const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (selectedCategory) params.append('category', selectedCategory)

        const response = await fetch(`/api/vendors?${params}`)
        if (response.ok) {
          const data = await response.json()
          setVendors(data.vendors || [])
          if (data.categories) setCategories(data.categories)
        }
      } catch (err) {
        console.error('Failed to fetch vendors:', err)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchVendors, 300)
    return () => clearTimeout(timer)
  }, [search, selectedCategory])

  const handleVendorClick = (vendorId: string) => {
    window.location.href = `/vendor/${vendorId}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Vendors</h1>

          {/* Search and Filter */}
          <div className="space-y-4 mb-8">
            <Input
              placeholder="Search vendors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === ''
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vendors Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading vendors...</p>
          </div>
        ) : vendors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Card
                key={vendor.id}
                hover
                onClick={() => handleVendorClick(vendor.id)}
                className="cursor-pointer"
              >
                {vendor.image && (
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={vendor.image}
                      alt={vendor.businessName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-1">{vendor.businessName}</h3>
                <p className="text-sm text-gray-500 mb-2">{vendor.category}</p>
                {vendor.location && (
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {vendor.location}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={i < Math.floor(vendor.rating) ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 20.16 24.02 12 18.35 3.84 24.02 6.23 16.01 0 10.35 8.91 10.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {vendor.rating.toFixed(1)} ({vendor.reviewCount})
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {search || selectedCategory ? 'No vendors found matching your search' : 'No vendors available yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Vendors
