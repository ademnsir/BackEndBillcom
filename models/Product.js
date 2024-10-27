const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Chemin de l'image stockée
    required: true,
  },

  img1: {
    type: String, // Chemin de l'image stockée
    required: true,
  },

  img2: {
    type: String, // Chemin de l'image stockée
    required: true,
  },


  img3: {
    type: String, // Chemin de l'image stockée
    required: true,
  },

  img4: {
    type: String, // Chemin de l'image stockée
    required: true,
  },

  
  logoUrl: {
    type: String,
    required: true, // URL du logo de la marque
  },
  prix: {
    type: Number,
    required: true,
  },
  marque: {
    type: String,
    required: true,
  },
  dispo: {
    type: String,
    required: true,
  },
  promo: {
    type: Number, // Pourcentage de réduction
    default: 0,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  subcategory: {
    type: String, // Sous-catégorie (ex: "Mouse", "Headset", etc.)
    required: true,
  },
  type: {
    type: String,
    required: true, // Type de catégorie principale (ex: "gaming", "accessories", etc.)
  },
  user: {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence à l'utilisateur qui a ajouté le produit
      required: false,
    },
    profilePicture: String,
    ville: String,
    nom: String,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
