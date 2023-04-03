"use client"
import { useEffect, useState} from 'react'
import GameOptions from './GameOptions'
export default function Menu(props:{getOptions:(options:{x:string, y:string,mines:string})=>void;}){
    const [showOptions, setShowOptions] = useState(false)
    const [gameOptions, setGameOptions] = useState({x:"9", y:"9", mines:"10"})

    const getOptions= (options:{x:string,y:string,mines:string})=>{
        setGameOptions(options)
      
    }
    useEffect(()=>{

        props.getOptions(gameOptions)
    }, [gameOptions])
return(
    <div className="flex justify-around my-2">
    <div onClick={(e)=>setShowOptions(true)} className="p-4 hover:bg-black hover:text-white">
      Game
    </div>
    {showOptions ? <GameOptions closefN={(e)=>setShowOptions(false)} setOptionsfN={getOptions}/> : <></>}
    <div className="p-4">Help</div>
  </div>
)
}