
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Le fichier multer que vous avez fourni
const reviewController = require('../controllers/reviewsController');

// Route pour ajouter un avis avec images
router.post('/add', upload.fields([
    { name: 'imgreview1', maxCount: 1 },
    { name: 'imgreview2', maxCount: 1 }
]), reviewController.addReview);

// Les autres routes de gestion des avis
router.get('/:productId', reviewController.getReviewsByProduct);
router.get('/:reviewId', reviewController.getReviewById);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
