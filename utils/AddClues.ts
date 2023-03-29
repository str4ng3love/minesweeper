export const AddClues = (
  minefield: {
    marked: boolean;
    show: boolean;
    mine: boolean;
    adjacentMines: number;
  }[][]
) => {
  for (let i = 0; i < minefield.length; i++) {
    for (let j = 0; j < minefield[i].length; j++) {
      if (minefield[i][j].mine === true) {
        for (let k = -1; k < 2; k++) {
          for (let l = -1; l < 2; l++) {
            if (
              minefield[i + k] !== undefined &&
              minefield[i + k][j + l] !== undefined
            ) {
              minefield[i + k][j + l].adjacentMines += 1;
            }
          }
        }
      }
    }
  }

  return minefield;
};
