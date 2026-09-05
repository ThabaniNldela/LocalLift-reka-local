require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
    console.log(`🚀 Reka Local API running on ${HOST}:${PORT}`);
    console.log(`📡 CORS enabled for: ${process.env.FRONTEND_URL || "http://localhost:8443"}`);
});
