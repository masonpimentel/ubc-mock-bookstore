var modal = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close")[0];

//displays the cart modal
function displayCart() {
    inactiveTime = 0;
    modal.style.display = "block";

    refreshModal();
}

//refreshes the modal contents
function refreshModal() {
    var emptyCart = true;
    var product;
    var productQuantity;
    var productPrice;
    var productName;
    var table = document.getElementById("modalTable");
    //iterate over the number of products
    for (var i=0; i<productList.length; i++) {
        product = productList[i].id;
        //check if product is in cart
        if (cart[product]) {
            //change emptyCart to false if a product is ever found in cart
            emptyCart = false;
            //for this product, determine the quantity
            productQuantity = cart[product];
            //for this product, find the price
            productPrice = products[product].price;
            //for this product, find the name (caption)
            productName = products[product].caption;
            var oldCartEntry = document.getElementById("modalEntry" + product);
            //if oldCartEntry exists, update it
            if (oldCartEntry != null) {
                updateCartEntry(productName, productQuantity);
            }
            //otherwise, create a new entry
            else {
                createCartEntry(true, "modalEntry" + product, productName, productPrice, productQuantity, product);
            }
        }
        //check to see if the item needs to be removed
        else {
            var cartEntry = document.getElementById("modalEntry" + product);
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
    modalPriceTotal.innerHTML = "$" + totalCartValue();
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
        priceCell.textContent = price;
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

//updates the quantity of 'productName' cart entry
function updateCartEntry(productName, newQuantity) {
    var quantityCell = document.getElementById("cartQuantity" + productName);
    quantityCell.textContent = newQuantity;
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
