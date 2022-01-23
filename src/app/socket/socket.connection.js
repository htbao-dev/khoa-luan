const User = require("../models/User");

module.exports = (client) => {
    client.on('disconnect',()=>{
        User.findOne({socketId: client.socketId}).then((user)=>{
            if(user){
                user.socketId = null;
                user.save();
            }
            else{
                console.log('user not found');
            }
        });
    });
}