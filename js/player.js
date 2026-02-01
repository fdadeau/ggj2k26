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
const PLAYER_W = 40, PLAYER_H = 40;

/** Draw hitbox */
const DEBUG = false;

const MASK = { NONE: "normal", BIRD: "bird", WRESTLER: "wrestler", NINJA: "ninja"};

const DEFAULT_ANIM_DELAY = 200;
const FRAME_SIZE = 30;

const STILL_R_ANIMATION = {
    length: 1,
    ref: "stillR",
    delay: DEFAULT_ANIM_DELAY
};

const STILL_L_ANIMATION = {
    length: 1,
    ref: "stillL",
    delay: DEFAULT_ANIM_DELAY
};

const RUN_R_ANIMATION = {
    length: 3,
    ref: "runR",
    delay: 110
};

const RUN_L_ANIMATION = {
    length: 3,
    ref: "runL",
    delay: 110
};

const JUMP_R_ANIMATION = {
    length: 5,
    ref: "jumpR",
}

const JUMP_L_ANIMATION = {
    length: 5,
    ref: "jumpL",
}

export class Player {

    constructor(x, y) {
        this.x = this.lastX = x;
        this.y = this.lastY = y;
        this.width = PLAYER_W;
        this.height = PLAYER_H;
        this.speedX = 0;
        this.speedY = GRAVITY;
        this.onGround = 0;
        this.onPlatform = null;     
        this.dead = false;
        this.lastDir = 1;
        this.dash = null;
        this.mask = MASK.NINJA;
        this.mask2 = MASK.NONE;
        this.jumpCount = 0;
        this.currentAnimation = { frame: 0, currentDelay: STILL_R_ANIMATION.delay, animation: STILL_R_ANIMATION };
        this.isJumping = false;
    }


    addMask(kind) {
        switch (kind) {
            case "bird":
                this.mask2 = MASK.BIRD;
                break;
            case "ninja":
                this.mask2 = MASK.NINJA;
                break;
            case "wrestler":
                this.mask2 = MASK.WRESTLER;
                break;        
        }
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

        if (keys.swap) {
            const tmp = this.mask;
            this.mask = this.mask2;
            this.mask2 = tmp;
            keys.swap = 0;
        }
        if (keys.action && this.mask == MASK.WRESTLER) {
            level.hit(this.x + this.lastDir*this.width, this.y);
            keys.action = 0;
        }
        if (keys.action && this.mask == MASK.NINJA && !this.dash) {
            keys.action = 0;
            audio.playSound("fx-ninja", "player", 1);
            this.dash = { delay: 100, save: 0*this.speedX };
            this.speedX = this.lastDir * MAX_SPEED * 3;
        }
        if (this.dash) {
            this.dash.delay -= dt;
            if (this.dash.delay <= 0) {
                this.speedX = this.dash.save;
                this.dash = null;
            }
        }

        if(this.isJumping && (this.isOnTheGround(level) || this.onPlatform)){
            this.isJumping = false;
        }

        if (keys.jump) { // keyboard routine
            if (this.isOnTheGround(level) || this.onPlatform || this.mask == MASK.BIRD && this.jumpCount == 1) {
                this.speedY = -JUMP_FORCE;
                this.onPlatform = null;
                this.jumpCount++;
                this.isJumping = true;
                if (this.jumpCount == 2) {
                    audio.playSound("fx-bird", "player", 1);
                }
            }
            keys.jump = 0;
        }

        if(keys.gamepadJump) { // gamepad routine (using gamepadJump & gamepadJumpSinglePress)
            const grounded = this.isOnTheGround(level) || this.onPlatform;

            if (grounded) {
                this.speedY = -JUMP_FORCE;
                this.onPlatform = null;
                this.jumpCount = 0; 
                this.isJumping = true;
            } else if (keys.gamepadJumpSinglePress && this.mask === MASK.BIRD && this.jumpCount === 1) {
                this.speedY = -JUMP_FORCE;
                this.jumpCount++;
                this.isJumping = true;
            }
            
            keys.gamepadJumpSinglePress = 0;
        }



        if (!this.dash) {

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
        }

        // if flying
        if (this.speedY != 0) {
            this.updateYPosition(dt, level);
            if (this.dead) return;  // out of bounds --> dead
        }

        this.updateXPosition(dt, level);
                
        if (!this.onPlatform && this.isOnTheGround(level) == 0) {
            this.speedY += GRAVITY * dt / (1000/60);
            if (this.jumpCount == 0) this.jumpCount = 1;
            if (this.speedY > MAX_FALL_SPEED) { this.speedY = MAX_FALL_SPEED; }
        }
        else {
            this.speedY = 0;
            this.jumpCount = 0;
        }

        if (this.y >= level.world.height + 100) {
            this.dead = true;
        }

        if (!this.dead) this.determineAnimation(dt);        
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
                this.x = Math.floor(this.x / level.size + 1) * level.size - PLAYER_W/2 - 1;
            }
            else {
                this.x = Math.floor(this.x / level.size ) * level.size + PLAYER_W / 2 + 1;
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
        // check vertical collision
        let newY = this.y + this.speedY * dt;

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
        if (level.whichTile(this.x - PLAYER_W/2, this.y + 1) != 0 || level.whichTile(this.x + PLAYER_W/2, this.y + 1) != 0) {
            return 1; //Math.floor((this.y + 1) / level.size) * level.size;
        }
        return 0;
    }

 
    determineAnimation(dt){
        if(this.speedY !== 0){
            const isStartingJump = this.speedY < 0.6 * -JUMP_FORCE;
            const isMidAirJumping = this.speedY < 0.2 * -JUMP_FORCE && !isStartingJump;
            const isMidAirLanding = this.speedY > 0 && this.speedY < 0.4 * JUMP_FORCE;
            const isEndingLanding = this.speedY > 0 && !isMidAirLanding;
            const isInMiddleOfJump = !isStartingJump && !isMidAirJumping && !isMidAirLanding && !isEndingLanding; 
           
            if(this.lastDir > 0){
                if(this.currentAnimation.animation.ref !== JUMP_R_ANIMATION.ref){
                    this.currentAnimation.animation = JUMP_R_ANIMATION
                }
            }else{
                if(this.currentAnimation.animation.ref !== JUMP_L_ANIMATION.ref){
                    this.currentAnimation.animation = JUMP_L_ANIMATION
                }
            }
            
            if(isStartingJump && this.isJumping){
                this.currentAnimation.frame = 0;
            } else if(isMidAirJumping && this.isJumping){
                this.currentAnimation.frame = 1;
            } else if(isInMiddleOfJump && this.isJumping){
                this.currentAnimation.frame = 2;
            } else if(isMidAirLanding){
                this.currentAnimation.frame = 3;
            } else if(isEndingLanding){
                this.currentAnimation.frame = 4;
            }
            return;
        }

        const nonMovementDetectiontreshold = 2;
        if(this.lastDir === 1){
            if(this.speedX == 0 || Math.abs(this.lastX - this.x) < nonMovementDetectiontreshold){
                this.currentAnimation = { frame: 0, currentDelay: STILL_R_ANIMATION.delay, animation: STILL_R_ANIMATION };
                return;
            }

            if(this.currentAnimation.animation.ref !== RUN_R_ANIMATION.ref){
                this.currentAnimation = { frame: 0, currentDelay: RUN_R_ANIMATION.delay, animation: RUN_R_ANIMATION };
                return;
            };
        } else {
            if(this.speedX == 0 || Math.abs(this.lastX - this.x) < nonMovementDetectiontreshold){
                this.currentAnimation = { frame: 0, currentDelay: STILL_L_ANIMATION.delay, animation: STILL_L_ANIMATION };
                return;
            }
            
            if(this.currentAnimation.animation.ref !== RUN_L_ANIMATION.ref){
                this.currentAnimation = { frame: 0, currentDelay: RUN_L_ANIMATION.delay, animation: RUN_L_ANIMATION };
                return;
            };
        }

        this.currentAnimation.currentDelay -= dt;
        if(this.currentAnimation.currentDelay < 0){
            this.currentAnimation.currentDelay = this.currentAnimation.animation.delay;
            this.currentAnimation.frame++;
            if(this.currentAnimation.frame >= this.currentAnimation.animation.length){
                this.currentAnimation.frame = 0;
            }
        }
    }

