var products = {};
var productsReady = false;

//this is here to initialize each product with "caption" property which comes from the page's markup
var productList = document.getElementsByClassName("product");
for (var i=0; i<productList.length; i++) {
    //create a new property in products object for each product
    products[productList[i].id] = {
        caption: productList[i].getElementsByClassName("caption")[0].textContent
    }
}

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
                    products[item].quantity = result[item].quantity;
                    products[item].price = result[item].price;
                }
                //update markup
                insertInitialPrices();
                //show the add buttons
                showAddButtons();
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
            window.alert("Timeout after " + REQUEST_TIMEOUT + " ms, retrying.");
        }
        initProductsAjax();
    }
    request.send();
}

//product initialization
initProductsAjax();

function updateProducts(productName, quantity) {
    products[productName].quantity = quantity;
}

//this inserts all the prices into the page markup
//should be called right after initial AJAX request succeeds
function insertInitialPrices() {
    var price;

    var productsList = document.getElementsByClassName("product");
    for (var i=0; i<productsList.length; i++){
        price = productsList[i].getElementsByClassName("price")[0];
        price.textContent = "$" + products[productsList[i].id].price;
    }
}