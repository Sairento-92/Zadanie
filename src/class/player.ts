import 'pixi.js';
import * as GameManager from '../scripts/gameManager';

export let player: Player;
export let playerScale: number = 0.8;
export function playerInit(): void {

  player = new Player("assets/knight.json", 6);
  player.container.scale.set(playerScale);
  GameManager.app.stage.addChild(player.container);
  player.reset();
}



class PlayerAnimation {
  idle: PIXI.extras.AnimatedSprite;
  runright: PIXI.extras.AnimatedSprite;
  runleft: PIXI.extras.AnimatedSprite;
  current: PIXI.extras.AnimatedSprite;
}
  
/**
 * Player class 
 * Constructor:
 * @param sheetName SpriteSheet resource eg. "assets/knight.json";
 * @param speed Set player speed;
 */
export class Player {
  animation: PlayerAnimation = new PlayerAnimation();
  container: PIXI.Container = new PIXI.Container();
  curSpeed: number = 0;
  speed = 5;
  /** 0 - idle, 1 - left, 2 - right */
  state: number = 0;
  constructor(sheetName: string, speed: number) {
    this.speed = speed;

    let sheet = PIXI.loader.resources[sheetName].spritesheet;
    this.animation.idle = new PIXI.extras.AnimatedSprite(sheet.animations["knight iso char_idle"]);
    /** Front animation is higher so set scale to 0.85 */
    this.animation.idle.scale.y = 0.85;
    this.animation.runright = new PIXI.extras.AnimatedSprite(sheet.animations["knight iso char_run right"]);
    this.animation.runleft = new PIXI.extras.AnimatedSprite(sheet.animations["knight iso char_run left"]);

    this.container.addChild(this.animation.idle, this.animation.runright, this.animation.runleft);

    this.resetAnimation(this.animation);
  }

  /** Reset player. */
  reset() {
    this.container.position.x = GameManager.app.renderer.width / 2;
    this.container.position.y = 550;
    this.setAnimation('idle');
  }

  /** Reset all player animation. */
  resetAnimation(animation: PlayerAnimation): void {
    for (const [key, value] of Object.entries(animation)) {
      value.visible = false;
      value.animationSpeed = 0.162;
    }
  
  }
  
  /**
  * Sets the animations as desired
  * @param state idle, left, right
  */
  setAnimation(state: string): void {
    switch (state) {
      case 'idle':
        this.resetAnimation(this.animation);
        this.animation.idle.play();
        this.animation.idle.visible = true;
        this.animation.current = this.animation.idle;
        break;
      case 'left':
        this.resetAnimation(this.animation);
        this.animation.runleft.play();
        this.animation.runleft.visible = true;
        this.animation.current = this.animation.runleft;
        break;
      case 'right':
        this.resetAnimation(this.animation);
        this.animation.runright.play();
        this.animation.runright.visible = true;
        this.animation.current = this.animation.runright;
        break;
    }
  
  }
  /**
  * On Game tick  (Change player animations and move player).
  * @param delta Scalar time value from last frame to this frame. 
  */
  OnTick(delta: number): void {
    if (this.curSpeed == 0) {
      if (this.state != 0) {
        this.state = 0;
        this.setAnimation('idle');
      }
    } else if (this.curSpeed < 0) {
      if (this.state != 1) {
        this.state = 1;
        this.setAnimation('left');
      }
    } else {
      if (this.state != 2) {
        this.state = 2;
        this.setAnimation('right');
      }
    }
    var wallStop = 1;
    if (this.curSpeed < 0) {
      if (this.container.position.x - 16 <= 14) {
        wallStop = 0;
      }
    } else {
      if (this.container.position.x + 20 >= GameManager.app.renderer.width) {
        wallStop = 0;
      }
    }
    this.container.position.x = this.container.position.x + (this.curSpeed * delta * wallStop);

    GameManager.checkCollisionWithFood(this.container.position.x, this.container.position.y);
  }
  /**
  * On Game Input 
  * @param direction Get direction 0 - idle, 1 - right, 2 - left
  */
  OnInput(direction: number) {
    this.curSpeed = direction * this.speed;
  }
}

export const PlayerClass: boolean = true;