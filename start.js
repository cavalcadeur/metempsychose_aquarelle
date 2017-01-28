var W,H;
var ctx,canvas;
var Widget;
var keys = [];
var persos = [];
var imgPersos = [new Image,new Image];
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
var table = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,4,1,0,0,0],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,4,1,1,0,4,1],[1,1,1,1,1,1,1,1]];
var heros = {x:0,y:3,g:-1,hitX:31.5,hitY:31.5,vx:0.1,vy:0,am:0.001,vit:0.01,max:0.1,capa:"saut",saut:0,img:0,ia:"nothingAtAllYouSonOfABitch",sens:1,r:0,high:-13};
var ennemis = [{x:4,y:1,g:-1,hitX:30,hitY:25,vx:0,vy:0,am:0.001,vit:0.02,max:0.05,capa:"",saut:0,img:1,ia:"ar",sens:1,r:0}];

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
    heros.high = window.prompt("Wesh wesh saut de la boule ?")*-1;
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
        if (heros.saut == 0) {heros.g = heros.high;heros.saut = 1;}
    }
}

function draw() {
    drawFond();
    ctx.fillStyle = "rgb(100,100,100)";
    world.draw(heros,ctx,tailleC,imgPersos);
    //ctx.drawImage(imgPersos[heros.img],heros.x*tailleC - heros.hitX,heros.y*tailleC - heros.hitY);
    table.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    if (f == 1) ctx.fillRect(x*tailleC,y*tailleC,tailleC,tailleC);
                    else if (f == 2){
                        ctx.beginPath();
                        ctx.moveTo(x*tailleC,(y+1)*tailleC);
                        ctx.lineTo((x+1)*tailleC,(y+1)*tailleC);
                        ctx.lineTo((x+1)*tailleC,y*tailleC);
                        ctx.closePath();
                        ctx.fill();
                    }
                    else if (f == 3){
                        ctx.beginPath();
                        ctx.moveTo(x*tailleC,(y+1)*tailleC);
                        ctx.lineTo((x+1)*tailleC,(y+1)*tailleC);
                        ctx.lineTo(x*tailleC,y*tailleC);
                        ctx.closePath();
                        ctx.fill();
                    }
                    else if (f == 4){
                        ctx.beginPath();
                        ctx.arc((x+1)*tailleC,(y+1)*tailleC,tailleC,-Math.PI,-Math.PI/2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.moveTo(x*tailleC,(y+1)*tailleC);
                        ctx.lineTo((x+1)*tailleC,(y+1)*tailleC);
                        ctx.lineTo((x+1)*tailleC,y*tailleC);
                        ctx.closePath();
                        ctx.fill();
                    }
                }

            );

        }
    );
    ennemis.forEach(
        function (e,i){
            world.draw(e,ctx,tailleC,imgPersos);
            //ctx.drawImage(imgPersos[e.img],e.x*tailleC - e.hitX,e.y*tailleC - e.hitY);
            world.act(e);
            if (e.ia == "ar") world.iaAr(e);
        }
    );
}

function drawFond(){
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0,0,W,H);
}

function dead(n){
    persos[n].dead = 1;
}
