const express = require("express");
const api = express.Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/AuthMiddleware");

api.get("/get-friends", authMiddleware.verifyToken, userController.getFriends);

module.exports = api;