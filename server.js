const express = require('express');
const cors = require('cors'); 
const connectDB = require("./config/db");
const path = require('path');
const fs = require('fs');

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

// Chemin absolu vers le dossier "uploads"
const uploadPath = path.join(__dirname, '../../Desktop/uploads');

// Vérifier si le répertoire existe, sinon le créer
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Servir les fichiers statiques depuis le dossier 'uploads'
app.use('/uploads', express.static(uploadPath));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});
