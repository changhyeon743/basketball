var width = 800;
var height = 600;
var game = new Phaser.Game(width,height,Phaser.AUTO);

var TEST = {
    preload: function() {
        game.load.image('player','Assets/basketball.png')
        game.load.image('floor','Assets/floor.png')
        game.load.image('net','Assets/net2.png');
        game.load.image('backboard','Assets/net.png');
        game.load.image('background','Assets/back.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 3000;

        game.add.tileSprite(0,0,1600,960,'background');
        game.world.setBounds(0,0,1600,960);

        this.back = game.add.sprite(600,200,'backboard');
        this.back.scale.setTo(0.3,0.3);
        game.physics.enable(this.back,Phaser.Physics.ARCADE);
        this.back.body.allowGravity = false;
        this.back.body.immovable = true;

        this.net = game.add.sprite(600,285,'net');
        this.net.scale.setTo(0.3,0.3);
        game.physics.enable(this.net,Phaser.Physics.ARCADE);
        this.net.body.allowGravity = false;
        this.net.body.immovable = false;

        


        this.player = game.add.sprite(200,100,'player');
        this.player.scale.setTo(0.01, 0.01);
        game.physics.enable(this.player,Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds=true;

        this.floorGroup = game.add.group();
        this.floorGroup.enableBody = true;
        this.floorGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.floorGroup.scale.setTo(0.5,0.5);
        for(let i=0;i<20;i++) {
            let t = this.floorGroup.create(i*32,850,'floor');      
            t.body.allowGravity = false;
            t.body.immovable = true;  
        }

        this.style = {font:"50px Arial",fill:"#fff"};
        this.textBox = game.add.text(0,0,"Score : 0",this.style);
        this.textBox.fixedToCamera = true;
        this.score = 0;

        game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON,0.1,0.1);

        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function() {
            this.player.body.velocity.x+=1000;
            this.player.body.velocity.y-=1000;
        },this);
    },

    
    update: function() {
        
        game.physics.arcade.collide(this.player,this.net,function(p,n) {
            if(p.body.touching.down && n.body.touching.up) {
                console.log("yes!");
                this.score++;
                this.textBox.setText("Score : "+this.score);
            }
        },null,this);
        game.physics.arcade.collide(this.player,this.floorGroup);

        if (this.player.body.touching.down) {
            this.player.body.velocity.y-=800;
        }
        // if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            
        // }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.velocity.x-=10;
            if (this.player.body.velocity.x > 0)
                this.player.body.velocity.x-=20;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.velocity.x+=10;
            if (this.player.body.velocity.x < 0)
                this.player.body.velocity.x+=20;
        } else {
            this.player.body.velocity.x*=0.9;
            if(Math.abs(this.player.body.velocity.x)<=0.2)
                this.player.body.velocity.x=0;
        }
    }
}

game.state.add('TEST',TEST);
game.state.start('TEST');