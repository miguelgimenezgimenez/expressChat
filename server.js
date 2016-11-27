'use strict';
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
const path = require('path');
const dbFilePath = './db.json';
const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setInterval(function () {
  fs.writeFile(dbFilePath, JSON.stringify(db), function () {
  });
}, 5000);

app.use(express.static('static'));

app.get('/getStoredMessages', function (req, res) {

  res.send(db.msgs);
});

app.post('/store', function (req, res) {
console.log(req.body);
  db.msgs.push(req.body);
  res.send();
});

app.listen(3000, function () {
  console.log('Chat Express Listening');
});
