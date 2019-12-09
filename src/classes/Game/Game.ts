import { EventEmitter } from 'events';
import {
  ISnake,
  IGame,
  IFood,
  ISnakeDetails,
  IAppSettings
} from '../../shared/interfaces';
import { BorderedSnake } from '../Snake/BorderedSnake';
import { BorderFreeSnake } from '../Snake/BorderFreeSnake';
import { Food } from '../Food/Food';
import { INTERVAL_RATIO, BONUS_FOOD_RATIO } from '../../shared/constants';
import { getRandomPosition } from '../../shared/helpers';
import { Key } from '../../shared/types';

export class Game extends EventEmitter implements IGame {
  //@ts-ignore
  public snake: ISnake;
  //@ts-ignore
  public gridSize: number;
  //@ts-ignore
  public canvas: HTMLCanvasElement;
  //@ts-ignore
  public score: number;
  //@ts-ignore
  public food: IFood;
  //@ts-ignore
  public isPaused: boolean;
  private _interval: number = 0;

  constructor(public selector: string, public gameInfo: IAppSettings) {
    super();
    this.init();
  }

  get ctx() {
    return this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  get foodEatenCounter() {
    return this.snake.positions.length - 1;
  }

  get snakeSpeed() {
    return this.gameInfo.snakeSettings.speed;
  }

  set snakeSpeed(speed: number) {
    this.gameInfo.snakeSettings.speed = speed;
  }

  init() {
    const {
      verticalFields,
      canvasHeight,
      canvasWidth
    } = this.gameInfo.gameSettings;
    const { withWalls, headColor } = this.gameInfo.snakeSettings;
    this.isPaused = false;
    this.canvas = document.querySelector(this.selector) as HTMLCanvasElement;
    this._validateOptions();
    this.canvas.height = canvasHeight;
    this.canvas.width = canvasWidth;
    this.gridSize = canvasHeight / verticalFields;
    this.canvas.style.border = withWalls ? '1px solid red' : '1px solid green';

    const snakeDetails: ISnakeDetails = {
      snakeInfo: {
        headColor,
        tailColor: 'green'
      },
      gameInfo: {
        canvasHeight: canvasHeight,
        canvasWidth: canvasWidth,
        gridSize: this.gridSize
      }
    };
    this.snake = withWalls
      ? new BorderedSnake(snakeDetails)
      : new BorderFreeSnake(snakeDetails);
    this.score = 0;
    this.food = this._createNewFood();
    this._bindEvents();
  }

  pause() {
    clearInterval(this._interval);
  }

  start() {
    this.render();
    this.snake.draw(this.ctx);
  }

  render() {
    clearInterval(this._interval);
    this._interval = setInterval(() => {
      this.rePaint();
      this.snake.move();
      this.snake.draw(this.ctx);
      this.checkForEat();
      if (this.snake.isCollied()) {
        this._gameOver();
        return;
      }
    }, INTERVAL_RATIO - this.snakeSpeed);
  }

  rePaint() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._changeFoodPosition();
  }

  checkForEat() {
    const { x, y } = this.food.position;
    const snakeArray = this.snake.positions;
    if (snakeArray[0].x === x && snakeArray[0].y === y) {
      // if position are same -> eat and update score!
      this.snake.eat({ x, y });
      this.score += this.food.points;
      this.emit('score', this.score);
      this.food = this._createNewFood();
    }
  }

  private _createNewFood() {
    const { horizontalFields, verticalFields } = this.gameInfo.gameSettings;
    const foodOptions = {
      height: this.gridSize,
      width: this.gridSize,
      position: getRandomPosition(
        horizontalFields,
        verticalFields,
        this.gridSize
      )
    };
    const isTimeForBonus =
      this.foodEatenCounter % BONUS_FOOD_RATIO === 0 &&
      this.foodEatenCounter !== 0;
    return new Food(isTimeForBonus, this.ctx, foodOptions);
  }

  private _bindEvents() {
    window.addEventListener('keydown', event => {
      if (event.key === Key.DOWN || event.key === Key.UP) {
        event.preventDefault();
      }
      this.snake.changeDirection(event.key);
    });
  }

  private _changeFoodPosition() {
    // Check if food position is equal as snake position
    const isFoodInSnake = this.snake.positions.some(
      position =>
        position.x === this.food.position.x &&
        position.y === this.food.position.y
    );
    if (isFoodInSnake) {
      this.food = this._createNewFood();
      this._changeFoodPosition();
      return;
    }
    this.food.draw(this.ctx);
  }

  private _gameOver() {
    clearInterval(this._interval);
    this.rePaint();
    this.emit('over', this.score);
  }

  private _validateOptions() {
    const { speed } = this.gameInfo.snakeSettings;
    const { canvasWidth, canvasHeight } = this.gameInfo.gameSettings;
    if (speed <= 0 || speed > 100) {
      throw new Error('Invalid snake speed');
    }
    if (
      canvasHeight < 10 ||
      canvasHeight > 1000 ||
      canvasWidth < 10 ||
      canvasWidth > 1000
    ) {
      throw new Error('Invalid canvas dimensions');
    }
    if (!this.canvas) {
      throw new Error('Canvas selector is not valid');
    }
  }
}
