const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// Configuration Multer pour le stockage des fichiers dans le dossier 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Spécifier le dossier de destination
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Renommer le fichier pour éviter les conflits
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtrer les types de fichiers (seulement les images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées !'), false); // Refuser les fichiers non-images
  }
};

// Initialiser Multer avec la configuration de stockage et le filtrage de fichiers
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5 MB pour les fichiers
  fileFilter: fileFilter
});

// Route pour ajouter un produit avec une image
// Utilise `upload.fields()` pour gérer plusieurs fichiers avec les noms de champ 'image' et 'logoUrl'
router.post('/products', upload.fields([
  { name: 'image', maxCount: 1 },   // Upload for main product image
  { name: 'logoUrl', maxCount: 1 }  // Upload for brand logo
]), productController.addProduct);

// Autres routes produits
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', upload.fields([
  { name: 'image', maxCount: 1 },   // Upload for main product image
  { name: 'logoUrl', maxCount: 1 }  // Upload for brand logo
]), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
