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

    // Vérifier si les fichiers image et logo sont bien téléchargés
    if (!req.files || !req.files['image'] || !req.files['logoUrl'] || !req.files['img1'] || !req.files['img2'] || !req.files['img3'] || !req.files['img4']) {
      return res.status(400).json({ message: "Toutes les images du produit et le logo sont requis" });
    }

    // Récupérer les noms des fichiers image et logo (vrais noms en minuscule)
    const imageFileName = req.files['image'][0].originalname.toLowerCase();
    const logoFileName = req.files['logoUrl'][0].originalname.toLowerCase();
    const img1FileName = req.files['img1'][0].originalname.toLowerCase();
    const img2FileName = req.files['img2'][0].originalname.toLowerCase();
    const img3FileName = req.files['img3'][0].originalname.toLowerCase();
    const img4FileName = req.files['img4'][0].originalname.toLowerCase();

    // Logique de promo: Si le champ 'promo' n'est pas fourni, le produit n'est pas en promotion (promo = 0)
    const productPromo = promo ? promo : 0;

    // Créer un nouveau produit avec les données reçues et les noms de fichiers
    const product = new Product({
      title,
      prix,
      marque,  // La marque peut être en majuscule ou minuscule dans la base de données
      dispo,
      promo: productPromo,  // Assurez-vous que promo est soit une valeur fournie soit 0 par défaut
      type,
      subcategory,
      image: imageFileName,  // Sauvegarder en minuscule pour uniformité
      logoUrl: logoFileName, // Sauvegarder en minuscule pour uniformité
      img1: img1FileName,
      img2: img2FileName,
      img3: img3FileName,
      img4: img4FileName,
      user: req.body.user ? { idUser: req.body.user.idUser } : undefined  // Optionnel : l'utilisateur qui a ajouté le produit
    });

    // Enregistrer le produit dans la base de données
    await product.save();
    
    res.status(201).json({ message: 'Produit ajouté avec succès', product });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du produit", error });
  }
};



  
  
  
  

// Récupérer un produit par ID
exports.getProductById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID manquant dans la requête' });
    }

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
