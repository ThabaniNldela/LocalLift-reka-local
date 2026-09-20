import { useEffect, useState } from "react"

import { ApiError, basicPhoneApi } from "@/api/client"
import Alert from "@/components/common/Alert"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import LoadingState from "@/components/common/LoadingState"
import SectionHeading from "@/components/common/SectionHeading"
import { useAuth } from "@/context/AuthContext"
import type { BasicPhoneState } from "@/types"

const exampleCommands = ["1", "2", "OUT 1", "IN 1 20", "PRICE 1 40"]

export default function VendorBasicPhonePage() {
  const { token } = useAuth()
  const [state, setState] = useState<BasicPhoneState | null>(null)
  const [command, setCommand] = useState("1")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!token) return

    basicPhoneApi
      .state(token)
      .then(setState)
      .catch((requestError) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Could not load your basic-phone workspace.",
        )
      })
      .finally(() => setLoading(false))
  }, [token])

  const submitCommand = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!token || !command.trim()) return

    setSending(true)
    setError(null)
    setMessage(null)
    try {
      const response = await basicPhoneApi.command(token, command)
      setState(response.state)
      setMessage(response.message)
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "The command could not be processed.",
      )
    } finally {
      setSending(false)
    }
  }

  if (loading) return <LoadingState label="Connecting your basic-phone tools..." />

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Inclusive vendor access"
        title="Run your business from any phone"
        description="This working demo mirrors the SMS and USSD controls available to vendors without mobile data. Changes update the live catalogue and order status."
      />

      {error ? <Alert variant="error">{error}</Alert> : null}
      {message ? <Alert variant="success">{message}</Alert> : null}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card title="SMS order inbox" subtitle="New orders are formatted for a basic phone.">
          <div className="space-y-3">
            {state?.notifications.length ? (
              state.notifications.map((notification) => (
                <pre className="whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 font-sans text-sm leading-6 text-emerald-100" key={notification.id}>
                  {notification.message}
                  {"\n\n"}
                  <span className="text-amber-300">Status: {notification.status}</span>
                </pre>
              ))
            ) : (
              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No SMS notifications yet. New customer orders will appear here.</p>
            )}
          </div>
        </Card>

        <Card title="USSD control simulator" subtitle="Enter the same short commands a vendor would use on a feature phone.">
          <div className="rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-emerald-100">
            <p className="text-amber-300">*120*REKA#</p>
            <p className="mt-3 whitespace-pre-wrap">{state?.ussdMenu}</p>
          </div>
          <form className="mt-5 space-y-3" onSubmit={submitCommand}>
            <label className="block text-sm font-semibold text-slate-900" htmlFor="basic-phone-command">SMS or USSD command</label>
            <input
              className="w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-emerald-600 focus:outline-none"
              id="basic-phone-command"
              onChange={(event) => setCommand(event.target.value)}
              value={command}
            />
            <div className="flex flex-wrap gap-2">
              {exampleCommands.map((example) => (
                <button className="rounded-full bg-emerald-50 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-800 hover:bg-emerald-100" key={example} onClick={() => setCommand(example)} type="button">
                  {example}
                </button>
              ))}
            </div>
            <Button disabled={sending} type="submit">{sending ? "Sending..." : "Send command"}</Button>
          </form>
        </Card>
      </div>

      <Card title="Current catalogue" subtitle="Availability and prices update immediately after a valid basic-phone command.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {state?.products.map((product) => (
            <div className="rounded-2xl border border-slate-200 p-4" key={product.id}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Product #{product.number}</p>
              <p className="mt-1 font-semibold text-slate-900">{product.name}</p>
              <p className="mt-2 text-sm text-slate-600">R{product.price.toFixed(2)} · {product.stock} units</p>
              <p className={`mt-2 text-sm font-semibold ${product.available ? "text-emerald-700" : "text-rose-700"}`}>{product.available ? "Available" : "Unavailable"}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
