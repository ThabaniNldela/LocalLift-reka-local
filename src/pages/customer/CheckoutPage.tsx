import { useMemo, useState } from "react"
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { paymentsApi } from "@/api/client"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { Input, Textarea } from "@/components/common/Input"
import SectionHeading from "@/components/common/SectionHeading"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import type { CheckoutPayload } from "@/types"
import { formatCurrency } from "@/utils/format"

type CheckoutPageProps = {
  onSubmit: (payload: CheckoutPayload) => Promise<void>
}

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

type CheckoutFormProps = CheckoutPageProps

function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const { cartItems, subtotal } = useCart()
  const { token, user } = useAuth()
  const stripe = useStripe()
  const elements = useElements()
  const [form, setForm] = useState({
    deliveryAddress: user?.phone ? "12 Park Street, Hatfield, Pretoria" : "",
    notes: "",
    paymentMethod: stripePromise ? "Stripe" : "Cash on delivery",
    phone: user?.phone ?? "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      const payload: CheckoutPayload = {
        customerId: user?.id ?? "guest",
        deliveryAddress: form.deliveryAddress,
        items: cartItems.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        notes: form.notes,
        paymentMethod: form.paymentMethod,
        phone: form.phone,
      }

      if (form.paymentMethod === "Stripe") {
        if (!stripePromise || !token) {
          throw new Error("Sign in and configure Stripe before paying by card.")
        }
        const payment = await paymentsApi.createIntent(token, payload.items)
        const card = elements?.getElement(CardElement)
        if (!stripe || !card) {
          throw new Error("The secure card form is not ready. Please try again.")
        }
        const result = await stripe.confirmCardPayment(payment.clientSecret, { payment_method: { card } })
        if (result.error || !result.paymentIntent || result.paymentIntent.status !== "succeeded") {
          throw new Error(result.error?.message || "Your payment could not be completed.")
        }
        payload.paymentIntentId = payment.paymentIntentId
      }

      await onSubmit(payload)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <SectionHeading eyebrow="Checkout" title="Confirm delivery and payment" description="Everything you need to place your order in one secure flow." />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card title="Delivery information">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Contact phone" onChange={(event) => setForm((value) => ({ ...value, phone: event.target.value }))} value={form.phone} />
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="payment-method">Payment method</label>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                  id="payment-method"
                  onChange={(event) => setForm((value) => ({ ...value, paymentMethod: event.target.value }))}
                  value={form.paymentMethod}
                >
                  {stripePromise ? <option value="Stripe">Card via Stripe</option> : null}
                  <option value="Cash on delivery">Cash on delivery</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <Textarea label="Delivery address" onChange={(event) => setForm((value) => ({ ...value, deliveryAddress: event.target.value }))} value={form.deliveryAddress} />
            </div>
            <div className="mt-4">
              <Textarea label="Order notes" onChange={(event) => setForm((value) => ({ ...value, notes: event.target.value }))} value={form.notes} />
            </div>
            {form.paymentMethod === "Stripe" ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-semibold text-slate-900">Card details</p>
                <CardElement options={{ style: { base: { color: "#0f172a", fontFamily: "Inter, sans-serif", fontSize: "16px" } } }} />
                <p className="mt-3 text-xs text-slate-500">Your card details are securely processed by Stripe and are never stored by Reka Local.</p>
              </div>
            ) : null}
          </Card>
        </div>
        <Card title="Payment summary" subtitle="Review charges before placing your order.">
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between"><span>Items</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex items-center justify-between"><span>Delivery</span><span>{formatCurrency(25)}</span></div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900"><span>Total</span><span>{formatCurrency(subtotal + 25)}</span></div>
          </div>
          <Button className="mt-6" disabled={submitting || cartItems.length === 0} fullWidth type="submit">{submitting ? "Placing order..." : "Place order"}</Button>
        </Card>
      </div>
    </form>
  )
}

export default function CheckoutPage(props: CheckoutPageProps) {
  const options = useMemo(() => ({ appearance: { theme: "stripe" as const } }), [])

  return <Elements options={options} stripe={stripePromise}><CheckoutForm {...props} /></Elements>
}
