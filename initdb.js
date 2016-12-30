db = db.getSiblingDB('bookstore');

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

try {
    db.products.insertMany(
        [
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
        ]
    );
} catch(e) {
    print(e);
}