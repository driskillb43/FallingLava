/**
 * The Player class (represents the character on the screen) 
 */

//Player's left position in sprite
var FACING_LEFT_X = 8;
var FACING_LEFT_Y = 52;

//Player's right position in sprite
var FACING_RIGHT_X = 3;
var FACING_RIGHT_Y = 100;

//Player dimensions
var PLAYER_WIDTH = 21;
var PLAYER_HEIGHT = 42;

//Amount of pixels between the sprites in the player's spritesheet
var SPRITE_ADDITION = 32;
var SPRITE_AMOUNT = 3;

//Amount of gravity the player feels
GRAVITY_AMOUNT = 10;

var Player = Class.create(
{
	initialize: function() 
	{
	    this.srcX = FACING_LEFT_X;
	    this.srcY = FACING_LEFT_Y;
	    this.width = PLAYER_WIDTH;
	    this.height = PLAYER_HEIGHT;
	    this.drawX = CANVAS_WIDTH / 2;
	    this.drawY = GROUND_Y - PLAYER_HEIGHT;
	    this.centerX = this.drawX + (this.width / 2);
	    this.centerY = this.drawY + (this.height / 2);
	    this.runSpeed = 2;
	    this.jumpSpeed = 30;
	    this.jumpCount = 0;
	    this.jumpAmount = 50;
	    this.spriteAddition = FACING_LEFT_X;
	    this.isRightKey = false;
	    this.isLeftKey = false;
	    this.isSpaceBar = false;
	    this.isJumping = false;
	    this.playerSprite = new Image();
	    this.playerSprite.src = "images/egyptianqueen.png";
	    this.isDead = false;
	},

	update: function () 
	{
	    this.centerX = this.drawX + (this.width / 2);
	    this.centerY = this.drawY + (this.height / 2);
	    this.checkDirection();
	},

	draw: function () 
	{
		ctxEntities.drawImage(this.playerSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	},

	checkDirection: function () 
	{
	    var newDrawX = this.drawX,
	        newDrawY = this.drawY;
	    
	    if (this.isRightKey) 
	    {
	        newDrawX += this.runSpeed;
	        this.changeImage(this.spriteAddition, FACING_RIGHT_Y, PLAYER_WIDTH, PLAYER_HEIGHT, FACING_RIGHT_X);
	    } 
	    else if (this.isLeftKey) 
	    {
	        newDrawX -= this.runSpeed;
	        this.changeImage(this.spriteAddition, FACING_LEFT_Y, PLAYER_WIDTH, PLAYER_HEIGHT, FACING_LEFT_X);
	    }
	    
	    if (this.isSpaceBar) 
	    {
	    	this.isJumping = true;
	    }
	    
	    if(!this.outOfBoundsX(newDrawX))
	    {
	    	this.drawX = newDrawX;
	    }
	    
	    //Apply gravity
	    if(this.isJumping)
	    {
	    	if(this.jumpCount >= this.jumpAmount)
	    	{
	    		newDrawY += GRAVITY_AMOUNT;
	    	}
	    	else
	    	{
	    		this.jumpCount++;
	    		newDrawY -= this.jumpSpeed;
	    		newDrawY += GRAVITY_AMOUNT + this.jumpCount;
	    	}
	    }
	    
	    if(!this.outOfBoundsY(newDrawY))
	    {
	    	this.drawY = newDrawY;
	    }
	    else
	    {
	    	this.jumpCount = 0;
	    	this.isJumping = false;
	    }
	},

	changeImage: function(srcX, srcY, width, height, originalSrcX) 
	{
		this.srcX = srcX;
		this.srcY = srcY;
		this.width = width;
		this.height = height;
	    if(this.spriteAddition >= SPRITE_ADDITION * SPRITE_AMOUNT)
	    {
	    	this.spriteAddition = originalSrcX;
	    }
	    else
	    {
	    	this.spriteAddition += SPRITE_ADDITION;
	    }
	},

	playDeathSound: function()
	{
		var audio = new Audio('sounds/thats_hot.wav');
		audio.play();
	},
	
	outOfBoundsX: function(drawX)
	{	
		return (drawX + PLAYER_WIDTH) >= CANVAS_WIDTH || drawX <= 0;
	},

	outOfBoundsY: function(drawY)
	{
		return (drawY + PLAYER_HEIGHT) >= GROUND_Y + 15;
	}
});
