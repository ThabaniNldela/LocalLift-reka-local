import type { ReactNode } from "react"

import Header from "@/components/layout/Header"

type AppShellProps = {
  activePage: string
  children: ReactNode
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export default function AppShell({ activePage, children, onNavigate }: AppShellProps) {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Header activePage={activePage} onNavigate={onNavigate} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      {/* Footer */}
      <footer className="mt-20 border-t border-stone-200 bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center">
                  <span className="text-emerald-950 font-black text-lg">R</span>
                </div>
                <div>
                  <p className="font-bold text-xl text-white">Reka Local</p>
                  <p className="text-xs text-amber-300 tracking-widest uppercase">Community Commerce</p>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                Empowering South African street vendors and local entrepreneurs by connecting them with customers across communities.
              </p>
              <div className="mt-6 flex gap-3">
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs text-stone-300">🇿🇦 Made in South Africa</div>
                <div className="rounded-full bg-amber-400/20 px-4 py-2 text-xs text-amber-300">Support Local 🌱</div>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-4 text-white">For Customers</p>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>Browse Vendors</li>
                <li>Track Orders</li>
                <li>Leave Reviews</li>
                <li>My Account</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4 text-white">For Vendors</p>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>Start Selling</li>
                <li>Dashboard</li>
                <li>Manage Orders</li>
                <li>Analytics</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs text-stone-500">
            <p>© 2026 Reka Local. All rights reserved.</p>
            <p>Building the informal economy, one order at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
