db = db.getSiblingDB('bookstore');

var size = db.products.dataSize();
print("Current size of products collection: " + size);
if (size > 0) {
    print("Clearing bookstore DB");
    db.products.deleteMany({});
}

try {
    db.products.insertMany(
        [
            { product: 'Box1',          price: 10,  quantity: 100,
                url: 'https://cpen400a.herokuapp.com/images/Box1.png' },
            { product: 'Box2',          price: 5,   quantity: 50,
                url: 'https://cpen400a.herokuapp.com/images/Box2.png' },
            { product: 'Clothes1',      price: 20,  quantity: 25,
                url: 'https://cpen400a.herokuapp.com/images/Clothes1.png' },
            { product: 'Clothes2',      price: 30,  quantity: 50,
                url: 'https://cpen400a.herokuapp.com/images/Clothes2.png' },
            { product: 'Jeans',         price: 50,  quantity: 75,
                url: 'https://cpen400a.herokuapp.com/images/Jeans.png' },
            { product: 'KeyboardCombo', price: 40,  quantity: 10,
                url: 'https://cpen400a.herokuapp.com/images/KeyboardCombo.png' },
            { product: 'Keyboard',      price: 20,  quantity: 10,
                url: 'https://cpen400a.herokuapp.com/images/Keyboard.png' },
            { product: 'Mice',          price: 20,  quantity: 25,
                url: 'https://cpen400a.herokuapp.com/images/Mice.png' },
            { product: 'PC1',           price: 350, quantity: 20,
                url: 'https://cpen400a.herokuapp.com/images/PC1.png' },
            { product: 'PC2',           price: 400, quantity: 5,
                url: 'https://cpen400a.herokuapp.com/images/PC2.png' },
            { product: 'PC3',           price: 300, quantity: 15,
                url: 'https://cpen400a.herokuapp.com/images/PC3.png' },
            { product: 'Tent',          price: 35,  quantity: 5,
                url: 'https://cpen400a.herokuapp.com/images/Tent.png' }
        ]
    );
} catch(e) {
    print(e);
}