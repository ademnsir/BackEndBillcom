const express = require('express');
const cors = require('cors'); 
const connectDB = require("./config/db");
const multer = require('multer'); // Pour gérer les uploads de fichiers
const path = require('path');

const app = express();
const port = 3001;
const AuthRoute = require("./routes/auth");
const productRoutes = require("./routes/productRoutes"); // Importer les routes des produits

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Le serveur est en marche');
});

// Utilisation des routes pour l'authentification
app.use("/auth", AuthRoute);

// Utilisation des routes pour les produits
app.use("/tp/api", productRoutes);  // Définir un préfixe commun pour toutes les routes produits

app.use('/uploads', express.static('uploads'));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});

// Configuration de multer pour les uploads d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Chemin du dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier avec un timestamp
  },
});

const upload = multer({ storage });

// Route pour télécharger des images de produits
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({ fileName: req.file.filename, message: 'Image uploadée avec succès' });
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de l\'upload de l\'image' });
  }
});

// Servir les fichiers statiques pour les images
app.use('/uploads', express.static('uploads'));
