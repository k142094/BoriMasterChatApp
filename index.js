var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    console.log('it begins');
});

io.on('connection',function(socket){
    console.log('a user just connected');
    io.emit('chat message', 'hi i just connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('chat message', 'hi i just disconnected');

    });
    socket.on('chat message', function(msg){
       //console.log('message received: '+msg);
        io.emit('chat message', msg);
    });
});
http.listen(8080, function(){
  console.log('BEGINNN');
  console.log('listening on', http.address().port);
});
