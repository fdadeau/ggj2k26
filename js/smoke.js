import { data } from "./preload.js"; 

import { WIDTH, HEIGHT } from "./main.js";

const PARTICLE_SIZE = 50;

const SMOKE_SPRITE_NB_FRAMES = 5;

const NB_UPDATED_PARTICLES_PER_SECONDS = 1;

const SMOKE_NB_PARTICLES = 400;

const FRAME_SIZE = 16;

export class Smoke {

    constructor(camera) {
        this.smoke = [];
        this.camera = camera;
    }

    render(ctx, srcX, srcY) {
         // smoke on the border of the screen
        this.smoke.forEach(particle => {
            particle.render(ctx,srcX,srcY);
        });
    }

    update(dt) {

        for(var i = 0; i < 1000*NB_UPDATED_PARTICLES_PER_SECONDS/dt ; ++i){
            this.smoke.shift();
        }    
        const COEFF = 1000; // sorry for the magic constant
        const distanceToBorder = 200;// other magic constant

        const oppositePointFromCamDir = {
            x: this.camera.x-this.camera.normalCameraDirection.x*WIDTH/2-PARTICLE_SIZE/2,
            y: this.camera.y-this.camera.normalCameraDirection.y*HEIGHT/2-PARTICLE_SIZE/2
        };
        const antiCameraNormalDirection = scalarMult(this.camera.normalCameraDirection,-1);
        const leftSpread = {
            x:-antiCameraNormalDirection.y,
            y:antiCameraNormalDirection.x
        };
        const rightSpread = {
            x:antiCameraNormalDirection.y,
            y:-antiCameraNormalDirection.x
        };

        while(this.smoke.length < SMOKE_NB_PARTICLES){

            const startingPointOfParticle = Math.random() < 0.5 ? 
            vecSum(oppositePointFromCamDir,scalarMult(leftSpread,Math.random()*COEFF)):
            vecSum(oppositePointFromCamDir,scalarMult(rightSpread,Math.random()*COEFF));

            const borderShift = scalarMult(this.camera.normalCameraDirection,betterRandomForSmoke()*distanceToBorder);
            const finalParticle = vecSum(startingPointOfParticle,borderShift);

            this.smoke.push(
                new Particle(
                    finalParticle.x,
                    finalParticle.y,
                    Math.floor(Math.random()*SMOKE_SPRITE_NB_FRAMES)
                )
            );
        }
    }
}

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


class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y; 
        this.spriteIndex = Math.floor(Math.random()*SMOKE_SPRITE_NB_FRAMES)
    }

    render(ctx, srcX, srcY) {
        const image = data["smoke-particles"];
        const sx = this.spriteIndex*FRAME_SIZE;
        const sy = 0;
        const sWidth = FRAME_SIZE;
        const sHeight = FRAME_SIZE;
        const dx = this.x - srcX;
        const dy = this.y - srcY;
        const dWidth = PARTICLE_SIZE; 
        const dHeight = PARTICLE_SIZE;
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}

