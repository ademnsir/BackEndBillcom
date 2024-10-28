const express = require('express');
const router = express.Router();
const { addReview } = require('../controllers/reviewsController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // For handling image uploads

// Route to add a review for a product
router.post('/reviews/add', upload.fields([{ name: 'imgreview1' }, { name: 'imgreview2' }]), addReview);

module.exports = router;
