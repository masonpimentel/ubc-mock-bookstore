//this applies the cartContainer template to each product
function applyCartContainer() {
    var productListInit = document.getElementsByClassName("product");
    var cart = document.getElementById("cartContainer").innerHTML;

    var productName;
    for (var i=0; i<productListInit.length; i++){
        productName = productListInit[i].id;
        //need to get the original template again
        cart = document.getElementById("cartContainer").innerHTML;
        //replace 'productName' with the actual product name
        cart = cart.replace(/productName/g, productName);
        //replace 'addId' with 'add' + id
        cart = cart.replace(/addId/g, "add" + productName);
        //replace 'removeId' with 'remove' + id
        cart = cart.replace(/removeId/g, "remove" + productName);
        productListInit[i].innerHTML += cart;
    }
}

/* Creates a product on the web page (i.e adds to the HTML markup)
 *
 * params:
 * id: product id
 * img: source of the image
 * price: product price
 * quantity: product quantity
 * figcaption: the caption for the product
 */
function addProductToPage(id, imgsrc, price, figcaption) {
    /* each product should have the following structure:
     <div id="productList" class="col-70percent">
        <figure>
            <div class="product" id="Box1">
                <img src="images\Box1.png" alt="box1">
                <div class="price">Loading...</div>
            </div>
        <figcaption>Clear box</figcaption>
     </figure>
     */
    var productList = document.getElementById("productList");
    var newProduct = document.createElement("figure");

    var productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.id = id;

    var productImg = document.createElement("IMG");
    productImg.src = imgsrc;
    productImg.alt = id;

    var productPrice = document.createElement("div");
    productPrice.className = "price";
    productPrice.appendChild(document.createTextNode("$" + price));

    var productCaption = document.createElement("figcaption");
    productCaption.appendChild(document.createTextNode(figcaption));

    productDiv.appendChild(productImg);
    productDiv.appendChild(productPrice);

    newProduct.appendChild(productDiv);
    newProduct.appendChild(productCaption);

    productList.appendChild(newProduct);
}

function createCssRule(rule, id) {
    var css = document.createElement("style");
    css.type = "text/css";
    css.textContent = rule;
    if (id) {
        css.id = id;
    }

    return css;
}

//shows the add buttons after the initial AJAX request is completed
function showAddButtons() {
    var rule = createCssRule(".product:hover .add { display: block; background: rgba(0,128,0,.8); }");
    document.head.appendChild(rule);
}

//shows the remove button for when the item is first added to the cart
function showRemoveButton(productName) {
    var rule = createCssRule(".product:hover #remove" + productName + " { display: block; background: " +
        "rgba(255,0,0,.8); }", "remove" + productName);
    document.head.appendChild(rule);
    //modify style for productName's add button
    var addButton = document.getElementById("add" + productName);
    addButton.style.width = 70;
    addButton.style.left = 20;
}

//hides the remove button for when the item is no longer in the cart
function hideRemoveButton(productName) {
    /*
     * Workaround for the Chrome bug!!
     * Instead of using cssText, just find the element which is added to document.head
     * This is much cleaner and how it should have been done in the first place...
     */
    var removeRule = document.getElementById("remove" + productName);
    removeRule.parentNode.removeChild(removeRule);

    //modify style for productName's add button
    var addButton = document.getElementById("add" + productName);
    addButton.style.width = 130;
    addButton.style.left = 30;
}
