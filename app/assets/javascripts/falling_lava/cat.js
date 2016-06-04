/**
 * The Cat class (represents the kitty on the screen) 
 */

//Cat's left position in sprite
var CAT_FACING_LEFT_X = 2;
var CAT_FACING_LEFT_Y = 46;

//Cat's right position in sprite
var CAT_FACING_RIGHT_X = 5;
var CAT_FACING_RIGHT_Y = 74;

//Cat dimensions
var CAT_WIDTH = 26;
var CAT_HEIGHT = 14;

//Amount of pixels between the sprites in the cat's spritesheet
var CAT_SPRITE_ADDITION = 32;
var CAT_SPRITE_AMOUNT = 2;

var Cat = Class.create(
{
	initialize: function() 
	{
	    this.srcX = CAT_FACING_LEFT_X;
	    this.srcY = CAT_FACING_LEFT_Y;
	    this.width = CAT_WIDTH;
	    this.height = CAT_HEIGHT;
	    this.drawX = CANVAS_WIDTH - this.width;
	    this.drawY = GROUND_Y - CAT_HEIGHT;
	    this.runSpeed = 2;
	    this.spriteAddition = CAT_FACING_LEFT_X;
        this.spriteAddAddition = true;
        this.isDead = false;
	    this.catSprite = new Image();
	    this.catSprite.src = "images/catsheet.png";
        this.meowAudio = new Audio('sounds/meow.wav');
        this.meowAudio.play();
	},

	update: function() 
	{
        console.log(this.spriteAddition);
        this.drawX -= this.runSpeed;

        if(this.spriteAddAddition)
        {
            this.spriteAddition += CAT_SPRITE_ADDITION;
        }
        else
        {
            this.spriteAddition -= CAT_SPRITE_ADDITION
        }

        if(this.spriteAddition >= CAT_SPRITE_ADDITION * CAT_SPRITE_AMOUNT)
        {
            this.spriteAddAddition = false;
        }
        if(this.spriteAddition === CAT_FACING_LEFT_X)
        {
            this.spriteAddAddition = true;
        }

        if(this.isOutOfBounds())
        {
            this.isDead = false;
        }
        else
        {
            this.srcX = this.spriteAddition;
        }
	},
    
    reset: function()
    {
        this.srcX = CAT_FACING_LEFT_X;
        this.srcY = CAT_FACING_LEFT_Y;
        this.width = CAT_WIDTH;
        this.height = CAT_HEIGHT;
        this.drawX = CANVAS_WIDTH - this.width;
        this.drawY = GROUND_Y - CAT_HEIGHT;
        this.runSpeed = 2;
        this.spriteAddition = CAT_FACING_LEFT_X;
    },

	draw: function() 
	{
		ctxEntities.drawImage(this.catSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	},
	
	isOutOfBounds: function()
	{
        return (this.drawX + this.width) >= CANVAS_WIDTH || this.drawX <= 0;
	},
});
