db = db.getSiblingDB('heroku_5ccjf782');

var size = db.products.dataSize();
if (size > 0) {
    print("Clearing products in bookstore DB");
    db.products.deleteMany({});
}

var sizeOrders = db.orders.dataSize();
if (sizeOrders > 0) {
    print("Clearing orders in bookstore DB");
    db.orders.deleteMany({});
}

var sizeUsers = db.users.dataSize();
if (sizeUsers > 0) {
    print("Clearing users in bookstore DB");
    db.users.deleteMany({});
}