import type { DashboardStats, Order, Product, Review, SessionUser, UserProfile, Vendor, VendorSummary } from "@/types"

export const featuredVendors: VendorSummary[] = [
  {
    id: "vendor-mama-thandi",
    businessName: "Mama Thandi's Vetkoek",
    category: "Street food",
    description: "Golden vetkoek, savoury mince, and township comfort food made fresh daily.",
    rating: 4.8,
    reviewCount: 126,
    isVerified: true,
    location: "Hatfield, Pretoria",
    distance: "0.3 km away",
    priceRange: "Budget friendly",
    deliveryTime: "15-25 min",
  },
  {
    id: "vendor-nomsa-fresh",
    businessName: "Nomsa's Fresh Fruits",
    category: "Produce",
    description: "Fresh fruit cups, smoothies, and seasonal produce sourced from local growers.",
    rating: 4.7,
    reviewCount: 94,
    isVerified: true,
    location: "Arcadia, Pretoria",
    distance: "0.9 km away",
    priceRange: "Affordable",
    deliveryTime: "20-30 min",
  },
  {
    id: "vendor-sipho-style",
    businessName: "Sipho Style",
    category: "Clothing",
    description: "Curated thrift fashion, sneakers, and accessories with same-day pickup.",
    rating: 4.6,
    reviewCount: 58,
    isVerified: false,
    location: "Mamelodi, Pretoria",
    distance: "2.2 km away",
    priceRange: "Mid-range",
    deliveryTime: "35-50 min",
  },
]

export const productsByVendor: Record<string, Product[]> = {
  "vendor-mama-thandi": [
    { id: "prod-vetkoek-1", vendorId: "vendor-mama-thandi", vendorName: "Mama Thandi's Vetkoek", name: "Mince Vetkoek", description: "Soft vetkoek filled with savoury mince.", price: 28, stock: 45, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-vetkoek-2", vendorId: "vendor-mama-thandi", vendorName: "Mama Thandi's Vetkoek", name: "Atchar Vetkoek", description: "A tangy vegetarian favourite.", price: 22, stock: 30, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" },
  ],
  "vendor-nomsa-fresh": [
    { id: "prod-fruit-1", vendorId: "vendor-nomsa-fresh", vendorName: "Nomsa's Fresh Fruits", name: "Fruit Cup", description: "Seasonal fruit mix prepared fresh on order.", price: 35, stock: 25, image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-fruit-2", vendorId: "vendor-nomsa-fresh", vendorName: "Nomsa's Fresh Fruits", name: "Green Smoothie", description: "Spinach, apple, cucumber, and ginger.", price: 42, stock: 18, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80" },
  ],
  "vendor-sipho-style": [
    { id: "prod-style-1", vendorId: "vendor-sipho-style", vendorName: "Sipho Style", name: "Vintage Denim Jacket", description: "Cleaned, restored, and ready to wear.", price: 320, stock: 6, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" },
  ],
}

export const vendorReviews: Record<string, Review[]> = {
  "vendor-mama-thandi": [
    { id: "review-1", vendorId: "vendor-mama-thandi", customerId: "user-1", customerName: "Ayanda", rating: 5, comment: "Hot, fresh, and perfectly seasoned. Delivery was right on time.", createdAt: "2026-08-18T11:00:00Z" },
    { id: "review-2", vendorId: "vendor-mama-thandi", customerId: "user-2", customerName: "Kamohelo", rating: 4, comment: "Loved the mince filling. Would order again for lunch.", createdAt: "2026-08-16T14:30:00Z" },
  ],
}

export const demoOrders: Order[] = [
  {
    id: "order-1001",
    customerId: "demo-customer",
    vendorId: "vendor-mama-thandi",
    vendorName: "Mama Thandi's Vetkoek",
    customerName: "Lerato Mokoena",
    status: "preparing",
    totalAmount: 56,
    paymentMethod: "Card",
    deliveryAddress: "12 Park Street, Hatfield, Pretoria",
    notes: "Extra chilli please",
    items: [{ id: "item-1", orderId: "order-1001", productId: "prod-vetkoek-1", productName: "Mince Vetkoek", quantity: 2, price: 28 }],
    createdAt: "2026-08-21T09:00:00Z",
    updatedAt: "2026-08-21T09:15:00Z",
  },
  {
    id: "order-1002",
    customerId: "demo-customer",
    vendorId: "vendor-nomsa-fresh",
    vendorName: "Nomsa's Fresh Fruits",
    customerName: "Lerato Mokoena",
    status: "completed",
    totalAmount: 77,
    paymentMethod: "Cash on delivery",
    deliveryAddress: "12 Park Street, Hatfield, Pretoria",
    items: [
      { id: "item-2", orderId: "order-1002", productId: "prod-fruit-1", productName: "Fruit Cup", quantity: 1, price: 35 },
      { id: "item-3", orderId: "order-1002", productId: "prod-fruit-2", productName: "Green Smoothie", quantity: 1, price: 42 },
    ],
    createdAt: "2026-08-18T11:30:00Z",
    updatedAt: "2026-08-18T12:10:00Z",
  },
]

export const vendorDashboardStats: DashboardStats = {
  totalRevenue: 18450,
  totalOrders: 138,
  activeProducts: 24,
  averageRating: 4.8,
  completedOrders: 117,
  pendingOrders: 8,
  returningCustomers: 46,
  topProducts: [
    { label: "Mince Vetkoek", value: 56 },
    { label: "Atchar Vetkoek", value: 31 },
    { label: "Chicken Curry", value: 19 },
  ],
  salesTrend: [
    { label: "Mon", value: 1400 },
    { label: "Tue", value: 2100 },
    { label: "Wed", value: 1980 },
    { label: "Thu", value: 2260 },
    { label: "Fri", value: 2740 },
    { label: "Sat", value: 3190 },
    { label: "Sun", value: 2780 },
  ],
}

export const vendorProfile: UserProfile = {
  id: "profile-1",
  businessName: "Mama Thandi's Vetkoek",
  description: "Fresh, flavour-packed vetkoek and home-style meals prepared daily in Hatfield.",
  category: "Street food",
  email: "vendor@reka.local",
  phone: "+27 82 111 2222",
  location: "Hatfield, Pretoria",
  hours: "Mon-Sat • 07:00-18:00",
  paymentDetails: "FNB • 250655 • Cheque",
  notificationsEmail: true,
  notificationsSms: true,
  savedAddresses: ["Taxi Rank, Hatfield", "Pretoria Station"],
}

export const vendorDetailMap: Record<string, Vendor> = featuredVendors.reduce<Record<string, Vendor>>((accumulator, vendor) => {
  accumulator[vendor.id] = {
    ...vendor,
    userId: `user-${vendor.id}`,
    latitude: -25.7479,
    longitude: 28.2293,
    products: productsByVendor[vendor.id] || [],
    reviews: vendorReviews[vendor.id] || [],
    hours: "Mon-Sat • 07:00-18:00",
    ownerName: vendor.businessName,
    isActive: true,
  }
  return accumulator
}, {})
