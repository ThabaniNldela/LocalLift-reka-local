export type UserType = "customer" | "vendor" | "farmer"

export type PaginatedParams = {
  limit?: number

  page?: number
}

export type VendorFilters = PaginatedParams & {
  category?: string

  location?: string

  query?: string
}

export type SessionUser = {
  email: string

  id: string

  name: string

  phone?: string

  userType: UserType

  vendorId?: string
}

export type AuthResponse = {
  token: string

  user: SessionUser
}

export type VendorSummary = {
  businessName: string

  category: string

  deliveryTime?: string

  description?: string

  distance?: string

  id: string

  isVerified: boolean

  location?: string

  priceRange?: string

  rating: number

  reviewCount: number
}

export type Product = {
  description?: string

  id: string

  image?: string

  name: string

  price: number

  stock?: number

  vendorId: string

  vendorName?: string
}

export type Review = {
  comment?: string

  createdAt: string

  customerId: string

  customerName: string

  id: string

  rating: number

  vendorId: string
}

export type Vendor = VendorSummary & {
  hours?: string

  isActive: boolean

  latitude?: number

  longitude?: number

  ownerName?: string

  products: Product[]

  reviews: Review[]

  userId: string
}

export type OrderItem = {
  id: string

  orderId: string

  price: number

  productId: string

  productName: string

  quantity: number
}

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "completed" | "cancelled"

export type Order = {
  createdAt: string

  customerId: string

  customerName?: string

  deliveryAddress?: string

  id: string

  items: OrderItem[]

  notes?: string

  paymentMethod: string

  receipt?: {
    sentAt?: string

    status: "sent" | "pending" | "pending_configuration" | "failed"
  }

  status: OrderStatus

  totalAmount: number

  tracking?: {
    customer: { latitude: number, longitude: number }

    driver?: { latitude: number, longitude: number, updatedAt: string }

    vendor: { latitude: number, longitude: number }
  }

  updatedAt: string

  vendorId: string

  vendorName?: string
}

export type CartItem = {
  image?: string

  name: string

  price: number

  productId: string

  quantity: number

  vendorId: string

  vendorName: string
}

export type CheckoutPayload = {
  customerId: string

  deliveryAddress: string

  items: Array<{ productId: string, quantity: number }>

  notes?: string

  paymentMethod: string

  paymentIntentId?: string

  phone?: string
}

export type ApiListResponse<T,> = {
  data: T[]

  meta: {
    page: number

    pageSize: number

    total: number

    totalPages: number
  }
}

export type DashboardStats = {
  activeProducts: number

  averageRating: number

  completedOrders: number

  pendingOrders: number

  returningCustomers: number

  salesTrend: Array<{ label: string, value: number }>

  topProducts: Array<{ label: string, value: number }>

  totalOrders: number

  totalRevenue: number
}

export type HarvestListing = {
  crop: string

  farmerId: string

  farmerName: string

  harvestDate: string

  id: string

  latitude: number

  location: string

  longitude: number

  price: number

  quantity: number

  reservedQuantity: number

  unit: string
}

export type FarmerImpact = {
  businessesSupplied: number

  farmerIncome: number

  fulfilledOnTimePercent: number

  fundingReadiness: string

  produceRescuedKg: number

  verifiedSales: number
}

export type HarvestReservation = {
  harvestId: string

  id: string

  listing: HarvestListing

  quantity: number

  totalAmount: number
}

export type UserProfile = {
  businessName: string

  category: string

  description: string

  email: string

  hours: string

  id: string

  location: string

  notificationsEmail: boolean

  notificationsSms: boolean

  paymentDetails: string

  phone: string

  savedAddresses: string[]
}
