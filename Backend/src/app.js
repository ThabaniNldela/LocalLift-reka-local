const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8443",
  credentials: true,
}));
app.use(express.json());

// ── JWT helper ──────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "reka-local-dev-secret";

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

function verifyToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Unauthorised" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// ── In-memory store (replaces DB until Prisma is wired up) ─────────────────
// Seeded with real South African street food vendors

const SA_VENDORS = [
  {
    id: "vendor-mama-thandi",
    userId: "user-vendor-1",
    businessName: "Mama Thandi's Vetkoek",
    category: "Street food",
    description: "Golden amagwinya / vetkoek, savoury mince, and township comfort food made fresh every morning. A Hatfield institution since 2009.",
    location: "Hatfield, Pretoria",
    latitude: -25.7479,
    longitude: 28.2293,
    rating: 4.8,
    reviewCount: 126,
    isVerified: true,
    isActive: true,
    hours: "Mon-Sat • 06:00-18:00",
    distance: "0.3 km",
    priceRange: "Budget friendly",
    deliveryTime: "15-25 min",
  },
  {
    id: "vendor-bra-zakes",
    userId: "user-vendor-2",
    businessName: "Bra Zakes Boerewors Corner",
    category: "Street food",
    description: "Sizzling boerewors rolls fresh off the braai, with chakalaka, caramelised onions, and a choice of house-made sauces. Best in Soweto.",
    location: "Soweto, Johannesburg",
    latitude: -26.2672,
    longitude: 27.8621,
    rating: 4.9,
    reviewCount: 204,
    isVerified: true,
    isActive: true,
    hours: "Mon-Sun • 08:00-20:00",
    distance: "1.1 km",
    priceRange: "Budget friendly",
    deliveryTime: "10-20 min",
  },
  {
    id: "vendor-durban-bunny",
    userId: "user-vendor-3",
    businessName: "Durban Bunny Chow House",
    category: "Street food",
    description: "Authentic Durban-style bunny chow – hollowed bread loaves packed with spicy lamb or bean curry. A legendary taste of eThekwini.",
    location: "Durban CBD, eThekwini",
    latitude: -29.8587,
    longitude: 31.0218,
    rating: 4.9,
    reviewCount: 318,
    isVerified: true,
    isActive: true,
    hours: "Mon-Sun • 07:00-21:00",
    distance: "2.4 km",
    priceRange: "Affordable",
    deliveryTime: "20-35 min",
  },
  {
    id: "vendor-gatsby-cape",
    userId: "user-vendor-4",
    businessName: "Cape Flats Gatsby Spot",
    category: "Street food",
    description: "Cape Town's iconic Gatsby – a giant submarine roll piled with slap chips, masala steak, salad, and peri-peri sauce. Built to share.",
    location: "Athlone, Cape Town",
    latitude: -33.9622,
    longitude: 18.5038,
    rating: 4.7,
    reviewCount: 189,
    isVerified: true,
    isActive: true,
    hours: "Mon-Sat • 09:00-22:00",
    distance: "0.8 km",
    priceRange: "Affordable",
    deliveryTime: "25-40 min",
  },
  {
    id: "vendor-pap-shack",
    userId: "user-vendor-5",
    businessName: "Noma's Pap & Wors Shack",
    category: "Street food",
    description: "Creamy pap, grilled boerewors, chakalaka, and morogo – traditional township plates that taste like home.",
    location: "Tembisa, Ekurhuleni",
    latitude: -25.9958,
    longitude: 28.2265,
    rating: 4.6,
    reviewCount: 97,
    isVerified: true,
    isActive: true,
    hours: "Mon-Fri • 07:00-17:00",
    distance: "1.7 km",
    priceRange: "Budget friendly",
    deliveryTime: "20-30 min",
  },
  {
    id: "vendor-kota-king",
    userId: "user-vendor-6",
    businessName: "Kota King",
    category: "Street food",
    description: "Vaal-style kotas – quarter loaves loaded with polony, atchaar, russians, egg, and slap chips. Generous portions, always hot.",
    location: "Sharpeville, Vaal",
    latitude: -26.6855,
    longitude: 27.8439,
    rating: 4.5,
    reviewCount: 73,
    isVerified: false,
    isActive: true,
    hours: "Mon-Sun • 06:30-18:00",
    distance: "3.1 km",
    priceRange: "Budget friendly",
    deliveryTime: "15-25 min",
  },
];

