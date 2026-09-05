import { createContext, useContext, useMemo, useState } from "react"
import type { PropsWithChildren } from "react"

type AppRoute = {
  page: string
  params?: Record<string, string>
}

type AppContextValue = {
  route: AppRoute
  navigate: (page: string, params?: Record<string, string>) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: PropsWithChildren) {
  const [route, setRoute] = useState<AppRoute>({ page: "home" })

  const value = useMemo(() => ({
    route,
    navigate: (page: string, params?: Record<string, string>) => setRoute({ page, params }),
  }), [route])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }

  return context
}
