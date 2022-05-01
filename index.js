const express = require('express')
const app = express();

const server = require('http').createServer(app);
const path = require('path');
require("dotenv").config()

const io = require('socket.io')(server,{
    cors: {
        origin: '*'
    }
});


io.on('connection', (socket)=>{
    console.log(`What is Socket: `, socket);
    console.log("Socket is active to be connected");
    
    socket.on('code-snippet', (paylaod)=>{
        console.log(`code-snippet: `, paylaod);
        io.sockets.in(paylaod.roomId).emit('code-snippet', paylaod);
    });

    socket.on('chat', (paylaod)=>{
        console.log(`chat: `, paylaod);
        io.sockets.in(paylaod.roomId).emit('chat', paylaod);
    });

    socket.on('room', function(room) {
        if(socket.room)
            socket.leave(socket.room);

        socket.join(room.roomId);
        console.log(`${room.userName} joined ${room.roomId}`);
        io.sockets.in(room.roomId).emit('room', room);
    });

    
}); 

 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

if(process.env.NODE_ENV !== 'development'){
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });  
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log("Server is running on port 5000");
})