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

// Correction ici : Utilisation du bon chemin pour les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});

// Configuration de multer pour les uploads d'images dans public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads')); // Sauvegarde dans public/uploads à la racine
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Sauvegarde avec le nom original
  }
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
