import { data } from "./preload.js"; 

export const PARTICLE_SIZE = 50;

export const SMOKE_SPRITE_NB_FRAMES = 5;

const FRAME_SIZE = 16;

export class Particle {
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

