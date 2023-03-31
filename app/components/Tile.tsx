"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Tile(props: {
  marked: boolean;
  show: boolean;
  coords: { x: number; y: number };
  mine: boolean;
  adjacentMines: number;

  handleClick: (e: React.MouseEvent) => void;
  handleRightClick: (e: React.MouseEvent) => void;
}) {

  const [bg, setBg] = useState('no-bg')
    useEffect(()=> {
      console.log('change bg')
    }, [props])
  return (
    <>
      {!props.show ? (
        <div
          onClickCapture={(e) => {
            if (props.marked) {
              return;
            }
            if (props.mine) {
              console.log('mine')
            setBg('bg-emerald-400')
            }
            props.handleClick(e);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            props.handleRightClick(e);
          }}
          className="font-bold text-sm select-none flex justify-center items-center border-solid  bg-emerald-400 h-4 w-4 border-2 border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 active:border-b-stone-200 active:border-r-stone-200 active:border-l-stone-700  active:border-t-stone-700 "
        >
          <span className="absolute invisible">
            x:{props.coords.x} y:{props.coords.y}
          </span>
          {props.marked ? <span>M</span> : <span></span>}
        </div>
      ) : (
        <div className="font-bold text-sm select-none flex justify-center items-center border-solid  bg-red-300 h-4 w-4 border-[1px] border-black ">
          <span className="absolute invisible">
            x:{props.coords.x} y:{props.coords.y}
          </span>
          {props.mine ? (
            <Image className={bg} alt="mine" width={16} height={16} src={"/images/mine.svg"} />
          ) : (
            <></>
          )}
          {props.adjacentMines > 0 && !props.mine ? props.adjacentMines : <></>}
        </div>
      )}
    </>
  );
}
