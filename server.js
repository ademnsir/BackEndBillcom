const express = require('express');
const cors = require('cors'); 
const connectDB = require("./config/db");
const multer = require('multer'); // Pour gérer les uploads de fichiers
const path = require('path');

const app = express();
const port = 3001;
const AuthRoute = require("./routes/auth");
const productRoutes = require("./routes/productRoutes"); 
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const paymentRoutes = require('./routes/paymentRoutes');


connectDB();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Le serveur est en marche');
});


app.use("/auth", AuthRoute);


app.use("/tp/api", productRoutes);  


app.use('/tp/api/reviews', reviewRoutes);


app.use('/tp/api/orders', orderRoutes);


app.use('/tp/api/payment', paymentRoutes);



app.use('/uploads', express.static('public/uploads')); 



// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});

// Configuration de multer pour les uploads d'images dans public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Sauvegarde dans public/uploads sans __dirname
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
