import { useState } from "react"

import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import Modal from "@/components/common/Modal"
import SectionHeading from "@/components/common/SectionHeading"
import ProductForm from "@/components/vendor/ProductForm"
import { productsByVendor } from "@/data/mockData"
import type { Product } from "@/types"
import { formatCurrency } from "@/utils/format"

export default function VendorProductsPage() {
  const [products, setProducts] = useState<Product[]>(productsByVendor["vendor-mama-thandi"])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [open, setOpen] = useState(false)

  const handleSubmit = async (payload: Partial<Product>) => {
    if (editingProduct) {
      setProducts((current) => current.map((product) => product.id === editingProduct.id ? { ...product, ...payload } as Product : product))
    } else {
      setProducts((current) => [
        {
          id: `product-${Date.now()}`,
          vendorId: "vendor-mama-thandi",
          vendorName: "Mama Thandi's Vetkoek",
          name: payload.name || "New product",
          description: payload.description,
          image: payload.image,
          price: payload.price || 0,
          stock: payload.stock || 0,
        },
        ...current,
      ])
    }

    setOpen(false)
    setEditingProduct(null)
  }

  const removeProduct = (productId: string) => {
    setProducts((current) => current.filter((product) => product.id !== productId))
  }

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Products" title="Manage inventory and pricing" description="Add new products, update availability, and highlight your best sellers." />
      <div className="flex justify-end">
        <Button onClick={() => { setEditingProduct(null); setOpen(true) }}>Add product</Button>
      </div>
      <div className="grid gap-4">
        {products.map((product) => (
          <Card action={<div className="flex gap-2"><Button onClick={() => { setEditingProduct(product); setOpen(true) }} variant="ghost">Edit</Button><Button onClick={() => removeProduct(product.id)} variant="danger">Delete</Button></div>} key={product.id} title={product.name} subtitle={product.description}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Price</p><p className="mt-2 text-sm font-semibold text-slate-900">{formatCurrency(product.price)}</p></div>
              <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Inventory</p><p className="mt-2 text-sm font-semibold text-slate-900">{product.stock ?? 0} units</p></div>
              <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Status</p><p className="mt-2 text-sm font-semibold text-slate-900">{(product.stock ?? 0) > 0 ? "In stock" : "Out of stock"}</p></div>
            </div>
          </Card>
        ))}
      </div>
      <Modal onClose={() => { setOpen(false); setEditingProduct(null) }} open={open} title={editingProduct ? "Edit product" : "Add product"}>
        <ProductForm initialValue={editingProduct} onCancel={() => { setOpen(false); setEditingProduct(null) }} onSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}
