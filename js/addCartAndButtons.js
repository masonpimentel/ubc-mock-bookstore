var productListInit = document.getElementsByClassName("product");
var cart = document.getElementById("cartContainer").innerHTML;

//skip the first one
for (var i=1; i<productListInit.length; i++){
    productListInit[i].innerHTML += cart;
}