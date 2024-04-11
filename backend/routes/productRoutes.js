const express = require("express");
const router = express.Router();

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const { isAuthenticate, authorizeRoles } = require("../middleware/auth");


// Use isAuthenticatedUser middleware for authentication before calling getAllProducts
router.route("/products").get(isAuthenticate, getAllProducts);

// Routes for creating, updating, deleting, and getting product details
router.route("/product/new").post(isAuthenticate, authorizeRoles("Admin"), createProduct);
router.route("/product/:id").put(isAuthenticate, authorizeRoles("Admin"), updateProduct).delete(isAuthenticate, authorizeRoles("Admin"), deleteProduct).get(getProductDetails);
module.exports = router;
