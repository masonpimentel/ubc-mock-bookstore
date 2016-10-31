var modal = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close")[0];

function displayCart() {
    inactiveTime = 0;
    modal.style.display = "block";

    var emptyCart = true;
    var product;
    var itemCount = 0;
    var productQuantity;
    var productPrice;
    var productName;
    //iterate over the number of products
    for (var i=0; i<productList.length; i++) {
        product = productList[i].id;
        //check if product is in cart
        if (cart[product]) {
            itemCount++;
            //change emptyCart to false if a product is ever found in cart
            emptyCart = false;
            //for this product, determine the quantity
            productQuantity = cart[product];
            //for this product, find the price
            productPrice = products[product].price;
            //for this product, find the name (caption)
            productName = products[product].caption;
            //remove the cart entry
            var list = document.getElementById("modalList");
            var oldCartEntry = document.getElementById("modalEntry" + productName);
            if (oldCartEntry != null) {
                list.removeChild(oldCartEntry);
            }
            //create a new cart entry
            createCartEntry(true, "modalEntry" + productName, productName, productPrice, productQuantity, product);
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

function createCartEntry(notEmpty, id, productName, price, quantity, product) {
    var list = document.getElementById("modalList");
    var templateEntry = document.getElementById("modalEntryTemp");
    var newModalItem = templateEntry.cloneNode(true);
    newModalItem.style.display = "block";

    if (notEmpty == false) {
        //need to update the id to something unique
        newModalItem.id = id;
        //replace the product name
        newModalItem.children[0].innerHTML = "Empty cart!";
        newModalItem.children[0].id = "cartEmptyProduct";
        //replace the quantity
        newModalItem.children[1].innerHTML = "";
        newModalItem.children[1].id = "cartEmptyQuantity";
        //replace the price
        newModalItem.children[2].innerHTML = "";
        newModalItem.children[2].id = "cartEmptyQuantity";
        //hide the add/remove buttons
        newModalItem.children[3].style.display = "none";
        newModalItem.children[4].style.display = "none";
    }
    else {
        //need to update the id to something unique
        newModalItem.id = id;
        //replace the product name
        newModalItem.children[0].innerHTML = productName;
        newModalItem.children[0].id = "cartProduct" + productName;
        //replace the quantity
        newModalItem.children[1].innerHTML = quantity;
        newModalItem.children[1].id = "cartQuantity" + quantity;
        //replace the price
        newModalItem.children[2].innerHTML = price;
        newModalItem.children[2].id = "cartPrice" + price;
        //hook in the add/remove buttons
        newModalItem.children[3].onclick = function() { addToCart(product); };
        newModalItem.children[4].onclick = function() { removeFromCart(product); };
        //remove the empty cart entry if there
        var emptyCartNode = document.getElementById("cartEmpty");
        if (emptyCartNode != null) {
            list.removeChild(emptyCartNode);
        }
    }
    list.appendChild(newModalItem);
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