const SA_PRODUCTS = {
  "vendor-mama-thandi": [
    { id: "prod-vetkoek-mince", vendorId: "vendor-mama-thandi", name: "Mince Vetkoek (2-pack)", description: "Two golden vetkoek filled with spiced savoury mince.", price: 28, stock: 45, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-vetkoek-atchar", vendorId: "vendor-mama-thandi", name: "Atchar Vetkoek", description: "Hot vetkoek with tangy mango atchar – a vegetarian township favourite.", price: 22, stock: 30, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-vetkoek-cheese", vendorId: "vendor-mama-thandi", name: "Cheese & Tomato Vetkoek", description: "Soft amagwinya with melted cheese and fresh tomato.", price: 20, stock: 40, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-vetkoek-chicken", vendorId: "vendor-mama-thandi", name: "Chicken Curry Vetkoek", description: "Creamy Cape Malay-style chicken curry stuffed inside fresh vetkoek.", price: 35, stock: 25, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80" },
  ],
  "vendor-bra-zakes": [
    { id: "prod-boerie-classic", vendorId: "vendor-bra-zakes", name: "Classic Boerewors Roll", description: "100% beef boerewors grilled over coals, in a fresh roll with caramelised onions and mustard.", price: 45, stock: 60, image: "https://images.unsplash.com/photo-1612392062631-94b4a7657f5a?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-boerie-chakalaka", vendorId: "vendor-bra-zakes", name: "Chakalaka Boerie Roll", description: "Loaded with spicy chakalaka relish, sliced tomato, and lettuce.", price: 50, stock: 50, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-boerie-combo", vendorId: "vendor-bra-zakes", name: "Boerie + Chips Combo", description: "A boerewors roll with a generous helping of hand-cut chips.", price: 70, stock: 35, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=800&q=80" },
  ],
  "vendor-durban-bunny": [
    { id: "prod-bunny-lamb", vendorId: "vendor-durban-bunny", name: "Lamb Bunny Chow (Quarter)", description: "Quarter loaf hollowed and filled with slow-cooked Durban lamb curry.", price: 65, stock: 30, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-bunny-bean", vendorId: "vendor-durban-bunny", name: "Bean Bunny Chow (Half)", description: "Half-loaf packed with spiced butter bean curry. Vegetarian.", price: 55, stock: 25, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-bunny-chicken", vendorId: "vendor-durban-bunny", name: "Chicken Bunny Chow (Quarter)", description: "Quarter loaf with rich Durban chicken curry.", price: 60, stock: 40, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-bunny-mutton", vendorId: "vendor-durban-bunny", name: "Mutton Bunny Chow (Half)", description: "Slow-simmered mutton curry, perfectly spiced, in a half-loaf.", price: 75, stock: 20, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80" },
  ],
  "vendor-gatsby-cape": [
    { id: "prod-gatsby-steak", vendorId: "vendor-gatsby-cape", name: "Masala Steak Gatsby", description: "Full submarine roll with masala steak strips, slap chips, lettuce, tomato, peri-peri mayo. Serves 2-3.", price: 120, stock: 15, image: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-gatsby-polony", vendorId: "vendor-gatsby-cape", name: "Polony Gatsby", description: "Cape Flats-style with fried polony, chips, atchar, and hot sauce.", price: 85, stock: 20, image: "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-gatsby-fish", vendorId: "vendor-gatsby-cape", name: "Crumbed Fish Gatsby", description: "Cape style crumbed hake, tartar sauce, chips, and fresh slaw.", price: 110, stock: 12, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" },
  ],
  "vendor-pap-shack": [
    { id: "prod-pap-wors", vendorId: "vendor-pap-shack", name: "Pap & Wors Plate", description: "Creamy soft pap with grilled boerewors, tomato gravy, and chakalaka.", price: 55, stock: 30, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-pap-morogo", vendorId: "vendor-pap-shack", name: "Pap, Morogo & Chicken", description: "Maize pap with steamed morogo and grilled chicken pieces.", price: 65, stock: 20, image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-pap-umleqwa", vendorId: "vendor-pap-shack", name: "Umleqwa Plate", description: "Free-range chicken slow-cooked in a rich tomato and onion sauce, served with pap.", price: 80, stock: 15, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80" },
  ],
  "vendor-kota-king": [
    { id: "prod-kota-classic", vendorId: "vendor-kota-king", name: "Classic Kota", description: "Quarter loaf loaded with polony, fried egg, chips, atchar, and tomato sauce.", price: 35, stock: 50, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-kota-russian", vendorId: "vendor-kota-king", name: "Russian Kota", description: "Quarter loaf with sliced Russian sausage, chips, atchar, and extra cheese.", price: 40, stock: 45, image: "https://images.unsplash.com/photo-1612392062631-94b4a7657f5a?auto=format&fit=crop&w=800&q=80" },
    { id: "prod-kota-special", vendorId: "vendor-kota-king", name: "Kota Special (Everything!)", description: "Full load: polony, Russian, egg, atchar, chips, cheese, chakalaka, and peri-peri.", price: 55, stock: 30, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80" },
  ],
};

// In-memory users & orders store
const users = [];
const orders = [];

// ── Root ────────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Welcome to Reka Local API 🇿🇦", version: "1.0.0" });
});

// ── Health check ────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), environment: process.env.NODE_ENV || "development" });
});

