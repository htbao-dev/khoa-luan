const User = require("../models/User");
const Room = require("../models/Room");

module.exports = (io, client) => {
    client.on('send-message', (data) => {
        const {roomId, senderId, message} = data;
        console.log(data);
        Room.findById(roomId)
            .then((room)=>{
                if(room){
                    room.messages.push({
                        senderId: senderId,
                        message: message
                    });
                    room.save()
                        .then((room)=>{
                            io.to(roomId).emit('receive-message', {
                                roomId: roomId,
                                senderId: senderId,
                                message: message,
                                date: Date.now()
                            });
                        });
                }
            })
    });

}