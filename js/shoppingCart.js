var cart;

var products = {};

//product initialization
var productList = document.getElementsByClassName("product");
var productListElement = 0;
for (var i=0; i<productList.length; i++) {
    products[productList[i].id] = productList[i].getElementsByClassName("quantity")[0].textContent;
    productListElement++;
}

var inactiveTime = 0;

function addToCart(productName) {
    window.alert("Adding " + productName + " to cart!");
}

function removeFromCart(productName) {
    window.alert("Removing " + productName + " from cart!");
}