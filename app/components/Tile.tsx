'use client'

import { useEffect, useState } from "react"

export default function Tile(props:{id:number, mine:boolean}){
    const [ show, setShow] = useState(false)

    return(
        <div onClickCapture={(e)=>setShow(true)} className="p-1 text-sm select-none flex justify-center items-center border-solid  bg-slate-400 h-4 w-4 border-2 border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200 active:border-b-stone-200 active:border-r-stone-200 active:border-l-stone-700  active:border-t-stone-700 ">
         {props.mine? "x" : ""}
        </div>
    )
}