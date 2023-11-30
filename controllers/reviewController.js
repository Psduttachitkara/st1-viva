// controllers/reviewController.js
const Review = require("../models/review");

const reviewController = {
  createReview: async (req, res) => {
    try {
      const { content, rating, author } = req.body;
      const newReview = new Review({ content, rating, author });
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const skip = (page - 1) * pageSize;
      const reviews = await Review.find()
        .skip(skip)
        .limit(parseInt(pageSize))
        .exec();
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error getting all reviews:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getReviewById: async (req, res) => {
    try {
      const review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.status(200).json(review);
    } catch (error) {
      console.error("Error getting review by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateReview: async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.reviewId,
        req.body,
        { new: true }
      );
      if (!updatedReview) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.status(200).json(updatedReview);
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const deletedReview = await Review.findByIdAndDelete(req.params.reviewId);
      if (!deletedReview) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = reviewController;
