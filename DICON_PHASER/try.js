var width =800;
var height = 600;

var game = new Phaser.Game(width,height,Phaser.AUTO);
var background;
var player; 

var bullets;
var bulletTime;
var fireButton;

var TEST = {
    
    preload: function(){
        game.load.image('player', "Assets/plane.jpg");
        game.load.image('back', "Assets/sky.jpg");
        game.load.image('bullet', "Assets/bullet.png");
        game.load.image('enemy','Assets/changhyeon.jpg');
    },
    create:function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.tileSprite(0,0,800,600,'back');

        player = game.add.sprite(game.world.centerX, game.world.centerY,'player');
        player.scale.setTo(0.3,0.3);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30,'bullet');
        

        cursors = game.input.keyboard.createCursorKeys();

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.bulletList=[];
        this.bulletGroup=game.add.group();
        
        this.enemy = game.add.sprite(500,200,'enemy');
        game.physics.enable(this.enemy,Phaser.Physics.ARCADE);
    }, 
     
    update:function(){  
        background.tilePosition.x+=2;
        player.body.velocity.x=0;
        if(cursors.left.isDown)
        {
            player.body.velocity.x = -400;
          
        }if(cursors.right.isDown)
        {
            player.body.velocity.x = 400;
        }  
        if(cursors.up.isDown)
        {
            player.body.velocity.y = -400;
        }
        if(cursors.down.isDown)
        {
            player.body.velocity.y =400;
            game.state.start('BLANK');
        }
        for(let i=0;i<this.bulletGroup.children.length;i++) {
            this.bulletGroup.children[i].x+=10;
        }
        game.physics.arcade.collide(this.enemy,this.bulletGroup,function(e,b) {
            b.destroy();
        })

          
        // for(let i=0;i<this.bulletList.length;++i)
        // {
        //     this.bulletList[i].x+=10;
        //     if (game.physics.arcade.collide(this.bulletList[i],this.enemy)) {
        //         console.log("Changhyeon die....");
                
        //         this.bulletList[i].destroy();
        //         this.bulletList.splice(i,1);
        //         i--;
        //     }
            
        // }
        
        if(this.spaceKey.isDown)
        {
            this.shoot();
        }

    },
    shoot:function(){
        let b = game.add.sprite(player.x+player.width/2,player.y+player.height/2,'bullet');
        b.anchor.setTo(0.5);
        game.physics.enable(b,Phaser.Physics.ARCADE);

        //TEST.bulletList.push(b)
        TEST.bulletGroup.add(b)
        
    }
};

var BLANK = {
    preload:function(){},
    create:function(){},
    update:function(){}
}

game.state.add('TEST',TEST);
game.state.add('BLANK',BLANK);

game.state.start('TEST');










// var width =800;
// var height = 600;

// var game = new Phaser.Game(width,height,Phaser.AUTO);    

// var TEST = {
    
//     preload: function(){
//         game.load.image('player',"assets/ball.png");
//         game.load.image('block', "assets/column.png");
        

//     },
//     create:function(){
//         // this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
//         // this.SKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
       
//         // this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

//         //  this.bg = game.add.image(0,0,'background');
//         // this.bg2 = game.add.image(width,0,'background');
//         // this.player =  game.add.image(0,0,'player');
//         // this.temp =0;
//         // this.player.anchor.setTo(0.5);
//         // this.bulletList=[];  
//         // this.enemyList =[];

//     //     var rand = game.rnd.realInRange(0, 800);
        
//     //    this.player = game.add.sprite(500 , 300,'player');
//     //    this.player.scale.x = 0.1;
//     //    this.player.scale.y = 0.1;
//     //    this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
       
//     // for (var i = 0; i < 15; i++) {
//     //     //  Create 15 sprites at random x/y locations
//     //     this.block = game.add.sprite(400,400,'block');


//     //     //  Pick a random number between -2 and 6
//     //     var rand = game.rnd.realInRange(0, 800);

//     //     //  Set the scale of the sprite to the random value
//     //     // this.block.x = rand;
//     //     // this.block.y = rand;
      

//     //     //  You can also scale sprites like this:
//     //     //  sprite.scale.x = value;   
//     //     //  sprite.scale.y = value;

//     // }
    
//     // }, 
   
//     // update:function(){

//     //     if(this.WKey.isDown)
//     //     {
//     //         this.player.y-=10;
//     //         if(this.player.y<=0)
//     //         {

//     //             this.shoot();
//     //         }
//     //     }
       
//     // },
    
//     // // shoot:function(){
//     // //     let b = game.add.image(TEST.player.x,TEST.player.y,'bullet');
//     // //     TEST.bulletList.push(b);
//     // //     b.anchor.setTo(0.5);
//     // // },
//     // shoot:function(){
//     //     this.player.y+=100;
//     // },
    
//     // collision:function(){
//     //     if(this.player.x<=0)
//     //     {
            
//     //     }
//     // }

// };

// game.state.add('TEST',TEST);
// game.state.start('TEST');
