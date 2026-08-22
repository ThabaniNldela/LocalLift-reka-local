import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/helpers'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Card from '@/components/Card'

export const Checkout: React.FC = () => {
  const { user } = useAuth()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [formData, setFormData] = useState({
    shippingAddress: user?.email || '',
    shippingCity: '',
    shippingZip: '',
    shippingCountry: '',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orderConfirmation, setOrderConfirmation] = useState<any>(null)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Button onClick={() => (window.location.href = '/vendors')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  const subtotal = total
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 5
  const grandTotal = subtotal + tax + shipping

  const validateShipping = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.shippingAddress) newErrors.shippingAddress = 'Address is required'
    if (!formData.shippingCity) newErrors.shippingCity = 'City is required'
    if (!formData.shippingZip) newErrors.shippingZip = 'ZIP code is required'
    if (!formData.shippingCountry) newErrors.shippingCountry = 'Country is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.cardName) newErrors.cardName = 'Name is required'
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
    if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required'
    if (!formData.cardCVC) newErrors.cardCVC = 'CVC is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleShippingNext = () => {
    if (validateShipping()) {
      setStep('payment')
    }
  }

  const handlePaymentNext = async () => {
    if (!validatePayment()) return

    setLoading(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAddress: formData.shippingAddress,
          shippingCity: formData.shippingCity,
          shippingZip: formData.shippingZip,
          shippingCountry: formData.shippingCountry,
          paymentMethod: formData.paymentMethod,
          totalAmount: grandTotal,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setOrderConfirmation(data.order)
        setStep('confirmation')
        clearCart()
      } else {
        setErrors({ submit: 'Failed to create order' })
      }
    } catch (err) {
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (step === 'confirmation' && orderConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Order #{orderConfirmation.id}
          </p>
          <div className="text-left mb-6">
            <p className="font-semibold mb-2">Order Details:</p>
            <p className="text-sm text-gray-600">
              Items: {items.length}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              Total: {formatPrice(grandTotal)}
            </p>
            <p className="text-sm text-gray-600">
              Status: {orderConfirmation.status}
            </p>
          </div>
          <div className="space-y-2">
            <Button onClick={() => (window.location.href = '/orders')} className="w-full">
              View Order
            </Button>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = '/vendors')}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Steps */}
            <div className="flex gap-4 mb-8">
              {(['shipping', 'payment', 'confirmation'] as const).map((s, idx) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      step === s
                        ? 'bg-emerald-700 text-white'
                        : ['shipping', 'payment'].includes(step) && ['shipping', 'payment'].indexOf(s) < ['shipping', 'payment'].indexOf(step)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {idx < 2 && <div className="w-8 h-1 bg-gray-200 mx-2" />}
                </div>
              ))}
            </div>

            {step === 'shipping' && (
              <Card>
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    value={formData.shippingAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, shippingAddress: e.target.value })
                    }
                    error={errors.shippingAddress}
                  />
                  <Input
                    label="City"
                    value={formData.shippingCity}
                    onChange={(e) =>
                      setFormData({ ...formData, shippingCity: e.target.value })
                    }
                    error={errors.shippingCity}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="ZIP Code"
                      value={formData.shippingZip}
                      onChange={(e) =>
                        setFormData({ ...formData, shippingZip: e.target.value })
                      }
                      error={errors.shippingZip}
                    />
                    <Input
                      label="Country"
                      value={formData.shippingCountry}
                      onChange={(e) =>
                        setFormData({ ...formData, shippingCountry: e.target.value })
                      }
                      error={errors.shippingCountry}
                    />
                  </div>
                  <div className="flex gap-4 pt-6">
                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = '/cart')}
                    >
                      Back to Cart
                    </Button>
                    <Button onClick={handleShippingNext} className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {step === 'payment' && (
              <Card>
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 mb-6">
                    {['card', 'wallet', 'bank'].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={(e) =>
                            setFormData({ ...formData, paymentMethod: e.target.value })
                          }
                          className="w-4 h-4"
                        />
                        <span className="capitalize">{method}</span>
                      </label>
                    ))}
                  </div>

                  <Input
                    label="Cardholder Name"
                    value={formData.cardName}
                    onChange={(e) =>
                      setFormData({ ...formData, cardName: e.target.value })
                    }
                    error={errors.cardName}
                  />
                  <Input
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      value={formData.cardExpiry}
                      onChange={(e) =>
                        setFormData({ ...formData, cardExpiry: e.target.value })
                      }
                      error={errors.cardExpiry}
                      placeholder="MM/YY"
                    />
                    <Input
                      label="CVC"
                      value={formData.cardCVC}
                      onChange={(e) =>
                        setFormData({ ...formData, cardCVC: e.target.value })
                      }
                      error={errors.cardCVC}
                      placeholder="123"
                    />
                  </div>

                  {errors.submit && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded">
                      <p className="text-red-700 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-6">
                    <Button variant="outline" onClick={() => setStep('shipping')}>
                      Back
                    </Button>
                    <Button
                      onClick={handlePaymentNext}
                      isLoading={loading}
                      className="flex-1"
                    >
                      Complete Order
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-6 pb-6 border-b">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

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

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
