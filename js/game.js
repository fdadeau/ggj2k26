
import { WIDTH, HEIGHT } from "./main.js";

import { Level } from "./level.js";

import { audio } from "./audio.js";

import { getGamepadFromNavigator } from "./gamepad.js";

import { data } from "./preload.js"; 

const STATES = {
    LOADING: 0, 
    MENU: 5, 
    LEVEL_SELECTION: 8, 
    IN_GAME: 10, 
    PAUSE: 15, 
    GAME_OVER: 20, 
    COMPLETED: 30, 
}; 

const START_LEVEL = 1;

const DELAY = 60;
let frame = -10, df = 1, delay = DELAY, max = 50;

let fps = 0, time = 1000, lastFPS = 0;

export class Game {

    constructor(cvs, gamepadHandler) {
        this.ctx = cvs.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.nLevel = START_LEVEL;
        this.state = STATES.LOADING;
        this.gamepadHandler = gamepadHandler;        
        this.keys = { left: 0, right: 0, jump: 0, swap: 0, action: 0, continue: 0, pause: 0 };
        this.previousButtons = new Set();
        this.loadingMessage = "";
    }

    reset() {
        this.level = new Level(this.nLevel);
        this.state = STATES.IN_GAME;
        this.keys = { left: 0, right: 0, jump: 0, swap: 0, action: 0, continue: 0, pause: 0 };
        this.previousButtons = new Set();
        audio.playMusic("music1", 0.7);
    }

    changeLevel(levelId) {
        this.nLevel = levelId;
        this.level = new Level(this.nLevel);
        this.state = STATES.COMPLETED;
        this.keys = { left: 0, right: 0, jump: 0, swap: 0, action: 0, continue: 0, pause: 0 };
        this.previousButtons = new Set();
    }

    loading(loaded, total) {
        if (loaded >= total) {
            this.state = STATES.MENU;
            return;
        }

        this.loadingMessage = `${loaded}/${total}`;
    }

    pause(){
        this.state = STATES.PAUSE;
        this.keys.pause = 0;
    }

    isPlaying(){
        return this.state === STATES.IN_GAME
    }

    unpause(){
        this.keys.continue = 0;
        this.state = STATES.IN_GAME;
    }

    update(dt) {
        const gamepad = getGamepadFromNavigator() 
		if(gamepad){
			this.handleGamepadActions(gamepad)
		}

        // compute FPS (for debug purposes)
        time -= dt;
        if (time < 0) {
            lastFPS = fps;
            fps = 0;
            time = 1000;
        }
        else {
            fps++
        }

        // deal with prioritary keys
        
        switch (this.state) {
            case STATES.LOADING:
                return;
            case STATES.LEVEL_SELECTION:
                throw new Error("Not Implemented yet");
            case STATES.IN_GAME:
                if (this.keys.pause) {
                    this.pause();
                    return;
                }
                if (this.state == STATES.IN_GAME) {
                    const nextLevel = this.level.update(dt, this.keys);
                    if(nextLevel !== undefined){
                        this.changeLevel(
                            nextLevel,
                        );
                    }

                    if (this.level.player.dead) {
                        this.state = STATES.GAME_OVER;
                        this.msg = "GAME OVER";
                        audio.playSound("death", "player", 0.4, false);
                        return true;
                    }
                    else if (this.level.player.complete) {
                        this.state = STATES.COMPLETED;
                        audio.playSound("victory", "player", 0.7, false);
                    }
                }   
                break;
            case STATES.MENU: 
                if (this.keys.continue) {
                    this.keys.continue = 0;
                    this.reset();
                    this.state = STATES.IN_GAME;
                    this.msg = "IN_GAME";
                }                
                break;
            case STATES.COMPLETED:
                this.msg = "Press spacebar continue to next level"
                if (this.keys.continue) {
                    this.keys.continue = 0;
                    this.state = STATES.IN_GAME;
                    this.msg = "IN_GAME";
                }
                break;
			case STATES.PAUSE:
				if(this.keys.continue){
					this.unpause()
				}
                else if (this.keys.pause) {
                    this.reset();
                }
                break;
            case STATES.GAME_OVER: 
                if (this.keys.continue) {
                    this.reset();
                }
                break;
            default: 
                throw new Error(`Unhandled game state, got ${this.state}`);
        }

        return true;
    }


    render() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        this.ctx.fillStyle = "white";

