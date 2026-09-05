import { useState } from "react"

import Alert from "@/components/common/Alert"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { Input } from "@/components/common/Input"
import SectionHeading from "@/components/common/SectionHeading"
import { useAuth } from "@/context/AuthContext"

type LoginPageProps = {
  onSuccess: () => void
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const { error, login } = useAuth()
  const [form, setForm] = useState({ email: "", password: "" })
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLocalError(null)

    if (!form.email || !form.password) {
      setLocalError("Please enter both email and password.")
      return
    }

    setSubmitting(true)
    try {
      await login(form.email, form.password)
      onSuccess()
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : "Unable to log in.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <SectionHeading align="center" eyebrow="Welcome back" title="Log in to Reka Local" description="Access your orders, saved details, and vendor operations securely." />
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {localError || error ? <Alert variant="error">{localError || error}</Alert> : null}
          <Input label="Email address" onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))} type="email" value={form.email} />
          <Input label="Password" onChange={(event) => setForm((value) => ({ ...value, password: event.target.value }))} type="password" value={form.password} />
          <Button disabled={submitting} fullWidth type="submit">{submitting ? "Logging in..." : "Log in"}</Button>
        </form>
      </Card>
    </div>
  )
}
