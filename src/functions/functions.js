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

function showId () {
    if (interact == true && interacting == false && pressed <= 0) 
        {
            id = this.add.image(400, 300, 'id').setScale(1.5);
            id.setActive(true).setVisible(true);
    
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
            id.setActive(false).setVisible(false);
            
            playerMove = true;
            interacting = false;
            interact = false;
        }
}

function pcShow () {
    if (interact == true && interacting == false && pressed <= 0) 
    {
        pcTrigger = this.add.image(400, 300, 'loginPc').setScale(1);
        pcTrigger.setActive(true).setVisible(true);
        
        //Text input using rexUi plugin
        const text = this.add.text(430, 308, textField, { fixedWidth: 150, fixedHeight: 36 });
        text.setOrigin(0.5, 0.5);
        
            text.setInteractive().on('pointerdown', () => {
                this.rexUI.edit(text)
                if(text._text === 'johndoe26') {
                    console.log('yyaaay')
                    text.setActive(false).setVisible(false);
                    pcTrigger = this.add.image(400, 300, 'mailMessage');
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
        pcTrigger.setActive(false).setVisible(false);

        playerMove = true;
        interacting = false;
        interact = false;
    }

}