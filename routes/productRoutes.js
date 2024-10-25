const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route pour obtenir tous les produits
router.get('/products', productController.getAllProducts);

// Route pour ajouter un produit
router.post('/products', productController.addProduct);

// Route pour obtenir un produit par ID
router.get('/products/:id', productController.getProductById);

// Route pour mettre à jour un produit par ID
router.put('/products/:id', productController.updateProduct);

// Route pour supprimer un produit par ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
