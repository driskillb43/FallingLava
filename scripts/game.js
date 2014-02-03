/**
 * The main game file
 */
var canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d"),
    canvasWidth = canvasBg.width,
    canvasHeight = canvasBg.height,
    player = new Player();
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


function init() {
    document.addEventListener("keydown", function(event) {checkKey(event, true);}, false);
    document.addEventListener("keyup", function(event) {checkKey(event, false);}, false);
    begin();
}

function begin() {
    ctxBg.drawImage(bgSprite, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
    isPlaying = true;
    requestAnimFrame(loop);
}

function update() {
    clearCtx(ctxEntities);
    player.update();
}

function draw() {
    player.draw();
}

function loop() {
    if (isPlaying) {
        update();
        draw();
        requestAnimFrame(loop);
    }
}

function clearCtx(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function checkKey(event, isKeyDown) {
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
