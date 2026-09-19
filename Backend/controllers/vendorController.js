const { vendors, products, reviews } = require("../data/mockData");


// GET /api/vendors
const getVendors = async (req, res) => {
    try {
        const vendorList = vendors.map(vendor => {
            const vendorProducts = products.filter(
                product => product.vendorId === vendor.id
            );

            const vendorReviews = reviews.filter(
                review => review.vendorId === vendor.id
            );

            const averageRating = vendorReviews.length
                ? vendorReviews.reduce((sum, review) => sum + review.rating, 0)
                  / vendorReviews.length
                : 0;

            return {
                ...vendor,
                productCount: vendorProducts.length,
                averageRating: Number(averageRating.toFixed(1))
            };
        });

        res.status(200).json({
            success: true,
            count: vendorList.length,
            vendors: vendorList
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve vendors."
        });
    }
};


// GET /api/vendors/:id
const getVendorById = async (req, res) => {
    const id = Number(req.params.id);

    const vendor = vendors.find(vendor => vendor.id === id);

    if (!vendor) {
        return res.status(404).json({
            success: false,
            message: "Vendor not found."
        });
    }

    const vendorProducts = products.filter(
        product => product.vendorId === id
    );

    const vendorReviews = reviews.filter(
        review => review.vendorId === id
    );

    res.status(200).json({
        success: true,
        vendor: {
            ...vendor,
            products: vendorProducts,
            reviews: vendorReviews
        }
    });
};


module.exports = {
    getVendors,
    getVendorById
};