"use client";

import { Options } from "./Game";
import Tile from "./Tile";
import { useEffect, useState } from "react";

export default function Minefield(props: { options: Options }) {
  const [field, setField] = useState<{ id: number; mine: boolean }[]>();

  const produceField = (x: string, y: string) => {
    let arr = [];
    let field = parseInt(x) * parseInt(y);
    for (let i = 0; i < field; i++) {
      arr.push({ id: i, mine: false });
    }
    return arr;
  };
  const addMines = (arr: { id: number; mine: boolean }[], step: number) => {
    let copy: { id: number; mine: boolean }[] = JSON.parse(JSON.stringify(arr));

    copy.map((el) => (el.mine = false));

    for (let i = step - 1; i > 0; i--) {
      let index = Math.floor(Math.random() * copy.length);
      copy[index].mine = true;
    }

    return copy;
  };

  useEffect(() => {
    setField(produceField(props.options.x, props.options.y));
  }, [props]);

  useEffect(() => {
    console.log(field);
  }, [field]);

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
          field.map((el) => <Tile mine={el.mine} id={el.id} key={el.id} />)
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={(e) => {
          if (field) {
            console.log("running");
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
