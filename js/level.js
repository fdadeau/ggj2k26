/**
 * Levels
 */

import { WIDTH, HEIGHT } from "./main.js";

import { LEVELS } from "./LEVELS.js"; 

import { Player } from "./player.js";

import { audio } from "./audio.js";       

const CAMERA_SPEED = 0.1;

const DEBUG = true;

const SIZE = 32;

const EPSILON = 1;

const MAX = 32;

export class Level {

    constructor(n) {        
        this.player = new Player(LEVELS[n].player.startPosition.x * SIZE, (MAX-LEVELS[n].player.startPosition.y-1) * SIZE);
        this.background = makeBackground(LEVELS[n]);
        this.world = { height: this.background.height, width: this.background.width};
        this.camera = { x: LEVELS[n].camera.startPosition.x * SIZE, y: (MAX-LEVELS[n].camera.startPosition.y) * SIZE };
        this.size = SIZE;
        // 
        this.cameraPath = LEVELS[n].camera.path.map(({x,y}) => { return {x: x*SIZE, y: (MAX-y)*SIZE}; });
    }


    update(dt, keys) {
        if (this.cameraPath.length == 0) return;
        const target = { x: this.cameraPath[0].x * SIZE, y: this.cameraPath[0].y };
        const vec = { 
            x: (target.x - this.camera.x) > 0 ? 1 : (target.x == this.camera.x ? 0 : -1), 
            y :(target.y - this.camera.y) > 0 ? 1 : (target.y == this.camera.y ? 0 : -1)
        } 
        this.camera.x += vec.x * CAMERA_SPEED * dt;
        this.camera.y += vec.y * CAMERA_SPEED * dt;
        if (Math.abs(this.camera.x - target.x) < EPSILON && Math.abs(this.camera.y - target.y) < EPSILON) {
            this.cameraPath.shift();
        }
       // this.player.update(dt, keys, this);
    }

    render(ctx) {
        // compute background position w.r.t. the player
        let srcX = this.camera.x - WIDTH / 2;
        let srcY = this.camera.y - HEIGHT / 2;
        ctx.drawImage(this.background, srcX, srcY, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
       
        if (DEBUG) {
            ctx.fillText(JSON.stringify(this.camera), 10, 70);
        }

        // determine player's position in screen
        let playerX = this.player.x - srcX;
        let playerY = this.player.y - srcY;
        this.player.render(ctx, playerX, playerY);
    }


    intersectsWith(x, y, w, h) {
        return this.whichTile(x-w, y-h) || this.whichTile(x+w, y-h) || this.whichTile(x-w,y) || this.whichTile(x+w,y);
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


class Platform {

    constructor(x,y,w,h) {
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
    }

    render(ctx) {

    }

}



function makeBackground(level) {
    const platforms = level.stuff.filter(s => s.kind == "Permanent").map(p => {
        return { x: Number(p.x), y: (MAX-Number(p.y)-p.height), w: Number(p.width), h: Number(p.height) };
    });
    
    let maxX = Math.max(...platforms.map(p => p.x + p.w));
    let maxY = Math.max(...platforms.map(p => p.y + p.h));

    const CAP_X = WIDTH / 32;
    const CAP_Y = HEIGHT / 32;

    const W = SIZE * maxX + CAP_X;
    const H = SIZE * maxY + CAP_Y;

    const osc = new OffscreenCanvas(W, H);
    const ctx = osc.getContext("2d");
    // sky
    ctx.fillStyle = "#9999EE";
    ctx.fillRect(0, 0, W, H);
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

    const map = [];
    while (map.length < maxY) {
        const line = [];
        while (line.length < maxX) line.push(0);
        map.push(line);
    }
    platforms.forEach(p => {
        for (let dl=0; dl < p.h; dl++) {
            for (let dc=0; dc < p.w; dc++) {
                map[p.y+dl][p.x+dc] = 1;
            }
        }
    });

    for (let l=0; l < map.length; l++) {
        for (let c=0; c < map[l].length; c++) {
            switch (map[l][c]) {
                case 1: 
                    ctx.fillStyle = "grey";
                    ctx.fillRect(c*SIZE, l*SIZE, SIZE, SIZE);
                    ctx.fillStyle = "lightgrey";
                    ctx.fillRect(c*SIZE + 2, l*SIZE + 2, SIZE - 4, SIZE - 4);
                    break;
                case 2: 
                    ctx.moveTo(c*SIZE, l*SIZE);
                    ctx.beginPath();
                    ctx.lineTo((c+1)*SIZE, l*SIZE);
                    ctx.lineTo(c*SIZE, (l+1)*SIZE);
                    ctx.lineTo(c*SIZE, (l)*SIZE);
                    ctx.fill();
                    break;
                case 3: 
                    ctx.moveTo(c*SIZE, l*SIZE);
                    ctx.beginPath();
                    ctx.lineTo((c+1)*SIZE, l*SIZE);
                    ctx.lineTo((c+1)*SIZE, (l+1)*SIZE);
                    ctx.lineTo(c*SIZE, (l)*SIZE);
                    ctx.fill();
                    break;
                case 4: 
                    ctx.moveTo((c+1)*SIZE, l*SIZE);
                    ctx.beginPath();
                    ctx.lineTo((c+1)*SIZE, (l+1)*SIZE);
                    ctx.lineTo((c)*SIZE, (l+1)*SIZE);
                    ctx.lineTo((c+1)*SIZE, (l)*SIZE);
                    ctx.fill();
                    break;
                case 5: 
                    ctx.moveTo((c+1)*SIZE, (l+1)*SIZE);
                    ctx.beginPath();
                    ctx.lineTo((c)*SIZE, (l)*SIZE);
                    ctx.lineTo((c)*SIZE, (l+1)*SIZE);
                    ctx.lineTo((c+1)*SIZE, (l+1)*SIZE);
                    ctx.fill();
                    break;
            }
        }
    }
    
    ctx.fillStyle = "#700";
    ctx.font = "16px arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    level.endings.forEach(e => {
        ctx.fillRect(e.x * SIZE, e.y * SIZE, e.w * SIZE, e.h * SIZE);
        ctx.fillText("EXIT", e.x * SIZE + SIZE/2, e.y * SIZE - SIZE / 2);
    });
    return osc;
}
