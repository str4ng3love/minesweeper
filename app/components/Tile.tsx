"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Tile(props: {
  coords: { x: number; y: number };
  mine: boolean;
  adjacentMines: number;
  handleClick: (e: React.MouseEvent) => void;
}) {
  const [show, setShow] = useState(false);
  // useEffect(()=>{

  //     console.log(props.coords)
  // }, [props])
  return (
    <>
      {!show ? (
        <div
          onClickCapture={(e) => {
            props.handleClick(e);
            setShow(true);
          }}
          className="p-1 text-sm select-none flex justify-center items-center border-solid  bg-slate-400 h-4 w-4 border-2 border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 active:border-b-stone-200 active:border-r-stone-200 active:border-l-stone-700  active:border-t-stone-700 "
        >
          {/* {props.mine && props.coords ? "x" : ``} */}
          {/* {props.adjacentMines > 0 && !props.mine ? props.adjacentMines : <></>}  */}
          <span className="absolute invisible">
            x:{props.coords.x} y:{props.coords.y}
            <>{props.mine ? "mined" : <></>}</>
          </span>
        </div>
      ) : (
        <div
          onClickCapture={(e) => {
            props.handleClick(e);
            setShow(true);
          }}
          className=" font-bold text-sm select-none flex justify-center items-center border-solid  bg-slate-300 h-4 w-4 border-[1px] border-black  "
        >
          {props.mine && props.coords ? <Image  alt="mine" width={16} height={16} src={"/images/mine.svg"}/> : ``}
          {props.adjacentMines > 0 && !props.mine ? props.adjacentMines : <></>} 
          <span className="absolute invisible">
            x:{props.coords.x} y:{props.coords.y}
            <>{props.mine ? "mined" : <></>}</>
          </span>
        </div>
      )}
    </>

    // <div

    //
    //   }}
    //   className="p-1 text-sm select-none flex justify-center items-center border-solid  bg-slate-400 h-4 w-4 border-2 border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 active:border-b-stone-200 active:border-r-stone-200 active:border-l-stone-700  active:border-t-stone-700 "
    // >

    //   {/* {props.mine && props.coords ? "x" : ``} */}
    //   {/* {props.adjacentMines > 0 && !props.mine ? props.adjacentMines : <></>}  */}
    //   <span className="absolute invisible">
    //     x:{props.coords.x} y:{props.coords.y}
    //     <>{props.mine ? "mined" : <></>}</>
    //   </span>
    // </div>
  );
}
