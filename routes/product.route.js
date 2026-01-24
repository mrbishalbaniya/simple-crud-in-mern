const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware"); // Import the middleware
const { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/product.controller");

// Everyone can view products, but only logged-in users can modify
router.route("/")
    .get(getProducts)
    .post(protect, createProduct); // Added protect

router.route("/:id")
    .get(getProduct)
    .put(protect, updateProduct)   // Added protect
    .delete(protect, deleteProduct); // Added protect

module.exports = router;