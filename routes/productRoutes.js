const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/multer'); // Importer multer depuis middleware

// Route pour ajouter un produit avec une image
// Utilise `upload.fields()` pour gérer plusieurs fichiers avec les noms de champ 'image' et 'logoUrl'
router.post('/products', upload.fields([
  { name: 'image', maxCount: 1 },   // Image principale du produit
  { name: 'logoUrl', maxCount: 1 }  // Logo de la marque
]), productController.addProduct);

// Autres routes pour les produits
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

// Route pour mettre à jour un produit (gérer également l'image et le logo)
router.put('/products/:id', upload.fields([
  { name: 'image', maxCount: 1 },   // Image principale du produit
  { name: 'logoUrl', maxCount: 1 }  // Logo de la marque
]), productController.updateProduct);

// Route pour supprimer un produit
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
