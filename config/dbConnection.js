var mongo = require("mongodb");
var mongoose = require('mongoose');
var url = "localhost";
var port = 27017;
const connection = mongoose.connect('mongodb://' + url + '/instagram');

var connMongoDB = function() {
    return connection;
}

module.exports = function() {
    return connMongoDB;
}