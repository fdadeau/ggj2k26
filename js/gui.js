import { Game } from "./game.js"
import { getGamepadFromNavigator } from "./gamepad.js";
import { HEIGHT, WIDTH } from "./level.js";
import { data } from "./preload.js"; 
import { audio } from "./audio.js";
import { SmokeTitle } from "./smoke.js";

export const STATES = {
    LOADING: 0, 
    MENU: 5, 
    LEVEL_SELECTION: 8, 
    IN_GAME: 10, 
    PAUSE: 15, 
    GAME_OVER: 20, 
    COMPLETED: 30, 
    CREDITS: 40, 
    CONTROLS: 50, 
    GAME_END: 100       // TODO faire une séquence de crédits
}; 

const perso = { delay: 2000, max: 2000, dir: "L", frame: "normal", frames: ["normal", "ninja", "wrestler", "bird"] }

export class GUI {
    constructor(cvs, gamepadHandler){
        this.game = new Game(gamepadHandler);
        this.gamepadHandler = gamepadHandler;

        this.ctx = cvs.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.state = STATES.LOADING;

        this.selection = 0;

        this.buttons = [
            /*"PLAY": */ new Button("Play", 20, HEIGHT - 110, 160, 64, 20),
            /*"CONTROLS":*/ new Button("Controls", WIDTH / 2 - 90, HEIGHT - 110, 160, 64, 20),
            //"TUTORIAL": new Button("Tutorial", WIDTH / 2 - 90, HEIGHT - 110, 160, 64, 20),
            /*"CREDITS":*/ new Button("Credits", WIDTH / 2 + 120, HEIGHT - 110, 160, 64, 20)
        ];
        this.buttons[this.selection].selected = true;
        //this.homeButton = new HomeButton(15, 15, 40, 40);

        this.lvlButtons = [
            new Button("Tutorial", 20, HEIGHT - 110, 160, 64, 20),
            new Button("Level 1", WIDTH / 2 - 90, HEIGHT - 110, 160, 64, 20),
            new Button("Level 2", WIDTH / 2 + 120, HEIGHT - 110, 160, 64, 20)
        ]

        this.loadingMessage = "";

        this.keys = { left: 0, right: 0, jump: 0, swap: 0, action: 0, pause: 0 };
        this.previousButtons = new Set();
        this.smokeTitle = new SmokeTitle();
    }

    loading(loaded, total) {
        if (loaded >= total) {
            //this.state = STATES.MENU;
            // Pour permettre de déclencher une musique
            this.loadingMessage = "Loading complete. Press SPACE to play.";
            return;
        }
        this.loadingMessage = `${loaded}/${total}`;
    }

    pause(){
        if(this.state === STATES.PAUSE){
            return;
        }
        this.state = STATES.PAUSE;
        audio.ambiance.pause();
        audio.playSound("fx-pause","player",0.7);
        this.keys.pause = 0;
    }

    unpause(){
        if(this.state !== STATES.PAUSE){
            return;
        }
        audio.ambiance.play();
        this.keys.jump = 0;
        this.state = STATES.IN_GAME;
    }

    lose(){
        this.state = STATES.GAME_OVER;
    }

    completeLevel(){
        this.state = STATES.COMPLETED;
    }

    isPlaying(){
        return this.state === STATES.IN_GAME;
    }

    showControls(){
        if(this.state === STATES.MENU){
            this.state = STATES.CONTROLS;
        }
    }

    showCredits(){
        if(this.state === STATES.MENU){
            this.state = STATES.CREDITS;
        }
    }

    reset(){
        this.keys = { left: 0, right: 0, jump: 0, swap: 0, action: 0, pause: 0 };
        this.previousButtons = new Set();
        this.game.reset();
        audio.playMusic("music-ingame", 0.7, 0);
        this.state = STATES.IN_GAME;
    }

    goBackToMenu(){
        this.keys = { left: 0, right: 0, jump: 0, swap: 0, action: 0, pause: 0 };
        this.previousButtons = new Set();
        this.game.reset();
        this.state = STATES.MENU;
    }

    changeLevel(levelId){
        this.state = STATES.COMPLETED;
        this.keys = { left: 0, right: 0, jump: 0, swap: 0, action: 0, pause: 0 };
        this.previousButtons = new Set();
        this.game.changeLevel(levelId);
    }

