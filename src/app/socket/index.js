const socketio = require('socket.io');
const clientSocketInit = require('./socket.init');
const clientSocketChat = require('./socket.chat');
const clientSocketConnection = require('./socket.connection');
function socket(server){
    const options = { /* ... */ };
    const io = socketio.listen(server, options);
    console.log('Socket started');
    
    io.on('connection', async(client) => {
        console.log('a user connected');

        clientSocketInit(client);
        clientSocketConnection(client);
        clientSocketChat(io, client);
    });

}
module.exports = socket;
