import { EventEmitter } from 'events';

interface ISnakeInfo {
  headColor: 'red' | 'orange' | 'yellow';
  tailColor: string;
}

export interface IApp {
  game: IGame;
  menu: IMenu;
  modal: IModal;
  appSettings: IAppSettings;
  start(): void;
  bestScore: HTMLElement;
  currentScore: HTMLElement;
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
  snakeInfo: ISnakeInfo;
  gameInfo: {
    canvasWidth: number;
    canvasHeight: number;
    gridSize: number;
  };
}

export interface ISnakeSettings extends ISnakeInfo {
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
  gameInfo: IAppSettings;
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

export interface IMenu extends EventEmitter {
  selector: string;
  settings: IMenuSettings;
  init(): void;
}

export interface IMenuSettings extends ISnakeSettings {
  isPaused: boolean;
}

export interface IModal {
  selector: string;
  show(): void;
  hide(): void;
  setMessage(title: string, message: string): void;
}
