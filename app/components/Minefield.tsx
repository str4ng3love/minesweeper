"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState } from "react";

export default function Minefield(props: { options: Options }) {
  const [field, setField] =
    useState<{ coords: { x: number; y: number }; mine: boolean }[]>();
  const [gameStart, setGameStart] = useState(false);

  const produceField = (x: string, y: string) => {
    let arr = [];
    for (let i = 0; i < parseInt(x); i++) {
      for (let j = 0; j < parseInt(y); j++) {
        arr.push({ coords: { x: i, y: j }, mine: false });
      }
    }
    return arr;
  };
  const addMines = (
    arr: { coords: { x: number; y: number }; mine: boolean }[],
    step: number,
    startingTile: { x: number; y: number }
  ) => {
    let copy: { coords: { x: number; y: number }; mine: boolean }[] =
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
  const checkCoords = (e: React.MouseEvent) => {
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

    //to do: generate mines on 1st click and make sure that there are no adjacent mines
    if (field) {
      setField(addMines(field, parseInt(props.options.mines), currentCoords));
      setGameStart(true);
    }
  };
  const findAdjacent = (
    coords: { x: number; y: number },
    currentCoords: { x: number; y: number }
  ) => {
    console.log(
      (currentCoords.x === coords.x ||
        currentCoords.x === coords.x + 1 ||
        currentCoords.x === coords.x - 1) &&
        (currentCoords.y === coords.y ||
          currentCoords.y === coords.y + 1 ||
          currentCoords.y === coords.y - 1)
    );
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
        className={`grid w-fit m-1 grid-cols-[repeat(${props.options.y},16px)] p-1  border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200`}
      >
        {field ? (
          field.map((el, index) => (
            <Tile
              mine={el.mine}
              coords={el.coords}
              key={index}
              startFn={checkCoords}
            />
          ))
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
