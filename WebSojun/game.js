
var testScene = new Scene();
var stage2Scene = new Scene();

canvas.height = 700;
class Enemy
{
    constructor(_x, _y){
        this.way=0;
        this.hp=10;
        this.gImage = nowScene.addImage(new GameImage("player.png"));
        this.gImage.pos.x = _x;
        this.gImage.pos = {x:_x, y:_y};
    }

    move()
    {
        if(this.way==0)
        {
              this.gImage.pos.y-=200*deltaTime;  
              if(this.gImage.pos.y<=0)
              {
                  console.log("hit");
                    this.way=1;
              }
        }
        else if(this.way==1)
        {
            this.gImage.pos.y+=200*deltaTime;
            if(this.gImage.pos.y>=canvas.height)
            {
                console.log("1");
                  this.way=0;
            }
        }
      
    }
    
    damage(d)
    {   
      this.hp -=d;
      if(this.hp<=0)
      {
        nowScene.deleteImage(this.gImage);  
      }

    }
}




testScene.init = function () {
    preloadImage("bullet.jpg");
    this.player = this.addImage(new GameImage("player.png"));
    this.bullets =[];
    this.bulletETime=0;
    this.enemy = new Enemy(500,200);
   
}
testScene.checkCollision = function(){
    for(let i=0;i<this.bullets.length;i++)
    {
        let b = this.bullets[i];
        let e =this.enemy.gImage;
        if(e.pos.x<=b.pos.x+b.image.width&&
          e.pos.x+e.image.width>=b.pos.x&&
          e.pos.y <= b.image.height + b.pos.y&&
           e.pos.y+e.image.height >=b.pos.y)
        {
            this.deleteImage(this.bullets[i]);
            this.bullets.splice(i,1);
            this.enemy.damage(1);
            console.log("!");
        }
    }
}

testScene.update = function () {
    this.bulletETime+=deltaTime;
    this.enemy.move();
    if(keys["KeyW"]>0)
        this.player.pos.y-=200*deltaTime;
    if(keys["KeyS"]>0)
        this.player.pos.y+=200*deltaTime;
    if(keys["KeyA"]>0)
        this.player.pos.x-=200*deltaTime;
    if(keys["KeyD"]>0)
        this.player.pos.x+=200*deltaTime;
    if(keys["KeyQ"]>0)
        this.player.rot +=0.5;
    
    if(keys["Space"]>0)
    {
        if(this.bulletETime>=0.05)
        {
            let b=this.addImage(new GameImage("bullet.jpg"));
             b.pos = {x:this.player.pos.x +50,
                      y:this.player.pos.y+50 -b.image.height/2}
       b.setZ(1);
       this.bullets.push(b);
       this.bulletETime=0; 
        }

    } 
    for(let i=0;i<this.bullets.length;++i)
    {
        if(this.bullets[i].pos.x>=canvas.width){
            
            this.bullets.splice(i,1);
            this.deleteImage(this.bullets[i]);
            continue;
        }
        this.bullets[i].pos.x +=500*deltaTime;
    }
    this.checkCollision();

}


testScene.start();