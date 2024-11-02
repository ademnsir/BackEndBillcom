const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    userDetails: {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        telephone: { type: String, required: true }
    },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
