// ========================================
// Authentication Controller
// ========================================

const bcrypt = require("bcrypt");
const prisma = require("../models/prisma");
const { generateToken } = require("../utils/auth");

// ========================================
// REGISTER
// POST /api/auth/register
// ========================================
const register = async (req, res) => {
    try {
        const { name, phone, email, password, role } = req.body;

        // 1. Check required fields
        if (!name || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, phone and password are required."
            });
        }

        // 2. Only allow CUSTOMER or VENDOR
        const userRole = role || "CUSTOMER";

        if (!["CUSTOMER", "VENDOR"].includes(userRole)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role."
            });
        }

        // 3. Check if phone already exists
        const existingPhone = await prisma.user.findUnique({
            where: {
                phone
            }
        });

        if (existingPhone) {
            return res.status(409).json({
                success: false,
                message: "A user with this phone number already exists."
            });
        }

        // 4. Check if email already exists
        if (email) {
            const existingEmail = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (existingEmail) {
                return res.status(409).json({
                    success: false,
                    message: "A user with this email already exists."
                });
            }
        }

        // 5. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6. Create the user
        const user = await prisma.user.create({
            data: {
                name,
                phone,
                email: email || null,
                password: hashedPassword,
                role: userRole
            }
        });

        // 7. Generate JWT
        const token = generateToken(user);

        // 8. Don't send the password back
        res.status(201).json({
            success: true,
            message: "Registration successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during registration."
        });
    }
};


// ========================================
// LOGIN
// POST /api/auth/login
// ========================================
const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // 1. Check required fields
        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone and password are required."
            });
        }

        // 2. Find user
        const user = await prisma.user.findUnique({
            where: {
                phone
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone number or password."
            });
        }

        // 3. Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone number or password."
            });
        }

        // 4. Generate JWT
        const token = generateToken(user);

        // 5. Return user information
        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during login."
        });
    }
};


// ========================================
// GET CURRENT USER
// GET /api/auth/me
// ========================================
const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error("Get user error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while retrieving user."
        });
    }
};


module.exports = {
    register,
    login,
    getMe
};