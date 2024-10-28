const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const upload = require('../middleware/multer'); // Import Multer middleware for image uploads

// Route to add a review with optional image uploads
router.post('/reviews', upload.fields([
  { name: 'imgreview1', maxCount: 1 }, // First review image
  { name: 'imgreview2', maxCount: 1 }  // Second review image (optional)
]), reviewController.addReview);

// Other review routes
router.get('/reviews/product/:productId', reviewController.getReviewsByProduct); // Get reviews by product ID
router.get('/reviews/:reviewId', reviewController.getReviewById); // Get a specific review by ID

router.put('/reviews/:reviewId', upload.fields([ // Update review with optional image upload
  { name: 'imgreview1', maxCount: 1 },
  { name: 'imgreview2', maxCount: 1 }
]), reviewController.updateReview);

router.delete('/reviews/:reviewId', reviewController.deleteReview); // Delete a review by ID

module.exports = router;
