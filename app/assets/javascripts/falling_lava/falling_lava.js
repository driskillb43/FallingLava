/**
 * Class representing the falling lava
 */

var FallingLava = Class.create({
	
	initialize: function(drawX, fallSpeed) 
	{
	    this.srcX = 0;
	    this.srcY = 0;
	    this.width = 16;
	    this.height = 24;
	    this.drawX = drawX;
	    this.drawY = 0;
	    this.fallSpeed = fallSpeed;
	    this.fallingLavaSprite = new Image();
	    this.fallingLavaSprite.src = "images/fire.png";
	},

	update: function() 
	{
        this.drawY += this.fallSpeed;
	},
	
	draw: function() 
	{
		this.checkPosition()
	    ctxEntities.drawImage(this.fallingLavaSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	},
	
	checkPosition: function()
	{
		if(this.isOutOfBounds())
		{
			this.reset();
		}
	},

	reset: function()
	{
		this.drawX = randomRange(0, CANVAS_WIDTH);
		this.drawY = 0;
	},

	isOutOfBounds: function() 
	{
		return this.drawY >= GROUND_Y;
	},
    
    increaseSpeed: function()
    {
        this.fallSpeed += 1;
    }
});