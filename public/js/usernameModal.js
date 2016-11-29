var usernameModal = document.getElementById("userModal");
var userCloseButton = document.getElementById("userclose");

var username = "";
function randomUserId(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
username = "user_" + randomUserId(RANDOM_STRING_LENGTH);

//displays the username modal
function displayUsername() {
    usernameModal.style.display = "block";
}

//to close
userCloseButton.onclick = function() {
    usernameModal.style.display = "none";
};

//also close if user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == usernameModal) {
        usernameModal.style.display = "none";
    }
};

//handler for esc key
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) {
        usernameModal.style.display = "none";
    }
});

function usernameSubmit() {
    //well.. i meant to just do this for fun but went a little overkill
    var regex = /^([a-zA-Z0-9_-]){2,10}$/;
    username = document.getElementById("uname").value;
    if (regex.test(username) == false) {
        //show tooltip
        window.alert("Alphanumeric, 2 to 10 characters long please!");
        return;
    }
    usernameModal.style.display = "none";
    //put the username in the db
}

//display the modal at the start
//note that if the user decides not to enter a username, their token will be randomized
if (PROMPT_USERNAME) {
    displayUsername();
}