    startTutorial(){
        this.keys = { left: 0, right: 0, jump: 0, swap: 0, action: 0, pause: 0 };
        this.previousButtons = new Set();
        this.game.changeLevel(0);
        audio.playMusic("music-ingame", 0.7, 0);
        this.state = STATES.IN_GAME;
    }

    update(dt){
        const gamepad = getGamepadFromNavigator() 
		if(gamepad){
			this.handleGamepadActions(gamepad)
		}

        perso.delay -= dt;
        if (perso.delay < 0) {
            if (Math.random() > 0.5) {
                perso.frame = perso.frame != perso.frames[0] ? perso.frames[0] : perso.frames[Math.floor(1+Math.random()*3)];
            }
            else {
                perso.dir = perso.dir == "L" ? "R" : "L";
            }
            perso.delay = perso.max;
        }

        switch(this.state){
            case STATES.LOADING:
                if (this.keys.jump) {
                    audio.playMusic("title-track", 0.7, 0);
                    this.state = STATES.MENU;
                    this.keys.jump = 0;
                }
                return;
            case STATES.LEVEL_SELECTION:
                this.smokeTitle.update(dt); 
                this.lvlButtons.forEach(b => b.update(dt));
                if (this.keys.pause) {
                    this.state = STATES.MENU;
                    this.selection = 0;
                    this.keys.pause = 0;
                }
                if (this.keys.right) {
                    if (this.selection < Object.keys(this.lvlButtons).length-1) {
                        this.lvlButtons[this.selection].selected = false;
                        this.selection++;
                        this.lvlButtons[this.selection].selected = true;
                    } 
                    this.keys.right = 0;
                }
                if (this.keys.left) {
                    if (this.selection > 0) {
                        this.lvlButtons[this.selection].selected = false;
                        this.selection--;
                        this.lvlButtons[this.selection].selected = true;
                    }
                    this.keys.left = 0;
                }
                if(this.keys.jump) {
                    this.keys.jump = 0;
                    switch(this.selection) {
                        case 0: // tutorial
                            this.game.changeLevel(0);
                            this.reset();
                            audio.playMusic("music-ingame", 0.7);
                            this.state = STATES.IN_GAME;
                            break;
                        case 1: // start speed run
                            this.game.changeLevel(1);
                            this.reset();
                            audio.playMusic("music-ingame", 0.7);
                            this.state = STATES.IN_GAME;
                            break;
                        case 2: // start adventure
                            this.game.changeLevel(2);
                            this.reset();
                            audio.playMusic("music-ingame", 0.7);
                            this.state = STATES.IN_GAME;
                            break;
                    }
                }
                break;
                
            case STATES.IN_GAME:
                if (this.keys.pause) {
                    this.pause();
                    return;
                }
                if(this.state === STATES.IN_GAME){
                    if(this.game.level.completed) {
                        this.changeLevel(this.game.level.completed.next);
                        return;
                    }
                    if (this.game.level.player.dead) {
                        this.state = STATES.GAME_OVER;
                        audio.playSound("death", "player", 0.4, false);
                        audio.ambiance.pause();
                        return true;
                    }
                    this.game.update(dt, this.keys);
                }
                break;
            case STATES.MENU:
                this.smokeTitle.update(dt); 
                this.buttons.forEach(b => b.update(dt));
                if (this.keys.right) {
                    if (this.selection < Object.keys(this.buttons).length-1) {
                        this.buttons[this.selection].selected = false;
                        this.selection++;
                        this.buttons[this.selection].selected = true;
                    } 
                    this.keys.right = 0;
                }
                if (this.keys.left) {
                    if (this.selection > 0) {
                        this.buttons[this.selection].selected = false;
                        this.selection--;
                        this.buttons[this.selection].selected = true;
                    }
                    this.keys.left = 0;
                }
                if(this.keys.jump) {
                    this.keys.jump = 0;
                    switch(this.selection) {
                        case 0: // play
                            this.state = STATES.LEVEL_SELECTION;
                            this.selection = 0;
                            this.lvlButtons[0].selected = true;
                            break;
                        case 1: // controls
                            this.state = STATES.CONTROLS;
                            break;
                        case 2: // credits 
                            this.state = STATES.CREDITS;
                            break;
                    }
                }
                break;
            case STATES.CONTROLS:
                this.smokeTitle.update(dt); 
                if(this.keys.jump || this.keys.pause) {
                    this.state = STATES.MENU;
                    this.keys.jump = 0;
                    this.keys.pause = 0;
                    return;
                }
                break;
            case STATES.CREDITS:
                this.smokeTitle.update(dt); 
                if(this.keys.jump || this.keys.pause){
                    this.state = STATES.MENU;
                    this.keys.jump = 0;
                    this.keys.pause = 0;
                    return;
                }
                break;
            case STATES.COMPLETED:
                this.smokeTitle.update(dt); 
                if(this.keys.jump){
                    this.keys.jump = 0;
                    this.state = STATES.IN_GAME;
                }
                break;
            case STATES.PAUSE:
                this.smokeTitle.update(dt); 
                if(this.keys.jump){
                    this.unpause()
                }
                else if (this.keys.pause) {
                    this.goBackToMenu();
                    this.state = STATES.LEVEL_SELECTION;
                    audio.playMusic("title-track", 0.7);
                }
                break;
            case STATES.GAME_OVER: 
                this.smokeTitle.update(dt); 
                if(this.keys.jump){
                    this.reset()
                }
                else if (this.keys.pause) {
                    audio.playMusic("title-track", 0.7, 0);
                    this.goBackToMenu();
                }
                break;
            default:
                throw new Error(`Unhandled game state, got ${this.state}`);
        }
    }

