import { data } from "./preload.js"; 

export const PARTICLE_SIZE = 50;

export const SMOKE_SPRITE_NB_FRAMES = 5;

export class Particle {
    constructor(x, y, spriteIndex){
        this.x = x;
        this.y = y; 
        this.spriteIndex = Math.floor(Math.random()*SMOKE_SPRITE_NB_FRAMES)//Math.max(0,Math.min(spriteIndex,SMOKE_SPRITE_NB_FRAMES));
    }

    render(ctx, srcX, srcY) {
        const image = data["smokeparticles"];
        const sx = this.spriteIndex*16;
        const sy = 0;
        const sWidth = 16;
        const sHeight = 16;
        const dx = this.x - srcX;
        const dy = this.y - srcY;
        const dWidth = PARTICLE_SIZE; 
        const dHeight = PARTICLE_SIZE;
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}

