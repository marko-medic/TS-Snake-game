import { EventEmitter } from 'events';
import { IMenu, IMenuSettings } from '../../shared/interfaces';

export class Menu extends EventEmitter implements IMenu {
  private _menuElem = document.querySelector(this.selector) as HTMLDivElement;
  private _colorInput = this._menuElem.querySelector(
    '#color'
  ) as HTMLInputElement;
  private _speedInput = this._menuElem.querySelector(
    '#speed'
  ) as HTMLInputElement;
  private _btnNewGame = this._menuElem.querySelector(
    '#btnNewGame'
  ) as HTMLButtonElement;
  private _btnToggle = this._menuElem.querySelector(
    '#btnTogglePlay'
  ) as HTMLButtonElement;
  private _btnWalls = this._menuElem.querySelector(
    '#btnWalls'
  ) as HTMLButtonElement;
  private _btnWallsFree = this._menuElem.querySelector(
    '#btnWallsFree'
  ) as HTMLButtonElement;
  constructor(public selector: string, public settings: IMenuSettings) {
    super();
    this.init();
    this._wireEvents();
  }

  init() {
    this._colorInput.value = this.settings.tailColor;
    this._speedInput.value = this.settings.speed.toString();

    this._btnToggle.textContent = 'Pause';
    this._btnWalls.className = `btn red ${
      this.settings.withWalls ? 'active' : ''
    }`;
    this._btnWallsFree.className = `btn orange ${
      !this.settings.withWalls ? 'active' : ''
    }`;
  }

  private _wireEvents() {
    this._colorInput.addEventListener(
      'change',
      this._colorChangeHandler.bind(this)
    );
    this._speedInput.addEventListener(
      'change',
      this._speedChangeHandler.bind(this)
    );
    this._btnWalls.addEventListener('click', () => this._toggleWalls(true));
    this._btnWallsFree.addEventListener('click', () =>
      this._toggleWalls(false)
    );
    this._btnNewGame.addEventListener('click', () =>
      this._toggleWalls(this.settings.withWalls)
    );
    this._btnToggle.addEventListener('click', this._togglePlay.bind(this));
  }

  private _togglePlay() {
    this.settings.isPaused = !this.settings.isPaused;
    this._btnToggle.textContent = this.settings.isPaused ? 'Resume' : 'Pause';
    this.emit('togglePlay');
  }

  private _toggleWalls(withWalls: boolean) {
    this._btnWalls.className = `btn red ${withWalls ? 'active' : ''}`;
    this._btnWallsFree.className = `btn orange ${!withWalls ? 'active' : ''}`;
    this.emit('newGame', withWalls);
  }

  private _speedChangeHandler(event: Event) {
    if (!event.target) {
      return;
    }
    const updatedSpeed = Number((event.target as HTMLInputElement).value);
    this.emit('speedChange', updatedSpeed);
  }

  private _colorChangeHandler(event: Event) {
    if (!event.target) {
      return;
    }
    const color = (event.target as HTMLInputElement).value;
    this.emit('colorChange', color);
  }
}
