var express = require('express');
var path = require('path');
var app = express();

app.use('/build', express.static(path.join(__dirname, '/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Movie Ratings App is running on port 3000!');
});
