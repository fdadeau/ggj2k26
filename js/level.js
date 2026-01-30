/**
 * Levels
 */

import { WIDTH, HEIGHT } from "./main.js";

import { LEVELS } from "./LEVELS.js"; 

import { Player } from "./player.js";

import { audio } from "./audio.js";       

export class Level {

    constructor(n) {        
        this.player = new Player(100,100);
    }


    update(dt, keys) {
        this.player.update(dt, keys, this);
    } 

    render(ctx) {
        // compute background position w.r.t. the player
        let srcX = this.player.x - WIDTH / 2;
        if (srcX < 0) { 
            srcX = 0; 
        }
        else if (srcX > this.background.width - WIDTH) {
            srcX = this.background.width - WIDTH;
        }
        let srcY = this.player.y - HEIGHT / 2;
        if (srcY < 0) {
            srcY = 0;
        }
        else if (srcY > this.background.height - HEIGHT) {
            srcY = this.background.height - HEIGHT;
        }
        ctx.drawImage(this.background, srcX, srcY, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);

        // draw platforms
        this.platforms.forEach(p => p.render(ctx, srcX, srcY));
        this.slidingWalls.forEach(w => w.render(ctx, srcX, srcY));

        // determine player's position in screen
        let playerX = this.player.x - srcX;
        let playerY = this.player.y - srcY;
        this.player.render(ctx, playerX, playerY);
    }


    intersectsWith(x, y, w, h) {
        return false;
    }
    whichTile(x, y) {
        if (x < 0 || x >= this.world.width) {
            return 1;
        }
        if (y < 0 || y >= this.world.height) {
            return 1;
        }
        let l = Math.floor(y / this.size), c = Math.floor(x / this.size);

        let xInSquare = x % this.size;
        let yInSquare = y % this.size;

        switch (this.map[l][c]) {
            case 4: 
                return (this.size - xInSquare < yInSquare) ? 4 : 0;
            case 5: 
                return (xInSquare < yInSquare) ? 5 : 0;
        }
        return (this.map[l][c]);
    }

    getPointAbove(x, y) {
        if (this.whichTile(x,y) == 4) {
            return Math.floor(y / this.size + 1) * this.size - (x % this.size) - 1;
        }
        return Math.floor(y / this.size) * this.size + (x % this.size) - 1;
    }

    isOnExit(x,y,w) {
        return x-w/2 > this.exit.c * this.size && x+w/2 < (this.exit.c+1)*this.size && y > this.exit.l * this.size && y <= this.size*(this.exit.l +1);
    }

}




function makeBackground(level) {
    const W = level.size * level.map[0].length;
    const H = level.size * level.map.length;
    const osc = new OffscreenCanvas(W, H);
    const ctx = osc.getContext("2d");
    // sky
    ctx.fillStyle = "#000011";
    ///ctx.fillRect(0, 0, W, H);
    // elements in the map
    ctx.fillStyle = "lightgrey";

    if (level.texts) {
        ctx.fillStyle = "lightblue";
        ctx.font = "20px arial";
        ctx.textAlign = "center";
        level.texts.forEach(t => {
            ctx.fillText(t.text, t.x, t.y);
        });
    }

    return osc;
}
