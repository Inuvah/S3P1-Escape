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
    scene:  [startScene, scene1_1, scene1_2]
};
//Phaser base setup for creating basic canvas with premade physics
const game = new Phaser.Game(config);



