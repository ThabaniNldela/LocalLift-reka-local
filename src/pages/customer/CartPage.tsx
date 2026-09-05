import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import EmptyState from "@/components/common/EmptyState"
import SectionHeading from "@/components/common/SectionHeading"
import { useCart } from "@/context/CartContext"
import { formatCurrency } from "@/utils/format"

type CartPageProps = {
  onCheckout: () => void
  onContinueShopping: () => void
}

export default function CartPage({ onCheckout, onContinueShopping }: CartPageProps) {
  const { cartItems, removeFromCart, subtotal, updateQuantity } = useCart()

  if (cartItems.length === 0) {
    return <EmptyState actionLabel="Browse vendors" description="Add delicious food, fresh produce, or fashion finds to your cart." onAction={onContinueShopping} title="Your cart is empty" />
  }

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Cart" title="Review your basket" description="Adjust quantities, confirm pricing, and proceed when ready." />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <Card key={item.productId}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500">{item.vendorName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-2 text-sm">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} type="button">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} type="button">+</button>
                  </div>
                  <span className="w-24 text-right font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                  <button className="text-sm text-rose-600" onClick={() => removeFromCart(item.productId)} type="button">Remove</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card title="Order summary" subtitle="Estimated totals based on your current basket.">
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex items-center justify-between"><span>Delivery fee</span><span>{formatCurrency(25)}</span></div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-950"><span>Total</span><span>{formatCurrency(subtotal + 25)}</span></div>
          </div>
          <Button className="mt-6" fullWidth onClick={onCheckout}>Continue to checkout</Button>
        </Card>
      </div>
    </div>
  )
}
