var MAX_VALUE = 1000;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ejs = require('ejs');
var fs = require('fs');

//set up express node app
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require mongoDb.js
var mongodb = require("./mongoDb.js");

//for GET /product requests
app.get('/products', function(request, response) {
    //AJAX authentication
    mongodb.checkToken(response, request.headers.token);
    mongodb.getProducts(response);
});

//for GET /products/range requests
app.get('/products/range/:min-:max', function(request, response) {
    var min = request.params['min'];
    var max = request.params['max'];
    var renderedHtml;
    /* Note that AJAX authentication is not used for this request - this is because the user
     * would not have a token assigned, which is done by entering the main page
     */
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

//for GET /filter requests
app.get('/filter', function(request, response) {
    //AJAX authentication
    mongodb.checkToken(response, request.headers.token);
    var filter = request.headers.filter;
    //use wildcard to return all
    if (filter == "*") {
        mongodb.getProducts(response);
    }
    else {
        mongodb.getProductsFilter(response, filter);
    }
});

//for invalid GET requests
app.get('/*', function(request, response) {
    console.log("Error 404");
    response.status(404).sendFile(__dirname + "/public/not_found_error.html");
});

//for POST /checkout requests
app.post('/checkout', function(request, response) {
    var cart;
    var subtraction;
    var totalPrice = request.headers.cartvalue;
    //AJAX authentication
    mongodb.checkToken(response, request.headers.token);
    //check if JSON
    if (request.is("application/json")) {
        cart = request.body;
    }
    else {
        response.status(400).send("Cart not JSON!");
        throw("error: Cart not JSON!");
    }
    console.log("Cart:");
    console.log(cart);
    //add cart to DB
    mongodb.addOrder(response, cart, totalPrice);
    for (var item in cart) {
        subtraction = cart[item];
        mongodb.updateProduct(response, item, subtraction);
    }
});

//for POST /user requests
app.post('/user', function(request, response) {
    var usernameObj;
    if (request.is("application/json")) {
        usernameObj = request.body;
    }
    else {
        response.status(400).send("User not JSON!");
    }
    mongodb.addUser(response, usernameObj.username);
});

//for POST /restore requests
app.post('/restore', function(request, response) {
    console.log("Wooo!");
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});