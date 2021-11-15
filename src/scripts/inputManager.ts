import * as PlayerClass from '../class/player';
import * as GameManager from './gameManager';

export function inputInit() {
  window.onkeyup = function (e) { pressedKeys[e.keyCode] = false; }
  window.onkeydown = function (e) { pressedKeys[e.keyCode] = true; }
}

export var pressedKeys: boolean[] = [];

/**
 * Checking input during the game.
 * 39 - Right Arrow    68 - D
 * 37 - Left Arrow     65 - A
 */
export function checkGameInput(): void {
  var state: number = 0;
  if (pressedKeys[39] || pressedKeys[68]) {
    /** Right; */
    state = 1;
  }

  if (pressedKeys[37] || pressedKeys[65]) {
    /** Left; */
    if (state == 0)
      state = -1;
    else
      state = 0;
  }

  PlayerClass.player.OnInput(state);
}

/** Checking input on a menu. */
export function checkPauseInput() {
  if (pressedKeys[32]) {
    GameManager.startGame();
  }
}

export const InpoutManager: boolean = true;