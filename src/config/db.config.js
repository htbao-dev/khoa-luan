const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/social_network_dev');
        console.log('Connected to mongodb');
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {connect};
