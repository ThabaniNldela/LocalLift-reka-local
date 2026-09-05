const express = require("express")

const cors = require("cors")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const Stripe = require("stripe")

const path = require("node:path")

const app = express()
const frontendBuild = path.resolve(__dirname, "../../dist")

// ── Middleware ──────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8443",

    credentials: true,
  }),
)

app.use(express.json())

// ── JWT helper ──────────────────────────────────────────────────────────────

const JWT_SECRET = process.env.JWT_SECRET || "reka-local-dev-secret"

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

const mailer =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,

        port: Number(process.env.SMTP_PORT || 587),

        secure: process.env.SMTP_SECURE === "true",

        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      })
    : null

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

function verifyToken(req, res, next) {
  const header = req.headers.authorization || ""

  const token = header.startsWith("Bearer ") ? header.slice(7) : null

  if (!token) return res.status(401).json({ error: "Unauthorised" })

  try {
    req.user = jwt.verify(token, JWT_SECRET)

    next()
  } catch {
    return res.status(401).json({ error: "Invalid token" })
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

    description:
      "Golden amagwinya / vetkoek, savoury mince, and township comfort food made fresh every morning. A Hatfield institution since 2009.",

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

    description:
      "Sizzling boerewors rolls fresh off the braai, with chakalaka, caramelised onions, and a choice of house-made sauces. Best in Soweto.",

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

    description:
      "Authentic Durban-style bunny chow – hollowed bread loaves packed with spicy lamb or bean curry. A legendary taste of eThekwini.",

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

    description:
      "Cape Town's iconic Gatsby – a giant submarine roll piled with slap chips, masala steak, salad, and peri-peri sauce. Built to share.",

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

    description:
      "Creamy pap, grilled boerewors, chakalaka, and morogo – traditional township plates that taste like home.",

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

    description:
      "Vaal-style kotas – quarter loaves loaded with polony, atchaar, russians, egg, and slap chips. Generous portions, always hot.",

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
]

const SA_PRODUCTS = {
  "vendor-mama-thandi": [
    {
      id: "prod-vetkoek-mince",
      vendorId: "vendor-mama-thandi",
      name: "Mince Vetkoek (2-pack)",
      description: "Two golden vetkoek filled with spiced savoury mince.",
      price: 28,
      stock: 45,
      image: "/images/vetkoek-filled.jpg",
    },

    {
      id: "prod-vetkoek-atchar",
      vendorId: "vendor-mama-thandi",
      name: "Atchar Vetkoek",
      description:
        "Hot vetkoek with tangy mango atchar – a vegetarian township favourite.",
      price: 22,
      stock: 30,
      image: "/images/amagwinya-fried-bread.jpg",
    },

    {
      id: "prod-vetkoek-cheese",
      vendorId: "vendor-mama-thandi",
      name: "Cheese & Tomato Vetkoek",
      description: "Soft amagwinya with melted cheese and fresh tomato.",
      price: 20,
      stock: 40,
      image: "/images/vetkoek-filled.jpg",
    },

    {
      id: "prod-vetkoek-chicken",
      vendorId: "vendor-mama-thandi",
      name: "Chicken Curry Vetkoek",
      description:
        "Creamy Cape Malay-style chicken curry stuffed inside fresh vetkoek.",
      price: 35,
      stock: 25,
      image: "/images/amagwinya-fried-bread.jpg",
    },
  ],

  "vendor-bra-zakes": [
    {
      id: "prod-boerie-classic",
      vendorId: "vendor-bra-zakes",
      name: "Classic Boerewors Roll",
      description:
        "100% beef boerewors grilled over coals, in a fresh roll with caramelised onions and mustard.",
      price: 45,
      stock: 60,
      image:
        "https://images.unsplash.com/photo-1612392062631-94b4a7657f5a?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "prod-boerie-chakalaka",
      vendorId: "vendor-bra-zakes",
      name: "Chakalaka Boerie Roll",
      description:
        "Loaded with spicy chakalaka relish, sliced tomato, and lettuce.",
      price: 50,
      stock: 50,
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "prod-boerie-combo",
      vendorId: "vendor-bra-zakes",
      name: "Boerie + Chips Combo",
      description:
        "A boerewors roll with a generous helping of hand-cut chips.",
      price: 70,
      stock: 35,
      image:
        "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=800&q=80",
    },
  ],

  "vendor-durban-bunny": [
    {
      id: "prod-bunny-lamb",
      vendorId: "vendor-durban-bunny",
      name: "Lamb Bunny Chow (Quarter)",
      description:
        "Quarter loaf hollowed and filled with slow-cooked Durban lamb curry.",
      price: 65,
      stock: 30,
      image:
        "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "prod-bunny-bean",
      vendorId: "vendor-durban-bunny",
      name: "Bean Bunny Chow (Half)",
      description:
        "Half-loaf packed with spiced butter bean curry. Vegetarian.",
      price: 55,
      stock: 25,
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "prod-bunny-chicken",
      vendorId: "vendor-durban-bunny",
      name: "Chicken Bunny Chow (Quarter)",
      description: "Quarter loaf with rich Durban chicken curry.",
      price: 60,
      stock: 40,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "prod-bunny-mutton",
      vendorId: "vendor-durban-bunny",
      name: "Mutton Bunny Chow (Half)",
      description:
        "Slow-simmered mutton curry, perfectly spiced, in a half-loaf.",
      price: 75,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    },
  ],

  "vendor-gatsby-cape": [
    {
      id: "prod-gatsby-steak",
      vendorId: "vendor-gatsby-cape",
      name: "Masala Steak Gatsby",
      description:
        "Full submarine roll with masala steak strips, slap chips, lettuce, tomato, peri-peri mayo. Serves 2-3.",
      price: 120,
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "prod-gatsby-polony",
      vendorId: "vendor-gatsby-cape",
      name: "Polony Gatsby",
      description:
        "Cape Flats-style with fried polony, chips, atchar, and hot sauce.",
      price: 85,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "prod-gatsby-fish",
      vendorId: "vendor-gatsby-cape",
      name: "Crumbed Fish Gatsby",
      description:
        "Cape style crumbed hake, tartar sauce, chips, and fresh slaw.",
      price: 110,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    },
  ],

  "vendor-pap-shack": [
    {
      id: "prod-pap-wors",
      vendorId: "vendor-pap-shack",
      name: "Pap & Wors Plate",
      description:
        "Creamy soft pap with grilled boerewors, tomato gravy, and chakalaka.",
      price: 55,
      stock: 30,
      image: "/images/pap-meat-and-vegetables.jpg",
    },

    {
      id: "prod-pap-morogo",
      vendorId: "vendor-pap-shack",
      name: "Pap, Morogo & Chicken",
      description: "Maize pap with steamed morogo and grilled chicken pieces.",
      price: 65,
      stock: 20,
      image: "/images/pap-meat-and-vegetables.jpg",
    },

    {
      id: "prod-pap-umleqwa",
      vendorId: "vendor-pap-shack",
      name: "Umleqwa Plate",
      description:
        "Free-range chicken slow-cooked in a rich tomato and onion sauce, served with pap.",
      price: 80,
      stock: 15,
      image: "/images/pap-meat-and-vegetables.jpg",
    },
  ],

  "vendor-kota-king": [
    {
      id: "prod-kota-classic",
      vendorId: "vendor-kota-king",
      name: "Classic Kota",
      description:
        "Quarter loaf loaded with polony, fried egg, chips, atchar, and tomato sauce.",
      price: 35,
      stock: 50,
      image: "/images/loaded-kota.jpg",
    },

    {
      id: "prod-kota-russian",
      vendorId: "vendor-kota-king",
      name: "Russian Kota",
      description:
        "Quarter loaf with sliced Russian sausage, chips, atchar, and extra cheese.",
      price: 40,
      stock: 45,
      image: "/images/kota-cheese-sausage.jpg",
    },

    {
      id: "prod-kota-special",
      vendorId: "vendor-kota-king",
      name: "Kota Special (Everything!)",
      description:
        "Full load: polony, Russian, egg, atchar, chips, cheese, chakalaka, and peri-peri.",
      price: 55,
      stock: 30,
      image: "/images/kota-cheese-sausage-alternate.jpg",
    },
  ],
}

// In-memory users & orders store

const users = []

const orders = []

const harvestListings = [
  {
    id: "harvest-spinach",

    farmerId: "farmer-thabo",

    farmerName: "Thabo's Green Farm",

    crop: "Fresh Spinach Bundles",

    location: "Mamelodi, Pretoria",

    latitude: -25.697,

    longitude: 28.374,

    price: 9,

    unit: "bundle",

    quantity: 50,

    reservedQuantity: 32,

    harvestDate: new Date().toISOString().slice(0, 10),
  },

  {
    id: "harvest-tomatoes",

    farmerId: "farmer-sakhile",

    farmerName: "Sakhile Growers Co-op",

    crop: "Roma Tomatoes",

    location: "Tembisa, Ekurhuleni",

    latitude: -25.996,

    longitude: 28.227,

    price: 18,

    unit: "kg",

    quantity: 40,

    reservedQuantity: 18,

    harvestDate: new Date().toISOString().slice(0, 10),
  },
]

// ── Root ────────────────────────────────────────────────────────────────────

app.get("/", (_req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.sendFile(path.join(frontendBuild, "index.html"))
  }

  res.json({
    success: true,
    message: "Welcome to Reka Local API 🇿🇦",
    version: "1.0.0",
  })
})

