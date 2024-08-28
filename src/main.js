//This a bout to be a damn mess... 
//Phaser basic info so it can setup well the basics :)
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-container',
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
//Phaser base setup for creating basic canvas with premade physics
const game = new Phaser.Game(config);
//objects
var player;
//var plant;
var board;
var skab;
var pcTrigger;
var text;
var calendar;
var textField = 'Password';
var p1 = false;
const tiles = [
    greenTile = {
        color: "green",
        right: false,
        left: true,
        down: true,
        up: false,
        x: 666.666,
        y: 0,
    },
    yellowTile = {
        color: "yellow",
        right: true,
        left: true,
        down: false,
        up: false,
        x: 133.33,
        y: 0,
    },
    orangeTile = {
        color: "orange",
        right: false,
        left: true,
        down: true,
        up: false,
        x: 400,
        y: 300,
    },
    tealTile = {
        color: "teal",
        right: false,
        left: false,
        down: false,
        up: true,
        x: 133.33,
        y: 500,
    },
    purpleTile = {
        color: "purple",
        right: true,
        left: true,
        down: true,
        up: true,
        key: "greyTile",
        x: 670,
        y: 500,
    },
]
//values/booleans
let playerMove = true;
let interact = false;
let interacting = 0;
let pressed = 0;

function preload () {
    //scenes
    this.load.image('office', 'img/office.png')
    this.load.image('loginPc', 'img/pcBackground.png');
    this.load.image('mailApp', 'img/assets/mailApp.png');
    this.load.image('mailMessage', 'img/assets/mailMessage.png');
    this.load.image('pc', 'img/assets/pc.png');
    this.load.image('bath', 'img/bath.png');
    this.load.image('bedroom', 'img/bedroom.png');
    this.load.image('kitchen', 'img/kitchen.png')

    //Player
    this.load.image('playerOne', 'img/playerOne.png')

    //disregard temp for testing
    this.load.spritesheet('dude',
        'img/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

    //assets
    //objects on scene
    this.load.image('plant', 'img/assets/plante.png');
    this.load.image('badetæppe', 'img/assets/Badetppe.png');
    this.load.image('bamse', 'img/assets/Bamse.png');
    this.load.image('bog', 'img/assets/Bog.png');
    this.load.image('brev', 'img/assets/Brev.png');
    this.load.image('id', 'img/assets/id.png');
    this.load.image('kommode', 'img/assets/Kommode.png');
    this.load.image('kop', 'img/assets/Kop.png');
    this.load.image('lampe', 'img/assets/Lampe.png');
    this.load.image('letter', 'img/assets/letter.png');
    this.load.image('mail', 'img/assets/mail.png');
    this.load.image('papir', 'img/assets/Papir.png');
    this.load.image('papkasse', 'img/assets/Papkasse.png');
    this.load.image('seng', 'img/assets/Seng.png');
    this.load.image('skab', 'img/assets/Skab.png');
    this.load.image('stol', 'img/assets/Stol.png');
    this.load.image('toilet', 'img/assets/Toilet.png');
    this.load.image('trash', 'img/assets/Trash.png');
    this.load.image('ur', 'img/assets/Ur.png');

    //hitbox
    this.load.image('pcHitbox', 'img/pcHitbox.png')

    //tile puzzle
    this.load.image('board', 'img/assets/1x/circleBoard.png');
    this.load.image('greyBoard', 'img/assets/1x/greyBoard.png');
    this.load.image('tile', 'img/assets/1x/greyTile.png');

    //text input and other ui elements
    this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
    })
    this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
}

function create () {
    /*
    //menu NOT WORKING ATM
    const playerOne = this.add.text(400, 50, 'Player One', { fill: 'white' })
    .setInteractive().on('pointerdown', function choosenPlayerOne(){
        p1 = true;
    });

    const playerTwo = this.add.text(400, 200, 'Player Two', { fill: 'white' })
    .setInteractive().on('pointerdown', function choosenPlayerTwo() {p2 = true;} );
*/
          //background
          this.add.image(350, 500, 'office').setScale(0.5);

          //interactables objects
          //plant = this.physics.add.staticGroup();
          //plant.create(400, 300, 'plant').setScale(0.4).refreshBody();
          skab = this.physics.add.staticGroup();
          skab.create(75, 200, 'skab').setScale(0.5).refreshBody();
          pcTrigger = this.physics.add.staticGroup();
          pcTrigger.create(660, 250, 'pcHitbox');

          //hiding it as we only wanna use it to give the pc a hitbox
          pcTrigger.setActive(true).setVisible(false);

          //player sprite/image and edge collision on game window
          player = this.physics.add.image(100, 450, 'playerOne').setScale(0.5).refreshBody();
          player.setCollideWorldBounds(true);

          //objects physics/collision
          //plant = this.physics.add.overlap(player, plant, tilePuzzle, null, this);
          //this.physics.add.collider(player, plant);

          skab = this.physics.add.overlap(player, skab, showId, null, this);

          pcTrigger = this.physics.add.overlap(player, pcTrigger, pcShow, null, this);
          

          //Animations 
          this.anims.create({
              key: 'left',
              frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
              frameRate: 10,
              repeat: -1
          });
          
          this.anims.create({
              key: 'turn',
              frames: [ { key: 'dude', frame: 4 } ],
              frameRate: 20
          });
          
          this.anims.create({
              key: 'right',
              frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
              frameRate: 10,
              repeat: -1
          });
  

    //Player input
    cursors = this.input.keyboard.createCursorKeys();
    
}

function update () {
    //Keybinds watched and put in to effect
    if (playerMove == true) {
    if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
        
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            
        }
        else
        {
            player.setVelocityX(0);
            
        }
        
        if (cursors.up.isDown)
        {
            player.setVelocityY(-160);
        }
        else if(cursors.down.isDown) 
        {
            player.setVelocityY(160);
        }
        else
        {
            player.setVelocityY(0);
        }
    }
    if (cursors.shift.isDown) 
    {
        interact = true;
        //Using pressed to make sure only one input is registered
        //regardless of how long one presses
        pressed++;
    } 
    if (cursors.shift.isUp) 
    {
        pressed = 0
    }

}

/*
function tilePuzzle (player, plant) {
//open close puzzle... mess
    if (interact == true && interacting == false && pressed <= 0) 
    {
        board = this.add.image(400, 300, 'greyBoard');
        board.setActive(true).setVisible(true);

        for (i = tiles.length - 1; i >= 0; i--) {
            tiles[i].physics = this.physics.add.image(tiles[i].x, tiles[i].y, "tile");
            tiles[i].physics.setCollideWorldBounds(true);
            //tiles[i].addListener('click');
        }
    
        tiles.greenTile.on('click', (event) => {
            console.log('clicked');
        });
        
        //lock movement during interactions
        player.setVelocityY(0);
        player.setVelocityX(0);
        playerMove = false

        interacting = true;
        interact = false;
        pressed = 2;
    }
    if (interacting == true && interact == true && pressed == 0)
    {
        //remove puzzle
        board.setActive(false).setVisible(false);
        for (i = tiles.length - 1; i >= 0; i--) {
           tiles[i].physics.setActive(false).setVisible(false);
        }
        
        playerMove = true;
        interacting = false;
        interact = false;
    }

}
*/
