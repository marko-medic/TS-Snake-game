import { ISnake } from '../../shared/interfaces';
import { Snake } from './Snake';

export class BorderFreeSnake extends Snake implements ISnake {
  getNewPosition() {
    const {
      canvasHeight,
      canvasWidth,
      gridSize
    } = this.snakeDetails.gameOptions;
    const maxX = canvasWidth - gridSize;
    const maxY = canvasHeight - gridSize;
    const { x: oldX, y: oldY } = this.positions[0];
    const { x: newX, y: newY } = this.newPosition;

    const newHead = {
      x: oldX + newX,
      y: oldY + newY
    };
    if (newHead.x < 0) {
      newHead.x = maxX;
    }
    if (newHead.x > maxX) {
      newHead.x = 0;
    }
    if (newHead.y < 0) {
      newHead.y = maxY;
    }
    if (newHead.y > maxY) {
      newHead.y = 0;
    }
    return newHead;
  }
}
