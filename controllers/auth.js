const bcrypt = require("bcrypt");
const User = require("../models/User");
const saltRounds = 10; // Définir le nombre de tours pour le hash du mot de passe

// Enregistrement d'un nouvel utilisateur
exports.register = async (req, res, next) => {
    const {
        nom,
        prenom,
        email,
        password,
        confirmPassword,
        pays,
        adresse,
        codePostal,
        telephone,
        genre,
        dateNaissance,
        checkbox,
        type
    } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ success: true, message: "Utilisateur déjà enregistré", user: existingUser });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Les mots de passe ne correspondent pas" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Vérifier si l'image de profil est bien téléchargée
        if (!req.files || !req.files['profilePicture']) {
            return res.status(400).json({ message: "L'image de profil est requise" });
        }

        // Récupérer le nom du fichier de l'image de profil (en minuscule)
        const profilePictureFileName = req.files['profilePicture'][0].originalname.toLowerCase();

        // Créer un nouvel utilisateur avec les données reçues et le nom du fichier de l'image
        const user = await User.create({
            nom,
            prenom,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            pays: pays || "",
            adresse: adresse || "",
            codePostal: codePostal || "",
            telephone: telephone || "",
            genre,
            dateNaissance,
            checkbox: checkbox !== undefined ? checkbox : true,
            type,
            profilePicture: profilePictureFileName
        });

        res.status(201).json({ success: true, message: "Utilisateur ajouté avec succès", user });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        res.status(500).json({ success: false, message: "Erreur lors de l'ajout de l'utilisateur" });
    }
};


// Mise à jour des informations utilisateur
exports.updateUserByEmail = async (req, res, next) => {
    const { email, nom, prenom, dateNaissance, telephone, adresse, password } = req.body; 

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() }); 

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        existingUser.nom = nom || existingUser.nom;
        existingUser.prenom = prenom || existingUser.prenom;
        existingUser.dateNaissance = dateNaissance || existingUser.dateNaissance;
        existingUser.telephone = telephone || existingUser.telephone;
        existingUser.adresse = adresse || existingUser.adresse;

        // Si un nouveau mot de passe est fourni, le hacher et le mettre à jour
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            existingUser.password = hashedPassword;
        }

        await existingUser.save();

        res.status(200).json({ success: true, message: "Utilisateur mis à jour avec succès", user: existingUser });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
};

// Récupération d'un utilisateur par email
exports.getUserByEmail = async (req, res, next) => {
    const { email } = req.body; 

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        user.password = undefined; // Ne pas renvoyer le mot de passe dans la réponse

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).json({ success: false, message: "Erreur lors de la récupération de l'utilisateur" });
    }
};


exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Mot de passe incorrect" });
        }

        // Renvoyer les informations utilisateur sans mot de passe
        res.status(200).json({
            success: true,
            message: "Connexion réussie",
            user: {
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                type: user.type,
                genre: user.genre,
                dateNaissance: user.dateNaissance,
                pays: user.pays,
                adresse: user.adresse,
                codePostal: user.codePostal,
                telephone: user.telephone
            }
        });
    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).json({ success: false, message: "Erreur lors de la connexion" });
    }
};


exports.updateUser = async (req, res) => {
    const { idUser, nom, prenom, email, adresse, ville, telephone, codepostal } = req.body;
  
    try {
      // Find user and update their info
      const updatedUser = await User.findByIdAndUpdate(
        idUser,
        { nom, prenom, email, adresse, ville, telephone, codepostal },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user info' });
    }
  };


  exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user data
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user data' });
    }
  };
