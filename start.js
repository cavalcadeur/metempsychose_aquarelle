var W,H;
var ctx,canvas;
var Widget;
var keys = [];
var persos = [];
var imgPersos = [new Image];
imgPersos.forEach(
    function (e,i){
        e.src = "images/p"+i+".png";
    }
);
var controls = [87,32,38,96];
var courants = [0,0,0,0];
var bulles = [];
var t2 = 0;
var deaths = 0;
var point = [0,0,0,0,0];
var alerting = 0;
var bouncing = 10;
var mode = "classique";
var modes = ["classique","rebond","tempetes","poursuite","meli-melo","aveugle","apesanteur","gravite inverse"];
var timeoutID;
var multiplier = 1;
var proba = 7;
var gravite;
var tailleC = 100;
var table = [[0,0,0,0,0,0,1],[0,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,1,0],[0,1,1,1,1,0,0]];
var heros = {x:0,y:3,g:-1,hitX:25,hitY:25,vx:0.1,vy:0,am:0.001,vit:0.01,max:0.1,capa:"saut",saut:0};

// programme

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function rndSpecial(){
    if (rnd(2) == 0) return -1;
    else return 1;
}

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}

function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    resize();
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 1;
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            if (alerting == 1) disalert();
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 0;
        }
    );
    animation();
}

function animation(){
    var f = function(t) {
        paint(t);
        window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function paint(t){
    if (1 == keys[39]) moveRight();
    if (1 == keys[37]) moveLeft();
    if (1 == keys[32]) action();
    world.act(heros);
    draw();
}

function moveRight(){
    if (heros.vx < heros.max) heros.vx += heros.vit;
}


function moveLeft(){
    if (heros.vx > -heros.max) heros.vx -= heros.vit;
}

function action(){
    if (heros.capa == "saut"){
        if (heros.saut == 0) {heros.g = -10;heros.saut = 1;}
    }
}

function draw() {
    drawFond();
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.drawImage(imgPersos[0],heros.x*tailleC - imgPersos[0].width / 2,heros.y*tailleC - imgPersos[0].height / 2);
    table.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    if (f == 1) ctx.fillRect(x*tailleC,y*tailleC,tailleC,tailleC);
                }

            );

        }
    );
}

function drawFond(){
    ctx.fillStyle = "rgb(50,50,100)";
    ctx.fillRect(0,0,W,H);
}

function dead(n){
    persos[n].dead = 1;
}
