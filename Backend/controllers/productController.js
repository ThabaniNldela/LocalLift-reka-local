const { products, vendors } = require("../data/mockData");


// GET /api/products
const getProducts = async (req, res) => {
    try {
        const { vendorId } = req.query;

        let productList = products;

        if (vendorId) {
            productList = products.filter(
                product => product.vendorId === Number(vendorId)
            );
        }

        const productsWithVendors = productList.map(product => {
            const vendor = vendors.find(
                vendor => vendor.id === product.vendorId
            );

            return {
                ...product,
                vendor: vendor
                    ? {
                        id: vendor.id,
                        businessName: vendor.businessName
                    }
                    : null
            };
        });

        res.status(200).json({
            success: true,
            count: productsWithVendors.length,
            products: productsWithVendors
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve products."
        });
    }
};


// GET /api/products/:id
const getProductById = async (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        product => product.id === id
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found."
        });
    }

    const vendor = vendors.find(
        vendor => vendor.id === product.vendorId
    );

    res.status(200).json({
        success: true,
        product: {
            ...product,
            vendor: vendor || null
        }
    });
};


module.exports = {
    getProducts,
    getProductById
};