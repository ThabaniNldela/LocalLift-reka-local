import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface FeaturedVendor {
  id: string
  businessName: string
  category: string
  rating: number
  reviewCount: number
  image?: string
}

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth()
  const [vendors, setVendors] = useState<FeaturedVendor[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/vendors?limit=6')
        if (response.ok) {
          const data = await response.json()
          setVendors(data.vendors || [])
        }
      } catch (err) {
        console.error('Failed to fetch vendors:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6">
          Support Local, Grow Together
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Connect with local vendors and discover authentic products from your community
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {!isAuthenticated ? (
            <>
              <Button size="lg" onClick={() => (window.location.href = '/register?type=customer')}>
                Browse as Customer
              </Button>
              <Button variant="secondary" size="lg" onClick={() => (window.location.href = '/register?type=vendor')}>
                Become a Vendor
              </Button>
            </>
          ) : user?.userType === 'customer' ? (
            <Button size="lg" onClick={() => (window.location.href = '/vendors')}>
              Browse Vendors
            </Button>
          ) : (
            <Button size="lg" onClick={() => (window.location.href = '/vendor/dashboard')}>
              Go to Dashboard
            </Button>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Discover',
                desc: 'Browse local vendors and their products in your area',
              },
              {
                step: '2',
                title: 'Order',
                desc: 'Add items to cart and place your order securely',
              },
              {
                step: '3',
                title: 'Receive',
                desc: 'Get your items delivered or pick up from the vendor',
              },
            ].map((item) => (
              <Card key={item.step}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      {isAuthenticated && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Vendors</h2>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading vendors...</p>
              </div>
            ) : vendors.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendors.map((vendor) => (
                  <Card key={vendor.id} hover onClick={() => (window.location.href = `/vendor/${vendor.id}`)}>
                    <h3 className="text-xl font-semibold mb-2">{vendor.businessName}</h3>
                    <p className="text-sm text-gray-500 mb-3">{vendor.category}</p>
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
                <p className="text-gray-500">No vendors available yet</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg mb-8">
            {isAuthenticated
              ? "Start exploring local vendors and supporting your community today!"
              : "Join Reka Local and connect with your local community"}
          </p>
          {!isAuthenticated && (
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-emerald-700 hover:bg-gray-100"
              onClick={() => (window.location.href = '/register')}
            >
              Get Started Free
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
