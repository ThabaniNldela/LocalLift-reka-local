import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

interface NavLink {
  label: string
  href: string
  icon?: React.ReactNode
}

export const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const { itemCount } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const customerLinks: NavLink[] = [
    { label: 'Browse Vendors', href: '/vendors' },
    { label: 'How It Works', href: '/how-it-works' },
  ]

  const vendorLinks: NavLink[] = [
    { label: 'Dashboard', href: '/vendor/dashboard' },
    { label: 'Products', href: '/vendor/products' },
    { label: 'Orders', href: '/vendor/orders' },
  ]

  const links = user?.userType === 'vendor' ? vendorLinks : customerLinks

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-emerald-700 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="#fbbf24"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-emerald-700">
              Reka <span className="text-amber-600">Local</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user?.userType === 'customer' && (
              <a
                href="/cart"
                className="relative text-gray-600 hover:text-emerald-700 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </a>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user?.name}</span>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a href="/login" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                  Log In
                </a>
                <a
                  href="/register"
                  className="text-sm font-medium px-3 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition-colors"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
