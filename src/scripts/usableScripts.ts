export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloatInclusive(min: number, max: number): number {
  min = min;
  max = max;
  return Math.random() * (max - min + 1) + min;
}




export function createRectFromPoint(x: number, y: number, width: number, height: number): Rect {

  var rect: Rect = { x: x - width/2, y: y - height/2, w: width, h: height }  
  return rect;
}

export function collisionDetection(rect1: Rect, rect2: Rect): boolean {
  if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y) {
    /** collision detected! */
    return true;
  } else {
    /** no collision */
    return false;
  }
}

export function arrayRemoveAllInstances(arr: any[], item: any): void {
  for (var i = arr.length; i--;) {
    if (arr[i] === item) arr.splice(i, 1);
  }
}

export class Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const Scripts: boolean = true;