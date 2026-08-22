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

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button className="text-left" onClick={() => onNavigate(user?.userType === "vendor" ? "vendor-dashboard" : "home")} type="button">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">Reka Local</p>
          <h1 className="text-xl font-semibold text-emerald-900">Community commerce, reimagined</h1>
        </button>
        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${activePage === link.id ? "bg-emerald-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              key={link.id}
              onClick={() => onNavigate(link.id)}
              type="button"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user?.userType === "customer" ? <Button onClick={() => onNavigate("cart")} variant="ghost">Cart ({itemCount})</Button> : null}
          {isAuthenticated ? (
            <>
              <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 sm:block">{user?.name}</div>
              <Button onClick={logout} variant="ghost">Sign out</Button>
            </>
          ) : (
            <>
              <Button onClick={() => onNavigate("login")} variant="ghost">Log in</Button>
              <Button onClick={() => onNavigate("register")}>Get started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
