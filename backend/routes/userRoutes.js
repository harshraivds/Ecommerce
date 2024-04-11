const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword, resetPassword } = require("../controllers/userController");

// Using direct methods instead of router.route()
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route(`/password/reset/:token`).put(resetPassword)
router.get("/logout", logout);

module.exports = router;
