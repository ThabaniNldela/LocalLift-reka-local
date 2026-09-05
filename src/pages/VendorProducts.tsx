import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { formatPrice } from '@/utils/helpers'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface Product {
  id: string
  name: string
  price: number
  description?: string
  category?: string
  image?: string
  inStock?: boolean
}

export const VendorProducts: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'vendor') {
      window.location.href = '/login'
      return
    }

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/vendor/products')
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
        }
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [isAuthenticated, user])

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/vendor/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId))
      }
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <Button onClick={() => (window.location.href = '/vendor/products/new')}>
            Add New Product
          </Button>
        </div>

        {products.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products yet</p>
              <Button onClick={() => (window.location.href = '/vendor/products/new')}>
                Create Your First Product
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="flex gap-6">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg bg-gray-200"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                        {product.category && (
                          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        )}
                        {product.description && (
                          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-700">
                          {formatPrice(product.price)}
                        </p>
                        <span
                          className={`inline-block text-xs px-3 py-1 rounded-full font-medium mt-2 ${
                            product.inStock
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => (window.location.href = `/vendor/products/${product.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VendorProducts
