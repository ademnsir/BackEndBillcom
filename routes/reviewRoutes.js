const express = require('express');
const router = express.Router();
const multer = require('multer');
const reviewController = require('../controllers/reviewsController');

// Multer configuration for handling image uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Save to 'uploads' folder
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to filename
        }
    })
});

// Route to handle review submission with image uploads
router.post('/add', upload.fields([{ name: 'imgreview1', maxCount: 1 }, { name: 'imgreview2', maxCount: 1 }]), reviewController.addReview);


// Route to get reviews by product ID
router.get('/:productId', reviewController.getReviewsByProduct);

// Route to get a review by its ID
router.get('/:reviewId', reviewController.getReviewById);

// Route to update a review
router.put('/:reviewId',reviewController.updateReview);

// Route to delete a review
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
