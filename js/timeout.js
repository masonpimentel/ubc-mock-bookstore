//no multi-threading in JS???
var inactiveTime = 0;
var TIMEOUT_SEC = 30;

setInterval(incrementInactiveTime, 1000);

function incrementInactiveTime() {
    inactiveTime++;
    if (inactiveTime == TIMEOUT_SEC) {
        inactiveTime = 0;
        window.alert("Hey there! Are you still planning to buy something?");
    }
}
