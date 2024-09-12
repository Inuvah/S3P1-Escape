class tutorialScene extends Phaser.Scene {
    constructor() {
        super("tutorial")
    }

    preload(){
        //image loader
        for (let i = level_tut.length -1; i >=0;  i--) {
            const obtj = level_tut[i];
            this.load.image(obtj.key, obtj.url);
        }
    }

    create(){
        var bed;
        var wall;
        var box1;
        var keybind;
        //background
        this.add.image(0, 0, 'background2').setOrigin(0, 0);
        keybind = this.physics.add.staticGroup();
        keybind.create(550, 510, 'keyBinds').setScale(0.4).refreshBody();
        wall = this.physics.add.staticGroup();
        wall.create(445, 435, 'wall');

        keyboard = this.input.keyboard.addKeys({ 'enter': Phaser.Input.Keyboard.KeyCodes.ENTER });
        //Player input
        cursors = this.input.keyboard.createCursorKeys();


        //objects
        bed = this.physics.add.staticGroup();
        bed.create(750, 510, 'bed').setScale(0.3).refreshBody();
        box1 = this.physics.add.image(300, 535, 'box').setScale(0.2).refreshBody();
        door = this.physics.add.staticGroup();
        door.create(225, 175, 'door').setScale(0.15).refreshBody();

        //player
        player = this.physics.add.image(750, 510, 'playerOne').setScale(0.2).refreshBody();
        player.setCollideWorldBounds(true);
        box1.setCollideWorldBounds(true);

        bed = this.physics.add.overlap(player, bed, bedText, null, this);
        keybind = this.physics.add.overlap(player, keybind, keyText, null, this);

        this.physics.add.collider(player, wall);
        this.physics.add.collider(player, box1, function(player, box1) {
            if(interact == true) {
                box1.setVelocityX(-300);
                this.time.addEvent({
                    delay: 800, // in ms
                    callback: () => box1.setVelocityX(0) 
                }); 
            }else{
               this.time.addEvent({
                delay: 200, // in ms
                callback: () => box1.setVelocityX(0) 
            }); 
            }
        }, null, this);

        this.physics.add.overlap(player, door, doorTutOne, null, this);

        
    }

    update(){
    //Keybinds watched and put in to effect
    if (playerMove == true) {
        if (cursors.left.isDown)
            {
                player.setVelocityX(-120);
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(120);
            }
            else
            {
                player.setVelocityX(0);
            }
            
            if (cursors.up.isDown)
            {
                player.setVelocityY(-120);
            }
            else if(cursors.down.isDown) 
            {
                player.setVelocityY(120);
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
            interact = false;
        }
    }

}