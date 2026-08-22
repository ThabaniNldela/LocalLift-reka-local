import { useEffect, useState } from "react"

import Button from "@/components/common/Button"
import { Input, Textarea } from "@/components/common/Input"
import type { Product } from "@/types"

type ProductFormProps = {
  initialValue?: Product | null
  onCancel: () => void
  onSubmit: (payload: Partial<Product>) => Promise<void>
}

export default function ProductForm({ initialValue, onCancel, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialValue) {
      setForm({
        name: initialValue.name,
        description: initialValue.description || "",
        price: String(initialValue.price),
        image: initialValue.image || "",
        stock: String(initialValue.stock ?? 0),
      })
    }
  }, [initialValue])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit({
        name: form.name,
        description: form.description,
        image: form.image,
        price: Number(form.price),
        stock: Number(form.stock),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input label="Product name" onChange={(event) => setForm((value) => ({ ...value, name: event.target.value }))} required value={form.name} />
      <Textarea label="Description" onChange={(event) => setForm((value) => ({ ...value, description: event.target.value }))} value={form.description} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Price" min="0" onChange={(event) => setForm((value) => ({ ...value, price: event.target.value }))} required step="0.01" type="number" value={form.price} />
        <Input label="Inventory" min="0" onChange={(event) => setForm((value) => ({ ...value, stock: event.target.value }))} required type="number" value={form.stock} />
      </div>
      <Input label="Image URL" onChange={(event) => setForm((value) => ({ ...value, image: event.target.value }))} value={form.image} />
      <div className="flex justify-end gap-3">
        <Button onClick={onCancel} type="button" variant="ghost">Cancel</Button>
        <Button disabled={submitting} type="submit">{submitting ? "Saving..." : "Save product"}</Button>
      </div>
    </form>
  )
}
