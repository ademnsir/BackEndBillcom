const multer = require('multer');
const path = require('path');

// Chemin absolu vers le dossier "uploads" sur le bureau
const uploadPath = path.join('C:/Users/adem/Desktop/uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);  // Enregistre les fichiers dans le dossier 'uploads' sur le bureau
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomme le fichier avec un timestamp
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB de limite
  fileFilter: fileFilter
});

module.exports = upload;