// ── Health check ────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  })
})

// ── AUTH ────────────────────────────────────────────────────────────────────

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name, userType = "customer", phone } = req.body

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "email, password, and name are required" })
    }

    if (users.find((u) => u.email === email)) {
      return res.status(409).json({ error: "Email already registered" })
    }

    const hashed = await bcrypt.hash(password, 10)

    if (!["customer", "vendor", "farmer"].includes(userType)) {
      return res
        .status(400)
        .json({ error: "userType must be customer, vendor, or farmer" })
    }

    const vendorId = userType === "vendor" ? "vendor-mama-thandi" : null

    const user = {
      id: `user-${Date.now()}`,
      email,
      password: hashed,
      name,
      userType,
      phone: phone || null,
      vendorId,
    }

    users.push(user)

    const token = signToken({
      id: user.id,
      email: user.email,
      userType: user.userType,
      vendorId: user.vendorId,
    })

    const { password: _pw, ...safeUser } = user

    return res.status(201).json({ token, user: safeUser })
  } catch (err) {
    console.error("Register error:", err)

    return res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: "email and password are required" })

    const user = users.find((u) => u.email === email)

    if (!user) return res.status(401).json({ error: "Invalid credentials" })

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) return res.status(401).json({ error: "Invalid credentials" })

    const token = signToken({
      id: user.id,
      email: user.email,
      userType: user.userType,
      vendorId: user.vendorId,
    })

    const { password: _pw, ...safeUser } = user

    return res.json({ token, user: safeUser })
  } catch (err) {
    console.error("Login error:", err)

    return res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/auth/logout", (_req, res) => {
  res.json({ success: true })
})

