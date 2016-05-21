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
	},

	update: function() 
	{
	    if (this.startTime == null)
        {
            this.startTime = Date.now() / 1000;
        }
        this.currentTime = Math.floor((Date.now() / 1000) - this.startTime);
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