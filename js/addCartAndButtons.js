var productListInit = document.getElementsByClassName("product");
var cart = document.getElementById("cartContainer").innerHTML;

var productName;
for (var i=0; i<productListInit.length; i++){
    productName = productListInit[i].id;
    cart = cart.replace("productName", productName);
    productListInit[i].innerHTML += cart;
}