        switch(this.state){
            case STATES.PAUSE:
                this.ctx.drawImage(data["menu-background"], 0, 0, 32 * 3, 32 * 2, WIDTH / 2 - 160, HEIGHT / 2 - 100, 320, 200);
                this.ctx.font = '400 32px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("GAME PAUSED", WIDTH / 2, HEIGHT / 2 - 30);
                this.ctx.font = '16px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("Press ESCAPE to reset", WIDTH / 2, HEIGHT / 2 + 30);
                this.ctx.fillText("Press SPACE to resume", WIDTH / 2, HEIGHT / 2 + 60);
                break;
            case STATES.GAME_OVER: 
                this.ctx.drawImage(data["menu-background"], 0, 0, 32 * 3, 32 * 2, WIDTH / 2 - 160, HEIGHT / 2 - 100, 320, 200);
                this.ctx.font = '400 32px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2 - 30);
                this.ctx.font = '16px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("Press SPACE to restart", WIDTH / 2, HEIGHT / 2 + 30);
                break;
            case STATES.COMPLETED:
                this.ctx.drawImage(data["menu-background"], 0, 0, 32 * 3, 32 * 2, WIDTH / 2 - 160, HEIGHT / 2 - 100, 320, 200);
                this.ctx.font = '400 32px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("LEVEL COMPLETED!", WIDTH / 2, HEIGHT / 2 - 30);
                this.ctx.font = '16px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("Press SPACE to continue", WIDTH / 2, HEIGHT / 2 + 30);
                break;
            case STATES.IN_GAME:
                this.level.render(this.ctx)
                break;
            case STATES.MENU:
                this.ctx.drawImage(data["menu-background"], 0, 0, 32 * 3, 32 * 2, WIDTH / 2 - 160, HEIGHT / 2 - 100, 320, 200);
                this.ctx.font = '400 48px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("INSERT NAME", WIDTH / 2, HEIGHT / 2 - 30);
                this.ctx.font = '16px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("Press SPACE to start", WIDTH / 2, HEIGHT / 2 + 30);
                break;
            case STATES.LEVEL_SELECTION:
                throw new Error("Not Implemented yet");
            case STATES.LOADING:
                this.ctx.font = '400 32px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText("LOADING", WIDTH / 2, HEIGHT / 2 - 30);
                this.ctx.font = '16px pixel-sans';
                this.ctx.textAlign = "center";
                this.ctx.fillText(this.loadingMessage, WIDTH / 2, HEIGHT / 2 + 30);
                break;
            default:
                throw new Error(`Unhandled game state, got ${this.state}`);
        }
    }

	handleGamepadActions(gamepad){
        const axisMoved = this.gamepadHandler.getAxeOrientationAndIntensity(gamepad)
		const { pressedButtons } = this.gamepadHandler.getButtonState(gamepad) 
        const currentButtons = new Set(pressedButtons);

        const jumpPressed = currentButtons.has("JUMP") && !this.previousButtons.has("JUMP");
        const jumpHeld = currentButtons.has("JUMP");
        const swapPressed = currentButtons.has("MASK_SWITCH") && !this.previousButtons.has("MASK_SWITCH");
        const specialPressed = currentButtons.has("SPECIAL") && !this.previousButtons.has("MASK_SWITCH");
        
        this.keys.swap = swapPressed ? 1 : 0;
        this.keys.gamepadJump = jumpHeld ? 1 : 0;
        this.keys.gamepadJumpSinglePress = jumpPressed ? 1 : 0;
        this.keys.action = specialPressed ? 1 : 0;

        this.previousButtons = currentButtons;

		if(axisMoved){
			if(axisMoved.direction === "LEFT"){
				this.keys.right = 0;
				this.keys.left = 1;
			}else if (axisMoved.direction === "RIGHT"){
				this.keys.right = 1;
				this.keys.left = 0;
			}else{
				throw new Error(`Unknown axis direction, got ${axisMoved.direction}...`);
			}
		}else{
			this.keys.right = 0;
			this.keys.left = 0;
		}
	}

    pressKey(code) {
        switch (code) {
            case "ArrowLeft":
                this.keys.left = 1;
                break;
            case "ArrowRight":
                this.keys.right = 1;
                break;
            case "KeyA":
                this.keys.action = 1;
                break;
            case "KeyD":
                this.keys.jump = 1;
                break;
            case "KeyS":
                this.keys.swap = 1;
                break;
            case "Space":
                this.keys.continue = 1;
                break;
            case "Escape": 
                this.keys.pause = 1;
                break;

         }
    }
    
    releaseKey(code) {
        switch (code) {
            case "ArrowLeft":
                this.keys.left = 0;
                break;
            case "ArrowRight":
                this.keys.right = 0;
                break;
            case "KeyA": 
                this.keys.action = 0;
                break;
            case "KeyS":
                this.keys.swap = 0;
                break;
            case "KeyD": 
                this.keys.jump = 0;
                break;
            case "Space":
                this.keys.continue = 0;
                break;
            case "Escape": 
                this.keys.pause = 0;
                break;
        }
        return;
    }
        
}