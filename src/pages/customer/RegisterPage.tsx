import { useState } from "react"

import Alert from "@/components/common/Alert"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { Input } from "@/components/common/Input"
import SectionHeading from "@/components/common/SectionHeading"
import { useAuth } from "@/context/AuthContext"
import type { UserType } from "@/types"

type RegisterPageProps = {
  defaultUserType?: UserType
  onSuccess: () => void
}

export default function RegisterPage({ defaultUserType = "customer", onSuccess }: RegisterPageProps) {
  const { error, register } = useAuth()
  const [form, setForm] = useState({
    businessName: "",
    category: "Street food",
    email: "",
    name: "",
    password: "",
    phone: "",
    userType: defaultUserType,
  })
  const [localError, setLocalError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLocalError(null)

    if (!form.name || !form.email || !form.password) {
      setLocalError("Please complete all required fields.")
      return
    }

    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters.")
      return
    }

    if (form.userType === "vendor" && (!form.businessName || !form.category)) {
      setLocalError("Vendor accounts require a business name and category.")
      return
    }

    setSubmitting(true)
    try {
      await register(form)
      onSuccess()
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : "Unable to register.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SectionHeading align="center" eyebrow="Create account" title="Join Reka Local" description="Register as a customer or vendor and start trading with your community." />
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {localError || error ? <Alert variant="error">{localError || error}</Alert> : null}
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Full name" onChange={(event) => setForm((value) => ({ ...value, name: event.target.value }))} value={form.name} />
            <Input label="Email address" onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))} type="email" value={form.email} />
            <Input label="Phone number" onChange={(event) => setForm((value) => ({ ...value, phone: event.target.value }))} value={form.phone} />
            <Input label="Password" onChange={(event) => setForm((value) => ({ ...value, password: event.target.value }))} type="password" value={form.password} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Account type</span>
              <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600" onChange={(event) => setForm((value) => ({ ...value, userType: event.target.value as UserType }))} value={form.userType}>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
            </label>
            {form.userType === "vendor" ? <Input label="Business name" onChange={(event) => setForm((value) => ({ ...value, businessName: event.target.value }))} value={form.businessName} /> : null}
          </div>
          {form.userType === "vendor" ? (
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Vendor category</span>
              <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600" onChange={(event) => setForm((value) => ({ ...value, category: event.target.value }))} value={form.category}>
                <option>Street food</option>
                <option>Produce</option>
                <option>Clothing</option>
                <option>Crafts</option>
              </select>
            </label>
          ) : null}
          <Button disabled={submitting} fullWidth type="submit">{submitting ? "Creating account..." : "Create account"}</Button>
        </form>
      </Card>
    </div>
  )
}
