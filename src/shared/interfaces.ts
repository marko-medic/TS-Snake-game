import { EventEmitter } from 'events';

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

export interface ISnakeSettings extends ISnakeOptions {
  speed: number;
  withWalls: boolean;
}

interface IGameSettings {
  canvasHeight: number;
  canvasWidth: number;
  horizontalFields: number;
  verticalFields: number;
}

export interface IAppSettings {
  gameSettings: IGameSettings;
  snakeSettings: ISnakeSettings;
}

export interface IGame extends EventEmitter {
  selector: string;
  gridSize: number;
  gameOptions: IAppSettings;
  snake: ISnake;
  food: IFood;
  ctx: CanvasRenderingContext2D;
  score: number;
  snakeSpeed: number;
  canvas: HTMLCanvasElement;
  isPaused: boolean;
  init(): void;
  render(): void;
  start(): void;
  pause(): void;
}
