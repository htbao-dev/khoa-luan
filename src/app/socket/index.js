const socketio = require("socket.io");
const _ = require("underscore");
const authMiddleware = require("../middlewares/AuthMiddleware");
const clientSocketInit = require("./socket.init");
const clientSocketChat = require("./socket.chat");
const clientSocketConnection = require("./socket.connection");
function socket(server) {
  const options = {
    /* ... */
  };
  const io = socketio.listen(server, options);
  console.log("Socket started");

  _.each(io.nsps, function (nsp) {
    nsp.on("connect", function (socket) {
      if (!socket.auth) {
        console.log("removing socket from", nsp.name);
        delete nsp.connected[socket.id];
      }
    });
  });

  io.on("connection", (socket) => {
    socket.auth = false;
    socket.on("authenticate", (data) => {
      console.log("authenticate", data);
      const { statusVerify, res } = authMiddleware.verifyTokenSocket(
        data.accessToken
      );
      if (statusVerify == 200) {
        console.log("Authenticated socket ", socket.id);
        socket.auth = true;

        _.each(io.nsps, function (nsp) {
          if (_.findWhere(nsp.sockets, { id: socket.id })) {
            console.log("restoring socket to", nsp.name);
            nsp.connected[socket.id] = socket;
          }
        });

        clientSocketInit(socket);
        clientSocketConnection(socket);
        clientSocketChat(io, socket);
      }
    });

    setTimeout(function () {
      if (!socket.auth) {
        console.log("Disconnecting socket ", socket.id);
        socket.disconnect("unauthorized");
      }
    }, 5000);
  });
}
module.exports = socket;
