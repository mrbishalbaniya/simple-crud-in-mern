require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route");
const authRoute = require("./routes/auth.route");
const logger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/error.middleware"); // Import this!

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger); 
app.use(express.static('public'));

// Routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => res.send("Welcome to the DashStock API"));

// Error Handler must be AFTER routes
app.use(errorHandler); 

const startServer = async () => {
    try {
        const dbURI = process.env.MONGO_URI;
        if (!dbURI) throw new Error("MONGO_URI missing in .env");

        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB Atlas");

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error("Connection error:", err.message);
        process.exit(1);
    }
};

startServer();