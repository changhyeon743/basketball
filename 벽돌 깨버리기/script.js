var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");


var x=100;
var y=100;
var radius = 20;

var speed = 3;

var dx = speed;
var dy = speed;

var currentColor = "rgb(0,0,0)";

var paddleWidth = 100;
var paddleHeight = 10;
var paddleX = myCanvas.width/2-paddleWidth/2;

var leftKeyDown = false;
var rightKeyDown = false;

var bricks=[]

var brickInfo = {
    rowCount:5, 
    colCount:3,
    width:85,
    height:20
}

var padding = 10;

var mouseX = paddleX;

var score =0;

var collisionCheck = function() {
    for(let i=0;i<brickInfo.colCount*brickInfo.rowCount;i++) {
        if (!bricks[i].isDeleted &&
            x-radius > bricks[i].x &&
            x+radius < bricks[i].x+brickInfo.width &&
            y+radius > bricks[i].y &&
            y-radius < bricks[i].y+brickInfo.height ) {
                score++;
                dy *=-1;
                bricks[i].isDeleted = true;
            }
    }
        
}

var genRandomColor = function() {
    return "#"+((1<<24)*Math.random()|0).toString(16)
   // var colorStr = "rgb(";
    //colorStr+=Math.random()*256;
}


var initBricks = function() {
    for(let i=0; i<brickInfo.colCount; i++) {
        for(let j=0; j<brickInfo.rowCount; j++) {
            bricks.push({x:j*(brickInfo.width+padding),y:i*(brickInfo.height+padding),color:genRandomColor(),isDeleted:false});
        }
    }
}

var bricksRender = function() {
    bricks.forEach(element => {
        if (!element.isDeleted) {
            ctx.beginPath();
            ctx.rect(element.x,element.y,brickInfo.width,brickInfo.height);
            ctx.fillStyle = element.color;
            ctx.fill();
            ctx.closePath();
        }
        
    });
}



var scoreRender = function() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Score:"+score,8,20);
}


var ballRender = function() {
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    ctx.fillStyle = "#fff" ;
    ctx.fill();
    ctx.closePath();
}

var paddleRender = function() {
    ctx.beginPath();
    ctx.rect(paddleX,myCanvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "#0ff" ;
    ctx.fill();
    ctx.closePath();
}

var update = function() {

    x+=dx;
    y+=dy;
    if(x+radius >= myCanvas.width || x-radius <= 0) {
        dx *= -1;
    }
    if( y-radius <= 0) {
        dy *= -1;
    }
    
    if (y+radius >= myCanvas.height-paddleHeight && x > paddleX && x < paddleX+paddleWidth) {
        dy *= -1;
        y-=1
    }

    if (y+radius >= myCanvas.height) {
        alert("GAME OVER :(");
        clearInterval(gameID);
    }

    paddleX = mouseX-paddleWidth/2;
    if (leftKeyDown) {
        paddleX -=5;
    }
    else if (rightKeyDown) {
        paddleX +=5;
    }
}

var render = function() {
    ballRender();
    paddleRender();
    bricksRender();
    scoreRender();
}

var gameLoop = function() {
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    update();
    render();
    collisionCheck();
}

var keyDownFunc = (e)=> {
    if (e.code == "ArrowLeft") {
        leftKeyDown = true;
    } else if (e.code == "ArrowRight") {
        rightKeyDown = true;
    }
}

var keyUpFunc = (e)=> {
    if (e.code == "ArrowLeft") {
        leftKeyDown = false;
    } else if (e.code == "ArrowRight") {
        rightKeyDown = false;
    }
}

var mouseMoveFunc = (e)=> {
    mouseX = e.clientX - myCanvas.offsetLeft;
}

document.addEventListener("keydown",keyDownFunc,false);
document.addEventListener("keyup",keyUpFunc,false);
document.addEventListener("mousemove",mouseMoveFunc,false);

initBricks();
var gameID = setInterval(gameLoop,10);