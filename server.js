var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var cors = require('cors');
var helmet = require('helmet');
var compression = require('compression');

app.use(cors());
app.use(compression())
app.use(helmet())

// Is this necessary?
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true
}));

app.use(function(req, res, next) {
  // redirect to secure address
  if (req.headers['x-forwarded-proto'] === 'https' || req.headers.host === 'localhost:3000') {
    next();
  } else {
    res.redirect(301, 'https://chat.samcor.in');
  }
});

app.use(express.static(__dirname + '/build'));


// Routes =============================================

app.all('*', function(req, res) {
  // failed to decode para %....% in index.html
  res.set('Cache-Control', 'public, max-age=31536000');
  res.sendFile(__dirname + '/build/index.html');
});


// Start the server =====================
var server = require('http').Server(app);
server.listen(PORT);
console.log(`Listening on port ${PORT}`);


// ----------- WebSockets ----------- (temporary)
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({server});
const activeUsers = [];


wss.broadcast = (data, ws, all) => {
  wss.clients.forEach(function each(client) {
    if(all) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    } else {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    }
  });
}

// User connect
wss.on("connection", (ws, req) => {
  ws.on('message', function(message) {
    data = JSON.parse(message);

    switch(data.type) {
      case 'connect':
        console.log(`'${data.username}' connected.`)
        ws.username = data.username
        activeUsers.push(data.username)
        console.log("Active users: ", activeUsers)
        wss.broadcast({
          type: 'activeUsers',
          activeUsers: activeUsers
        }, ws, true);

        break;
      case 'message':
        console.log("SERVER MESSAGE: ", data.message)
        wss.broadcast(data, ws, false);
        break;
      default:
        break;
    }
  });

  // ws.ping('0x9')
  // User disconnect
  // Not showing in heroku logs
  ws.on('close', () => {
    console.log(`'${ws.username}' disconnected. 🔥`)
    activeUsers.splice(activeUsers.indexOf(ws.username), 1);
    console.log("Active users: ", activeUsers)
    wss.broadcast({
      type: 'activeUsers',
      activeUsers: activeUsers
    }, ws, true);
  })
});
