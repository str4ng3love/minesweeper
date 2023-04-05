"use client";
import Menu from "./Menu";
import Minefield from "./Minefield";
import { useState } from "react";
export interface Options {
  x: string;
  y: string;
  mines: string;
}
export default function Game() {
  const [gameOptions, setGameOptions] = useState<Options>();
  const getOptions = (options: object) => {
    setGameOptions(options as Options);
  };

  return (
    <>
      <div className="flex z-10 flex-col max-w-fit ">
        <Menu getOptions={getOptions} />
        {gameOptions ?  <Minefield options={gameOptions as Options} /> :<span className="my-16 text-4xl text-center animate-pulse font-bold">Loading...</span>}
       
      </div>
    </>
  );
}
