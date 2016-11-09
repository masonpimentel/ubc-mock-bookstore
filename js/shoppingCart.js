var cart = {};

//get the stylesheets
var sheetsList = document.styleSheets;
//search for "products_stylesheet.css - throw error if not found
var sheetIndex;
for (var i=0; i < sheetsList.length; i++) {
    var sheetLink = sheetsList[i].href;
    //noinspection JSUnresolvedFunction
    if (sheetLink.includes(PRODUCTS_STYLESHEET)) {
        sheetIndex = i;
        break;
    }
}
if (!sheetIndex) {
    throw "products_stylesheet.css not found";
}
var productsSheet = document.styleSheets[sheetIndex];

//shows the remove button for when the item is first added to the cart
function showRemoveButton(productName) {
    var rule = ".product:hover #remove" + productName + " { display: block; background: rgba(255,0,0,.8); }";
    //add rule at index 0
    productsSheet.insertRule(rule, 0);
    //modify style for productName's add button
    var addButton = document.getElementById("add" + productName);
    addButton.style.width = 70;
    addButton.style.left = 20;
}

//hides the remove button for when the item is no longer in the cart
function hideRemoveButton(productName) {
    //find the rule - temporal locality anyone?
    var rulesList = productsSheet.cssRules;
    for (var i=0; i<rulesList.length; i++) {
        var rule = rulesList[i].cssText;
        var toString = String(rule);
        //noinspection JSUnresolvedFunction
        if (toString.includes(productName)) {
            //delete the rule
            productsSheet.deleteRule(i);
            //hopefully temporal locality by assuming the user recently added the item
            //will be sufficient for runtime considerations
            break;
        }
    }
    //modify style for productName's add button
    var addButton = document.getElementById("add" + productName);
    addButton.style.width = 130;
    addButton.style.left = 30;
}

//add 'productName' to cart
function addToCart(productName) {
    var stockQuantity = products[productName].quantity - 1;
    if (stockQuantity == -1) {
        window.alert("Sorry not in stock!");
        return;
    }
    //increment productName property in cart
    if (!cart[productName]) {
        cart[productName] = 1;
        //show the remove button
        showRemoveButton(productName);
    }
    else {
        cart[productName]++;
    }
    //update the markup and products object
    updateMarkup(productName, stockQuantity);
    if (DEBUG_CART_CONTENTS) {
        window.alert("Adding " + productName + " to cart! stockQuantity now = " + stockQuantity +
            " cartQuantity = " + cart[productName]);
    }

    updateCartButton();
    refreshModal();
    inactiveTime = 0;
}

//removes 'productName' from cart
function removeFromCart(productName) {
    //check if the item is even in the cart
    if (!cart[productName]) {
        window.alert("You haven't added this to your cart yet!");
        return;
    }
    //decrement productName property in cart
    cart[productName]--;
    //should delete the property if quantity in cart is 0
    if (cart[productName] == 0) {
        delete cart[productName];
        //hide the remove button
        hideRemoveButton(productName);
    }
    var stockQuantity = products[productName].quantity + 1;
    //update the markup and products object
    updateMarkup(productName, stockQuantity);
    if (DEBUG_CART_CONTENTS) {
        if (cart[productName]) {
            window.alert("Removing " + productName + " from cart! stockQuantity now = " + stockQuantity +
                " cartQuantity = " + cart[productName]);
        }
        else {
            window.alert("Removing " + productName + " from cart! stockQuantity now = " + stockQuantity +
                " cartQuantity = 0");
        }
    }
    updateCartButton();
    refreshModal();
    inactiveTime = 0;
}

//updates the total dollar value of the cart button
function updateCartButton() {
    var cartString = "Cart ($" + totalCartValue() + ")";
    document.getElementById("showCart").innerHTML = cartString;
}

//finds the total dollar value of the cart
function totalCartValue() {
    var total = 0;
    var price;
    var quantity;
    for (var cartItem in cart) {
        price = products[cartItem].price.replace('$', '');
        price = parseInt(price);
        quantity = cart[cartItem];
        total += (price*quantity);
    }
    return total;
}




