const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");


// Login Page
router.get("/login", authController.loginPage);


// Login Form
router.post("/login", authController.login);


// Dashboard
router.get("/dashboard", authController.dashboard);


// Logout
router.get("/logout", authController.logout);


module.exports = router;