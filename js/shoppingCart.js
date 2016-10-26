//"queue" for messages - simply use shift() to dequeue
var alertMessageQueue = [];

var cart = {};

var products = {};

//product initialization
var productList = document.getElementsByClassName("product");
for (var i=0; i<productList.length; i++) {
    //create a new property in products object for each product
    products[productList[i].id] = {
        quantity: productList[i].getElementsByClassName("quantity")[0].textContent,
        price: productList[i].getElementsByClassName("price")[0].textContent
    }
}

function updateQuantity(productName, quantity) {
    document.getElementById(productName).getElementsByClassName("quantity").innerHTML = quantity;
    products[productName] = quantity;
}

function addToCart(productName) {
    var stockQuantity = products[productName] - 1;
    if (stockQuantity == -1) {
        window.alert("Sorry not in stock!");
        return;
    }
    //increment productName property in cart
    if (!cart[productName]) {
        cart[productName] = 1;
    }
    else {
        cart[productName]++;
    }
    //update the markup and products object
    updateQuantity(productName, stockQuantity);
    window.alert("Adding " + productName + " to cart! stockQuantity now = " + stockQuantity +
        " cartQuantity = " + cart[productName]);
    inactiveTime = 0;
}

function removeFromCart(productName) {
    //check if the item is even in the cart
    if (!cart[productName]) {
        window.alert("You haven't added this to your cart yet!");
        return;
    }
    //decrement productName property in cart
    cart[productName]--;
    //should delete the property if quantity in cart is 0
    if (cart[productName] == 0) {
        delete cart[productName];
    }
    var stockQuantity = products[productName] + 1;
    //update the markup and products object
    updateQuantity(productName, stockQuantity);
    if (cart[productName]) {
        window.alert("Removing " + productName + " from cart! stockQuantity now = " + stockQuantity +
            " cartQuantity = " + cart[productName]);
    }
    else {
        window.alert("Removing " + productName + " from cart! stockQuantity now = " + stockQuantity +
            " cartQuantity = 0");
    }
    inactiveTime = 0;
}

function displayAlert() {
    //check if the alert queue is not empty
    if(alertMessageQueue[0]) {
        window.alert(alertMessageQueue[0]);
        var message = alertMessageQueue[0];
        //shift the queue up
        alertMessageQueue.shift();
        //before returning, set displayAlert to be called again in 5 seconds
        //unless "End of cart"
        if (!message.includes("End of cart.")) {
            setTimeout(displayAlert, 5000);
        }
    }
}

function displayCart() {
    var emptyCart = true;
    var firstItem = true;
    var product;
    var itemCount = 0;
    var alertToQueue;
    var productQuantity;

    //iterate over the number of products
    for (var i=0; i<productList.length; i++) {
        product = productList[i].id;
        //check if product is in cart
        if (cart[product]) {
            itemCount++;
            //change emptyCart to false if a product is ever found in cart
            emptyCart = false;
            //for this product, determine the quantity
            productQuantity = cart[product];
            alertToQueue = "Item " + itemCount + " in cart: " + product + ". Quantity = " + productQuantity + ".\n"
                + "Note that there will be a 5 second delay until your next alert message.";
            //display right away if first item in cart
            if (firstItem) {
                window.alert(alertToQueue);
                firstItem = false;
            }
            //otherwise put the alert on the queue and set the timeout
            else {
                alertMessageQueue[alertMessageQueue.length] = alertToQueue;
            }
        }
    }
    if (emptyCart) {
        window.alert("Cart is empty!");
    }
    //put "end of cart" on message queue
    //and call displayAlert in 5 seconds
    else {
        alertMessageQueue[alertMessageQueue.length] = "End of cart.";
        setTimeout(displayAlert, 5000);
    }
}