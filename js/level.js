/**
 * Levels
 */

import { WIDTH, HEIGHT } from "./main.js";

import { LEVELS } from "./LEVELS.js"; 

import { data } from "./preload.js";

import {Particle, SMOKE_SPRITE_NB_FRAMES, PARTICLE_SIZE} from "./smoke.js";

const CAMERA_SPEED = 0.2;

const DEBUG = false;

const SIZE = 52;

const EPSILON = 1;

const MAX = 52;

const MASK_SIZE = 30;

const BREAKABLE_HITS = 2;

export class Level {

    constructor(n) {  
        const lvl = loadLevel(LEVELS[n]);
        this.background = lvl.osc;
        this.map = lvl.map;
        this.world = { height: this.background.height, width: this.background.width};
        this.camera = { x: LEVELS[n].camera.startPosition.x * SIZE, y: (MAX-LEVELS[n].camera.startPosition.y) * SIZE };
        this.size = SIZE;
        this.cameraPath = LEVELS[n].camera.path.map(({x,y,speed}) => { return {x: x*SIZE, y: (MAX-y)*SIZE, speed}; });
        this.smoke = [];
    }


    update(dt, keys) {
        if(this.cameraPath[0] == undefined){
            return;
        }
        const target = { x: this.cameraPath[0].x, y: this.cameraPath[0].y, speed: this.cameraPath[0].speed };
        const cameraDirection = { 
            x: target.x-this.camera.x, 
            y: target.y-this.camera.y 
        };
        const normalCameraDirection = {
            x: cameraDirection.x/Math.sqrt(cameraDirection.x*cameraDirection.x + cameraDirection.y*cameraDirection.y),
            y: cameraDirection.y/Math.sqrt(cameraDirection.x*cameraDirection.x + cameraDirection.y*cameraDirection.y)
        };
        //alert(JSON.stringify(target)+JSON.stringify(cameraDirection)+JSON.stringify(normalCameraDirection));
        this.camera.x += normalCameraDirection.x * CAMERA_SPEED * target.speed * dt;
        this.camera.y += normalCameraDirection.y * CAMERA_SPEED * target.speed * dt;
        if (Math.abs(this.camera.x - target.x) < EPSILON && Math.abs(this.camera.y - target.y) < EPSILON) {
            this.cameraPath.shift();
        }
        for(var i = 0; i < 1000*NB_UPDATED_PARTICLES_PER_SECONDS/dt ; ++i){
            this.smoke.shift();
        }
        alert(JSON.stringify(normalCameraDirection));
        this.smoke = smokeFill2(this.smoke,SMOKE_NB_PARTICLES, this.camera, normalCameraDirection);
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
                        ctx.drawImage(data[`block-broken${b.broken}`], bl[1]*SIZE - srcX, bl[0]*SIZE - srcY, SIZE, SIZE);
                    }
                });
            }    
        });

        this.exits.forEach(exit => {
            ctx.fillStyle = "red";
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

        let X3 = (srcX * 1.4) % (2*WIDTH);
        ctx.drawImage(data["grass"], 0, 0, WIDTH*2, HEIGHT, -X3, 0, WIDTH*2, HEIGHT);
        ctx.drawImage(data["grass"], 0, 0, WIDTH*2, HEIGHT, -X3+WIDTH*2, 0, WIDTH*2, HEIGHT);
        

        // smoke on the border of the screen
        this.smoke.forEach(particle => {
            particle.render(ctx,srcX,srcY);
        });
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
    ctx.imageSmoothingEnabled = false;

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


const SMOKE_SCREEN_PROPORTION = 0.15;

const NB_UPDATED_PARTICLES_PER_SECONDS = 0.05;

const SMOKE_NB_PARTICLES = 500;

function betterRandomForSmoke(){
    const lambda = 5;
    const rd = Math.random();
    return Math.exp(-lambda*rd)-Math.exp(-lambda)/lambda;
}
function vecSum(v, w){
    return {x:v.x+w.x, y:v.y+w.y};
}

function scalarMult(vec,scalar){
    return {x:vec.x*scalar, y:vec.y*scalar};
}

function smokeFill2(smoke, nbParticles, cameraPosition, cameraNormalDirection) {
    const COEFF = 1000; // sorry for the magic constant

    while(smoke.length < nbParticles){
        const oppositePointFromCamDir = {
            x: cameraPosition.x-cameraNormalDirection.x*WIDTH/2-PARTICLE_SIZE/2,
            y: cameraPosition.y-cameraNormalDirection.y*HEIGHT/2-PARTICLE_SIZE/2
        };
        const antiCameraNormalDirection = scalarMult(cameraNormalDirection,-1);
        const leftSpread = {
            x:-antiCameraNormalDirection.y,
            y:antiCameraNormalDirection.x
        };
        const rightSpread = {
            x:antiCameraNormalDirection.y,
            y:-antiCameraNormalDirection.x
        };
        const startingPointOfParticle = Math.random() < 0.5 ? 
        vecSum(oppositePointFromCamDir,scalarMult(leftSpread,Math.random()*COEFF)):
        vecSum(oppositePointFromCamDir,scalarMult(rightSpread,Math.random()*COEFF));

        smoke.push(
            new Particle(
                startingPointOfParticle.x,
                startingPointOfParticle.y,
                Math.floor(Math.random()*SMOKE_SPRITE_NB_FRAMES)
            )
        );
    }

    return smoke;
}