// ── VENDORS ─────────────────────────────────────────────────────────────────

app.get("/api/vendors", (req, res) => {
  const { search, category, limit, page = 1 } = req.query

  let results = [...SA_VENDORS]

  if (category && category !== "All") {
    results = results.filter((v) => v.category === category)
  }

  if (search) {
    const q = String(search).toLowerCase()

    results = results.filter((v) =>
      [v.businessName, v.description, v.location, v.category].some((f) =>
        f?.toLowerCase().includes(q),
      ),
    )
  }

  const total = results.length

  const pageSize = Number(limit) || 20

  const pageNum = Number(page)

  const paginated = results.slice((pageNum - 1) * pageSize, pageNum * pageSize)

  const categories = [...new Set(SA_VENDORS.map((v) => v.category))]

  return res.json({
    vendors: paginated,

    categories,

    meta: {
      total,
      page: pageNum,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  })
})

app.get("/api/vendors/:id", (req, res) => {
  const vendor = SA_VENDORS.find((v) => v.id === req.params.id)

  if (!vendor) return res.status(404).json({ error: "Vendor not found" })

  const products = SA_PRODUCTS[vendor.id] || []

  return res.json({ vendor, products })
})

// ── PRODUCTS ────────────────────────────────────────────────────────────────

app.get("/api/products", (_req, res) => {
  const all = Object.values(SA_PRODUCTS).flat()

  return res.json({ products: all })
})

app.get("/api/vendors/:id/products", (req, res) => {
  const products = SA_PRODUCTS[req.params.id] || []

  return res.json({ products })
})

// ── FARMER HARVEST EXCHANGE ─────────────────────────────────────────────────

app.get("/api/farmers/harvests", (_req, res) => {
  return res.json({
    data: harvestListings,
    meta: {
      total: harvestListings.length,
      page: 1,
      pageSize: harvestListings.length,
      totalPages: 1,
    },
  })
})

app.post(
  "/api/farmers/harvests",
  verifyToken,
  requireFarmerOrVendor,
  (req, res) => {
    const { crop, location, price, quantity, unit } = req.body

    if (
      !crop ||
      !location ||
      !unit ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        error:
          "crop, location, unit, positive price, and positive integer quantity are required.",
      })
    }

    const listing = {
      id: `harvest-${Date.now()}`,

      farmerId: req.user.id,

      farmerName: getCurrentUser(req)?.name || "Local Farm",

      crop,

      location,

      latitude: Number.isFinite(req.body.latitude)
        ? req.body.latitude
        : -25.7479,

      longitude: Number.isFinite(req.body.longitude)
        ? req.body.longitude
        : 28.2293,

      price,

      unit,

      quantity,

      reservedQuantity: 0,

      harvestDate: new Date().toISOString().slice(0, 10),
    }

    harvestListings.push(listing)

    return res.status(201).json(listing)
  },
)

