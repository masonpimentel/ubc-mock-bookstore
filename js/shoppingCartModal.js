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
            productPrice = product[product].price;
            //create a string
            //alertToQueue = "Item " + itemCount + " in cart: " + product + ". Quantity = " + productQuantity + ".\n"
             //   + "Note that there will be a 5 second delay until your next alert message.";
            //display right away if first item in cart
        }
    }
    if (emptyCart) {
        createCartEntry(false);
    }
}

function createCartEntry(notEmpty, id, product, price, quantity) {
    if (notEmpty == false) {
        var templateEntry = document.getElementById("modalEntryTemp");
        var newModalItem = templateEntry.cloneNode(true);
        newModalItem.style.display = "block";

        //need to update the id to something unique
        newModalItem.id = "cartEmpty";
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

        var list = document.getElementById("modalList");
        list.appendChild(newModalItem);
    }
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
