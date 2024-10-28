const express = require('express');
const router = express.Router();
const multer = require('multer');
const reviewController = require('../controllers/reviewController');

// Multer configuration for handling image uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

// Route to handle review submission with image upload
router.post('/reviews/add', upload.fields([
    { name: 'imgreview1', maxCount: 1 },
    { name: 'imgreview2', maxCount: 1 }
]), reviewController.addReview);

module.exports = router;
