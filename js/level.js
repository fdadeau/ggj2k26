/**
 * Levels
 */

import { WIDTH, HEIGHT } from "./main.js";

import { LEVELS } from "./LEVELS.js"; 

import { Player } from "./player.js";

import { data } from "./preload.js";

import { audio } from "./audio.js";

import { Smoke } from "./smoke.js";

import { Camera } from "./camera.js";


const SIZE = 52;

let MAX = 52;

const MASK_SIZE = 30;

const BREAKABLE_HITS = 4;


export class Level {

    constructor(n) {  
        const lvl = loadLevel(LEVELS[n]);
        this.background = lvl.osc;
        this.map = lvl.map;
        this.masks = lvl.masks;
        this.breakables = lvl.breakables;
        this.exits = lvl.exits;
        //this.world = { height: this.background.height, width: this.background.width};
        this.size = SIZE;

        // Camera 
        const camStart = { x: LEVELS[n].camera.startPosition.x * SIZE, y: (MAX-LEVELS[n].camera.startPosition.y) * SIZE };
        const camPath = LEVELS[n].camera.path.map(({x,y,speed}) => { return {x: x*SIZE, y: (MAX-y)*SIZE, speed}; });
        this.camera = new Camera(camStart, camPath);
        // Player         
        this.player = new Player(LEVELS[n].player.startPosition.x * SIZE, (MAX-LEVELS[n].player.startPosition.y-1) * SIZE);
        this.completed = null;
        // Smoke
        this.smoke = new Smoke(this.camera);
    }


    update(dt, keys) {

        // Camera movement
        this.camera.update(dt);

        // Player update
        this.player.update(dt, keys, this);
        
        // Check end of level        
        const exit = this.isOnExit(this.player.x, this.player.y, this.player.width / 2, this.player.height / 2);
        if (exit) {
            this.completed = { next: exit.nextLevel };
            return exit.nextLevel;
        }

        // Check if player has reached the end of the screen
        if (this.camera.playerOutOfBounds(this.player)) {
            this.player.dead = true;
        }

        // mask collecting
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

        this.smoke.update(dt);
    }
    
