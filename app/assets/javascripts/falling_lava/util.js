/**
 * Utility functions
 */

function randomRange (min, max) 
{
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function checkObjectCollision(a, b)
{
    return checkCollision(a.drawX, a.drawY, b.drawX, b.drawY, b.width, b.height);
}

function checkCollision(aDrawX, aDrawY, bDrawX, bDrawY, bWidth, bHeight)
{
    return aDrawX <= bDrawX + bWidth &&
        aDrawX >= bDrawX &&
        aDrawY <= bDrawY + bHeight &&
        aDrawY >= bDrawY;
}
