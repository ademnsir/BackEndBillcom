const Review = require('../models/review');

// Add a new review
exports.addReview = async (req, res) => {
    try {
        const { name, comment, priceRating, valueRating, qualityRating, user, product } = req.body;
        console.log(req.body); // Pour vérifier que les données sont bien reçues

        // Créer un nouvel avis avec les données fournies
        const review = new Review({
            name,
            comment,
            priceRating,
            valueRating,
            qualityRating,
            user,
            product,
        });

        await review.save();
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error("Error adding review: ", error);
        res.status(500).json({ message: 'Error adding review', error });
    }
};
