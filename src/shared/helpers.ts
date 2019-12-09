export const getRandomPosition = (
  horizFields: number,
  verticalFields: number,
  gridSize: number
) => ({
  x: Math.floor(Math.random() * horizFields) * gridSize,
  y: Math.floor(Math.random() * verticalFields) * gridSize
});
