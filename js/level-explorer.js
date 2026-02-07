import { Level } from "./level.js";
import { LEVELS } from "./LEVELS.js";
import { preload } from "./preload.js";

document.addEventListener("DOMContentLoaded", function() {

    const BG = [];
    const SELECT = document.createElement("SELECT");

    preload(function(loaded,total) {
        if (loaded == total) {
            run();
        }
    })

    function run() {
        for (let i in LEVELS) {
            const option = document.createElement("OPTION");
            option.value = i;
            option.text = "Level " + i;
            SELECT.add(option);
            BG.push(drawImageOnBackground(Number(i)));
        };
        SELECT.style.position = "fixed";
        SELECT.style.top = "10px";
        SELECT.style.right = "10px";
        SELECT.addEventListener("change", update);
        document.body.appendChild(SELECT);
        update();
    }


    function update(e) {
        const cvs = document.getElementById("cvs");
        cvs.style.backgroundColor = "rgb(111,167,168)";
        const bg = BG[SELECT.value-1];
        const W = Number(bg.width), H = Number(bg.height);
        cvs.setAttribute("width", W);
        cvs.setAttribute("height", H);
        cvs.style.width = W + "px";
        cvs.style.height = H + "px";
        cvs.style.margin = "0";
        const ctx = cvs.getContext("2d");
        ctx.width = W;
        ctx.height = H;
        ctx.drawImage(bg, 0, 0, W, H, 0, 0, W, H);
    }


    function drawImageOnBackground(n) {
        const L = new Level(n);
        const W = L.background.width, H = L.background.height;
        const ctx = L.background.getContext("2d");
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        const size = L.size;
        ctx.font = "12px arial";
        for (let l=0; l < H; l += size) {
            for (let c=0; c < W; c += size) {
                ctx.strokeRect(c, H-l-size, size, size);
                ctx.fillText(`${Math.floor(l/size)},${Math.floor(c/size)}`, c + size/2, (H-l) - size/2);
            }
        }
        L.masks.forEach(m => m.render(ctx, 0, 0));
        L.breakables.forEach(b => b.render(ctx, 0, 0));
        L.enemies.forEach(e => {
            for (let i=0; i < 100; i++) { e.update(); }
            e.render(ctx, 0, 0);
        });

        ctx.strokeStyle = "red";
        ctx.moveTo(L.camera.x-size/2, L.camera.y + size/2);
        L.camera.cameraPath.forEach(p => {
            ctx.lineTo(p.x-size/2, p.y-size/2);
            ctx.stroke();
        });
        return L.background;
    }

})