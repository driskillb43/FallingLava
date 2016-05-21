/**
 * The main game file
 */

//Grabs the background and front canvases
var backgroundCanvas = document.getElementById("backgroundCanvas"),
    backgroundContext = backgroundCanvas.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d"),
    menuCanvas = document.getElementById("menu"),
    menuContext = menuCanvas.getContext("2d");

//Constants for the background
var CANVAS_WIDTH = backgroundCanvas.width,
    CANVAS_HEIGHT = backgroundCanvas.height,
    GROUND_Y = 400,
    LAVA_START_AMOUNT = 2,
    BACKGROUND_IMAGE_PATH = "images/background.png",
    LOAD_EVENT = "load",
    KEY_DOWN_EVENT = "keydown",
    KEY_UP_EVENT = "keyup",
    MOUSE_CLICK = "click"
    RIGHT_ARROW_ID = 39,
    LEFT_ARROW_ID = 37,
    SPACEBAR_ID = 32;

var entities = new Array(),	
	player = new Player(),
    timer = new Timer(),
    isPlaying = false,
    requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        },
    bgSprite = new Image(),
    menu = new Menu();
bgSprite.src = BACKGROUND_IMAGE_PATH;
bgSprite.addEventListener(LOAD_EVENT, init, false);

function startGame()
{
    clearCtx(menuContext);
    document.addEventListener(KEY_DOWN_EVENT, function(event) {checkKey(event, true);}, false);
    document.addEventListener(KEY_UP_EVENT, function(event) {checkKey(event, false);}, false);
    initializeEntities();
    isPlaying = true;
}

function initializeEntities()
{
    entities.push(player);
    entities.push(timer);
    initializeLavas();
}

function resetGame()
{
    clearCtx(menuContext);
    isPlaying = true;
}

function initializeLavas()
{
	for (var i = 0; i <= LAVA_START_AMOUNT; i++)
	{
		entities.push(new FallingLava(randomRange(0, CANVAS_WIDTH), randomRange(1, 3)))
	}
}

function init()
{
    backgroundContext.drawImage(bgSprite, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    document.addEventListener(MOUSE_CLICK, function(event) {checkMouseClick(event);}, false);
    menu.drawMainMenu();
    var audio = new Audio('sounds/falling_lava.wav');
    audio.play();
    requestAnimFrame(loop);
}

function update() 
{
    clearCtx(ctxEntities);
    for (var i = 0; i < entities.length; i++)
    {
    	entities[i].update();
    }
    if(timer.currentTime != 0)
    {
        if(timer.currentTime % 5 == 0 && timer.changed)
        {
            var lavaEntities = new Array();
            for (var i = 0; i < entities.length; i++)
            {
                if((entities[i] instanceof FallingLava) || (entities[i] instanceof SidewaysLava))
                {
                    lavaEntities.push(entities[i]);
                }
            }
            lavaEntities[randomRange(0, lavaEntities.length - 1)].increaseSpeed();
        }
        if (timer.currentTime % 10 == 0 && timer.changed)
        {
            entities.push(new FallingLava(randomRange(0, CANVAS_WIDTH), randomRange(1, 3)))
        }
        if (timer.currentTime % 20 == 0 && timer.changed)
        {
            entities.push(new SidewaysLava(randomRange(0, GROUND_Y), randomRange(1, 3), randomTrueOrFalse()));
        }
    }
}

function resetEntities()
{
    clearCtx(ctxEntities);
    for (var i = 0; i < entities.length; i++)
    {
        entities[i].reset();
    }
    entities.clear();
    initializeEntities();
}

function draw() 
{
    for (var i = 0; i < entities.length; i++)
    {
    	entities[i].draw();
    	if(((entities[i] instanceof FallingLava) || (entities[i] instanceof SidewaysLava)) && checkObjectCollision(entities[i], player))
    	{
            player.playDeathSound();
    		player.isDead = true;
    		isPlaying = false;
            player.deathAudio.onended = function()
            {
                resetEntities();
                menu.drawFailMenu();
            }
    	}
    }
}

function loop() 
{
    if (isPlaying) 
    {
        update();
        draw();
    }
    requestAnimFrame(loop);
}

function clearCtx(ctx) 
{
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function checkKey(event, isKeyDown) 
{
    var keyID = event.keyCode || event.which;
    if (keyID === RIGHT_ARROW_ID)
    { 
        player.isRightKey = isKeyDown;
        event.preventDefault();
    }
    if (keyID === LEFT_ARROW_ID)
    {
        player.isLeftKey = isKeyDown;
        event.preventDefault();
    }
    if (keyID === SPACEBAR_ID)
    { 
        player.isSpaceBar = isKeyDown;
        event.preventDefault();
    }
}

function checkMouseClick(event)
{
    var rect = menuCanvas.getBoundingClientRect();
    menu.checkButtonClicked(event.pageX - rect.left, event.pageY - rect.top);
    event.preventDefault();
}