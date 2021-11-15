import 'pixi.js';
import * as GameManager from './gameManager';

export let scoreText: PIXI.Text;
export let livesText: PIXI.Text;
export let startText: PIXI.Text;
/** Texts object initialization. */
export function textInit(): void {

  scoreText = createText("Score: 0", 10, 10);
  livesText = createText("Lives: 0", 10, 50);

  startText = createText("Press Space to play.", GameManager.app.renderer.width / 2, GameManager.app.renderer.height / 2);
  startText.anchor.x = 0.5;
  startText.anchor.y = 0.5;
  startText.style.fontSize = 50;
}

/**
* Return PIXI.Text() object.
* @param text Text of the object. 
* @param x Position x of text object. 
* @param y Position y of text object. 
*/
function createText(text: string, x: number, y: number): PIXI.Text {

  let Text = new PIXI.Text();
  Text.text = text;
  Text.position.x = x;
  Text.position.y = y;
  GameManager.app.stage.addChild(Text);

  return Text;
}

export function changeScore(score: number): void {
  scoreText.text = "Score: " + score;
}

export function changeLives(lives: number): void {
  livesText.text = "Lives: " + lives;
}

export const TextManager: boolean = true;