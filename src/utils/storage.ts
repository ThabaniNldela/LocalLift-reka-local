type StorageValue = string | number | boolean | object | null

function isStorageAvailable() {
  try {
    return typeof window !== "undefined" && "localStorage" in window
  } catch {
    return false
  }
}

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (!isStorageAvailable()) {
      return fallback
    }

    const value = window.localStorage.getItem(key)
    if (!value) {
      return fallback
    }

    try {
      return JSON.parse(value) as T
    } catch {
      return fallback
    }
  },
  remove(key: string) {
    if (isStorageAvailable()) {
      window.localStorage.removeItem(key)
    }
  },
  set(key: string, value: StorageValue) {
    if (isStorageAvailable()) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  },
}
