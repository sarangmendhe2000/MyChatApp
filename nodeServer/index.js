//This is node server which handle socket.io
const io=require('socket.io')(process.env.PORT ||3000 ,{
   cors: {
      origin: "*"
   }
});

const users={};



io.on('connection',socket=>{
   // if any new user joined , let other user connect to the server know
         socket.on('new-user-joined',name=>{
            // console.log("new-user",name)
            users[socket.id]=name;
            socket.broadcast.emit('user-joined',name);
         });
         // If someone send the message , broadcast it to other people
         socket.on('send',message=>{   
            socket.broadcast.emit('recieve',{message : message,name:users[socket.id]})
         });
         // if someone leaves the chat , let others know
         socket.on('disconnect',message=>{   
            socket.broadcast.emit('left',users[socket.id]);
            delete users[socket.id];
         });
})