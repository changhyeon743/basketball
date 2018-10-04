var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "ice.png"


img.addEventListener("load",function() {
    
    ctx.translate(100/2,200/2);
    ctx.rotate(Math.PI*0.1);
    ctx.translate(-100/2,-200/2);
    setInterval(abc,100);
},false);

var abc = ()=> {
    ctx.transform(2,0,1,2,0,0);
    ctx.drawImage(img,0,0,100,200);
}