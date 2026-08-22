import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { formatPrice, formatDateTime } from '@/utils/helpers'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface VendorOrder {
  id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  totalAmount: number
  createdAt: string
  itemCount: number
  customerName: string
  items?: any[]
}

export const VendorOrders: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const [orders, setOrders] = useState<VendorOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered'>('all')
  const [selectedOrder, setSelectedOrder] = useState<VendorOrder | null>(null)

  useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'vendor') {
      window.location.href = '/login'
      return
    }

    const fetchOrders = async () => {
      setLoading(true)
      try {
        const params = filter !== 'all' ? `?status=${filter}` : ''
        const response = await fetch(`/api/vendor/orders${params}`)
        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders || [])
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, user, filter])

  const updateOrderStatus = async (orderId: string, newStatus: VendorOrder['status']) => {
    try {
      const response = await fetch(`/api/vendor/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        )
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus })
        }
      }
    } catch (err) {
      console.error('Failed to update order:', err)
    }
  }

  const getStatusColor = (status: VendorOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'pending', 'processing', 'shipped', 'delivered'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {orders.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          Customer: {order.customerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDateTime(order.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="font-bold text-lg text-emerald-700">
                      {formatPrice(order.totalAmount)}
                    </p>
                    <p className="text-sm text-gray-600">{order.itemCount} items</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </Button>
                  {order.status !== 'delivered' && (
                    <>
                      {order.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(order.id, 'processing')
                          }
                        >
                          Mark Processing
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(order.id, 'shipped')
                          }
                        >
                          Mark Shipped
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(order.id, 'delivered')
                          }
                        >
                          Mark Delivered
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order #{selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <p className="text-lg font-bold text-emerald-700">
                  {formatPrice(selectedOrder.totalAmount)}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Customer</p>
              <p className="font-semibold">{selectedOrder.customerName}</p>
            </div>

            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Items</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm border-b pb-2">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <Button
                className="w-full"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default VendorOrders
