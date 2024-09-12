

//all
var player;
var p1 = false;
let interact = false;
let interacting = 0;
let pressed = 0;
let playerMove = true;
var cursors;
var keyboard;
var background;
//Scene Objects
var pcTrigger;
var pcMail;
var text;
var calendar;
var textField = 'Password';
var note;
var door;
var board;
var skab;


const level_tut = [
    player = {
        key: 'playerOne',
        url: 'img/playerOne.png',
    },
    background = {
        key: 'background2',
        url: 'img/tutorial.png',
    },
    keybinds = {
        key: 'keyBinds',
        url: 'img/assets/keysBinds.png',
    },
    wall = {
        key: 'wall',
        url: 'img/tutWall.png',
    },
    tutText = {
        key: 'tutText',
        url: 'img/assets/tutTalk.png',
    },
    tutText2 = {
        key: 'tutText2',
        url: 'img/assets/tutTalk2.png',
    },
    box = {
            key: 'box',
            url: 'img/assets/Papkasse.png',
        },
    bed = {
        key: 'bed',
        url: 'img/assets/basicSeng.png',
    },
    door = {
        key: 'door',
        url: 'img/assets/door.png',
    }

    ]


const level1_1 = [
    playerOne = {
        key: 'playerOne',
        url: 'img/playerOne.png',
    },
    background = {
        key: 'office',
        url: 'img/office.png',
    },
    loginPc = {
        key: 'loginPc',
        url: 'img/pcBackground.png',
    },
    mailApp = {
        key: 'mailApp',
        url: 'img/assets/mailApp.png',
    },
    mailMessage = {
        key: 'mailMessage',
        url: 'img/assets/mailMessage.png',
    },
    pc = {
        key: 'pc',
        url: 'img/assets/pc.png',
    },
    id = {
        key: 'id',
        url: 'img/assets/id.png',
    },
    kommode = {
        key: 'kommode',
        url: 'img/assets/Kommode.png',
    },
    mail = {
        key: 'mail',
        url: 'img/assets/mail.png',
    },
    skab = {
        key: 'skab',
        url: 'img/assets/Skab.png',
    },
    stol = {
        key: 'stol',
        url: 'img/assets/Stol.png',
    },
    pcHitbox = {
        key: 'pcHitbox',
        url: 'img/pcHitbox.png',
    },


]

const level1_2 = [
    playerOne = {
        key: 'playerOne',
        url: 'img/playerOne.png',
    },
    kitchen = {
        key: 'kitchen',
        url: 'img/kitchen.png',
    },
    endScreen = {
        key: 'end',
        url: 'img/assets/end.png'
    },
    calendar = {
        key: 'calendar',
        url: 'img/assets/calendar.png',
    },
    letter = {
        key: 'letter',
        url: 'img/assets/letter.png',
    },
    papir = {
        key: 'papir',
        url: 'img/assets/Papir.png',
    },
    calendarSee = {
        key: 'calendarSee',
        url: 'img/assets/calendarSee.png',
    },
    door = {
        key: 'door',
        url: 'img/assets/door.png',
    },
    doorKeypad = {
        key: 'doorKeypad',
        url: 'img/assets/doorKeypad.png',
    }
]