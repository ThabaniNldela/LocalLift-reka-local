import { API_CONFIG } from "@/config"
import type {
  ApiListResponse,
  AuthResponse,
  CheckoutPayload,
  DashboardStats,
  Order,
  OrderStatus,
  PaginatedParams,
  Product,
  Review,
  SessionUser,
  UserProfile,
  Vendor,
  VendorFilters,
  VendorSummary,
} from "@/types"

export class ApiError extends Error {
  status: number
  details: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.details = details
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type ApiRequestOptions = Omit<RequestInit, "body" | "method"> & {
  method?: HttpMethod
  body?: unknown
  retry?: number
  token?: string | null
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const buildUrl = (endpoint: string, params?: Record<string, string | number | boolean | undefined>) => {
  const url = new URL(`${API_CONFIG.baseURL}${endpoint}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? ""
  const isJson = contentType.includes("application/json")
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = typeof payload === "object" && payload && "message" in payload
      ? String((payload as { message?: string }).message)
      : `Request failed with status ${response.status}`

    throw new ApiError(message, response.status, payload)
  }

  return payload as T
}

export async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
  const { body, headers, method = "GET", retry = API_CONFIG.retry.attempts, token, ...rest } = options
  let lastError: unknown

  for (let attempt = 0; attempt < retry; attempt += 1) {
    try {
      const response = await fetch(buildUrl(endpoint, params), {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        ...rest,
      })

      return await parseResponse<T>(response)
    } catch (error) {
      lastError = error
      const isApiError = error instanceof ApiError
      const isAuthError = isApiError && (error.status === 401 || error.status === 403)

      if (isAuthError || attempt === retry - 1) {
        throw error
      }

      await delay(API_CONFIG.retry.delay * (attempt + 1))
    }
  }

  throw lastError
}

export const authApi = {
  getProfile: (token: string) => apiRequest<SessionUser>(`${API_CONFIG.endpoints.auth}/me`, { token }),
  login: (email: string, password: string) =>
    apiRequest<AuthResponse>(`${API_CONFIG.endpoints.auth}/login`, {
      method: "POST",
      body: { email, password },
    }),
  register: (payload: Record<string, unknown>) =>
    apiRequest<AuthResponse>(`${API_CONFIG.endpoints.auth}/register`, {
      method: "POST",
      body: payload,
    }),
}

export const vendorsApi = {
  createReview: (vendorId: string, payload: Partial<Review>, token: string) =>
    apiRequest<Review>(`${API_CONFIG.endpoints.vendors}/${vendorId}/reviews`, {
      method: "POST",
      body: payload,
      token,
    }),
  detail: (vendorId: string) => apiRequest<Vendor>(`${API_CONFIG.endpoints.vendors}/${vendorId}`),
  list: (filters: VendorFilters & PaginatedParams = {}) =>
    apiRequest<ApiListResponse<VendorSummary>>(API_CONFIG.endpoints.vendors, {}, filters),
  reviews: (vendorId: string, page = 1) =>
    apiRequest<ApiListResponse<Review>>(`${API_CONFIG.endpoints.vendors}/${vendorId}/reviews`, {}, { page }),
}

export const productsApi = {
  create: (token: string, payload: Partial<Product>) =>
    apiRequest<Product>(API_CONFIG.endpoints.products, { method: "POST", body: payload, token }),
  listByVendor: (vendorId: string, params: PaginatedParams = {}) =>
    apiRequest<ApiListResponse<Product>>(`${API_CONFIG.endpoints.vendors}/${vendorId}/products`, {}, params),
  listMine: (token: string, params: PaginatedParams = {}) =>
    apiRequest<ApiListResponse<Product>>(`${API_CONFIG.endpoints.products}/mine`, { token }, params),
  remove: (token: string, productId: string) =>
    apiRequest<{ success: boolean }>(`${API_CONFIG.endpoints.products}/${productId}`, { method: "DELETE", token }),
  update: (token: string, productId: string, payload: Partial<Product>) =>
    apiRequest<Product>(`${API_CONFIG.endpoints.products}/${productId}`, { method: "PUT", body: payload, token }),
}

export const ordersApi = {
  checkout: (token: string, payload: CheckoutPayload) =>
    apiRequest<Order>(`${API_CONFIG.endpoints.orders}/checkout`, { method: "POST", body: payload, token }),
  detail: (token: string, orderId: string) =>
    apiRequest<Order>(`${API_CONFIG.endpoints.orders}/${orderId}`, { token }),
  listMine: (token: string, params: PaginatedParams = {}) =>
    apiRequest<ApiListResponse<Order>>(`${API_CONFIG.endpoints.orders}/mine`, { token }, params),
  listVendor: (token: string, params: PaginatedParams = {}) =>
    apiRequest<ApiListResponse<Order>>(`${API_CONFIG.endpoints.orders}/vendor`, { token }, params),
  updateStatus: (token: string, orderId: string, status: OrderStatus) =>
    apiRequest<Order>(`${API_CONFIG.endpoints.orders}/${orderId}/status`, {
      method: "PATCH",
      body: { status },
      token,
    }),
  tracking: (token: string, orderId: string) =>
    apiRequest<{ orderId: string; status: OrderStatus; tracking: NonNullable<Order["tracking"]>; updatedAt: string }>(
      `${API_CONFIG.endpoints.orders}/${orderId}/tracking`,
      { token },
    ),
  updateTracking: (token: string, orderId: string, latitude: number, longitude: number) =>
    apiRequest<{ orderId: string; tracking: NonNullable<Order["tracking"]>; updatedAt: string }>(
      `${API_CONFIG.endpoints.orders}/${orderId}/tracking`,
      { method: "PATCH", body: { latitude, longitude }, token },
    ),
  resendReceipt: (token: string, orderId: string) =>
    apiRequest<{ receipt: NonNullable<Order["receipt"]> }>(
      `${API_CONFIG.endpoints.orders}/${orderId}/resend-receipt`,
      { method: "POST", token },
    ),
}

export type PaymentIntentResponse = {
  clientSecret: string
  paymentIntentId: string
  totalAmount: number
}

export const paymentsApi = {
  createIntent: (token: string, items: CheckoutPayload["items"]) =>
    apiRequest<PaymentIntentResponse>(`${API_CONFIG.endpoints.payments}/create-intent`, {
      method: "POST",
      body: { items },
      token,
    }),
}

export const dashboardApi = {
  analytics: (token: string) => apiRequest<DashboardStats>(`${API_CONFIG.endpoints.dashboard}/analytics`, { token }),
  profile: (token: string) => apiRequest<UserProfile>(`${API_CONFIG.endpoints.dashboard}/profile`, { token }),
  stats: (token: string) => apiRequest<DashboardStats>(`${API_CONFIG.endpoints.dashboard}/stats`, { token }),
  updateProfile: (token: string, payload: Partial<UserProfile>) =>
    apiRequest<UserProfile>(`${API_CONFIG.endpoints.dashboard}/profile`, { method: "PUT", body: payload, token }),
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_CONFIG.baseURL.replace("/api", "")}/health`)
    return response.ok
  } catch {
    return false
  }
}
