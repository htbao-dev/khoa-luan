const express = require("express");
const api = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const RoomController = require("../controllers/RoomController");

api.post("/create-room-by-list",authMiddleware.verifyToken, RoomController.createRoomByListMember);
api.get("/get-list-room",authMiddleware.verifyToken, RoomController.getListRoom);
api.get("/get-room-detail",authMiddleware.verifyToken, RoomController.getRoomDetail);

module.exports = api;
