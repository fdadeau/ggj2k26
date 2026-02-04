
import { data } from "./preload.js";

import { audio } from "./audio.js";

const DEBUG = true;

/**
 * Abstract class describing entities (things that appear on the screen)
 */
class Entity {

    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    update(dt) {
        // does nothing by default
    }

    render(ctx, srcX, srcY) {
        // displays hitbox by defaults
        const s = ctx.strokeStyle;
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x - srcX, this.y - srcY, this.width, this.height);
        ctx.strokeStyle = s;
    }

    intersects(player) {
        return !(player.x - player.width / 2 > this.x + this.width 
                || player.x + player.width / 2 < this.x 
                || player.y < this.y 
                || player.y - player.height > this.y + this.height);
    }
}


/***
 * Class describing the masks that the player collects on his way. 
 */

const MASK_SIZE = 30;

export class Mask extends Entity {

    constructor(x,y,b,k) {
        super(x - MASK_SIZE/2,y-MASK_SIZE,MASK_SIZE,MASK_SIZE);
        this.blur = b;
        this.kind = k;
        this.active = true;
    }

    collect() {
        this.active = false;
    }

    render(ctx, srcX, srcY) {
        if (this.active) {
            ctx.shadowColor = this.blur ?? "rgba(255, 255, 255, 0.9)";
            ctx.drawImage(data[`mask-${this.kind}`], this.x - srcX, this.y - srcY, this.width, this.height);
            DEBUG && super.render(ctx, srcX, srcY);
        }
    }

    intersects(player) {
        return this.active && super.intersects(player);
    }
}


/**
 *  Class describing the enemies through which the player can dash when wearing the ninja mask.
 */
export class Enemy extends Entity {

    constructor(x,y,w,h) {
        super(x,y,w,h);
    }

    update(dt) {

    }

    render(ctx, srcX, srcY) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x - srcX, this.y - srcY, this.width, this.height);
        DEBUG && super.render(ctx, srcX, srcY);
    }

    intersects(player) {
        return !player.dash && super.intersects(player);
    }

}


/**
 * Class describing the blocks that the player can destroy when wearing the wrestler mask.
 */
const BREAKABLE_HITS = 3;
export class Breakable extends Entity {

    constructor(x,y,w,h,b,s) {
        super(x,y,w,h);
        this.life = BREAKABLE_HITS;
        this.blocks = b;
        this.size = s;
        console.log(this);
    }

    render(ctx, srcX, srcY) {
        if (this.life == 0) return;
        this.blocks.forEach(bl => {
            ctx.drawImage(data[`block-broken${this.life == BREAKABLE_HITS ? 2 : 1}`], bl[1]*this.size - srcX, bl[0]*this.size - srcY, this.size, this.size);
        });  
        DEBUG && super.render(ctx, srcX, srcY);  
    }

    hit(x,y,map) {
        if (this.life == 0) return;
        if (x >= this.x && x <= this.x * this.width && y >= this.y && y <= this.y * this.height) {
            this.life--;
            audio.playSound(this.life == 0 ? "fx-collapse" : "fx-wrestler", "player", 1);
            if (this.life == 0) {
                this.blocks.forEach(coords => map[coords[0]][coords[1]] = 0);
            } 
        }
    }

}

/***
 *  Class representing the exists  
 */
export class Exit extends Entity {

    constructor(x,y,w,h,n) {
        super(x,y,w,h);
        this.nextLevel = n;
    }

    render(ctx, srcX, srcY) {
        ctx.drawImage(data["portal"], this.x - srcX, this.y - srcY, this.width, this.height);
        DEBUG && super.render(ctx, srcX, srcY);  
    }

}