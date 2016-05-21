var Menu = Class.create(
    {
        initialize: function()
        {
            menuContext.font = "60px Comic Sans MS";
            menuContext.fillStyle = "red";
            menuContext.textAlign = "center";
            this.text = "Falling Lava"
            this.playButton = new Image();
            this.playButton.src = "images/play_button.png";
            this.playButton.name = "play_button"
            this.playButtonEnabled = true
            this.playButtonDrawX = menuContext.measureText(this.text).width
            this.playButtonDrawY = menuCanvas.height / 3
        },
        
        draw: function()
        {
            menuContext.fillText(this.text, menuCanvas.width / 2, menuCanvas.height / 4);
            menuContext.drawImage(this.playButton, this.playButtonDrawX, this.playButtonDrawY);
        },
        
        checkButtonClicked: function(mouseClickX, mouseClickY)
        {
            if(this.playButtonEnabled && checkCollision(mouseClickX, mouseClickY, this.playButtonDrawX, this.playButtonDrawY, this.playButton.width, this.playButton.height))
            {
                this.playButtonEnabled = false;
                startGame();
            }
        }
    }
);


