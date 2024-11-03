const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  codePostal: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  checkbox: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "Utilisateur",
  },
  genre: {
    type: String,
    required: true,
  },
  dateNaissance: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.id) {
      const count = await mongoose.model('User').countDocuments(); // Correction ici
      this.id = count + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema); // Correction ici
module.exports = User;
