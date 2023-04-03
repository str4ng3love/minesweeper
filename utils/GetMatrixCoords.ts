export const GetCoords = (e: React.MouseEvent) => {
    let currentTile = e.currentTarget.children[0].innerHTML;
    let xRegex = currentTile.slice(0, 4).match(/[0-9]/g);
    let yRegex = currentTile.slice(4, 9).match(/[0-9]/g);
    let x;
    let y;

    if (xRegex?.length === 2) {
      x = xRegex[0] + xRegex[1];
    }
    if (xRegex?.length === 1) {
      x = xRegex[0];
    }
    if (yRegex?.length === 2) {
      y = yRegex[0] + yRegex[1];
    }
    if (yRegex?.length === 1) {
      y = yRegex[0];
    }

    let currentCoords = { x: parseInt(x as string), y: parseInt(y as string) };
  
    return currentCoords;
  };