export const RevealTile = (
  array: {
    marked: boolean;
    show: boolean;
    mine: boolean;
    adjacentMines: number;
  }[][],
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
    return array;
  } else if(array[coords.x][coords.y].marked === true){ return array} else if (array[coords.x][coords.y].adjacentMines > 0) {
    array[coords.x][coords.y].show = true;
    return array;
  } else if(array[coords.x][coords.y].show === false) {
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

const revealAll = (
  array: {
    marked: boolean;
    show: boolean;
    mine: boolean;
    adjacentMines: number;
  }[][]
) => {
  array.map((x) => x.map((y) => (y.show = true)));
  return array;
};
