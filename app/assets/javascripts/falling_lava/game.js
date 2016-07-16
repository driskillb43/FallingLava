/**
 * The main game file
 */

//Grabs the background, entities, and menu canvas
var backgroundCanvas = document.getElementById("backgroundCanvas"),
    backgroundContext = backgroundCanvas.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d"),
    menuCanvas = document.getElementById("menu"),
    menuContext = menuCanvas.getContext("2d");

//Creates the stages
var menuStage = new createjs.Stage(menuCanvas);

//Constants for the background
var CANVAS_WIDTH = backgroundCanvas.width,
    CANVAS_HEIGHT = backgroundCanvas.height,
    GROUND_Y = 400,
    LAVA_START_AMOUNT = 2,
    BACKGROUND_IMAGE_PATH = "images/background.png",
    PLAYER_IMAGE_PATH = "images/egyptianqueen.png",
    CAT_IMAGE_PATH = "images/catsheet.png",
    FALLING_LAVA_IMAGE_PATH = "images/fire.png",
    FALLING_LAVA_AUDIO_PATH = "sounds/falling_lava.wav",
    PLAYER_FIRE_DEATH_AUDIO = "sounds/thats_hot.wav",
    PLAYER_CAT_DEATH_AUDIO = "sounds/bad_kitty.wav",
    MEOW_AUDIO_PATH = "sounds/meow.wav",
    LEVEL_ONE_AUDIO = "sounds/level_1_track.wav"
    KEY_DOWN_EVENT = "keydown",
    KEY_UP_EVENT = "keyup",
    MOUSE_CLICK = "click",
    MOUSE_MOVE = "mousemove",
    DOWN_ARROW_ID = 40,
    RIGHT_ARROW_ID = 39,
    UP_ARROW_ID = 38,
    LEFT_ARROW_ID = 37,
    SPACEBAR_ID = 32,
    ENTER_ID = 13;

var entities = new Array(),
    player = new Player(),
    timer = new Timer(),
    menu = new Menu(),
    isPlaying = false,
    requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };

var gameInitialized = false,
    downMenuChanged = false,
    upMenuChanged = false,
    menuSelected = false,
    bgSprite = new Image(),
    bgSpriteLoaded = false,
    playerSprite = new Image(),
    playerSpriteLoaded = false,
    catSprite = new Image(),
    catSpriteLoaded = false,
    fallingLavaSprite = new Image(),
    fallingLavaSpriteLoaded = false,
    fallingLavaAudio = new Audio(),
    fallingLavaAudioLoaded = false,
    meowAudio = new Audio(),
    meowAudioLoaded = false,
    playerFireDeathAudio = new Audio(),
    playerFireDeathAudioLoaded = false,
    playerCatDeathAudio = new Audio(),
    playerCatDeathAudioLoaded = false,
    levelOneAudio = new Audio(),
    levelOneAudioLoaded = false;
    

loadImagesAndAudio();

function loadImagesAndAudio()
{
    bgSprite.src = BACKGROUND_IMAGE_PATH;
    bgSprite.onload = function() {
        bgSpriteLoaded = true;
        init();
    }
    playerSprite.src = PLAYER_IMAGE_PATH;
    playerSprite.onload = function() {
        playerSpriteLoaded = true;
        init();
    }
    catSprite.src = CAT_IMAGE_PATH;
    catSprite.onload = function() {
        catSpriteLoaded = true;
        init();
    }
    fallingLavaSprite.src = FALLING_LAVA_IMAGE_PATH;
    fallingLavaSprite.onload = function() {
        fallingLavaSpriteLoaded = true;
        init();
    }
    fallingLavaAudio.src = FALLING_LAVA_AUDIO_PATH;
    fallingLavaAudio.oncanplaythrough = function() {
        fallingLavaAudioLoaded = true;
        init();
    }
    meowAudio.src = MEOW_AUDIO_PATH;
    meowAudio.oncanplaythrough = function() {
        meowAudioLoaded = true;
        init();
    }
    playerFireDeathAudio.src = PLAYER_FIRE_DEATH_AUDIO;
    playerFireDeathAudio.oncanplaythrough = function() {
        playerFireDeathAudioLoaded = true;
        init();
    }
    playerCatDeathAudio.src = PLAYER_CAT_DEATH_AUDIO;
    playerCatDeathAudio.oncanplaythrough = function() {
        playerCatDeathAudioLoaded = true;
        init();
    }
    levelOneAudio.src = LEVEL_ONE_AUDIO;
    levelOneAudio.loop = true;
    levelOneAudio.oncanplaythrough = function() {
        levelOneAudioLoaded = true;
        init();
    }
}
function startGame()
{
    fallingLavaAudio.play();
    fallingLavaAudio.onended = function()
    {
        menuStage.removeAllChildren();
        menuStage.update();
        levelOneAudio.play();
        initializeEntities();
        isPlaying = true;
    }
}

