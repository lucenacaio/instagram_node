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
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                    res.setHeader("Access-Control-Allow-Headers", "content-type");
                    res.setHeader("Access-Control-Allow-Credentials", true);
                }
            });

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
    .then('app/models')
    .then('app/util')
    .then('app/controllers')
    .into(app);

module.exports = app;