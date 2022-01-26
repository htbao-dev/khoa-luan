const Room = require("../models/Room");
const User = require("../models/User");
const mongoose = require("mongoose");
class RoomController {
  createRoomByListMember(req, res, next) {
    const listId = req.body.userId;
    console.log(listId);
    if (!listId) {
      return res.status(400).send({
        message: "listId is required",
      });
    }
    if (listId.length < 2) {
      return res.status(400).send({
        message: "listId must have at least 2 members",
      });
    }
    Room.findOne({
      $and: [
        { members: { $all: listId } },
        { members: { $size: listId.length } },
      ],
    })
      .then((room) => {
        if (room === [] || room === null) {
          const newRoom = new Room({
            members: listId,
          });
          newRoom.save().then((room) => {
            res.status(200).send({
              room: room,
            });
          });
        } else {
          res.status(200).send({
            room: room,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  getListRoom(req, res, next) {
    console.log(req.query);
    Room.find({
      members: { $in: req.query.userId },
    })
      .then((rooms) => {
        const listRoom = rooms.map((room) => {
          return {
            id: room._id,
            name: room.name,
            lastMessage: room.messages[room.messages.length - 1],
          };
        });
        res.status(200).send({
          listRoom,
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  getRoomDetail(req, res, next) {
    Room.findById(req.query.roomId)
      .then(async (room) => {
        room.messages.sort((a, b) => {
          return b.date - a.date;
        });
        let _members = [];
        for (let i = 0; i < room.members.length; i++) {
          const user = await User.findById(room.members[i]);
          if (user) {
            _members.push({
              id: user._id,
              name: user.name,
              username: user.username,
            });
          }
        }

        res.status(200).send({
          room: {
            id: room._id,
            name: room.name,
            members: _members,
            messages: room.messages,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
}

module.exports = new RoomController();
