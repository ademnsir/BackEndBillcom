const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/multer'); // Importez le middleware multer

// Route pour ajouter un produit avec une image et un logo
router.post('/products', upload.fields([
  { name: 'image', maxCount: 1 },   // Image principale du produit
  { name: 'logoUrl', maxCount: 1 }  // Logo de la marque
]), productController.addProduct);

// Autres routes produits
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', upload.fields([
  { name: 'image', maxCount: 1 },   // Image principale du produit
  { name: 'logoUrl', maxCount: 1 }  // Logo de la marque
]), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
