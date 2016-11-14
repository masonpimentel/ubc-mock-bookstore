var inactiveTime = 0;

document.getElementById("timerVal").style.color = "green";
document.getElementById("timerVal").innerHTML = String(TIMEOUT_SEC);

setInterval(incrementInactiveTime, 1000);

/*
 * Every 1000ms this function is called and inactiveTime is incremented
 * Color is changed to yellow when half time is up
 * Color is changed to red when quarter time remains
 */
function incrementInactiveTime() {
    inactiveTime++;
    //update the timer in the footer
    var diff = String(TIMEOUT_SEC - inactiveTime);
    document.getElementById("timerVal").innerHTML = diff;
    if (diff/TIMEOUT_SEC < .25) {
        document.getElementById("timerVal").style.color = "red";
    }
    else if (diff/TIMEOUT_SEC < .5) {
        document.getElementById("timerVal").style.color = "yellow";
    }
    else {
        document.getElementById("timerVal").style.color = "green";
    }
    if (inactiveTime == TIMEOUT_SEC) {
        inactiveTime = 0;
        window.alert("Hey there! Are you still planning to buy something?");
        document.getElementById("timerVal").style.color = "green";
        document.getElementById("timerVal").innerHTML = String(TIMEOUT_SEC);
    }
}
