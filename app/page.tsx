import { Expletus_Sans } from "next/font/google";
import Game from "./components/Game";

const expletus = Expletus_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Minesweeper",
};
export default function Home() {
  return (
    <main className={expletus.className}>
      <div className="bg-gradient-to-b from-orange-900 to-orange-400 flex flex-col items-center min-h-[100dvh]">
        <div className="xl:w-[80%] w-[100%] bg-white  flex flex-col items-center min-h-[100dvh] ">
          <div className="absolute -z-100 h-[100dvh] w-[100dvw] bg-[url('/images/bg.svg')]  bg-no-repeat  bg-contain bg-center"></div>
          <h1 className="text-center p-4 my-8 text-4xl uppercase ">
            Minesweeper
          </h1>
          <Game />
        </div>
      </div>
    </main>
  );
}
