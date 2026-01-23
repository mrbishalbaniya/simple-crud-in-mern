require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route");
const logger = require("./middleware/logger.middleware");
const authRoute = require("./routes/auth.route");


const app = express();

// Middleware
app.use(express.json());
app.use(logger); 
app.use(express.static('public'));

// Routes  
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log("Error:", err));

app.get("/", (req, res) => res.send("Welcome to the API"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));