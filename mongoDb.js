//set up mongo client
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/bookstore';

/*
 * Get all products in bookstore/products
 * params:
 * response: AJAX response
 */
exports.getProducts = function(response) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a GET /products request");

        var col = db.collection('products');
        col.find({}).toArray(function(err,docs) {
            if (err) {
                response.status(500);
            }
            response.json(docs);
            db.close();
        });
    });
};

/*
 * Get all products > min and < max in bookstore/products
 * params:
 * response: AJAX response
 * min: minimum price
 * max: maximum price
 */
exports.getProductsRange = function(response, min, max) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a GET /products request with min price: " + min + ", max: " + max);
        var col = db.collection('products');
        col.find({price: { $gt: parseInt(min), $lt: parseInt(max) }}).toArray(function(err,docs) {
            if (err) {
                response.status(500);
                throw("error: " + err);
            }
            response.json(docs);
            db.close();
        });
    });
};

/*
 * Get all products that belong to "filter" category
 * params:
 * response: AJAX response
 * filter: filter to match category with
 */
exports.getProductsFilter = function(response, filter) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a GET /filter request with filter: " + filter);
        var col = db.collection('products');
        col.find({category: filter}).toArray(function(err,docs) {
            if (err) {
                response.status(500);
                throw("error: " + err);
            }
            response.json(docs);
            db.close();
        });
    });
};

/*
 * Update a product in bookstore/products
 * params:
 * response: AJAX response
 * item: item in DB to be updated
 * subtraction: the amount that is being subtracted from its value in the DB
 */
exports.updateProduct = function(response, item, subtraction) {
    var origQuantity;
    var newQuantity;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a POST /checkout request - updating DB");
        var col = db.collection('products');
        col.find({product: item}).toArray(function(err,docs) {
            if (err) {
                response.status(500).send();
                throw("error: " + err);
            }
            origQuantity = docs[0].quantity;
            if (docs[1]) {
                //should not be a duplicate...
                response.status(500).send();
                throw("error:  Found more than one of the same item in DB");
            }
            newQuantity = origQuantity - subtraction;
            if (newQuantity < 0) {
                response.status(500).send();
                throw("error: Woah, something blew up!!");
            }
            col.updateOne({product: item}, {$set:{quantity: newQuantity}}, function(err) {
                if (err) {
                    response.status(500).send();
                    throw("error: " + err);
                }
                //whew, made it!
                //set the status code but don't worry about sending it yet
                response.status(200);
                db.close();
            });
        });
    });
};

/*
 * Add an order to bookstore/orders
 * params:
 * response: AJAX response
 * order: the cart (in JSON form)
 * totalPrice: total price value of the cart
 */
exports.addOrder = function(response, order, totalPrice) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a POST /checkout request - adding order");
        var col = db.collection('orders');
        var jsonString = JSON.stringify(order);
        col.insertOne({cart: jsonString, total: totalPrice}, function(err) {
            if (err) {
                response.status(500);
                throw("error: " + err);
            }
            //need this or request will be sent again
            else {
                response.status(200).send();
            }
            db.close();
        });
    });
};

/*
 * Add a user's authentication token to bookstore/users
 * params:
 * response: AJAX response
 * token: username, i.e. the user's authentication token
 */
exports.addUser = function(response, token) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a POST /user request");
        var col = db.collection('users');
        col.insertOne({token: token}, function(err) {
            if (err) {
                response.status(500).send();
                throw("error: " + err);
            }
            else {
                response.status(200).send("OK");
            }
            db.close();
        });
    });
};

/*
 * Checks that the user's authentication token matches in the DB
 * params:
 * response: AJAX response
 * token: username, i.e. the user's authentication token
 * Assumption for A5 is that this is adequate enough from a security standpoint...
 */
//assumption is that this is adequate for A5, and that proper
exports.checkToken = function(response, token) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Checking authentication");
        var col = db.collection('users');
        col.find({token: token}).toArray(function(err, doc) {
            if (err) {
                response.status(500).send();
                throw("error: " + err);
            }
            if (doc.length < 1) {
                response.status(401).send();
                throw("error: Authentication error");
            }
            db.close();
        });
    });
};


