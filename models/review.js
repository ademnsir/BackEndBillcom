const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
    required: false,
  },
  imgreview2: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
