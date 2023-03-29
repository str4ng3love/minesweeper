"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState, useRef } from "react";
import { SpawnMines } from "@/utils/SpawnMines";
import { GetCoords } from "@/utils/GetMatrixCoords";
import { GenerateField } from "@/utils/GenerateFiled";
import { AddClues } from "@/utils/AddClues";
import { RevealTile } from "@/utils/ReavealTiles";

export default function Minefield(props: { options: Options }) {
  const [field, setField] = useState<
    {
      marked: boolean;
      show: boolean;
      mine: boolean;
      adjacentMines: number;
    }[][]
  >([]);
  const [gameStart, setGameStart] = useState(false);
  const [mines, setMines] = useState(parseInt(props.options.mines));
  const [marked, setMarked] = useState(0);

  const startGame = (e: React.MouseEvent) => {
    let currentCoords = GetCoords(e);
    let newField = RecursiveCheck(
      AddClues(SpawnMines(field, parseInt(props.options.mines), currentCoords)),
      currentCoords
    );
    setField(newField);
    setGameStart(true);
  };
  // add logic after the game has started here
  //
  const RecursiveCheck = (
    minefield: {
      marked: boolean;
      show: boolean;
      mine: boolean;
      adjacentMines: number;
    }[][],
    coords: { x: number; y: number }
  ) => {
    let newMineField = [...minefield];
    newMineField = RevealTile(newMineField, coords);
    return newMineField;
  };

  const markMine = (
    minefield: {
      marked: boolean;
      show: boolean;
      mine: boolean;
      adjacentMines: number;
    }[][],
    coords: { x: number; y: number }
  ) => {
    if (minefield[coords.x][coords.y].marked) {
      minefield[coords.x][coords.y].marked = false;
      setMarked((prev) => (prev -= 1));
    } else {
      minefield[coords.x][coords.y].marked = true;
      setMarked((prev) => (prev += 1));
    }
    setField(minefield);
  };
  const checkGameState = (arr:{
    marked: boolean;
    show: boolean;
    mine: boolean;
    adjacentMines: number;
  }[][]) => {
    if (marked > 0) {
     

      let tiles = arr.map((array) => array.map((el) => el));
      let reducedTiles = tiles.reduce((arrAcc, currentArr) =>
        arrAcc.concat(currentArr)
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
        return true
      }
      else {
        return false
      }
    }
  }
  useEffect(() => {
    setField(GenerateField(props.options.x, props.options.y));
    setGameStart(false);
  }, [props]);

  useEffect(() => {
    if(checkGameState(field)){
      // youWin.exe
    }
  }, [marked, field]);
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="bg-slate-400 m-1 flex flex-col items-center border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 pb-8"
    >
      <div className="p-4 flex justify-between select-none">
        <div className="p-4 mx-1">time?</div>
        <div className="p-4 mx-1">-reset-</div>
        <div className="p-4 mx-1">mines left : {mines - marked}</div>
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
