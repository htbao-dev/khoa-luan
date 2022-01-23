const User = require("../models/User");
const Room = require("../models/Room");
function init(client){
    client.on('init', (data)=>{
        console.log(data);
        User.findById(data.userId).then((user)=>{
            if(user){
                user.socketId = client.id;
                user.save();
            }
            else{
                console.log('user not found');
            }
        });
        Room.find({members: {$in: data.userId}}, (err, rooms)=>{
            if(err) console.log(err);
            if(rooms){
                rooms.forEach((room)=>{
                    console.log('socket join room', room._id.toString());
                    client.join(room._id.toString());
                });
            }
        });
    });     
}

module.exports = init;
