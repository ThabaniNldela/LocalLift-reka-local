import { useCallback, useEffect, useState } from "react"

import { checkHealth } from "@/api/client"

export function useBackendHealth() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkConnection = useCallback(async () => {
    setIsLoading(true)
    try {
      const healthy = await checkHealth()
      setIsConnected(healthy)
      setError(healthy ? null : "Backend health check failed")
    } catch (error) {
      setIsConnected(false)
      setError(error instanceof Error ? error.message : "Backend connection failed")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void checkConnection()
    const intervalId = window.setInterval(() => {
      void checkConnection()
    }, 30000)

    return () => window.clearInterval(intervalId)
  }, [checkConnection])

  return { isConnected, isLoading, error, retry: checkConnection }
}
