const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Chemin relatif vers le dossier "public/uploads"
const uploadPath = path.join('public', 'uploads');

// Vérifier si le répertoire existe, sinon le créer
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // Crée les répertoires si nécessaire
}

// Configuration de stockage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);  // Enregistre les fichiers dans le dossier 'public/uploads'
  },
  filename: (req, file, cb) => {
    // Utiliser le nom d'origine du fichier
    cb(null, file.originalname);
  }
});

// Filtrer les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;  // Types d'images autorisées
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());  // Vérifie l'extension du fichier
  const mimeType = allowedTypes.test(file.mimetype);  // Vérifie le type MIME du fichier

  if (extName && mimeType) {
    cb(null, true);  // Autoriser le fichier
  } else {
    cb(new Error('Seules les images au format JPEG, JPG, PNG, et GIF sont autorisées !'));  // Rejeter le fichier non autorisé
  }
};

// Initialiser multer avec la configuration de stockage et le filtre
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },  // Limite de 1MB par fichier
  fileFilter: fileFilter
});

// Exporter l'instance d'upload multer
module.exports = upload;
