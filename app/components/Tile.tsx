"use client";

import React, { useEffect, useState } from "react";

export default function Tile(
  props: { coords: { x: number; y: number }; mine: boolean, startFn: (e: React.MouseEvent) => void;},
  
) {
  const [show, setShow] = useState(false);
  // useEffect(()=>{

  //     console.log(props.coords)
  // }, [props])
  return (
    <div
      onClickCapture={(e) => {
        props.startFn(e);
        setShow(true);
      }}
      className="p-1 text-sm select-none flex justify-center items-center border-solid  bg-slate-400 h-4 w-4 border-2 border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 active:border-b-stone-200 active:border-r-stone-200 active:border-l-stone-700  active:border-t-stone-700 "
    >
      {props.mine && props.coords ? "x" : ``}
      <span className="absolute invisible">x:{props.coords.x} y:{props.coords.y}</span>
    </div>
  );
}
