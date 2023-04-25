"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Tile(props: {
  marked: boolean;
  show: boolean;
  coords: { x: number; y: number };
  mine: boolean;
  adjacentMines: number;

  handleClick: (e: React.MouseEvent) => void;
  handleRightClick: (e: React.MouseEvent) => void;
}) {
  return (
    <>
      {!props.show ? (
        <div
          onClickCapture={(e) => {
            if (props.marked) {
              return;
            }

            props.handleClick(e);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            props.handleRightClick(e);
          }}
          className="hover:bg-slate-600 transition-all duration-150 ease-in-out font-bold text-sm select-none flex justify-center items-center border-solid   h-4 w-4 border-2 border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 active:border-b-stone-200 active:border-r-stone-200 active:border-l-stone-700  active:border-t-stone-700 "
        >
          <span className="absolute invisible">
            x:{props.coords.x} y:{props.coords.y}
          </span>
          {props.marked ? (
            <Image alt="flag" width={16} height={16} src={"/images/flag.svg"} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            if (props.show === false) {
              props.handleRightClick(e);
            }
          }}
          className="hover:bg-slate-600 transition-shadow duration-150 delay-150 ease-in-out font-bold text-sm select-none flex justify-center bg-orange-500/50 items-center border-solid  h-4 w-4 border-[1px] border-black 
        "
        >
          <span className="absolute invisible">
            x:{props.coords.x} y:{props.coords.y}
          </span>
          {props.mine && props.marked ? (
            <Image
              alt="mine"
              className="bg-blue-300"
              width={16}
              height={16}
              src={"/images/mine.svg"}
            />
          ) : (
            <></>
          )}
          {props.mine && !props.marked ? (
            <Image alt="mine" width={16} height={16} src={"/images/mine.svg"} />
          ) : (
            <></>
          )}

          {props.adjacentMines > 0 && !props.mine ? props.adjacentMines : <></>}
        </div>
      )}
    </>
  );
}
