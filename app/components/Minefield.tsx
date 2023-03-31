"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState, useRef } from "react";
import { SpawnMines } from "@/utils/SpawnMines";
import { GetCoords } from "@/utils/GetMatrixCoords";
import { GenerateField } from "@/utils/GenerateField";
import { AddClues } from "@/utils/AddClues";
import { RevealTile } from "@/utils/ReavealTiles";
import { mineHit } from "@/utils/ReavealTiles";

export interface Minefield {
  marked: boolean;
  show: boolean;
  mine: boolean;
  adjacentMines: number;
}

export default function Minefield(props: { options: Options }) {
  const [field, setField] = useState<Minefield[][]>(GenerateField(props.options.x, props.options.y));
  const [gameStart, setGameStart] = useState(false);
  const [mines, setMines] = useState(parseInt(props.options.mines));
  const [marked, setMarked] = useState(0);
  const [time, setTime] = useState(0);
  const [id, setId] = useState<NodeJS.Timer>();
  const [gameOver, setGameOver] = useState(false);
  const Restart = (e: React.MouseEvent) => {
    const newMineField = GenerateField(props.options.x, props.options.y);
    setField(newMineField);
    setGameStart(false);
    clearInterval(id);
    setTime(0);
    setMines(parseInt(props.options.mines));
    setMarked(0);
    setGameOver(false);
  };
  const startGame = (e: React.MouseEvent) => {
    let currentCoords = GetCoords(e);
    let newField = RecursiveCheck(
      AddClues(SpawnMines(field, parseInt(props.options.mines), currentCoords)),
      currentCoords
    );
    setField(newField);
    setGameStart(true);
    const intervalId = setInterval(() => {
      setTime((prev) => (prev += 1));
    }, 2000);
    setId(intervalId);
  };
  // add logic after the game has started here
  //
  const RecursiveCheck = (
    minefield: Minefield[][],
    coords: { x: number; y: number }
  ) => {
    let newMineField = [...minefield];

    newMineField = RevealTile(newMineField, coords);
    if (mineHit) {
      setGameOver(true);
    }
    return newMineField;
  };

  const markMine = (
    minefield: Minefield[][],
    coords: { x: number; y: number }
  ) => {
    if (gameOver) {
      return;
    } else {
      if (minefield[coords.x][coords.y].marked) {
        minefield[coords.x][coords.y].marked = false;
        setMarked((prev) => (prev -= 1));
      } else {
        minefield[coords.x][coords.y].marked = true;
        setMarked((prev) => (prev += 1));
      }
      setField(minefield);
    }
  };
  const checkGameState = (arr: Minefield[][]) => {
    let tiles = arr.map((array) => array.map((el) => el));
    let reducedTiles = tiles.reduce(
      (arrAcc, currentArr) => arrAcc.concat(currentArr),
      []
    );
    let uncovered = reducedTiles
      .filter((el) => el.show)
      .map((el) => el.show).length;

    if (
      mines === marked &&
      uncovered ===
        parseInt(props.options.x) * parseInt(props.options.y) -
          parseInt(props.options.mines)
    ) {
      return true;
    } else if (
      mines + uncovered ===
      parseInt(props.options.x) * parseInt(props.options.y)
    ) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {

    setGameStart(false);

  }, [props]);
  useEffect(() => {
    if (time === 999) {
      clearInterval(id);
    }
    console.log('time')
  }, [time]);
  useEffect(() => {
    if (checkGameState(field)) {
      clearInterval(id);
    }
    console.log('marked, field')
  }, [marked, field]);
  useEffect(() => {
    if (gameOver) {
      clearInterval(id);
    }
    console.log('go')
  }, [gameOver]);
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="bg-slate-400 m-1 flex flex-col items-center border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 pb-8"
    >
       <div className="p-4 flex justify-between select-none">
        
        <div className="flex justify-center items-center  h-8 w-16  mx-1 border-solid border-2 border-red-600 bg-black text-white/90">
   {time}
 </div>
    
     <div
       onClick={(e) => Restart(e)}
       className="flex justify-center items-center h-8 w-fit mx-4 "
     >
       RESET
     </div>
     <div className="flex justify-center items-center  h-8 w-16  mx-1 border-solid border-2 border-red-600 bg-black text-white/90">
       {mines - marked}
     </div>
   </div>
      <div
        className={`grid w-fit m-1 grid-cols-[repeat(${props.options.x},16px)] p-1  border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200`}
      >
        {field ? (
          <>
            {!gameStart
              ? field.map((el, indexX) =>
                  el.map((el, indexY) => (
                    <Tile
                      marked={el.marked}
                      show={el.show}
                      mine={el.mine}
                      coords={{ x: indexX, y: indexY }}
                      key={crypto.randomUUID()}
                      handleClick={startGame}
                      handleRightClick={(e) => {
                        markMine(field, GetCoords(e));
                      }}
                      adjacentMines={el.adjacentMines}
                    />
                  ))
                )
              : field.map((el, indexX) =>
                  el.map((el, indexY) => (
                    <Tile
                      marked={el.marked}
                      show={el.show}
                      mine={el.mine}
                      coords={{ x: indexX, y: indexY }}
                      key={crypto.randomUUID()}
                      handleClick={(e) => {
                        setField(RecursiveCheck(field, GetCoords(e)));
                      }}
                      handleRightClick={(e) => {
                        markMine(field, GetCoords(e));
                      }}
                      adjacentMines={el.adjacentMines}
                    />
                  ))
                )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
