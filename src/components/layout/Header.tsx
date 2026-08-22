import { useState } from "react"

import Button from "@/components/common/Button"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"

type HeaderProps = {
  activePage: string
  onNavigate: (page: string, params?: Record<string, string>) => void
}

const customerLinks = [
  { id: "home", label: "Home" },
  { id: "discover", label: "Discover" },
  { id: "orders", label: "Orders" },
  { id: "profile", label: "Account" },
]

const vendorLinks = [
  { id: "vendor-dashboard", label: "Dashboard" },
  { id: "vendor-products", label: "Products" },
  { id: "vendor-orders", label: "Orders" },
  { id: "vendor-analytics", label: "Analytics" },
  { id: "vendor-profile", label: "Profile" },
  { id: "vendor-settings", label: "Settings" },
]

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const { itemCount } = useCart()
  const { isAuthenticated, logout, user } = useAuth()
  const links = user?.userType === "vendor" ? vendorLinks : customerLinks
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Top announcement bar */}
      <div className="bg-emerald-800 px-4 py-1.5 text-center text-xs font-medium text-amber-200">
        🇿🇦 Supporting South African vendors from Pretoria to Cape Town &nbsp;·&nbsp; Free delivery on orders over R200
      </div>

      {/* Main nav */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => onNavigate(user?.userType === "vendor" ? "vendor-dashboard" : "home")}
            type="button"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-800 shadow-md">
              <span className="text-amber-300 font-black text-xl leading-none">R</span>
            </div>
            <div>
              <p className="text-lg font-extrabold text-emerald-900 leading-tight tracking-tight">Reka Local</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-500">Community Commerce</p>
            </div>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <button
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activePage === link.id
                    ? "bg-emerald-800 text-white shadow-md"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
                key={link.id}
                onClick={() => onNavigate(link.id)}
                type="button"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user?.userType === "customer" && (
              <button
                className="relative flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100 transition-colors"
                onClick={() => onNavigate("cart")}
                type="button"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                  <line strokeLinecap="round" strokeLinejoin="round" x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            )}

            {isAuthenticated ? (
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-sm font-bold text-white uppercase shadow">
                  {user?.name?.[0] ?? "U"}
                </div>
                <span className="hidden text-sm font-medium text-slate-700 xl:block">{user?.name}</span>
                <Button onClick={logout} variant="ghost">Sign out</Button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Button onClick={() => onNavigate("login")} variant="ghost">Log in</Button>
                <Button onClick={() => onNavigate("register")}>Get started</Button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {mobileOpen
                  ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-stone-100 bg-white px-4 pb-4 pt-2 lg:hidden">
            <div className="space-y-1">
              {links.map((link) => (
                <button
                  className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    activePage === link.id ? "bg-emerald-800 text-white" : "text-slate-700 hover:bg-slate-50"
                  }`}
                  key={link.id}
                  onClick={() => { onNavigate(link.id); setMobileOpen(false) }}
                  type="button"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2 border-t border-stone-100 pt-3">
              {isAuthenticated ? (
                <Button fullWidth onClick={logout} variant="ghost">Sign out</Button>
              ) : (
                <>
                  <Button fullWidth onClick={() => { onNavigate("login"); setMobileOpen(false) }} variant="ghost">Log in</Button>
                  <Button fullWidth onClick={() => { onNavigate("register"); setMobileOpen(false) }}>Get started</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
