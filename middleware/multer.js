const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Chemin absolu vers le dossier uploads sur le bureau
const desktopUploadsDir = 'C:/Users/adem/Desktop/uploads'; // Remplacez par le bon chemin

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(desktopUploadsDir)) {
  fs.mkdirSync(desktopUploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, desktopUploadsDir); // Utiliser le chemin correct
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
