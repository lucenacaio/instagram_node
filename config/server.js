var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var multiparty = require('connect-multiparty');
var jwt = require('jsonwebtoken');
var config = require('./config');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(multiparty());
app.use(expressValidator());
app.use(bodyParser.json());

app.set('superSecret', config.secret);

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url.indexOf('/api/') !== -1) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            let authenticateUtil = new app.app.util.authenticateUtil(app);
            authenticateUtil.verify(req, res, token);
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
    next();
});
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/schemas')
    .then('app/models')
    .then('app/util')
    .then('app/controllers')
    .into(app);

module.exports = app;