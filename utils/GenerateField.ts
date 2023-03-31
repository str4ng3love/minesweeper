import { Minefield } from "@/app/components/Minefield";
export const GenerateField = (x: string, y: string) => {
  let arr: 
    Minefield[][] = [[]];
  for (let i = 0; i < parseInt(x); i++) {
    arr[i] = [];
    for (let j = 0; j < parseInt(y); j++) {
      arr[i][j] = { marked:false, show: false, mine: false, adjacentMines: 0};
    }
  }

  return arr;
};
