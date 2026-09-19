const getReviews = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Reviews endpoint is working"
    });
};

module.exports = {
    getReviews
};