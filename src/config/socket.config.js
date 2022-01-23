const http = require('http');
const socketio = require('socket.io');
const PORT_SOCKET = process.env.PORT_SOCKET || 3484;
function socket(app){
    const server = http.createServer(app);
    const options = { /* ... */ };
    const io = socketio(server, options);
    server.listen(PORT_SOCKET, () => {
        console.log(`socket is running on port ${PORT_SOCKET}`);
        });
    return io;
}