var usernameModal = document.getElementById("userModal");
var userCloseButton = document.getElementById("userclose");

//displays the username modal
function displayUsername() {
    usernameModal.style.display = "block";
}

//called if the user decides not to provide a username
function randomUsername() {
    username = "user_" + randomUserId(RANDOM_STRING_LENGTH);
    window.alert("Welcome! We have randomly generated the following username for you: " + username);
}

//to close
userCloseButton.onclick = function() {
    usernameModal.style.display = "none";
    randomUsername();
    initializeUserAndProducts();
};

//also close if user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == usernameModal) {
        usernameModal.style.display = "none";
        randomUsername();
        initializeUserAndProducts();
    }
};

//handler for esc key
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27 && username != "") {
        usernameModal.style.display = "none";
        randomUsername();
        initializeUserAndProducts();
    }
});

function usernameSubmit() {
    //well.. i meant to just do this for fun but went a little overkill
    var regex = /^([a-z0-9_-]){2,10}$/;
    username = document.getElementById("uname").value;
    if (regex.test(username) == false) {
        //show tooltip
        window.alert("Alphanumeric, 2 to 10 characters long, and lower case characters only please!");
        return;
    }
    usernameModal.style.display = "none";
    //put the username in the db
    window.alert("Welcome, " + username + "!");
    initializeUserAndProducts();
}

//display the modal at the start
//note that if the user decides not to enter a username, their token will be randomized
if (PROMPT_USERNAME) {
    displayUsername();
}
else {
    username = "user_" + randomUserId(RANDOM_STRING_LENGTH);
    if (DEBUG_USERNAME) {
        window.alert("Welcome, " + username + "!");
    }
    initializeUserAndProducts();
}

