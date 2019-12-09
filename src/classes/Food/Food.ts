import { IFood, IFoodSettings } from '../../shared/interfaces';
import {
  PINEAPPLE_FOOD_POINTS,
  APPLE_FOOD_POINTS
} from '../../shared/constants';
// @ts-ignore
import appleImg from '../../assets/images/appleFood.png';
// @ts-ignore
import pineappleImg from '../../assets/images/pineappleFood.png';

export class Food implements IFood {
  private _foodImg: HTMLImageElement;
  // @ts-ignore
  constructor(
    private _bonus: boolean,
    private _ctx: CanvasRenderingContext2D,
    private _foodOptions: IFoodSettings
  ) {
    this._foodImg = new Image();
    this._foodImg.src = this._bonus ? pineappleImg : appleImg;
    this._foodImg.onload = () => {
      this.draw();
    };
  }
  get points() {
    return this._bonus ? PINEAPPLE_FOOD_POINTS : APPLE_FOOD_POINTS;
  }

  get position() {
    return this._foodOptions.position;
  }

  draw(): void {
    this._ctx.drawImage(
      this._foodImg,
      this.position.x,
      this.position.y,
      this._foodOptions.width,
      this._foodOptions.height
    );
  }
}
