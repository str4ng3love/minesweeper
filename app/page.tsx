import { Expletus_Sans } from "next/font/google";
import Game from "./components/Game";

const expletus = Expletus_Sans({ subsets: ["latin"] });

export const metadata = {
  title: 'Minesweeper',
  
}
export default function Home() {
  return (
    <main className={expletus.className}>
      <div className="bg-gradient-to-b from-orange-900 to-orange-400 flex flex-col items-center min-h-[100dvh]">
        <div className="w-[80%] bg-white flex flex-col items-center min-h-[100dvh]">
          <h1 className="text-center p-4 my-8 text-4xl uppercase">Minesweeper</h1>
          <Game />
          
        </div>
      </div>
    </main>
  );
}
