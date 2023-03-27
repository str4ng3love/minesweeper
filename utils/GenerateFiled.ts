export const GenerateField = (x: string, y: string) => {
  let arr: {
    show: boolean;
    mine: boolean;
    adjacentMines: number;
  }[][] = [[]];
  for (let i = 0; i < parseInt(x); i++) {
    arr[i] = [];
    for (let j = 0; j < parseInt(y); j++) {
      arr[i][j] = { show: false, mine: false, adjacentMines: 0 };
    }
  }

  return arr;
};
