//timeout for AJAX request (ms)
var REQUEST_TIMEOUT = 1000;

//user timeout
var TIMEOUT_SEC = 5;

//show debug messages for cart content updates
var DEBUG_CART_CONTENTS = false;

//show debug messages for AJAX request
var DEBUG_AJAX = false;

//show debug messages for product and cart contents
var DEBUG_PRODUCTS_AND_CART = false;

//show debug messages for username
var DEBUG_USERNAME = false;

//constant for the name of the stylesheet that determines
//the css for "remove" button
var PRODUCTS_STYLESHEET = "products_style.css";

//ajax url
//port should be 5000
var AJAX_URL = "https://ubcmockbookstore.herokuapp.com";

//prompt for username at the beginning
var PROMPT_USERNAME = true;

//length of random string for usernames
//default if user does not set their username
//"user" + <RANDOM_STRING_LENGTH random chars>
var RANDOM_STRING_LENGTH = 5;

//maximum number of request attempts
var AJAX_MAX_ATTEMPTS = 10;

//quickfix to deal with request being made before purchase is complete
var purchaseLock = false;
