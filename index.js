var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//Get html file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
//User connection
io.on('connection', function(socket){
    console.log('A user connected!');
    //User Disconnect
socket.on('disconnect', function() {
    console.log('A user disconnected!');
});
});

//Print message
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('new message /' + msg);

    });
});
//Bring Message from server
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//Create port
http.listen(3000, function(){
  console.log('listening on *:3000');
});