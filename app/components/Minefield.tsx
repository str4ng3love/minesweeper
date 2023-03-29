"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState, useRef } from "react";
import { SpawnMines } from "@/utils/SpawnMines";
import { GetCoords } from "@/utils/GetMatrixCoords";
import { GenerateField } from "@/utils/GenerateFiled";
import { AddClues } from "@/utils/AddClues";

export default function Minefield(props: { options: Options }) {
  const [field, setField] = useState<
    {
      show: boolean;
      mine: boolean;
      adjacentMines: number;
    }[][]
  >([]);
  const [gameStart, setGameStart] = useState(false);

  const startGame = (e: React.MouseEvent) => {
    let currentCoords = GetCoords(e);

    setField(
      AddClues(SpawnMines(field, parseInt(props.options.mines), currentCoords))
    );

    setGameStart(true);
  };

  const checkTile = (e: React.MouseEvent) => {
    let currentCoords = GetCoords(e);

    // revealTile(currentCoords);
    RecursiveCheck(field, currentCoords);
  };

  // add logic after the game has started here
  //
  const RecursiveCheck = (
    minefield: {
      show: boolean;
      mine: boolean;
      adjacentMines: number;
    }[][],
    coords: { x: number; y: number }
  ) => {
    let newMineField = [...minefield];
    newMineField = checkArray(newMineField, coords);
    setField(newMineField);
  };

  const checkArray = (
    array: {
      show: boolean;
      mine: boolean;
      adjacentMines: number;
    }[][],
    coords: { x: number; y: number }
  ) => {
   
    if (
      coords.x < 0 ||
      coords.x > array.length - 1 ||
      coords.y > array[0].length -1||
      coords.y < 0
    ) {
      return array;
    }
    if (array[coords.x][coords.y].mine === true) {
      revealAll(array);
      return array;
    } else if (array[coords.x][coords.y].adjacentMines > 0) {
      array[coords.x][coords.y].show = true;
      return array;
    } else if (array[coords.x][coords.y].show === false) {
      array[coords.x][coords.y].show = true
      checkArray(array, { x: coords.x - 1, y: coords.y - 1 });
      checkArray(array, { x: coords.x - 1, y: coords.y });
      checkArray(array, { x: coords.x - 1, y: coords.y + 1 });
      checkArray(array, { x: coords.x, y: coords.y - 1 });
      checkArray(array, { x: coords.x, y: coords.y + 1 });
      checkArray(array, { x: coords.x + 1, y: coords.y - 1 });
      checkArray(array, { x: coords.x + 1, y: coords.y });
      checkArray(array, { x: coords.x + 1, y: coords.y + 1 });
      
    } else {
      return array;
    }
    return array
  };


  const revealAll = (
    array: { show: boolean; mine: boolean; adjacentMines: number }[][]
  ) => {
    array.map((x) => x.map((y) => (y.show = true)));
    return array;
  };

  useEffect(() => {
    setField(GenerateField(props.options.x, props.options.y));
    setGameStart(false);
  }, [props]);
  useEffect(() => {}, [field]);
  return (
    <div className="bg-slate-400 m-1 flex flex-col items-center border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200">
      <div className="p-4 flex justify-between">
        <div className="p-4 mx-1">time?</div>
        <div className="p-4 mx-1">-reset-</div>
        <div className="p-4 mx-1">mines left {props.options.mines}</div>
      </div>
      <div
        className={`grid w-fit m-1 grid-cols-[repeat(${props.options.x},16px)] p-1  border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200`}
      >
        {/* TODO: Add 'show/visible/display' state to 2darray, and pass it as prop to Tile.tsx */}

        {field ? (
          <>
            {!gameStart
              ? field.map((el, indexX) =>
                  el.map((el, indexY) => (
                    <Tile
                      show={el.show}
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
                      show={el.show}
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
        onClick={(e) =>
          setField((prev) => {
            prev[0][0].show = true;

            return prev;
          })
        }
        className="p-4 border-solid border-2 rounded-sm border-white"
      >
        {" "}
        click me
      </button>
    </div>
  );
}
