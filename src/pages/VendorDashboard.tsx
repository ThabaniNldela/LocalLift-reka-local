import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { formatPrice } from '@/utils/helpers'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  averageRating: number
  productCount: number
  recentOrders: any[]
  topProducts: any[]
}

export const VendorDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'vendor') {
      window.location.href = '/login'
      return
    }

    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/vendor/dashboard')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (err) {
        console.error('Failed to fetch dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [isAuthenticated, user])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Orders',
              value: stats?.totalOrders || 0,
              icon: '📦',
            },
            {
              label: 'Total Revenue',
              value: formatPrice(stats?.totalRevenue || 0),
              icon: '💰',
            },
            {
              label: 'Average Rating',
              value: `${(stats?.averageRating || 0).toFixed(1)} ★`,
              icon: '⭐',
            },
            {
              label: 'Products',
              value: stats?.productCount || 0,
              icon: '📊',
            },
          ].map((stat, idx) => (
            <Card key={idx}>
              <div className="text-center">
                <span className="text-4xl mb-2 block">{stat.icon}</span>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Orders</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => (window.location.href = '/vendor/orders')}
                >
                  View All
                </Button>
              </div>

              {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.itemCount} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-700">
                          {formatPrice(order.totalAmount)}
                        </p>
                        <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent orders</p>
              )}
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  className="w-full justify-center"
                  size="sm"
                  onClick={() => (window.location.href = '/vendor/products/new')}
                >
                  Add Product
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  size="sm"
                  onClick={() => (window.location.href = '/vendor/products')}
                >
                  Manage Products
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  size="sm"
                  onClick={() => (window.location.href = '/vendor/orders')}
                >
                  View Orders
                </Button>
              </div>
            </Card>

            {/* Top Products */}
            <Card>
              <h3 className="font-bold text-lg mb-4">Top Products</h3>
              {stats?.topProducts && stats.topProducts.length > 0 ? (
                <div className="space-y-3">
                  {stats.topProducts.slice(0, 3).map((product, idx) => (
                    <div key={idx} className="flex justify-between items-start text-sm">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-gray-500">{product.sold} sold</p>
                      </div>
                      <p className="font-bold text-emerald-700">
                        {formatPrice(product.revenue)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  No sales yet
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard
