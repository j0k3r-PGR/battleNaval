import { useState } from "react"

const AUX = {
    A : " ",
    B : "  "
}

let aciertos = Array(81).fill(false)

const Box = ({children,className,updateBox,index, seleccion,juego,acierto}) =>{
    const [color,setColor] = useState("")

    let newClassName = className
    if (seleccion) {
        newClassName += (children == AUX.A ? ' blue': '')
    } 
    if (juego){
        newClassName += acierto ? (children == AUX.A ? " red" : " blue") : ""
    }

    const hanleClick = () => {
        updateBox(index)
    }

    return(
      <div className={newClassName} onClick={hanleClick}>
        {children}
      </div>
    )
}

export function Tablero(
    {tittle,valido ,id, clas,actualyReady,seleccion,juego,misBarcos,setMisBarcos,barcosPc}
    ){
    const [mapBox, setMapBox] = useState(Array(81).fill(null))
    const [barcos,setBarcos] = useState(10)
    const [noWin,setNoWin] = useState(true)
    const updateBox = (index) => {
        if(mapBox[index] || !valido || !noWin) return
        if (barcos >= 1 & seleccion){
            setBarcos(barcos-1)
            if(barcos===1) actualyReady()
            const newMapBox = [... mapBox]
            newMapBox[index] = AUX.A
            setMapBox(newMapBox)
            const barc = [... misBarcos]
            barc.push(index)
            setMisBarcos(barc)
        }
        let win = false
        if (barcos===0) {
            setNoWin(false)
            win = true
        }
        if (juego & !win){
            setBarcos(barcosPc.some(element => element == index)? barcos-1 : barcos)
            aciertos[index] = true
            const newMapBox = [... mapBox]
            newMapBox[index] = AUX.A
            setMapBox(newMapBox)
        }
        
        //const tablePC = document.getElementsByClassName("box pc")
        //tablePC[Math.floor(Math.random() * tablePC.length)].className = "box blue"
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
                seleccion = {seleccion}
                juego= {juego}
                barcosPc = {barcosPc}
                id = {id}
                acierto = {aciertos[index]}
                >
                    {barcosPc ? (barcosPc.some(element => index === element)? AUX.A : AUX.B) : mapBox[index]}
                </Box>
                )
            } )
            }
        </div>
        <div className='info'>
            <div className='restantes'>
            <label>BARCOS RESTANTES: {barcos}  </label>
            </div>
        </div>
    </div>
    )
}