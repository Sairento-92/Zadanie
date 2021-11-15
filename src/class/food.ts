import 'pixi.js';
import * as GameManager from '../scripts/gameManager';
import * as SCRIPTS from '../scripts/usableScripts';

export let foodContainer: PIXI.Container;
export function foodInit(): void {
  foodContainer = new PIXI.Container;
  GameManager.app.stage.addChild(foodContainer);
  sheetFood = PIXI.loader.resources["assets/food.json"].spritesheet;
  foodArray = [];
}

let sheetFood: PIXI.Spritesheet;
export let foodArray: Food[];
export function createFood(): void {
  let randSpriteNumber: number = SCRIPTS.getRandomIntInclusive(0, 63);
  let randSpeed: number = SCRIPTS.getRandomFloatInclusive(0.5, 0.8);
  let randPosX: number = SCRIPTS.getRandomIntInclusive((8 * 1.5), GameManager.app.renderer.width - (8 * 1.5));
  let food: Food = new Food(randSpriteNumber,randSpeed,randPosX,-20);
}

export function onTick(delta: number) {
  foodArray.forEach((item) => {
    item.sprite.position.y += item.speed * delta;

  })
}

export function clearFood() {
  foodArray.forEach(element => {
    element.remove(false);
  });
  foodArray = [];
}

export const foodScale: number = 1.5;

/**
 * Food class 
 * Constructor:
 * @param spriteNumber Number of sprite from spritesheet;
 * @param setSpeed Food speed;
 * @param posX Position X;
 * @param posY Position Y;
 */
export class Food {
  speed: number;
  points: number;
  sprite: PIXI.Sprite;
  constructor(spriteNumber: number, setSpeed: number, posX: number, posY: number) {
    this.speed = setSpeed;
    this.points = 10 * spriteNumber;
    var spriteName = `Food-${spriteNumber}.png`;
    this.sprite = new PIXI.Sprite(sheetFood.textures[spriteName]);
    this.sprite.x = posX;
    this.sprite.y = posY;

    foodContainer.addChild(this.sprite);
    this.sprite.scale.set(foodScale, foodScale);

    foodArray.push(this);
  }

  /**
 * Remove Food object
 * @param withArray Remove it from the foodArray too?;
 */
  remove(withArray: boolean = true) {

    this.sprite.destroy();
    if(withArray)
      SCRIPTS.arrayRemoveAllInstances(foodArray, this);
  }
}

export const FoodClass: boolean = true;