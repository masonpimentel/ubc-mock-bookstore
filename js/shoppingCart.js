var cart;

var product = {};

//product initialization
var productList = document.getElementsByClassName("product");
var productListElement = 0;
for (var i=0; i<productList.length; i++) {
    product[productList[i].id] = productList[i].getElementsByClassName("quantity")[0].textContent;
    productListElement++;
}

var inactiveTime = 0;

function addToCart(productName) {

}

function removeFromCart(productName) {

}