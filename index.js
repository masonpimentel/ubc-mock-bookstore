var MAX_VALUE = 1000;

var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');

//set up express node app
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//require mongoDb.js
var mongodb = require("./mongoDb.js");

//for GET /product requests
app.get('/products', function(request, response) {
    mongodb.getProducts(response);
});

//for GET /products/range requests
app.get('/products/range/:min-:max', function(request, response) {
    var min = request.params['min'];
    var max = request.params['max'];
    var renderedHtml;
    fs.readFile("public/range_error.html", 'utf-8', function(err, content) {
        if (err) {
            throw ("EJS error");
        }
        if (isNaN(min) || isNaN(max) || (min < 0) || (max > MAX_VALUE)) {
            renderedHtml = ejs.render(content, {max: MAX_VALUE});
            response.status(400).send(renderedHtml);
            console.log("Error 400");
        }
        else {
            mongodb.getProductsRange(response, min, max);
        }
    });
});

//for invalid GET requests
app.get('/*', function(request, response) {
    console.log("Error 404");
    response.status(404).sendFile(__dirname + "/public/not_found_error.html");
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});