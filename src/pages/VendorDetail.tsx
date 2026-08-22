import React, { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/helpers'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface Product {
  id: string
  name: string
  price: number
  description?: string
  image?: string
  category?: string
}

interface Vendor {
  id: string
  businessName: string
  category: string
  location: string
  rating: number
  reviewCount: number
  description?: string
  hours?: string
  image?: string
}

export const VendorDetail: React.FC = () => {
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  const vendorId = window.location.pathname.split('/').pop() || ''

  useEffect(() => {
    const fetchVendorDetails = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/vendors/${vendorId}`)
        if (response.ok) {
          const data = await response.json()
          setVendor(data.vendor)
          setProducts(data.products || [])
        }
      } catch (err) {
        console.error('Failed to fetch vendor:', err)
      } finally {
        setLoading(false)
      }
    }

    if (vendorId) fetchVendorDetails()
  }, [vendorId])

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      vendorId,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    alert(`${product.name} added to cart!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading vendor details...</p>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Vendor not found</p>
          <Button onClick={() => (window.location.href = '/vendors')}>
            Back to Vendors
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vendor Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
            {vendor.image && (
              <img
                src={vendor.image}
                alt={vendor.businessName}
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{vendor.businessName}</h1>
              <p className="text-gray-600 mb-2">{vendor.category}</p>
              {vendor.location && (
                <p className="text-gray-600 mb-2 flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {vendor.location}
                </p>
              )}
              {vendor.hours && (
                <p className="text-gray-600 mb-3">Hours: {vendor.hours}</p>
              )}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={i < Math.floor(vendor.rating) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 20.16 24.02 12 18.35 3.84 24.02 6.23 16.01 0 10.35 8.91 10.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {vendor.rating.toFixed(1)} ({vendor.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
          {vendor.description && (
            <p className="text-gray-600 mt-4">{vendor.description}</p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Products</h2>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                {product.image && (
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                {product.category && (
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                )}
                {product.description && (
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-emerald-700">
                    {formatPrice(product.price)}
                  </span>
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VendorDetail