app.post("/api/farmers/harvests/:id/reservations", verifyToken, (req, res) => {
  const listing = harvestListings.find(
    (candidate) => candidate.id === req.params.id,
  )

  const quantity = req.body.quantity

  if (!listing)
    return res.status(404).json({ error: "Harvest listing not found." })

  if (!Number.isInteger(quantity) || quantity < 1)
    return res
      .status(400)
      .json({ error: "A positive integer quantity is required." })

  if (listing.reservedQuantity + quantity > listing.quantity)
    return res
      .status(409)
      .json({ error: "Requested quantity is no longer available." })

  listing.reservedQuantity += quantity

  return res.status(201).json({
    id: `reservation-${Date.now()}`,

    harvestId: listing.id,

    buyerId: req.user.id,

    quantity,

    totalAmount: quantity * listing.price,

    listing,
  })
})

app.get("/api/farmers/impact", (_req, res) => {
  return res.json({
    farmerIncome: 48260,

    produceRescuedKg: 1240,

    businessesSupplied: 14,

    verifiedSales: 48260,

    fulfilledOnTimePercent: 98,

    fundingReadiness: "Strong",
  })
})

// ── ORDERS ──────────────────────────────────────────────────────────────────

function calculateOrder(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return null
  }

  const products = Object.values(SA_PRODUCTS).flat()

  const resolvedItems = items.map((item) => {
    const product = products.find(
      (candidate) => candidate.id === item.productId,
    )

    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) {
      return null
    }

    return { product, quantity: item.quantity }
  })

  if (resolvedItems.some((item) => item === null)) {
    return null
  }

  const subtotal = resolvedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return { resolvedItems, subtotal, total: subtotal + 25 }
}

function requireStripe(res) {
  if (!stripe) {
    res.status(503).json({
      error:
        "Stripe is not configured. Set STRIPE_SECRET_KEY to enable card payments.",
    })

    return false
  }

  return true
}

function getCurrentUser(req) {
  return users.find((user) => user.id === req.user.id)
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#39;",
      })[character],
  )
}

