var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());
app.use(bodyParser.json());

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;