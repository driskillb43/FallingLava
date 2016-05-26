var Menu = Class.create(
    {
        initialize: function()
        {
            menuContext.font = "60px Comic Sans MS";
            menuContext.fillStyle = "red";
            menuContext.textAlign = "center";
            this.mainMenuText = "Falling Lava"
            this.tryAgainText = "You died. Try again?"
            this.playButton = new Image();
            this.playButton.name = "play_button";
            this.playButtonEnabled = true;
            this.playButtonDrawY = menuCanvas.height / 3;
            this.tryAgain = false;
        },
        
        drawMainMenu: function()
        {
            menuContext.fillText(this.mainMenuText, menuCanvas.width / 2, menuCanvas.height / 4);
            this.playButton.src = "images/play_button.png";
            this.playButton.onload = function() {
                menuContext.drawImage(this, ((menuCanvas.width / 2) - (this.width / 2)), menuCanvas.height / 3);
            };
        },
        
        drawFailMenu: function()
        {
            this.playButtonEnabled = true;
            this.tryAgain = true;
            menuContext.fillText(this.tryAgainText, menuCanvas.width / 2, menuCanvas.height / 4);
            menuContext.drawImage(this.playButton, ((menuCanvas.width / 2) - (this.playButton.width / 2)), this.playButtonDrawY);
        },
        
        checkButtonClicked: function(mouseClickX, mouseClickY)
        {
            if(this.playButtonEnabled && checkCollision(mouseClickX, mouseClickY, ((menuCanvas.width / 2) - (this.playButton.width / 2)), this.playButtonDrawY, this.playButton.width, this.playButton.height))
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
        }
    }
);


