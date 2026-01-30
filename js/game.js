import { data } from "./preload.js";

import { WIDTH, HEIGHT } from "./main.js";

import { Level } from "./level.js";

import { LEVELS } from "./LEVELS.js"; 

import { audio } from "./audio.js";

const LOADING = 0, MENU = 5, LEVEL_SELECTION = 8, IN_GAME = 10, PAUSE = 15, GAME_OVER = 20, COMPLETED = 30, TIME_OUT = 40; 

const START_LEVEL = 6;

const DELAY = 60;
let frame = -10, df = 1, delay = DELAY, max = 50;

let fps = 0, time = 1000, lastFPS = 0;

export class Game {

    constructor(cvs) {
        this.ctx = cvs.getContext("2d");
        this.nLevel = START_LEVEL;
        this.state = LOADING;
        this.msg = "Loading...";
        this.keys = { jump: 0, left: 0, right: 0, swap: 0, action: 0 };
    }

    reset() {
        this.level = new Level(this.nLevel);
        this.state = IN_GAME;
        this.keys = { jump: 0, left: 0, right: 0, swap: 0, action: 0 };
    }

    loading(loaded, total) {
        if (loaded >= total) {
            this.state = MENU;
            this.msg = "Press spacebar to start";
            return;
        }
        this.msg = "Loading... (" + loaded + "/" + total + ")";

    }

    update(dt) {
        fps++
        if (this.state == IN_GAME) {
            this.level.update(dt, this.keys);
            if (this.level.player.dead) {
                this.state = GAME_OVER;
                audio.playSound("death", "player", 0.7, false);
                return true;
            }
            if (this.level.player.complete) {
                this.state = COMPLETED;
                audio.playSound("victory", "player", 0.7, false);
            }
        }
        return true;
    }

    render() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
//        this.level.render(this.ctx);
        this.ctx.textAlign = "left";
        this.ctx.fillText(`keys = ${JSON.stringify(this.keys)}`, 10, 40);
        if (this.state == PAUSE) {
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(WIDTH / 2 - 160, HEIGHT / 2 - 100, 320, 200);
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(WIDTH / 2 - 150, HEIGHT / 2 - 90, 300, 180);
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText("GAME PAUSED", WIDTH/2, HEIGHT/2 - 60);
            this.ctx.fillText("Press Escape again to exit", WIDTH/2, HEIGHT/2);
            this.ctx.fillText("Press Spacebar to resume", WIDTH/2, HEIGHT/2 + 50);
        }
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "right";
        this.ctx.font = "16px courier";
        this.ctx.fillText(lastFPS, 20, 20)
    }

    pressKey(code) {
        switch (code) {
            case "Space":
                this.keys.jump = 1;
                break;
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
         }
    }
    
    releaseKey(code) {
        switch (code) {
            case "Space":
                this.keys.jump = 0;
                break;
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
            case "Escape": 
                switch (this.state) {
                    case PAUSE: 
                        this.state = IN_GAME;
                        break;
                    case IN_GAME:
                        this.state = PAUSE;
                        break;
                }
                break;
        }
        return;
    }
    
}

function mkButton(ctx, txt, txt2, x, y, selected) {
    ctx.font = "arial 30px";
    ctx.textAlign = "center";
        
    if (selected) {
        ctx.fillStyle = "#600";
        ctx.fillRect(x - 20, y - 28, 40, 40);
    }
    ctx.fillStyle = "white";
    ctx.fillText(txt, x, y);
    ctx.fillText(txt2, x, y+40);
}
