const Mastodon=require('mastodon-api');
var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./../public/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
// Chargement de socket.io
var io = require('socket.io').listen(server);
var isRecievedMessage=true;
// Quand un client se connecte, on le note dans la console


server.listen(8000, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
const M=new Mastodon({

  client_key: "sbkjjlFE2FXYL5NSU5M-aBG6wDuN7nKMusvTeTCU6L4" ,
  client_secret: "I_NrWXxS4TNcL-AQhuGacStY0rymQmOTdDYdwZus-bk" ,
  access_token: "ftD6_-7GUyICadICrUlhDFCBqCmJ8QBKS_4QBT5Y1Cg",
  timeout_ms: 60*1000
})


export async function putMessage(req,res){
  isRecievedMessage=false;
  const params={
    status:req.body.message
  }
  M.post('statuses',params,(error,data)=>{
    if (error) {
        console.error(error);
    }else {
      console.log("success, id: "+data.id+" ");
      console.log(data);
      var username=data.account.username;
      var avatar=data.account.avatar
      console.log(username);
      res.json({
        "name":username,
        "avatar":avatar,
        "sender":true
      })
    }
  })
}



  const listener = M.stream('streaming/user')
  var value=null;
  var avatar=null;
  var history= new Map();
  var avatars=[]
  listener.on('message', msg =>{
    if (msg.data.account!=undefined) {
      value=msg.data.account.username+":"+msg.data.content;
      avatar=msg.data.account.avatar;

    }
    //console.log(value);
    //newMessage(msg);
    if (value!=null) {
      if (isRecievedMessage==true) {
        history.set(value,true);
        avatars.push(avatar)
      }else {
        history.set(value,false);
        avatars.push(avatar)

      }

    //  history = history.slice(-10);
      io.sockets.emit('message',{value:value,avatar:avatar});

      console.log("done");
      console.log(history);
      isRecievedMessage=true
    }

  });


  listener.on('error', err => console.log(err));

io.sockets.on('connection', function (socket) {
    if (value!=null) {
      console.log(value);
      var i=0
      for (var k of history.keys()) {
        socket.emit('message',{value:k,avatar:avatars[i],sender:history.get(k)});
        i++
      }
    }

  });


// const server = http.createServer();
//
// server.listen(8080, function() {
//     console.log((new Date()) + ' Server is listening on port 8080');
// });
// const wsServer = new WebSocketServer({
//     httpServer: server,
// });
//
// wsServer.on('request', function(request) {
//   console.log("hy");
//   const connection = request.accept('echo-protocol', request.origin);
//
//     console.log((new Date()) + ' Connection accepted.');
//     connection.on('message', function(message) {
//           console.log('Received Message: ' + message.utf8Data);
//           connection.sendUTF("hello");
//
//     });
//     connection.on('close', function(reasonCode, description) {
//         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//     });
// });

  // export async function newMessage(msg,req,res){
  //   res.json({
  //     "new":msg.data.account.username+": "+msg.data.content
  //   })*/
  //}
