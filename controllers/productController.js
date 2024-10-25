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
      const { title, prix, marque, dispo, promo, type, subcategory } = req.body;
  
      // Check if the product image and logo have been uploaded
      if (!req.files || !req.files['image'] || !req.files['logoUrl']) {
        return res.status(400).json({ message: "Both product image and brand logo are required." });
      }
  
      // Create a new product object
      const product = new Product({
        title,
        prix,
        marque,
        dispo,
        promo,
        type,  // Category type (e.g., "gaming")
        subcategory, // Subcategory (e.g., "Headset")
        image: req.files['image'][0].filename, // Save the filename for the product image
        logoUrl: req.files['logoUrl'][0].filename, // Save the filename for the brand logo
      });
  
      // Save the product to the database
      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      res.status(500).json({ message: "Error while adding the product", error });
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
