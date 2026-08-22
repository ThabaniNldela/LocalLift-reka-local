/**
 * Environment configuration for API communication
 */

const API_URL = import.meta.env.VITE_API_URL ||
                (typeof window !== "undefined" && window.location.hostname === "localhost"
                  ? "http://localhost:5000/api"
                  : "/api")

export const API_CONFIG = {
  baseURL: API_URL,
  endpoints: {
    auth: "/auth",
    dashboard: "/dashboard",
    orders: "/orders",
    products: "/products",
    reviews: "/reviews",
    vendors: "/vendors",
  },
  retry: {
    attempts: 3,
    delay: 1000,
  },
  timeout: 10000,
}

export const config = {
  api: {
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
  },
  
  frontend: {
    port: import.meta.env.VITE_PORT || 8443,
  },
  
  // Feature flags
  features: {
    vendorListingEnabled: true,
    authenticationEnabled: true,
    paymentProcessingEnabled: false,
    reviewSystemEnabled: true,
  },
}

// Log config in development
if (import.meta.env.DEV) {
  console.log("🔧 App Config:", config)
}

export default config
