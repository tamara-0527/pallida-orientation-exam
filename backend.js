'use strict';

var express = require('express');
var mysql = require('mysql');
var plates = 'SELECT * FROM licence_plates WHERE plate LIKE ';

var app = express();
app.use('/', express.static('./'));
app.use(express.json());

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'a',
  database: 'licence_plates'
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
  let data = []
  console.log(req.query.plate)
  connection.query(plates + "\"%"+ req.query.plate +"%\"",  function(err, result, fields) {
    console.log(result);
    result.forEach(element => {
      data.push(element);
    });
    res.send(data);
  })
});

app.get('/search/:brand', function(req, res) {
  var data = [];
  console.log(req.params.brand);
  let sqlQuery = 'SELECT * FROM licence_plates  WHERE car_brand=\"' + req.params.brand + '\";';
  console.log(sqlQuery);
  connection.query(sqlQuery,  function(err, result, fields) {
    console.log(result);
    result.forEach(element => {
      data.push(element);
    });
    res.send(data);
  })
});

app.listen(8080, () => console.log('server running'));