// ── AUTH ────────────────────────────────────────────────────────────────────
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name, userType = "customer", phone } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "email, password, and name are required" });
    }
    if (users.find((u) => u.email === email)) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = { id: `user-${Date.now()}`, email, password: hashed, name, userType, phone: phone || null };
    users.push(user);

    const token = signToken({ id: user.id, email: user.email, userType: user.userType });
    const { password: _pw, ...safeUser } = user;
    return res.status(201).json({ token, user: safeUser });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password are required" });

    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({ id: user.id, email: user.email, userType: user.userType });
    const { password: _pw, ...safeUser } = user;
    return res.json({ token, user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/logout", (_req, res) => {
  res.json({ success: true });
});

// ── VENDORS ─────────────────────────────────────────────────────────────────
app.get("/api/vendors", (req, res) => {
  const { search, category, limit, page = 1 } = req.query;
  let results = [...SA_VENDORS];

  if (category && category !== "All") {
    results = results.filter((v) => v.category === category);
  }
  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter((v) =>
      [v.businessName, v.description, v.location, v.category].some((f) => f?.toLowerCase().includes(q))
    );
  }

  const total = results.length;
  const pageSize = Number(limit) || 20;
  const pageNum = Number(page);
  const paginated = results.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  const categories = [...new Set(SA_VENDORS.map((v) => v.category))];

  return res.json({
    vendors: paginated,
    categories,
    meta: { total, page: pageNum, pageSize, totalPages: Math.ceil(total / pageSize) },
  });
});

app.get("/api/vendors/:id", (req, res) => {
  const vendor = SA_VENDORS.find((v) => v.id === req.params.id);
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });

  const products = SA_PRODUCTS[vendor.id] || [];
  return res.json({ vendor, products });
});

// ── PRODUCTS ────────────────────────────────────────────────────────────────
app.get("/api/products", (_req, res) => {
  const all = Object.values(SA_PRODUCTS).flat();
  return res.json({ products: all });
});

app.get("/api/vendors/:id/products", (req, res) => {
  const products = SA_PRODUCTS[req.params.id] || [];
  return res.json({ products });
});

// ── ORDERS ──────────────────────────────────────────────────────────────────
app.get("/api/orders", verifyToken, (req, res) => {
  const userOrders = orders.filter((o) => o.customerId === req.user.id);
  return res.json({ orders: userOrders });
});

