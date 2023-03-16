"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState } from "react";

export default function Minefield(props: { options: Options }) {
  const [field, setField] = useState<
    {
      mine: boolean;
      adjacentMines: number;
    }[][]
  >([]);
  const [gameStart, setGameStart] = useState(false);

  const produceField = (x: string, y: string) => {
    let arr: { mine: boolean; adjacentMines: number }[][] = [[]];
    for (let i = 0; i < parseInt(x); i++) {
      arr[i] = [];
      for (let j = 0; j < parseInt(y); j++) {
        arr[i][j] = { mine: false, adjacentMines: 0 };
      }
    }

    return arr;
  };
  const addMines = (
    arr: { mine: boolean; adjacentMines: number }[][],
    step: number,
    startingTile: { x: number; y: number }
  ) => {
    let copy: { mine: boolean; adjacentMines: number }[][] = JSON.parse(
      JSON.stringify(arr)
    );

    // copy.map((el) => (el.map(el => el.mine = false)));

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
  const startGame = (e: React.MouseEvent) => {
    let currentCoords = getCoords(e);

    if (field) {
      // @ts-ignore
      setField(
        paintTheMinefield(
          addMines(field, parseInt(props.options.mines), currentCoords)
        )
      );

      setGameStart(true);
    }
    // TO DO: loop over tiles, check and mark how many mines are located adjacently to it
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
  const getCoords = (e: React.MouseEvent) => {
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
  // add logic after the game has started here

  const checkTile = (e: React.MouseEvent) => {
    let currentCoords = getCoords(e);

    console.log(currentCoords);
  };

  //find adjacent tiles and add amount of mines nearby
  const paintTheMinefield = (
    minefield: { mine: boolean; adjacentMines: number }[][]
  ) => {
    for (let i = 0; i < minefield.length; i++) {
      for (let j = 0; j < minefield[i].length; j++) {
        if (minefield[i][j].mine === true) {
          for (let k = -1; k < 2; k++) {
            for (let l = -1; l < 2; l++) {
              if(minefield[i+k]!== undefined && minefield[i+k][j+l]!==undefined){
                minefield[i + k][j + l].adjacentMines += 1;
              }
              
              // if (!minefield[i + k][j + l].mine) {
                // }
              }
            }
          }
        }
      }
      console.log(minefield)

  
    return minefield;
  };
  useEffect(() => {
    setField(produceField(props.options.x, props.options.y));
  }, [props]);

  return (
    <div className="bg-slate-400 m-1 flex flex-col items-center border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200">
      <div className="p-4 flex justify-between">
        <div className="p-4 mx-1">time?</div>
        <div className="p-4 mx-1">-reset-</div>
        <div className="p-4 mx-1">mines left {props.options.mines}</div>
      </div>
      <div
        className={`grid w-fit m-1 grid-cols-[repeat(9,16px)] p-1  border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200`}
      >
        {field ? (
          <>
            {!gameStart
              ? field.map((el, indexX) =>
                  el.map((el, indexY) => (
                    <Tile
                      mine={el.mine}
                      coords={{ x: indexX, y: indexY }}
                      key={crypto.randomUUID()}
                      handleClick={startGame}
                      adjacentMines={el.adjacentMines}
                    />
                  ))
                )
              : field.map((el, indexX) =>
                  el.map((el, indexY) => (
                    <Tile
                      mine={el.mine}
                      coords={{ x: indexX, y: indexY }}
                      key={crypto.randomUUID()}
                      handleClick={checkTile}
                      adjacentMines={el.adjacentMines}
                    />
                  ))
                )}
          </>
        ) : (
          <></>
        )}
      </div>
      <button
        // onClick={(e) => {
        //   if (field) {
        //     setField(addMines(field, parseInt(props.options.mines)));
        //   }
        // }}
        className="p-4 bg-red-400"
      >
        test
      </button>
    </div>
  );
}
