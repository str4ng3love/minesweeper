"use client";
import Menu from "./Menu";
import Minefield from "./Minefield";
import { useEffect, useState } from "react";
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
      <div className="flex flex-col max-w-fit">
        <Menu getOptions={getOptions} />
        {gameOptions ?  <Minefield options={gameOptions as Options} /> :<>Loading...</>}
       
      </div>
    </>
  );
}
