class startScene extends Phaser.Scene {
    constructor() {
        super("starterScreen")
    }

preload(){

}

create() {
    
    
    //menu
    const playerOne = this.add.text(400, 50, 'Player One', { fill: 'white' })
    .setInteractive().on('pointerdown', function (event)
    {

        this.scene.transition({ target: 'playerOneScene1', duration: 1000 });

    }, this);


    const playerTwo = this.add.text(400, 200, 'Player Two', { fill: 'white' })
    .setInteractive().on('pointerdown', function (event)
    {

        this.scene.transition({ target: 'playerTwoScene1', duration: 1000 });

    }, this);
    
}

update() {

}
}



