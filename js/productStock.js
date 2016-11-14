var products = {};

//used for the initial AJAX request for quantity and price information
function initProductsAjax() {
    var request = new XMLHttpRequest();
    request.timeout = REQUEST_TIMEOUT;
    request.open("GET", AJAX_URL);
    request.onload = function () {
        if (this.status == 200) {
            if (DEBUG_AJAX) {
                window.alert("AJAX request success!");
            }
            //check if response is JSON - lecture example doesn't work so did it like this
            if (this.getResponseHeader("Content-type").indexOf('json') > -1) {
                var result = JSON.parse(this.responseText);
                for (var item in result) {
                    products[item] = {
                        //create quantity and price properties for each product
                        quantity: result[item].quantity,
                        price: result[item].price
                    }
                    //add the product to the web page
                    addProductToPage(item, result[item].url, result[item].price, item);
                }
                //apply the cart container (add the cart overlay and add button)
                applyCartContainer()
                //show the add buttons
                showAddButtons();
                //remove the "please wait"
                var wait = document.getElementById("pleaseWait");
                wait.style.display = "none";
            }
            else {
                throw("Response type was not JSON");
            }
        }
        else {
            if (DEBUG_AJAX) {
                window.alert("Error " + this.status + ", retrying.");
            }
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

function updateProductsAjax() {
    var request = new XMLHttpRequest();
    request.timeout = REQUEST_TIMEOUT;
    request.open("GET", AJAX_URL);
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
                //hide the loader again - check if it's there
            }
            else {
                throw("Response type was not JSON");
            }
        }
        else {
            if (DEBUG_AJAX) {
                window.alert("Error " + this.status + ", retrying.");
            }
            updateProductsAjax();
        }
    }
    request.onerror = function() {
        if (DEBUG_AJAX) {
            window.alert("Error " + this.status + ", retrying.");
        }
        updateProductsAjax();
    }
    request.ontimeout = function() {
        if (DEBUG_AJAX) {
            window.alert("Timeout after " + REQUEST_TIMEOUT + " ms, retrying.");
        }
        updateProductsAjax();
    }
    request.send();
}

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