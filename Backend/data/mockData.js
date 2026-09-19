// ========================================
// Reka Local - Hackathon MVP Mock Data
// ========================================

const users = [
    {
        id: 1,
        name: "Demo Customer",
        phone: "0712345678",
        email: "customer@rekalocal.co.za",
        role: "CUSTOMER"
    }
];

const vendors = [
    {
        id: 1,
        businessName: "Mama's Kota Spot",
        description: "Affordable homemade kotas and street food.",
        phone: "0721112233",
        address: "Soshanguve, Gauteng",
        latitude: -25.52,
        longitude: 28.10,
        isVerified: true
    },
    {
        id: 2,
        businessName: "Thabo's Fresh Produce",
        description: "Fresh fruit and vegetables at affordable prices.",
        phone: "0732223344",
        address: "Mamelodi, Gauteng",
        latitude: -25.73,
        longitude: 28.37,
        isVerified: true
    },
    {
        id: 3,
        businessName: "Lebo's Hair Studio",
        description: "Affordable braiding and hairstyling services.",
        phone: "0743334455",
        address: "Atteridgeville, Gauteng",
        latitude: -25.77,
        longitude: 27.93,
        isVerified: false
    }
];

const products = [
    {
        id: 1,
        vendorId: 1,
        name: "Classic Kota",
        description: "Kota with chips, polony, cheese and egg.",
        price: 35,
        available: true
    },
    {
        id: 2,
        vendorId: 1,
        name: "Chicken Kota",
        description: "Kota with chicken, chips, cheese and egg.",
        price: 45,
        available: true
    },
    {
        id: 3,
        vendorId: 2,
        name: "Fresh Vegetable Pack",
        description: "Mixed fresh vegetables.",
        price: 30,
        available: true
    },
    {
        id: 4,
        vendorId: 2,
        name: "Fruit Basket",
        description: "Assorted seasonal fresh fruit.",
        price: 50,
        available: true
    },
    {
        id: 5,
        vendorId: 3,
        name: "Braids",
        description: "Professional braiding service.",
        price: 250,
        available: true
    }
];

const orders = [];

const reviews = [
    {
        id: 1,
        userId: 1,
        vendorId: 1,
        rating: 5,
        comment: "Great food and friendly service!"
    }
];

module.exports = {
    users,
    vendors,
    products,
    orders,
    reviews
};