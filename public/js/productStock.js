var products = {};

//product initialization
ajaxRequest("init");

/* Creates an AJAX request to AJAX_URL
 *
 * params:
 * type: either "init" for inital request or "update" for update
 */
function ajaxRequest(type, attempts) {
    var attempts = (typeof attempts !== 'undefined') ?  attempts : 1;
    var request = new XMLHttpRequest();
    request.timeout = REQUEST_TIMEOUT;
    if (type == "post") {
        request.open("POST", AJAX_URL + "/checkout");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    else {
        request.open("GET", AJAX_URL + "/products");
    }
    request.onload = function () {
        if (this.status == 200) {
            if (DEBUG_AJAX) {
                window.alert("AJAX request success!");
            }
            if (type == "post") {
                //POST request
                purchaseRequest();
            }
            else { //GET request (either "init" or "update")
                //check if response is JSON - lecture example doesn't work so did it like this
                if (this.getResponseHeader("Content-type").indexOf('json') > -1) {
                    var result = JSON.parse(this.responseText);
                    if (type == "init") {
                        initRequest(result);
                        debugProducts("AI: \n");
                    }
                    else if (type == "update") {
                        debugResponse("RC: \n", result);
                        updateRequest(result);
                        debugCart("AU: \n");
                        debugProducts("AU: \n");
                    }
                    else {
                        throw("Unknown AJAX request type.")
                    }
                }
                else {
                    throw("Response type was not JSON");
                }
            }
        }
        else {
            if (DEBUG_AJAX) {
                window.alert("Error " + this.status + ", retrying.");
            }
            attempts++;
            if (attempts == AJAX_MAX_ATTEMPTS) {
                throw("Max number of request attempts reached!");
            }
            ajaxRequest(type, attempts);
        }
    };
    request.onerror = function() {
        if (DEBUG_AJAX) {
            window.alert("Error " + this.status + ", retrying.");
        }
        attempts++;
        if (attempts == AJAX_MAX_ATTEMPTS) {
            throw("Max number of request attempts reached!");
        }
        ajaxRequest(type, attempts);
    };
    request.ontimeout = function() {
        if (DEBUG_AJAX) {
            window.alert("Timeout after " + REQUEST_TIMEOUT + " ms, retrying.");
        }
        attempts++;
        if (attempts == AJAX_MAX_ATTEMPTS) {
            throw("Max number of request attempts reached!");
        }
        ajaxRequest(type, attempts);
    };
    if (type == "post") {
        request.send(JSON.stringify(cart));
    }
    else {
        request.send();
    }

}

function initRequest(result) {
    for (var item in result) {
        products[result[item].product] = {
            //create quantity and price properties for each product
            quantity: result[item].quantity,
            price: result[item].price,
            caption: result[item].dispName
        };
        //add the product to the web page
        addProductToPage(result[item].product, result[item].url, result[item].price, result[item].dispName);
    }
    //apply the cart container (add the cart overlay and add button)
    applyCartContainer();
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
        //note that oldQuantity needs to account for the items that are currently in the cart
        var itemProduct = result[item].product;
        var oldQuantity = products[itemProduct].quantity;
        if (cart[itemProduct]) {
            oldQuantity = oldQuantity + cart[itemProduct];
        }
        var newQuantity = result[item].quantity;
        var oldPrice = products[itemProduct].price;
        var newPrice = result[item].price;

        //need to first update the quantities and prices in both the products variable and in the web page
        if (oldQuantity != newQuantity) {
            if (cart[itemProduct]) {
                if (newQuantity - cart[itemProduct] <= 0) {
                    //this case is addressed in the cart check
                    updateProductQuantity(result[item].product, 0);
                }
                else {
                    //there is no issue with amount available and cart contents
                    updateProductQuantity(result[item].product, newQuantity - cart[itemProduct]);
                }
            }
            else {
                updateProductQuantity(result[item].product, newQuantity);
            }

        }
        if (oldPrice != newPrice) {
            updateProductPrice(item, newPrice);
        }

        //for each item in the cart, ensure the user is okay with the relevant changes:
        //  1) if the item is no longer in stock
        //  2) if the item is in less availability now than what they want
        //  3) if the price has changed at all
        if (cart[itemProduct]) {
            numItems++;
            if (oldQuantity != newQuantity) {
                //alert user if no longer in stock
                if (newQuantity == 0) {
                    cart[itemProduct] = 0;
                    res = noLongerInStock(item);
                    if (res == false) {
                        window.alert("Purchase cancelled.");
                        hideLoading();
                        //if we're not going to complete the purchase, might as well stop updating the
                        //rest of the products
                        break;
                    }
                }
                //alert user if new quantity is less than what the user wants
                //this occurs when the newQuantity minus the amount in the cart is negative
                if (newQuantity - cart[itemProduct] < 0) {
                    var oldCartQ = cart[itemProduct];
                    cart[itemProduct] = newQuantity;
                    res = differentQuantity(item, newQuantity, oldCartQ);
                    if (res == false) {
                        window.alert("Purchase cancelled.");
                        hideLoading();
                        //if we're not going to complete the purchase, might as well stop updating the
                        //rest of the products
                        break;
                    }
                }
            }
            if (oldPrice != newPrice && newQuantity > 0) {
                //refreshing the modal will update the price in the cart
                res = differentPrice(item, newPrice, oldPrice);
                if (res == false) {
                    window.alert("Purchase cancelled.");
                    hideLoading();
                    //if we're not going to complete the purchase, might as well stop updating the
                    //rest of the products
                    break;
                }
            }
        }
    }
    resetTimer();
    refreshModal();
    hideLoading();
    if (numItems == 0) {
        window.alert("Cart is empty.");
    }
    else if (res && numItems > 0) {
        window.alert("Please review your cart before completing.");
        showComplete();
    }
    else {
        throw("Error occurred in updateRequest");
    }
}