async function sendOrderReceipt(order, recipient) {
  if (!mailer) {
    return { status: "pending_configuration" }
  }

  const items = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding:8px 0;color:#334155">${escapeHtml(item.productName)} &times; ${item.quantity}</td>
      <td style="padding:8px 0;text-align:right;color:#0f172a">R${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `,
    )
    .join("")

  await mailer.sendMail({
    from: process.env.RECEIPT_FROM || "Reka Local <receipts@reka-local.test>",

    to: recipient,

    subject: `Your Reka Local receipt · ${order.id}`,

    text: `Thank you for your order from ${order.vendorName}. Order ${order.id}. Total: R${order.totalAmount.toFixed(2)}.`,

    html: `
      <main style="max-width:600px;margin:auto;padding:32px;font-family:Arial,sans-serif;color:#0f172a">
        <div style="background:#064e3b;padding:20px 24px;border-radius:16px 16px 0 0;color:#fff">
          <p style="margin:0;color:#fbbf24;font-size:12px;font-weight:bold;letter-spacing:1.5px">REKA LOCAL</p>
          <h1 style="margin:8px 0 0;font-size:24px">Thanks for supporting local.</h1>
        </div>
        <section style="border:1px solid #e2e8f0;border-top:0;padding:24px;border-radius:0 0 16px 16px">
          <p>Hi ${escapeHtml(order.customerName)},</p>
          <p>Your order has been received by <strong>${escapeHtml(order.vendorName)}</strong>.</p>
          <p style="font-size:13px;color:#64748b">Order ID: ${escapeHtml(order.id)} · Payment: ${escapeHtml(order.paymentMethod)}</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0">${items}</table>
          <div style="border-top:1px solid #e2e8f0;padding-top:14px;text-align:right;font-size:18px;font-weight:bold">Total: R${order.totalAmount.toFixed(2)}</div>
          <p style="margin-top:24px;font-size:13px;color:#64748b">Delivery to: ${escapeHtml(order.deliveryAddress)}</p>
        </section>
      </main>
    `,
  })

  return { status: "sent", sentAt: new Date().toISOString() }
}

async function getOrCreateStripeCustomer(req) {
  const user = getCurrentUser(req)

  if (!user) {
    throw new Error("Authenticated user no longer exists.")
  }

  if (!user.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,

      name: user.name,

      metadata: { rekaLocalUserId: user.id },
    })

    user.stripeCustomerId = customer.id
  }

  return user.stripeCustomerId
}

function requireVendor(req, res, next) {
  if (req.user.userType !== "vendor") {
    return res
      .status(403)
      .json({ error: "This Stripe catalogue action is restricted to vendors." })
  }

  return next()
}

function requireFarmerOrVendor(req, res, next) {
  if (req.user.userType !== "farmer" && req.user.userType !== "vendor") {
    return res.status(403).json({ error: "Farmer or vendor access required" })
  }

  return next()
}

app.post("/api/payments/customers", verifyToken, async (req, res) => {
  if (!requireStripe(res)) return

  try {
    const customerId = await getOrCreateStripeCustomer(req)

    return res.status(201).json(await stripe.customers.retrieve(customerId))
  } catch (error) {
    return res
      .status(502)
      .json({ error: error.message || "Unable to create the Stripe customer." })
  }
})

app.get("/api/payments/customers", verifyToken, async (req, res) => {
  if (!requireStripe(res)) return

  try {
    const customerId = await getOrCreateStripeCustomer(req)

    return res.json({ data: [await stripe.customers.retrieve(customerId)] })
  } catch (error) {
    return res.status(502).json({
      error: error.message || "Unable to retrieve the Stripe customer.",
    })
  }
})

app.post("/api/payments/create-intent", verifyToken, async (req, res) => {
  if (!requireStripe(res)) return

  const order = calculateOrder(req.body.items)

  if (!order) {
    return res
      .status(400)
      .json({ error: "A valid cart with product quantities is required." })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100),

      currency: "zar",

      customer: await getOrCreateStripeCustomer(req),

      automatic_payment_methods: { enabled: true },

      metadata: { customerId: req.user.id, source: "reka-local" },
    })

    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      totalAmount: order.total,
    })
  } catch (error) {
    return res.status(502).json({
      error: error.message || "Unable to initialize the Stripe payment.",
    })
  }
})

app.get(
  "/api/payments/intents/:paymentIntentId",
  verifyToken,
  async (req, res) => {
    if (!requireStripe(res)) return

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        req.params.paymentIntentId,
      )

      if (paymentIntent.metadata.customerId !== req.user.id) {
        return res
          .status(403)
          .json({ error: "You cannot access this payment." })
      }

      return res.json(paymentIntent)
    } catch (error) {
      return res
        .status(404)
        .json({ error: error.message || "Payment intent not found." })
    }
  },
)

app.post("/api/payments/checkout-sessions", verifyToken, async (req, res) => {
  if (!requireStripe(res)) return

  const order = calculateOrder(req.body.items)

  if (!order)
    return res
      .status(400)
      .json({ error: "A valid cart with product quantities is required." })

  try {
    const origin = process.env.FRONTEND_URL || "http://localhost:8443"

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer: await getOrCreateStripeCustomer(req),

      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/?payment=cancelled`,

      line_items: [
        ...order.resolvedItems.map(({ product, quantity }) => ({
          quantity,

          price_data: {
            currency: "zar",

            unit_amount: Math.round(product.price * 100),

            product_data: {
              name: product.name,
              description: product.description || undefined,
            },
          },
        })),

        {
          quantity: 1,

          price_data: {
            currency: "zar",

            unit_amount: 2500,

            product_data: { name: "Delivery" },
          },
        },
      ],

      metadata: { customerId: req.user.id, source: "reka-local" },
    })

    return res.status(201).json({ id: session.id, url: session.url })
  } catch (error) {
    return res.status(502).json({
      error: error.message || "Unable to create Stripe Checkout session.",
    })
  }
})

app.post(
  "/api/payments/products",
  verifyToken,
  requireVendor,
  async (req, res) => {
    if (!requireStripe(res)) return

    const { name, description } = req.body

    if (!name)
      return res.status(400).json({ error: "A product name is required." })

    try {
      return res.status(201).json(
        await stripe.products.create({
          name,
          description,
          metadata: { vendorId: req.user.vendorId || "" },
        }),
      )
    } catch (error) {
      return res
        .status(502)
        .json({ error: error.message || "Unable to create Stripe product." })
    }
  },
)

app.post(
  "/api/payments/prices",
  verifyToken,
  requireVendor,
  async (req, res) => {
    if (!requireStripe(res)) return

    const { product, unitAmount, recurring } = req.body

    if (!product || !Number.isInteger(unitAmount) || unitAmount < 1) {
      return res.status(400).json({
        error: "product and an integer unitAmount in cents are required.",
      })
    }

    try {
      return res.status(201).json(
        await stripe.prices.create({
          product,

          currency: "zar",

          unit_amount: unitAmount,

          ...(recurring ? { recurring: { interval: recurring.interval } } : {}),
        }),
      )
    } catch (error) {
      return res
        .status(502)
        .json({ error: error.message || "Unable to create Stripe price." })
    }
  },
)

app.post("/api/payments/subscriptions", verifyToken, async (req, res) => {
  if (!requireStripe(res)) return

  if (!req.body.price)
    return res.status(400).json({ error: "A Stripe price ID is required." })

  try {
    const subscription = await stripe.subscriptions.create({
      customer: await getOrCreateStripeCustomer(req),

      items: [{ price: req.body.price }],

      payment_behavior: "default_incomplete",

      payment_settings: { save_default_payment_method: "on_subscription" },

      expand: ["latest_invoice.confirmation_secret"],
    })

    return res.status(201).json(subscription)
  } catch (error) {
    return res
      .status(502)
      .json({ error: error.message || "Unable to create Stripe subscription." })
  }
})

