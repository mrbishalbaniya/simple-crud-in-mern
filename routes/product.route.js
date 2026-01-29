const express = require("express");
const router = express.Router();

// Import the controller functions
const { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/product.controller");

// Route for getting all products and creating a new product
router.route("/")
    .get(getProducts)
    .post(createProduct);

// Route for operations on a specific product by ID
router.route("/:id")
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;