/**
 * Utility functions
 */

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
