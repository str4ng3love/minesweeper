"use client";
import { useEffect, useState } from "react";
export default function GameOptions(props:{closefN:(e: React.MouseEvent)=>void, setOptionsfN:(options:{x:string, y:string, mines:string})=>void; }) {
  const [optionsX, setOptionsX] = useState("9");
  const [optionsY, setOptionsY] = useState("9");
  const [mines, setMines] = useState("9");

  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md shadow-black">
      <div className="bg-white p-8 flex flex-col">
        <h2 className="text-center p-4 font-bold">Choose your game options</h2>
        <div className="flex justify-between">
          <span className="p-1 w-[6rem] font-bold">Beginner</span>
          <span className="p-1 w-[6rem]">9 x 9</span>
          <span className="p-1 w-[6rem]">10 mines</span>
          <button
          onClick={(e)=>{
            props.setOptionsfN({x:"9", y:"9", mines:"10"})
            props.closefN(e)
          }}
            className="p-1 align-middle hover:bg-black hover:text-white px-2 font-bold"
            type="button"
          >
            →
          </button>
        </div>
        <div className="flex justify-between">
          <span className="p-1 w-[6rem] font-bold">Advanced</span>
          <span className="p-1 w-[6rem]">16 x 16</span>
          <span className="p-1 w-[6rem]">40 mines</span>
          <button
           onClick={(e)=>{
            props.setOptionsfN({x:"16", y:"16", mines:"40"})
            props.closefN(e)
          }}
            className="p-1 align-middle hover:bg-black hover:text-white px-2 font-bold"
            type="button"
          >
            →
          </button>
        </div>
        <div className="flex justify-between">
          <span className="p-1 w-[6rem] font-bold">Expert</span>
          <span className="p-1 w-[6rem]">16 x 32</span>
          <span className="p-1 w-[6rem]">99 mines</span>
          <button
           onClick={(e)=>{
            props.setOptionsfN({x:"16", y:"32", mines:"99"})
            props.closefN(e)
          }}
            className="p-1 align-middle hover:bg-black hover:text-white px-2 font-bold"
            type="button"
          >
            →
          </button>
        </div>
        
        <button
        onClick={props.closefN}
          className=" mt-4 p-1 align-middle hover:bg-black hover:text-white px-2 font-bold"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
