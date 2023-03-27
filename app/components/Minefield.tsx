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
    revealTile(coords);

  };



  const revealTile = (coords: { x: number; y: number }) => {
    setField((prev) => {
      if(prev[coords.x][coords.y].mine === true){
        prev.map((el)=> el.map(el=> el.show =true))
      } else {
        prev[coords.x][coords.y].show = true;
      }
      return [...prev];
    });
  };

  const checkTile = (e: React.MouseEvent) => {
    let currentCoords = GetCoords(e);
  
    RecursiveCheck(field, currentCoords);
  };

  //find adjacent tiles and add amount of mines nearby

  useEffect(() => {
    setField(GenerateField(props.options.x, props.options.y));
    setGameStart(false);
  }, [props]);
  useEffect(()=> {
  
  }, [field])
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
      onClick={(e)=>setField(prev => {
        prev[0][0].show = true
      
        return prev
      })}
      className="p-4 border-solid border-2 rounded-sm border-white"> click me</button>
    </div>
  );
}
