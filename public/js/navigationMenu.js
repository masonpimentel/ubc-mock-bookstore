function confirmCartEmptied() {
    if(totalCartValue() > 0) {
        return window.confirm("(Known limitation) Please note that your cart will be emptied. Proceed?");
    }
    else {
        return true;
    }
}

function clearUpdateReset() {
    clearCartAndRemoveButtons();
    updateCartButton();
    resetTimer();
}

function removeFilter() {
    if (confirmCartEmptied()) {
        ajaxRequest("filter", 0, "*");
        clearUpdateReset();
    }
}

function booksFilter() {
    if (confirmCartEmptied()) {
        ajaxRequest("filter", 0, "books");
        clearUpdateReset();
    }
}

function clothingFilter() {
    if (confirmCartEmptied()) {
        ajaxRequest("filter", 0, "clothing");
        clearUpdateReset();
    }
}

function techFilter() {
    if (confirmCartEmptied()) {
        ajaxRequest("filter", 0, "tech");
        clearUpdateReset();
    }
}

function giftsFilter() {
    if (confirmCartEmptied()) {
        ajaxRequest("filter", 0, "gifts");
        clearUpdateReset();
    }
}

function stationaryFilter() {
    if (confirmCartEmptied()) {
        ajaxRequest("filter", 0, "stationary");
        clearUpdateReset();
    }
}

function suppliesFilter() {
    if (confirmCartEmptied()) {
        ajaxRequest("filter", 0, "supplies");
        clearUpdateReset();
    }
}