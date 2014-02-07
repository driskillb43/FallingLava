/**
 * Class representing the falling lava
 */

function Lava(drawX, fallSpeed) 
{
    this.srcX = 0;
    this.srcY = 0;
    this.width = 16;
    this.height = 24;
    this.drawX = drawX;
    this.drawY = 0;
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
    this.fallSpeed = fallSpeed;
    this.playerSprite = new Image();
    this.playerSprite.src = "images/fire.png";
}

Lava.prototype.update = function() 
{
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);
};

Lava.prototype.draw = function() 
{
	this.drawY += this.fallSpeed;
	this.checkPosition()
    ctxEntities.drawImage(this.playerSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
}

Lava.prototype.checkPosition = function()
{
	if(this.isOutOfBounds())
	{
		this.reset();
	}
}

Lava.prototype.reset = function()
{
	this.drawX = randomRange(0, CANVAS_WIDTH);
	this.drawY = 0;
}

Lava.prototype.isOutOfBounds = function() 
{
	return this.drawY >= CANVAS_HEIGHT;
}