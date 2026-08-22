import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { PropsWithChildren } from "react"

import type { CartItem, Product, VendorSummary } from "@/types"
import { storage } from "@/utils/storage"

type CartContextValue = {
  addToCart: (product: Product, vendor?: VendorSummary) => void
  cartItems: CartItem[]
  clearCart: () => void
  itemCount: number
  removeFromCart: (productId: string) => void
  subtotal: number
  updateQuantity: (productId: string, quantity: number) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const CART_STORAGE_KEY = "reka-local-cart"

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    setCartItems(storage.get<CartItem[]>(CART_STORAGE_KEY, []))
  }, [])

  useEffect(() => {
    storage.set(CART_STORAGE_KEY, cartItems)
  }, [cartItems])

  const value = useMemo<CartContextValue>(() => ({
    addToCart: (product, vendor) => {
      setCartItems((current) => {
        const existing = current.find((item) => item.productId === product.id)
        if (existing) {
          return current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        }

        return [
          ...current,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            vendorId: product.vendorId,
            vendorName: vendor?.businessName ?? product.vendorName ?? "Local vendor",
            image: product.image,
          },
        ]
      })
    },
    cartItems,
    clearCart: () => setCartItems([]),
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    removeFromCart: (productId) => setCartItems((current) => current.filter((item) => item.productId !== productId)),
    subtotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    updateQuantity: (productId, quantity) => setCartItems((current) => current.flatMap((item) => {
      if (item.productId !== productId) {
        return [item]
      }

      if (quantity <= 0) {
        return []
      }

      return [{ ...item, quantity }]
    })),
  }), [cartItems])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }

  return context
}
