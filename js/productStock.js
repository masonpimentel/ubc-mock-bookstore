var products = {};
var productsReady = false;

function initProductsAjax() {
    var request = new XMLHttpRequest();
    request.timeout = REQUEST_TIMEOUT;
    request.open("GET", "https://cpen400a.herokuapp.com/products");
    request.onload = function () {
        if (this.status == 200) {
            if (DEBUG_AJAX) {
                window.alert("AJAX request success!");
            }
            //check if response is JSON - lecture example doesn't work so did it like this
            if (this.getResponseHeader("Content-type").indexOf('json') > -1) {
                var result = JSON.parse(this.responseText);
                for (var item in result) {
                    //products[item].quantity = item.quantity;
                    //products[item].price = item.price;
                }
            }
            else {
                throw("Response type was not JSON");
            }
            productsReady = true;
        }
        else {
            if (DEBUG_AJAX) {
                window.alert("Error " + this.status + ", retrying.");
            }
            //setTimeout(function(){initProductsAjax()}, 500);
            initProductsAjax();
        }
    }
    request.onerror = function() {
        if (DEBUG_AJAX) {
            window.alert("Error " + this.status + ", retrying.");
        }
        initProductsAjax();
    }
    request.ontimeout = function() {
        if (DEBUG_AJAX) {
            window.alert("Timeout after " + TIMEOUT_SEC + " seconds, retrying.");
        }
        initProductsAjax();
    }
    request.send();
}

//product initialization
initProductsAjax();

var productList = document.getElementsByClassName("product");
for (var i=0; i<productList.length; i++) {
    //create a new property in products object for each product
    products[productList[i].id] = {
        //quantity: productList[i].getElementsByClassName("quantity")[0].textContent,
        //price: productList[i].getElementsByClassName("price")[0].textContent,
        caption: productList[i].getElementsByClassName("caption")[0].textContent
    }
}

function updateMarkup(productName, quantity) {
    document.getElementById(productName).getElementsByClassName("quantity").innerHTML = quantity;
    products[productName].quantity = quantity;
}