const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true, // Assurez-vous que le champ est obligatoire si nécessaire
  },
  prenom: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // L'email doit être unique
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
  },
  adresse: {
    type: String,
  },
  codePostal: {
    type: String,
  },
  telephone: {
    type: String,
  },
  checkbox: {
    type: Boolean,
    default: true, // Par défaut à true si coché
  },
  type: {
    type: String,
    default: "Utilisateur", // Par défaut à "Utilisateur"
  },
  genre: {
    type: String,
  },
  dateNaissance: {
    type: String,
  }
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.id) {
      // Générez un identifiant unique si celui-ci n'est pas déjà défini
      const count = await mongoose.model('user').countDocuments();
      this.id = count + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
