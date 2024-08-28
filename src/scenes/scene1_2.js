class scene1_2 extends Phaser.Scene{
    constructor() {
        super("playerTwoScene1")
    }


preload () {
    //scenes
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
    this.load.image('calendar', 'img/assets/calendar.png');
    this.load.image('letter', 'img/assets/letter.png');
    this.load.image('papir', 'img/assets/Papir.png');
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

create () {
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

update () {
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
}