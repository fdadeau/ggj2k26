import { HEIGHT, WIDTH } from "./main.js";

const AXE_TRESHOLD = 0.5;

/**
 * Utilitary class that manage gamepad controls and setup
 */
export class GamepadHandler {
  /**
   * Creates an instance of GamepadHandler
   * @param {HTMLCanvasElement} cvs
   */
  constructor(cvs) {
    /** @property {{JUMP: number; SPECIAL: number; MASK_SWITCH: number;}} buttonIndexMapping Record linking action to corresponding button index */
    this.buttonIndexMapping = {
      JUMP: 1, // Default values for the gamepad we have
      SPECIAL: 0,
      MASK_SWITCH: 3,
    };

    /** @property {{JUMP: string; SPECIAL: string; MASK_SWITCH: string;}} buttonIndexMapping Record linking action to corresponding label text*/
    this.actionLabels = {
      JUMP: "jump",
      SPECIAL: "use a mask capacity",
      MASK_SWITCH: "swap masks",
    }

    /** @property {number} selectedAxeIndex Selected controler's directional axe index */
    this.selectedAxeIndex = 0; // Default values for the gamepad we have

    /** @property {HTMLCanvasElement} cvs */
    this.cvs = cvs;

    /** @property {CanvasRenderingContext2D} ctx */
    this.ctx = cvs.getContext("2d");

    /** @property {boolean} isCalibrating Indicate if the manual calibration is in progress or not */
    this.isCalibrating = false;
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

    this.isCalibrating = true;

    for (const action of actions) {
      this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
      this.renderStep(`Press the button to: ${this.actionLabels[action]}`);

      const pressedButtonIndex = await waitForButtonPress();
      this.buttonIndexMapping[action] = pressedButtonIndex;

      this.renderStep(`Release button...`);
      await waitForButtonRelease(pressedButtonIndex);
    }

    this.renderStep(`Move the joystick you want to use...`);
    const axesRestState = gamepad.axes.map((axe) => axe);
    const axeMovedIndex = await waitForAxeMovement(axesRestState);
    this.selectedAxeIndex = axeMovedIndex;

    this.isCalibrating = false;
  }

  renderStep(action){
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.ctx.fillStyle = "black"
    this.ctx.textAlign = "center";
    this.ctx.font = '400 32px pixel-sans';
    this.ctx.fillText("Controller Detected", WIDTH / 2, HEIGHT / 2 - 30);
    this.ctx.font = '400 24px pixel-sans';
    this.ctx.fillText("Let's configure it!", WIDTH / 2, HEIGHT / 2 + 0);
    this.ctx.fillText(action, WIDTH / 2, HEIGHT / 2 + 50);
  }

  /**
   * Getter for the gamepad buttons states
   * @param {Gamepad} gamepad
   * @returns {{pressedButtons: ("JUMP" | "SPECIAL" | "MASK_SWITCH")[]; notPressedButton: ("JUMP" | "SPECIAL" | "MASK_SWITCH")[]}} Lists pressed and not pressed buttons
   */
  getButtonState(gamepad) {
    const pressedButtons = [];
    const notPressedButtons = [];

    for (const [action, index] of Object.entries(this.buttonIndexMapping)) {
      if (gamepad.buttons[index]?.pressed) {
        pressedButtons.push(action);
      }else{
        notPressedButtons.push(action)
      }
    }

    return {
      pressedButtons,
      notPressedButtons,
    };
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
 * @returns The first available gamepad, null if no gamepad is available
 */
export function getGamepadFromNavigator() {
  const gamepadList = navigator
    .getGamepads()
    .filter((gamepad) => gamepad !== null);

  return gamepadList[0] ?? null;
};
