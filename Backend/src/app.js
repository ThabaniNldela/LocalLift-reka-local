const express = require("express");
const cors = require("cors");
const authMiddleware = require("../middleware/authMiddleware");


const authRoutes = require("../routes/authRoutes");
const vendorRoutes = require("../routes/vendorRoutes");
const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");
const reviewRoutes = require("../routes/reviewRoutes");

const app = express();

// ================================
// Middleware
// ================================
app.use(cors());
app.use(express.json());

// ================================
// Health Check
// ================================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Reka Local API 🚀"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Reka Local API is healthy 🚀"
    });
});

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "You have accessed a protected route!",
        user: req.user
    });
});

// ================================
// API Routes
// ================================

app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// ================================
// 404 Handler
// ================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// ================================
// Export App
// ================================
module.exports = app;