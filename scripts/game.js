/**
 * The main game file
 */
var canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d"),
    canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height,
    groundY = 400,
    player = new Player(),
    lavas = new Array(),
    isPlaying = false,
    requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        },
    bgSprite = new Image();
bgSprite.src = "images/background.png";
bgSprite.addEventListener("load", init, false);


function init() 
{
    document.addEventListener("keydown", function(event) {checkKey(event, true);}, false);
    document.addEventListener("keyup", function(event) {checkKey(event, false);}, false);
    initializeLavas();
    begin();
}

function initializeLavas()
{
	for (var i = 0; i <= 10; i++)
	{
		lavas.push(new Lava(randomRange(0, canvasWidth), randomRange(1, 10)))
	}
}

function begin()
{
    ctxBg.drawImage(bgSprite, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
    isPlaying = true;
    requestAnimFrame(loop);
}

function update() 
{
    clearCtx(ctxEntities);
    player.update();
    for (var i = 0; i < lavas.length; i++)
    {
    	lavas[i].update();
    }
    addLavas();
}

function draw() 
{
    player.draw();
    for (var i = 0; i < lavas.length; i++)
    {
    	lavas[i].draw();
    }
}

function loop() 
{
    if (isPlaying) 
    {
        update();
        draw();
        requestAnimFrame(loop);
    }
}

function clearCtx(ctx) 
{
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function checkKey(event, isKeyDown) 
{
    var keyID = event.keyCode || event.which;
    if (keyID === 39) { // Right arrow
        player.isRightKey = isKeyDown;
        event.preventDefault();
    }
    if (keyID === 37) { // Left arrow
        player.isLeftKey = isKeyDown;
        event.preventDefault();
    }
    if (keyID === 32) { // SpaceBar
        player.isSpaceBar = isKeyDown;
        event.preventDefault();
    }
}

function addLavas()
{
	for (var i = 0; i <= randomRange(0, 1); i++)
	{
		lavas.push(new Lava(randomRange(0, canvasWidth), randomRange(1, 10)))
	}
}

function randomRange (min, max) 
{
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function collision(a, b) 
{
    return a.drawX <= b.drawX + b.width &&
        a.drawX >= b.drawX &&
        a.drawY <= b.drawY + b.height &&
        a.drawY >= b.drawY;
}
