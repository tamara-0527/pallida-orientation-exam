'use strict';

var express = require('express');
var mysql = require('mysql');
var plates = 'SELECT car_brand FROM licence_plates';

var app = express();
app.use('/', express.static('./'));
app.use(express.json());

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

app.get('/search', function(req, res) {
  connection.query(plates, function(err, rows) {
    if (err || req.query.length > 7) {
      return res.send({'result': 'error', 'message': 'invalid input'});
    } else if (/[^a-zA-Z0-9]/.test(req.query)) {
        res.json({'plates': rows});
    };
  });
  console.log('Data received from database');
});

app.get('/search/:brand', function(req, res) {
  let searchParameter = req.query.car_brand;
  let searchValue = req.query[searchParameter];
  console.log({searchParameter : searchValue});
  var data = [];
  connection.query('SELECT car_brand FROM licence_plates ' + searchParameter + ' = ' + searchValue,  function(err, result, fields) {
    console.log(req.query.car_brand);
    result.forEach(element => {
      data.push(element.car_brand);
    });
    res.send(data);
  })
});

app.listen(8080, () => console.log('server running'));