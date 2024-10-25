const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// Configuration Multer pour le stockage des fichiers dans le dossier 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Renommer le fichier avec un timestamp pour éviter les conflits
  }
});

// Filtrer les types de fichiers (seulement les images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
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

// Route pour obtenir tous les produits
router.get('/products', productController.getAllProducts);


// Route pour ajouter un produit avec une image
// Utilise `upload.single('image')` pour gérer un fichier avec le nom de champ 'image'
router.post('/products', upload.fields([
    { name: 'image', maxCount: 1 }, // Upload the main product image
    { name: 'logoUrl', maxCount: 1 } // Upload the logo
  ]), productController.addProduct);
  




// Route pour obtenir un produit par ID
router.get('/products/:id', productController.getProductById);

// Route pour mettre à jour un produit par ID
router.put('/products/:id', upload.single('image'), productController.updateProduct);


// Route pour supprimer un produit par ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
