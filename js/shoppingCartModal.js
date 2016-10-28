var modal = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close")[0];

function displayCart() {
    modal.style.display = "block";

    /*
    var emptyCart = true;
    var firstItem = true;
    var product;
    var itemCount = 0;
    var alertToQueue;
    var productQuantity;

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
            alertToQueue = "Item " + itemCount + " in cart: " + product + ". Quantity = " + productQuantity + ".\n"
                + "Note that there will be a 5 second delay until your next alert message.";
            //display right away if first item in cart
            if (firstItem) {
                window.alert(alertToQueue);
                firstItem = false;
            }
            //otherwise put the alert on the queue and set the timeout
            else {
                alertMessageQueue[alertMessageQueue.length] = alertToQueue;
            }
        }
    }
    if (emptyCart) {
        window.alert("Cart is empty!");
    }
    //put "end of cart" on message queue
    //and call displayAlert in 5 seconds
    else {
        alertMessageQueue[alertMessageQueue.length] = "End of cart.";
        setTimeout(displayAlert, 5000);
    }
    */
}

function displayAlert() {
    //check if the alert queue is not empty
    if(alertMessageQueue[0]) {
        window.alert(alertMessageQueue[0]);
        var message = alertMessageQueue[0];
        //shift the queue up
        alertMessageQueue.shift();
        //before returning, set displayAlert to be called again in 5 seconds
        //unless "End of cart"
        if (!message.includes("End of cart.")) {
            setTimeout(displayAlert, 5000);
        }
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
