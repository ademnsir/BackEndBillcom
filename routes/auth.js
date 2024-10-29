

const express = require("express");
const router = express.Router();
const AuthController =require ("../controllers/auth")

router.route("/register").post(AuthController.register);
router.route("/update").post(AuthController.updateUserByEmail);
router.route("/getuser").get(AuthController.getUserByEmail);
router.route("/sign-in").post(AuthController.signIn);
router.route("/updateUser").put(AuthController.updateUser);

module.exports = router;
