/*
 * This file applies the cartContainer template to each product
 */

var productListInit = document.getElementsByClassName("product");
var cart = document.getElementById("cartContainer").innerHTML;

var productName;
//(for... in doesn't work because enumerable properties > length)
for (var i=0; i<productListInit.length; i++){
    productName = productListInit[i].id;
    //need to get the original template again
    cart = document.getElementById("cartContainer").innerHTML
    cart = cart.replace(/productName/g, productName);
    productListInit[i].innerHTML += cart;
}