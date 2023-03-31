import { Minefield } from "@/app/components/Minefield";
export const SpawnMines = (
  arr: Minefield[][],

  step: number,
  startingTile: { x: number; y: number }
) => {
  let copy: 
    Minefield[][] = JSON.parse(
    JSON.stringify(arr)
  );

  for (let i = step; i > 0; i--) {
    let indexX = Math.floor(Math.random() * copy.length);
    let indexY = Math.floor(Math.random() * copy[0].length);

    if (copy[indexX][indexY].mine === true) {
      i++;
    } else if (indexX === startingTile.x && indexY === startingTile.y) {
      i++;
    } else if (findAdjacent({ x: indexX, y: indexY }, startingTile)) {
      i++;
    } else {
      copy[indexX][indexY].mine = true;
    }
  }

  return copy;
};

const findAdjacent = (
  coords: { x: number; y: number },
  currentCoords: { x: number; y: number }
) => {
  if (
    (currentCoords.x === coords.x ||
      currentCoords.x === coords.x + 1 ||
      currentCoords.x === coords.x - 1) &&
    (currentCoords.y === coords.y ||
      currentCoords.y === coords.y + 1 ||
      currentCoords.y === coords.y - 1)
  )
    return true;
};
