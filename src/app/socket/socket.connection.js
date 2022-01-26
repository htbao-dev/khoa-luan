const User = require("../models/User");

module.exports = (client) => {
  client.on("disconnect", () => {
    console.log(client.id + " disconnected");
    User.findOne({ socketId: client.id }).then((user) => {
      if (user) {
        user.socketId = null;
        user.save();
      } else {
        console.log("user not found");
      }
    });
  });
};
