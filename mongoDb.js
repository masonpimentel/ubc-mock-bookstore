//set up mongo client
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/bookstore';

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