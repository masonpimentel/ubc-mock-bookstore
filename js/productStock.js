var products = {};

//product initialization
var productList = document.getElementsByClassName("product");
for (var i=0; i<productList.length; i++) {
    //create a new property in products object for each product
    products[productList[i].id] = {
        quantity: productList[i].getElementsByClassName("quantity")[0].textContent,
        price: productList[i].getElementsByClassName("price")[0].textContent,
        caption: productList[i].getElementsByClassName("caption")[0].textContent
    }
}

function updateMarkup(productName, quantity) {
    document.getElementById(productName).getElementsByClassName("quantity").innerHTML = quantity;
    products[productName].quantity = quantity;
}