import React from "react"

import { useCart } from "@/context/CartContext"

import { formatPrice } from "@/utils/helpers"

import Button from "@/components/Button"

import Card from "@/components/Card"

export const Cart: React.FC = () => {
  const { cartItems, subtotal, removeFromCart, updateQuantity, clearCart } =
    useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-400 mx-auto mb-4"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some items from your favorite vendors
          </p>
          <Button onClick={() => (window.location.href = "/vendors")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  const vendors = Array.from(new Set(cartItems.map((item) => item.vendorId)))

  const tax = subtotal * 0.08

  const shipping = subtotal > 50 ? 0 : 5

  const grandTotal = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {vendors.map((vendorId) => {
              const vendorItems = cartItems.filter(
                (item) => item.vendorId === vendorId,
              )

              const vendorName = vendorItems[0]?.vendorName

              return (
                <Card key={vendorId}>
                  <h3 className="font-semibold text-lg mb-4">
                    Order from Vendor {vendorName}
                  </h3>
                  <div className="space-y-4">
                    {vendorItems.map((item) => (
                      <div
                        key={item.productId}
                        className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg bg-gray-200"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {formatPrice(item.price)} each
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              −
                            </button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                )
                              }
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              +
                            </button>
                            <span className="text-sm text-gray-600 ml-4">
                              Subtotal:{" "}
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <Button
                className="w-full mb-3"
                onClick={() => (window.location.href = "/checkout")}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                className="w-full mb-3"
                onClick={() => (window.location.href = "/vendors")}
              >
                Continue Shopping
              </Button>

              <button
                onClick={() => clearCart()}
                className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2"
              >
                Clear Cart
              </button>

              {shipping === 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-700">
                    ✓ Free shipping! You qualified for free shipping.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
