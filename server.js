var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var server = require('http').Server(app);
var cors = require('cors');
var helmet = require('helmet');
var compression = require('compression');

app.use(cors());
app.use(compression())
app.use(helmet())

// Is this necessary?
// app.use(helmet.hsts({
//   maxAge: 31536000,
//   includeSubDomains: true
// }));

app.use(express.static(__dirname + '/build'));

app.all('*', function(req, res) {
  if (req.headers['x-forwarded-proto'] === 'https' || req.secure || req.headers.host === 'localhost:3000') {
    res.set('Cache-Control', 'public, max-age=31536000');
    res.sendFile(__dirname + '/build/index.html');
  } else {
    res.redirect(301, 'https://chat.samcor.in');
  }
});

server.listen(PORT);
console.log(`Listening on port ${PORT}`);
