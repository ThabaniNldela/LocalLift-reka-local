const express = require("express");

const {
    getOrders,
    createOrder,
    getOrderById,
    updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All order routes require authentication
router.get("/", authMiddleware, getOrders);

router.post("/", authMiddleware, createOrder);

router.get("/:id", authMiddleware, getOrderById);

router.patch(
    "/:id/status",
    authMiddleware,
    updateOrderStatus
);

module.exports = router;