function initializeEntities()
{
    entities.push(player);
    entities.push(timer);
    initializeLavas();
}

function resetGame()
{
    fallingLavaAudio.play();
    fallingLavaAudio.onended = function()
    {
        menuStage.removeAllChildren();
        menuStage.update();
        levelOneAudio.play();
        isPlaying = true;
    }
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
    if(bgSpriteLoaded 
        && playerSpriteLoaded 
        && catSpriteLoaded 
        && fallingLavaSpriteLoaded
        && fallingLavaAudioLoaded
        && meowAudioLoaded
        && playerCatDeathAudioLoaded
        && playerFireDeathAudioLoaded
        && levelOneAudioLoaded
        && !gameInitialized)
    {
        gameInitialized = true;
        backgroundContext.drawImage(bgSprite, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        document.addEventListener(KEY_DOWN_EVENT, function(event) {checkKey(event, true);}, false);
        document.addEventListener(KEY_UP_EVENT, function(event) {checkKey(event, false);}, false);
        menu.drawMainMenu();
        requestAnimFrame(loop);
    }
}

function update() 
{
    clearCtx(ctxEntities);
    for (var i = 0; i < entities.length; i++)
    {
        if(!entities[i].isDead)
        {
            entities[i].update();
        }

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
        if (timer.currentTime % 30 == 0 && timer.changed)
        {
            entities.push(new Cat());
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
    	if(((entities[i] instanceof FallingLava) || (entities[i] instanceof SidewaysLava || (entities[i] instanceof Cat))) && checkObjectCollision(entities[i], player))
    	{
            saveScore();
            if(entities[i] instanceof FallingLava || entities[i] instanceof SidewaysLava)
            {
                levelOneAudio.pause();
                levelOneAudio.currentTime = 0;
                player.playFireDeathSound();
            }
            else 
            {
                levelOneAudio.pause();
                levelOneAudio.currentTime = 0;
                player.playCatDeathSound();
            }
            
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
    if(keyID == DOWN_ARROW_ID)
    {
        if(menu.menuEnabled)
        {
            if(isKeyDown && !downMenuChanged)
            {
                menu.changeSelection(true);
                downMenuChanged = true;
            }
            event.preventDefault();
        }

        if(!isKeyDown)
        {
            downMenuChanged = false;
        }
    }
    if(keyID == UP_ARROW_ID)
    {
        if(menu.menuEnabled)
        {
            if(isKeyDown && !upMenuChanged)
            {
                menu.changeSelection(false);
                upMenuChanged = true;
            }
            event.preventDefault();
        }

        if(!isKeyDown)
        {
            upMenuChanged = false;
        }
    }
    if(keyID == ENTER_ID)
    {
        if(menu.menuEnabled)
        {
            if(isKeyDown && !menuSelected)
            {
                menuSelected = true;
                menu.selectMenuItem();
            }
            event.preventDefault();
        }

        if(!isKeyDown)
        {
            menuSelected = false;
        }
    }
    if(keyID === RIGHT_ARROW_ID)
    { 
        if(isPlaying)
        {
            player.isRightKey = isKeyDown;
            event.preventDefault();
        }
    }
    if(keyID === LEFT_ARROW_ID)
    {
        if(isPlaying)
        {
            player.isLeftKey = isKeyDown;
            event.preventDefault();
        }
    }
    if(keyID === SPACEBAR_ID)
    {
        if(isPlaying)
        {
            player.isSpaceBar = isKeyDown;
            event.preventDefault();   
        }
    }
}

function saveScore()
{
    jQuery.ajax({
        type: 'POST',
        url: "falling_lava/save_score",
        data: { score: {score: timer.currentTime }},
        dataType: 'json'
    });
}