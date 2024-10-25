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
    cb(new Error('Seules les images sont autorisées !'), false);
  }
};

// Initialiser Multer pour gérer plusieurs fichiers (image du produit et logo)
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5 MB
  fileFilter: fileFilter
});

// Utilisation de `upload.fields` pour permettre plusieurs fichiers (image et logo)
router.post('/products', upload.fields([{ name: 'image' }, { name: 'logoUrl' }]), productController.addProduct);

module.exports = router;
