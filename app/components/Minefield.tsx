"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState } from "react";

export default function Minefield(props: { options: Options }) {
  const [field, setField] = useState<{ coords: {x:number, y:number}; mine: boolean }[]>();
  const [gameStart, setGameStart] = useState(false)

  const produceField = (x: string, y: string) => {
    let arr = [];
    for (let i = 0; i < parseInt(x); i++) {
      
      for( let j = 0; j < parseInt(y); j++){
        arr.push({ coords: {x: i, y: j }, mine: false });
      }
    }
    return arr;
  };
  const addMines = (arr: { coords: {x:number, y: number}; mine: boolean }[], step: number) => {
    let copy: { coords: {x:number, y: number}; mine: boolean }[] = JSON.parse(JSON.stringify(arr));

    copy.map((el) => (el.mine = false));

    for (let i = step - 1; i > 0; i--) {
      let index = Math.floor(Math.random() * copy.length);
      if(copy[index].mine === true){
        i++
      } else {

        copy[index].mine = true;
      }
    }

    return copy;
  };
const checkCoords = (e:React.MouseEvent)=> {
  console.log(e.currentTarget.children[0].innerHTML)
  //to do: generate mines on 1st click and make sure that there are no adjacent mines
}

  useEffect(() => {
    setField(produceField(props.options.x, props.options.y));
  }, [props]);


  return (
    <div className="bg-slate-400 m-1 flex flex-col items-center border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200">
      <div className="p-4 flex justify-between">
        <div className="p-4 mx-1">time?</div>
        <div className="p-4 mx-1">-reset-</div>
        <div className="p-4 mx-1">mines left {props.options.mines}</div>
      </div>
      <div
        className={`grid w-fit m-1 grid-cols-[repeat(${props.options.y},16px)] p-1  border-2 border-solid border-b-stone-700 border-r-stone-700  border-l-stone-200  border-t-stone-200`}
      >
        {field ? (
          field.map((el, index) => <Tile mine={el.mine} coords={el.coords} key={index} startFn={checkCoords}/>)
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={(e) => {
          if (field) {
            setField(addMines(field, parseInt(props.options.mines)));
          }
        }}
        className="p-4 bg-red-400"
      >
        test
      </button>
    </div>
  );
}
