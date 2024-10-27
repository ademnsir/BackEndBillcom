const multer = require('multer');
const path = require('path');
const os = require('os');

// Utilisez le chemin vers votre bureau pour le stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Le chemin vers votre dossier 'uploads' sur le bureau
    const desktopUploadsDir = path.join(os.homedir(), 'Desktop', 'uploads');
    cb(null, desktopUploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer avec un timestamp pour éviter les conflits
  }
});

// Filtrer les types de fichiers (images uniquement)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées !'));
  }
};

// Initialiser Multer avec la configuration de stockage et le filtre de fichier
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB
  fileFilter: fileFilter
});

module.exports = upload;