app.post("/api/orders", verifyToken, (req, res) => {
  const { items, deliveryAddress, paymentMethod, notes, totalAmount } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: "items are required" });

  const vendorId = items[0]?.productId
    ? Object.keys(SA_PRODUCTS).find((vid) => SA_PRODUCTS[vid].some((p) => p.id === items[0].productId)) || "vendor-mama-thandi"
    : "vendor-mama-thandi";

  const vendor = SA_VENDORS.find((v) => v.id === vendorId);

  const order = {
    id: `order-${Date.now()}`,
    customerId: req.user.id,
    customerName: req.user.name || req.user.email,
    vendorId,
    vendorName: vendor?.businessName || "Local Vendor",
    status: "pending",
    totalAmount: totalAmount || items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0),
    paymentMethod: paymentMethod || "Cash on delivery",
    deliveryAddress: deliveryAddress || "",
    notes: notes || null,
    items: items.map((item, idx) => {
      const product = Object.values(SA_PRODUCTS).flat().find((p) => p.id === item.productId);
      return {
        id: `item-${Date.now()}-${idx}`,
        orderId: `order-${Date.now()}`,
        productId: item.productId,
        productName: product?.name || "Item",
        quantity: item.quantity,
        price: product?.price || item.price || 0,
      };
    }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(order);
  return res.status(201).json({ order });
});

// ── VENDOR DASHBOARD ────────────────────────────────────────────────────────
app.get("/api/vendor/dashboard", verifyToken, (req, res) => {
  const vendorOrders = orders.filter((o) => o.vendorId === req.user.vendorId);
  const totalRevenue = vendorOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  return res.json({
    totalRevenue,
    totalOrders: vendorOrders.length,
    activeProducts: 4,
    averageRating: 4.8,
    completedOrders: vendorOrders.filter((o) => o.status === "completed").length,
    pendingOrders: vendorOrders.filter((o) => o.status === "pending").length,
    returningCustomers: 0,
    topProducts: [
      { label: "Mince Vetkoek (2-pack)", value: 84 },
      { label: "Chicken Curry Vetkoek", value: 56 },
      { label: "Atchar Vetkoek", value: 42 },
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
    recentOrders: vendorOrders.slice(-5),
  });
});

app.get("/api/vendor/orders", verifyToken, (req, res) => {
  const { status } = req.query;
  let result = orders.filter((o) => o.vendorId === (req.user.vendorId || "vendor-mama-thandi"));
  if (status) result = result.filter((o) => o.status === status);
  return res.json({ orders: result });
});

app.patch("/api/vendor/orders/:id", verifyToken, (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  order.status = req.body.status || order.status;
  order.updatedAt = new Date().toISOString();
  return res.json({ order });
});

app.get("/api/vendor/products", verifyToken, (_req, res) => {
  // Return the logged-in vendor's products (defaulting to mama thandi for demo)
  const products = SA_PRODUCTS["vendor-mama-thandi"] || [];
  return res.json({ products });
});

// ── REVIEWS ─────────────────────────────────────────────────────────────────
app.get("/api/vendors/:id/reviews", (req, res) => {
  // Mock reviews per vendor
  const reviewMap = {
    "vendor-mama-thandi": [
      { id: "r1", vendorId: "vendor-mama-thandi", customerId: "u1", customerName: "Ayanda M.", rating: 5, comment: "Hot, fresh, and perfectly seasoned!", createdAt: "2026-08-18T11:00:00Z" },
      { id: "r2", vendorId: "vendor-mama-thandi", customerId: "u2", customerName: "Kamohelo D.", rating: 4, comment: "Loved the mince filling. Will order again!", createdAt: "2026-08-16T14:30:00Z" },
    ],
    "vendor-bra-zakes": [
      { id: "r3", vendorId: "vendor-bra-zakes", customerId: "u3", customerName: "Sifiso N.", rating: 5, comment: "Best boerewors roll in Soweto!", createdAt: "2026-08-20T12:00:00Z" },
    ],
    "vendor-durban-bunny": [
      { id: "r4", vendorId: "vendor-durban-bunny", customerId: "u4", customerName: "Priya S.", rating: 5, comment: "Authentic Durban bunny – just perfect!", createdAt: "2026-08-21T10:30:00Z" },
      { id: "r5", vendorId: "vendor-durban-bunny", customerId: "u5", customerName: "Ravi P.", rating: 5, comment: "Transported straight back to Grey Street.", createdAt: "2026-08-19T14:00:00Z" },
    ],
  };
  const reviews = reviewMap[req.params.id] || [];
  return res.json({ reviews });
});

// ── 404 catch-all ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
