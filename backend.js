'use strict';

var express = require('express');
var mysql = require('mysql');

var app = express();
app.use('/', express.static('./'));

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'licences'
});
connection.connect((err) => {
  if(err) {
    console.log('Error connecting to MYSQL\n');
    return;
  };
  console.log('MYSQL connection established');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.listen(3000, () => console.log("server running"));