var GAME_TITLE_TEXT = "Falling Lava",
    TRY_AGAIN_TEXT = "You died. Try again?",
    PLAY_TEXT = "Start",
    CONTROLS_TEXT = "Controls",
    CREDITS_TEXT = "Credits",
    RETURN_TO_MAIN_MENU_TEXT = "Return to Main Menu";

var SELECTED_COLOR = "#ffff00",
    NOT_SELECTED_COLOR = "#ffffff";

var Menu = Class.create(
    {
        initialize: function()
        {
            this.menuEnabled = false;
            this.tryAgain = false;
            this.menuItems = new Array();
            this.menuIndex = 0;
        },
        
        drawTitleText: function(text, yOffset)
        {
            var text = new createjs.Text(text, "60px monospace", "#ff0000");
            this.centerText(text, yOffset);
            menuStage.addChild(text);
        },

        drawMenuItemText: function(text, yOffset, selected)
        {
            var text = new createjs.Text(text, "30px monospace", selected ? SELECTED_COLOR : NOT_SELECTED_COLOR);
            this.centerText(text, yOffset);
            this.menuItems.push(text);
            menuStage.addChild(text);
        },

        drawExplanationText: function(text, yOffset, leftColumn)
        {
            var text = new createjs.Text(text, "30px monospace", NOT_SELECTED_COLOR);
            if(leftColumn)
            {
                text.x = (menuCanvas.width / 4) - text.getMeasuredWidth() / 2;
            }
            else
            {
                text.x = (menuCanvas.width * 0.75) - text.getMeasuredWidth() / 2;
            }
            text.y = (menuCanvas.height / 6) + yOffset;
            menuStage.addChild(text);
        },

        centerText: function(text, yOffset)
        {
            text.x = (menuCanvas.width - text.getMeasuredWidth()) / 2;
            text.y = (menuCanvas.height / 6) + yOffset;
        },

        drawControlsExplanation: function()
        {
            this.menuEnabled = true;
            this.menuIndex = 0;
            this.menuItems.clear();
            this.drawExplanationText('Run Right', 0, true);
            this.drawExplanationText('Right Arrow ->', 0, false);
            this.drawExplanationText('Run Left', 40, true);
            this.drawExplanationText('Left Arrow <-', 40, false);
            this.drawExplanationText('Jump', 80, true);
            this.drawExplanationText('Spacebar', 80, false);
            this.drawMenuItemText(RETURN_TO_MAIN_MENU_TEXT, 160, true);
            menuStage.update();
        },

        drawMainMenu: function()
        {
            this.menuEnabled = true;
            this.menuIndex = 0;
            this.menuItems.clear();
            this.drawTitleText(GAME_TITLE_TEXT, 0);
            this.drawMenuItemText(PLAY_TEXT, 80, true);
            this.drawMenuItemText(CONTROLS_TEXT, 120, false);
            menuStage.update();
        },
        
        drawLevelNumber: function()
        {
            this.drawTitleText('Level 1', 0);
            menuStage.update();
        },
        
        drawFailMenu: function()
        {
            this.menuEnabled = true;
            this.tryAgain = true;
            this.menuIndex = 0;
            this.menuItems.clear();
            this.drawTitleText(TRY_AGAIN_TEXT, 0);
            this.drawMenuItemText(PLAY_TEXT, 80, true);
            menuStage.update();
        },

        changeSelection: function(down)
        {
            if(down)
            {
                if(this.menuIndex !== this.menuItems.length - 1)
                {
                    this.menuIndex++;
                }
            }
            else
            {
                if(this.menuIndex !== 0)
                {
                    this.menuIndex--;
                }
            }

            for (var i = 0; i < this.menuItems.length; i++)
            {
                if(i === this.menuIndex)
                {
                    this.menuItems[i].color = SELECTED_COLOR;
                }
                else
                {
                    this.menuItems[i].color = NOT_SELECTED_COLOR;
                }
            }
            menuStage.update();
        },

        selectMenuItem: function()
        {
            if(this.menuEnabled)
            {
                menuStage.removeAllChildren();
                menuStage.update();
                if(this.menuItems[this.menuIndex].text === PLAY_TEXT)
                {
                    if(this.tryAgain)
                    {
                        resetGame();
                    }
                    else
                    {
                        startGame();
                    }
                    this.menuEnabled = false;
                }
                else if(this.menuItems[this.menuIndex].text === CONTROLS_TEXT)
                {
                    this.drawControlsExplanation();
                }
                else if(this.menuItems[this.menuIndex].text === RETURN_TO_MAIN_MENU_TEXT)
                {
                    this.drawMainMenu();
                }
            }
        }
    }
);


