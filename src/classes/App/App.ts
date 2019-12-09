//@ts-ignore
import clone from 'deepclonejs';
import {
  IGame,
  IAppSettings,
  IApp,
  IModal,
  IMenu
} from '../../shared/interfaces';
import { Menu } from '../Menu/Menu';
import { Game } from '../Game/Game';
import { Modal } from '../Modal/Modal';

export class App implements IApp {
  public game: IGame;
  public menu: IMenu;
  public modal: IModal;
  public bestScore = document.querySelector('#bestScore') as HTMLElement;
  public currentScore = document.querySelector('#score') as HTMLSpanElement;
  private _initialSettings: IAppSettings;
  private _scoreList: number[] = [];

  constructor(public appSettings: IAppSettings) {
    this.game = new Game('#game', this.appSettings);
    this.menu = new Menu('#menu', {
      ...this.appSettings.snakeSettings,
      isPaused: this.game.isPaused
    });
    this.modal = new Modal('#modal');
    this._bindEvents();
    this._initialSettings = clone(this.appSettings);
  }
  start() {
    this.game.start();
  }

  private _newGame(withWalls: boolean) {
    this.appSettings = clone(this._initialSettings);
    this.appSettings.snakeSettings.withWalls = withWalls;
    this.game.gameInfo = this.appSettings;
    this.menu.settings = {
      ...this.appSettings.snakeSettings,
      withWalls,
      isPaused: this.game.isPaused
    };
    this.currentScore.innerHTML = '0';
    this.game.init();
    this.menu.init();
    this.start();
  }

  private _bindEvents() {
    this.game.on('score', score => (this.currentScore.innerHTML = score));
    this.menu.on(
      'colorChange',
      (color: string) => (this.game.snake.tailColor = color)
    );
    this.game.on('over', (score: number) => {
      this._scoreList.push(score);
      const bestScore = Math.max(...this._scoreList);
      this.bestScore.innerHTML = bestScore.toString();
      this.modal.setMessage(
        'Game over!',
        `Your score is ${score} ${
          score === bestScore && score !== 0 ? ' - NEW BEST SCORE!' : ''
        }`
      );
      this.modal.show();
      setTimeout(() => {
        this._newGame(this.appSettings.snakeSettings.withWalls);
      }, 500);
    });

    this.menu.on('speedChange', (speed: number) => {
      this.game.snakeSpeed = speed;
      this.game.render();
    });
    this.menu.on('newGame', (withWalls: boolean) => this._newGame(withWalls));
    this.menu.on('togglePlay', () => {
      this.game.isPaused = !this.game.isPaused;
      this.game.isPaused ? this.game.pause() : this.game.render();
    });
  }
}
