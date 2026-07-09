const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});