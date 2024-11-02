// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const upload = require("../middleware/multer"); // Importer le middleware multer

// Route pour l'enregistrement d'un utilisateur avec image de profil
router.post("/register", upload.fields([
  { name: 'profilePicture', maxCount: 1 }  // Image de profil de l'utilisateur
]), AuthController.register);

// Route pour la mise à jour de l'image de profil de l'utilisateur


// Autres routes utilisateurs
router.post("/update", AuthController.updateUserByEmail);
router.get("/getuser", AuthController.getUserByEmail);
router.post("/sign-in", AuthController.signIn);
router.put("/updateUser", AuthController.updateUser);
router.get("/getUserById/:id", AuthController.getUserById);

module.exports = router;