// controllers/productController.js
const { Product, Review } = require("../models/product");

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, description, price, category } = req.body;
      const newProduct = new Product({ name, description, price, category });
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const skip = (page - 1) * pageSize;
      const products = await Product.find()
        .skip(skip)
        .limit(parseInt(pageSize))
        .exec();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error getting all products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Error getting product by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(
        req.params.productId
      );
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addReviewToProduct: async (req, res) => {
    try {
      const { content, rating, author } = req.body;
      const newReview = new Review({ content, rating, author });
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      product.reviews.push(newReview);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error adding review to product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllReviewsForProduct: async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const skip = (page - 1) * pageSize;
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const reviews = product.reviews.slice(skip, skip + parseInt(pageSize));
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error getting all reviews for product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateReviewInProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const reviewIndex = product.reviews.findIndex(
        (review) => review._id.toString() === req.params.reviewId
      );
      if (reviewIndex === -1) {
        return res.status(404).json({ error: "Review not found" });
      }
      Object.assign(product.reviews[reviewIndex], req.body);
      const savedProduct = await product.save();
      res.status(200).json(savedProduct);
    } catch (error) {
      console.error("Error updating review in product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteReviewInProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const reviewIndex = product.reviews.findIndex(
        (review) => review._id.toString() === req.params.reviewId
      );
      if (reviewIndex === -1) {
        return res.status(404).json({ error: "Review not found" });
      }
      product.reviews.splice(reviewIndex, 1);
      const savedProduct = await product.save();
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting review in product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = productController;
