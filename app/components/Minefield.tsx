"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState } from "react";
import { SpawnMines } from "@/utils/SpawnMines";
import { GetCoords } from "@/utils/GetMatrixCoords";
import { GenerateField } from "@/utils/GenerateField";
import { AddClues } from "@/utils/AddClues";
import { RevealTile } from "@/utils/ReavealTiles";
import { mineHit } from "@/utils/ReavealTiles";
import Panel from "./Panel";

export interface Minefield {
  marked: boolean;
  show: boolean;
  mine: boolean;
  adjacentMines: number;
}

export default function Minefield(props: { options: Options }) {
  const [field, setField] = useState<Minefield[][]>(
    GenerateField(props.options.x, props.options.y)
  );
  const [gameStart, setGameStart] = useState(false);
  const [mines, setMines] = useState(parseInt(props.options.mines));
  const [marked, setMarked] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [intId, setIntId] = useState<NodeJS.Timer>();

  const Restart = (e: React.MouseEvent) => {
    const newMineField = GenerateField(props.options.x, props.options.y);
    setField(newMineField);
    setGameStart(false);
    setMines(parseInt(props.options.mines));
    setMarked(0);
    setGameOver(false);
    clearInterval(intId);
    setTime(0);
  };
  const Reset = () =>{
    const newMineField = GenerateField(props.options.x, props.options.y);
    setField(newMineField);
    setGameStart(false);
    setMines(parseInt(props.options.mines));
    setMarked(0);
    setGameOver(false);
    clearInterval(intId);
    setTime(0);
  }
  const startGame = (e: React.MouseEvent) => {
    let currentCoords = GetCoords(e);
    let newField = RecursiveCheck(
      AddClues(SpawnMines(field, parseInt(props.options.mines), currentCoords)),
      currentCoords
    );

    setField(newField);
    setGameStart(true);
    let id = setInterval(() => {
      setTime((prev) => (prev += 1));
    }, 1000);
    setIntId(id);
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
    clearInterval(intId);
    Reset()
  }, [props]);

  useEffect(() => {
    if (checkGameState(field)) {
      clearInterval(intId);
    }
  }, [marked, field]);
  useEffect(() => {
    if (gameOver) {
      clearInterval(intId);
    }
  }, [gameOver]);
  // necessary evil
  let mineZone = document.getElementById('mine-Field-Zone')
  if(mineZone){
  mineZone.style.gridTemplateColumns = `repeat(${props.options.y}, 16px)`

}

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="bg-slate-400 m-1 flex flex-col items-center border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 pb-8"
    >
      <Panel time={time} minesLeft={mines - marked} resetFN={Restart} />
      <div
      id={'mine-Field-Zone'}
        className={`grid w-fit m-1  p-1  border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200`}
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
      <button onClick={(e) => console.log(field)}>check</button>
    </div>
  );
}
