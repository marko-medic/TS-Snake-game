import { TRANSITION_DELAY } from '../../shared/constants';
import { IModal } from '../../shared/interfaces';

export class Modal implements IModal {
  // @ts-ignore
  public _elem: HTMLDivElement;
  constructor(
    public selector: string,
    private _title = 'Modal title',
    private _message = ''
  ) {
    this._elem = document.querySelector(this.selector) as HTMLDivElement;
    this._wireEvents();
    this._init();
  }

  setMessage(title: string, message: string) {
    this._title = title;
    this._message = message;
    this._init();
  }

  show() {
    this._elem.style.display = 'flex';
    setTimeout(() => {
      this._elem.classList.add('open');
    }, TRANSITION_DELAY);
  }

  hide() {
    this._elem.classList.remove('open');
    setTimeout(() => {
      this._elem.style.display = 'none';
    }, TRANSITION_DELAY);
  }

  private _init() {
    (this._elem.querySelector(
      '.title'
    ) as HTMLElement).textContent = this._title;
    (this._elem.querySelector(
      '.message'
    ) as HTMLElement).textContent = this._message;
  }

  private _wireEvents() {
    (this._elem.querySelector('.close') as HTMLButtonElement).addEventListener(
      'click',
      this.hide.bind(this)
    );
  }
}
