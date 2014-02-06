/**
 * The Player class (represents the character on the screen)
 */

//Player's left position in sprite
var FACING_LEFT_X = 5;
var FACING_LEFT_Y = 50;

//Player's right position in sprite
var FACING_RIGHT_X = 0;
var FACING_RIGHT_Y = 100;

//Player dimensions
var PLAYER_WIDTH = 25;
var PLAYER_HEIGHT = 45;

//Amount of pixels between the sprites in the player's spritesheet
var SPRITE_ADDITION = 32;
var SPRITE_AMOUNT = 3;

//Amount of gravity the player feels
GRAVITY_AMOUNT = 5;

function Player() {
    this.srcX = FACING_LEFT_X;
    this.srcY = FACING_LEFT_Y;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.drawX = canvasWidth / 2;
    this.drawY = groundY - 40;
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.runSpeed = 2;
    this.jumpSpeed = 5;
    this.jumpCount = 0;
    this.jumpAmount = 50;
    this.spriteAddition = FACING_LEFT_X;
    this.isRightKey = false;
    this.isLeftKey = false;
    this.isSpaceBar = false;
    this.isJumping = false;
    this.playerSprite = new Image();
    this.playerSprite.src = "images/egyptianqueen.png";
}

Player.prototype.update = function () {
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.checkDirection();
};

Player.prototype.draw = function () {
    ctxEntities.drawImage(this.playerSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

Player.prototype.checkDirection = function () {
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
    
    if (this.isSpaceBar && !this.isJumping) {
    	newDrawY -= this.jumpSpeed;
    	this.isJumping = true;
    }
    
    if(!this.outOfBoundsX(newDrawX))
    {
    	this.drawX = newDrawX;
    }
    
    //Apply gravity
    if(this.isJumping && this.jumpAmount !== this.jumpCount)
    {
    	newDrawY += GRAVITY_AMOUNT;
    }
    else
    {
    	this.jumpCount++;
    }
    
    if(!this.outOfBoundsY(newDrawY))
    {
    	this.drawY = newDrawY;
    }
    else
    {
    	this.isJumping = false;
    }
}

Player.prototype.changeImage = function(srcX, srcY, width, height, originalSrcX) {
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
}

Player.prototype.outOfBoundsX = function(drawX)
{
	return (drawX + PLAYER_WIDTH) >= canvasWidth || drawX <= 0;
}

Player.prototype.outOfBoundsY = function(drawY)
{
	return (drawY + PLAYER_HEIGHT) >= groundY + 5;
	this.jumpCount = 0;
}
