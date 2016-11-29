//set up mongo client
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/bookstore';

//get all products
exports.getProducts = function(response) {
    //use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a GET /products request");

        var col = db.collection('products');
        col.find({}).toArray(function(err,docs) {
            assert.equal(null, err);
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
    //use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a GET /products request with min price: " + min + ", max: " + max);
        var col = db.collection('products');
        col.find({price: { $gt: parseInt(min), $lt: parseInt(max) }}).toArray(function(err,docs) {
            assert.equal(null, err);
            response.json(docs);
            db.close();
        });
    });
};