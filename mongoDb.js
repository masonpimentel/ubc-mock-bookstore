//set up mongo client
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require('fs');

let rawconfig = fs.readFileSync('config.json');
let config = JSON.parse(rawconfig);

// Connection URI
const uri = config["mongodb_uri"];
console.log(uri);

/*
 * Get all products in bookstore/products
 * params:
 * response: AJAX response
 */
exports.getProducts = function(response) {
    MongoClient.connect(uri, function(err, db) {
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
    MongoClient.connect(uri, function(err, db) {
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

/*
 * Get all products that belong to "filter" category
 * params:
 * response: AJAX response
 * filter: filter to match category with
 */
exports.getProductsFilter = function(response, filter) {
    MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a GET /filter request with filter: " + filter);
        var col = db.collection('products');
        col.find({category: filter}).toArray(function(err,docs) {
            if (err) {
                response.status(500);
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
    MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a POST /checkout request - updating DB");
        var col = db.collection('products');
        col.find({product: item}).toArray(function(err,docs) {
            if (err) {
                response.status(500).send();
            }
            origQuantity = docs[0].quantity;
            if (docs[1]) {
                //should not be a duplicate...
                response.status(500).send();
            }
            newQuantity = origQuantity - subtraction;
            if (newQuantity < 0) {
                response.status(500).send();
            }
            col.updateOne({product: item}, {$set:{quantity: newQuantity}}, function(err) {
                if (err) {
                    response.status(500).send();
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
    MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a POST /checkout request - adding order");
        var col = db.collection('orders');
        var jsonString = JSON.stringify(order);
        col.insertOne({cart: jsonString, total: totalPrice}, function(err) {
            if (err) {
                response.status(500);
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
    MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Serving a POST /user request");
        var col = db.collection('users');
        col.insertOne({token: token}, function(err) {
            if (err) {
                response.status(500).send();
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
    MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Checking authentication");
        var col = db.collection('users');
        col.find({token: token}).toArray(function(err, doc) {
            if (err) {
                response.status(500).send();
            }
            if (doc.length < 1) {
                response.status(401).send();
            }
            db.close();
        });
    });
};

/*
 * For privileged users to restore DB to default values
 * params:
 * response: AJAX response
 * token: username, i.e. the user's authentication token
 */
exports.restoreDb = function(response) {
    MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Deleting products");
        db.collection('products').remove(function(){
            db.collection('products').insertMany([
                { product: 'Box1',          price: 10,  quantity: 100,  dispName: "Clear box",
                    url: 'images/Box1.png',
                    category: 'stationary'},
                { product: 'Box2',          price: 5,   quantity: 50,   dispName: "Colored box",
                    url: 'images/Box2.png',
                    category: 'stationary'},
                { product: 'Clothes1',      price: 20,  quantity: 25,   dispName: "Dress",
                    url: 'images/Clothes1.png',
                    category: 'clothing'},
                { product: 'Clothes2',      price: 30,  quantity: 50,   dispName: "Dye shirt",
                    url: 'images/Clothes2.png',
                    category: 'clothing'},
                { product: 'Jeans',         price: 50,  quantity: 75,   dispName: "Jeans",
                    url: 'images/Jeans.png',
                    category: 'clothing'},
                { product: 'KeyboardCombo', price: 40,  quantity: 10,   dispName: "Gaming combo",
                    url: 'images/KeyboardCombo.png',
                    category: 'tech'},
                { product: 'Keyboard',      price: 20,  quantity: 10,   dispName: "Mechanical keyboard",
                    url: 'images/Keyboard.png',
                    category: 'tech'},
                { product: 'Mice',          price: 20,  quantity: 25,   dispName: "Gaming mouse",
                    url: 'images/Mice.png',
                    category: 'tech'},
                { product: 'PC1',           price: 350, quantity: 20,   dispName: "Dell computer",
                    url: 'images/PC1.png',
                    category: 'tech'},
                { product: 'PC2',           price: 400, quantity: 5,    dispName: "Used Compaq",
                    url: 'images/PC2.png',
                    category: 'tech'},
                { product: 'PC3',           price: 300, quantity: 15,   dispName: "Used Dell",
                    url: 'images/PC3.png',
                    category: 'tech'},
                { product: 'Tent',          price: 35,  quantity: 5,    dispName: "Tent",
                    url: 'images/Tent.png',
                    category: 'supplies'}
            ], function() {
                response.status(200).send();
            });
        });
    });
};


