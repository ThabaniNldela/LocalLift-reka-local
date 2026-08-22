import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import EmptyState from "@/components/common/EmptyState"
import { useCart } from "@/context/CartContext"
import { formatCurrency } from "@/utils/format"

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function CartDrawer({ onCheckout, onClose, open }: CartDrawerProps) {
  const { cartItems, itemCount, removeFromCart, subtotal, updateQuantity } = useCart()

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/50">
      <div className="h-full w-full max-w-md overflow-y-auto bg-slate-50 p-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Shopping cart</h2>
            <p className="text-sm text-slate-500">{itemCount} items ready for checkout.</p>
          </div>
          <Button onClick={onClose} variant="ghost">Close</Button>
        </div>
        {cartItems.length === 0 ? (
          <EmptyState title="Your cart is empty" description="Add products from a vendor to start building your order." />
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.productId} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.vendorName}</p>
                  </div>
                  <button className="text-sm text-rose-600" onClick={() => removeFromCart(item.productId)} type="button">Remove</button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-2">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} type="button">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} type="button">+</button>
                  </div>
                  <div className="text-right text-sm font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              </Card>
            ))}
            <Card>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <Button className="mt-4" fullWidth onClick={onCheckout}>Proceed to checkout</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
