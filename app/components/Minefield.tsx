'use client'

import { Options } from "./Game"
import Tile from "./Tile"
import {useEffect, useState} from 'react'

export default function Minefield(props:{options:Options}){
  const [field, setField] = useState<{id:number, mine:boolean}[]>()

  const produceField = (x:string, y:string, mines:string) =>{
    let arr = []
    let field = parseInt(x)*parseInt(y)
    for(let i = 0; i < field; i++)
    {
      if(parseInt(mines) - i > 0){
        arr.push({id: i, mine: true})
      } else {
        arr.push({id: i, mine: false})
      }
    }
    for(let i = 0; i < arr.length -1; i--){
      const j = Math.floor(Math.random() * (i + 1));
      arr[i], arr[j] = arr[j] , arr[i]
    }
    return arr
  }
 


  useEffect(()=>{
    
    setField(produceField(props.options.x, props.options.y, props.options.mines))
    
}, [props])

    return(
      <div className="bg-slate-400 m-1 flex flex-col items-center border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200">
        <div className="p-4 flex justify-between">
            <div className="p-4 mx-1">time?</div>
            <div className="p-4 mx-1">-reset-</div>
            <div className="p-4 mx-1">mines left {props.options.mines}</div>
        </div>
        <div className={`grid w-fit m-1 grid-cols-[repeat(${props.options.x},16px)] p-1  border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200`}>
        {field? field.map(el =>
          <Tile mine={el.mine} id={el.id} key={el.id}/>
          ) :<></>}
        </div>
      </div>
    )
}