//declarations

var bval = 0;
var score = 0;
var movebricks_intid;
var genbricks_intid;
var game_intid;

//navigation functions
document.onkeydown = checkKey;

function checkKey(e) {
    var id = document.getElementById("car").parentNode.id;
    var src = document.getElementById(id);
    var car = document.getElementById("car");

    e = e || window.event;
    // left arrow

    if (e.keyCode == '37') {

        var target = document.getElementById(id).previousElementSibling;
        if (target) {
            src.removeChild(car);

            target.appendChild(car);
        }
    }
    // right arrow
    else if (e.keyCode == '39') {

        var target = document.getElementById(id).nextElementSibling;
        if (target) {
            src.removeChild(car);

            target.appendChild(car);
        }

    }
    // space key
    else if (e.keyCode == '32') {
        document.getElementById("game_cover").style.display = "block";
        reset();

    }

}
//start timer event functions
genbricks_intid = window.setInterval(generateBricks, 2000);
movebricks_intid = window.setInterval(moveBricks, 2000);
game_intid = window.setInterval(checkScore, 500);

//to reset the game on press of space key
function reset() {
    score = 0;
    bval = 0;

    var lanes = document.getElementsByClassName("lane");
    var len = lanes.length;

    for (var j = 0; j < len; j++) {
        lanes[j].innerHTML = "";
    }


    document.getElementById("game_cover").style.display = "none";
    //add car image on reset
    var cimg = document.createElement("img");
    cimg.src = "assets/img/car.png";
    cimg.id = "car";
    document.getElementById("lane2").appendChild(cimg);

    //start timer event functions
    genbricks_intid = window.setInterval(generateBricks, 2000);
    movebricks_intid = window.setInterval(moveBricks, 2000);
    game_intid = window.setInterval(checkScore, 1000);


}

//create new bricks 
function generateBricks() {

    //generate bricks randomly in 4 lanes
    var no_lanes = 4;
    var lno = Math.floor(Math.random() * no_lanes) + 1;

    var brickimg = document.createElement("img");
    brickimg.classList.add("brick");
    brickimg.id = "brick" + bval;
    brickimg.src = "../assets/img/brick.png";
    brickimg.style.top = "0px";
    document.getElementById("lane" + lno).appendChild(brickimg);
    bval++;

}



//to move bricks by 100px every 2s
function moveBricks() {
    var el = document.getElementsByClassName("brick");
    var car = document.getElementById("car")

    for (var i = 0; i < el.length; i++) {
        var currel = document.getElementById("brick" + i);
        var strlen = currel.style.top.length;
        var cnt = Number(currel.style.top.substring(0, strlen - 2));
        if (cnt < 660 && !currel.dataset.hit) {
            //check if car hits brick
            if (currel.offsetTop == car.offsetTop && currel.parentElement.id == car.parentElement.id) {
                currel.dataset.hit = true;
            } else {
                cnt += 100;
            }
        } else {
            if (!currel.dataset.checked) {
                currel.dataset.checked = true;
            }
        }
        document.getElementById("brick" + i).style.top = cnt.toString() + "px";
    }

}


//to check if game over and also calculate score
function checkScore() {
    var el = document.getElementsByClassName("brick");


    for (var i = 0; i < el.length; i++) {
        var currel = document.getElementById("brick" + i);
        var strlen = currel.style.top.length;
        var cnt = Number(currel.style.top.substring(0, strlen - 2));
        if (currel.dataset.hit == "true") {

            //clear all timer functions
            window.clearInterval(genbricks_intid);
            window.clearInterval(movebricks_intid);
            window.clearInterval(game_intid);
            document.getElementById("game_cover").style.display = "block";
            document.getElementById("score_val").innerText = score;

        } else if (cnt > 660 && currel.dataset.checked == "true") {
            score++;
            currel.dataset.checked = false;
        }

    }
}