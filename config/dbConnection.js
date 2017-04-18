var mongo = require("mongodb");

var url = "localhost";
var port = 27017;

var connMongoDB = function() {
    var db = new mongo.Db(
        'instagram',
        new mongo.Server(url, port, {}), {}
    );
    return db;
}

module.exports = function() {
    return connMongoDB;
}