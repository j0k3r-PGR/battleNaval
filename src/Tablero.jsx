import { useState } from "react"

const AUX = {
    A : " ",
    B : "  "
}

const Box = ({children,className,updateBox,index}) =>{
    const newClassName = className + (children ? ' blue': '')

    const hanleClick = () => {
        updateBox(index)
    }

    return(
      <div className={newClassName} onClick={hanleClick}>
        {children}
      </div>
    )
}


export function Tablero({tittle,valido ,id, clas}){
    const [mapBox, setMapBox] = useState(Array(81).fill(null))
    const barcosRestantes = 10
   
    const updateBox = (index) => {
        if(mapBox[index] || !valido) return
        const newMapBox = [... mapBox]
        newMapBox[index] = AUX.A
        setMapBox(newMapBox)
        
        const tablePC = document.getElementsByClassName("box pc")
        tablePC[Math.floor(Math.random() * tablePC.length)].className = "box blue"
    }

    return(
    <div className="tabla">
        <h1>{tittle}</h1>
        <div className='container' id={id}>
            {
            mapBox.map((_, index) => {
                return(
                <Box 
                key={index}
                index={index}
                className={"box "+clas}
                updateBox = {updateBox}
                id = {id}
                >
                    {mapBox[index]}
                </Box>
                )
            } )
            }
        </div>
        <div className='info'>
            <div className='restantes'>
            <label>BARCOS RESTANTES: {barcosRestantes}  </label>
            </div>
        </div>
    </div>
    )
}