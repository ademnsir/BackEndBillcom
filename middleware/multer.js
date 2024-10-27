const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Chemin absolu vers le dossier "uploads" sur le bureau
const uploadPath = path.join('C:/Users/adem/Desktop/uploads');

// Vérifier si le répertoire existe, sinon le créer
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // Crée les répertoires si nécessaire
}

// Configuration de stockage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);  // Enregistre les fichiers dans le dossier 'uploads' sur le bureau
  },
  filename: (req, file, cb) => {
    // Renommer le fichier avec un timestamp pour éviter les conflits
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtrer les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);  // Autoriser le fichier
  } else {
    cb(new Error('Seules les images sont autorisées !'));  // Rejeter le fichier non autorisé
  }
};

// Initialiser multer avec la configuration de stockage et le filtre
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // Limite de 1MB
  fileFilter: fileFilter
});

module.exports = upload;
