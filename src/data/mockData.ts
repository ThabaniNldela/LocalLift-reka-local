import type { DashboardStats, Order, Product, Review, UserProfile, Vendor, VendorSummary } from "@/types"

// ─── Real South African street food vendors ─────────────────────────────────
// Local imagery is used for authentic South African dishes and farm sourcing.
// Foods: Vetkoek, Bunny Chow, Boerewors Roll, Gatsby, Pap & Wors, Kotas, Amagwinya

export const featuredVendors: VendorSummary[] = [
  {
    id: "vendor-mama-thandi",
    businessName: "Mama Thandi's Vetkoek",
    category: "Street food",
    description: "Golden amagwinya / vetkoek, savoury mince, and township comfort food made fresh every morning. A Hatfield institution since 2009.",
    rating: 4.8,
    reviewCount: 126,
    isVerified: true,
    location: "Hatfield, Pretoria",
    distance: "0.3 km away",
    priceRange: "Budget friendly",
    deliveryTime: "15-25 min",
  },
  {
    id: "vendor-bra-zakes",
    businessName: "Bra Zakes Boerewors Corner",
    category: "Street food",
    description: "Sizzling boerewors rolls fresh off the braai, with chakalaka, caramelised onions, and a choice of house-made sauces. Best in Soweto.",
    rating: 4.9,
    reviewCount: 204,
    isVerified: true,
    location: "Soweto, Johannesburg",
    distance: "1.1 km away",
    priceRange: "Budget friendly",
    deliveryTime: "10-20 min",
  },
  {
    id: "vendor-durban-bunny",
    businessName: "Durban Bunny Chow House",
    category: "Street food",
    description: "Authentic Durban-style bunny chow – hollowed bread loaves packed with spicy lamb or bean curry. A legendary taste of eThekwini.",
    rating: 4.9,
    reviewCount: 318,
    isVerified: true,
    location: "Durban CBD, eThekwini",
    distance: "2.4 km away",
    priceRange: "Affordable",
    deliveryTime: "20-35 min",
  },
  {
    id: "vendor-gatsby-cape",
    businessName: "Cape Flats Gatsby Spot",
    category: "Street food",
    description: "Cape Town's iconic Gatsby – a giant submarine roll piled with slap chips, masala steak, salad, and peri-peri sauce. Built to share.",
    rating: 4.7,
    reviewCount: 189,
    isVerified: true,
    location: "Athlone, Cape Town",
    distance: "0.8 km away",
    priceRange: "Affordable",
    deliveryTime: "25-40 min",
  },
  {
    id: "vendor-pap-shack",
    businessName: "Noma's Pap & Wors Shack",
    category: "Street food",
    description: "Creamy pap, grilled boerewors, chakalaka, and morogo – traditional township plates that taste like home.",
    rating: 4.6,
    reviewCount: 97,
    isVerified: true,
    location: "Tembisa, Ekurhuleni",
    distance: "1.7 km away",
    priceRange: "Budget friendly",
    deliveryTime: "20-30 min",
  },
  {
    id: "vendor-kota-king",
    businessName: "Kota King",
    category: "Street food",
    description: "Vaal-style kotas – quarter loaves loaded with polony, atchaar, russians, egg, and slap chips. Generous portions, always hot.",
    rating: 4.5,
    reviewCount: 73,
    isVerified: false,
    location: "Sharpeville, Vaal",
    distance: "3.1 km away",
    priceRange: "Budget friendly",
    deliveryTime: "15-25 min",
  },
  {
    id: "vendor-nomsa-fresh",
    businessName: "Nomsa's Fresh Fruits",
    category: "Produce",
    description: "Fresh fruit cups, smoothies, and seasonal produce sourced from local growers every morning.",
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

// ─── Products per vendor ─────────────────────────────────────────────────────
// Using verified Unsplash photo IDs for relevant food imagery

export const productsByVendor: Record<string, Product[]> = {
  "vendor-mama-thandi": [
    {
      id: "prod-vetkoek-mince",
      vendorId: "vendor-mama-thandi",
      vendorName: "Mama Thandi's Vetkoek",
      name: "Mince Vetkoek (2-pack)",
      description: "Two golden vetkoek filled with spiced savoury mince. Crispy outside, soft inside.",
      price: 28,
      stock: 45,
      image: "/images/vetkoek-filled.jpg",
    },
    {
      id: "prod-vetkoek-atchar",
      vendorId: "vendor-mama-thandi",
      vendorName: "Mama Thandi's Vetkoek",
      name: "Atchar Vetkoek",
      description: "Hot vetkoek with tangy mango atchar – a vegetarian township favourite.",
      price: 22,
      stock: 30,
      image: "/images/amagwinya-fried-bread.jpg",
    },
    {
      id: "prod-vetkoek-cheese",
      vendorId: "vendor-mama-thandi",
      vendorName: "Mama Thandi's Vetkoek",
      name: "Cheese & Tomato Vetkoek",
      description: "Soft amagwinya with melted cheese and fresh tomato. Kids love it.",
      price: 20,
      stock: 40,
      image: "/images/vetkoek-filled.jpg",
    },
    {
      id: "prod-vetkoek-chicken",
      vendorId: "vendor-mama-thandi",
      vendorName: "Mama Thandi's Vetkoek",
      name: "Chicken Curry Vetkoek",
      description: "Creamy Cape Malay-style chicken curry stuffed inside fresh vetkoek.",
      price: 35,
      stock: 25,
      image: "/images/amagwinya-fried-bread.jpg",
    },
  ],

  "vendor-bra-zakes": [
    {
      id: "prod-boerie-classic",
      vendorId: "vendor-bra-zakes",
      vendorName: "Bra Zakes Boerewors Corner",
      name: "Classic Boerewors Roll",
      description: "100% beef boerewors grilled over coals, served in a fresh roll with caramelised onions and mustard.",
      price: 45,
      stock: 60,
      // grilled sausage / hot dog
      image: "https://images.unsplash.com/photo-1612392062631-94b4a7657f5a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "prod-boerie-chakalaka",
      vendorId: "vendor-bra-zakes",
      vendorName: "Bra Zakes Boerewors Corner",
      name: "Chakalaka Boerie Roll",
      description: "Loaded with spicy chakalaka relish, sliced tomato, and lettuce. A flavour explosion.",
      price: 50,
      stock: 50,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "prod-boerie-combo",
      vendorId: "vendor-bra-zakes",
      vendorName: "Bra Zakes Boerewors Corner",
      name: "Boerie + Chips Combo",
      description: "A boerewors roll with a generous helping of hand-cut chips. Value meal.",
      price: 70,
      stock: 35,
      image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=800&q=80",
    },
  ],

  "vendor-durban-bunny": [
    {
      id: "prod-bunny-lamb",
      vendorId: "vendor-durban-bunny",
      vendorName: "Durban Bunny Chow House",
      name: "Lamb Bunny Chow (Quarter)",
      description: "A quarter loaf hollowed and filled with slow-cooked Durban lamb curry. Fiery and fragrant.",
      price: 65,
      stock: 30,
      // curry bread bowl
      image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "prod-bunny-bean",
      vendorId: "vendor-durban-bunny",
      vendorName: "Durban Bunny Chow House",
      name: "Bean Bunny Chow (Half)",
      description: "Half-loaf packed with spiced butter bean curry. Popular vegetarian option.",
      price: 55,
      stock: 25,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "prod-bunny-chicken",
      vendorId: "vendor-durban-bunny",
      vendorName: "Durban Bunny Chow House",
      name: "Chicken Bunny Chow (Quarter)",
      description: "Quarter loaf with rich Durban chicken curry. Best paired with a cold Coke.",
      price: 60,
      stock: 40,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "prod-bunny-mutton",
      vendorId: "vendor-durban-bunny",
      vendorName: "Durban Bunny Chow House",
      name: "Mutton Bunny Chow (Half)",
      description: "Our bestseller. Slow-simmered mutton curry, perfectly spiced, in a half-loaf.",
      price: 75,
      stock: 20,
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    },
  ],

  "vendor-gatsby-cape": [
    {
      id: "prod-gatsby-steak",
      vendorId: "vendor-gatsby-cape",
      vendorName: "Cape Flats Gatsby Spot",
      name: "Masala Steak Gatsby",
      description: "A full submarine roll with masala steak strips, slap chips, lettuce, tomato, and peri-peri mayo. Serves 2-3.",
      price: 120,
      stock: 15,
      // large sub sandwich
      image: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "prod-gatsby-polony",
      vendorId: "vendor-gatsby-cape",
      vendorName: "Cape Flats Gatsby Spot",
      name: "Polony Gatsby",
      description: "Classic Cape Flats-style with fried polony, chips, atchar, and hot sauce.",
      price: 85,
      stock: 20,
      image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "prod-gatsby-fish",
      vendorId: "vendor-gatsby-cape",
      vendorName: "Cape Flats Gatsby Spot",
      name: "Crumbed Fish Gatsby",
      description: "Cape style crumbed hake, tartar sauce, chips, and fresh slaw in a full sub.",
      price: 110,
      stock: 12,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    },
  ],

  "vendor-pap-shack": [
    {
      id: "prod-pap-wors",
      vendorId: "vendor-pap-shack",
      vendorName: "Noma's Pap & Wors Shack",
      name: "Pap & Wors Plate",
      description: "Creamy soft pap with a generous portion of grilled boerewors, tomato gravy, and chakalaka.",
      price: 55,
      stock: 30,
      image: "/images/pap-meat-and-vegetables.jpg",
    },
    {
      id: "prod-pap-morogo",
      vendorId: "vendor-pap-shack",
      vendorName: "Noma's Pap & Wors Shack",
      name: "Pap, Morogo & Chicken",
      description: "Traditional maize pap with steamed morogo (wild spinach) and grilled chicken pieces.",
      price: 65,
      stock: 20,
      image: "/images/pap-meat-and-vegetables.jpg",
    },
    {
      id: "prod-pap-umleqwa",
      vendorId: "vendor-pap-shack",
      vendorName: "Noma's Pap & Wors Shack",
      name: "Umleqwa (Free-Range Chicken) Plate",
      description: "Township-style free-range chicken, slow-cooked in a rich tomato and onion sauce. Served with pap.",
      price: 80,
      stock: 15,
      image: "/images/pap-meat-and-vegetables.jpg",
    },
  ],

  "vendor-kota-king": [
    {
      id: "prod-kota-classic",
      vendorId: "vendor-kota-king",
      vendorName: "Kota King",
      name: "Classic Kota",
      description: "Quarter loaf loaded with polony, fried egg, chips, atchar, and tomato sauce. A Vaal legend.",
      price: 35,
      stock: 50,
      image: "/images/loaded-kota.jpg",
    },
    {
      id: "prod-kota-russian",
      vendorId: "vendor-kota-king",
      vendorName: "Kota King",
      name: "Russian Kota",
      description: "Quarter loaf with sliced Russian sausage, chips, atchar, and extra cheese.",
      price: 40,
      stock: 45,
      image: "/images/kota-cheese-sausage.jpg",
    },
    {
      id: "prod-kota-special",
      vendorId: "vendor-kota-king",
      vendorName: "Kota King",
      name: "Kota Special (Everything!)",
      description: "The full load: polony, Russian, egg, atchar, chips, cheese, chakalaka, and peri-peri.",
      price: 55,
      stock: 30,
      image: "/images/kota-cheese-sausage-alternate.jpg",
    },
  ],

  "vendor-nomsa-fresh": [
    {
      id: "prod-fruit-cup",
      vendorId: "vendor-nomsa-fresh",
      vendorName: "Nomsa's Fresh Fruits",
      name: "Seasonal Fruit Cup",
      description: "Mango, pineapple, watermelon, and litchi — sliced fresh to order.",
      price: 35,
      stock: 25,
      image: "/images/farmer-harvesting-greens.jpg",
    },
    {
      id: "prod-green-smoothie",
      vendorId: "vendor-nomsa-fresh",
      vendorName: "Nomsa's Fresh Fruits",
      name: "Green Smoothie",
      description: "Spinach, green apple, cucumber, ginger, and a squeeze of lemon.",
      price: 42,
      stock: 18,
      image: "/images/greenhouse-growing.jpg",
    },
  ],

  "vendor-sipho-style": [
    {
      id: "prod-denim-jacket",
      vendorId: "vendor-sipho-style",
      vendorName: "Sipho Style",
      name: "Vintage Denim Jacket",
      description: "Cleaned, restored, and ready to wear. Sizes S–XL.",
      price: 320,
      stock: 6,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
  ],
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const vendorReviews: Record<string, Review[]> = {
  "vendor-mama-thandi": [
    { id: "review-mt-1", vendorId: "vendor-mama-thandi", customerId: "user-1", customerName: "Ayanda M.", rating: 5, comment: "Hot, fresh, and perfectly seasoned. The mince vetkoek is unmatched!", createdAt: "2026-08-18T11:00:00Z" },
    { id: "review-mt-2", vendorId: "vendor-mama-thandi", customerId: "user-2", customerName: "Kamohelo D.", rating: 4, comment: "Loved the mince filling. Delivery was on time. Will order again!", createdAt: "2026-08-16T14:30:00Z" },
    { id: "review-mt-3", vendorId: "vendor-mama-thandi", customerId: "user-3", customerName: "Zanele P.", rating: 5, comment: "Tastes just like home. The atchar vetkoek is my favourite.", createdAt: "2026-08-14T10:00:00Z" },
  ],
  "vendor-bra-zakes": [
    { id: "review-bz-1", vendorId: "vendor-bra-zakes", customerId: "user-4", customerName: "Sifiso N.", rating: 5, comment: "Best boerewors roll in Soweto, hands down. The chakalaka is fire!", createdAt: "2026-08-20T12:00:00Z" },
    { id: "review-bz-2", vendorId: "vendor-bra-zakes", customerId: "user-5", customerName: "Thabo K.", rating: 5, comment: "Always juicy, always fresh off the braai. Bra Zakes never misses.", createdAt: "2026-08-19T13:30:00Z" },
    { id: "review-bz-3", vendorId: "vendor-bra-zakes", customerId: "user-6", customerName: "Lindiwe V.", rating: 4, comment: "Great flavours. Combo with chips is worth every rand.", createdAt: "2026-08-17T15:00:00Z" },
  ],
  "vendor-durban-bunny": [
    { id: "review-db-1", vendorId: "vendor-durban-bunny", customerId: "user-7", customerName: "Priya S.", rating: 5, comment: "Authentic Durban bunny. The lamb curry has the right amount of heat – perfect!", createdAt: "2026-08-21T10:30:00Z" },
    { id: "review-db-2", vendorId: "vendor-durban-bunny", customerId: "user-8", customerName: "Ravi P.", rating: 5, comment: "Transported straight back to Grey Street. Absolutely the real deal.", createdAt: "2026-08-19T14:00:00Z" },
    { id: "review-db-3", vendorId: "vendor-durban-bunny", customerId: "user-9", customerName: "Nokuthula Z.", rating: 4, comment: "Bean bunny is great for vegetarians! A must-try if you haven't had one.", createdAt: "2026-08-18T11:15:00Z" },
  ],
  "vendor-gatsby-cape": [
    { id: "review-gc-1", vendorId: "vendor-gatsby-cape", customerId: "user-10", customerName: "Farouk A.", rating: 5, comment: "This is the real Cape Flats Gatsby. Full to the brim, chips on point, peri-peri perfect.", createdAt: "2026-08-20T18:00:00Z" },
    { id: "review-gc-2", vendorId: "vendor-gatsby-cape", customerId: "user-11", customerName: "Nasreen H.", rating: 4, comment: "We shared a masala steak gatsby between 3 people. Still had leftover. Incredible value.", createdAt: "2026-08-17T19:30:00Z" },
  ],
  "vendor-pap-shack": [
    { id: "review-ps-1", vendorId: "vendor-pap-shack", customerId: "user-12", customerName: "Mpho L.", rating: 5, comment: "Nothing beats a plate of pap and wors when it's cold. Noma cooks it just right.", createdAt: "2026-08-19T12:30:00Z" },
    { id: "review-ps-2", vendorId: "vendor-pap-shack", customerId: "user-13", customerName: "Dineo S.", rating: 4, comment: "The morogo is perfectly cooked – not mushy. Umleqwa plate is worth every cent.", createdAt: "2026-08-15T13:00:00Z" },
  ],
  "vendor-kota-king": [
    { id: "review-kk-1", vendorId: "vendor-kota-king", customerId: "user-14", customerName: "Sipho M.", rating: 5, comment: "Kota Special is a meal and a half. Chips are always crispy. Never disappointed.", createdAt: "2026-08-21T14:00:00Z" },
    { id: "review-kk-2", vendorId: "vendor-kota-king", customerId: "user-15", customerName: "Ntombi D.", rating: 4, comment: "Classic kota at a fair price. The atchar makes it sing.", createdAt: "2026-08-18T15:30:00Z" },
  ],
}

// ─── Demo orders ──────────────────────────────────────────────────────────────

export const demoOrders: Order[] = [
  {
    id: "order-1001",
    customerId: "demo-customer",
    vendorId: "vendor-mama-thandi",
    vendorName: "Mama Thandi's Vetkoek",
    customerName: "Lerato Mokoena",
    status: "preparing",
    totalAmount: 63,
    paymentMethod: "Card",
    deliveryAddress: "12 Park Street, Hatfield, Pretoria",
    notes: "Extra chilli please",
    items: [
      { id: "item-1a", orderId: "order-1001", productId: "prod-vetkoek-mince", productName: "Mince Vetkoek (2-pack)", quantity: 2, price: 28 },
      { id: "item-1b", orderId: "order-1001", productId: "prod-vetkoek-atchar", productName: "Atchar Vetkoek", quantity: 1, price: 22 },
    ],
    createdAt: "2026-08-21T09:00:00Z",
    updatedAt: "2026-08-21T09:15:00Z",
    tracking: {
      vendor: { latitude: -25.7479, longitude: 28.2293 },
      customer: { latitude: -25.7546, longitude: 28.2382 },
    },
  },
  {
    id: "order-1002",
    customerId: "demo-customer",
    vendorId: "vendor-durban-bunny",
    vendorName: "Durban Bunny Chow House",
    customerName: "Lerato Mokoena",
    status: "completed",
    totalAmount: 140,
    paymentMethod: "Cash on delivery",
    deliveryAddress: "12 Park Street, Hatfield, Pretoria",
    items: [
      { id: "item-2a", orderId: "order-1002", productId: "prod-bunny-lamb", productName: "Lamb Bunny Chow (Quarter)", quantity: 1, price: 65 },
      { id: "item-2b", orderId: "order-1002", productId: "prod-bunny-chicken", productName: "Chicken Bunny Chow (Quarter)", quantity: 1, price: 60 },
    ],
    createdAt: "2026-08-18T11:30:00Z",
    updatedAt: "2026-08-18T12:10:00Z",
    tracking: {
      vendor: { latitude: -29.8587, longitude: 31.0218 },
      customer: { latitude: -29.865, longitude: 31.03 },
    },
  },
  {
    id: "order-1003",
    customerId: "demo-customer",
    vendorId: "vendor-bra-zakes",
    vendorName: "Bra Zakes Boerewors Corner",
    customerName: "Lerato Mokoena",
    status: "out_for_delivery",
    totalAmount: 120,
    paymentMethod: "Wallet",
    deliveryAddress: "12 Park Street, Hatfield, Pretoria",
    items: [
      { id: "item-3a", orderId: "order-1003", productId: "prod-boerie-combo", productName: "Boerie + Chips Combo", quantity: 1, price: 70 },
      { id: "item-3b", orderId: "order-1003", productId: "prod-boerie-chakalaka", productName: "Chakalaka Boerie Roll", quantity: 1, price: 50 },
    ],
    createdAt: "2026-08-22T10:00:00Z",
    updatedAt: "2026-08-22T10:25:00Z",
    tracking: {
      vendor: { latitude: -26.2672, longitude: 27.8621 },
      customer: { latitude: -26.278, longitude: 27.878 },
      driver: { latitude: -26.273, longitude: 27.871, updatedAt: "2026-08-22T10:25:00Z" },
    },
  },
]

// ─── Vendor dashboard stats ───────────────────────────────────────────────────

export const vendorDashboardStats: DashboardStats = {
  totalRevenue: 24680,
  totalOrders: 213,
  activeProducts: 4,
  averageRating: 4.8,
  completedOrders: 189,
  pendingOrders: 11,
  returningCustomers: 68,
  topProducts: [
    { label: "Mince Vetkoek (2-pack)", value: 84 },
    { label: "Chicken Curry Vetkoek", value: 56 },
    { label: "Atchar Vetkoek", value: 42 },
    { label: "Cheese & Tomato Vetkoek", value: 31 },
  ],
  salesTrend: [
    { label: "Mon", value: 1820 },
    { label: "Tue", value: 2450 },
    { label: "Wed", value: 2100 },
    { label: "Thu", value: 2900 },
    { label: "Fri", value: 3640 },
    { label: "Sat", value: 4380 },
    { label: "Sun", value: 3390 },
  ],
}

// ─── Vendor profile ───────────────────────────────────────────────────────────

export const vendorProfile: UserProfile = {
  id: "profile-1",
  businessName: "Mama Thandi's Vetkoek",
  description: "Fresh, flavour-packed amagwinya and home-style meals prepared daily in Hatfield. Serving the community since 2009.",
  category: "Street food",
  email: "vendor@reka.local",
  phone: "+27 82 111 2222",
  location: "Hatfield, Pretoria",
  hours: "Mon-Sat • 06:00-18:00",
  paymentDetails: "FNB • 250655 • Cheque",
  notificationsEmail: true,
  notificationsSms: true,
  savedAddresses: ["Hatfield Taxi Rank", "Pretoria Station", "Loftus Versfeld"],
}

// ─── Full vendor detail map ───────────────────────────────────────────────────

const vendorCoordinates: Record<string, { latitude: number; longitude: number; hours: string }> = {
  "vendor-mama-thandi": { latitude: -25.7479, longitude: 28.2293, hours: "Mon-Sat • 06:00-18:00" },
  "vendor-bra-zakes":   { latitude: -26.2672, longitude: 27.8621, hours: "Mon-Sun • 08:00-20:00" },
  "vendor-durban-bunny":{ latitude: -29.8587, longitude: 31.0218, hours: "Mon-Sun • 07:00-21:00" },
  "vendor-gatsby-cape": { latitude: -33.9622, longitude: 18.5038, hours: "Mon-Sat • 09:00-22:00" },
  "vendor-pap-shack":   { latitude: -25.9958, longitude: 28.2265, hours: "Mon-Fri • 07:00-17:00" },
  "vendor-kota-king":   { latitude: -26.6855, longitude: 27.8439, hours: "Mon-Sun • 06:30-18:00" },
  "vendor-nomsa-fresh": { latitude: -25.7579, longitude: 28.2100, hours: "Mon-Sat • 06:00-16:00" },
  "vendor-sipho-style": { latitude: -25.7200, longitude: 28.3500, hours: "Tue-Sun • 10:00-19:00" },
}

export const vendorDetailMap: Record<string, Vendor> = featuredVendors.reduce<Record<string, Vendor>>((acc, vendor) => {
  const coords = vendorCoordinates[vendor.id] ?? { latitude: -25.7479, longitude: 28.2293, hours: "Mon-Sat • 07:00-18:00" }
  acc[vendor.id] = {
    ...vendor,
    userId: `user-${vendor.id}`,
    latitude: coords.latitude,
    longitude: coords.longitude,
    products: productsByVendor[vendor.id] || [],
    reviews: vendorReviews[vendor.id] || [],
    hours: coords.hours,
    ownerName: vendor.businessName,
    isActive: true,
  }
  return acc
}, {})
