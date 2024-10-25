const Product = require('../models/Product');

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
  }
};

// Ajouter un produit
exports.addProduct = async (req, res) => {
    try {
      const { title, prix, marque, dispo, promo, user } = req.body;
  
      // Vérification si un fichier est bien téléchargé
      if (!req.file) {
        return res.status(400).json({ message: "L'image du produit est requise" });
      }
  
      // Création du nouveau produit avec l'image
      const newProduct = new Product({
        title,
        prix,
        marque,
        dispo,
        promo,
        user,
        image: req.file.filename // Utilise le nom de fichier généré par Multer
      });
  
      const product = await newProduct.save();
  
      res.status(201).json({
        success: true,
        message: 'Produit ajouté avec succès',
        product
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      res.status(500).json({
        message: "Erreur lors de l'ajout du produit",
        error
      });
    }
  };
  
  

// Récupérer un produit par ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit', error });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Produit mis à jour avec succès', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit', error });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Produit supprimé avec succès', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error });
  }
};
