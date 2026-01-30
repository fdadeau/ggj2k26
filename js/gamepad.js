const AXE_TRESHOLD = 0.5;

/**
 * Utilitary class that manage gamepad controls and setup
 */
export class GamepadHandler {
  constructor() {
    /** @property {{JUMP: number; SPECIAL: number; MASK_SWITCH: number;}} buttonIndexMapping Record linking action to corresponding button index */
    this.buttonIndexMapping = {
      JUMP: 1, // Default values for the gamepad we have
      SPECIAL: 0,
      MASK_SWITCH: 3,
    };

    /** @property {number} selectedAxeIndex Selected controler's directional axe index */
    this.selectedAxeIndex = 0; // Default values for the gamepad we have

    /** @property {HTMLHTMLElement | null} calibrationInstructionContainer Container of the manual keybinding instruction shown to the user */
    this.calibrationInstructionContainer = document.getElementById(
      "calibrationInstruction",
    );
  }

  /**
   * Used to allow the user to choose which button/axe he want to bind to each actions
   */
  async startCalibration() {
    const gamepad = getGamepadFromNavigator();
    const actions = Object.keys(this.buttonIndexMapping);

    const waitForAxeMovement = (axesRestState) => {
      return new Promise((resolve) => {
        function poll() {
          const gamepad = getGamepadFromNavigator();

          if (gamepad) {
            for (const index in gamepad.axes) {
              const diff = gamepad.axes[index] - axesRestState[index];

              if (Math.abs(diff) >= 0.7) {
                return resolve(index);
              }
            }
          }
          requestAnimationFrame(poll);
        }
        poll();
      });
    };

    const waitForButtonPress = () => {
      return new Promise((resolve) => {
        function poll() {
          const gamepad = getGamepadFromNavigator();

          if (gamepad) {
            for (const index in gamepad.buttons) {
              if (gamepad.buttons[index].pressed) {
                return resolve(index);
              }
            }
          }
          requestAnimationFrame(poll);
        }
        poll();
      });
    };

    const waitForButtonRelease = (index) => {
      return new Promise((resolve) => {
        function poll() {
          const gamepad = getGamepadFromNavigator();

          if (gamepad && !gamepad.buttons[index].pressed) {
            return resolve();
          }
          requestAnimationFrame(poll);
        }
        poll();
      });
    };

    for (const action of actions) {
      this.calibrationInstructionContainer.innerHTML = `Press the button for: ${action}`;

      const pressedButtonIndex = await waitForButtonPress();
      this.buttonIndexMapping[action] = pressedButtonIndex;

      this.calibrationInstructionContainer.innerHTML = `Release button...`;
      await waitForButtonRelease(pressedButtonIndex);
    }

    this.calibrationInstructionContainer.innerHTML = `Move the axe you want to use to move your character...`;
    const axesRestState = gamepad.axes.map((axe) => axe);
    const axeMovedIndex = await waitForAxeMovement(axesRestState);
    this.selectedAxeIndex = axeMovedIndex;

    this.calibrationInstructionContainer.innerHTML = ``;
  }

  /**
   * Getter for the ongoing actions
   * @param {Gamepad} gamepad
   * @returns {("JUMP" | "SPECIAL" | "MASK_SWITCH")[]} List of the ongoing actions
   */
  getButtonPressed(gamepad) {
    const buttonPressedList = [];

    for (const [action, index] of Object.entries(this.buttonIndexMapping)) {
      if (gamepad.buttons[index]?.pressed) {
        buttonPressedList.push(action);
      }
    }

    return buttonPressedList;
  }

  /**
   * Getter for the ongoing axe movement
   * @param {Gamepad} gamepad
   * @returns {{direction: "RIGHT" | "LEFT"; intensity: number;} | null} Ongoing axe movement with its intensity
   */
  getAxeOrientationAndIntensity(gamepad) {
    const intensity = gamepad.axes[this.selectedAxeIndex].toFixed(2);
    if (intensity > AXE_TRESHOLD) {
      return {
        direction: "RIGHT",
        intensity,
      };
    }

    if (intensity < -AXE_TRESHOLD) {
      return {
        direction: "LEFT",
        intensity,
      };
    }

    return null;
  }
}

/**
 * Get the connected gamepad from the navitor state
 * @returns The available gamepad, throws otherwise
 */
export const getGamepadFromNavigator = () => {
  const gamepadList = navigator
    .getGamepads()
    .filter((gamepad) => gamepad !== null);

  if (gamepadList.length > 1) {
    throw new Error("Multiple gamepad is not supported...");
  }

  if (!gamepadList[0]) {
    throw new Error("No gamepad is available...");
  }

  return gamepadList[0];
};
