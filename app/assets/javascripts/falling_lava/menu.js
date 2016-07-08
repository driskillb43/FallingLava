var GAME_TITLE_TEXT = "Falling Lava",
    TRY_AGAIN_TEXT = "You died. Try again?";

var Menu = Class.create(
    {
        initialize: function()
        {
            menuContext.font = "60px monospace";
            menuContext.fillStyle = "red";
            this.playButtonEnabled = true;
            this.playButtonDrawY = menuCanvas.height / 3;
            this.tryAgain = false;
        },

        drawCenterText: function(text, yOffset)
        {
            menuContext.fillText(text, (menuCanvas.width - menuContext.measureText(text).width) / 2, (menuCanvas.height / 4) + yOffset);
        },
        
        drawMainMenu: function()
        {
            this.drawCenterText(GAME_TITLE_TEXT, 0);
            menuContext.drawImage(playButtonImage, ((menuCanvas.width / 2) - (playButtonImage.width / 2)), menuCanvas.height / 3);
        },
        
        drawFailMenu: function()
        {
            this.playButtonEnabled = true;
            this.tryAgain = true;
            this.drawCenterText(TRY_AGAIN_TEXT, 0);
            menuContext.drawImage(playButtonImage, ((menuCanvas.width / 2) - (playButtonImage.width / 2)), this.playButtonDrawY);
        },
        
        checkButtonClicked: function(mouseClickX, mouseClickY)
        {
            if(this.playButtonEnabled && checkCollision(mouseClickX, mouseClickY, ((menuCanvas.width / 2) - (playButtonImage.width / 2)), this.playButtonDrawY, playButtonImage.width, playButtonImage.height))
            {
                this.playButtonEnabled = false;
                if(this.tryAgain)
                {
                    resetGame();
                }
                else
                {
                    startGame();
                }
            }
        },
        
        checkButtonHoverOver: function(mouseX, mouseY)
        {
            
        }
    }
);


