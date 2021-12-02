const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server,{
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket)=>{
    console.log(`What is Socket: `, socket);
    console.log("Socket is active to be connected");
    
    socket.on('chat', (paylaod)=>{
        console.log(`Payload: `, paylaod);
        //socket.broadcast.emit('chat', paylaod);
        io.sockets.in(paylaod.roomId).emit('chat', paylaod);
    });

    socket.on('room', function(room) {
        if(socket.room)
            socket.leave(socket.room);
            
        socket.join(room.roomId);
        console.log(`Someone joined ${room.roomId}`);
    });

    
}); 
server.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})