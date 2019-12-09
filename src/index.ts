import { App } from './classes/App/App';

const app = new App({
  gameSettings: {
    canvasHeight: 400,
    canvasWidth: 450,
    horizontalFields: 15,
    verticalFields: 16
  },
  snakeSettings: {
    headColor: 'red',
    speed: 50,
    withWalls: true,
    tailColor: '#009900'
  }
});
app.start();
