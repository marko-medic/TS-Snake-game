import { ISnake, IPosition, ISnakeDetails } from '../../shared/interfaces';
import { Direction, Key } from '../../shared/types';
import { BORDER_COLOR } from '../../shared/constants';

export abstract class Snake implements ISnake {
  public positions: IPosition[] = [];
  public newPosition: IPosition = { x: 0, y: 0 };
  // @ts-ignore
  public direction: Direction;
  constructor(protected snakeDetails: ISnakeDetails) {
    const { gridSize } = this.snakeDetails.gameInfo;
    this.positions.push({
      x: gridSize * 5,
      y: gridSize * 3
    });
  }

  set tailColor(newColor: string) {
    this.snakeDetails.snakeInfo.tailColor = newColor;
  }

  // snake size is equal as grid size
  get size() {
    return this.snakeDetails.gameInfo.gridSize;
  }

  abstract getNewPosition(): IPosition;

  move(eat: boolean = false) {
    let newHead = this.getNewPosition();

    this.positions.pop();
    if (eat) {
      this.positions.push(newHead);
    } else {
      this.positions.unshift(newHead);
    }
  }

  isCollied() {
    for (let index = 1; index < this.positions.length; index++) {
      const position = this.positions[index];

      if (
        this.positions[0].x === position.x &&
        this.positions[0].y === position.y
      ) {
        return true;
      }
    }

    return false;
  }

  changeDirection(key: string) {
    switch (key) {
      case Key.UP:
        if (this.direction !== Direction.DOWN) {
          this.direction = Direction.UP;
          this.newPosition = { x: 0, y: -this.size };
        }
        break;
      case Key.DOWN:
        if (this.direction !== Direction.UP) {
          this.direction = Direction.DOWN;
          this.newPosition = { x: 0, y: this.size };
        }
        break;
      case Key.LEFT:
        if (this.direction !== Direction.RIGHT) {
          this.direction = Direction.LEFT;
          this.newPosition = { x: -this.size, y: 0 };
        }
        break;
      case Key.RIGHT:
        if (this.direction !== Direction.LEFT) {
          this.direction = Direction.RIGHT;
          this.newPosition = { x: this.size, y: 0 };
        }
        break;
    }
  }

  eat(foodPos: IPosition) {
    this.positions.push(foodPos);
    this.move(true);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { headColor, tailColor } = this.snakeDetails.snakeInfo;
    for (const [index, position] of this.positions.entries()) {
      ctx.fillStyle = index === 0 ? headColor : tailColor;
      ctx.fillRect(position.x, position.y, this.size, this.size);
      ctx.strokeStyle = BORDER_COLOR;
      ctx.strokeRect(position.x, position.y, this.size, this.size);
    }
  }
}
