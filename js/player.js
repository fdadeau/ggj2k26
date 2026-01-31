/** 
 * Player description  
 */

import { audio } from "./audio.js";
import { WIDTH, HEIGHT } from "./main.js";

import { data } from "./preload.js"; 

/** Movement characteristics */
const JUMP_FORCE = 0.7;
const GRAVITY = 0.05;
const ACCELERATION = 0.02;
const MAX_SPEED = 0.4;
const MAX_FALL_SPEED = 0.8;

/** Player dimensions */
const PLAYER_W = 32, PLAYER_H = 32;

/** Draw hitbox */
const DEBUG = true;

const STILL_ANIM = 1, WALK_ANIM = 4, JUMP_ANIM = 3, DISAPPEAR_ANIM = 32, APPEAR_ANIM = 31;
const FRAME_SIZE = 32;
const ANIM_DELAY = 140;
const OFFSET_X = 30, OFFSET_Y = 48, PLAYER_SIZE = 32;

export class Player {

    constructor(x, y) {
        // position
        this.x = this.lastX = x;
        this.y = this.lastY = y;
        // movement 
        this.speedX = 0;
        this.speedY = GRAVITY;
        this.onGround = 0;
        this.onPlatform = null;     
        // active
        this.active = true;
        this.dead = false;
        this.complete = false;
        // 
        this.lastDir = 1;
        // 
        //this.animation = { type: NORMAL, remaining: 0, duration: 0 };
        //
        //this.currentAnim = { sprite: data["walkL"], frame: 0, which: STILL_ANIM, delay: ANIM_DELAY };
        // 

    }


    getHitbox() {
        return { x: this.x - PLAYER_W / 2, y: this.y - PLAYER_H, w: PLAYER_W, h: PLAYER_H };
    }


    update(dt, keys, level) {

        this.lastX = this.x;
        this.lastY = this.y;

        // if player is dead --> no more moves are possible.
        if (this.dead) {
            return;
        }

        if (keys.jump) {
            if (this.isOnTheGround(level) || this.onPlatform) {
                this.speedY = -JUMP_FORCE;
                this.onPlatform = null;
            }
            keys.jump = 0;
        }

        // key up on exit door
        if (keys.up && this.isOnTheGround(level) && level.isOnExit(this.x, this.y, PLAYER_W)) {
            this.complete = true;
            keys.up = 0;
            return;
        }

        // horizontal movement
        if (keys.right) {
            this.lastDir = 1;
            this.speedX = this.speedX >= MAX_SPEED ? MAX_SPEED : this.speedX + ACCELERATION * dt / (1000/60);
        }
        if (keys.left) {
            this.lastDir = -1;
            this.speedX = this.speedX <= -MAX_SPEED ? -MAX_SPEED : this.speedX - ACCELERATION * dt / (1000/60);
        }
        // if no key is pressed, increase or decrease to reach 0 
        if (!keys.left && !keys.right) {
            if (this.speedX > 0) {
                this.speedX = this.speedX - ACCELERATION * dt / (1000/60) <= 0 ? 0 : this.speedX - ACCELERATION * dt / (1000/60);
            }
            else if (this.speedX < 0) {
                this.speedX = this.speedX + ACCELERATION * dt / (1000/60) >= 0 ? 0 : this.speedX + ACCELERATION * dt / (1000/60);
            }
        }

        // if flying
        if (this.speedY != 0) {
            this.updateYPosition(dt, level);
            if (this.dead) return;  // out of bounds --> dead
        }
        // moving on a platform
        if (this.onPlatform != null) {
            this.y = this.onPlatform.y;
            if (this.onPlatform.dX) {
                this.x += this.onPlatform.x - this.onPlatform.lastX;
            }
            // check if platform has reached the ground. if so, set Y coordinate to ground level.
            let t = this.isOnTheGround(level); 
            if (t > 0) {
                this.y = t - 1;
                this.onPlatform = null;
            }
        }
        this.checkAboveCollision(level);
        if (this.dead) return;

        this.updateXPosition(dt, level);
                

//        this.onPlatform = this.isOnPlatform(level);

        if (!this.onPlatform && this.isOnTheGround(level) == 0) {
            this.speedY += GRAVITY * dt / (1000/60);
            if (this.speedY > MAX_FALL_SPEED) { this.speedY = MAX_FALL_SPEED; }
        }
        else {
            this.speedY = 0;
        }

        if (this.y >= level.world.height-10) {
            this.dead = true;
        }

        //if (!this.dead) this.determineAnimation(dt);
        
    }


