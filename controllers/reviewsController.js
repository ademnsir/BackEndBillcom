const Review = require('../models/review'); // Assuming you have a Review model

// Add a new review
exports.addReview = async (req, res) => {
    try {
        const { name, comment, priceRating, valueRating, qualityRating, user, product } = req.body;

        // Create new review object
        const review = new Review({
            name,
            comment,
            priceRating,
            valueRating,
            qualityRating,
            user,
            product,
            imgreview1: req.files['imgreview1'] ? req.files['imgreview1'][0].filename : null,
            imgreview2: req.files['imgreview2'] ? req.files['imgreview2'][0].filename : null,
        });

        // Save the review to the database
        await review.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};


// Get reviews for a specific product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ 'product.id': productId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Get a specific review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { name, comment, priceRating, valueRating, qualityRating, date } = req.body;

    // Handle file uploads if provided
    const imgreview1 = req.files['imgreview1'] ? req.files['imgreview1'][0].originalname.toLowerCase() : null;
    const imgreview2 = req.files['imgreview2'] ? req.files['imgreview2'][0].originalname.toLowerCase() : null;

    const updatedReview = await Review.findByIdAndUpdate(reviewId, {
      name,
      comment,
      priceRating,
      valueRating,
      qualityRating,
      date,
      imgreview1: imgreview1 || req.body.imgreview1, // Preserve original if no new image
      imgreview2: imgreview2 || req.body.imgreview2, // Preserve original if no new image
    }, { new: true });

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};
