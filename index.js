const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT =process.env.PORT || 8000;
const app = express();


// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
app.options('*', cors());
app.get('/checkserver',(req,res)=>{res.send(" your server is running")
})
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('message', (data) => {
//     console.log('Received message:', data);
//     // Emit the received message to all connected clients
//     io.emit('message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// const port = 5000;
// http.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const server = app.listen(PORT,()=>{
  // console.log("server is running on",PORT);
 
})
const io = require('socket.io')(server);
io.on('connection',(socket)=>{
  // console.log('user connected to ',socket.id);
  socket.on('joinRoom',(roomId)=>{
    // console.log('user joined room',roomId)
    socket.join(roomId);
  })
  socket.on('sendMessage',(messageInfo)=>{
    // console.log("message is sent to room   ",messageInfo["roomid"],"  message is ",messageInfo["message"])
   io.to(messageInfo["roomid"]).emit('receiveMessage',messageInfo["messageInfo"])
  })
  socket.on('disconnect',()=>{
    console.log('A user is disconnected')
  })

})

