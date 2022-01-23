const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://18T1021011:18T1021011@khoaluan.pesbl.mongodb.net/social_network_deploy?retryWrites=true&w=majority');
        console.log('Connected to mongodb');
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {connect};
