"use client";
interface Props {
  time: number;
  handleClick: (e: React.MouseEvent)=>void;
}
export default function GameOver({ time, handleClick }: Props) {
  return (
    <>
      <div className="select-none absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md shadow-black">
        <div className="bg-white p-8 flex flex-col">
          <h3 className="text-center  text-xl">Congratulations!</h3>
          <span className="leading-8 mb-8">You just sweeped the field in <b>{time}</b> seconds !</span>
        <button
        onClick={(e)=>handleClick(e)}
         className="p-4 hover:bg-black hover:text-white">OK</button>
        </div>
      </div>
    </>
  );
}
