var cart = {};

var products = {};

//product initialization
var productList = document.getElementsByClassName("product");
for (var i=0; i<productList.length; i++) {
    //create a new property in products object for each product
    //product property is set to the quantity element
    products[productList[i].id] = productList[i].getElementsByClassName("quantity")[0].textContent;
}

var inactiveTime = 0;

function updateQuantity(productName, quantity) {
    //TODO: question - do we need to update the markup?
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
    updateQuantity(productName, stockQuantity)
    window.alert("Adding " + productName + " to cart! stockQuantity now = " + stockQuantity +
        " cartQuantity = " + cart[productName]);
}

function removeFromCart(productName) {
    //decrement productName property in cart
    if (!cart[productName]) {
        window.alert("You haven't added this to your cart yet!");
        return;
    }
    //decrement productName property in cart
    cart[productName]--;
    var stockQuantity = products[productName] + 1;
    //update the markup and products object
    updateQuantity(productName, stockQuantity);
    window.alert("Removing " + productName + " from cart! stockQuantity now = " + stockQuantity +
        " cartQuantity = " + cart[productName]);
}