import { useState, useEffect, useCallback } from 'react'
import { checkHealth } from '@/api'

export function useBackendHealth() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkConnection = useCallback(async () => {
    setIsLoading(true)
    try {
      const isHealthy = await checkHealth()
      setIsConnected(isHealthy)
      if (isHealthy) {
        setError(null)
      } else {
        setError('Backend health check failed')
      }
    } catch (err) {
      setIsConnected(false)
      setError(err instanceof Error ? err.message : 'Backend connection failed')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [checkConnection])

  return { isConnected, isLoading, error, retry: checkConnection }
}

export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
          ...options,
        })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url, options])

  return { data, isLoading, error }
}
