var app = require('./config/server');
console.log(__dirname);
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {

    console.log("Server run on port " + app.get('port'));
})