const express = require("express");

const {
    getVendors
} = require("../controllers/vendorController");

const router = express.Router();

router.get("/", getVendors);

module.exports = router;