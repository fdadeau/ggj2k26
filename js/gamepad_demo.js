import { GamepadHandler, getGamepadFromNavigator } from "./gamepad.js";

document.addEventListener("DOMContentLoaded", () => {
  const keyPressContainer = document.getElementById("keyPressed");
  const controllerInfoContainer = document.getElementById("controllerInfo");
  let start = null;
  let gamepadHandler = null;

  const gameLoop = () => {
    const gamepad = getGamepadFromNavigator();

    const axeTouched = gamepadHandler.getAxeOrientationAndIntensity(gamepad);
    const buttonPressedList = gamepadHandler.getButtonPressed(gamepad);

    let keyInfo =
      axeTouched !== null
        ? `<strong>${axeTouched.direction} (${axeTouched.intensity})</strong>`
        : "";
    keyInfo +=
      buttonPressedList.length > 0
        ? buttonPressedList
            .map((action) => `<strong>${action}</strong>`)
            .join("")
        : "";

    keyPressContainer.innerHTML = keyInfo;

    start = requestAnimationFrame(gameLoop);
  };

  window.addEventListener("gamepadconnected", async () => {
    const gamepad = getGamepadFromNavigator();

    controllerInfoContainer.innerHTML = `
        <ul>
            <li><strong>Name:</strong> ${gamepad.id}</li>
            <li><strong>Number of buttons:</strong> ${gamepad.buttons.length}</li>
            <li><strong>Number of axes:</strong> ${gamepad.axes.length}</li>
        </ul>
    `;

    gamepadHandler = new GamepadHandler();

    await gamepadHandler.startCalibration();

    gameLoop();
  });

  window.addEventListener("gamepaddisconnected", () => {
    gamepadHandler = null;
    controllerInfoContainer.innerHTML = `
        <p>
            <strong>Controller disconnected</strong>
        </p>
    `;
    cancelAnimationFrame(start);
  });
});