    click(x, y){
        /*
        if(this.state === STATES.MENU && this.buttons.CONTROLS.isAt(x, y)){
            this.state = STATES.CONTROLS;
        }

        if(this.state === STATES.MENU && this.buttons.CREDITS.isAt(x, y)){
            this.state = STATES.CREDITS;
        }

        /*
        if(this.state === STATES.MENU && this.buttons.TUTORIAL.isAt(x, y)){
            this.startTutorial();
        }

        /*
        if((this.state === STATES.CREDITS || this.state === STATES.CONTROLS) && this.homeButton.isAt(x, y)){
            this.state = STATES.MENU;
        }
            */
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
            case "KeyS":
                this.keys.swap = 1;
                break;
            case "Space":
                this.keys.jump = 1;
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
            case "Space":
                this.keys.jump = 0;
                break;
            case "Escape": 
                this.keys.pause = 0;
                break;
        }
        return;
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

    render(){
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        this.ctx.fillStyle = "white";

        if (this.state !== STATES.LOADING && this.state !== STATES.IN_GAME) {
            this.ctx.drawImage(data["background"], 0, 0, WIDTH, HEIGHT);
            this.ctx.drawImage(data["trees"], -WIDTH/4, 0, WIDTH*2, HEIGHT);
            this.ctx.drawImage(
                data[`${perso.frame}-still${perso.dir}`],
                this.state === STATES.CREDITS ? 45 : 200,
                this.state === STATES.CREDITS ? 76 : 40,
                50,
                60
            );
            this.ctx.drawImage(data["logo-GGJ"], 530, 10, 100, 100);
        }

        switch(this.state){
            case STATES.PAUSE:
                this.renderPauseScreen();
                break;
            case STATES.GAME_OVER: 
                this.renderGameOverScreen();
                break;
            case STATES.COMPLETED:
                this.renderLevelCompleteScreen();
                break;
            case STATES.IN_GAME:
                this.game.render(this.ctx);
                break;
            case STATES.MENU:
                this.renderMainMenuScreen();
                break;
            case STATES.CONTROLS:
                this.renderControlsScreen();
                break;
            case STATES.CREDITS:
                this.renderCreditsScreen();
                break;
            case STATES.LEVEL_SELECTION:
                this.renderLevelSelectionScreen();
                break;
            case STATES.LOADING:
                this.renderLoadingScreen();
                return;
            default:
                throw new Error(`Unhandled game state, got ${this.state}`);
        }

        if (this.state !== STATES.LOADING && this.state !== STATES.IN_GAME) {
            this.smokeTitle.render(this.ctx);
        }
    }

    renderLoadingScreen(){
        this.ctx.font = '400 32px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("LOADING", WIDTH / 2, HEIGHT / 2 - 30);
        this.ctx.font = '16px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.loadingMessage, WIDTH / 2, HEIGHT / 2 + 30);
    }