    /**
     * Update player's X position
     * @param {Number} dt Time elapsed since last update (in ms)
     * @param {Level} level Level data 
     */
    updateXPosition(dt, level) {
        let newX = this.x + this.speedX * dt;
        
        let intersectingTile = level.intersectsWith(newX, this.y, PLAYER_W, PLAYER_H);
        if (intersectingTile == 0) {
            // if free to move horizontally
            this.x = newX;
        }
        else {
            // horizontal movement is not possible, get position next to wall depending on the direction
            if (this.speedX > 0) {
                this.x = Math.floor(this.x / level.size + 1) * level.size - PLAYER_W - 1;
            }
            else {
                this.x = Math.floor(this.x / level.size ) * level.size + PLAYER_W;
            }
            this.speedX = 0;
        }
    }
    /**
     * Update Y and X positions (in that particular order)
     * @param {Number} dt Time elapsed since last update (in ms)
     * @param {Level} level Level data
     */
    updateYPosition(dt, level) {
        console.log("update Y position", this.y, this.speedY, dt);
        // check vertical collision
        let newY = this.y + this.speedY * dt;

        console.log("update Y position 2 ", newY);
        // check if out of bounds --> dead
        if (newY >= level.world.height - 10) {
            this.y = newY;
            this.dead = true;
            return;
        }

        console.log("update Y position 3 ", newY);
        // check intersection with a tile
        let intersectingTile = level.intersectsWith(this.x, newY, PLAYER_W, PLAYER_H);
        if (intersectingTile == 0) {
            this.y = newY;
        }
        else {
            if (this.speedY > 0) {  // falling
                this.y = Math.floor(this.y / level.size + 1) * level.size - 1;
            }
            else { 
                this.y = Math.floor((this.y - PLAYER_H) / level.size) * level.size + PLAYER_H + 1;
                this.speedY = 0;
            }
        }    
    }
    /**
     * Checks if player's coordinates are on the floor.
     * @param {Level} level Level data 
     * @returns true if it's the case.
     */
    isOnTheGround(level) {
        if (level.whichTile(this.x - PLAYER_W, this.y + 1) != 0 || level.whichTile(this.x + PLAYER_W, this.y + 1) != 0) {
            return Math.floor((this.y + 1) / level.size) * level.size;
        }
        return 0;
    }

    isOnPlatform(level) {
        for (let i=0; i < level.platforms.length; i++) {
            let p = level.platforms[i];
            if (this.speedY >= 0 && p.intersects(this.x, this.y+1, this.lastX, this.lastY, PLAYER_W) && !this.collidesAbove(level)) {
                return p;
            }
        }
        if (this.isOnTheGround(level)) {
            this.onGround = true;

        }
        return null;
    };

    checkAboveCollision(level) {
        if (this.collidesAbove(level)) {
            this.dead = true;
        }
    }
    collidesAbove(level) {
        return (level.whichTile(this.x-PLAYER_W, this.y-PLAYER_H) != 0 || level.whichTile(this.x+PLAYER_W,this.y-PLAYER_H) != 0)
    }

    

    render(ctx, x, y) {
        // drawing of the character
        ctx.strokeStyle = "#FAA";
        ctx.strokeRect(x - PLAYER_W/2, y - PLAYER_H, PLAYER_W, PLAYER_H);
        let scale = 1;
        // debug info (pressed keys)
        if (DEBUG) {
            ctx.textAlign = "left";
            ctx.font = "12px arial";
            ctx.fillText(`x=${this.x.toFixed(2)},y=${this.y.toFixed(2)},onPlatform=${this.onPlatform != null},complete=${this.complete}`, 10, 60);
            
        }
        
    }

}