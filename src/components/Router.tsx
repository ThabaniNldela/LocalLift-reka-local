import React, { useEffect, useState } from 'react'
import * as Pages from '@/pages'

type PageName = 
  | 'home' 
  | 'login' 
  | 'register' 
  | 'vendors' 
  | 'vendor-detail' 
  | 'cart' 
  | 'checkout' 
  | 'orders' 
  | 'vendor-dashboard' 
  | 'vendor-products' 
  | 'vendor-orders' 
  | 'not-found'

export const Router: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('home')

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname
      
      let page: PageName = 'home'

      if (path === '/') page = 'home'
      else if (path === '/login') page = 'login'
      else if (path === '/register') page = 'register'
      else if (path === '/vendors') page = 'vendors'
      else if (path.startsWith('/vendor/') && path.includes('/detail')) page = 'vendor-detail'
      else if (path.startsWith('/vendor/') && path.includes('/products')) {
        if (path.includes('/orders')) page = 'vendor-orders'
        else page = 'vendor-products'
      }
      else if (path.startsWith('/vendor/')) page = 'vendor-detail'
      else if (path.startsWith('/vendors/')) page = 'vendor-detail'
      else if (path === '/cart') page = 'cart'
      else if (path === '/checkout') page = 'checkout'
      else if (path === '/orders') page = 'orders'
      else if (path === '/vendor/dashboard') page = 'vendor-dashboard'
      else if (path === '/vendor/products') page = 'vendor-products'
      else if (path === '/vendor/orders') page = 'vendor-orders'
      else page = 'not-found'

      setCurrentPage(page)
    }

    // Set initial page
    handleRouteChange()

    // Listen for navigation
    window.addEventListener('popstate', handleRouteChange)
    
    // Intercept link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (target) {
        const href = target.getAttribute('href')
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault()
          window.history.pushState(null, '', href)
          handleRouteChange()
        }
      }
    }

    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  const pageComponents: Record<PageName, React.ComponentType> = {
    home: Pages.Home,
    login: Pages.Login,
    register: Pages.Register,
    vendors: Pages.Vendors,
    'vendor-detail': Pages.VendorDetail,
    cart: Pages.Cart,
    checkout: Pages.Checkout,
    orders: Pages.Orders,
    'vendor-dashboard': Pages.VendorDashboard,
    'vendor-products': Pages.VendorProducts,
    'vendor-orders': Pages.VendorOrders,
    'not-found': () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 mb-6">Page not found</p>
          <a href="/" className="text-emerald-700 hover:text-emerald-800 font-semibold">
            Go back home
          </a>
        </div>
      </div>
    ),
  }

  const PageComponent = pageComponents[currentPage]

  return <PageComponent />
}

export default Router
