var world = function(x,y,tx,ty,s,color,n){
    function coor(x){
        x = Math.floor(x);
        return x;
    }

    function getTile(x,y){
        if (x < 0 || y < 0 || x >= table[0].length || y >= table.length){
            return 0;
        }
        else return table[y][x];
    }


    return{
        act : function(guy){
            guy.g += 0.5;
            guy.y += guy.g*2/tailleC;


            var XX = coor(guy.x);
            var YY = coor(guy.y + guy.hitY/tailleC);
            var tileA = getTile(XX,YY);
            if (tileA == 1){
                guy.g = 0;
                guy.saut = 0;
                guy.y = YY - guy.hitY/tailleC;
                var tile = getTile(XX,YY-1);
                if (tile == 2){
                    if (guy.y-(YY-1)+guy.hitY/tailleC >= 1-(guy.x-XX)){
                        guy.g = 0;
                        guy.saut = 0;
                        guy.y = YY - guy.hitY/tailleC - (guy.x - XX);
                    }
                }
                else if (tile == 3){
                    if (guy.y-(YY-1)+guy.hitY/tailleC >= (guy.x-XX)){
                        guy.g = 0;
                        guy.saut = 0;
                        guy.y = YY-1 - guy.hitY/tailleC + (guy.x - XX);
                    }
                }
            }
            else if (tileA == 2){
                if (guy.y-YY+guy.hitY/tailleC >= 1-(guy.x-XX)){
                    guy.g = 0;
                    guy.saut = 0;
                    guy.y = YY+1 - guy.hitY/tailleC - (guy.x - XX);
                }
            }
            else if (tileA == 3){
                if (guy.y-YY+guy.hitY/tailleC >= (guy.x-XX)){
                    guy.g = 0;
                    guy.saut = 0;
                    guy.y = YY - guy.hitY/tailleC + (guy.x - XX);
                }
            }

            if (guy.g < 0){
                var XX = coor(guy.x);
                var YY = coor(guy.y - guy.hitY/tailleC);
                var tile = getTile(XX,YY);
                if (tile == 0){

                }
                else if (tile == 1){
                    guy.g = 0;
                    //guy.saut = 0;
                    guy.y = YY + 1 + guy.hitY/tailleC;
                }
                else if (tile == 2){
                    if (guy.y-YY-guy.hitY/tailleC >= 1-(guy.x-XX)){
                        guy.g = 0;
                        //guy.saut = 0;
                        guy.y = YY + 1 + guy.hitY/tailleC;
                    }
                }
                else if (tile == 3){
                    if (guy.y-YY-guy.hitY/tailleC >= (guy.x-XX)){
                        guy.g = 0;
                        //guy.saut = 0;
                        guy.y = YY + 1 + guy.hitY/tailleC;
                    }
                }

            }

            if (guy.vx != 0){
                guy.x += guy.vx;
                if (Math.abs(guy.vx) < guy.am) guy.vx = 0;
                else if (guy.vx > 0) guy.vx -= guy.am;
                else guy.vx += guy.am;

                var sens = guy.vx/Math.abs(guy.vx);
                var XX = coor(guy.x + (guy.hitY/tailleC * sens));
                var YY = coor(guy.y);
                var tile = getTile(XX,YY);
                if (tile == 1){
                    if (sens == 1){
                        if (tileA != 2){
                            guy.x = XX - guy.hitY/tailleC;
                            guy.vx = guy.vx*-1;
                        }
                    }
                    else{
                        if (tileA != 3){
                            guy.x = (XX+1) + guy.hitY/tailleC;
                            guy.vx = guy.vx*-1;
                        }
                    }
                }
                else if (tile == 2){
                    if (sens == -1 && guy.y-YY-guy.hitY/tailleC >= 1-(guy.x-XX)){
                        guy.x = (XX+1) + guy.hitY/tailleC;
                        guy.vx = guy.vx*-1;
                    }
                }
                else if (tile == 3){
                    if (sens == 1 && guy.y-YY-guy.hitY/tailleC >= (guy.x-XX)){
                        guy.x = XX - guy.hitY/tailleC;
                        guy.vx = guy.vx*-1;
                    }
                }
            }
            
            if (guy.img == 0){
                guy.r += guy.vx*3;
                if (guy.g != 0){
                    if (guy.vx == 0){
                        guy.r += 0.5;
                    }
                    else {
                        guy.r += Math.abs(guy.vx)/guy.vx*0.5;
                    }
                }
            }
        },
        iaAr : function(e){
            

        },
        draw : function(e,ctx,ta,img){
            ctx.save();
            ctx.translate(e.x*ta,e.y*ta);
            ctx.rotate(e.r);
            ctx.scale(e.sens,1);
            ctx.drawImage(img[e.img],-e.hitX,-e.hitY);
            ctx.restore();
        }
    };
}();
