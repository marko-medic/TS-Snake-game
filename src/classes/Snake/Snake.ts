import { ISnake, IPosition, ISnakeDetails } from '../../shared/interfaces';
import { Key, Direction } from '../../shared/types';

export abstract class Snake implements ISnake {
  public positions: IPosition[] = [];
  public newPosition: IPosition = { x: 0, y: 0 };
  //@ts-ignore
  private _direction: Direction;
  constructor(protected snakeDetails: ISnakeDetails) {
    const { gridSize } = this.snakeDetails.gameOptions;
    this.positions.push({
      x: gridSize * 5,
      y: gridSize * 3
    });
  }

  set tailColor(newColor: string) {
    this.snakeDetails.snakeOptions.tailColor = newColor;
  }

  // snake size is equal as grid size
  get size() {
    return this.snakeDetails.gameOptions.gridSize;
  }

  abstract getNewPosition(): IPosition;

  move(eat: boolean = false) {
    const newHead = this.getNewPosition();

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

  changeDirection(key: Key) {
    switch (key) {
      case Key.UP:
        if (this._direction !== Direction.DOWN) {
          this._direction = Direction.UP;
          this.newPosition = { x: 0, y: -this.size };
        }
        break;
      case Key.DOWN:
        if (this._direction !== Direction.UP) {
          this._direction = Direction.DOWN;
          this.newPosition = { x: 0, y: this.size };
        }
        break;
      case Key.LEFT:
        if (this._direction !== Direction.RIGHT) {
          this._direction = Direction.LEFT;
          this.newPosition = { x: -this.size, y: 0 };
        }
        break;
      case Key.RIGHT:
        if (this._direction !== Direction.LEFT) {
          this._direction = Direction.RIGHT;
          this.newPosition = { x: this.size, y: 0 };
        }
    }
  }
  eat(foodPos: IPosition) {
    this.positions.push(foodPos);
    this.move(true);
  }
  draw(ctx: CanvasRenderingContext2D) {
    const { headColor, tailColor } = this.snakeDetails.snakeOptions;
    for (const [index, position] of this.positions.entries()) {
      ctx.fillStyle = index === 0 ? headColor : tailColor;
      ctx.fillRect(position.x, position.y, this.size, this.size);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(position.x, position.y, this.size, this.size);
    }
  }
}
