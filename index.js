let canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "rgba(0,0,0,1)";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

// --------------------- UTILITY FUNCTIONS --------------------------------------------------

function randomInt(min,max){
    return Math.floor((Math.random() * (max-min+1)) + min); 
}
const colorArray = ["#363432","#196774","#90A19D","#F0941F","#EF6024"];
function randomColor(colorArray){
    var x = Math.floor(Math.random()*colorArray.length);
    return colorArray[x];
};
window.addEventListener('resize',function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
})
function getDistance(x1,y1,x2,y2){
    var xDistance = x2-x1;
    var yDistance = y2-y1;
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}
var mouse = {
    x:innerWidth/2,
    y:innerHeight/2
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

// ---------------------------------------------------------------------------------------------
// Animation

var radius = 10;
var balls = 400;
var interactionSpace = 130;
var maxRadius = 50;
var minRadius = 2;

for(var i=0;i<10;i++){
    console.log(randomInt(1,5));
}


function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = this.radius = Math.random()*radius+1;
    this.color = colorArray[Math.floor(Math.random()*(colorArray.length))];
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        if(this.x+this.radius > window.innerWidth || this.x-this.radius < 0) this.dx = -this.dx;
        if(this.y+this.radius > window.innerHeight || this.y-this.radius < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        if(mouse.x-this.x < interactionSpace && mouse.x-this.x > -interactionSpace 
            && mouse.y-this.y < interactionSpace && mouse.y-this.y > -interactionSpace){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
        this.draw();
    }
} 

var circleArray = [];
var circleFiller = function(){
    for(var i=0;i<balls;i++){
        var x = Math.random() * (window.innerWidth - 2*radius) + radius;
        var y = Math.random() * (window.innerHeight - 2*radius) + radius;
        var dx = (Math.random()-0.5) * 3;
        var dy = (Math.random()-0.5) * 3;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
circleFiller();

var resize = function(){
    circleArray = [];
    circleFiller();
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}
animate();