//This a bout to be a damn mess... one day code weee...
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
//vars
const game = new Phaser.Game(config);
var player;
var plant;
var board;
let playerMove = true;
let interact = false;
let interacting = 0;

function preload () {
    //basics
    this.load.image('office', 'img/office.png')
    this.load.image('playerOne', 'img/playerOne.png')
    this.load.spritesheet('dude',
        'img/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

    //assets
    this.load.image('plant', 'img/assets/plante.png');

    //tile puzzle
    this.load.image('board', 'img/assets/1x/circleBoard.png');
    this.load.image('greyBoard', 'img/assets/1x/greyBoard.png');
    this.load.image('tile', 'img/assets/1x/greyTile.png');
}

function create () {
    //background
    this.add.image(350, 500, 'office').setScale(0.5);
    //interactables
    plant = this.physics.add.staticGroup();
    plant.create(400, 300, 'plant').setScale(0.4).refreshBody();

    

    //player sprite/image and edge collision on game window
    player = this.physics.add.image(100, 450, 'playerOne').setScale(0.5).refreshBody();
    player.setCollideWorldBounds(true);
    plant = this.physics.add.overlap(player, plant, tilePuzzle, null, this);
    this.physics.add.collider(player, plant);
    
    //Keybinds created
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
    //lock movement during interactions
    if (cursors.shift.isDown) {
        interact = true;
    } 

}


function tilePuzzle (player, plant) {

    if (interact == true && interacting == false) {
    board = this.add.image(400, 300, 'board');
    board.setActive(true).setVisible(true);
    player.setVelocityY(0);
    player.setVelocityX(0);
    playerMove = false
    interacting = true;
    interact = false;
    } 

    if (interacting == true && interact == true)
    {
        board.setActive(false).setVisible(false);
        playerMove = true;
        interacting = false;
        interact = false;
    }
}
