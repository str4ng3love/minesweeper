"use client";

interface Props {
  minesLeft: number;
  time: number;
  resetFN: (e: React.MouseEvent) => void;
}
export default function Panel({ resetFN, minesLeft, time }: Props) {
  return (
    <>
      <div className="p-4 font-bold flex justify-between select-none">
        <div className="flex justify-center items-center  h-8 w-16  mx-1 border-solid border-2 border-red-600 bg-black text-white/90">
          {time}
        </div>

        <div
          onClick={(e) => resetFN(e)}
          className="flex justify-center items-center h-8 w-fit mx-4 "
        >
         <span className="p-4 hover:bg-white hover:text-black">RESET</span>
        </div>
        <div className="flex justify-center items-center  h-8 w-16  mx-1 border-solid border-2 border-red-600 bg-black text-white/90">
          {minesLeft}
        </div>
      </div>
    </>
  );
}
