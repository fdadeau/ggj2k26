
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
const PIXEL_SIZE = 1;
export class Enemy extends Entity {

    constructor(x,y,w,h) {
        super(x,y,w,h);
//        this.fireflies = Array(h/PIXEL_SIZE).fill(Array(w/PIXEL_SIZE).fill(0));

        this.cols = Math.floor(w / PIXEL_SIZE);
        this.rows = Math.floor(h / PIXEL_SIZE);

        // Intensité du feu
        this.fireflies = new Uint8Array(this.cols * this.rows);

        // Palette (transparent → jaune → orange → rouge → noir)
        this.palette = [];
        for (let i = 0; i < 256; i++) {
            this.palette[i] =
                i < 50  ? [0, 0, 0, 0] :
                i < 100 ? [255, i * 2, 0, 180] :
                i < 180 ? [255, 120, 0, 220] :
                            [255, 255, 200, 255];
        }

        const cols = this.cols, rows = this.rows;
        for (let x = 0; x < this.cols; x++) {
            const edge = Math.min(x, cols - 1 - x);
            const edgeFactor = Math.min(1, edge / (cols * 0.15));
            this.fireflies[(rows - 1) * cols + x] =
                (200 + Math.random() * 55) * edgeFactor;
        }
    }

    update(dt) {
        for (let y = 1; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const src = y * this.cols + x;
                const dx = (Math.random() * 3 | 0) - 1;
                const dstX = Math.min(this.cols - 1, Math.max(0, x + dx));
                const dstY = y - 1;
                const dst = dstY * this.cols + dstX;

                const edge =
                Math.min(dstX, this.cols - 1 - dstX) / (this.cols * 0.5);
                const cooling = 2 + (1 - edge) * 6;

                this.fireflies[dst] = Math.max(
                this.fireflies[src] - Math.random() * cooling,
                0
                );
            }
        }
    }

    render(ctx, srcX, srcY) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const v = this.fireflies[y * this.cols + x];
                if (v <= 0) continue;

                ctx.fillStyle = fireColor(v);

                ctx.fillRect(
                    this.x + x * PIXEL_SIZE - srcX,
                    this.y + y * PIXEL_SIZE - srcY,
                    PIXEL_SIZE,
                    PIXEL_SIZE
                );
            }
        }
        DEBUG && super.render(ctx, srcX, srcY);
    }

    intersects(player) {
        return !player.dash && super.intersects(player);
    }

}
function fireColor(v) {
    v = Math.max(0, Math.min(255, v));

    let r = 0, g = 0, b = 0, a = 0;

    if (v < 40) {
      a = v * 2;
    } else if (v < 90) {
      r = v * 2;
      g = v * 0.4;
      a = 180;
    } else if (v < 160) {
      r = 255;
      g = (v - 90) * 2.3;
      a = 220;
    } else {
      r = 255;
      g = 220;
      b = (v - 160) * 1.5;
      a = 255;
    }

    return `rgba(${r|0},${g|0},${b|0},${a / 255})`;
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
            audio.playSound(this.life == 0 ? "fx-collapse" : "fx-wrestler", "block", 1);
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