    renderPauseScreen(){
        this.ctx.drawImage(data["menu-background"], 0, 0, 32 * 3, 32 * 2, WIDTH / 2 - 160, HEIGHT / 2 - 100, 320, 200);
        this.ctx.font = '400 32px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME PAUSED", WIDTH / 2, HEIGHT / 2 - 50);
        this.ctx.font = '16px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press SPACE to resume", WIDTH / 2, HEIGHT / 2 - 10);
        this.ctx.fillText("Press ESCAPE to go back to main menu", WIDTH / 2, HEIGHT / 2 + 20);
          if (this.state !== STATES.LOADING && this.state !== STATES.IN_GAME) {
            // smoke title
            this.smokeTitle.render(this.ctx);
        }
    }

    renderGameOverScreen(){
        this.ctx.drawImage(data["menu-background"], 0, 0, 32 * 3, 32 * 2, WIDTH / 2 - 160, HEIGHT / 2 - 100, 320, 200);
        this.ctx.font = '400 32px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2 - 50);
        this.ctx.font = '16px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press SPACE to restart", WIDTH / 2, HEIGHT / 2 - 10);
        this.ctx.fillText("Press ESCAPE to go to the main menu", WIDTH / 2, HEIGHT / 2 + 20);
    }

    renderLevelCompleteScreen(){
        this.ctx.drawImage(data["menu-background"], 0, 0, 32 * 3, 32 * 2, WIDTH / 2 - 160, HEIGHT / 2 - 100, 320, 200);
        this.ctx.font = '400 32px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("LEVEL COMPLETED!", WIDTH / 2, HEIGHT / 2 - 30);
        this.ctx.font = '16px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press SPACE to continue", WIDTH / 2, HEIGHT / 2);
    }

    renderMainMenuScreen(){
        this.ctx.drawImage(
            data["menu-background"],
            0, 0, 32 * 3, 32 * 2,
            WIDTH / 2 - 160, HEIGHT / 2 - 100,
            320, 200
        );

        this.ctx.font = '400 48px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("LIMASK", WIDTH / 2, HEIGHT / 2 - 30);

        this.ctx.font = '16px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Select option", WIDTH / 2, HEIGHT / 2 +10);

        this.buttons.forEach(b => b.render(this.ctx));
    }

    renderLevelSelectionScreen(){
        this.ctx.drawImage(
            data["menu-background"],
            0, 0, 32 * 3, 32 * 2,
            WIDTH / 2 - 160, HEIGHT / 2 - 100,
            320, 200
        );

        this.ctx.font = '400 28px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Level Selection", WIDTH / 2, HEIGHT / 2 - 30);

        this.ctx.font = '16px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press SPACE to start", WIDTH / 2, HEIGHT / 2 +10);

        this.lvlButtons.forEach(b => b.render(this.ctx));
    }


    renderControlsScreen(){
        this.ctx.drawImage(
            data["menu-background-large"],
            0, 0, 32 * 3, 32 * 2,
            WIDTH / 2 - 160, HEIGHT / 2 - 100,
            320, 260
        );

        this.ctx.font = '400 32px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("CONTROLS", WIDTH / 2, HEIGHT / 2 - 50);

        this.ctx.font = '400 12px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("(You can use a controller too :) )", WIDTH / 2, HEIGHT / 2 - 37);

        this.ctx.drawImage(data["key-icon"], WIDTH / 2 - 100, HEIGHT / 2 - 20, 30, 30);
        this.ctx.drawImage(data["key-icon"], WIDTH / 2 - 70, HEIGHT / 2 - 20, 30, 30);
        this.ctx.font = '16px pixel-sans';
        this.ctx.fillText("←", WIDTH / 2 - 85, HEIGHT / 2);
        this.ctx.fillText("→", WIDTH / 2 - 55, HEIGHT / 2);
        this.ctx.fillText("Move left/right", WIDTH / 2 + 40, HEIGHT / 2);
        
        
        this.ctx.drawImage(data["key-icon"], WIDTH / 2 - 85, HEIGHT / 2 + 15, 30, 30);
        this.ctx.fillText("Q", WIDTH / 2 - 70, HEIGHT / 2 + 35);
        this.ctx.fillText("Special action", WIDTH / 2 + 40, HEIGHT / 2 + 35);

        this.ctx.drawImage(data["key-icon"], WIDTH / 2 - 85, HEIGHT / 2 + 50, 30, 30);
        this.ctx.fillText("S", WIDTH / 2 - 70, HEIGHT / 2 + 70);
        this.ctx.fillText("Mask swap", WIDTH / 2 + 40, HEIGHT / 2 + 70);


        this.ctx.drawImage(data["key-icon"], WIDTH / 2 - 105, HEIGHT / 2 + 85, 70, 30);
        this.ctx.fillText("SPACE", WIDTH / 2 - 70, HEIGHT / 2 + 105);
        this.ctx.fillText("Jump", WIDTH / 2 + 40, HEIGHT / 2 + 105);

        this.ctx.drawImage(data["key-icon"], WIDTH / 2 - 95, HEIGHT / 2 + 120, 50, 30);
        this.ctx.fillText("ESC", WIDTH / 2 - 70, HEIGHT / 2 + 140);
        this.ctx.fillText("Pause", WIDTH / 2 + 40, HEIGHT / 2 + 140);
    
        //this.homeButton.render(this.ctx);
    } 

