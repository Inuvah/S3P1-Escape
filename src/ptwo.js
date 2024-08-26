//This a bout to be a damn mess... 
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
var board;
var skab;
var calendar;
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
    this.load.image('login', 'img/assets/login.png');
    this.load.image('mailApp', 'img/assets/mailApp.png');
    this.load.image('mailMessage', 'img/assets/mailMessage.png');
    this.load.image('pc', 'img/assets/pc.png');
    this.load.image('bath', 'img/bath.png');
    this.load.image('bedroom', 'img/bedroom.png');
    this.load.image('kitchen', 'img/kitchen.png');
    this.load.image('end', 'img/assets/end.png');

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
    this.load.image('calendar', 'img/assets/calendar.png');
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
    this.load.image('calendarSee', 'img/assets/calendarSee.png');
    this.load.image('door', 'img/assets/door.png')
    this.load.image('doorKeypad', 'img/assets/doorKeypad.png')



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
    //menu
    const playerOne = this.add.text(400, 50, 'Player One', { fill: 'white' })
    .setInteractive().on('pointerdown', function choosenPlayerOne(){
        p1 = true;
    });

    const playerTwo = this.add.text(400, 200, 'Player Two', { fill: 'white' })
    .setInteractive().on('pointerdown', function choosenPlayerTwo() {p2 = true;} );
    */
          //background
          this.add.image(400, 400, 'kitchen').setScale(0.42);

          //interactables objects
          note = this.physics.add.staticGroup();
          note.create(320, 500, 'papir').setScale(0.2).refreshBody();

          calendar = this.physics.add.staticGroup();
          calendar.create(350, 75, 'calendar').setScale(0.2).refreshBody();

          door = this.physics.add.staticGroup();
          door.create(100, 75, 'door').setScale(0.15).refreshBody();
  
          //player sprite/image and edge collision on game window
          player = this.physics.add.image(100, 450, 'playerOne').setScale(0.5).refreshBody();
          player.setCollideWorldBounds(true);
  
          //objects physics/collision
          note = this.physics.add.overlap(player, note, pcPuzzle, null, this);
          this.physics.add.collider(player, note);

          calendar = this.physics.add.overlap(player, calendar, calendarShow, null, this);

          door = this.physics.add.overlap(player, door, doorShow, null, this);
      
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

/* TILE PUZZLE 
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

function pcPuzzle (player, note) {
    //open close puzzle... mess
        if (interact == true && interacting == false && pressed <= 0) 
        {
            letter = this.add.image(400, 300, 'letter').setScale(0.5);
    
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
            letter.setActive(false).setVisible(false);
            
            playerMove = true;
            interacting = false;
            interact = false;
        }
    
}

function calendarShow (player, calendar) {
    if (interact == true && interacting == false && pressed <= 0) 
        {
            calendarSee = this.add.image(400, 300, 'calendarSee').setScale(0.5);
    
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
            calendarSee.setActive(false).setVisible(false);
            
            playerMove = true;
            interacting = false;
            interact = false;
        }
}

function doorShow () {
    if (interact == true && interacting == false && pressed <= 0) 
        {
            doorSee = this.add.image(400, 300, 'doorKeypad').setScale(0.5);
    
            //Text input using rexUi plugin
            const text = this.add.text(425, 215, 'Password', { fixedWidth: 150, fixedHeight: 36 });
            text.setOrigin(0.5, 0.5);

            text.setInteractive().on('pointerdown', () => {
                this.rexUI.edit(text)
                if(text._text === '83224881lij') {
                    console.log('yyaaay')
                    doorSee.setActive(false).setVisible(false);
                    text.setActive(false).setVisible(false);
                    pcHome = this.add.image(400, 300, 'end');
                }
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
            doorSee.setActive(false).setVisible(false);
            
            playerMove = true;
            interacting = false;
            interact = false;
        }
}