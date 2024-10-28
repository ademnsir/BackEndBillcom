const Review = require('../models/review');
const Product = require('../models/product');

exports.addReview = async (req, res) => {
  try {
    const { name, comment, priceRating, valueRating, qualityRating } = req.body;

    const user = req.body.user; // Assuming you pass user details from the frontend
    const productId = req.body.product.id; // Assuming you pass the product ID from the frontend

    if (!user || !productId) {
      return res.status(400).json({ message: 'User or product ID is missing.' });
    }

    const review = new Review({
      name,
      comment,
      priceRating,
      valueRating,
      qualityRating,
      product: productId,
      user: {
        idUser: user.idUser,
        nom: user.nom,
        profilePicture: user.profilePicture,
      },
    });

    // Handle image upload if provided
    if (req.files && req.files.imgreview1) {
      review.imgreview1 = req.files.imgreview1[0].filename; // Assuming image files are passed as 'imgreview1'
    }
    if (req.files && req.files.imgreview2) {
      review.imgreview2 = req.files.imgreview2[0].filename; // Assuming image files are passed as 'imgreview2'
    }

    await review.save();
    
    // Add the review to the product
    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id },
    });

    res.status(201).json({ message: 'Review added successfully!', review });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
};
