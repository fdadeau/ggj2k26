import { data } from "./preload.js"; 

import { WIDTH, HEIGHT } from "./level.js";

const PARTICLE_SIZE = 50;

const SMOKE_SPRITE_NB_FRAMES = 5;

const NB_UPDATED_PARTICLES_PER_SECONDS = 1;

const SMOKE_NB_PARTICLES = 400;

const FRAME_SIZE = 16;

const DEBUG = 0;

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
        const image = data["smoke-particles0"];
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
const NB_SMOKES = 7;
export class SmokeTitle {

    constructor() {
        this.position = WIDTH + WIDTH + HEIGHT + HEIGHT / 2;
        this.direction = 1;
        this.particles = [];
    }

    update(dt, noMove) {
        if (!noMove) {
            this.position = this.normalize(this.position + this.direction * SMOKE_TITLE_SPEED * dt);
        }
        if (this.particles.length == SMOKE_TITLE_MAX_PARTICLES) {
            this.particles.pop();
            this.particles.pop();
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
            this.particles.unshift(coords);
        }
    }

    render(ctx) {
        const saveFS = ctx.fillStyle;
        this.particles.forEach((p,i) => ctx.drawImage(data["smoke-particles" + Math.floor(i/(SMOKE_TITLE_MAX_PARTICLES/NB_SMOKES))], PARTICLE_SIZE * p.shape, 0, FRAME_SIZE, FRAME_SIZE, p.x - PARTICLE_SIZE/2, p.y - PARTICLE_SIZE/2, PARTICLE_SIZE, PARTICLE_SIZE));
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
        return (pos < 0) ? pos + PERIMETER :  pos % PERIMETER;
    }

}

const EPSILON = 5;
const SMOKE2_SPEED = 0.5;
const SMOKE2_MAX_PARTICLES = 140;
export class Smoke2 extends SmokeTitle {

    constructor(camera) {
        super();
        this.camera = camera;
        this.cameraPathLength = camera.cameraPath.length;
        this.position = 0;
        this.updatePosition();
        this.position = this.target;
        this.target = null;
    }

    update(dt) {
        if (this.camera.cameraPath.length == 0) {
        //    this.position = this.normalize(this.position + this.direction * SMOKE2_SPEED*0.5 * dt);
        }
        else if (this.cameraPathLength > this.camera.cameraPath.length) {
            this.updatePosition();
            this.cameraPathLength = this.camera.cameraPath.length;
        }
        if (this.target !== null) { 
            this.position = this.normalize(this.position + this.direction * SMOKE2_SPEED * dt);
            if (Math.abs(this.target - this.position) < EPSILON) {
                this.position = this.target;
                this.target = null;
            }
        }
        if (this.particles.length == SMOKE2_MAX_PARTICLES) {
            this.particles.pop();
            this.particles.pop();
            this.particles.pop();
            this.particles.pop();
        }   
        while (this.particles.length < SMOKE2_MAX_PARTICLES) {
            const p = this.getCoordsFor(this.position);
            const AMPLITUDE = (p.y == 0 || p.y == HEIGHT) ? WIDTH : HEIGHT;
            const rand = Math.floor(Math.random() * AMPLITUDE) + this.position - AMPLITUDE/2;
            const coords = this.getCoordsFor(this.normalize(rand));

            if (coords.y == 0 || coords.y == HEIGHT) {
                coords.y += (coords.y == 0 ? 1 : -1) * Math.floor(betterRandomForSmoke() * 2 * PARTICLE_SIZE + (this.camera.cameraPath.length > 0 ? PARTICLE_SIZE/2 : 0));
            }
            else {
                coords.x += (coords.x == 0 ? 1 : -1) * Math.floor(betterRandomForSmoke() * 2 * PARTICLE_SIZE + (this.camera.cameraPath.length > 0 ? PARTICLE_SIZE/2 : 0));
            }
            coords.x += this.camera.x - WIDTH / 2;
            coords.y += this.camera.y - HEIGHT / 2;
            //coords.y += vec.y * Math.floor(betterRandomForSmoke() * 1 * PARTICLE_SIZE) + this.camera.y - HEIGHT / 2  + PARTICLE_SIZE * (vec.y > 0 ? 1 : -1);
            coords.shape = Math.floor(Math.random() * 5);
            this.particles.unshift(coords);
        }
    }

    updatePosition() {
        const vec = { x: this.camera.cameraPath[0].x - this.camera.x, y: this.camera.cameraPath[0].y - this.camera.y };
        const dist = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
        vec.x /= dist;
        vec.y /= dist;
        if (Math.abs(vec.x) > Math.abs(vec.y)) {
            this.target = vec.x > 0 ? 2*WIDTH + HEIGHT*1.5 : WIDTH + HEIGHT/2;
        }
        else if (Math.abs(vec.x) < Math.abs(vec.y)) {
            this.target = vec.y > 0 ? WIDTH / 2 : WIDTH * 1.5 + HEIGHT;
        }
        else {
            if (vec.x > 0) {
                this.target = this.y > 0 ? 0 : WIDTH+HEIGHT;
            }
            else {
                this.target = this.y > 0 ? WIDTH : 2*WIDTH+HEIGHT;
            }
        }
        if (this.target > this.position) {
            this.direction = (this.target - this.position < WIDTH+HEIGHT) ? 1 : -1;
        }
        else if (this.target < this.position) {
            this.direction = (this.position - this.target < WIDTH+HEIGHT) ? -1 : 1;
        }
        else {
            this.target = null;
        }
        this.position = Math.floor(this.position);
    }

    render(ctx, srcX, srcY) {
        this.particles.forEach((p,i) => ctx.drawImage(data["smoke-particles" + Math.floor(i/(SMOKE2_MAX_PARTICLES/NB_SMOKES))], PARTICLE_SIZE * p.shape, 0, FRAME_SIZE, FRAME_SIZE, p.x - PARTICLE_SIZE/2 - srcX, p.y - PARTICLE_SIZE/2 - srcY, PARTICLE_SIZE, PARTICLE_SIZE));
        if (DEBUG) {
            const saveFS = ctx.fillStyle;
            ctx.fillStyle = "red";
            const p = this.getCoordsFor(this.position);
            ctx.fillRect(p.x - 10, p.y - 10, 20, 20);
            ctx.fillText(JSON.stringify(p), 200, 20)
            ctx.fillStyle = saveFS;
        }
    }

}