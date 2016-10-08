var cart;

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
    var quantity = products[productName] - 1;
    if (quantity == -1) {
        window.alert("Sorry not in stock!");
        return;
    }
    //update the markup and products object
    updateQuantity(productName, quantity)
    window.alert("Adding " + productName + " to cart! Quantity now = " + quantity);
}

function removeFromCart(productName) {
    var quantity = products[productName] + 1;
    //update the markup and products object
    updateQuantity(productName, quantity);   
    window.alert("Removing " + productName + " from cart! Quantity now = " + quantity);
}