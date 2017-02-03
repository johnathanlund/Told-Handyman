var express = require('express');

const bodyParser = require ('body-parser');
var app = express();
var db = require('./db');

app.get('/', (req, res) => {
  res.sendFile(_dirname + '/index.html');
  console.log(req.body);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
