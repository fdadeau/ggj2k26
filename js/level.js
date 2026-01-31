/**
 * Levels
 */

import { WIDTH, HEIGHT } from "./main.js";

import { LEVELS } from "./LEVELS.js"; 

import { Player } from "./player.js";

import { data } from "./preload.js";

import { audio } from "./audio.js";       

const CAMERA_SPEED = 0.2;

const DEBUG = true;

const SIZE = 42;

const EPSILON = 1;

const MAX = 52;

const MASK_SIZE = 20;

const BREAKABLE_HITS = 2;

export class Level {

    constructor(n) {        
        const lvl = loadLevel(LEVELS[n]);
        this.background = lvl.osc;
        this.map = lvl.map;
        this.masks = lvl.masks;
        this.breakables = lvl.breakables;
        
        this.world = { height: this.background.height, width: this.background.width};
        this.camera = { x: LEVELS[n].camera.startPosition.x * SIZE, y: (MAX-LEVELS[n].camera.startPosition.y) * SIZE };
        this.size = SIZE;
        // 
        this.cameraPath = LEVELS[n].camera.path.map(({x,y,speed}) => { return {x: x*SIZE, y: (MAX-y)*SIZE, speed}; });
        this.player = new Player(LEVELS[n].player.startPosition.x * SIZE, (MAX-LEVELS[n].player.startPosition.y-1) * SIZE);
    }


    update(dt, keys) {
        if (this.cameraPath.length == 0) return;
        const target = { x: this.cameraPath[0].x * SIZE, y: this.cameraPath[0].y, speed: this.cameraPath[0].speed };
        const vec = { 
            x: (target.x - this.camera.x) > 0 ? 1 : (target.x == this.camera.x ? 0 : -1), 
            y :(target.y - this.camera.y) > 0 ? 1 : (target.y == this.camera.y ? 0 : -1)
        } 
        this.camera.x += vec.x * CAMERA_SPEED * target.speed * dt;
        this.camera.y += vec.y * CAMERA_SPEED * target.speed * dt;
        if (Math.abs(this.camera.x - target.x) < EPSILON && Math.abs(this.camera.y - target.y) < EPSILON) {
            this.cameraPath.shift();
        }

        if (
            (target.speed > 0 && this.player.x < this.camera.x - WIDTH/2 - this.player.width) ||
            (target.speed < 0 && this.player.x > this.camera.x + WIDTH/2 + this.player.width)
        ) {
            this.player.dead = true;
        }

        this.player.update(dt, keys, this);
        
        this.masks.filter(m => 
            m.active && 
            m.x + m.size /2 >= this.player.x - this.player.width / 2 &&
            m.x + m.size /2 <= this.player.x + this.player.width / 2 && 
            m.y + m.size /2 <= this.player.y && 
            m.y + m.size /2 >= this.player.y - this.player.height
        ).forEach(m => {
            this.player.addMask(m.kind);
            m.active = false;
        });
    }
    
    hit(x,y) {
        // console.log(x,y);
        let l = Math.floor(y / this.size), c = Math.floor(x / this.size);
        this.breakables.forEach(b => {
            if (b.broken && x >= b.x * SIZE && x <= b.x * SIZE + SIZE && y >= b.y * SIZE && y <= b.y * SIZE + b.h * SIZE) {
                b.broken--;
                if (b.broken == 0) {
                    b.blocks.forEach(coords => this.map[coords[0]][coords[1]] = 0);
                } 
            }
        })
    }

