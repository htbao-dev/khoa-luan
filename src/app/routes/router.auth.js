const express = require("express");
const api = express.Router();
const authController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/AuthMiddleware");

api.post("/login", authController.login);

api.post(
  "/refresh-token",
  authMiddleware.verifyRefreshToken,
  authController.refreshToken
);

api.post("/logout", authMiddleware.verifyToken, authController.logout);

api.post("/register", authController.register);

module.exports = api;
