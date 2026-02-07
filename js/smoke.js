import { data } from "./preload.js"; 

import { WIDTH, HEIGHT } from "./level.js";

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


const SMOKE_TITLE_SPEED = 0.1;
const SMOKE_TITLE_MAX_PARTICLES = 140;

export class SmokeTitle {

    constructor() {
        this.position = WIDTH + WIDTH + HEIGHT + HEIGHT / 2;
        this.direction = 1;
        this.particles = [];
    }

    update(dt) {
        this.position = this.normalize(this.position + this.direction * SMOKE_TITLE_SPEED * dt);
        if (this.particles.length == SMOKE_TITLE_MAX_PARTICLES) {
            this.particles.shift();
        }   
        while (this.particles.length < SMOKE_TITLE_MAX_PARTICLES) {
            const AMPLITUDE = HEIGHT * 1.1;
            const rand = Math.floor(Math.random() * AMPLITUDE) + this.position - AMPLITUDE/2;
            const coords = this.getCoordsFor(this.normalize(rand));

            const deltaX = WIDTH / 2 - coords.x, deltaY = HEIGHT / 2 - coords.y;
            const dist = Math.sqrt(deltaX*deltaX + deltaY * deltaY);
            const vec = { x: deltaX / dist, y : deltaY / dist };
            coords.x += vec.x * Math.floor(betterRandomForSmoke() * 2 * PARTICLE_SIZE)
            coords.y += vec.y * Math.floor(betterRandomForSmoke() * PARTICLE_SIZE)
            coords.shape = Math.floor(Math.random() * 5);
            this.particles.push(coords);
        }

        
    }

    render(ctx) {
        const saveFS = ctx.fillStyle;
        this.particles.forEach(p => ctx.drawImage(data["smoke-particles"], PARTICLE_SIZE * p.shape, 0, FRAME_SIZE, FRAME_SIZE, p.x - PARTICLE_SIZE/2, p.y - PARTICLE_SIZE/2, PARTICLE_SIZE, PARTICLE_SIZE));
        //this.particles.forEach(p => ctx.fillRect(p.x - 5, p.y - 5, 10, 10));
        const p = this.getCoordsFor(this.position);
        ctx.fillStyle = "red";
        //ctx.fillRect(p.x - 10, p.y - 10, 20, 20);
        ctx.fillStyle = saveFS;
    }

    getCoordsFor(pos) {
        const PERIMETER =  (2 * WIDTH + 2 * HEIGHT);
        if (pos < WIDTH) {
            return { x: pos, y: 0 };
        }
        if (pos < WIDTH+HEIGHT) {
            return { x: WIDTH, y: pos - WIDTH };
        }
        return pos < 2*WIDTH+HEIGHT ? { x: PERIMETER - pos - HEIGHT, y: HEIGHT } : { x: 0, y: PERIMETER - pos };
    }
    normalize(pos) {
        const PERIMETER =  (2 * WIDTH + 2 * HEIGHT);
        return (pos < 0) ? pos - PERIMETER :  pos % PERIMETER;
    }

}