app.post("/api/payments/refunds", verifyToken, async (req, res) => {
  if (!requireStripe(res)) return

  const { paymentIntentId } = req.body

  const ownedOrder = orders.find(
    (order) =>
      order.customerId === req.user.id &&
      order.paymentIntentId === paymentIntentId,
  )

  if (!paymentIntentId || !ownedOrder)
    return res.status(403).json({ error: "You cannot refund this payment." })

  try {
    return res
      .status(201)
      .json(await stripe.refunds.create({ payment_intent: paymentIntentId }))
  } catch (error) {
    return res
      .status(502)
      .json({ error: error.message || "Unable to create Stripe refund." })
  }
})

app.get("/api/orders", verifyToken, (req, res) => {
  const userOrders = orders.filter((o) => o.customerId === req.user.id)

  return res.json({
    data: userOrders,
    meta: {
      total: userOrders.length,
      page: 1,
      pageSize: userOrders.length,
      totalPages: 1,
    },
  })
})

async function createOrder(req, res) {
  const { items, deliveryAddress, paymentMethod, notes, paymentIntentId } =
    req.body

  const calculatedOrder = calculateOrder(items)

  if (!calculatedOrder)
    return res
      .status(400)
      .json({ error: "A valid cart with product quantities is required." })

  if (paymentMethod === "Stripe") {
    if (!stripe || !paymentIntentId) {
      return res
        .status(400)
        .json({ error: "A confirmed Stripe payment is required." })
    }

    try {
      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId)

      if (
        paymentIntent.status !== "succeeded" ||
        paymentIntent.amount !== Math.round(calculatedOrder.total * 100) ||
        paymentIntent.currency !== "zar" ||
        paymentIntent.metadata.customerId !== req.user.id
      ) {
        return res
          .status(400)
          .json({ error: "The Stripe payment does not match this order." })
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message || "Unable to verify the Stripe payment.",
      })
    }
  }

  const vendorId = items[0]?.productId
    ? Object.keys(SA_PRODUCTS).find((vid) =>
        SA_PRODUCTS[vid].some((p) => p.id === items[0].productId),
      ) || "vendor-mama-thandi"
    : "vendor-mama-thandi"

  const vendor = SA_VENDORS.find((v) => v.id === vendorId)

  const vendorLocation = {
    latitude: vendor?.latitude || -25.7479,

    longitude: vendor?.longitude || 28.2293,
  }

  const order = {
    id: `order-${Date.now()}`,

    customerId: req.user.id,

    customerName: getCurrentUser(req)?.name || req.user.email,

    vendorId,

    vendorName: vendor?.businessName || "Local Vendor",

    status: "pending",

    totalAmount: calculatedOrder.total,

    paymentMethod: paymentMethod || "Cash on delivery",

    deliveryAddress: deliveryAddress || "",

    notes: notes || null,

    paymentIntentId: paymentIntentId || null,

    receipt: { status: "pending" },

    tracking: {
      vendor: vendorLocation,

      // Store coordinates for a delivery area, not a customer's exact street address.

      customer: {
        latitude: vendorLocation.latitude - 0.012,

        longitude: vendorLocation.longitude + 0.015,
      },
    },

    items: calculatedOrder.resolvedItems.map(({ product, quantity }, idx) => {
      return {
        id: `item-${Date.now()}-${idx}`,

        orderId: `order-${Date.now()}`,

        productId: product.id,

        productName: product?.name || "Item",

        quantity,

        price: product.price,
      }
    }),

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  }

  orders.push(order)

  const customer = getCurrentUser(req)

  try {
    order.receipt = await sendOrderReceipt(order, customer.email)
  } catch (error) {
    console.error(`Receipt email failed for ${order.id}:`, error)

    order.receipt = { status: "failed" }
  }

  return res.status(201).json(order)
}

app.post("/api/orders", verifyToken, createOrder)

app.post("/api/orders/checkout", verifyToken, createOrder)

app.get("/api/orders/mine", verifyToken, (req, res) => {
  const userOrders = orders.filter((order) => order.customerId === req.user.id)

  return res.json({
    data: userOrders,
    meta: {
      total: userOrders.length,
      page: 1,
      pageSize: userOrders.length,
      totalPages: 1,
    },
  })
})

