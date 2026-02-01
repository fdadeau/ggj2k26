/**
 * Levels
 */

import { WIDTH, HEIGHT } from "./main.js";

import { LEVELS } from "./LEVELS.js"; 

import { data } from "./preload.js";

import {Particle, SMOKE_SPRITE_NB_FRAMES, PARTICLE_SIZE} from "./smoke.js";

const CAMERA_SPEED = 0.2;

const DEBUG = false;

const SIZE = 42;

const EPSILON = 1;

const MAX = 52;

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
        const X1 = Math.floor(srcX / 20) % WIDTH, Y1 = HEIGHT/8;
        const X2 = Math.floor(srcX / 5) % WIDTH;
        ctx.drawImage(data["background"], 0, 0, WIDTH, HEIGHT, -X1, Y1, WIDTH, HEIGHT);
        ctx.drawImage(data["background"], 0, 0, WIDTH, HEIGHT, -X1+WIDTH, Y1, WIDTH, HEIGHT);
        ctx.drawImage(data["trees"], X2, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);

        ctx.drawImage(this.background, srcX, srcY, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);

        // smoke on the border of the screen
        this.smoke.forEach(particle => {
            particle.render(ctx,srcX,srcY);
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
    return {osc, map};
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