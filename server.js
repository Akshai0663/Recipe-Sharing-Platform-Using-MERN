require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

// ✅ Middleware
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Enable CORS

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;  // ✅ Ensure you have MONGO_URI in .env file

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("Recipe Sharing API is Running...");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
