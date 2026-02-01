/** Data to preload */
const data = {
    
    // spritesheets
    "perso": "./assets/sprites/test.png",
    
    "normal-stillR": "./assets/sprites/limask/normal/still_r_1.png",
    "normal-stillL": "./assets/sprites/limask/normal/still_l_1.png",
    "normal-runR": "./assets/sprites/limask/normal/run/right/spritesheet.png",
    "normal-runL": "./assets/sprites/limask/normal/run/left/spritesheet.png",
    "normal-jumpR": "./assets/sprites/limask/normal/jump/right/spritesheet.png",
    "normal-jumpL": "./assets/sprites/limask/normal/jump/left/spritesheet.png",

    "bird-stillR": "./assets/sprites/limask/bird/still_r_1.png",
    "bird-stillL": "./assets/sprites/limask/bird/still_l_1.png",
    "bird-runR": "./assets/sprites/limask/bird/run/right/spritesheet.png",
    "bird-runL": "./assets/sprites/limask/bird/run/left/spritesheet.png",
    "bird-jumpR": "./assets/sprites/limask/bird/jump/right/spritesheet.png",
    "bird-jumpL": "./assets/sprites/limask/bird/jump/left/spritesheet.png",
    
    "ninja-stillR": "./assets/sprites/limask/ninja/still_r_1.png",
    "ninja-stillL": "./assets/sprites/limask/ninja/still_l_1.png",
    "ninja-runR": "./assets/sprites/limask/ninja/run/right/spritesheet.png",
    "ninja-runL": "./assets/sprites/limask/ninja/run/left/spritesheet.png",
    "ninja-jumpR": "./assets/sprites/limask/ninja/jump/right/spritesheet.png",
    "ninja-jumpL": "./assets/sprites/limask/ninja/jump/left/spritesheet.png",

    "wrestler-stillR": "./assets/sprites/limask/catch/still_r_1.png",
    "wrestler-stillL": "./assets/sprites/limask/catch/still_l_1.png",
    "wrestler-runR": "./assets/sprites/limask/catch/run/right/spritesheet.png",
    "wrestler-runL": "./assets/sprites/limask/catch/run/left/spritesheet.png",
    "wrestler-jumpR": "./assets/sprites/limask/catch/jump/right/spritesheet.png",
    "wrestler-jumpL": "./assets/sprites/limask/catch/jump/left/spritesheet.png",
    
    // images
    "mask-bird": "./assets/sprites/masks/bird.png",
    "mask-wrestler": "./assets/sprites/masks/catch.png",
    "mask-ninja": "./assets/sprites/masks/ninja.png",

    "frame-bird": "./assets/sprites/frames/bird_frame.png",
    "frame-wrestler": "./assets/sprites/frames/catch_frame.png",
    "frame-ninja": "./assets/sprites/frames/ninja_frame.png",
    "frame-normal": "./assets/sprites/frames/empty_frame.png",

    // musics
    
    // Sounds
    "fx-bird": "./assets/sounds/fx-bird.mp3",
    "fx-ninja": "./assets/sounds/fx-ninja.mp3",
    "fx-wrestler": "./assets/sounds/fx-wrestler.mp3",

    //briques
    "bloc1": "./assets/sprites/blocks/dirt/1.png", 
    "bloc2": "./assets/sprites/blocks/dirt/2.png", 
    "bloc3": "./assets/sprites/blocks/dirt/3.png",
    "bloc4": "./assets/sprites/blocks/dirt/4.png", 
    "bloc5": "./assets/sprites/blocks/dirt/5.png", 
    "bloc6": "./assets/sprites/blocks/dirt/6.png", 
    "bloc7": "./assets/sprites/blocks/dirt/7.png", 
    "bloc8": "./assets/sprites/blocks/dirt/8.png", 
    "bloc9": "./assets/sprites/blocks/dirt/9.png", 
    "bloc10": "./assets/sprites/blocks/dirt/10.png",
    "bloc11": "./assets/sprites/blocks/dirt/11.png", 
    "bloc12": "./assets/sprites/blocks/dirt/12.png",
    "bloc13": "./assets/sprites/blocks/dirt/13.png",
    "bloc14": "./assets/sprites/blocks/dirt/14.png"
}

/***
 * Preload of resource files (images/sounds) 
 */
async function preload(callback) {
    let loaded = 0;
    const total = Object.keys(data).length;
    for (let i in data) {
        if (data[i].endsWith(".png") || data[i].endsWith(".jpg") || data[i].endsWith(".jpeg")) {
            data[i] = await loadImage(data[i]);
        }
        else {
            data[i] = await loadSound(data[i]);
        }
        loaded++;
        callback(loaded, total);
    }
}

function loadImage(path) {
    return new Promise(function(resolve, reject) {
        let img = new Image();
        img.onload = function() {
            resolve(this);
        }
        img.onerror = function() {
            reject(this);
        }
        img.src = path;
    });
}

function loadSound(path) {
    return new Promise(function(resolve, reject) {
        let audio = new Audio();
        audio.oncanplaythrough = function() {
            resolve(this);
        }
        audio.onerror = function() {
            reject(this);
        }
        audio.src = path;
    });    
}

export { preload, data };