"use client";


interface Props {
  minesLeft:number,
time:number;
  resetFN: (e:React.MouseEvent)=>void,
}
export default function Panel({resetFN, minesLeft, time}:Props) {

  return (
    <>
      <div className="p-4 flex justify-between select-none">
      <div className="flex justify-center items-center  h-8 w-16  mx-1 border-solid border-2 border-red-600 bg-black text-white/90">
        {time}
      </div>

        <div
          onClick={(e) => resetFN(e)}
          className="flex justify-center items-center h-8 w-fit mx-4 "
        >
      RESET
        </div>
        <div className="flex justify-center items-center  h-8 w-16  mx-1 border-solid border-2 border-red-600 bg-black text-white/90">
          {minesLeft}
        </div>
      </div>
    </>
  );
}
