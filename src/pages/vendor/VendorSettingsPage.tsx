import { useState } from "react"

import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { Input } from "@/components/common/Input"
import SectionHeading from "@/components/common/SectionHeading"
import { vendorProfile } from "@/data/mockData"

export default function VendorSettingsPage() {
  const [form, setForm] = useState(vendorProfile)

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Settings" title="Configure operations and notifications" description="Update account information, payout details, and notification channels." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Business details">
          <div className="grid gap-4">
            <Input label="Business name" onChange={(event) => setForm((value) => ({ ...value, businessName: event.target.value }))} value={form.businessName} />
            <Input label="Email" onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))} value={form.email} />
            <Input label="Phone" onChange={(event) => setForm((value) => ({ ...value, phone: event.target.value }))} value={form.phone} />
            <Input label="Hours" onChange={(event) => setForm((value) => ({ ...value, hours: event.target.value }))} value={form.hours} />
            <Button>Save changes</Button>
          </div>
        </Card>
        <Card title="Notifications & payments">
          <div className="grid gap-4">
            <Input label="Payment details" onChange={(event) => setForm((value) => ({ ...value, paymentDetails: event.target.value }))} value={form.paymentDetails} />
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
              Email notifications
              <input checked={form.notificationsEmail} onChange={(event) => setForm((value) => ({ ...value, notificationsEmail: event.target.checked }))} type="checkbox" />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
              SMS notifications
              <input checked={form.notificationsSms} onChange={(event) => setForm((value) => ({ ...value, notificationsSms: event.target.checked }))} type="checkbox" />
            </label>
            <Button variant="ghost">Update notification settings</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
