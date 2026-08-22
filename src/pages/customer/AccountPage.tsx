import { useState } from "react"

import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { Input, Textarea } from "@/components/common/Input"
import SectionHeading from "@/components/common/SectionHeading"
import { useAuth } from "@/context/AuthContext"
import { vendorProfile } from "@/data/mockData"

export default function AccountPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    preferences: "Order updates via WhatsApp and email.",
  })

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Account" title="Manage your profile" description="Keep your details and saved addresses up to date for faster checkout." />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card title="Personal details" subtitle="Used during checkout and support conversations.">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Full name" onChange={(event) => setProfile((value) => ({ ...value, name: event.target.value }))} value={profile.name} />
            <Input label="Email" onChange={(event) => setProfile((value) => ({ ...value, email: event.target.value }))} value={profile.email} />
            <Input label="Phone" onChange={(event) => setProfile((value) => ({ ...value, phone: event.target.value }))} value={profile.phone} />
          </div>
          <div className="mt-4">
            <Textarea label="Preferences" onChange={(event) => setProfile((value) => ({ ...value, preferences: event.target.value }))} value={profile.preferences} />
          </div>
          <Button className="mt-4">Save profile</Button>
        </Card>
        <Card title="Saved addresses" subtitle="Switch between pickup spots and delivery destinations.">
          <div className="space-y-3">
            {vendorProfile.savedAddresses.map((address) => (
              <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600" key={address}>{address}</div>
            ))}
          </div>
          <Button className="mt-4" variant="ghost">Add address</Button>
        </Card>
      </div>
    </div>
  )
}
