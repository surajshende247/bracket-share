const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server,{
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket)=>{

    console.log("Socket is active to be connected");
    
    socket.on('codechange', (paylaod)=>{
        console.log(`Payload: `, paylaod);
        io.emit('codechange', paylaod);
    });
})

server.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})