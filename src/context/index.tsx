import type { PropsWithChildren } from "react"

import { AppProvider } from "@/context/AppContext"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"

export default function RootProviders({ children }: PropsWithChildren) {
  return (
    <AppProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </AppProvider>
  )
}
