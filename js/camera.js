
import { WIDTH, HEIGHT } from "./level.js";

const CAMERA_SPEED = 0.4;

const EPSILON = 2;

export class Camera {

    constructor(camStart, camPath) {
        this.x = camStart.x;
        this.y = camStart.y;
        this.speed = 0;
        this.cameraPath = camPath;
    }

    update(dt) {
        if (this.cameraPath.length == 0) return;
        const target = this.cameraPath[0];
        this.speed = target.speed;
        this.cameraDirection = { 
            x: target.x-this.x, 
            y: target.y-this.y 
        };
        const cameraDirection = this.cameraDirection;
        this.normalCameraDirection = {
            x: cameraDirection.x / Math.sqrt(cameraDirection.x*cameraDirection.x + cameraDirection.y*cameraDirection.y),
            y: cameraDirection.y / Math.sqrt(cameraDirection.x*cameraDirection.x + cameraDirection.y*cameraDirection.y)
        };
        //alert(JSON.stringify(target)+JSON.stringify(cameraDirection)+JSON.stringify(normalCameraDirection));
        this.x += this.normalCameraDirection.x * CAMERA_SPEED * this.speed * dt;
        this.y += this.normalCameraDirection.y * CAMERA_SPEED * this.speed * dt;
        if (Math.abs(this.x - target.x) < EPSILON && Math.abs(this.y - target.y) < EPSILON) {
            this.cameraPath.shift();
        }
    }

    playerOutOfBounds(player) {
        const horizontalGrace = player.width * 2;
        const verticalGrace = player.height * 2;

        const camLeft = this.x - WIDTH / 2;
        const camRight = this.x + WIDTH / 2;
        const camTop = this.y - HEIGHT / 2;
        const camBottom = this.y + HEIGHT / 2;

        if (this.speed > 0 && player.x < (camLeft - horizontalGrace)) {
            return true;
        }

        if (this.speed < 0 && player.x > (camRight + horizontalGrace)) {
            return true;
        }

        if (player.y > (camBottom + verticalGrace) || player.y < (camTop - verticalGrace)) {
            return true;
        }

        return false;
    }
}