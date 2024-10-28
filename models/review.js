const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    nom: String,
    profilePicture: String,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  priceRating: {
    type: Number,
    required: true,
  },
  valueRating: {
    type: Number,
    required: true,
  },
  qualityRating: {
    type: Number,
    required: true,
  },
  imgreview1: {
    type: String,
  },
  imgreview2: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
