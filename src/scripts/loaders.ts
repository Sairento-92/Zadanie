import 'pixi.js';
import { onAssetsLoad } from './gameManager';
/** Loads assets. */
export function LoadAssets(): void {
  PIXI.loader
    .add("assets/knight.json")
    .add("assets/food.json")
    .load(LoadComplete);
}

function LoadComplete(): void {
  onAssetsLoad();
}

export const LoadersClass: boolean = true;