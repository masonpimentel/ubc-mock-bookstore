var express = require('express');
var app = express();

//set up express node app
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//require mongoDb.js
var mongodb = require("./mongoDb.js");

app.get('/', function(request, response) {
    response.sendFile("index.html");
});

app.get('/products', function(request, response) {
    mongodb.getProducts(response);
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});