    renderCreditsScreen(){
       this.ctx.drawImage(
            data["menu-button"],
            0, 0, 32 * 2, 32,
            WIDTH / 2 - 96, 50,
            196, 64
        );

        this.ctx.font = '400 32px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("CREDITS", WIDTH / 2, 95);

        this.ctx.drawImage(
            data["menu-background-large"],
            0, 0, 32 * 3, 32 * 2,
            WIDTH / 2 - 280, HEIGHT / 2 - 64,
            256, 160
        );

        this.ctx.font = '400 32px pixel-sans';
        this.ctx.fillStyle = "#6ea147";
        this.ctx.textAlign = "center";
        this.ctx.fillText("CODING", 160, HEIGHT / 2 - 18);

        this.ctx.fillStyle = "white";
        this.ctx.font = '18px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Frédéric DADEAU", 160, HEIGHT / 2 + 8);
        this.ctx.fillText("Dorine TABARY", 160, HEIGHT / 2 + 28);
        this.ctx.fillText("Anna GALLONE", 160, HEIGHT / 2 + 48);
        this.ctx.fillText("Tayeb HAKKAR", 160, HEIGHT / 2 + 68);
        this.ctx.fillText("Robin GRAPPE", 160, HEIGHT / 2 + 88);

        this.ctx.drawImage(
            data["menu-background-large"],
            0, 0, 32 * 3, 32 * 2,
            WIDTH / 2 + 20, HEIGHT / 2 - 64,
            256, 160
        );
        this.ctx.font = '400 32px pixel-sans';
        this.ctx.fillStyle = "#6ea147";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME ART", WIDTH / 2 + 150, HEIGHT / 2 - 18);

        this.ctx.fillStyle = "white";
        this.ctx.font = '18px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Marie-Almina GINDRE", WIDTH / 2 + 150, HEIGHT / 2 + 8);

       this.ctx.drawImage(
            data["menu-button"],
            0, 0, 32 * 2, 32,
            WIDTH / 2 - 128, HEIGHT - 80,
            256, 64
        );

        this.ctx.font = '22px pixel-sans';
        this.ctx.textAlign = "center";
        this.ctx.fillText("Thanks GGJ Besançon!", WIDTH / 2, HEIGHT - 35);
        
        //this.homeButton.render(this.ctx);
    }
}

const SELECTION_SPEED = 0.2;
class Button {
    constructor(text, x, y, width, height, padding){
        this.text = text;
        this.x = x;
        this.y = y;
        this.padding = padding;
        this.width = width;
        this.height = height;
        this.selected = false;
        this.underline = 0;
    }

    update(dt) {
        if (this.selected && this.underline < this.width / 3) {
            this.underline += SELECTION_SPEED * dt;
        }
        else if (!this.selected && this.underline > 0) {
            this.underline -= SELECTION_SPEED * dt;
        }
    }   

    isAt(x, y){
        return x >= this.x && x <= this.x + this.width + this.padding && y >=  this.y && y <= this.y + this.height + this.padding / 16;
    }

    render(ctx){
        ctx.verticalAlign = "middle";
        ctx.textAlign = "center";
        ctx.font = `${this.height/2}px pixel-sans`;
        ctx.fillStyle = "white";

        ctx.drawImage(data["menu-button-rock"], this.x, this.y, this.width + this.padding, this.height + this.padding / 16);
        ctx.fillText(this.text, this.x + 92, this.y + 45);
        if (this.underline > 0) {
            ctx.fillRect(this.x + 92 - this.underline / 2, this.y + 52, this.underline, 4);
        } 
    }
}

class HomeButton extends Button{
    constructor(x, y, width, height){
        super("", x, y, width, height, 30);
    }

    render(ctx){
        ctx.drawImage(data["home-icon"], this.x, this.y, this.width, this.height);
    }
}