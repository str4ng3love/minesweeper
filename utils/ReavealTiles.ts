import { Minefield } from "@/app/components/Minefield";
export const RevealTile = (
  array: Minefield[][],
  coords: { x: number; y: number }
) => {
  if (
    coords.x < 0 ||
    coords.x > array.length - 1 ||
    coords.y > array[0].length - 1 ||
    coords.y < 0
  ) {
    return array;
  }
  if (array[coords.x][coords.y].mine === true) {
    revealAll(array);
    mineHit = true;
    return array;
  } else if (array[coords.x][coords.y].marked === true) {
    return array;
  } else if (array[coords.x][coords.y].adjacentMines > 0) {
    array[coords.x][coords.y].show = true;
    return array;
  } else if (array[coords.x][coords.y].show === false) {
    array[coords.x][coords.y].show = true;
    RevealTile(array, { x: coords.x - 1, y: coords.y - 1 });
    RevealTile(array, { x: coords.x - 1, y: coords.y });
    RevealTile(array, { x: coords.x - 1, y: coords.y + 1 });
    RevealTile(array, { x: coords.x, y: coords.y - 1 });
    RevealTile(array, { x: coords.x, y: coords.y + 1 });
    RevealTile(array, { x: coords.x + 1, y: coords.y - 1 });
    RevealTile(array, { x: coords.x + 1, y: coords.y });
    RevealTile(array, { x: coords.x + 1, y: coords.y + 1 });
  } else {
    return array;
  }
  return array;
};

const revealAll = (array: Minefield[][]) => {
  array.map((x) =>
    x.map((y) => {
      return (y.show = true);
    })
  );
  return array;
};
export let mineHit: boolean = false;
export const ResetMineHit = () =>{
    mineHit = false
} 
