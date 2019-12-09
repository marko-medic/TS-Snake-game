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
