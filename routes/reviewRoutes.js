// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Product CRUD routes
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

// Review CRUD routes
router.post("/:productId/reviews", productController.addReviewToProduct);
router.get("/:productId/reviews", productController.getAllReviewsForProduct);
router.put(
  "/:productId/reviews/:reviewId",
  productController.updateReviewInProduct
);
router.delete(
  "/:productId/reviews/:reviewId",
  productController.deleteReviewInProduct
);

module.exports = router;
