class startScene extends Phaser.Scene {
    constructor() {
        super("starterScreen")
    }

preload(){
    this.load.image('background', 'img/assets/pcBackground.png');
}

create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    
    //menu
    const playerOne = this.add.text(config.width / 2 - 50, config.height / 2 - 50, 'Player One', { fill: 'white' })
    .setInteractive().on('pointerdown', function (event)
    {
        this.scene.transition({ target: 'playerOneScene1', duration: 2000 });

    }, this);


    const playerTwo = this.add.text(config.width / 2 - 50, config.height / 2, 'Player Two', { fill: 'white' })
    .setInteractive().on('pointerdown', function (event)
    {

        this.scene.transition({ target: 'playerTwoScene1', duration: 2000 });

    }, this);

    const tutorial = this.add.text(config.width / 2 - 50, config.height / 2 + 50, 'tutorial', { fill: 'white' })
    .setInteractive().on('pointerdown', function (event)
    {

        this.scene.transition({ target: 'tutorial', duration: 2000 });

    }, this);
    
}

update() {

}
}



