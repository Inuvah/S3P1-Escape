class scene1_1 extends Phaser.Scene{
    constructor() {
        super("playerOneScene1")
    }

 preload () 
 {
   //image loader
   for (let i = level1_1.length -1; i >=0;  i--) {
    const obtj = level1_1[i];
    this.load.image(obtj.key, obtj.url);
    }

    //text input and other ui elements
    this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
    })
    this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
}

create () 
{
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

update () 
{
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

}