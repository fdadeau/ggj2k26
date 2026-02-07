import { Level } from "./level.js";

import { audio } from "./audio.js";

const START_LEVEL = 1;

export class Game {
    constructor() {
        this.nLevel = START_LEVEL;
    }

    reset() {
        this.level = new Level(this.nLevel);
        audio.playMusic("music1", 0.7);
    }

    changeLevel(levelId) {
        this.nLevel = levelId;
        this.level = new Level(this.nLevel);
    }

    update(dt, keys) {
        this.level.update(dt, keys);
    }

    render(ctx) {
        this.level.render(ctx)
    }
}