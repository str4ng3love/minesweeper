


# Minesweeper

My attempt at classic Minesweeper, built in react. 

## How it works

1. When a player clicks a cell, `startGame` fn runs. It gathers coordinates of the point on the Minefield(a 2D array). 

2. Minefield generation function populates the 2D array with objects containing properties with falsey values, like mine, adjacentMines or whether the cell was marked.

3. Then the array, along other parameters, is passed to a function that randomly spawns mines:

```
    export const SpawnMines = (arr: Minefield[][], step: number, startingTile: { x: number; y: number }) => {
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
```

4. Next, Minefield array entries receive values coresponding to amount of mines on nearby coords:


```
    export const AddClues = (minefield: Minefield[][]) => {
        for (let i = 0; i < minefield.length; i++) {
            for (let j = 0; j < minefield[i].length; j++) {
                if (minefield[i][j].mine === true) {
                    for (let k = -1; k < 2; k++) {
                        for (let l = -1; l < 2; l++) {
                            if (minefield[i + k] !== undefined && minefield[i + k][j + l] !== undefined) {
                            minefield[i + k][j + l].adjacentMines += 1;
                            }
                        }
                    }
                }
            }
        }
        return minefield;
    };

```

5. Finally, Minefields tiles are revealed recursively. If user happen to hit a mine on their next attempt, all tiles are revealed and the timer stops.

```
    export const RevealTile = (array: Minefield[][],coords: { x: number; y: number }) => {
        if (coords.x < 0 || coords.x > array.length - 1 || coords.y > array[0].length - 1 || coords.y < 0) {
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
```


## What could be improved:

1. As it is now, each operation rerenders the main component as whole logic lives in `useState` hook, it could be replaced with a combination of `useMemo` and `useReducer` to improve performace.
2. Timer value also lives in `useState`, therefore component's rerender is unnecessarily triggered with each state update.
3. Styles in general. More appealing visual composition would improve the project overal ✨.


## Installation

1. Make sure that node.js is  installed on your machine
2. Create a new folder
3. Navigate to the newly created folder and run `git clone [adress to this repository]`
4. Run `npm install` to install project files.
5. To run the project in: 

    - Developement mode:

        1. Run ```npm run dev``` 
        <br></br>
    - Production mode:

        1. Compile the project by running `npm run build`
        2. Run the build with command `npx next start -p [PORT]` you can omit the -p port flag, it defaults to 3000