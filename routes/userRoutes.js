//jshint esversion:9
const express = require("express");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.signup);
router.get("/logout", authController.logout);
router.get("/", authController.getUsers);

module.exports = router;