function purchaseRequest() {
    window.alert("Yay POST request returned 200!");
    window.alert("Purchase complete! Thank you, " + username + ".");
}

//used to confirm if user is okay with removal of cart item
function noLongerInStock(item) {
    return window.confirm("Sorry, " + item + " is no longer in stock. This item will be removed from your cart. " +
        "Click on OK to continue, or Cancel to cancel purchase.");
}

//used to confirm if user is okay with reduced cart contents
function differentQuantity(item, newQuantity, oldQuantity) {
    return window.confirm("Sorry, " + item + " is no longer in enough quantity to fulfill your purchase. Your " +
        "quantity will be updated from " + oldQuantity + " to " + newQuantity + ". Click on OK to continue, or " +
        "Cancel to cancel purchase.");
}

//used to confirm if the user is ok with price change
function differentPrice(item, newPrice, oldPrice) {
    return window.confirm("Please note that the price for " + item + " has changed, it was $" + oldPrice + " but " +
        "now it is $" + newPrice + ". Click on OK to continue, or Cancel to cancel purchase.");
}

function updateProductQuantity(productName, quantity) {
    products[productName].quantity = quantity;
}

function updateProductPrice(productName, price) {
    products[productName].price = price;
    //update the page
    updateProductPriceOnPage(productName, price);
}

//debug function to list product stock
function debugProducts(initMessage) {
    if (DEBUG_PRODUCTS_AND_CART) {
        var alertString = initMessage;
        for (var key in products) {
            if (!products.hasOwnProperty(key)) continue;
            alertString = alertString + "Item: " + key + "\n";

            var item = products[key];
            for (var prop in item) {
                if (!item.hasOwnProperty(prop)) continue;
                alertString = alertString + prop + "=" + item[prop] + "\n";
            }
        }
        window.alert(alertString);
    }
}

//debug function to list request response
function debugResponse(initMessage, request) {
    if (DEBUG_PRODUCTS_AND_CART) {
        var alertString = initMessage;
        for (var key in request) {
            if (!request.hasOwnProperty(key)) continue;
            alertString = alertString + "Item: " + key + "\n";

            var item = request[key];
            var iteration = 0;
            var string1 = "";
            for (var prop in item) {
                if (!item.hasOwnProperty(prop)) continue;
                if (String(prop).indexOf("url") >= 0) continue;
                if (iteration == 0) {
                    string1 = string1 + prop + "=" + item[prop] + "\n";
                    iteration++;
                }
                else {
                    alertString = alertString + prop + "=" + item[prop] + "\n" + string1;
                    iteration = 0;
                    string1 = "";
                }
            }
        }
        window.alert(alertString);
    }
}