    getSpriteDependingOnMask(){
        return `${this.mask}-${this.currentAnimation.animation.ref}`;
        /*
        switch(this.mask){
            case MASK.BIRD:
                return `bird-${this.currentAnimation.animation.ref}`
            case MASK.NINJA:
                return `ninja-${this.currentAnimation.animation.ref}`
            case MASK.WRESTLER:
                return `wrestler-${this.currentAnimation.animation.ref}`
            case MASK.NONE:
            default:
                return `normal-${this.currentAnimation.animation.ref}`
        }
        */
    }
    
    render(ctx, x, y) {
        ctx.drawImage(
            data[this.getSpriteDependingOnMask()], 
            0,
            (this.currentAnimation.frame * FRAME_SIZE),
            FRAME_SIZE,
            FRAME_SIZE,
            Math.floor(x - PLAYER_W / 2),
            Math.floor(y - PLAYER_H + 1),
            PLAYER_W, 
            PLAYER_H
        );

        ctx.drawImage(data[`frame-${this.mask}`], 10, 10, 30, 30);
        ctx.drawImage(data[`frame-${this.mask2}`], 50, 20, 20, 20);

        //ctx.fillText(JSON.stringify(this.dash), 10, 50)

        let scale = 1;
        // debug info (pressed keys)
        if (DEBUG) {
            ctx.textAlign = "left";
            ctx.font = "12px arial";
            ctx.fillText(`x=${this.x.toFixed(2)},y=${this.y.toFixed(2)},onPlatform=${this.onPlatform != null},dead=${this.dead},jc=${this.jumpCount}`, 10, 60);
            ctx.strokeStyle = "#F00";
            ctx.strokeRect(x - PLAYER_W/2, y-PLAYER_H, PLAYER_W, PLAYER_H);
        }
    }
}