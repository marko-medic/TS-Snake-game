interface ISnakeOptions {
  headColor: 'red' | 'orange' | 'yellow';
  tailColor: string;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IFood extends IDraw {
  points: number;
  position: IPosition;
}

export interface IFoodSettings {
  width: number;
  height: number;
  position: IPosition;
}
interface IDraw {
  draw(ctx?: CanvasRenderingContext2D): void;
}

export interface ISnake extends IDraw {
  tailColor: string;
  size: number;
  positions: IPosition[];
  newPosition: IPosition;
  move(move?: boolean): void;
  isCollied(): boolean;
  changeDirection(key: string): void;
  eat(foodPosition: IPosition): void;
}

export interface ISnakeDetails {
  snakeOptions: ISnakeOptions;
  gameOptions: {
    canvasWidth: number;
    canvasHeight: number;
    gridSize: number;
  };
}
