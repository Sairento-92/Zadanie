import 'pixi.js';
import * as PlayerClass from '../class/player';
import * as FoodClass from '../class/food';
import * as Loaders from './loaders';
import * as InputManager from '../scripts/inputManager';
import * as TextManager from './textManager';
import * as SCRIPTS from './usableScripts';

export let app: PIXI.Application;
export let menuTicker: PIXI.ticker.Ticker;
export let gameTicker: PIXI.ticker.Ticker;
export let isPasue: boolean = true;
let score: number = 0;
let numberOfMiss: number = 0;

/** Ticks since the last food creation */
let lastFoodCreated: number = 0;

export function gameInit(): void {
  
  /** PIXI initialization */
  app = new PIXI.Application({backgroundColor: 0x999999});
  app.stop();
  document.body.appendChild(app.view);

  /** Menu/pause ticker initialization */
  menuTicker = new PIXI.ticker.Ticker();
  menuTicker.stop();
  menuTicker.add((delta) => {
    InputManager.checkPauseInput();
  });

  /** Game ticker initialization */
  gameTicker = new PIXI.ticker.Ticker();
  gameTicker.stop();
  gameTicker.add((delta) => {
    PlayerClass.player.OnTick(delta);
    FoodClass.onTick(delta);
    InputManager.checkGameInput();
    onGameTick(delta);
  });

  /** Texts initialization */
  TextManager.textInit();

  /** Assets initialization */
  Loaders.LoadAssets();

  
}

export function onAssetsLoad(): void
{
  /** Player character initialization */
  PlayerClass.playerInit();

  /** Food initialization */
  FoodClass.foodInit();

  /** Input initialization */
  InputManager.inputInit();

  app.start();

  resetGame();
}
/** Reset game to start */
function resetGame(){
  
  PlayerClass.player.reset();

  TextManager.startText.visible = true;

  gameTicker.stop();
  menuTicker.start();

}

/** Start game after press Space */
export function startGame(): void {
  score = 0;
  TextManager.changeScore(score);
  numberOfMiss = 0;
  TextManager.changeLives(10 - numberOfMiss);
  TextManager.startText.visible = false;
  FoodClass.clearFood();

  menuTicker.stop();
  gameTicker.start();
}

/**
* Game ticker
* @param delta Scalar time value from last frame to this frame. 
*/
function onGameTick(delta: number) {
  lastFoodCreated += 1;
  if (lastFoodCreated > 2 * 60) {
    FoodClass.createFood();
    lastFoodCreated = 0;
  }
}

/** Check if player lost the game */
function lostCheck() {
  if (numberOfMiss == 10) {
    resetGame();
  }
}

/**
* Check for player colision with food
* @param playerX Player X position. 
* @param playerY Player Y position. 
*/
export function checkCollisionWithFood(playerX: number, playerY: number): void {
  const playerWidth = 32 * PlayerClass.playerScale;
  const playerHeight = 70 * PlayerClass.playerScale;

  
  FoodClass.foodArray.forEach(element => {
    /** When the food is too low, remove it. */
    if (element.sprite.position.y > 620) {
      element.remove();
      numberOfMiss += 1;
      TextManager.changeLives(10 - numberOfMiss);
      lostCheck();
      return;
    }

    const foodWidth = 16 * FoodClass.foodScale;
    const foodHeight = 16 * FoodClass.foodScale;
    
    if (SCRIPTS.collisionDetection(SCRIPTS.createRectFromPoint(playerX, playerY - 35 * PlayerClass.playerScale, playerWidth, playerHeight), SCRIPTS.createRectFromPoint(element.sprite.position.x, element.sprite.position.y, foodWidth, foodHeight))) {
      score += element.points;
      TextManager.changeScore(score);
      element.remove();
    }
  });

}
export const GameManager = true;