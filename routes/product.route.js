const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware"); // Import the guard

const { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/product.controller");

// Public routes (Everyone can see)
router.get("/", getProducts);
router.get("/:id", getProduct);

// Protected routes (Only logged-in users can modify)
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;