    render(ctx) {
        // compute background position w.r.t. the player
        let srcX = this.camera.x - WIDTH / 2;
        let srcY = this.camera.y - HEIGHT / 2;
        ctx.drawImage(this.background, srcX, srcY, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
       
        // render masks
        this.masks.forEach(m => {
            if (m.active) {
                ctx.drawImage(data[`mask-${m.kind}`], m.x - srcX, m.y - srcY, MASK_SIZE, MASK_SIZE);
            }
        });
        // render breakables 
        this.breakables.forEach(b => {
            if (b.broken > 0) {
                b.blocks.forEach(bl => {
                    ctx.fillStyle = b.broken == 2 ? "darkred" : "red";
                    ctx.fillRect(bl[1]*SIZE - srcX, bl[0]*SIZE - srcY, SIZE, SIZE);
                    ctx.fillStyle = b.broken == 2 ? "red" : "orange";
                    ctx.fillRect(bl[1]*SIZE + 2 - srcX, bl[0]*SIZE + 2 - srcY, SIZE - 4, SIZE - 4);
                });
            }    
        });

        // determine player's position in screen
        let playerX = this.player.x - srcX;
        let playerY = this.player.y - srcY;
        this.player.render(ctx, playerX, playerY);
    }


    /**
     * Assuming the character is at (x,y) where x is the horitontal center and y is the bottom,
     * checks if one of the corners is inside one of the tiles.
     * @param {number} x X-coordinate 
     * @param {number} y Y-coordinate 
     * @param {number} w width of the player
     * @param {number} h height of the player
     * @returns 
     */
    intersectsWith(x, y, w, h) {
        return this.whichTile(x-w/2, y-h) || this.whichTile(x+w/2, y-h) || this.whichTile(x-w/2,y) || this.whichTile(x+w/2,y);
    }
    whichTile(x, y) {
        if (x < 0 || x >= this.world.width) {
            return 1;
        }

        let l = Math.floor(y / this.size), c = Math.floor(x / this.size);
        

        return (this.map[l] && this.map[l][c]) ? this.map[l][c] : 0;



    }

    /*
    getPointAbove(x, y) {
        if (this.whichTile(x,y) == 4) {
            return Math.floor(y / this.size + 1) * this.size - (x % this.size) - 1;
        }
        return Math.floor(y / this.size) * this.size + (x % this.size) - 1;
    }
    */

    isOnExit(x,y,w) {
        return x-w/2 > this.exit.c * this.size && x+w/2 < (this.exit.c+1)*this.size && y > this.exit.l * this.size && y <= this.size*(this.exit.l +1);
    }

}


function loadLevel(level) {
    const platforms = level.stuff.filter(s => s.kind == "Permanent").map(p => {
        return { x: Number(p.x), y: (MAX-Number(p.y)-p.height), w: Number(p.width), h: Number(p.height) };
    });

    const breakables = level.stuff.filter(s => s.kind == "Breakable").map(p => {
        return { x: Number(p.x), y: (MAX-Number(p.y)-p.height), w: Number(p.width), h: Number(p.height), broken: BREAKABLE_HITS };
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
    /*
    for (let i=0; i < H; i++) {
        ctx.fillStyle = `hsl(240, 80%, ${Math.floor(50+i/70)}%)`;
        ctx.fillRect(0, i, W, 1);
    }
        */
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
    breakables.forEach(p => {
        p.blocks = [];
        for (let dl=0; dl < p.h; dl++) {
            for (let dc=0; dc < p.w; dc++) {
                map[p.y+dl][p.x+dc] = 2;
                p.blocks.push([p.y+dl,p.x+dc]);
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
                /*
                case 2: 
                    ctx.fillStyle = "darkred";
                    ctx.fillRect(c*SIZE, l*SIZE, SIZE, SIZE);
                    ctx.fillStyle = "red";
                    ctx.fillRect(c*SIZE + 2, l*SIZE + 2, SIZE - 4, SIZE - 4);
                    break;
                case 3: 
                    ctx.fillStyle = "red";
                    ctx.fillRect(c*SIZE, l*SIZE, SIZE, SIZE);
                    ctx.fillStyle = "pink";
                    ctx.fillRect(c*SIZE + 2, l*SIZE + 2, SIZE - 4, SIZE - 4);
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
                */
            }
        }
    }
    
    // masks
    const masks = level.stuff.filter(s => s.kind == "Mask").map(m => {
        return { 
            x: m.x * SIZE + SIZE/2 - MASK_SIZE/2, 
            y: (MAX - m.y) * SIZE - MASK_SIZE,  
            size: MASK_SIZE,
            kind: m.type,
            active: true
        }
    });

    ctx.fillStyle = "#700";
    ctx.font = "16px arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    level.endings.forEach(e => {
        ctx.fillRect(e.x * SIZE, e.y * SIZE, e.w * SIZE, e.h * SIZE);
        ctx.fillText("EXIT", e.x * SIZE + SIZE/2, e.y * SIZE - SIZE / 2);
    });
    return {osc,map,masks,breakables};
}

