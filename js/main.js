"use strict";

import { Game } from "./game.js";
import { GamepadHandler, getGamepadFromNavigator } from "./gamepad.js";
import { preload } from "./preload.js";

export const WIDTH = 640;
export const HEIGHT = WIDTH * 10 / 16;

document.addEventListener("DOMContentLoaded", function(_e) {

    const cvs = document.getElementById("cvs");
    cvs.width = WIDTH;
    cvs.height = HEIGHT;

    const gamepadHandler = new GamepadHandler(cvs)
    const game = new Game(cvs, gamepadHandler);
    let gamepadConnected = false;

    preload(function(loaded, total) {
        game.loading(loaded, total);    
    });

    // last update 
    let lastU = Date.now();

    // main game loop
    function loop() {
        requestAnimationFrame(loop);
        let now = Date.now();
        if(!gamepadHandler.isCalibrating){
            game.update(now - lastU);
            game.render();
        }
        lastU = now;
    }
    loop();


    /** Events capture **/
    document.addEventListener("keydown", function(evt) {
        game.pressKey(evt.code);
    });

    document.addEventListener("keyup", function(evt) {
        game.releaseKey(evt.code);
    });

    cvs.addEventListener("dblclick", function(_e) {
        this.requestFullscreen();
    });

    window.addEventListener("gamepadconnected", async () => {
        if(gamepadConnected){
            return;
        }

        if(game.isPlaying()){
            game.pause()
        }

        await gamepadHandler.startCalibration(cvs);
    });

    window.addEventListener("gamepaddisconnected", () => {
        gamepadConnected = false;
        gamepadHandler.isCalibrating = false;
    });
});