    hit(x,y) {
        this.breakables.forEach(b => {
            if (b.broken && x >= b.x * SIZE && x <= b.x * SIZE + SIZE && y >= b.y * SIZE && y <= b.y * SIZE + b.h * SIZE) {
                b.broken--;
                audio.playSound(b.broken == 0 ? "fx-collapse" : "fx-wrestler", "player", 1);
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

        // background with scrolling
        const X1 = Math.floor(srcX / 10) % WIDTH, Y1 = HEIGHT/10;
        const X2 = Math.floor(srcX / 5) % WIDTH;
        ctx.drawImage(data["background"], 0, 0, WIDTH, HEIGHT, -X1, Y1, WIDTH, HEIGHT);
        ctx.drawImage(data["background"], 0, 0, WIDTH, HEIGHT, -X1+WIDTH, Y1, WIDTH, HEIGHT);
        ctx.drawImage(data["trees"], 0, 0, WIDTH*2, HEIGHT, -X2, 0, WIDTH*2, HEIGHT);

        ctx.drawImage(this.background, srcX, srcY, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
       
        // render masks
        this.masks.forEach(m => {
            if (m.active) {
                ctx.save();
                ctx.globalCompositeOperation = "lighter";
                ctx.shadowColor = m.blur ?? "rgba(255, 255, 255, 0.9)";
                ctx.shadowBlur = 20;
                ctx.globalAlpha = 1;
                ctx.drawImage(data[`mask-${m.kind}`], m.x - srcX, m.y - srcY, MASK_SIZE, MASK_SIZE);
                ctx.restore();
            }
        });

        // render breakables 
        this.breakables.forEach(b => {
            if (b.broken > 0) {
                b.blocks.forEach(bl => {
                    if (b.broken > 0) {
                        ctx.drawImage(data[`block-broken${b.broken == BREAKABLE_HITS ? 2 : 1}`], bl[1]*SIZE - srcX, bl[0]*SIZE - srcY, SIZE, SIZE);
                    }
                });
            }    
        });

        this.exits.forEach(exit => {
            //ctx.fillStyle = "red";
            ctx.drawImage(
                data["portal"],
                exit.x * SIZE - srcX, 
                exit.y * SIZE - srcY, 
                exit.width * SIZE,
                exit.height * SIZE
            );        
        })

        // determine player's position in screen
        let playerX = this.player.x - srcX;
        let playerY = this.player.y - srcY;
        this.player.render(ctx, playerX, playerY);

        /*
        let X3 = (srcX * 1.4) % (2*WIDTH);
        ctx.drawImage(data["grass"], 0, 0, WIDTH*2, HEIGHT, -X3, 0, WIDTH*2, HEIGHT);
        ctx.drawImage(data["grass"], 0, 0, WIDTH*2, HEIGHT, -X3+WIDTH*2, 0, WIDTH*2, HEIGHT);
        */
        
        this.smoke.render(ctx, srcX, srcY);
        this.player.renderMasks(ctx);
       
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
        /*
        if (x < 0 || x >= this.world.width) {
            return 0;       // TODO : should return 0 to remove borders from 
        }
            */

        let l = Math.floor(y / this.size), c = Math.floor(x / this.size);

        return (this.map[l] && this.map[l][c]) ? this.map[l][c] : 0;
    }

    isOnExit(x, y, w, h) {
        const pLeft = x - w / 2;
        const pRight = x + w / 2;
        const pBottom = y;
        const pTop = y - h;

        return this.exits.find(exit => {
            const eLeft = exit.x * SIZE;
            const eRight = (exit.x + exit.width) * SIZE;
            const eTop = exit.y * SIZE;
            const eBottom = (exit.y + exit.height) * SIZE;

            return pRight > eLeft && 
                pLeft < eRight && 
                pBottom > eTop && 
                pTop < eBottom;
        });
    }

}


function loadLevel(level) {

    MAX = level.stuff.reduce((acc,s) => Number(s.y) + Number(s.height) > acc ? Number(s.y) + Number(s.height) : acc, 0) + 10;

    const platforms = level.stuff.filter(s => s.kind == "Permanent").map(p => {
        return { x: Number(p.x), y: (MAX-Number(p.y)-p.height), w: Number(p.width), h: Number(p.height) };
    });

    const breakables = level.stuff.filter(s => s.kind == "Breakable").map(p => {
        return { x: Number(p.x), y: (MAX-Number(p.y)-p.height), w: Number(p.width), h: Number(p.height), broken: BREAKABLE_HITS };
    });
    const exits = level.endings.map(ending => ({
        x: ending.area.x,
        y: MAX - ending.area.y - ending.area.height, 
        width: ending.area.width,
        height: ending.area.height,
        nextLevel: ending.nextLevel
    }));
    
    let maxX = Math.max(...platforms.map(p => p.x + p.w));
    let maxY = Math.max(...platforms.map(p => p.y + p.h));

    const CAP_X = WIDTH / 32;
    const CAP_Y = HEIGHT / 32;

    const W = SIZE * maxX + CAP_X;
    const H = SIZE * maxY + CAP_Y;

    const osc = new OffscreenCanvas(W, H);
    const ctx = osc.getContext("2d");
    ctx.imageSmoothingEnabled = false;
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
        ctx.fillStyle = "black";
        ctx.font = '24px pixel-sans';
        ctx.textAlign = "center";
        level.texts.forEach(t => {
            ctx.fillText(t.text, t.x * SIZE, (MAX - t.y) * SIZE);
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
            if (map[l][c] == 1) {
                ctx.drawImage(determineBlock(map, l, c), c*SIZE, l*SIZE, SIZE, SIZE);
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
            blur: m.blur,
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
    return {osc, map, masks, breakables, exits};
}

function determineBlock(map, l, c) {
    if (rienEnDessous(map, l, c) && rienAGauche(map, l, c) && !rienADroite(map, l, c) && rienAuDessus(map, l, c)) {
        return data["bloc1"];
    }
    if (!rienAGauche(map, l, c) && !rienADroite(map, l, c) && rienAuDessus(map, l, c)) {
        return data["bloc2"];
    }
    if (rienEnDessous(map, l, c) && !rienAGauche(map, l, c) && rienADroite(map, l, c) && rienAuDessus(map, l, c)) {
        return data["bloc3"];
    }
    if (!rienEnDessous(map, l, c) && rienAGauche(map, l, c) && !rienADroite(map, l, c) && rienAuDessus(map, l, c)) {
        return data["bloc4"];
    }
    if (!rienEnDessous(map, l, c) && !rienAGauche(map, l, c) && rienADroite(map, l, c) && rienAuDessus(map, l, c)) {
        return data["bloc5"];
    }
    if (rienEnDessous(map, l, c) && rienAGauche(map, l, c) && !rienADroite(map, l, c) && !rienAuDessus(map, l, c)) {
        return data["bloc6"];
    }
    if (rienEnDessous(map, l, c) && !rienAGauche(map, l, c) && !rienADroite(map, l, c) && !rienAuDessus(map, l, c)) {
        return data["bloc7"];
    }
    if (rienEnDessous(map, l, c) && !rienAGauche(map, l, c) && rienADroite(map, l, c) && !rienAuDessus(map, l, c)) {
        return data["bloc8"];
    }
    if (!rienEnDessous(map, l, c) && rienAGauche(map, l, c) && !rienADroite(map, l, c) && !rienAuDessus(map, l, c)) {
        return data["bloc9"];
    }
    if (!rienEnDessous(map, l, c) && !rienAGauche(map, l, c) && rienADroite(map, l, c) && !rienAuDessus(map, l, c)) {
        return data["bloc10"];
    }
    if (!rienEnDessous(map, l, c) && rienAGauche(map, l, c) && rienADroite(map, l, c) && rienAuDessus(map, l, c)) {
        return data["bloc11"];
    }
    if (!rienEnDessous(map, l, c) && rienAGauche(map, l, c) && rienADroite(map, l, c) && !rienAuDessus(map, l, c)) {
        return data["bloc12"];
    }
    if (rienEnDessous(map, l, c) && rienAGauche(map, l, c) && rienADroite(map, l, c) && !rienAuDessus(map, l, c)) {
        return data["bloc13"];
    }
    if (rienEnDessous(map, l, c) && rienAGauche(map, l, c) && rienADroite(map, l, c) && rienAuDessus(map, l, c)) {
        return data["bloc14"];
    }
    return data["bloc7"];
} 

function rienEnDessous(map, l, c) {
    return !map[l+1] || map[l+1][c] != 1;
}

function rienAGauche(map, l, c) {
    return map[l][c-1] != 1;
}

function rienADroite(map, l, c) {
    return map[l][c+1] != 1;
}

function rienAuDessus(map, l, c) {
    return !map[l-1] || map[l-1][c] != 1;
}


