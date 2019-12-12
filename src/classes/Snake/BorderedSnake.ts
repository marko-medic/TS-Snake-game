import { ISnake, IPosition } from '../../shared/interfaces';
import { Snake } from './Snake';

export class BorderedSnake extends Snake implements ISnake {
  isCollied() {
    return super.isCollied() || this._borderCollision();
  }

  getNewPosition() {
    const { x: oldX, y: oldY } = this.positions[0];
    const { x: newX, y: newY } = this.newPosition;

    const newHead = {
      x: oldX + newX,
      y: oldY + newY
    };
    return newHead;
  }

  private _borderCollision() {
    const { canvasHeight, canvasWidth, gridSize } = this.snakeDetails.gameInfo;
    return (
      this.positions[0].y < 0 ||
      this.positions[0].y > canvasHeight - gridSize ||
      this.positions[0].x < 0 ||
      this.positions[0].x > canvasWidth - gridSize
    );
  }
}
