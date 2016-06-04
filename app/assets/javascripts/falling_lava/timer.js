/**
 * Class representing the timer
 */

var Timer = Class.create({
	
	initialize: function()
	{
        ctxEntities.font = "20px Comic Sans MS";
        ctxEntities.fillStyle = "white";
        ctxEntities.textAlign = "center";
        this.startTime = null;
        this.currentTime = null;
        this.changed = false;
        this.previousTime = null;
        this.isDead = false;
	},

	update: function() 
	{
	    if (this.startTime == null)
        {
            this.startTime = Date.now() / 1000;
            this.previousTime = this.startTime;
        }
        this.currentTime = Math.floor((Date.now() / 1000) - this.startTime);
        if(this.previousTime != this.currentTime)
        {
            this.changed = true;
            this.previousTime = this.currentTime;
        }
        else 
        {
            this.changed = false;
        }
	},
	
	draw: function() 
	{
        ctxEntities.fillText(this.currentTime, menuCanvas.width / 2, parseInt(ctxEntities.font));
	},
    
    reset: function()
    {
        this.startTime = null;
    }
});