app.get("/api/orders/vendor", verifyToken, requireVendor, (req, res) => {
  const vendorOrders = orders.filter(
    (order) => order.vendorId === req.user.vendorId,
  )

  return res.json({
    data: vendorOrders,
    meta: {
      total: vendorOrders.length,
      page: 1,
      pageSize: vendorOrders.length,
      totalPages: 1,
    },
  })
})

app.get("/api/orders/:id", verifyToken, (req, res) => {
  const order = orders.find((candidate) => candidate.id === req.params.id)

  if (!order) return res.status(404).json({ error: "Order not found" })

  if (
    order.customerId !== req.user.id &&
    req.user.vendorId !== order.vendorId
  ) {
    return res.status(403).json({ error: "You cannot view this order." })
  }

  return res.json(order)
})

app.patch("/api/orders/:id/status", verifyToken, requireVendor, (req, res) => {
  const order = orders.find((candidate) => candidate.id === req.params.id)

  const validStatuses = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "out_for_delivery",
    "completed",
    "cancelled",
  ]

  if (!order) return res.status(404).json({ error: "Order not found" })

  if (req.user.vendorId !== order.vendorId)
    return res
      .status(403)
      .json({ error: "You can only update your own orders." })

  if (!validStatuses.includes(req.body.status))
    return res.status(400).json({ error: "A valid order status is required." })

  order.status = req.body.status

  order.updatedAt = new Date().toISOString()

  return res.json(order)
})

app.post("/api/orders/:id/resend-receipt", verifyToken, async (req, res) => {
  const order = orders.find((candidate) => candidate.id === req.params.id)

  if (!order) return res.status(404).json({ error: "Order not found" })

  if (order.customerId !== req.user.id)
    return res
      .status(403)
      .json({ error: "You can only resend your own receipt." })

  const customer = getCurrentUser(req)

  try {
    order.receipt = await sendOrderReceipt(order, customer.email)

    if (order.receipt.status !== "sent") {
      return res
        .status(503)
        .json({ error: "Email receipts are not configured yet." })
    }

    return res.json({ receipt: order.receipt })
  } catch (error) {
    console.error(`Receipt email resend failed for ${order.id}:`, error)

    order.receipt = { status: "failed" }

    return res.status(502).json({ error: "Unable to send the receipt email." })
  }
})

app.get("/api/orders/:id/tracking", verifyToken, (req, res) => {
  const order = orders.find((candidate) => candidate.id === req.params.id)

  if (!order) return res.status(404).json({ error: "Order not found" })

  if (
    order.customerId !== req.user.id &&
    req.user.vendorId !== order.vendorId
  ) {
    return res
      .status(403)
      .json({ error: "You cannot view this order's tracking data." })
  }

  return res.json({
    orderId: order.id,
    status: order.status,
    tracking: order.tracking,
    updatedAt: order.updatedAt,
  })
})

app.patch(
  "/api/orders/:id/tracking",
  verifyToken,
  requireVendor,
  (req, res) => {
    const order = orders.find((candidate) => candidate.id === req.params.id)

    if (!order) return res.status(404).json({ error: "Order not found" })

    if (req.user.vendorId !== order.vendorId) {
      return res
        .status(403)
        .json({ error: "You can only update tracking for your own orders." })
    }

    const { latitude, longitude } = req.body

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res
        .status(400)
        .json({ error: "Valid latitude and longitude values are required." })
    }

    order.tracking = {
      ...(order.tracking || {}),

      driver: { latitude, longitude, updatedAt: new Date().toISOString() },
    }

    order.updatedAt = new Date().toISOString()

    return res.json({
      orderId: order.id,
      tracking: order.tracking,
      updatedAt: order.updatedAt,
    })
  },
)

// ── VENDOR DASHBOARD ────────────────────────────────────────────────────────

function getVendorDashboardStats(vendorId) {
  const vendorOrders = orders.filter((order) => order.vendorId === vendorId)

  return {
    totalRevenue: vendorOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    ),

    totalOrders: vendorOrders.length,

    activeProducts: (SA_PRODUCTS[vendorId] || []).length,

    averageRating:
      SA_VENDORS.find((vendor) => vendor.id === vendorId)?.rating || 0,

    completedOrders: vendorOrders.filter(
      (order) => order.status === "completed",
    ).length,

    pendingOrders: vendorOrders.filter((order) => order.status === "pending")
      .length,

    returningCustomers: new Set(vendorOrders.map((order) => order.customerId))
      .size,

    topProducts: (SA_PRODUCTS[vendorId] || [])
      .slice(0, 3)
      .map((product) => ({ label: product.name, value: product.stock || 0 })),

    salesTrend: [],

    recentOrders: vendorOrders.slice(-5),
  }
}

function requireVendorId(req, res, next) {
  const vendorId =
    req.user.vendorId ||
    (req.user.userType === "vendor" ? "vendor-mama-thandi" : null)

  if (!vendorId)
    return res.status(403).json({ error: "A vendor account is required." })

  req.vendorId = vendorId

  return next()
}

