var width =800;
var height = 600;

var game = new Phaser.Game(width,height,Phaser.AUTO);

var s;
var music;

var TEST = {
    
    preload: function(){
        game.load.image('background','assets/background.png');
        game.load.image('player','assets/player.png');
        game.load.image('bullet','assets/bullet.png');

    },
    create:function(){
        this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.SKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
       
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.bg = game.add.image(0,0,'background');
        this.bg2 = game.add.image(width,0,'background');
        this.player =  game.add.image(0,0,'player');
        this.temp =0;
        this.player.anchor.setTo(0.5);
        this.bulletList=[];
        this.enemyList =[];
    }, 
     
    update:function(){

        // this.bg.x-=10;
        // this.bg2.x-=10;
        // if(this.bg2.x<=0)
        // {
        //     this.bg.x=0;
        //     this.bg2.x=width;
        // }


        // 
        // {
        //     this.player.y-=1;
        // }
        // if(this.SKey.isDown)
        // {
        //     this.player.y+=1;
        // }
       
        
        // for(let i=0;i<this.bulletList.length;++i)
        // {
        //     this.bulletList[i].x+=10;
        // }


    },
    shoot:function(){
        let b = game.add.image(TEST.player.x,TEST.player.y,'bullet');
        TEST.bulletList.push(b);
        b.anchor.setTo(0.5);
    },
    car:function(){
        
    },

};

game.state.add('TEST',TEST);
game.state.start('TEST');
