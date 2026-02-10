"use strict";

import { GamepadHandler, getGamepadFromNavigator } from "./gamepad.js";
import { GUI } from "./gui.js";
import { preload } from "./preload.js";
import { WIDTH, HEIGHT } from "./level.js";

document.addEventListener("DOMContentLoaded", function(_e) {
    const cvs = document.getElementById("cvs");
    cvs.width = WIDTH;
    cvs.height = HEIGHT;

    const gamepadHandler = new GamepadHandler(cvs)
    const gui = new GUI(cvs, gamepadHandler);
    let gamepadConnected = false;

    preload(function(loaded, total) {
        gui.loading(loaded, total);    
    });

    // last update 
    let lastU = Date.now();

    // main game loop
    function loop() {
        requestAnimationFrame(loop);
        let now = Date.now();
        if(!gamepadHandler.isCalibrating){
            gui.update(now - lastU);
            gui.render();
        }
        lastU = now;
    }
    loop();


    /** Events capture **/
    document.addEventListener("keydown", function(evt) {
        //evt.preventDefault();
        gui.pressKey(evt.code);
    });

    document.addEventListener("keyup", function(evt) {
        //evt.preventDefault();
        gui.releaseKey(evt.code);
    });

    cvs.addEventListener("dblclick", function(_e) {
        this.requestFullscreen();
    });

    cvs.addEventListener("click", (event) => {
        const rect = cvs.getBoundingClientRect();
        const x = (event.clientX - rect.left) * (WIDTH / rect.width) | 0; 
        const y = (event.clientY - rect.top) * (HEIGHT / rect.height) | 0;
        gui.click(x, y);
    });

    window.addEventListener("gamepadconnected", async () => {
        if(gamepadConnected){
            return;
        }

        if(gui.isPlaying()){
            gui.pause()
        }

        await gamepadHandler.startCalibration(cvs);
    });

    window.addEventListener("gamepaddisconnected", () => {
        gamepadConnected = false;
        gamepadHandler.isCalibrating = false;
    });
});