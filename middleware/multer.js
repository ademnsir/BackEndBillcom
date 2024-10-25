const multer = require('multer');
const path = require('path');

// Configuration Multer pour le stockage des fichiers dans le dossier 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec un timestamp pour éviter les conflits
  }
});

// Filtrer les types de fichiers
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); // Si le fichier n'est pas une image
  }
};

// Initialiser Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limite à 1MB
  fileFilter: fileFilter
});

module.exports = upload;
