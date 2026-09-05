import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { useCart } from "@/context/CartContext"
import type { Product, VendorSummary } from "@/types"
import { formatCurrency } from "@/utils/format"

type ProductCardProps = {
  product: Product
  vendor?: VendorSummary
}

export default function ProductCard({ product, vendor }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <Card className="overflow-hidden p-0">
      <div className="h-40 bg-slate-100">
        {product.image ? <img alt={product.name} className="h-full w-full object-cover" src={product.image} /> : <div className="flex h-full items-center justify-center text-sm text-slate-400">No image</div>}
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{product.description || "Freshly prepared by a trusted local vendor."}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-950">{formatCurrency(product.price)}</p>
            {vendor ? <p className="text-xs text-slate-400">Sold by {vendor.businessName}</p> : null}
          </div>
          <Button onClick={() => addToCart(product, vendor)} variant="secondary">Add to cart</Button>
        </div>
      </div>
    </Card>
  )
}
