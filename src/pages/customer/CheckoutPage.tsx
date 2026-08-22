import { useState } from "react"

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

export default function CheckoutPage({ onSubmit }: CheckoutPageProps) {
  const { cartItems, subtotal } = useCart()
  const { user } = useAuth()
  const [form, setForm] = useState({
    deliveryAddress: user?.phone ? "12 Park Street, Hatfield, Pretoria" : "",
    notes: "",
    paymentMethod: "Card",
    phone: user?.phone ?? "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit({
        customerId: user?.id ?? "guest",
        deliveryAddress: form.deliveryAddress,
        items: cartItems.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        notes: form.notes,
        paymentMethod: form.paymentMethod,
        phone: form.phone,
      })
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
              <Input label="Payment method" onChange={(event) => setForm((value) => ({ ...value, paymentMethod: event.target.value }))} value={form.paymentMethod} />
            </div>
            <div className="mt-4">
              <Textarea label="Delivery address" onChange={(event) => setForm((value) => ({ ...value, deliveryAddress: event.target.value }))} value={form.deliveryAddress} />
            </div>
            <div className="mt-4">
              <Textarea label="Order notes" onChange={(event) => setForm((value) => ({ ...value, notes: event.target.value }))} value={form.notes} />
            </div>
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
