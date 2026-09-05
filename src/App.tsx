import { useMemo, useState } from "react"

import { ordersApi } from "@/api/client"
import Alert from "@/components/common/Alert"
import LoadingState from "@/components/common/LoadingState"
import CartDrawer from "@/components/customer/CartDrawer"
import AppShell from "@/components/layout/AppShell"
import { useApp } from "@/context/AppContext"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import { demoOrders } from "@/data/mockData"
import { useBackendHealth } from "@/hooks/useBackend"
import AccountPage from "@/pages/customer/AccountPage"
import CartPage from "@/pages/customer/CartPage"
import CheckoutPage from "@/pages/customer/CheckoutPage"
import DiscoverPage from "@/pages/customer/DiscoverPage"
import HomePage from "@/pages/customer/HomePage"
import LoginPage from "@/pages/customer/LoginPage"
import OrderConfirmationPage from "@/pages/customer/OrderConfirmationPage"
import OrderHistoryPage from "@/pages/customer/OrderHistoryPage"
import RegisterPage from "@/pages/customer/RegisterPage"
import VendorDetailsPage from "@/pages/customer/VendorDetailsPage"
import ImpactHubPage from "@/pages/shared/ImpactHubPage"
import NotFoundPage from "@/pages/shared/NotFoundPage"
import VendorAnalyticsPage from "@/pages/vendor/VendorAnalyticsPage"
import VendorDashboardPage from "@/pages/vendor/VendorDashboardPage"
import VendorOrdersPage from "@/pages/vendor/VendorOrdersPage"
import VendorProductsPage from "@/pages/vendor/VendorProductsPage"
import VendorProfilePage from "@/pages/vendor/VendorProfilePage"
import VendorSettingsPage from "@/pages/vendor/VendorSettingsPage"
import type { CheckoutPayload, Order } from "@/types"

export default function App() {
  const { navigate, route } = useApp()
  const { isAuthenticated, isLoading: authLoading, token, user } = useAuth()
  const { clearCart } = useCart()
  const health = useBackendHealth()
  const [orderHistory, setOrderHistory] = useState<Order[]>(demoOrders)
  const [latestOrder, setLatestOrder] = useState<Order | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const customerHome = useMemo(() => (user?.userType === "vendor" ? "vendor-dashboard" : "home"), [user?.userType])

  const guardedNavigate = (page: string, params?: Record<string, string>) => {
    if (!isAuthenticated && ["orders", "profile", "checkout", "vendor-dashboard", "vendor-products", "vendor-orders", "vendor-analytics", "vendor-profile", "vendor-settings"].includes(page)) {
      navigate("login")
      return
    }

    if (page === "cart-drawer") {
      setCartOpen(true)
      return
    }

    navigate(page, params)
  }

  const handleCheckout = async (payload: CheckoutPayload) => {
    setCheckoutError(null)
    try {
      const createdOrder = token ? await ordersApi.checkout(token, payload) : {
        id: `order-${Date.now()}`,
        customerId: payload.customerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "pending" as const,
        totalAmount: 0,
        paymentMethod: payload.paymentMethod,
        vendorId: "vendor-mama-thandi",
        vendorName: "Mama Thandi's Vetkoek",
        deliveryAddress: payload.deliveryAddress,
        notes: payload.notes,
        items: payload.items.map((item, index) => ({ id: `${index}`, orderId: "temp", price: 0, productId: item.productId, productName: "Selected product", quantity: item.quantity })),
      }
      setLatestOrder(createdOrder)
      setOrderHistory((current) => [createdOrder, ...current])
      clearCart()
      navigate("order-confirmation")
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Failed to place order")
    }
  }

  if (authLoading) {
    return <div className="mx-auto max-w-3xl px-4 py-10"><LoadingState label="Preparing Reka Local..." /></div>
  }

  const renderPage = () => {
    switch (route.page) {
      case "home":
        return <HomePage onBrowse={() => guardedNavigate("discover")} onOpenVendor={(vendorId) => guardedNavigate("vendor-details", { vendorId })} onVendorJoin={() => navigate("register", { userType: "vendor" })} />
      case "discover":
        return <DiscoverPage onOpenVendor={(vendorId) => guardedNavigate("vendor-details", { vendorId })} />
      case "impact":
        return <ImpactHubPage onBrowse={() => guardedNavigate("discover")} onVendorDashboard={() => guardedNavigate("vendor-dashboard")} />
      case "vendor-details":
        return <VendorDetailsPage onBack={() => guardedNavigate("discover")} vendorId={route.params?.vendorId || "vendor-mama-thandi"} />
      case "cart":
        return <CartPage onCheckout={() => guardedNavigate("checkout")} onContinueShopping={() => guardedNavigate("discover")} />
      case "checkout":
        return <div className="space-y-4">{checkoutError ? <Alert variant="error">{checkoutError}</Alert> : null}<CheckoutPage onSubmit={handleCheckout} /></div>
      case "order-confirmation":
        return latestOrder ? <OrderConfirmationPage onTrackOrder={() => guardedNavigate("orders")} order={latestOrder} /> : <NotFoundPage onReturnHome={() => guardedNavigate(customerHome)} />
      case "orders":
        return <OrderHistoryPage onOpenOrder={() => {}} orders={orderHistory} />
      case "profile":
        return <AccountPage />
      case "login":
        return <LoginPage onSuccess={() => guardedNavigate(customerHome)} />
      case "register":
        return <RegisterPage defaultUserType={(route.params?.userType as "customer" | "vendor") || "customer"} onSuccess={() => guardedNavigate(customerHome)} />
      case "vendor-dashboard":
        return <VendorDashboardPage />
      case "vendor-products":
        return <VendorProductsPage />
      case "vendor-orders":
        return <VendorOrdersPage />
      case "vendor-analytics":
        return <VendorAnalyticsPage />
      case "vendor-profile":
        return <VendorProfilePage />
      case "vendor-settings":
        return <VendorSettingsPage />
      default:
        return <NotFoundPage onReturnHome={() => guardedNavigate(customerHome)} />
    }
  }

  return (
    <>
      <AppShell activePage={route.page} onNavigate={guardedNavigate}>
        {!health.isConnected ? <div className="mb-6"><Alert variant="warning">Backend unavailable right now. Mock data is powering the experience while connectivity is restored.</Alert></div> : null}
        {renderPage()}
      </AppShell>
      {user?.userType !== "vendor" ? <CartDrawer onCheckout={() => { setCartOpen(false); guardedNavigate("checkout") }} onClose={() => setCartOpen(false)} open={cartOpen && route.page !== "cart"} /> : null}
    </>
  )
}
