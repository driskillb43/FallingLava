/**
 * The Player class (represents the character on the screen)
 */

//Player's left position in sprite
var FACING_LEFT_X = 5;
var FACING_LEFT_Y = 50;
var FACING_LEFT_WIDTH = 25;
var FACING_LEFT_HEIGHT = 45;

//Player's right position in sprite
var FACING_RIGHT_X = 0;
var FACING_RIGHT_Y = 100;
var FACING_RIGHT_WIDTH = 25;
var FACING_RIGHT_HEIGHT = 45;

//Amount of pixels between the sprites in the player's spritesheet
var SPRITE_ADDITION = 32;
var SPRITE_AMOUNT = 3;

function Player() {
    this.srcX = FACING_LEFT_X;
    this.srcY = FACING_LEFT_Y;
    this.width = FACING_LEFT_WIDTH;
    this.height = FACING_LEFT_HEIGHT;
    this.drawX = 400;
    this.drawY = 360;
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.runSpeed = 2;
    this.jumpSpeed = 5;
    this.spriteAddition = FACING_LEFT_X;
    this.isRightKey = false;
    this.isLeftKey = false;
    this.isSpaceBar = false;
    this.jumping = false;
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
        this.changeImage(this.spriteAddition, FACING_RIGHT_Y, FACING_RIGHT_WIDTH, FACING_RIGHT_HEIGHT, FACING_RIGHT_X);
    } 
    else if (this.isLeftKey) 
    {
        newDrawX -= this.runSpeed;
        this.changeImage(this.spriteAddition, FACING_LEFT_Y, FACING_LEFT_WIDTH, FACING_LEFT_HEIGHT, FACING_LEFT_X);
    }
    
    if (this.isSpaceBar) {
    	newDrawY -= this.jumpSpeed;
    }
    
    this.drawX = newDrawX;
    this.drawY = newDrawY;
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