const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8443",
  credentials: true
}));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Reka Local API 🚀",
        version: "1.0.0"
    });
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes placeholder
app.use("/api/vendors", (req, res) => {
    res.json({ message: "Vendors endpoint", data: [] });
});

app.use("/api/auth", (req, res) => {
    res.json({ message: "Auth endpoint" });
});

module.exports = app;
