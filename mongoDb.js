//set up mongo client
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/bookstore';

//get all products
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
 * Get all products > min and < max
 * params:
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
            }
            response.json(docs);
            db.close();
        });
    });
};

//update a product
exports.updateProduct = function(response, item, subtraction) {
    var origQuantity;
    var newQuantity;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a POST /checkout request");
        var col = db.collection('products');
        col.find({product: item}).toArray(function(err,docs) {
            if (err) {
                response.status(500);
            }
            origQuantity = docs[0].quantity;
            if (docs[1]) {
                //should not be a duplicate...
                response.status(500);
                throw("error:  Found more than one of the same item in DB");
            }
            newQuantity = origQuantity - subtraction;
            if (newQuantity < 0) {
                response.status(500);
                throw("error: Woah, something blew up!!");
            }
            col.updateOne({product: item}, {$set:{quantity: newQuantity}}, function(err) {
                if (err) {
                    response.status(500);
                }
                //whew, made it!
                response.status(200).send("OK");
                db.close();
            });
        });
    });
};

exports.addUser = function(response) {
    //TODO
};