app.get("/api/dashboard/stats", verifyToken, requireVendorId, (req, res) => {
  return res.json(getVendorDashboardStats(req.vendorId))
})

app.get(
  "/api/dashboard/analytics",
  verifyToken,
  requireVendorId,
  (req, res) => {
    return res.json(getVendorDashboardStats(req.vendorId))
  },
)

app.get("/api/dashboard/profile", verifyToken, (req, res) => {
  const user = getCurrentUser(req)

  const vendor = SA_VENDORS.find(
    (candidate) => candidate.id === (req.user.vendorId || "vendor-mama-thandi"),
  )

  return res.json({
    id: user.id,

    email: user.email,

    phone: user.phone || "",

    savedAddresses: [],

    businessName: vendor?.businessName || user.name,

    category: vendor?.category || "",

    description: vendor?.description || "",

    hours: vendor?.hours || "",

    location: vendor?.location || "",

    notificationsEmail: true,

    notificationsSms: false,

    paymentDetails: "",
  })
})

app.get("/api/vendor/dashboard", verifyToken, (req, res) => {
  const vendorOrders = orders.filter((o) => o.vendorId === req.user.vendorId)

  const totalRevenue = vendorOrders.reduce((sum, o) => sum + o.totalAmount, 0)

  return res.json({
    totalRevenue,

    totalOrders: vendorOrders.length,

    activeProducts: 4,

    averageRating: 4.8,

    completedOrders: vendorOrders.filter((o) => o.status === "completed")
      .length,

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
  })
})

app.get("/api/vendor/orders", verifyToken, (req, res) => {
  const { status } = req.query

  let result = orders.filter(
    (o) => o.vendorId === (req.user.vendorId || "vendor-mama-thandi"),
  )

  if (status) result = result.filter((o) => o.status === status)

  return res.json({ orders: result })
})

app.patch("/api/vendor/orders/:id", verifyToken, (req, res) => {
  const order = orders.find((o) => o.id === req.params.id)

  if (!order) return res.status(404).json({ error: "Order not found" })

  order.status = req.body.status || order.status

  order.updatedAt = new Date().toISOString()

  return res.json({ order })
})

app.get("/api/vendor/products", verifyToken, (_req, res) => {
  // Return the logged-in vendor's products (defaulting to mama thandi for demo)

  const products = SA_PRODUCTS["vendor-mama-thandi"] || []

  return res.json({ products })
})

// ── REVIEWS ─────────────────────────────────────────────────────────────────

app.get("/api/vendors/:id/reviews", (req, res) => {
  // Mock reviews per vendor

  const reviewMap = {
    "vendor-mama-thandi": [
      {
        id: "r1",
        vendorId: "vendor-mama-thandi",
        customerId: "u1",
        customerName: "Ayanda M.",
        rating: 5,
        comment: "Hot, fresh, and perfectly seasoned!",
        createdAt: "2026-08-18T11:00:00Z",
      },

      {
        id: "r2",
        vendorId: "vendor-mama-thandi",
        customerId: "u2",
        customerName: "Kamohelo D.",
        rating: 4,
        comment: "Loved the mince filling. Will order again!",
        createdAt: "2026-08-16T14:30:00Z",
      },
    ],

    "vendor-bra-zakes": [
      {
        id: "r3",
        vendorId: "vendor-bra-zakes",
        customerId: "u3",
        customerName: "Sifiso N.",
        rating: 5,
        comment: "Best boerewors roll in Soweto!",
        createdAt: "2026-08-20T12:00:00Z",
      },
    ],

    "vendor-durban-bunny": [
      {
        id: "r4",
        vendorId: "vendor-durban-bunny",
        customerId: "u4",
        customerName: "Priya S.",
        rating: 5,
        comment: "Authentic Durban bunny – just perfect!",
        createdAt: "2026-08-21T10:30:00Z",
      },

      {
        id: "r5",
        vendorId: "vendor-durban-bunny",
        customerId: "u5",
        customerName: "Ravi P.",
        rating: 5,
        comment: "Transported straight back to Grey Street.",
        createdAt: "2026-08-19T14:00:00Z",
      },
    ],
  }

  const reviews = reviewMap[req.params.id] || []

  return res.json({ reviews })
})

// ── 404 catch-all ────────────────────────────────────────────────────────────

app.use(express.static(frontendBuild))

app.get(/^(?!\/(?:api|health)(?:\/|$)).*/, (_req, res) => {
  res.sendFile(path.join(frontendBuild, "index.html"))
})

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` })
})

// ── Global error handler ─────────────────────────────────────────────────────

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err)

  res.status(500).json({ error: "Internal server error" })
})

module.exports = app
