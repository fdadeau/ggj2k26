import { data } from "./preload.js"; 

export const PARTICLE_SIZE = 5;

export const SMOKE_SPRITE_NB_FRAMES = 8;

export class Particle {
    constructor(x, y, spriteIndex){
        this.x = x;
        this.y = y;
        this.spriteIndex = Math.max(0,Math.min(spriteIndex,SMOKE_SPRITE_NB_FRAMES));
    }

    render(ctx) {
        const image = data["smokeparticles"];
        const sx = this.spriteIndex*PARTICLE_SIZE;
        const sy=0;
        const sWidth = PARTICLE_SIZE;
        const sHeight = PARTICLE_SIZE;
        const dx = this.x;
        const dy = this.y;
        const dWidth = PARTICLE_SIZE; 
        const dHeight = PARTICLE_SIZE
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}

