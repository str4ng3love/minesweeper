"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState } from "react";


export default function Minefield(props: { options: Options }) {
  const [field, setField] = useState<
    { coords: { x: number; y: number }; mine: boolean, adjacentMines:number }[]
  >([]);
  const [gameStart, setGameStart] = useState(false);

  const produceField = (x: string, y: string) => {
    let arr = [];
    for (let i = 0; i < parseInt(x); i++) {
      for (let j = 0; j < parseInt(y); j++) {
        arr.push({ coords: { x: i, y: j }, mine: false, adjacentMines: 0});
      }
    }
    return arr;
  };
  const addMines = (
    arr: { coords: { x: number; y: number }; mine: boolean, adjacentMines:number }[],
    step: number,
    startingTile: { x: number; y: number }
  ) => {
    let copy: { coords: { x: number; y: number }; mine: boolean, adjacentMines:number }[] =
      JSON.parse(JSON.stringify(arr));

    copy.map((el) => (el.mine = false));

    for (let i = step - 1; i > 0; i--) {
      let index = Math.floor(Math.random() * copy.length);

      if (copy[index].mine === true) {
        i++;
      } else if (
        copy[index].coords.x === startingTile.x &&
        copy[index].coords.y === startingTile.y
      ) {
        i++;
      } else if (findAdjacent(copy[index].coords, startingTile)) {
        i++;
      } else {
        copy[index].mine = true;
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

      // paintTheMinefield(field)

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
  
  const checkTile = (e: React.MouseEvent) => {
    let currentCoords = getCoords(e);
    let mined;
    mined = field?.filter((el) => {
      if (el.coords.x == currentCoords.x && el.coords.y == currentCoords.y) {
        return el;
      }
    });

    //TO DO: set 'display' state in array
  };

  const paintTheMinefield = (
    minefield: { coords: { x: number; y: number }; mine: boolean, adjacentMines: number }[]
  ) => {
    console.log("running");
    for (let i = 0; i < minefield.length; i++) {
      
      // somehow iterate over the array marking adjacent elements
      if (minefield[i].mine === true) {
        let x = minefield[i].coords.x
        let y = minefield[i].coords.y
        for (let j = -1; j < 2; j++) {
          
          for (let k = -1; k < 2; k++) {
            //find adjacent tiles and add amount of mines nearby
            let adjacentTile =  minefield.find(el => el.coords.x === x-j && el.coords.y === y-k)
            if(adjacentTile){
              adjacentTile.adjacentMines += 1
            }
          }
        }
      }
    }

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
            {" "}
            {!gameStart
              ? field.map((el, index) => (
                  <Tile
                    mine={el.mine}
                    coords={el.coords}
                    key={index}
                    handleClick={startGame}
                    adjacentMines={el.adjacentMines}
                  />
                ))
              : field.map((el, index) => (
                  <Tile
                    mine={el.mine}
                    coords={el.coords}
                    key={index}
                    handleClick={checkTile}
                    adjacentMines={el.adjacentMines}
                  />
                ))}
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
