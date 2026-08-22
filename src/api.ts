export const API_CONFIG = {
  // Backend API base URL
  baseURL: process.env.REACT_APP_API_URL || import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  
  // Endpoints
  endpoints: {
    vendors: "/vendors",
    auth: "/auth",
    orders: "/orders",
    products: "/products",
    reviews: "/reviews",
    locations: "/locations",
  },
  
  // Request timeout (ms)
  timeout: 10000,
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000,
  },
}

/**
 * Fetch wrapper with error handling and retry logic
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_CONFIG.baseURL}${endpoint}`
  const { 
    retry = API_CONFIG.retry.attempts, 
    ...fetchOptions 
  } = options
  
  let lastError
  
  for (let attempt = 0; attempt < retry; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      })
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      lastError = error
      
      // Don't retry on authentication errors
      if (error.message?.includes("401")) {
        throw error
      }
      
      // Wait before retrying
      if (attempt < retry - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.retry.delay * (attempt + 1))
        )
      }
    }
  }
  
  throw lastError
}

/**
 * Get vendors
 */
export async function getVendors(options = {}) {
  return apiFetch(API_CONFIG.endpoints.vendors, options)
}

/**
 * Get vendor by ID
 */
export async function getVendor(id) {
  return apiFetch(`${API_CONFIG.endpoints.vendors}/${id}`)
}

/**
 * Login
 */
export async function login(email, password) {
  return apiFetch(API_CONFIG.endpoints.auth + "/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

/**
 * Register
 */
export async function register(userData) {
  return apiFetch(API_CONFIG.endpoints.auth + "/register", {
    method: "POST",
    body: JSON.stringify(userData),
  })
}

/**
 * Check API health
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_CONFIG.baseURL.replace('/api', '')}/health`, {
      method: "GET",
    })
    return response.ok
  } catch {
    return false
  }
}
