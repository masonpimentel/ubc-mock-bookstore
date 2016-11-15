var products = {};

/* Creates an AJAX request to AJAX_URL
 *
 * params:
 * type: either "init" for inital request or "update" for update
 */
function ajaxRequest(type) {
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
                if (type == "init") {
                    initRequest(result);
                }
                else if (type == "update") {
                    updateRequest(result);
                }
                else {
                    throw("Unknown AJAX request type.")
                }
            }
            else {
                throw("Response type was not JSON");
            }
        }
        else {
            if (DEBUG_AJAX) {
                window.alert("Error " + this.status + ", retrying.");
            }
            ajaxRequest(type);
        }
    }
    request.onerror = function() {
        if (DEBUG_AJAX) {
            window.alert("Error " + this.status + ", retrying.");
        }
        ajaxRequest(type);
    }
    request.ontimeout = function() {
        if (DEBUG_AJAX) {
            window.alert("Timeout after " + REQUEST_TIMEOUT + " ms, retrying.");
        }
        ajaxRequest(type);
    }
    request.send();
}

//product initialization
ajaxRequest("init");

function initRequest(result) {
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

function updateRequest(result) {
    var res = true;
    var numItems = 0;
    for (var item in result) {
        //check if different quantity or price
        var oldQuantity = products[item].quantity;
        var newQuantity = result[item].quantity;
        var oldPrice = products[item].price;
        var newPrice = result[item].price;

        if (cart[item]) {
            numItems++;
            if (oldQuantity != newQuantity) {
                //alert user if no longer in stock
                if (newQuantity == 0) {
                    window.alert("OS");
                    res = window.confirm("Sorry, " + item + " is no longer in stock. This item will be removed" +
                        "from your cart. Click on OK to continue, or Cancel to cancel purchase.");
                    if (res == false) {
                        window.alert("Purchase cancelled.");
                        hideLoading();
                        break;
                    }
                }
                //alert user if new quantity is less than what the user wants
                if (newQuantity < cart[item]) {
                    window.alert(item + "," + oldQuantity + "," + newQuantity);
                    res = window.confirm("Sorry, " + item + " is no longer in enough quantity to " +
                        "fulfill your " + "purchase. Your quantity will be updated from " + oldQuantity +
                        " to " + newQuantity + ". Click on OK to continue, or Cancel to cancel purchase.");
                    if (res == false) {
                        window.alert("Purchase cancelled.");
                        hideLoading();
                        break;
                    }
                    //update cart
                    cart[item] = newQuantity;
                }

                //update page
            }
            if (oldPrice != newPrice) {
                //if so, update cart
                window.alert(item + "," + oldPrice + "," + newPrice);
                res = window.confirm("Please note that the price for " + item + " has changed, it was $" +  oldPrice
                    + " but now it is $" + newPrice + ". Click on OK to continue, or Cancel to cancel purchase.");
                if (res == false) {
                    window.alert("Purchase cancelled.");
                    hideLoading();
                    break;
                }
                //update page
            }
        }
    }
    if (numItems == 0) {
        window.alert("Cart is empty.");
        hideLoading();
    }
    if (res && numItems > 0) {
        window.alert("Purchase complete! Thank you.");
        hideLoading();
    }
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