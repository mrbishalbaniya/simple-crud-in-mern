const express = require("express");
const router = express.Router();
const { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/product.controller");

// Grouping routes by path
router.route("/")
    .get(getProducts)
    .post(createProduct);

router.route("/:id")
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;