import type { ReactNode } from "react"

import Header from "@/components/layout/Header"

type AppShellProps = {
  activePage: string
  children: ReactNode
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export default function AppShell({ activePage, children, onNavigate }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header activePage={activePage} onNavigate={onNavigate} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
