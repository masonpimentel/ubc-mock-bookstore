var inactiveTime = 0;
var TIMEOUT_SEC = 30;

setInterval(incrementInactiveTime, 1000);

//every 1000ms this function is called and inactiveTime is incremented
function incrementInactiveTime() {
    inactiveTime++;
    if (inactiveTime == TIMEOUT_SEC) {
        inactiveTime = 0;
        window.alert("Hey there! Are you still planning to buy something?");
    }
}
