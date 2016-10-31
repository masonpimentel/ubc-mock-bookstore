/*
 * This file applies the cartContainer template to each product
 */

var productListInit = document.getElementsByClassName("product");
var cart = document.getElementById("cartContainer").innerHTML;

var productName;
for (var i=0; i<productListInit.length; i++){
    productName = productListInit[i].id;
    //need to get the original template again
    cart = document.getElementById("cartContainer").innerHTML;
    //replace 'productName' with the actual product name
    cart = cart.replace(/productName/g, productName);
    //replace 'addId' with 'add' + id
    cart = cart.replace(/addId/g, "add" + productName);
    //replace 'removeId' with 'remove' + id
    cart = cart.replace(/removeId/g, "remove" + productName);
    productListInit[i].innerHTML += cart;
}