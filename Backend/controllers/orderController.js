const { orders, products, vendors } = require("../data/mockData");

const allowedStatuses = [
    "PENDING",
    "ACCEPTED",
    "PREPARING",
    "READY",
    "COMPLETED",
    "CANCELLED"
];

// GET /api/orders
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        let userOrders;

        if (userRole === "VENDOR") {
            userOrders = orders.filter(
                order => order.vendorId === userId
            );
        } else {
            userOrders = orders.filter(
                order => order.customerId === userId
            );
        }

        res.status(200).json({
            success: true,
            count: userOrders.length,
            orders: userOrders
        });

    } catch (error) {
        console.error("Get orders error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve orders."
        });
    }
};


// POST /api/orders
const createOrder = async (req, res) => {
    try {
        const customerId = req.user.id;

        const { vendorId, items } = req.body;

        // Basic validation
        if (!vendorId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Vendor ID and at least one order item are required."
            });
        }

        const vendor = vendors.find(
            vendor => vendor.id === Number(vendorId)
        );

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found."
            });
        }

        let orderItems = [];
        let total = 0;

        for (const item of items) {

            const product = products.find(
                product => product.id === Number(item.productId)
            );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product ${item.productId} not found.`
                });
            }

            if (product.vendorId !== Number(vendorId)) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${product.name} does not belong to this vendor.`
                });
            }

            if (!product.available) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} is currently unavailable.`
                });
            }

            const quantity = Number(item.quantity);

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity must be a positive whole number."
                });
            }

            const itemTotal = product.price * quantity;

            total += itemTotal;

            orderItems.push({
                id: Date.now() + orderItems.length,
                productId: product.id,
                productName: product.name,
                quantity,
                price: product.price,
                subtotal: itemTotal
            });
        }

        const newOrder = {
            id: orders.length + 1,
            customerId,
            vendorId: Number(vendorId),
            vendorName: vendor.businessName,
            status: "PENDING",
            items: orderItems,
            total,
            createdAt: new Date().toISOString()
        };

        orders.push(newOrder);

        res.status(201).json({
            success: true,
            message: "Order created successfully.",
            order: newOrder
        });

    } catch (error) {
        console.error("Create order error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create order."
        });
    }
};


// GET /api/orders/:id
const getOrderById = async (req, res) => {
    try {
        const orderId = Number(req.params.id);
        const userId = req.user.id;
        const userRole = req.user.role;

        const order = orders.find(
            order => order.id === orderId
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        // Customers can only view their own orders
        if (
            userRole === "CUSTOMER" &&
            order.customerId !== userId
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view this order."
            });
        }

        // Vendors can only view their own orders
        if (
            userRole === "VENDOR" &&
            order.vendorId !== userId
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view this order."
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get order error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve order."
        });
    }
};


// PATCH /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    try {
        const orderId = Number(req.params.id);
        const userId = req.user.id;

        const { status } = req.body;

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status."
            });
        }

        const order = orders.find(
            order => order.id === orderId
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        // Only the vendor can update the order status
        if (order.vendorId !== userId) {
            return res.status(403).json({
                success: false,
                message: "Only the vendor can update this order."
            });
        }

        order.status = status;

        res.status(200).json({
            success: true,
            message: "Order status updated successfully.",
            order
        });

    } catch (error) {
        console.error("Update order status error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update order status."
        });
    }
};


module.exports = {
    getOrders,
    createOrder,
    getOrderById,
    updateOrderStatus
};