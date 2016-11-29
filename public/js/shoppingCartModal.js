var modal = document.getElementById("myModal");
var closeButton = document.getElementById("cartclose");

//displays the cart modal
function displayCart() {
    resetTimer();
    modal.style.display = "block";

    refreshModal();
}

//refreshes the modal contents
function refreshModal() {
    var emptyCart = true;
    var productQuantity;
    var productPrice;
    var productName;
    var table = document.getElementById("modalTable");
    //iterate over the number of products
    for (var item in products) {
        //check if product is in cart
        if (cart[item]) {
            //change emptyCart to false if a product is ever found in cart
            emptyCart = false;
            //for this product, determine the quantity
            productQuantity = cart[item];
            //for this product, find the price
            productPrice = products[item].price;
            //for this product, find the name (caption)
            productName = products[item].caption;
            var oldCartEntry = document.getElementById("modalEntry" + item);
            //if oldCartEntry exists, update it
            if (oldCartEntry != null) {
                updateCartEntry(productName, productQuantity, productPrice);
            }
            //otherwise, create a new entry
            else {
                createCartEntry(true, "modalEntry" + item, productName, productPrice, productQuantity, item);
            }
        }
        //check to see if the item needs to be removed
        else {
            var cartEntry = document.getElementById("modalEntry" + item);
            if (cartEntry != null) {
                table.deleteRow(cartEntry.rowIndex);
            }
        }
    }
    if (emptyCart) {
        if (!document.getElementById("cartEmpty")) {
            createCartEntry(false, "cartEmpty");
        }
    }
    var modalPriceTotal = document.getElementById("modalPriceTotal");
    modalPriceTotal.textContent = "$" + totalCartValue();
}

/* Creates a new cart entry
 *
 * params:
 * notEmpty: if the cart is empty or not
 * id: id for the new modal table row
 * productName: what will go in 'item' column
 * price: what will go in 'price' column
 * quantity: what will go in the 'quantity' column
 * product: used to hook in add/remove buttons - used as parameter for addToCart(productName) and
 *      removeFromCart(productName)
 */
function createCartEntry(notEmpty, id, productName, price, quantity, product) {
    var table = document.getElementById("modalTable");
    var newModalRow = table.insertRow(-1);
    var itemCell;
    var quantityCell;
    var priceCell;
    var addCell;
    var removeCell;
    newModalRow.style.textAlign = "center";

    //add an "empty cart!" message if the cart is empty
    if (notEmpty == false) {
        //need to update the id to something unique
        newModalRow.id = id;
        //add the product name
        itemCell = newModalRow.insertCell(-1);
        itemCell.textContent = "Empty cart!";
    }
    //otherwise create a complete row
    else {
        //need to update the id to something unique
        newModalRow.id = id;
        //add the product name
        itemCell = newModalRow.insertCell(-1);
        itemCell.textContent = productName;
        itemCell.id = "cartProduct" + productName;

        //add the price
        priceCell = newModalRow.insertCell(-1);
        priceCell.textContent = "$" + price;
        priceCell.id = "cartPrice" + productName;

        //add the quantity
        quantityCell = newModalRow.insertCell(-1);
        quantityCell.textContent = quantity;
        quantityCell.id = "cartQuantity" + productName;

        //add the add button
        addCell = newModalRow.insertCell(-1);
        var addButton = document.createElement("BUTTON");
        addButton.appendChild(document.createTextNode("+"));
        addButton.onclick = function() { addToCart(product); };
        addButton.className = "addModal";
        addCell.appendChild(addButton);

        //add the remove button
        removeCell = newModalRow.insertCell(-1);
        var removeButton = document.createElement("BUTTON");
        removeButton.appendChild(document.createTextNode("-"));
        removeButton.onclick = function() { removeFromCart(product); };
        removeButton.className = "removeModal";
        removeCell.appendChild(removeButton);

        //remove the empty cart entry if there
        var emptyCartNode = document.getElementById("cartEmpty");
        if (emptyCartNode != null) {
            table.deleteRow(emptyCartNode.rowIndex);
        }
    }
}

//updates the quantity and price of 'productName' cart entry
function updateCartEntry(productName, newQuantity, newPrice) {
    var quantityCell = document.getElementById("cartQuantity" + productName);
    quantityCell.textContent = newQuantity;
    var priceCell = document.getElementById("cartPrice" + productName);
    priceCell.textContent = "$" + newPrice;
}

//to close the modal
closeButton.onclick = function() {
    modal.style.display = "none";
};

//also close if user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//handler for esc key
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) {
        modal.style.display = "none";
    }
});

//show the modal loader
function showLoading() {
    //make loader and text visible
    var loader = document.getElementById("cartLoader");
    loader.style.display = "block";
    var loaderText = document.getElementById("loadingMessage");
    loaderText.style.display = "block";
    //hide price
    var text = document.getElementById("totalPrice");
    text.style.display = "none";
    var price = document.getElementById("modalPriceTotal");
    price.style.display = "none";
}

//hide the modal loader
function hideLoading() {
    if (document.getElementById("loadingMessage").style.display == "none" ||
        document.getElementById("cartLoader").style.display == "none") {
        throw("Loader disappeared.")
    }
    var loader = document.getElementById("cartLoader");
    loader.style.display = "none";
    var loaderText = document.getElementById("loadingMessage");
    loaderText.style.display = "none";
    var text = document.getElementById("totalPrice");
    text.style.display = "inline";
    var price = document.getElementById("modalPriceTotal");
    price.style.display = "inline";
}

//show complete purchase button
function showComplete() {
    var complete = document.getElementById("complete");
    complete.style.display = "block";
}

//hide purchase complete button
function hideComplete() {
    var complete = document.getElementById("complete");
    complete.style.display = "none";
}

//checkout button
function checkout() {
    showLoading();
    //GET request - not really necessary for A5, but we check that the stock is still sufficient
    ajaxRequest("update");
}

//complete purchase button
function complete() {
    debugCart("DC: \n");
    debugProducts("DC: \n");
    resetTimer();
    //POST request - don't actually update the DB until this point
    ajaxRequest("post");
    clearCartAndRemoveButtons();
    refreshModal();
    hideComplete();
    updateCartButton();
}
